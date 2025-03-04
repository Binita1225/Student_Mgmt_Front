import React, { useState, useEffect } from "react";
import { addProgram, updateProgram } from "../services/ProgramServices";
import { getFaculty } from "../services/FacultyService";
import { useNavigate } from "react-router";

const ProgramForm = ({ program, onClose }) => {
  const [formData, setFormData] = useState({
    programId: "",
    programName: "",
    facultyId: "",
    durationInYears: 0,
    description: "",
    isActive: true,
  });

  const [faculties, setFaculties] = useState([]);

  const navigate = useNavigate();

  useEffect(() => {
    if (program) {
      setFormData({
        programId: program.programId,
        programName: program.programName,
        facultyId: program.facultyId,
        durationInYears: program.durationInYears,
        description: program.description,
        isActive: program.isActive,
      });
    }

    const fetchFaculties = async () => {
      try {
        const response = await getFaculty();
        console.log("Faculties fetched:", response);
        setFaculties(response);
      } catch (error) {
        console.error("Error fetching faculties", error);
      }
    };

    fetchFaculties();
  }, [program]);

  const handleInputChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement
    >
  ) => {
    const { name, value, type, checked } = e.target;
    setFormData({
      ...formData,
      [name]:
        name === "facultyId"
          ? Number(value)
          : type === "checkbox"
          ? checked
          : value,
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const { programId, ...data } = formData; 
    const formDataToSubmit = programId ? formData : data;

    try {
 

      if (programId) {
        await updateProgram(programId, formDataToSubmit);
        console.log("Program updated successfully!");
      } else {
        await addProgram(formDataToSubmit);
        console.log("Program added successfully!");
      }

      onClose();
      navigate("/program", { replace: true });
    } catch (error) {
      console.error("Error saving program", error);
      if (error.response) {
        console.log("Server Response:", error.response.data);
      }
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white p-6 rounded-lg shadow-lg max-w-md w-full">
        <h2 className="text-2xl font-semibold text-gray-800 mb-4">
          {program ? "Edit Program" : "Add Program"}
        </h2>

        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label htmlFor="programName" className="block text-gray-700">
              Program Name
            </label>
            <input
              type="text"
              id="programName"
              name="programName"
              value={formData.programName}
              onChange={handleInputChange}
              className="w-full p-2 border border-gray-300 rounded-md"
              required
            />
          </div>

          <div className="mb-4">
            <label htmlFor="facultyId" className="block text-gray-700">
              Faculty
            </label>
            <select
              id="facultyId"
              name="facultyId"
              value={formData.facultyId}
              onChange={handleInputChange}
              className="w-full p-2 border border-gray-300 rounded-md"
              required
            >
              <option value="">Select Faculty</option>
              {faculties.map((faculty) => (
                <option key={faculty.facultyId} value={faculty.facultyId}>
                  {faculty.facultyName}
                </option>
              ))}
            </select>
          </div>

          <div className="mb-4">
            <label htmlFor="durationInYears" className="block text-gray-700">
              Duration (Years)
            </label>
            <input
              type="number"
              id="durationInYears"
              name="durationInYears"
              value={formData.durationInYears}
              onChange={handleInputChange}
              className="w-full p-2 border border-gray-300 rounded-md"
              required
            />
          </div>

          <div className="mb-4">
            <label htmlFor="description" className="block text-gray-700">
              Description
            </label>
            <textarea
              id="description"
              name="description"
              value={formData.description}
              onChange={handleInputChange}
              className="w-full p-2 border border-gray-300 rounded-md"
              required
            ></textarea>
          </div>

          <div className="mb-4 flex items-center">
            <input
              type="checkbox"
              id="isActive"
              name="isActive"
              checked={formData.isActive}
              onChange={handleInputChange}
              className="mr-2"
            />
            <label htmlFor="isActive" className="text-gray-700">
              Is Active
            </label>
          </div>

          <div className="flex justify-end space-x-3">
            <button
              type="button"
              onClick={onClose}
              className="bg-gray-300 text-gray-700 px-6 py-2 rounded-md hover:bg-gray-400"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="bg-blue-600 text-white px-6 py-2 rounded-md hover:bg-blue-700"
            >
              {program ? "Save Changes" : "Add Program"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ProgramForm;
