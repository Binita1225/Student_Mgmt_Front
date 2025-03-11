import React, { useEffect, useState } from "react";
import { getYearWiseStudentInfo } from "../services/ReportServices";

const YearWiseReport = () => {
  const [students, setStudents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await getYearWiseStudentInfo();
        setStudents(data);
      } catch (err) {
        setError("Failed to fetch data");
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  if (loading) return <p className="text-center text-gray-500">Loading...</p>;
  if (error) return <p className="text-center text-red-500">{error}</p>;

  return (
    <div className="container mx-auto p-4">
      <h2 className="text-xl font-semibold mb-4">Year-Wise Student Report</h2>
      <div className="overflow-x-auto">
        <table className="min-w-full border border-gray-300">
          <thead className="bg-gray-200">
            <tr>
              <th className="border border-gray-400 px-4 py-2">Roll No</th>
              <th className="border border-gray-400 px-4 py-2">Name</th>
              <th className="border border-gray-400 px-4 py-2">Email</th>
              <th className="border border-gray-400 px-4 py-2">Phone</th>
              <th className="border border-gray-400 px-4 py-2">Gender</th>
              <th className="border border-gray-400 px-4 py-2">DOB</th>
              <th className="border border-gray-400 px-4 py-2">Program</th>
              <th className="border border-gray-400 px-4 py-2" hidden>
                Current Year
              </th>
            </tr>
          </thead>
          <tbody>
            {students.length > 0 ? (
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
                  <td className="border border-gray-400 px-4 py-2" hidden>
                    {student.currentYear || "N/A"}
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

export default YearWiseReport;
