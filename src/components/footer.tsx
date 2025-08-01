import { DumbbellIcon } from "lucide-react";
import Link from "next/link";

const Footer = () => {
	return (
		<footer className="border-t border-border bg-background/80 backdrop-blur-sm">
			{/* Top border glow */}
			<div className="h-px w-full bg-gradient-to-r from-transparent via-primary/30 to-transparent"></div>

			<div className="container mx-auto px-5 sm:px-8 py-8">
				<div className="flex flex-wrap justify-between items-center gap-10">
					{/* Logo and Copyright */}
					<div className="flex flex-col items-start gap-2">
						<Link href="/" className="flex items-center gap-2">
							<div className="p-1 bg-primary/10 rounded">
								<DumbbellIcon className="w-4 h-4 text-primary" />
							</div>
							<span className="text-xl font-bold font-mono">
								<span className="text-primary">Fit</span>.ai
							</span>
						</Link>
						<p className="text-sm text-muted-foreground">
							&copy; 2025 Fit.ai - All rights reserved.
						</p>
					</div>

					{/* Status */}
					<div className="flex items-center gap-2 px-3 py-2 border border-border rounded-md bg-background/50 h-10 max-w-[200px]">
						<div className="w-2 h-2 rounded-full bg-green-500">
							<div className="w-2 h-2 rounded-full bg-green-500 animate-ping"></div>
						</div>
						<span className="text-xs font-mono">SYSTEM OPERATIONAL</span>
					</div>
				</div>
			</div>
		</footer>
	);
};

export default Footer;
