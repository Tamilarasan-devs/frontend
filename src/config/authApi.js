// src/api/authApi.js
import axios from "axios";
import  {API_URL}  from "../utils/axiosInstance";


// Login function
export const loginUser = async (credentials) => {
  const response = await axios.post(`${API_URL}/auth/login`, credentials);
  return response.data; // React Query expects data
};

// You can add more auth endpoints here
export const registerUser = async (userData) => {
  const response = await axios.post(`${API_URL}/auth/register`, userData);
  return response.data;
};