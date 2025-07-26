export default {
	providers: [
		{
			domain: process.env.CLERK_JWT_ISSUER_DOMAIN!, // Stored on convex environment variable
			applicationID: "convex",
		},
	],
};
