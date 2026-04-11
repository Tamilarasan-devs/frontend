import axiosInstance from "../utils/axiosInstance";

export const getProfile = async () => {
  const { data } = await axiosInstance.get("/users/me");
  return data.data; // The user object along with addresses
};

export const updateProfile = async (profileData) => {
  const { data } = await axiosInstance.put("/users/profile", profileData);
  return data.data;
};

export const addAddress = async (addressData) => {
  const { data } = await axiosInstance.post("/users/addresses", addressData);
  return data.data;
};

export const removeAddress = async (addressId) => {
  const { data } = await axiosInstance.delete(`/users/addresses/${addressId}`);
  return data.data;
};
