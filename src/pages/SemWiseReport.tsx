import React, { useState, useEffect } from "react";
import { getSemWiseStudentInfo } from "../services/ReportServices";

const SemWiseReport = () => {
  const [students, setStudents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await getSemWiseStudentInfo();
        console.log("Fetched students:", response);
        setStudents(response);
      } catch (error) {
        setError("Failed to fetch data");
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  if (loading) {
    return <p className="text-center mt-5">Loading...</p>;
  }

  if (error) {
    return <p className="text-center mt-5 text-red-500">{error}</p>;
  }

  return (
    <div className="p-6">
      <h2 className="text-2xl font-semibold mb-4">
        Semester-wise Student Report
      </h2>

      <div className="overflow-x-auto">
        <table className="w-full border-collapse border border-gray-400">
          <thead>
            <tr className="bg-gray-200">
              <th className="border border-gray-400 px-4 py-2">Roll No</th>
              <th className="border border-gray-400 px-4 py-2">Name</th>
              <th className="border border-gray-400 px-4 py-2">Email</th>
              <th className="border border-gray-400 px-4 py-2">Phone</th>
              <th className="border border-gray-400 px-4 py-2">Gender</th>
              <th className="border border-gray-400 px-4 py-2">DOB</th>
              <th className="border border-gray-400 px-4 py-2">Program</th>
              <th className="border border-gray-400 px-4 py-2">
                Current Semester
              </th>
            </tr>
          </thead>
          <tbody>
            {Array.isArray(students) && students.length > 0 ? (
              students.map((student) => (
                <tr key={student.studentId} className="hover:bg-gray-100">
                  <td className="border border-gray-400 px-4 py-2">
                    {student.rollNo}
                  </td>
                  <td className="border border-gray-400 px-4 py-2">
                    {student.firstName} {student.lastName}
                  </td>
                  <td className="border border-gray-400 px-4 py-2">
                    {student.email}
                  </td>
                  <td className="border border-gray-400 px-4 py-2">
                    {student.phoneNumber}
                  </td>
                  <td className="border border-gray-400 px-4 py-2">
                    {student.gender}
                  </td>
                  <td className="border border-gray-400 px-4 py-2">
                    {new Date(student.dateOfBirth).toLocaleDateString()}
                  </td>
                  <td className="border border-gray-400 px-4 py-2">
                    {student.programName}
                  </td>
                  <td className="border border-gray-400 px-4 py-2">
                    {student.currentSemester || "N/A"}
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan={8} className="text-center py-4 text-gray-500">
                  No student records found.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};
export default SemWiseReport;
