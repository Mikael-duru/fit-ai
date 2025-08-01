"use client";

import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { cn } from "@/lib/utils";
import { vapi } from "@/lib/vapi.sdk";
import { useUser } from "@clerk/nextjs";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { toast } from "sonner";

enum CallStatus {
	INACTIVE = "INACTIVE",
	CONNECTING = "CONNECTING",
	ACTIVE = "ACTIVE",
	FINISHED = "FINISHED",
}

interface SavedMessage {
	role: "user" | "system" | "assistant";
	content: string;
}

const GenerateProgramPage = () => {
	const { user } = useUser();
	const router = useRouter();

	const [isSpeaking, setIsSpeaking] = useState(false);
	const [callStatus, setCallStatus] = useState<CallStatus>(CallStatus.INACTIVE);
	const [messages, setMessages] = useState<SavedMessage[]>([]);

	useEffect(() => {
		const handleCallStart = () => setCallStatus(CallStatus.ACTIVE);
		const handleCallEnd = () => setCallStatus(CallStatus.FINISHED);
		const handleSpeechStart = () => setIsSpeaking(true);
		const handleSpeechEnd = () => setIsSpeaking(false);

		const handleMessage = (message: Message) => {
			if (message.type === "transcript" && message.transcriptType === "final") {
				const newMessage = {
					role: message.role,
					content: message.transcript,
				};
				setMessages((prev) => [...prev, newMessage]);
			}
		};

		const handleError = (error: Error) => {
			console.log("Vapi_Error:", error);
			setCallStatus(CallStatus.INACTIVE);
			toast.error(error?.message || "Call has ended.");
		};

		vapi
			.on("call-start", handleCallStart)
			.on("call-end", handleCallEnd)
			.on("speech-start", handleSpeechStart)
			.on("speech-end", handleSpeechEnd)
			.on("message", handleMessage)
			.on("error", handleError);

		return () => {
			vapi
				.off("call-start", handleCallStart)
				.off("call-end", handleCallEnd)
				.off("speech-start", handleSpeechStart)
				.off("speech-end", handleSpeechEnd)
				.off("message", handleMessage)
				.off("error", handleError);
		};
	}, []);

	useEffect(() => {
		if (callStatus === CallStatus.FINISHED) {
			router.push("/profile");
		}
	}, [messages, callStatus, user?.id, router]);

	const firstName = user?.fullName?.split(" ")[0];

	const toggleCall = async () => {
		if (callStatus === CallStatus.ACTIVE) vapi.stop();
		else {
			setCallStatus(CallStatus.CONNECTING);

			try {
				await vapi.start(
					undefined,
					undefined,
					undefined,
					process.env.NEXT_PUBLIC_VAPI_WORKFLOW_ID,
					{
						variableValues: {
							first_name: firstName || "There",
							user_id: user?.id,
						},
					}
				);
			} catch (err) {
				console.error("Error starting call:", err);
				toast.error("Failed to start the call. Please try again.");
				setCallStatus(CallStatus.INACTIVE);
			}
		}
	};

	const callActive = callStatus === CallStatus.ACTIVE;
	const callEnded = callStatus === CallStatus.FINISHED;
	const connecting = callStatus === CallStatus.CONNECTING;

	const latestMessage = messages[messages.length - 1]?.content;

	return (
		<section className="min-h-svh text-foreground overflow-hidden pb-24 pt-14">
			<div className="container mx-auto px-4 md:px-8 h-full max-w-5xl space-y-10">
				{/* Title */}
				<div className="text-center mb-8">
					<h1 className="text-3xl font-bold font-mono">
						<span>Generate Your </span>
						<span className="text-primary uppercase">Fitness Program</span>
					</h1>
					<p className="text-muted-foreground mt-2">
						Start the voice call with our AI assistant to generate your
						personalized plan.
					</p>
				</div>

				{/* Voice Call Area */}
				<div className="grid grid-cols-1 sm:grid-cols-2 sm:gap-6">
					{/* AI Assistant Card */}
					<Card className="bg-card/90 backdrop-blur-sm border border-border overflow-hidden relative">
						<div className="aspect-video flex flex-col items-center justify-center p-6 relative">
							{/* AI Image */}
							<div className="flex items-center justify-center relative size-32 mb-4">
								<div className="z-10 relative w-full h-full rounded-full bg-card flex items-center justify-center border border-border overflow-hidden">
									<div className="absolute inset-0 bg-gradient-to-b from-primary/10 to-secondary/10"></div>
									<img
										src="/ai-avatar.png"
										alt="AI Assistant"
										className="size-full object-cover"
									/>
								</div>

								{isSpeaking && (
									<span className="absolute inline-flex size-4/6 rounded-full bg-primary opacity-75 animate-ping" />
								)}
							</div>

							{/* AI Assistant Name and Role */}
							<h2 className="text-xl font-bold text-foreground mb-1">
								Fit.ai Trainer
							</h2>
							<p className="text-muted-foreground text-sm">
								Fitness & Diet Coach
							</p>

							{/* Speaking Indication */}
							<div
								className={cn(
									"mt-4 flex items-center gap-2 px-3 py-1 rounded-full bg-card border border-border",
									isSpeaking ? "border-primary" : "",
									!callActive && "hidden"
								)}
							>
								<div
									className={cn(
										"w-2 h-2 rounded-full",
										isSpeaking ? "bg-primary animate-pulse" : "bg-muted"
									)}
								/>

								<span className="text-xs text-muted-foreground">
									{isSpeaking
										? "Speaking..."
										: callActive
											? "Listening..."
											: "Redirecting to profile..."}
								</span>
							</div>
						</div>
					</Card>

					{/* User card */}
					<Card className="bg-card/90 backdrop-blur-sm border overflow-hidden relative max-sm:hidden">
						<div className="aspect-video flex flex-col items-center justify-center p-6 relative">
							{/* User Image */}
							<div className="relative size-32 mb-4">
								<div className="relative w-full h-full rounded-full bg-card flex items-center justify-center border border-border overflow-hidden">
									<div className="absolute inset-0 bg-gradient-to-b from-primary/10 to-secondary/10"></div>
									<img
										src={user?.imageUrl}
										alt="User"
										className="size-full object-cover"
									/>
								</div>
							</div>

							<h2 className="text-xl font-bold text-foreground">You</h2>
							<p className="text-sm text-muted-foreground mt-1">
								{user ? user.fullName : "Guest"}
							</p>

							<div
								className={cn(
									"mt-4 flex items-center gap-2 px-3 py-1 rounded-full bg-card border",
									!callActive && "hidden"
								)}
							>
								<div className={`w-2 h-2 rounded-full bg-muted`} />
								<span className="text-xs text-muted-foreground">On Call</span>
							</div>
						</div>
					</Card>
				</div>

				{/* Transcript */}
				{messages.length > 0 && (
					<div className="bg-card/60 border border-border p-0.5 rounded-2xl w-full">
						<div className="rounded-2xl min-h-12 px-5 py-3 flex items-center justify-center size-full">
							<p
								className={cn(
									"text-lg text-center text-white",
									"opacity-0 transition-opacity duration-500",
									"animate-fadeIn opacity-100"
								)}
								key={latestMessage}
							>
								{latestMessage}
							</p>
						</div>
					</div>
				)}

				{/* Call Controls */}
				<div className="w-full flex justify-center gap-4 mt-2">
					<Button
						className={`w-fit p-5 text-lg rounded-3xl ${
							callActive
								? "bg-destructive hover:bg-destructive/90"
								: connecting
									? "bg-primary/50 hover:bg-primary/60"
									: "bg-green-600 hover:bg-green-700"
						} text-white relative`}
						onClick={toggleCall}
						disabled={connecting || callEnded}
					>
						{connecting && (
							<span className="absolute inset-0 rounded-full animate-ping bg-primary/50 opacity-75"></span>
						)}

						<span>
							{callActive
								? "End Call"
								: connecting
									? "Connecting..."
									: "Start Call"}
						</span>
					</Button>
				</div>
			</div>
		</section>
	);
};

export default GenerateProgramPage;
