import z from "zod";

const MAX_FILE_SIZE = 2 * 1024 * 1024; // 2MB
const ACCEPTED_IMAGE_TYPES = ["image/jpeg", "image/jpg", "image/png"];

// CreateUser Schema
export const createUserSchema = z.object({
    name: z.string().min(1, "Name field is required"),
    email: z
        .string()
        .min(1, "Email Address field is required")
        .email("Email Address field format is invalid"),
    password: z.string().min(1, "Password field is required"),
    confirm_password: z.string().min(1, "Confirm Password field is required"),
    role: z.string().min(1, "Role field is required"),
    // phone validation
    phone: z
        .string()
        .optional()
        .refine(
            (val) => {
                if (!val || val.length === 0) return true;
                const isNumeric = /^\d+$/.test(val);
                if (!isNumeric) return false;
                return val.length > 6 && val.length <= 11;
            },
            {
                message:
                    "Phone number must be between 6 and 11 digits and numeric only",
            },
        )
        .or(z.literal("")),
    dob: z.date().optional().nullable().or(z.string()),
    address: z.string().optional(),
    // profile validation
    profile: z
        .any()
        .refine((files) => {
            if (!files || files.length === 0) return true;
            return ACCEPTED_IMAGE_TYPES.includes(files[0]?.type);
        }, "Only .jpg, .jpeg, and .png formats are supported.")
        .refine((files) => {
            if (!files || files.length === 0) return true;
            return files[0]?.size <= MAX_FILE_SIZE;
        }, `Profile image max size is 2MB.`),
});

export type CreateUserForm = z.infer<typeof createUserSchema>;


// UpdateUser Schema
export const updateUserSchema = z.object({
    name: z.string().min(1, "Name field is required"),
    email: z
        .string()
        .min(1, "Email Address field is required")
        .email("Email Address field format is invalid"),
    role: z.string().min(1, "Role field is required"),
    // phone validation
    phone: z
        .string()
        .optional()
        .refine(
            (val) => {
                if (!val || val.length === 0) return true;
                const isNumeric = /^\d+$/.test(val);
                if (!isNumeric) return false;
                return val.length > 6 && val.length <= 11;
            },
            {
                message:
                    "Phone number must be between 6 and 11 digits and numeric only",
            },
        )
        .or(z.literal("")),
    dob: z.date().optional().nullable().or(z.string()),
    address: z.string().optional(),
    // profile validation
    profile: z
        .any()
        .refine((files) => {
            if (!files || files.length === 0) return true;
            return ACCEPTED_IMAGE_TYPES.includes(files[0]?.type);
        }, "Only .jpg, .jpeg, and .png formats are supported.")
        .refine((files) => {
            if (!files || files.length === 0) return true;
            return files[0]?.size <= MAX_FILE_SIZE;
        }, `Profile image max size is 2MB.`),
});

export type UpdateUserForm = z.infer<typeof updateUserSchema>;
