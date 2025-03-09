import React, { useState, useEffect } from "react";
import { getProgram, deleteProgram } from "../services/ProgramServices";
import ProgramForm from "./ProgramForm";

const Program = () => {
  const [programs, setPrograms] = useState([]);
  const [selectedProgram, setSelectedProgram] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    console.log("Program component mounted");
    loadPrograms();
  }, []);

  const loadPrograms = async () => {
    try {
      const data = await getProgram();
      setPrograms(data);
    } catch (error) {
      console.error("Error fetching programs", error);
      setError(`Error loading programs: ${error.message}`);
    }
  };

  const handleDelete = async (id) => {
    if (window.confirm("Are you sure you want to delete this program?")) {
      try {
        await deleteProgram(id);
        loadPrograms();
      } catch (error) {
        console.error("Error deleting program:", error);
      }
    }
  };

  const openModal = (program = null) => {
    setSelectedProgram(program);
    setIsModalOpen(true);
  };

  const handleEditProgram = (program) => {
    setSelectedProgram(program);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setSelectedProgram(null);
    loadPrograms();
  };

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Program List</h1>
        <button
          onClick={() => openModal()}
          className="bg-gray-700 text-white px-6 py-2 rounded-md hover:bg-gray-900 transition duration-300"
        >
          Add Program
        </button>
      </div>

      <div className="overflow-x-auto bg-white shadow-md rounded-lg">
        <table className="min-w-full text-left table-auto">
          <thead className="bg-gray-800 text-white">
            <tr>
              <th className="px-6 py-3">ID</th>
              <th className="px-6 py-3">Program Name</th>
              <th className="px-6 py-3">Actions</th>
            </tr>
          </thead>
          <tbody>
            {programs.map((program) => (
              <tr key={program.programId} className="border-b hover:bg-gray-50">
                <td className="px-6 py-4">{program.programId}</td>
                <td className="px-6 py-4">{program.programName}</td>
                <td className="px-6 py-4 flex space-x-3">
                  <button
                    onClick={() => handleEditProgram(program)}
                    className="bg-gray-700 text-white px-4 py-2 rounded-md hover:bg-gray-900 transition duration-300"
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => handleDelete(program.programId)}
                    className="bg-gray-700 text-white px-4 py-2 rounded-md hover:bg-gray-900 transition duration-300"
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {isModalOpen && (
        <ProgramForm program={selectedProgram} onClose={closeModal} />
      )}
    </div>
  );
};

export default Program;
