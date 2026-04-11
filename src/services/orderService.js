import axiosInstance from "../utils/axiosInstance";

export const createOrder = async (orderData) => {
  const { data } = await axiosInstance.post("/orders", orderData);
  return data.data;
};

export const getMyOrders = async () => {
  const { data } = await axiosInstance.get("/orders/my-orders");
  return data.data; // Array of orders
};
