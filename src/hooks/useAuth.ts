import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
    forgotPasswordSchema,
    loginSchema,
    ResetPasswordSchema,
    type ForgotPasswordForm,
    type LoginForm,
    type ResetPasswordForm,
} from "@/schemas/auth.schema";
import { toast } from "react-toastify";
import { useNavigate, useSearchParams } from "react-router-dom";
import {
    forgotPasswordApi,
    loginApi,
    resetPasswordApi,
} from "@/provider/auth.api";
import { useState } from "react";

// Login hook
export const useLogin = () => {
    const navigate = useNavigate();

    const form = useForm<LoginForm>({
        resolver: zodResolver(loginSchema),
    });

    const [isLoading, setIsLoading] = useState(false);

    const onSubmit = async (data: LoginForm) => {
        try {
            setIsLoading(true);
            const res = await loginApi(data);
            const { message, data: result } = res.data;
            localStorage.setItem("token", result.access_token);
            toast.success(message);
            navigate("/posts");
        } catch (err: any) {
            const res = err.response?.data;
            // Pydantic validation errors
            if (Array.isArray(res)) {
                res.forEach((e) => {
                    form.setError(e.loc[0], {
                        type: "server",
                        message: e.msg,
                    });
                });
            }
        } finally {
            setIsLoading(false);
        }
    };

    return { ...form, onSubmit, isLoading };
};

// ForgotPasswork hook
export const useForgotPassword = () => {
    const form = useForm<ForgotPasswordForm>({
        resolver: zodResolver(forgotPasswordSchema),
    });

    const [isLoading, setIsLoading] = useState(false);

    const onSubmit = async (data: ForgotPasswordForm) => {
        try {
            setIsLoading(true);
            const res = await forgotPasswordApi(data);
            const { message } = res.data;
            toast.success(message);
        } catch (err: any) {
            const res = err.response?.data;
            // Pydantic validation errors
            if (Array.isArray(res)) {
                res.forEach((e) => {
                    form.setError(e.loc[0], {
                        type: "server",
                        message: e.msg,
                    });
                });
            }
        } finally {
            setIsLoading(false);
        }
    };

    return { ...form, onSubmit, isLoading };
};

// ResetPasswork hook
export const useResetPassword = () => {
    const form = useForm<ResetPasswordForm>({
        resolver: zodResolver(ResetPasswordSchema),
    });

    const [isLoading, setIsLoading] = useState(false);

    const [searchParams] = useSearchParams();
    const navigate = useNavigate();
    const token = searchParams.get("token");

    const onSubmit = async (data: ResetPasswordForm) => {
        try {
            setIsLoading(true);
            const res = await resetPasswordApi({ ...data, token });
            const { message } = res.data;
            toast.success(message);
            navigate("/");
        } catch (err: any) {
            const res = err.response?.data;
            // Pydantic / backend validation errors
            if (Array.isArray(res)) {
                console.log(res);
                res.forEach((e) => {
                    form.setError(e.loc[0] as keyof ResetPasswordForm, {
                        type: "server",
                        message: e.msg,
                    });
                });
            }
        } finally {
            setIsLoading(false);
        }
    };

    return { ...form, onSubmit, isLoading };
};
