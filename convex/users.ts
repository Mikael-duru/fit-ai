import { v } from "convex/values";

import { mutation } from "./_generated/server";

export const syncUser = mutation({
	args: {
		clerkId: v.string(),
		name: v.string(),
		email: v.string(),
		imageURL: v.optional(v.string()),
	},
	handler: async (ctx, args) => {
		// Check if the user already exists
		const existingUser = await ctx.db
			.query("users")
			.filter((q) => q.eq(q.field("clerkId"), args.clerkId))
			.first();

		if (existingUser) return;

		// Create a new user if they don't exist
		await ctx.db.insert("users", args);
	},
});
