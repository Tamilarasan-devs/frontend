import axios from 'axios';

// export const API_URL = 'https://aayubakwath-backend.onrender.com/api/v1'
export const API_URL = 'http://localhost:8080/api/v1'
const api = axios.create({
  baseURL: API_URL,
});

// Request interceptor to attach JWT token
api.interceptors.request.use(
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

export default api;