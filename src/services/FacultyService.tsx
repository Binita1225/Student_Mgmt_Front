import axios from "axios";

const API_URL = "https://localhost:7108/api/Faculty";

export const getFaculty = async () => {
  const response = await axios.get(API_URL);
  return response.data;
};

export const addFaculty = async (facultyData) => {
  console.log("Sending data:", facultyData);
  const response = await axios.post(API_URL, facultyData);
  return response.data;
};

export const updateFaculty = async (id, facultyData) => {
  console.log("Updating faculty with ID:", id, "Data:", facultyData);
  return await axios.put(
    `https://localhost:7108/api/Faculty/${id}`,
    facultyData
  );
};

export const deleteFaculty = async (facultyId) => {
  await axios.delete(`${API_URL}/${facultyId}`);
};
