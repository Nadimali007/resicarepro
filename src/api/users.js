import axios from "axios";

export const userApi = axios.create({
  baseURL: "http://localhost:5000/api",
  headers: {
    "Content-Type": "application/json",
  },
});

export const loginUser = async (credentials) => {
  const response = await userApi.post("/auth/login", credentials);
  return response.data;
};

export const registerUser = async (userData) => {
  const response = await userApi.post("/auth/register", userData);
  return response.data;
};

export default userApi;