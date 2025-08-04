"use client";

import { useUser } from "@clerk/nextjs";
import { useQuery } from "convex/react";
import { useEffect, useState } from "react";
import {
	CalendarIcon,
	DumbbellIcon,
	InfoIcon,
	Loader2Icon,
	UtensilsIcon,
} from "lucide-react";

import { api } from "../../../convex/_generated/api";
import ProfileHeader from "@/components/profile-header";
import NoFitnessPlan from "@/components/no-fitness-plan";
import CornerRibbons from "@/components/corner-ribbons";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
	Accordion,
	AccordionContent,
	AccordionItem,
	AccordionTrigger,
} from "@/components/ui/accordion";
import { cn } from "@/lib/utils";

const ProfilePage = () => {
	const { user } = useUser();
	const [selectedPlanId, setSelectedPlanId] = useState<string | null>(null);
	const [activeTab, setActiveTab] = useState("workout");

	const allPlans = useQuery(api.plans.getUserPlansById, {
		userId: user?.id as string,
	});

	const activePlan = allPlans?.find((plan) => plan.isActive);

	const currentPlan = selectedPlanId
		? allPlans?.find((plan) => plan._id === selectedPlanId)
		: activePlan;

	useEffect(() => {
		if (currentPlan && currentPlan._id !== selectedPlanId) {
			setSelectedPlanId(currentPlan._id);
		}
	}, [currentPlan?._id, selectedPlanId]);

	// Handle active tab
	useEffect(() => {
		const savedTab = localStorage.getItem("activeTab");
		if (savedTab) {
			setActiveTab(JSON.parse(savedTab));
		}
	}, []);

	// Save active tab
	useEffect(() => {
		if (activeTab !== null) {
			localStorage.setItem("activeTab", JSON.stringify(activeTab));
		}
	}, [activeTab]);

	// Clear active tab
	useEffect(() => {
		return () => {
			localStorage.removeItem("activeTab");
		};
	}, []);

	if (!allPlans) {
		return (
			<div className="flex items-center justify-center h-[80vh] w-full">
				<Loader2Icon className="size-20 text-primary animate-spin" />
			</div>
		);
	}

	return (
		<section className="relative z-10 pt-12 pb-32 flex-grow container mx-auto px-4">
			{user && <ProfileHeader user={user} />}

			{allPlans && allPlans?.length > 0 ? (
				<div className="space-y-8">
					{/* Plan Selector */}
					<div className="relative backdrop-blur-sm border border-border p-6">
						<CornerRibbons />

						<div className="flex gap-2 items-center justify-between mb-4 flex-wrap">
							<h2 className="text-xl font-bold tracking-tight">
								<span className="text-primary">Your</span>{" "}
								<span className="text-foreground">Fitness Plans</span>
							</h2>
							<p className="font-mono text-xs text-muted-foreground">
								TOTAL: {allPlans?.length}
							</p>
						</div>

						<div className="flex flex-wrap gap-2">
							{allPlans?.map((plan) => (
								<Button
									key={plan?._id}
									size="sm"
									variant={
										selectedPlanId === plan?._id ? "secondary" : "outline"
									}
									onClick={() => setSelectedPlanId(plan?._id)}
									className={cn(
										"capitalize w-full sm:w-auto",
										selectedPlanId === plan?._id &&
											"bg-primary/20 text-primary hover:bg-primary/30"
									)}
								>
									<span className="!line-clamp-1">{plan?.name}</span>
									<div
										className={cn(
											"w-3 h-3 rounded-full border-2 border-border ml-2 shrink-0",
											plan?.isActive ? "bg-green-500" : "bg-muted"
										)}
									/>
								</Button>
							))}
						</div>
					</div>

					{/* Plan Details */}
					{currentPlan && (
						<div className="relative backdrop-blur-sm border border-border rounded-lg p-6">
							<CornerRibbons />

							<div className="flex items-center gap-2 mb-4">
								<div className="size-2 rounded-full bg-primary animate-pulse shrink-0"></div>
								<h3 className="text-lg font-bold">
									PLAN:{" "}
									<span className="text-primary capitalize">
										{currentPlan.name} -{" "}
										{new Date(currentPlan._creationTime).toLocaleDateString()}
									</span>
								</h3>
							</div>

							<Tabs
								value={activeTab}
								onValueChange={setActiveTab}
								className="w-full"
							>
								<TabsList className="mb-6 w-full grid grid-cols-2 bg-cyber-terminal-bg border">
									<TabsTrigger
										value="workout"
										className="data-[state=active]:bg-primary/20 data-[state=active]:text-primary"
									>
										<DumbbellIcon className="mr-1 size-4" />
										Workout <span className="max-sm:hidden"> Plan</span>
									</TabsTrigger>
									<TabsTrigger
										value="diet"
										className="data-[state=active]:bg-primary/20 data-[state=active]:text-primary"
									>
										<UtensilsIcon className="mr-1 size-4" />
										Diet <span className="max-sm:hidden"> Plan</span>
									</TabsTrigger>
								</TabsList>

								<TabsContent value="workout">
									{/* Schedule */}
									<div className="space-y-4">
										<div className="flex items-start justify-center w-fit gap-2 border border-border bg-primary/10 rounded-lg p-3 mb-8 animate-pulse">
											<InfoIcon className="size-5 text-primary shrink-0" />
											<p className="text-sm text-muted-foreground">
												For an exercise that says "3 sets of 15 reps," it means
												you would perform the exercise 15 times, rest (for
												allotted time), then repeat for a total of 3 times (3
												sets).
											</p>
										</div>
										<div className="flex items-center gap-2 mb-4">
											<CalendarIcon className="size-4 text-primary shrink-0" />
											<span className="font-mono text-sm text-muted-foreground">
												SCHEDULE: {currentPlan.workoutPlan.schedule.join(", ")}
											</span>
										</div>

										{/* Exercises */}
										<Accordion type="multiple" className="space-y-4">
											{currentPlan.workoutPlan.exercises.map(
												(exerciseDay, index) => (
													<AccordionItem
														key={index}
														value={exerciseDay.day}
														className="border rounded-lg overflow-hidden"
													>
														<AccordionTrigger className="px-4 py-3.5 hover:no-underline hover:bg-primary/10 font-mono">
															<div className="flex justify-between w-full items-center">
																<p className="text-primary">
																	{exerciseDay.day}
																</p>
																<p className="text-xs text-muted-foreground">
																	{exerciseDay.routines.length}{" "}
																	{exerciseDay.routines.length === 1
																		? "Exercise"
																		: "Exercises"}
																</p>
															</div>
														</AccordionTrigger>
														<AccordionContent className="px-4 pb-4">
															<div className="space-y-3 mt-2">
																{exerciseDay.routines.map(
																	(routine, routineIndex) => (
																		<div
																			key={routineIndex}
																			className="border border-border rounded p-3 bg-background/50"
																		>
																			<div className="flex justify-between items-start mb-2 flex-wrap gap-3">
																				<h4 className="font-semibold text-foreground">
																					{routine.name}
																				</h4>
																				<div className="flex items-center gap-2">
																					<div className="px-2 py-1 rounded bg-primary/20 text-primary text-xs font-mono">
																						{routine.sets} Sets
																					</div>
																					<div className="px-2 py-1 rounded bg-secondary/20 text-secondary text-xs font-mono">
																						{routine.reps} Reps
																					</div>
																				</div>
																			</div>
																			{routine.description && (
																				<p className="text-sm text-muted-foreground mt-2">
																					{routine.description}
																				</p>
																			)}
																		</div>
																	)
																)}
															</div>
														</AccordionContent>
													</AccordionItem>
												)
											)}
										</Accordion>
									</div>
								</TabsContent>

								<TabsContent value="diet">
									<div className="space-y-4">
										<div className="flex items-center mb-4 flex-wrap max-sm:gap-3 gap-4">
											<span className="font-mono text-sm text-muted-foreground">
												DAILY CALORIE TARGET:
											</span>
											<div className="font-mono text-xl text-primary">
												{currentPlan.dietPlan.dailyCalories} kcal
											</div>
										</div>

										<div className="h-px w-full bg-border my-4"></div>

										<div className="space-y-4">
											{currentPlan.dietPlan.meals.map((meal, index) => (
												<div
													key={index}
													className="border border-border rounded-lg overflow-hidden p-4"
												>
													<div className="flex items-center gap-2 mb-3">
														<div className="w-2 h-2 rounded-full bg-primary"></div>
														<h4 className="font-mono text-primary">
															{meal.name}
														</h4>
													</div>
													<ul className="space-y-2">
														{meal.foods.map((food, foodIndex) => (
															<li
																key={foodIndex}
																className="flex items-center gap-2 text-sm text-muted-foreground"
															>
																<span className="text-xs text-primary font-mono">
																	{String(foodIndex + 1).padStart(2, "0")}
																</span>
																{food}
															</li>
														))}
													</ul>
												</div>
											))}
										</div>
									</div>
								</TabsContent>
							</Tabs>
						</div>
					)}
				</div>
			) : (
				<NoFitnessPlan />
			)}
		</section>
	);
};

export default ProfilePage;
