import axios from 'axios'

export const axiosInstance = axios.create({
    // baseURL: "https://aayubakwath-backend.onrender.com/api/v1",
    baseURL: "http://localhost:8080/api/v1",
    withCredentials: true
})

// Request interceptor to attach JWT token
axiosInstance.interceptors.request.use(
    (config) => {
        const token = localStorage.getItem('token');
        if (token) {
            config.headers['Authorization'] = `Bearer ${token}`;
        }
        return config;
    },
    (error) => {
        return Promise.reject(error);
    }
);

// Response interceptor to handle 401 errors
axiosInstance.interceptors.response.use(
    (response) => {
        return response;
    },
    (error) => {
        if (error.response && error.response.status === 401) {
            // Check if it's a token expired error
            const message = error.response.data?.message;
            if (message && (message.includes("expired") || message.includes("log in again"))) {
                localStorage.removeItem('token');
                localStorage.removeItem('user');
                
                // Avoid infinite redirect if already on login page
                if (!window.location.pathname.includes('/login')) {
                    window.location.href = '/login';
                }
            }
        }
        return Promise.reject(error);
    }
);

// export const API_URL = 'https://aayubakwath-backend.onrender.com/'
export const API_URL = 'http://localhost:8080/'

export default axiosInstance;
