import React from "react";
import { useState, useEffect } from "react";
import { getAllStudents, deleteStudent } from "../services/StudentServives";
import { Link } from "react-router";

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
      <h1 className="text-2xl font-bold mb-4">Student List</h1>
      <Link
        to="/students/add"
        className="bg-blue-500 text-white px-4 py-2 rounded"
      >
        Add Student
      </Link>
      <table className="w-full mt-4 border-collapse border border-gray-300">
        <thead>
          <tr className="bg-gray-200">
            <th className="border p-2">Roll No</th>
            <th className="border p-2">Name</th>
            <th className="border p-2">Email</th>
            <th className="border p-2">Actions</th>
          </tr>
        </thead>
        <tbody>
          {students.map((student) => (
            <tr key={student.studentId}>
              <td className="border p-2">{student.rollNo}</td>
              <td className="border p-2">
                {student.firstName} {student.lastName}
              </td>
              <td className="border p-2">{student.email}</td>
              <td className="border p-2">
                <Link
                  to={`/students/${student.studentId}`}
                  className="text-blue-500 mr-2"
                >
                  View
                </Link>
                <Link
                  to={`/students/edit/${student.studentId}`}
                  className="text-green-500 mr-2"
                >
                  Edit
                </Link>
                <button
                  onClick={() => handleDelete(student.studentId)}
                  className="text-red-500"
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default StudentList;
