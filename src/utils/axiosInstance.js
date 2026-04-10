import axios from 'axios'
export const axiosInstance = axios.create({
    baseURL:"https://aayubakwath-backend.onrender.com/api/v1",
    // baseURL:"http://localhost:8080/api/v1",
    withCredentials:true
})
export const API_URL= 'https://aayubakwath-backend.onrender.com/'
// export const API_URL= 'http://localhost:8080/'
