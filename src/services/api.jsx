import axios, { AxiosHeaders } from "axios";

console.log("Script is running");

const apiUrl = import.meta.env.VITE_APP_API_URL;
console.log("Latest API URL from environment:", apiUrl);

const API = axios.create({
  baseURL: apiUrl,
  withCredentials: true, // Ensure cookies and credentials are sent with requests
});

// Setting headers using AxiosHeaders
API.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");
  const headers = new AxiosHeaders(config.headers);

  if (token) {
    headers.set("Authorization", `Bearer ${token}`);
  }

  headers.setContentType("application/json");
  headers.set("Custom-Header", "CustomValue");

  config.headers = headers.toJSON(); // Convert headers to JSON before attaching to config

  return config;
});

console.log("Axios instance created");

// Sample API call to fetch roles
API.get("/users/roles")
  .then((response) => {
    console.log("Roles:", response.data);
  })
  .catch((error) => {
    console.error("Error fetching roles:", error);
  });

export default API;
