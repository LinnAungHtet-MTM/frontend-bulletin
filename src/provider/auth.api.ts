// auth.api.ts
import api from "./api";
import type {
    LoginForm,
    ForgotPasswordForm,
    ResetPasswordForm,
} from "@/schemas/auth.schema";

// Login Api
export const loginApi = (data: LoginForm) => api.post("/auth/login", data);

// Fortgot Password Api
export const forgotPasswordApi = (data: ForgotPasswordForm) =>
    api.post("/auth/forgot-password", data);

// Reset Password Api
export const resetPasswordApi = (data: ResetPasswordForm) =>
    api.post("/auth/reset-password", data);

// Verify Reset Password Token Api
export const verifyResetTokenApi = (token: string) =>
    api.get("/auth/verify-reset-token", {
        params: { token },
        headers: {
            skipAuth: true,
        },
    });
