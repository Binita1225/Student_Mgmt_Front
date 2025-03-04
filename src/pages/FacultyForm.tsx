import React, { useState, useEffect } from "react";
import { addFaculty, updateFaculty } from "../services/FacultyService";

const FacultyForm = ({ faculty, onClose }) => {
  const [name, setName] = useState(faculty ? faculty.facultyName : "");

  const handleSubmit = async (e) => {
    e.preventDefault();

    const facultyData = {
      facultyId: faculty?.facultyId,
      facultyName: name.trim(),
    };

    try {
      if (faculty && faculty.facultyId) {
        console.log("Updating faculty with ID:", faculty.facultyId);
        await updateFaculty(faculty.facultyId, facultyData);
      } else {
        console.log("Adding new faculty:", facultyData);
        await addFaculty(facultyData);
      }
      onClose();
    } catch (error) {
      console.error("Error saving faculty:", error);
    }
  };

  useEffect(() => {
    console.log("Faculty Form Loaded with:", faculty);
  }, [faculty]);

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
      <div className="bg-white p-6 rounded-lg shadow-lg w-1/3">
        <h2 className="text-xl font-bold mb-4">
          {faculty ? "Edit Faculty" : "Add Faculty"}
        </h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700">
              Faculty Name
            </label>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="mt-1 p-2 w-full border rounded-md focus:ring-2 focus:ring-blue-400"
              required
            />
          </div>
          <div className="flex justify-end space-x-2">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 bg-gray-700 text-white rounded-md hover:bg-gray-900"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-4 py-2 bg-gray-700 text-white rounded-md  hover:bg-gray-900"
            >
              {faculty ? "Update" : "Add"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default FacultyForm;
