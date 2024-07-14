import axios from "axios";

console.log("Script is running");

const apiUrl = import.meta.env.VITE_APP_API_URL;
console.log("API URL from environment:", apiUrl);

const API = axios.create({
  baseURL: apiUrl,
});

API.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

console.log("Axios instance created");

export default API;
