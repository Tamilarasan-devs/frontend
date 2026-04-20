import axiosInstance from "../utils/axiosInstance";

// @desc Get user wishlist
export const getWishlist = async () => {
  const response = await axiosInstance.get("/wishlist");
  return response.data;
};

// @desc Add product to wishlist
export const addToWishlist = async ({ productId }) => {
  const response = await axiosInstance.post("/wishlist", { productId });
  return response.data;
};

// @desc Remove item from wishlist by wishlist item ID
export const removeFromWishlist = async (id) => {
  const response = await axiosInstance.delete(`/wishlist/${id}`);
  return response.data;
};

// @desc Remove product from wishlist by product ID
export const removeProductFromWishlist = async (productId) => {
  const response = await axiosInstance.delete(`/wishlist/product/${productId}`);
  return response.data;
};

// @desc Check if a product is in the wishlist
export const checkWishlistStatus = async (productId) => {
  const response = await axiosInstance.get(`/wishlist/check/${productId}`);
  return response.data;
};

// @desc Clear user wishlist
export const clearWishlist = async () => {
  const response = await axiosInstance.delete("/wishlist");
  return response.data;
};
