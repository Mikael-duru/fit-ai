import { ArrowRightIcon, SparklesIcon } from "lucide-react";
import Link from "next/link";
import React from "react";

import TerminalOverlay from "@/components/terminal-overlay";
import { Button } from "@/components/ui/button";
import { STATS } from "@/constants";
import { cn } from "@/lib/utils";
import TestimonialsSlider from "@/components/testimonial-slider";

const HomePage = () => {
	return (
		<div className="flex flex-col min-h-screen text-foreground overflow-hidden">
			<section className="flex-grow relative z-10 pt-24 max-sm:pb-28 pb-30">
				<div className="container mx-auto px-4">
					<div className="grid grid-cols-1 lg:grid-cols-12 gap-24 lg:gap-4 items-center relative xl:px-16">
						{/* Ribbon */}

						{/* Left side */}
						<div className="lg:col-span-7 relative">
							<div className="absolute -top-14 left-0 w-40 h-40 border-l-2 border-t-2" />

							<div className="ml-4 space-y-8">
								<div className="space-y-2">
									<h1 className="text-6xl sm:text-7xl lg:text-8xl font-bold tracking-tight lg:max-w-[12ch] text-foreground">
										<span className="text-primary">Fitness </span>
										Designed
										<br />
										For <span className="text-primary">You.</span>
									</h1>
								</div>

								{/* separator */}
								<div className="h-[1.5px] w-full bg-gradient-to-r from-primary via-secondary to-primary opacity-50"></div>

								<p className="text-lg text-muted-foreground max-w-[60ch] lg:max-w-[42ch] xl:max-w-[45ch]">
									Achieve your health & fitness goals with advanced AI
									technology.
								</p>

								{/* STATS */}
								<div className="flex sm:items-center gap-12 pb-6 font-mono flex-wrap">
									{STATS.map(({ label, value }, index) => (
										<div key={index} className="flex items-center gap-10">
											<div className="flex flex-col">
												<div className="text-2xl text-primary">{value}</div>
												<div className="text-xs uppercase tracking-wider">
													{label}
												</div>
											</div>

											<div
												className={cn(
													"h-12 w-px bg-gradient-to-b from-transparent via-border to-transparent",
													index === STATS.length - 1 && "hidden"
												)}
											></div>
										</div>
									))}
								</div>

								{/* cta */}
								<div>
									<Button
										size="lg"
										asChild
										className="overflow-hidden bg-primary text-primary-foreground px-8 py-6 text-lg font-medium"
									>
										<Link
											href={"/generate-program"}
											className="flex items-center font-mono"
										>
											Build Your Program
											<ArrowRightIcon className="ml-2 size-5" />
										</Link>
									</Button>
								</div>
							</div>
						</div>

						{/* Right side */}
						<div className="mx-4 sm:mx-24 lg:col-span-5 relative lg:mx-4">
							{/* Ribbons */}
							<div className="absolute -inset-4 pointer-events-none">
								<div className="absolute top-0 left-0 w-16 h-16 border-l-2 border-t-2 border-border" />
								<div className="absolute top-0 right-0 w-16 h-16 border-r-2 border-t-2 border-border" />
								<div className="absolute bottom-0 left-0 w-16 h-16 border-l-2 border-b-2 border-border" />
								<div className="absolute bottom-0 right-0 w-16 h-16 border-r-2 border-b-2 border-border" />
							</div>

							{/* Banner container */}
							<div className="relative aspect-square max-w-lg mx-auto">
								<div className="relative overflow-hidden rounded-lg bg-cyber-black">
									{/* Banner */}
									<img
										src="/hero-banner.png"
										alt="AI Fitness Coach"
										className="size-full object-cover object-center"
									/>

									{/* Scan line */}
									<div className="absolute inset-0 bg-[linear-gradient(transparent_0%,transparent_calc(50%-1px),var(--cyber-glow-primary)_50%,transparent_calc(50%+1px),transparent_100%)] bg-[length:100%_8px] animate-scanline pointer-events-none" />

									{/* Banner decorations*/}
									<div className="absolute inset-0 pointer-events-none">
										<div className="absolute top-1/3 left-1/3 w-1/3 h-1/3 border border-primary/40 rounded-full" />

										{/* Targeting lines */}
										<div className="absolute top-1/2 left-0 w-1/4 h-px bg-primary/50" />
										<div className="absolute top-1/2 right-0 w-1/4 h-px bg-primary/50" />
										<div className="absolute top-0 left-1/2 h-1/4 w-px bg-primary/50" />
										<div className="absolute bottom-0 left-1/2 h-1/4 w-px bg-primary/50" />
									</div>

									<div className="absolute inset-0 bg-gradient-to-t from-background via-background/50 to-transparent" />
								</div>

								{/* terminal overlay */}
								<TerminalOverlay />
							</div>
						</div>
					</div>
				</div>
			</section>

			{/* How it works */}
			<section className="container mx-auto px-4 sm:px-8 pt-10 max-sm:pb-28 pb-30">
				<div className="bg-card/90 backdrop-blur-sm border border-border rounded-lg overflow-hidden max-w-6xl mx-auto">
					{/* Header bar */}
					<div className="flex items-center justify-between px-5 py-3 border-b border-border bg-background/70">
						<div className="flex items-center gap-2">
							<div className="w-2.5 h-2.5 rounded-full bg-primary"></div>
							<span className="text-sm text-primary font-medium">
								How it Works
							</span>
						</div>
						<div className="text-sm text-muted-foreground">Smarter Fitness</div>
					</div>

					{/* Header content */}
					<div className="p-8 text-center">
						<h2 className="text-4xl md:text-5xl font-bold mb-6">
							<span className="text-foreground">Your Coach, </span>
							<span className="text-primary">Upgraded.</span>
						</h2>

						<p className="text-lg text-muted-foreground max-w-[80ch] mx-auto mb-14">
							Getting started is simple: chat with our AI, answer a few quick
							questions about your goals, lifestyle, and preferences — then
							watch your custom training and nutrition plan come to life. No
							generic templates. No endless scrolling through workouts. Just the
							right plan, instantly.
						</p>

						{/* How it works */}
						<div className="flex max-md:flex-col items-center justify-center gap-14 lg:gap-16 mt-12 md:mt-10 font-mono">
							{[
								{ label: "Chat", value: "Speak with our AI" },
								{ label: "Customize", value: "Answer quick questions" },
								{ label: "Train", value: "Get your plan & start" },
							].map(({ label, value }, index) => (
								<div
									key={index}
									className="flex max-md:flex-col items-center gap-14 lg:gap-16"
								>
									<div className="flex flex-col items-center">
										<p className="text-3xl text-primary">{label}</p>
										<p className="text-sm text-muted-foreground uppercase tracking-wide mt-1">
											{value}
										</p>
									</div>
									{index < 2 && (
										<div className="max-md:h-px max-md:w-12 w-px h-12 bg-border" />
									)}
								</div>
							))}
						</div>
					</div>
				</div>
			</section>

			<section className="container mx-auto px-4 sm:px-8 pb-28">
				{/* Testimonies */}
				<TestimonialsSlider />

				{/* CTA section */}
				<div className="mt-16 text-center">
					<Link href="/generate-program">
						<Button
							size="lg"
							className="bg-primary text-primary-foreground hover:bg-primary/90 px-8 py-6 text-lg"
						>
							Generate Your Program
							<SparklesIcon className="ml-2 h-5 w-5" />
						</Button>
					</Link>
					<p className="text-muted-foreground mt-4">
						Join 500+ users with AI-customized fitness programs
					</p>
				</div>
			</section>
		</div>
	);
};

export default HomePage;
