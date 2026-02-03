import z from "zod";

export const passwordSchema = z
    .string()
    .min(8, { message: "Password must be at least 8 characters" })
    .max(15, { message: "Password must be at most 15 characters" })
    .regex(/[a-z]/, { message: "Password must contain a lowercase letter" })
    .regex(/[A-Z]/, { message: "Password must contain an uppercase letter" })
    .regex(/[^a-zA-Z0-9]/, { message: "Password must contain a special character" });

export const LoginUserSchema = z.object({
    email: z.string(),
    password: z.string(),
});

export const RegisterUserSchema = z.object({
    email: z.string(),
    password: z.string(),
    password_confirmation: z.string(),

});
