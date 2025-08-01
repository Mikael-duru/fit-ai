"use client";

import { SignInButton, UserButton, useUser } from "@clerk/nextjs";
import { CalendarPlusIcon, DumbbellIcon, MenuIcon } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";

import { Button } from "./ui/button";
import { cn } from "@/lib/utils";
import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuItem,
	DropdownMenuTrigger,
} from "./ui/dropdown-menu";
import { NAVLINKS } from "@/constants";

const Header = () => {
	const { isSignedIn } = useUser();

	const pathname = usePathname();

	const isActive = (href: string) => {
		return pathname === href;
	};

	return (
		<header className="fixed top-0 left-0 right-0 z-50 bg-background/60 backdrop-blur-md border-b border-border py-3 px-4 md:px-8">
			<div className="container mx-auto flex items-center justify-between">
				{/* logo */}
				<Link href="/" className="flex items-center gap-2">
					<div className="p-1 bg-primary/10 rounded">
						<DumbbellIcon className="size-4 text-primary" />
					</div>
					<span className="text-xl font-bold font-mono">
						<span className="text-primary">Fit</span>.ai
					</span>
				</Link>

				{/* navigation */}
				<nav className="flex items-center gap-5">
					{isSignedIn ? (
						<>
							{/* desktop */}
							<div className="max-sm:hidden flex items-center gap-5">
								{NAVLINKS.map(({ href, label, icon: Icon }) => {
									const activeLink = isActive(href);
									return (
										<Link
											key={href}
											href={href}
											className="flex flex-col items-center text-sm hover:text-primary transition-colors relative"
										>
											<span className="flex items-center gap-1.5 mb-1.5">
												<Icon size={16} className="text-inherit" />
												<span>{label}</span>
											</span>
											<span
												className={cn(
													"absolute bottom-0 left-1/2 -translate-x-1/2 w-0 h-1 bg-primary rounded-full transition-all duration-300",
													activeLink && "w-6"
												)}
											/>
										</Link>
									);
								})}

								<Button
									asChild
									variant="outline"
									className="ml-2 border-primary/50 text-primary hover:text-white hover:bg-primary/10"
								>
									<Link
										href="/generate-program"
										className="flex items-center justify-center gap-2"
									>
										<CalendarPlusIcon /> Generate Program
									</Link>
								</Button>
							</div>

							<UserButton />

							{/* mobile */}
							<div className="sm:hidden flex items-center justify-center">
								<DropdownMenu>
									<DropdownMenuTrigger>
										<MenuIcon className="hover:text-primary size-[26px]" />
									</DropdownMenuTrigger>
									<DropdownMenuContent className="w-48 mr-4 py-4 px-3">
										{NAVLINKS.map(({ href, label, icon: Icon }) => {
											const activeLink = isActive(href);
											return (
												<Link key={href} href={href}>
													<DropdownMenuItem
														className={cn(
															"py-2 cursor-pointer",
															activeLink && "text-primary font-bold"
														)}
													>
														<Icon size={16} className="text-inherit" />
														<span>{label}</span>
													</DropdownMenuItem>
												</Link>
											);
										})}

										<div className="mt-3">
											<Button
												asChild
												variant="secondary"
												className="border-primary text-white w-full active:scale-95 transition-transform"
											>
												<Link
													href="/generate-program"
													className="flex items-center justify-center gap-2"
												>
													<CalendarPlusIcon /> Generate Program
												</Link>
											</Button>
										</div>
									</DropdownMenuContent>
								</DropdownMenu>
							</div>
						</>
					) : (
						<>
							<SignInButton>
								<Button
									variant="outline"
									className="border-primary/50 text-primary hover:text-white hover:bg-primary/10 active:scale-95 transition-transform"
								>
									Sign In
								</Button>
							</SignInButton>
						</>
					)}
				</nav>
			</div>
		</header>
	);
};

export default Header;
