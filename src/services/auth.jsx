import API from "./api";

export const login = async (credentials) => {
  const response = await API.post("/auth/login", credentials);
  localStorage.setItem("token", response.data.token);
  return response.data;
};

export const register = async (user) => {
  const response = await API.post("/auth/register", user);
  return response.data;
};

export const logout = () => {
  localStorage.removeItem("token");
};
