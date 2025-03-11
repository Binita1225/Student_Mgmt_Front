import React, { useState, useEffect } from "react";
import { getAllStudentInfo } from "../services/ReportServices";

const StudentAllInfo = () => {
  const [students, setStudents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchStudents = async () => {
      try {
        const response = await getAllStudentInfo();

        if (Array.isArray(response)) {
          setStudents(response);
        } else {
          setError("Invalid data received.");
        }
        setLoading(false);
      } catch (error) {
        setError("Failed to fetch students");
        setLoading(false);
      }
    };
    fetchStudents();
  }, []);

  if (loading) {
    return <p className="text-center mt-5">Loading students...</p>;
  }

  if (error) {
    return <p className="text-center mt-5 text-red-500">{error}</p>;
  }

  return (
    <div className="container mx-auto mt-10">
      <h1 className="text-3xl font-semibold mb-5 text-center">
        Student Information
      </h1>
      <div className="overflow-x-auto">
        <table className="min-w-full table-auto bg-white border border-gray-300 shadow-md rounded-lg">
          <thead className="bg-gray-100">
            <tr>
              <th className="py-2 px-4 border">Student ID</th>
              <th className="py-2 px-4 border">Roll No</th>
              <th className="py-2 px-4 border">Name</th>
              <th className="py-2 px-4 border">Email</th>
              <th className="py-2 px-4 border">Phone Number</th>
              <th className="py-2 px-4 border">Gender</th>
              <th className="py-2 px-4 border">Date of Birth</th>
              <th className="py-2 px-4 border">Address</th>
              <th className="py-2 px-4 border">Father's Name</th>
              <th className="py-2 px-4 border">Mother's Name</th>
              <th className="py-2 px-4 border">Program</th>
            </tr>
          </thead>
          <tbody>
            {students.map((student) => (
              <tr key={student.studentId} className="hover:bg-gray-50">
                <td className="py-2 px-4 border">{student.studentId}</td>
                <td className="py-2 px-4 border">{student.rollNo}</td>
                <td className="py-2 px-4 border">
                  {student.firstName} {student.lastName}
                </td>
                <td className="py-2 px-4 border">{student.email}</td>
                <td className="py-2 px-4 border">{student.phoneNumber}</td>
                <td className="py-2 px-4 border">{student.gender}</td>
                <td className="py-2 px-4 border">
                  {new Date(student.dateOfBirth).toLocaleDateString()}
                </td>
                <td className="py-2 px-4 border">{student.address}</td>
                <td className="py-2 px-4 border">{student.fatherName}</td>
                <td className="py-2 px-4 border">{student.motherName}</td>
                <td className="py-2 px-4 border">{student.programName}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default StudentAllInfo;
