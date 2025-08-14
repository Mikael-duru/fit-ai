"use client";

import { useUser } from "@clerk/nextjs";
import { useQuery } from "convex/react";
import { useEffect, useState } from "react";
import { Loader2Icon } from "lucide-react";

import { api } from "../../../convex/_generated/api";
import ProfileHeader from "@/components/profile-header";
import NoFitnessPlan from "@/components/no-fitness-plan";
import CornerRibbons from "@/components/corner-ribbons";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import DisplayPlan from "@/components/display-plan";

const ProfilePage = () => {
	const { user } = useUser();
	const [selectedPlanId, setSelectedPlanId] = useState<string | null>(null);

	const userPlans = useQuery(api.plans.getUserPlansById, {
		userId: user?.id as string,
	});

	const activePlan = userPlans?.find((plan) => plan.isActive);

	const currentPlan = selectedPlanId
		? userPlans?.find((plan) => plan._id === selectedPlanId)
		: activePlan;

	useEffect(() => {
		if (currentPlan && currentPlan._id !== selectedPlanId) {
			setSelectedPlanId(currentPlan._id);
		}
	}, [currentPlan?._id, selectedPlanId]);

	if (!userPlans) {
		return (
			<div className="flex items-center justify-center h-[80vh] w-full">
				<Loader2Icon className="size-20 text-primary animate-spin" />
			</div>
		);
	}

	return (
		<section className="relative z-10 pt-8 pb-32 flex-grow container mx-auto px-4">
			{user && <ProfileHeader user={user} />}

			{userPlans && userPlans?.length > 0 ? (
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
								TOTAL: {userPlans?.length}
							</p>
						</div>

						<div className="flex flex-wrap gap-2">
							{userPlans?.map((plan) => (
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
					{currentPlan && <DisplayPlan currentPlan={currentPlan} />}
				</div>
			) : (
				<NoFitnessPlan />
			)}
		</section>
	);
};

export default ProfilePage;
