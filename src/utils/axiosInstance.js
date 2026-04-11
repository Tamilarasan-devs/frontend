import axios from 'axios'

export const axiosInstance = axios.create({
    baseURL: "https://aayubakwath-backend.onrender.com/api/v1",
    // baseURL: "http://localhost:8080/api/v1",
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

export const API_URL = 'https://aayubakwath-backend.onrender.com/'
// export const API_URL = 'http://localhost:8080/'

export default axiosInstance;
