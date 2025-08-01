import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import { Toaster } from "sonner";

import "./globals.css";
import ConvexClerkProvider from "@/providers/convex-clerk-provider";
import Header from "@/components/header";
import Footer from "@/components/footer";

const geistSans = Geist({
	variable: "--font-geist-sans",
	subsets: ["latin"],
});

const geistMono = Geist_Mono({
	variable: "--font-geist-mono",
	subsets: ["latin"],
});

export const metadata: Metadata = {
	title: "Fit.ai",
	description:
		"Your AI-powered fitness companion for personalized workouts and nutrition. Track your progress, stay motivated, and achieve your fitness goals with ease. Join the community and transform your health journey today, for free!.",
};

export default function RootLayout({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) {
	return (
		<ConvexClerkProvider>
			<html lang="en">
				<body
					className={`${geistSans.variable} ${geistMono.variable} antialiased`}
				>
					<Header />

					{/* Grid background */}
					<div className="fixed inset-0 -z-1">
						<div className="absolute inset-0 bg-gradient-to-b from-background via-background to-background"></div>
						<div className="absolute inset-0 bg-[linear-gradient(var(--cyber-grid-color)_1px,transparent_1px),linear-gradient(90deg,var(--cyber-grid-color)_1px,transparent_1px)] bg-[size:20px_20px]"></div>
					</div>

					<main className="pt-24 flex-grow">{children}</main>
					<Toaster richColors />

					<Footer />
				</body>
			</html>
		</ConvexClerkProvider>
	);
}
