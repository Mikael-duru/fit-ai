import { UserResource } from "@clerk/types";
import CornerRibbons from "./corner-ribbons";

const ProfileHeader = ({ user }: { user: UserResource }) => {
	return (
		<div className="mb-10 relative backdrop-blur-sm border border-border p-6">
			<CornerRibbons />

			<div className="flex flex-col md:flex-row items-start md:items-center gap-6">
				<div className="relative">
					{user.imageUrl ? (
						<div className="w-24 h-24 overflow-hidden rounded-full border-2 border-border">
							<img
								src={user.imageUrl}
								alt={user.fullName || "Profile"}
								className="w-full h-full object-cover"
							/>
						</div>
					) : (
						<div className="w-24 h-24 rounded-full border-2 border-border bg-gradient-to-br from-primary/30 to-secondary/30 flex items-center justify-center">
							<span className="text-4xl font-bold text-primary">
								{user.fullName?.charAt(0) || "U"}
							</span>
						</div>
					)}
				</div>

				<div className="flex-1">
					<div className="flex flex-col md:flex-row md:items-center justify-between gap-2 mb-2">
						<h1 className="text-3xl font-bold tracking-tight">
							<span className="text-foreground">{user.fullName}</span>
						</h1>
						<div className="flex items-center bg-cyber-terminal-bg backdrop-blur-sm border border-border rounded px-3 py-1 w-fit">
							<div className="w-2 h-2 rounded-full bg-primary animate-pulse mr-2"></div>
							<p className="text-xs font-mono text-primary">USER ACTIVE</p>
						</div>
					</div>
					<div className="h-px w-full bg-gradient-to-r from-primary via-secondary to-primary opacity-50 my-2"></div>
					<p className="text-muted-foreground font-mono">
						{user.primaryEmailAddress?.emailAddress}
					</p>
				</div>
			</div>
		</div>
	);
};

export default ProfileHeader;
