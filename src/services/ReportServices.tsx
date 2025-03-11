import axios from "axios";

const API_URL_Enroll =
  "https://localhost:7108/api/StudentDetail/enroll-students/";

const API_URL_ALLINFO = "https://localhost:7108/api/StudentDetail/all-students";

const API_URL_SemWise =
  "https://localhost:7108/api/StudentDetail/semWise-students";

const API_URL_YearWise =
  "https://localhost:7108/api/StudentDetail/yearWise-students";

export const getAllStudentInfo = async () => {
  try {
    const response = await axios.get(API_URL_ALLINFO);
    return response.data;
  } catch (error) {
    console.error("Error fetching students:", error);
    return [];
  }
};

export const getSemWiseStudentInfo = async () => {
  try {
    const response = await axios.get(API_URL_SemWise);

    return Array.isArray(response.data) ? response.data : [];
  } catch (error) {
    console.error("Error fetching students:", error);
    return [];
  }
};

export const getYearWiseStudentInfo = async () => {
  try {
    const response = await axios.get(API_URL_YearWise);
    return Array.isArray(response.data) ? response.data : [];
  } catch (error) {
    console.error("Error fetching year-wise students:", error);
    return [];
  }
};

export const getEnrollStudentsById = async () => {
  try {
    const response = await axios.get(
      `${API_URL_Enroll}/students/enroll-students/programs`
    );
    return response.data;
  } catch (error) {
    console.error("Error fetching students:", error);
    return [];
  }
};
