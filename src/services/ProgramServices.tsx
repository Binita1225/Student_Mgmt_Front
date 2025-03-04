import axios from "axios";

const API_URL = "https://localhost:7108/api/Program";

export const getProgram = async () => {
  const response = await axios.get(API_URL);
  return response.data;
};

export const addProgram = async (programData) => {
  try {
    const response = await axios.post(`${API_URL}`, programData);
    return response.data;
  } catch (error) {
    console.error(
      "Error adding program",
      error.response ? error.response.data : error.message
    );
    throw error;
  }
};

export const updateProgram = async (id, programData) => {
  console.log("Updating program with ID:", id, "Data:", programData);

  return await axios.put(`${API_URL}/${id}`, programData, {
    headers: {
      "Content-Type": "application/json",
    },
  });
};

export const deleteProgram = async (programId) => {
  await axios.delete(`${API_URL}/${programId}`);
};
