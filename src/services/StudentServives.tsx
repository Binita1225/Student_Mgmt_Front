import axios from "axios";

const API_URL = "https://localhost:7108/api/Student";

export const getAllStudents = async () => {
  const response = await axios.get(API_URL);
  return response.data;
};

export const getStudentById = async (id: any) => {
  const response = await axios.get(`${API_URL}/${id}`);
  return response.data;
};

export const addStudent = async (student: any) => {
  const response = await axios.post(API_URL, student);
  return response.data;
};

export const updateStudent = async (id: any, student: any) => {
  const response = await axios.put(`${API_URL}/${id}`, student);
  return response.data;
};

export const deleteStudent = async (id: any) => {
  const response = await axios.delete(`${API_URL}/${id}`);
  return response.data;
};
