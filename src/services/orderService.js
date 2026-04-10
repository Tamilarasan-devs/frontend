// import { axiosInstance } from "../utils/axiosInstance";
import api from "../config/api";

export const createOrder = async (orderData) => {
  const { data } = await api.post("/orders", orderData);
  return data.data;
};

export const getMyOrders = async () => {
  const { data } = await api.get("/orders/my-orders");
  return data.data; // Array of orders
};
