import axios from "axios";

const API_URL = "https://localhost:7108/api/User";

export const registerUser = async (userData: any) => {
  return axios.post(`${API_URL}/register`, userData);
};

export const loginUser = async (userData: any) => {
  return axios.post(`${API_URL}/login`, userData);
};
