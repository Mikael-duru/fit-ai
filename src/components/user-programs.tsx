import Link from "next/link";
import {
	ChevronRight,
	Dumbbell,
	Sparkles,
	Users,
	Clock,
	AppleIcon,
	ShieldIcon,
	LucideProps,
} from "lucide-react";

import { Button } from "@/components/ui/button";
import {
	Card,
	CardContent,
	CardFooter,
	CardHeader,
	CardTitle,
} from "@/components/ui/card";
import { USER_PROGRAMS, USER_STATS } from "@/constants";
import { cn } from "@/lib/utils";

const ProgramDetails = ({
	Icon,
	title,
	text,
}: {
	Icon: React.ComponentType<LucideProps>;
	title: string;
	text: string;
}) => {
	return (
		<div className="flex items-start gap-3">
			<div className="p-2 rounded-md bg-primary/10 text-primary mt-0.5">
				<Icon className="h-5 w-5" />
			</div>
			<div className="flex-1">
				<div className="flex justify-between items-center">
					<h3 className="font-medium text-foreground line-clamp-1">{title}</h3>
				</div>
				<p className="text-sm text-muted-foreground mt-1">{text}</p>
			</div>
		</div>
	);
};

const UserPrograms = () => {
	return (
		<div className="w-full pb-24 pt-16 relative">
			<div className="container mx-auto px-4 sm:px-8">
				{/* Header - Program Gallery */}
				<div className="bg-card/90 backdrop-blur-sm border border-border rounded-lg overflow-hidden mb-16 max-w-6xl mx-auto">
					{/* Header bar */}
					<div className="flex items-center justify-between px-5 py-3 border-b border-border bg-background/70">
						<div className="flex items-center gap-2">
							<div className="w-2.5 h-2.5 rounded-full bg-primary"></div>
							<span className="text-sm text-primary font-medium">
								Program Gallery
							</span>
						</div>
						<div className="text-sm text-muted-foreground">Featured Plans</div>
					</div>

					{/* Header content */}
					<div className="p-8 text-center">
						<h2 className="text-4xl md:text-5xl font-bold mb-6">
							<span className="text-foreground">AI-Generated </span>
							<span className="text-primary">Programs</span>
						</h2>

						<p className="text-lg text-muted-foreground max-w-[65ch] mx-auto mb-10">
							Explore personalized fitness plans our AI assistant has created
							for other users
						</p>

						{/* STATS */}
						<div className="flex max-md:flex-col items-center justify-center gap-14 lg:gap-16 mt-12 md:mt-10 font-mono">
							{USER_STATS.map(({ label, value }, index) => (
								<div
									key={index}
									className="flex max-md:flex-col items-center gap-14 lg:gap-16"
								>
									<div className="flex flex-col items-center">
										<p className="text-3xl text-primary">{value}</p>
										<p className="text-sm text-muted-foreground uppercase tracking-wide mt-1">
											{label}
										</p>
									</div>
									<div
										className={cn(
											"max-md:h-px max-md:w-12 w-px h-12 bg-border",
											index === USER_STATS.length - 1 && "hidden"
										)}
									/>
								</div>
							))}
						</div>
					</div>
				</div>

				{/* Program cards */}
				<div className="grid max-sm:grid-cols-1 grid-cols-[repeat(auto-fill,minmax(320px,1fr))] gap-6">
					{USER_PROGRAMS.map((program) => (
						<Card
							key={program.id}
							className="bg-card/90 backdrop-blur-sm border border-border hover:border-primary/50 transition-colors overflow-hidden"
						>
							{/* Card header with user info */}
							<div className="flex items-center justify-between px-4 py-2 border-b border-border bg-background/70">
								<div className="flex items-center gap-2">
									<div className="w-2 h-2 rounded-full bg-primary"></div>
									<span className="text-sm text-primary">
										USER.{program.id}
									</span>
								</div>
								<div className="text-sm text-muted-foreground">
									{program.fitness_level.toUpperCase()}
								</div>
							</div>

							<CardHeader className="pt-6 px-5">
								<div className="flex items-center gap-4 mb-4">
									<div className="h-16 w-16 rounded-full overflow-hidden border border-border">
										<img
											src={program.profilePic}
											alt={`${program.first_name}`}
											className="h-full w-full object-cover"
										/>
									</div>
									<div>
										<CardTitle className="text-xl text-foreground">
											{program.first_name}
											<span className="text-primary">.exe</span>
										</CardTitle>
										<div className="text-sm text-muted-foreground flex items-center gap-2 mt-1">
											<Users className="h-4 w-4" />
											{program.age}y • {program.workout_days}d/week
										</div>
									</div>
								</div>

								<div className="flex justify-between items-center gap-4">
									<div className="px-3 py-1 bg-primary/10 rounded border border-primary/20 text-sm text-primary flex items-center gap-2">
										<Sparkles className="h-4 w-4" />
										{program.fitness_goal}
									</div>
									<div className="text-sm text-muted-foreground flex items-center gap-2">
										<Clock className="h-4 w-4" />
										v3.8
									</div>
								</div>
							</CardHeader>

							<CardContent className="px-5">
								{/* Program details */}
								<div className="space-y-5 pt-2">
									<ProgramDetails
										Icon={Dumbbell}
										title={program.workout_plan.title}
										text={program.equipment_access}
									/>

									<ProgramDetails
										Icon={AppleIcon}
										title={program.diet_plan.title}
										text="System optimized nutrition"
									/>

									<ProgramDetails
										Icon={ShieldIcon}
										title="AI Safety Protocols"
										text="Protection systems enabled"
									/>
								</div>

								{/* Program description */}
								<div className="mt-5 pt-5 border-t border-border">
									<div className="text-sm text-muted-foreground">
										<span className="text-primary">&gt; </span>
										{program.workout_plan.description.substring(0, 120)}...
									</div>
								</div>
							</CardContent>

							<CardFooter className="px-5 py-4 border-t border-border">
								<Link href={`/programs/${program.id}`} className="w-full">
									<Button className="w-full bg-primary text-primary-foreground hover:bg-primary/90">
										View Program Details
										<ChevronRight className="ml-2 h-4 w-4" />
									</Button>
								</Link>
							</CardFooter>
						</Card>
					))}
				</div>

				{/* CTA section */}
				<div className="mt-16 text-center">
					<Link href="/generate-program">
						<Button
							size="lg"
							className="bg-primary text-primary-foreground hover:bg-primary/90 px-8 py-6 text-lg"
						>
							Generate Your Program
							<Sparkles className="ml-2 h-5 w-5" />
						</Button>
					</Link>
					<p className="text-muted-foreground mt-4">
						Join 500+ users with AI-customized fitness programs
					</p>
				</div>
			</div>
		</div>
	);
};

export default UserPrograms;
