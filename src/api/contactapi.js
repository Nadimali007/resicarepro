import axios from "axios";

export const contactApi = axios.create({
  baseURL: "http://localhost:5000/api",
  headers: {
    "Content-Type": "application/json",
  },
});

export const submitContactForm = async (contactData) => {
  const response = await contactApi.post("/contact", contactData);
  return response.data;
};

export default contactApi;