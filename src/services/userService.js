import api from "../config/api";
export const getProfile = async () => {
  const { data } = await api.get("/users/me");
  return data.data; // The user object along with addresses
};

export const updateProfile = async (profileData) => {
  const { data } = await api.put("/users/profile", profileData);
  return data.data;
};

export const addAddress = async (addressData) => {
  const { data } = await api.post("/users/addresses", addressData);
  return data.data;
};

export const removeAddress = async (addressId) => {
  const { data } = await api.delete(`/users/addresses/${addressId}`);
  return data.data;
};
