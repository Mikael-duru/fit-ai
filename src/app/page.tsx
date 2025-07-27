import { ArrowRightIcon } from "lucide-react";
import Link from "next/link";
import React from "react";

import TerminalOverlay from "@/components/terminal-overlay";
import { Button } from "@/components/ui/button";
import UserPrograms from "@/components/user-programs";
import { STATS } from "@/constants";
import { cn } from "@/lib/utils";

const HomePage = () => {
	return (
		<div className="flex flex-col min-h-screen text-foreground overflow-hidden">
			<section className="flex-grow relative z-10 py-24">
				<div className="container mx-auto px-4">
					<div className="grid grid-cols-1 lg:grid-cols-12 gap-24 lg:gap-4 items-center relative">
						{/* Ribbon */}
						<div className="absolute -top-10 left-0 w-40 h-40 border-l-2 border-t-2" />

						{/* Left side */}
						<div className="lg:col-span-7 space-y-8 relative ml-4">
							<h1 className="text-5xl md:text-6xl xl:text-7xl font-bold tracking-tight leading-[1.1] lg:max-w-[12ch]">
								<span className="text-foreground">Achieve Your </span>
								<span className="text-primary">Fitness Goals </span>
								<span className="text-foreground">With Advanced </span>
								<span className="text-foreground">AI </span>
								<span className="text-primary">Technology</span>
							</h1>

							{/* separator */}
							<div className="h-[1.5px] w-full bg-gradient-to-r from-primary via-secondary to-primary opacity-50"></div>

							<p className="text-xl text-muted-foreground max-w-[60ch] lg:max-w-[42ch]">
								Talk to our AI assistant and get personalized diet plans and
								workout routines designed just for you
							</p>

							{/* STATS */}
							<div className="flex sm:items-center gap-12 py-6 font-mono flex-wrap">
								{STATS.map(({ label, value }, index) => (
									<div key={index} className="flex items-center gap-12">
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

			<UserPrograms />
		</div>
	);
};

export default HomePage;
