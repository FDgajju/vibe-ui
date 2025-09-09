import axios from "axios";
import { API_BASE_URL } from "../constants/env";

const api = axios.create({
  baseURL: API_BASE_URL || "http://localhost:5000/api", // change to your backend
  timeout: 10000, // optional
  headers: {
    "Content-Type": "application/json",
  },
});

// Request interceptor
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("token"); // or use cookies/context
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error),
);

// Response interceptor
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      // Handle unauthorized
      console.error("Unauthorized, logging out...");
      // Example: redirect to login
      // window.location.href = "/login";
    }
    return Promise.reject(error);
  },
);

export default api;
