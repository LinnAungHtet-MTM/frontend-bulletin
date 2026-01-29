import {
    createUserApi,
    getLoginUserApi,
    getSingleUserApi,
    updateUserApi,
} from "@/provider/user.api";
import {
    createUserSchema,
    updateUserSchema,
    type CreateUserForm,
    type UpdateUserForm,
} from "@/schemas/user.schema";
import { zodResolver } from "@hookform/resolvers/zod";
import dayjs from "dayjs";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";

// CreateUser hook
export const useCreateUser = () => {
    const form = useForm<CreateUserForm>({
        resolver: zodResolver(createUserSchema),
        defaultValues: {
            role: "",
        },
    });

    const [isLoading, setIsLoading] = useState(false);

    const { reset } = form;

    const onReset = () => {
        reset({
            name: "",
            email: "",
            password: "",
            confirm_password: "",
            role: "",
            phone: "",
            dob: undefined,
            address: "",
            profile: null,
        });
    };

    const onSubmit = async (data: CreateUserForm) => {
        try {
            setIsLoading(true);
            const formData = new FormData();
            formData.append("name", data.name);
            formData.append("email", data.email);
            formData.append("password", data.password);
            formData.append("confirm_password", data.confirm_password);
            formData.append("role", data.role.toString());
            if (data.phone) {
                formData.append("phone", data.phone);
            }
            if (data.dob) {
                formData.append("dob", dayjs(data.dob).format("YYYY-MM-DD"));
            }
            if (data.address) {
                formData.append("address", data.address);
            }
            if (data.profile && data.profile.length > 0) {
                formData.append("profile", data.profile[0]);
            }
            const res = await createUserApi(formData);
            const { message } = res.data;
            toast.success(message);
            onReset();
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

    return { ...form, onSubmit, isLoading, onReset };
};

// Update User hook
export const useUpdateUser = (userId?: number) => {
    const form = useForm<UpdateUserForm>({
        resolver: zodResolver(updateUserSchema),
        defaultValues: {
            role: "",
        },
    });

    const { reset, setError } = form;
    const [isLoading, setIsLoading] = useState(false);
    const [profilePreview, setProfilePreview] = useState<string | null>(null);

    /* ---------------- FETCH & BIND ---------------- */
    useEffect(() => {
        if (!userId) return;

        getSingleUserApi(userId).then((res) => {
            const user = res.data?.data;

            reset({
                name: user.name,
                email: user.email,
                role: user.role ? "1" : "0",
                phone: user.phone ?? "",
                address: user.address ?? "",
                dob: user.dob ? user.dob : undefined,
                profile: null,
            });

            setProfilePreview(user.profile_path ?? null);
        });
    }, [userId, reset]);

    /* ---------------- RESET ---------------- */
    const onReset = () => {
        reset({
            name: "",
            email: "",
            role: "",
            phone: "",
            dob: undefined,
            address: "",
            profile: null,
        });
        setProfilePreview(null);
    };

    /* ---------------- SUBMIT (UPDATE) ---------------- */
    const onSubmit = async (data: UpdateUserForm) => {
        if (!userId) return;

        try {
            setIsLoading(true);

            const formData = new FormData();
            formData.append("name", data.name);
            formData.append("email", data.email);
            formData.append("role", data.role.toString());

            if (data.phone) formData.append("phone", data.phone);
            if (data.address) formData.append("address", data.address);
            if (data.dob)
                formData.append("dob", dayjs(data.dob).format("YYYY-MM-DD"));
            if (data.profile && data.profile.length > 0) {
                formData.append("profile", data.profile[0]);
            }

            const res = await updateUserApi(userId, formData);
            const { message } = res.data;
            toast.success(message);
        } catch (err: any) {
            const res = err.response?.data;
            if (Array.isArray(res)) {
                res.forEach((e) => {
                    setError(e.loc[0], {
                        type: "server",
                        message: e.msg,
                    });
                });
            }
        } finally {
            setIsLoading(false);
        }
    };

    return {
        ...form,
        onSubmit,
        onReset,
        isLoading,
        profilePreview,
        setProfilePreview,
    };
};

// UserProfile hook
export const useUserProfile = () => {
    const form = useForm<UpdateUserForm>({
        resolver: zodResolver(updateUserSchema),
        defaultValues: {
            role: "",
        },
    });

    const { reset, setError } = form;
    const [isLoading, setIsLoading] = useState(false);
    const [profilePreview, setProfilePreview] = useState<string | null>(null);
    const [profileUserId, setProfileUserId] = useState<number | null>(null);

    /* ---------------- FETCH & BIND ---------------- */
    useEffect(() => {
        getLoginUserApi().then((res) => {
            const user = res.data?.data;
            setProfileUserId(user.id);

            reset({
                name: user.name,
                email: user.email,
                role: user.role ? "1" : "0",
                phone: user.phone ?? "",
                address: user.address ?? "",
                dob: user.dob ? user.dob : undefined,
                profile: null,
            });

            setProfilePreview(user.profile_path ?? null);
        });
    }, [reset]);

    /* ---------------- RESET ---------------- */
    const onReset = () => {
        reset({
            name: "",
            email: "",
            role: "",
            phone: "",
            dob: undefined,
            address: "",
            profile: null,
        });
        setProfilePreview(null);
    };

    /* ---------------- SUBMIT (UPDATE) ---------------- */
    const onSubmit = async (data: UpdateUserForm) => {
        if (!profileUserId) return;

        try {
            setIsLoading(true);

            const formData = new FormData();
            formData.append("name", data.name);
            formData.append("email", data.email);
            formData.append("role", data.role.toString());

            if (data.phone) formData.append("phone", data.phone);
            if (data.address) formData.append("address", data.address);
            if (data.dob)
                formData.append("dob", dayjs(data.dob).format("YYYY-MM-DD"));
            if (data.profile && data.profile.length > 0) {
                formData.append("profile", data.profile[0]);
            }

            const res = await updateUserApi(profileUserId, formData);
            const { message } = res.data;
            toast.success(message);
        } catch (err: any) {
            const res = err.response?.data;
            if (Array.isArray(res)) {
                res.forEach((e) => {
                    setError(e.loc[0], {
                        type: "server",
                        message: e.msg,
                    });
                });
            }
        } finally {
            setIsLoading(false);
        }
    };

    return {
        ...form,
        onSubmit,
        onReset,
        isLoading,
        profilePreview,
        setProfilePreview,
    };
};
