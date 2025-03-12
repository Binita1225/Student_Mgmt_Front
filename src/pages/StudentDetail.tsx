import React, { useEffect, useState } from "react";
import { getStudentById } from "../services/StudentServives";
import { useParams, Link } from "react-router-dom";

const StudentDetails = () => {
  const { id } = useParams();
  const [student, setStudent] = useState(null);

  useEffect(() => {
    fetchStudent();
  }, []);

  const fetchStudent = async () => {
    const data = await getStudentById(id);
    setStudent(data);
  };

  if (!student)
    return (
      <div className="flex justify-center items-center h-screen">
        <p className="text-gray-600 text-lg">Loading...</p>
      </div>
    );

  return (
    <div className="max-w-2xl mx-auto mt-10 bg-white shadow-lg rounded-lg p-6 border border-gray-200">
      <h1 className="text-2xl font-bold text-center text-gray-800 mb-4">
        Student Details
      </h1>
      <div className="border-t border-gray-300 my-4"></div>
      <div className="grid grid-cols-2 gap-4">
        <DetailItem label="Roll No" value={student.rollNo} />
        <DetailItem
          label="Name"
          value={`${student.firstName} ${student.lastName}`}
        />
        <DetailItem label="Email" value={student.email} />
        <DetailItem label="Phone" value={student.phoneNumber} />
        <DetailItem label="Gender" value={student.gender} />
        <DetailItem label="Date of Birth" value={student.dateOfBirth} />
        <DetailItem label="Address" value={student.address} />
        <DetailItem label="Father's Name" value={student.fatherName} />
        <DetailItem label="Mother's Name" value={student.motherName} />
        <DetailItem label="Program" value={student.programName} />
      </div>
      <div className="mt-6 text-center">
        <Link
          to="/students"
          className="inline-block px-4 py-2 bg-gray-700 text-white rounded-md  hover:bg-gray-900 transition"
        >
          Back to List
        </Link>
      </div>
    </div>
  );
};

const DetailItem = ({ label, value }: { label: string; value: string }) => (
  <p className="text-gray-700">
    <strong className="font-semibold text-gray-900">{label}:</strong>{" "}
    <span className="ml-1">{value || "N/A"}</span>
  </p>
);

export default StudentDetails;
