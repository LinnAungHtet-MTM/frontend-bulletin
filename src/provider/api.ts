// api.ts
import axios from "axios";

const api = axios.create({ baseURL: import.meta.env.VITE_API_BASE_URL });

api.interceptors.request.use((config) => {
    // custom flag
    if (config.headers?.skipAuth) {
        return config;
    }

    const token = localStorage.getItem("token");
    if (token) {
        config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
});

const getAccessToken = () => localStorage.getItem("token");
const getRefreshToken = () => localStorage.getItem("refresh_token");

const setAccessToken = (token: string) => {
    localStorage.setItem("token", token);
};

let refreshPromise: Promise<string> | null = null;

const refreshAccessToken = async (): Promise<string> => {
    if (!refreshPromise) {
        refreshPromise = axios
            .post(
                `${import.meta.env.VITE_API_BASE_URL}/auth/refresh`,
                {},
                {
                    headers: {
                        Authorization: `Bearer ${getRefreshToken()}`,
                    },
                },
            )
            .then((res) => {
                const newToken = res.data.data.access_token;
                setAccessToken(newToken);
                return newToken;
            })
            .finally(() => {
                refreshPromise = null;
            });
    }

    return refreshPromise;
};

api.interceptors.response.use(
    (res) => res,
    async (error) => {
        const originalRequest = error.config;

        if (error.response?.status !== 401 || originalRequest._retry) {
            return Promise.reject(error);
        }

        originalRequest._retry = true;

        try {
            const newToken = await refreshAccessToken();
            originalRequest.headers.Authorization = `Bearer ${newToken}`;
            return api(originalRequest);
        } catch (err) {
            localStorage.clear();
            window.location.href = "/";
            return Promise.reject(err);
        }
    },
);

export default api;
