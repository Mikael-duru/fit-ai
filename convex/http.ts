import { httpRouter } from "convex/server";
import { Webhook } from "svix";
import { WebhookEvent } from "@clerk/nextjs/server";

import { httpAction } from "./_generated/server";
import { api } from "./_generated/api";
import { GoogleGenerativeAI } from "@google/generative-ai";
import { error } from "console";

const http = httpRouter();

const genAI = new GoogleGenerativeAI(process.env.GOOGLE_GENERATIVE_AI_API_KEY!);

http.route({
	path: "/clerk-webhook",
	method: "POST",
	handler: httpAction(async (ctx, request) => {
		const webhookSecret = process.env.CLERK_WEBHOOK_SECRET;
		if (!webhookSecret) {
			throw new Error("Missing CLERK_WEBHOOK_SECRET environment variable.");
		}

		const svix_id = request.headers.get("svix-id");
		const svix_signature = request.headers.get("svix-signature");
		const svix_timestamp = request.headers.get("svix-timestamp");

		if (!svix_id || !svix_signature || !svix_timestamp) {
			return new Response("No svix headers found", {
				status: 400,
			});
		}

		const payload = await request.json();
		const body = JSON.stringify(payload);

		const wh = new Webhook(webhookSecret);
		let evt: WebhookEvent;

		try {
			evt = wh.verify(body, {
				"svix-id": svix_id,
				"svix-timestamp": svix_timestamp,
				"svix-signature": svix_signature,
			}) as WebhookEvent;
		} catch (err) {
			console.error("Webhook verification failed:", err);
			return new Response("Invalid webhook signature", {
				status: 400,
			});
		}

		const eventType = evt.type;

		if (eventType === "user.created") {
			const { id, first_name, last_name, email_addresses, image_url } =
				evt.data;

			const email = email_addresses[0].email_address;
			const name = `${first_name || ""} ${last_name || ""}`.trim();

			try {
				await ctx.runMutation(api.users.syncUser, {
					clerkId: id,
					name,
					email,
					imageURL: image_url,
				});
			} catch (err) {
				console.log("Error creating user:", err);
				return new Response("Error creating user", {
					status: 500,
				});
			}
		}

		// TODO: Handle user.updated event later
		if (eventType === "user.updated") {
			const { id, first_name, last_name, email_addresses, image_url } =
				evt.data;

			const email = email_addresses[0].email_address;
			const name = `${first_name || ""} ${last_name || ""}`.trim();

			try {
				await ctx.runMutation(api.users.updateUser, {
					clerkId: id,
					name,
					email,
					imageURL: image_url,
				});
			} catch (err) {
				console.log("Error updating user:", err);
				return new Response("Error updating user", {
					status: 500,
				});
			}
		}

		return new Response("Webhook processed successfully", {
			status: 200,
		});
	}),
});

// validate and fix workout plan to ensure it has proper numeric types
function validateWorkoutPlan(plan: any) {
	const validatedPlan = {
		schedule: plan.schedule,
		exercises: plan.exercises.map((exercise: any) => ({
			day: exercise.day,
			routines: exercise.routines.map((routine: any) => ({
				name: routine.name,
				sets:
					typeof routine.sets === "number"
						? routine.sets
						: parseInt(routine.sets) || 1,
				reps:
					typeof routine.reps === "number"
						? routine.reps
						: parseInt(routine.reps) || 10,
			})),
		})),
	};
	return validatedPlan;
}

// validate diet plan to ensure it strictly follows schema
function validateDietPlan(plan: any) {
	// only keep the fields we want
	const validatedPlan = {
		dailyCalories: plan.dailyCalories,
		meals: plan.meals.map((meal: any) => ({
			name: meal.name,
			foods: meal.foods,
		})),
	};
	return validatedPlan;
}

http.route({
	path: "/vapi/generate-program",
	method: "POST",
	handler: httpAction(async (ctx, request) => {
		try {
			const payload = await request.json();

			const {
				user_id,
				age,
				weight,
				height,
				injuries,
				workout_days,
				fitness_goal,
				fitness_level,
				dietary_restrictions,
			} = payload;

			const model = genAI.getGenerativeModel({
				model: "gemini-2.0-flash-001",
				generationConfig: {
					temperature: 0.4,
					topP: 0.9,
					responseMimeType: "application/json",
				},
			});

			const workoutPrompt = `You are an experienced fitness coach creating a personalized workout plan based on:
        Age: ${age}
        Height: ${height}
        Weight: ${weight}
        Injuries or limitations: ${injuries}
        Available days for workout: ${workout_days}
        Fitness goal: ${fitness_goal}
        Fitness level: ${fitness_level}
        
        As a professional coach:
        - Consider muscle group splits to avoid overtraining the same muscles on consecutive days
        - Design exercises that match the fitness level and account for any injuries
        - Structure the workouts to specifically target the user's fitness goal.
				- The description should be brief and explain how to do the exercise properly, with one or two (key) benefits
				- Your goal is to design a personalized fitness plan that actually works for the user — and to make the user feel like they have a coach in their corner.
        
        CRITICAL SCHEMA INSTRUCTIONS:
        - Your output MUST contain ONLY the fields specified below, NO ADDITIONAL FIELDS
        - "sets" and "reps" MUST ALWAYS be NUMBERS, never strings
        - For example: "sets": 3, "reps": 10
        - Do NOT use text like "reps": "As many as possible" or "reps": "To failure"
        - Instead use specific numbers like "reps": 12 or "reps": 15
        - For cardio, use "sets": 1, "reps": 1 or another appropriate number
				- For each exercise, include a brief description of how to do it properly and the main benefits. If an exercise is time-based, the description should mention the user can time or count it — e.g., "Hold for 30 seconds — use a timer or count slowly."
        - NEVER include strings for numerical fields
        - NEVER add extra fields not shown in the example below
        
        Return a JSON object with this EXACT structure:
        {
          "schedule": ["Monday", "Wednesday", "Friday"],
          "exercises": [
            {
              "day": "Monday",
              "routines": [
                {
                  "name": "Exercise Name",
                  "sets": 3,
                  "reps": 10,
									"description": "Description Text",
                }
              ]
            }
          ]
        }
        
        DO NOT add any fields that are not in this example. Your response must be a valid JSON object with no additional text.`;

			const workoutResult = await model.generateContent(workoutPrompt);
			const workoutPlainText = workoutResult.response.text();

			// Validate Workout Plan
			let workoutPlan = JSON.parse(workoutPlainText);
			workoutPlan = validateWorkoutPlan(workoutPlan);

			const dietPrompt = `You are an experienced nutrition coach creating a personalized diet plan based on:
        Age: ${age}
        Height: ${height}
        Weight: ${weight}
        Fitness goal: ${fitness_goal}
        Dietary restrictions: ${dietary_restrictions}
        
        As a professional nutrition coach:
        - Calculate appropriate daily calorie intake based on the person's stats and goals
        - Create a balanced meal plan with proper macronutrient distribution
        - Include a variety of nutrient-dense foods while respecting dietary restrictions
        - Consider meal timing around workouts for optimal performance and recovery
        
        CRITICAL SCHEMA INSTRUCTIONS:
        - Your output MUST contain ONLY the fields specified below, NO ADDITIONAL FIELDS
        - "dailyCalories" MUST be a NUMBER, not a string
        - DO NOT add fields like "supplements", "macros", "notes", or ANYTHING else
        - ONLY include the EXACT fields shown in the example below
        - Each meal should include ONLY a "name" and "foods" array

        Return a JSON object with this EXACT structure and no other fields:
        {
          "dailyCalories": 2000,
          "meals": [
            {
              "name": "Breakfast",
              "foods": ["Oatmeal with berries", "Greek yogurt", "Black coffee"]
            },
            {
              "name": "Lunch",
              "foods": ["Grilled chicken salad", "Whole grain bread", "Water"]
            }
          ]
        }
        
        DO NOT add any fields that are not in this example. Your response must be a valid JSON object with no additional text.`;

			const dietResult = await model.generateContent(dietPrompt);
			const dietPlainText = dietResult.response.text();

			// Validate Diet Plan
			let dietPlan = JSON.parse(dietPlainText);
			dietPlan = validateDietPlan(dietPlan);

			// Save the plans to the database
			const planId = await ctx.runMutation(api.plans.createPlan, {
				userId: user_id,
				name: `${fitness_goal} plan`,
				workoutPlan,
				dietPlan,
				isActive: true,
			});

			return new Response(
				JSON.stringify({
					success: true,
					data: {
						planId,
						workoutPlan,
						dietPlan,
					},
				}),
				{
					status: 200,
					headers: { "Content-Type": "application/json" },
				}
			);
		} catch (error) {
			console.error("Error creating fitness program:", error);
			return new Response(
				JSON.stringify({
					success: false,
					error: error instanceof Error ? error.message : String(error),
				}),
				{ status: 500, headers: { "Content-Type": "application/json" } }
			);
		}
	}),
});

export default http;
