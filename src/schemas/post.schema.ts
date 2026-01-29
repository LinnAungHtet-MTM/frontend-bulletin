import z from "zod";

// CreatePost Schema
export const createPostSchema = z.object({
    title: z
        .string()
        .min(1, "Title Field is required")
        .max(255, "Title Field must not be greater than 255"),
    description: z.string().min(1, "Description Field is required"),
});

export type CreatePostForm = z.infer<typeof createPostSchema>;

// UpdatePost Schema
export const updatePostSchema = z.object({
    title: z
        .string()
        .min(1, "Title Field is required")
        .max(255, "Title Field must not be greater than 255"),
    description: z.string().min(1, "Description Field is required"),
    status: z.number(),
});

export type UpdatePostForm = z.infer<typeof updatePostSchema>;
