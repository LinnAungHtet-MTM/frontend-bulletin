import { z } from "zod";

// Login Schema
export const loginSchema = z.object({
  email: z
    .string()
    .min(1, "Email Address field is required")
    .email("Email Address field format is invalid"),
  password: z
    .string()
    .min(1, "Password field is required"),
});

export type LoginForm = z.infer<typeof loginSchema>;

// ForgotPassword Schema
export const forgotPasswordSchema = z.object({
  email: z
    .string()
    .min(1, "Email Address field is required")
    .email("Email Address field format is invalid"),
});

export type ForgotPasswordForm = z.infer<typeof forgotPasswordSchema>;

// ResetPassword Schema
export const ResetPasswordSchema = z.object({
  password: z
    .string()
    .min(1, "Password field is required"),
  confirm_password: z
    .string()
    .min(1, "Confirm Password field is required")
})

export type ResetPasswordForm = z.infer<typeof ResetPasswordSchema>;