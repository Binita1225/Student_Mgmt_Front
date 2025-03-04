import React, { useState, useEffect } from "react";
import { getFaculty, deleteFaculty } from "../services/FacultyService";
import FacultyForm from "./FacultyForm";

const Faculty = () => {
  const [faculties, setFaculties] = useState([]);
  const [selectedFaculty, setSelectedFaculty] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    loadFaculties();
  }, []);

  const loadFaculties = async () => {
    try {
      const data = await getFaculty();
      setFaculties(data);
    } catch (error) {
      console.error("Error loading faculties:", error);
    }
  };

  const handleDelete = async (id) => {
    if (window.confirm("Are you sure you want to delete this faculty?")) {
      try {
        await deleteFaculty(id);
        loadFaculties();
      } catch (error) {
        console.error("Error deleting faculty:", error);
      }
    }
  };

  const openModal = (faculty = null) => {
    console.log("Editing Faculty:", faculty);
    setSelectedFaculty(faculty);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setSelectedFaculty(null);
    loadFaculties();
  };

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-4">
        <h1 className="text-2xl font-bold">Faculty List</h1>
        <button
          onClick={() => openModal()}
          className="bg-gray-700 text-white px-4 py-2 rounded-md hover:bg-gray-900"
        >
          Add Faculty
        </button>
      </div>

      {/* Faculty Table */}
      <div className="overflow-x-auto bg-white p-4 rounded-lg shadow-md">
        <table className="w-full border-collapse">
          <thead>
            <tr className="bg-gray-800 text-white">
              <th className="p-3">ID</th>
              <th className="p-3">Name</th>
              <th className="p-3">Actions</th>
            </tr>
          </thead>
          <tbody>
            {faculties.map((faculty) => (
              <tr key={faculty.facultyId} className="border-b text-center">
                <td className="p-3">{faculty.facultyId}</td>
                <td className="p-3">{faculty.facultyName}</td>
                <td className="p-3">
                  <button
                    onClick={() => openModal(faculty)}
                    className="px-3 py-1 bg-gray-700 text-white rounded-md  hover:bg-gray-900 mr-2"
                  >
                    Edit
                  </button>

                  <button
                    onClick={() => handleDelete(faculty.facultyId)}
                    className="bg-gray-700 text-white px-3 py-1 rounded-md hover:bg-gray-900"
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Faculty Form Modal */}
      {isModalOpen && (
        <FacultyForm faculty={selectedFaculty} onClose={closeModal} />
      )}
    </div>
  );
};

export default Faculty;
