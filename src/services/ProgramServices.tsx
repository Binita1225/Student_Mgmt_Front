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

// export const addProgram = async (programData: any) => {
//   // Convert necessary fields before sending
//   const payload = {
//     programId: programData.programId || null, // Use null instead of empty string
//     programName: programData.programName,
//     facultyId: Number(programData.facultyId), // Convert to number
//     durationInYears: Number(programData.durationInYears), // Convert to number
//     description: programData.description,
//     isActive: programData.isActive,
//   };

//   console.log("Sending data:", payload); // Debugging log

//   try {
//     const response = await axios.post(API_URL, payload);
//     return response.data;
//   } catch (error) {
//     console.error("Error saving program", error.response?.data || error);
//     throw error;
//   }
// };

export const updateProgram = async (id, programData) => {
  console.log("Updating program with ID:", id, "Data:", programData);
  return await axios.put(`${API_URL}/${id}`, programData);
};

export const deleteProgram = async (programId) => {
  await axios.delete(`${API_URL}/${programId}`);
};
