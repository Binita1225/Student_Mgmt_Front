import React from "react";
import { useState, useEffect } from "react";
import { getAllStudents, deleteStudent } from "../services/StudentServives";
import { Link } from "react-router-dom";

const StudentList = () => {
  const [students, setStudents] = useState([]);

  useEffect(() => {
    fetchStudents();
  }, []);

  const fetchStudents = async () => {
    const data = await getAllStudents();
    setStudents(data);
  };

  const handleDelete = async (id: any) => {
    if (window.confirm("Are you sure you want to delete")) {
      await deleteStudent(id);
      fetchStudents();
    }
  };

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Student List</h1>
        <Link
          to="/students/add"
          className="bg-gray-700 text-white px-6 py-2 rounded-md hover:bg-gray-900 transition duration-300"
        >
          Add Student
        </Link>
      </div>

      <div className="overflow-x-auto bg-white shadow-md rounded-lg">
        <table className="min-w-full text-left table-auto">
          <thead className="bg-gray-800 text-white">
            <tr>
              <th className="px-6 py-3">Roll No</th>
              <th className="px-6 py-3">Name</th>
              <th className="px-6 py-3">Email</th>
              <th className="px-6 py-3">Actions</th>
            </tr>
          </thead>
          <tbody>
            {students.map((student) => (
              <tr key={student.studentId} className="border-b hover:bg-gray-50">
                <td className="px-6 py-4">{student.rollNo}</td>
                <td className="px-6 py-4">
                  {student.firstName} {student.lastName}
                </td>
                <td className="px-6 py-4">{student.email}</td>
                <td className="px-6 py-4 flex space-x-3">
                  <Link
                    to={`/students/${student.studentId}`}
                    className="bg-gray-700 text-white px-4 py-2 rounded-md hover:bg-gray-900 transition duration-300"
                  >
                    View
                  </Link>
                  <Link
                    to={`/students/edit/${student.studentId}`}
                    className="bg-gray-700 text-white px-4 py-2 rounded-md hover:bg-gray-900 transition duration-300"
                  >
                    Edit
                  </Link>
                  <button
                    onClick={() => handleDelete(student.studentId)}
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
    </div>
  );
};

export default StudentList;
