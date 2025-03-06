import { z } from "zod";

// Define a schema for signup inputs using Zod
const signupSchema = z.object({
	username: z.string().min(3, "Username must be at least 3 characters"),
	email: z.string().email("Invalid email address"),
	password: z.string().min(6, "Password must be at least 6 characters"),
});

export default signupSchema;
