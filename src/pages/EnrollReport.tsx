// import { useState, useEffect } from "react";
// import { getEnrollStudentsById, getPrograms } from "../services/ReportServices";

// const EnrollReport = () => {
//   const [programs, setPrograms] = useState([]);
//   const [selectedProgram, setSelectedProgram] = useState("");
//   const [students, setStudents] = useState([]);
//   const [loading, setLoading] = useState(false);

//   // Fetch available programs for the dropdown
//   useEffect(() => {
//     const fetchPrograms = async () => {
//       try {
//         const data = await getPrograms();
//         setPrograms(data);
//       } catch (error) {
//         console.error("Error fetching programs:", error);
//       }
//     };
//     fetchPrograms();
//   }, []);

//   // Fetch students enrolled in the selected program
//   const fetchStudents = async (programId) => {
//     setLoading(true);
//     try {
//       const data = await getEnrollStudentsById(programId);
//       setStudents(data);
//     } catch (error) {
//       console.error("Error fetching students:", error);
//       setStudents([]);
//     }
//     setLoading(false);
//   };

//   // Handle dropdown selection change
//   const handleProgramChange = (event) => {
//     const programId = event.target.value;
//     setSelectedProgram(programId);
//     if (programId) {
//       fetchStudents(programId);
//     } else {
//       setStudents([]);
//     }
//   };

//   return (
//     <div className="p-6 bg-gray-100 min-h-screen">
//       <h1 className="text-2xl font-bold mb-4">Student Enrollment Report</h1>

//       {/* Program Selection Dropdown */}
//       <select
//         value={selectedProgram}
//         onChange={handleProgramChange}
//         className="border p-2 rounded w-full mb-4"
//       >
//         <option value="">Select a Program</option>
//         {programs.map((program) => (
//           <option key={program.programId} value={program.programId}>
//             {program.programName}
//           </option>
//         ))}
//       </select>

//       {/* Display Student List */}
//       {loading ? (
//         <p>Loading students...</p>
//       ) : students.length > 0 ? (
//         <table className="w-full border-collapse border border-gray-300">
//           <thead>
//             <tr className="bg-gray-200">
//               <th className="border p-2">Roll No</th>
//               <th className="border p-2">Name</th>
//               <th className="border p-2">Email</th>
//               <th className="border p-2">Phone</th>
//               <th className="border p-2">Gender</th>
//             </tr>
//           </thead>
//           <tbody>
//             {students.map((student) => (
//               <tr key={student.id}>
//                 <td className="border p-2">{student.rollNo}</td>
//                 <td className="border p-2">{student.name}</td>
//                 <td className="border p-2">{student.email}</td>
//                 <td className="border p-2">{student.phone}</td>
//                 <td className="border p-2">{student.gender}</td>
//               </tr>
//             ))}
//           </tbody>
//         </table>
//       ) : (
//         <p>No students enrolled in this program.</p>
//       )}
//     </div>
//   );
// };

// export default EnrollReport;

import { useState, useEffect } from "react";
import { getEnrollStudentsById, getPrograms } from "../services/ReportServices";

const EnrollReport = () => {
  const [programs, setPrograms] = useState([]);
  const [selectedProgram, setSelectedProgram] = useState("");
  const [students, setStudents] = useState([]);
  const [loading, setLoading] = useState(false);

  // Fetch available programs for the dropdown
  useEffect(() => {
    const fetchPrograms = async () => {
      try {
        const data = await getPrograms();
        setPrograms(data);
      } catch (error) {
        console.error("Error fetching programs:", error);
      }
    };
    fetchPrograms();
  }, []);

  // Fetch students enrolled in the selected program
  const fetchStudents = async (programId) => {
    setLoading(true);
    try {
      const data = await getEnrollStudentsById(programId);
      setStudents(data);
    } catch (error) {
      console.error("Error fetching students:", error);
      setStudents([]);
    }
    setLoading(false);
  };

  // Handle dropdown selection change
  const handleProgramChange = (event) => {
    const programId = event.target.value;
    setSelectedProgram(programId);
    if (programId) {
      fetchStudents(programId);
    } else {
      setStudents([]);
    }
  };

  return (
    <div className="p-6 bg-gray-100 min-h-screen">
      <h1 className="text-2xl font-bold mb-4">Student Enrollment Report</h1>

      {/* Program Selection Dropdown */}
      <select
        value={selectedProgram}
        onChange={handleProgramChange}
        className="border p-2 rounded w-full mb-4"
      >
        <option value="">Select a Program</option>
        {programs.map((program) => (
          <option key={program.programId} value={program.programId}>
            {program.programName}
          </option>
        ))}
      </select>

      {/* Display Student List */}
      {loading ? (
        <p>Loading students...</p>
      ) : students.length > 0 ? (
        <table className="w-full border-collapse border border-gray-300 text-sm">
          <thead>
            <tr className="bg-gray-200">
              <th className="border p-2">Roll No</th>
              <th className="border p-2">Full Name</th>
              <th className="border p-2">Email</th>
              <th className="border p-2">Phone</th>
              <th className="border p-2">Gender</th>
              <th className="border p-2">Date of Birth</th>
              <th className="border p-2">Address</th>
              <th className="border p-2">Father's Name</th>
              <th className="border p-2">Mother's Name</th>
              <th className="border p-2">Program</th>
              {/* <th className="border p-2">Program Type</th> */}
              <th className="border p-2">Duration (Years)</th>
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
                <td className="border p-2">{student.phoneNumber}</td>
                <td className="border p-2">{student.gender}</td>
                <td className="border p-2">
                  {new Date(student.dateOfBirth).toLocaleDateString()}
                </td>
                <td className="border p-2">{student.address}</td>
                <td className="border p-2">{student.fatherName}</td>
                <td className="border p-2">{student.motherName}</td>
                <td className="border p-2">{student.programName}</td>
                {/* <td className="border p-2">
                  {student.programType === 1 ? "Undergraduate" : "Postgraduate"}
                </td> */}
                <td className="border p-2">{student.durationInYears}</td>
              </tr>
            ))}
          </tbody>
        </table>
      ) : (
        <p>No students enrolled in this program.</p>
      )}
    </div>
  );
};

export default EnrollReport;
