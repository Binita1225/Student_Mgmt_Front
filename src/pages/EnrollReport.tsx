import React, { useState, useEffect } from "react";
import { getEnrollStudentsById } from "../services/ReportServices";
import { getProgram } from "../services/ProgramServices";

const EnrollReport = () => {
  const [programId, setProgramId] = useState("");
  const [students, setStudents] = useState([]);
  const [programs, setPrograms] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchPrograms = async () => {
      const data = await getEnrollStudentsById();
      setPrograms(data);
    };
    fetchPrograms();
  }, []);

  const handleFetchStudents = async () => {
    if (!programId) {
      alert("Please select a program");
      return;
    }

    setLoading(true);
    const data = await getEnrollStudentsById(programId);
    setStudents(data);
    setLoading(false);
  };

  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold mb-4">Student Enrollment Report</h2>

      {/* Program Selection Dropdown */}
      <div className="mb-4">
        <label className="block text-sm font-medium">Select Program:</label>
        <select
          value={programId}
          onChange={(e) => setProgramId(e.target.value)}
          className="p-2 border rounded w-full"
        >
          <option value="">-- Select Program --</option>
          {programs.map((program) => (
            <option key={program.programId} value={program.programId}>
              {program.programName}
            </option>
          ))}
        </select>
      </div>

      {/* Fetch Button */}
      <button
        onClick={handleFetchStudents}
        className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-700"
        disabled={loading}
      >
        {loading ? "Loading..." : "Fetch Report"}
      </button>

      {/* Report Table */}
      {students.length > 0 ? (
        <div className="mt-6">
          <table className="w-full border-collapse border border-gray-300">
            <thead>
              <tr className="bg-gray-200">
                <th className="border p-2">Roll No</th>
                <th className="border p-2">First Name</th>
                <th className="border p-2">Last Name</th>
                <th className="border p-2">Email</th>
                <th className="border p-2">Phone</th>
                <th className="border p-2">Gender</th>
              </tr>
            </thead>
            <tbody>
              {students.map((student) => (
                <tr key={student.studentId} className="text-center">
                  <td className="border p-2">{student.rollNo}</td>
                  <td className="border p-2">{student.firstName}</td>
                  <td className="border p-2">{student.lastName}</td>
                  <td className="border p-2">{student.email}</td>
                  <td className="border p-2">{student.phoneNumber}</td>
                  <td className="border p-2">{student.gender}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      ) : (
        <p className="mt-4 text-gray-600">
          {loading ? "" : "No data available."}
        </p>
      )}
    </div>
  );
};

export default EnrollReport;
