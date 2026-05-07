import axios from "axios";

const backendUrl = import.meta.env.VITE_APP_URL ?? window.location.origin;

const axiosClient = axios.create({
    baseURL: backendUrl,
    withCredentials: true,
    withXSRFToken: true
})

// Do not automatically attach a bearer token from localStorage.
// This app uses Sanctum cookie-based session auth for the SPA; leaving
// an old token in localStorage could cause requests to be authenticated
// as a different user. If you need token auth, set it explicitly per-request.

axiosClient.interceptors.response.use(
    (response) => {
        return response;
    },
    (error) => {
        if (error.response && error.response.status === 401) {
            localStorage.removeItem('token');
            if (error.config?.url !== '/api/user' && !window.location.pathname.startsWith('/auth')) {
                window.location.href = '/auth/login';
            }
        }
        return Promise.reject(error);
    }
);

export default axiosClient;
