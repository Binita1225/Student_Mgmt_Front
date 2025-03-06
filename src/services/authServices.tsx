import axios from "axios";

const API_URL = "https://localhost:7108/api/User";

export const registerUser = async (userData) => {
  return axios.post(`${API_URL}/register`, userData);
};

export const loginUser = async (userData) => {
  return axios.post(`${API_URL}/login`, userData);
};

export const logoutUser = () => {
  localStorage.removeItem("token");
};

export const getToken = () => {
  return localStorage.getItem("token");
};
