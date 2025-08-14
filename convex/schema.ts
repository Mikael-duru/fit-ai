import { defineSchema, defineTable } from "convex/server";
import { v } from "convex/values";

export default defineSchema({
	users: defineTable({
		name: v.string(),
		email: v.string(),
		imageURL: v.optional(v.string()),
		clerkId: v.string(),
	}).index("by_clerk_id", ["clerkId"]),

	plans: defineTable({
		userId: v.string(),
		userAge: v.number(),
		name: v.string(),
		workoutPlan: v.object({
			title: v.string(),
			equipmentAccess: v.string(),
			schedule: v.array(v.string()),
			exercises: v.array(
				v.object({
					day: v.string(),
					routines: v.array(
						v.object({
							name: v.string(),
							sets: v.optional(v.number()),
							reps: v.optional(v.number()),
							duration: v.optional(v.string()),
							description: v.optional(v.string()),
						})
					),
				})
			),
			description: v.optional(v.string()),
		}),
		dietPlan: v.object({
			title: v.string(),
			dailyCalories: v.number(),
			meals: v.array(
				v.object({
					name: v.string(),
					foods: v.array(v.string()),
				})
			),
			description: v.optional(v.string()),
		}),
		isActive: v.boolean(),
	})
		.index("by_user_id", ["userId"])
		.index("by_active", ["isActive"]),
});
