import type { SearchPostType } from "@/types/data_type";
import api from "./api";

// Get All Post Api
export const getPostsApi = (page = 1, perPage = 10) => {
    return api.get("/api/posts", {
        params: {
            page,
            per_page: perPage,
        },
    });
};

// post create api
export const createPostApi = (formData: FormData) =>
    api.post("/api/posts/create", formData, {
        headers: { "Content-Type": "multipart/form-data" },
    });

// Search Posts Api
export const searchPostsApi = (
    data: SearchPostType,
    page = 1,
    perPage = 10,
) => {
    return api.post("/api/posts/search", data, {
        params: {
            page,
            per_page: perPage,
        },
    });
};

// Get Post Api
export const getPostApi = (postId: number) => {
    return api.get(`/api/posts/${postId}`);
};

// update post
export const updatePostApi = (postId: number, formData: FormData) =>
    api.put(`/api/posts/${postId}`, formData, {
        headers: { "Content-Type": "multipart/form-data" },
    });

// delete post
export const deletePostApi = (post_ids: number[]) =>
    api.delete(`/api/posts/delete`, {
        data: { post_ids },
    });
