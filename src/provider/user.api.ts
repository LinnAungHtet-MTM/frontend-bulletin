// user.api.ts
import type { SearchType } from "@/types/data_type";
import api from "./api";

// Get Login User Api
export const getLoginUserApi = () => api.get("/api/login_user")

// Get All User Api
export const getUsersApi = (page = 1, perPage = 10) => {
    return api.get("/api/users", {
        params: {
            page,
            per_page: perPage
        }
    });
}

// Search Users Api
export const searchUsersApi = (data: SearchType, page = 1, perPage = 10) => {
    return api.post("/api/users/search", data, {
        params: {
            page,
            per_page: perPage
        }
    });
}

// users lock/unlock api
export const lockUsersApi = (data: { user_ids: number[]; lock_flg: 0 | 1 }) =>
    api.put("/api/users/lock", data);

// user create api
export const createUserApi = (formData: FormData) =>
    api.post("/api/users/create", formData,
    {
        headers: { "Content-Type": "multipart/form-data" },
    });

// get single user api
export const getSingleUserApi = (userId: number) => api.get(`/api/users/${userId}`)

// update user
export const updateUserApi = (userId: number, formData: FormData) =>
    api.put(`/api/users/${userId}`, formData,
    {
        headers: { "Content-Type": "multipart/form-data" },
    });

// delete user
export const deleteUsersApi = (user_ids: number[]) =>
    api.delete("/api/users/delete", {
        data: { user_ids }
    });
