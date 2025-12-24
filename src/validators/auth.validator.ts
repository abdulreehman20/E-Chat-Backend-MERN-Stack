import { z } from "zod";

export const emailSchema = z.string().trim().email("Invalid email address").min(1);

export const passwordSchema = z.string().trim().min(1);

export const registerSchema = z.object({
    name: z.string().trim().min(1, "Name is required"),
    email: emailSchema,
    password: passwordSchema,
    avatarUrl: z.string().optional(),
});

export const loginSchema = z.object({ email: emailSchema, password: passwordSchema });

export type registerSchemaType = z.infer<typeof registerSchema>;
export type loginSchemaType = z.infer<typeof loginSchema>;