// api.ts
import axios from "axios";

const api = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL,
  withCredentials: true,
});

let accessToken: string | null = null;

export const setAccessToken = (token: string | null) => {
  accessToken = token;
};
export const getAccessToken = () => accessToken;

// Request interceptor
const getCookie = (name: string) =>
  document.cookie
    .split("; ")
    .find((row) => row.startsWith(name + "="))
    ?.split("=")[1];

api.interceptors.request.use((config) => {
  if (config.url?.includes("/auth/refresh")) {
    const csrfToken = getCookie("csrf_refresh_token");
    if (csrfToken) config.headers["X-CSRF-TOKEN"] = csrfToken;
  }

  if (accessToken) {
    config.headers.Authorization = `Bearer ${accessToken}`;
  }
  return config;
});

// Response interceptor: auto refresh
api.interceptors.response.use(
  (res) => res,
  async (error) => {
    const original = error.config;

    if (
      error.response?.status === 401 &&
      !original._retry &&
      !original.url.includes("/auth/refresh")
    ) {
      original._retry = true;
      try {
        const res = await api.post("/auth/refresh");
        setAccessToken(res.data.access_token);
        original.headers.Authorization = `Bearer ${res.data.access_token}`;
        return api(original);
      } catch {
        setAccessToken(null);
        window.location.replace("/");
      }
    }
    return Promise.reject(error);
  },
);

export default api;
