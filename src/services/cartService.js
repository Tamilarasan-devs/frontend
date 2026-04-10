import api from "../config/api";

export const getCart = async () => {
  const response = await api.get("/cart");
  return response.data;
};

export const addToCart = async ({ productId, quantity }) => {
  const response = await api.post("/cart", { productId, quantity });
  return response.data;
};

export const updateCartItem = async ({ id, quantity }) => {
  const response = await api.put(`/cart/${id}`, { quantity });
  return response.data;
};

export const removeFromCart = async (id) => {
  const response = await api.delete(`/cart/${id}`);
  return response.data;
};

export const clearCart = async () => {
  const response = await api.delete("/cart");
  return response.data;
};
