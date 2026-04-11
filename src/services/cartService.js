import axiosInstance from "../utils/axiosInstance";

export const getCart = async () => {
  const response = await axiosInstance.get("/cart");
  return response.data;
};

export const addToCart = async ({ productId, quantity }) => {
  const response = await axiosInstance.post("/cart", { productId, quantity });
  return response.data;
};

export const updateCartItem = async ({ id, quantity }) => {
  const response = await axiosInstance.put(`/cart/${id}`, { quantity });
  return response.data;
};

export const removeFromCart = async (id) => {
  const response = await axiosInstance.delete(`/cart/${id}`);
  return response.data;
};

export const clearCart = async () => {
  const response = await axiosInstance.delete("/cart");
  return response.data;
};
