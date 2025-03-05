import React, { useEffect, useState } from "react";
import {
  addStudent,
  updateStudent,
  getStudentById,
} from "../services/StudentServives";
import { useNavigate, useParams } from "react-router-dom";

const StudentForm = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [student, setStudent] = useState({
    rollNo: "",
    firstName: "",
    lastName: "",
    email: "",
    phoneNumber: "",
    gender: "Male",
    dateOfBirth: "",
    address: "",
    fatherName: "",
    motherName: "",
    programId: "",
  });

  useEffect(() => {
    if (id) {
      fetchStudent();
    }
  }, [id]);

  const fetchStudent = async () => {
    const data = await getStudentById(id);

    setStudent(data);
  };

  const handleChange = (e) => {
    setStudent({ ...student, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const genderEnumValue =
      student.gender === "Male" ? 0 : student.gender === "Female" ? 1 : 2; 


    const convertedProgramId = Number(student.programId);


    const payload = {
      ...student,
      programId: convertedProgramId,
      gender: genderEnumValue,
    };

    if (
      !payload.rollNo ||
      !payload.firstName ||
      !payload.lastName ||
      !payload.email ||
      !payload.phoneNumber ||
      !payload.address ||
      !payload.dateOfBirth ||
      !payload.fatherName ||
      !payload.motherName ||
      isNaN(payload.programId)
    ) {
      alert("Please fill in all required fields correctly.");
      return;
    }

    try {
      if (id) {
        await updateStudent(id, payload);
      } else {
        await addStudent(payload);
      }
      navigate("/students");
    } catch (error: any) {
      console.error("Error submitting the student form:", error);
      if (error.response && error.response.data) {
        console.error("API Error Details:", error.response.data);
      }
    }
  };

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">{id ? "Edit" : "Add"} Student</h1>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label>Roll No:</label>
          <input
            type="text"
            name="rollNo"
            placeholder="Roll No"
            value={student.rollNo}
            onChange={handleChange}
            required
            className="border p-2 w-full"
          />
        </div>
        <div>
          <label>First Name:</label>
          <input
            type="text"
            name="firstName"
            placeholder="First Name"
            value={student.firstName}
            onChange={handleChange}
            required
            className="border p-2 w-full"
          />
        </div>
        <div>
          <label>Last Name:</label>
          <input
            type="text"
            name="lastName"
            placeholder="Last Name"
            value={student.lastName}
            onChange={handleChange}
            required
            className="border p-2 w-full"
          />
        </div>
        <div>
          <label>Email:</label>
          <input
            type="email"
            name="email"
            placeholder="Email"
            value={student.email}
            onChange={handleChange}
            required
            className="border p-2 w-full"
          />
        </div>
        <div>
          <label>Phone Number:</label>
          <input
            type="text"
            name="phoneNumber"
            placeholder="Phone Number"
            value={student.phoneNumber}
            onChange={handleChange}
            required
            className="border p-2 w-full"
          />
        </div>
        <div>
          <label>Gender:</label>
          <select
            name="gender"
            value={student.gender}
            onChange={handleChange}
            className="border p-2 w-full"
          >
            <option value="Male">Male</option>
            <option value="Female">Female</option>
            <option value="Other">Other</option>
          </select>
        </div>
        <div>
          <label>Date of Birth:</label>
          <input
            type="date"
            name="dateOfBirth"
            value={student.dateOfBirth}
            onChange={handleChange}
            required
            className="border p-2 w-full"
          />
        </div>
        <div>
          <label>Address:</label>
          <input
            type="text"
            name="address"
            placeholder="Address"
            value={student.address}
            onChange={handleChange}
            required
            className="border p-2 w-full"
          />
        </div>
        <div>
          <label>Father's Name:</label>
          <input
            type="text"
            name="fatherName"
            placeholder="Father's Name"
            value={student.fatherName}
            onChange={handleChange}
            required
            className="border p-2 w-full"
          />
        </div>
        <div>
          <label>Mother's Name:</label>
          <input
            type="text"
            name="motherName"
            placeholder="Mother's Name"
            value={student.motherName}
            onChange={handleChange}
            required
            className="border p-2 w-full"
          />
        </div>
        <div>
          <label>Program ID:</label>
          <input
            type="number"
            name="programId"
            placeholder="Program ID"
            value={student.programId}
            onChange={handleChange}
            required
            className="border p-2 w-full"
          />
        </div>
        <button
          type="submit"
          className="bg-blue-500 text-white px-4 py-2 rounded"
        >
          {id ? "Update" : "Add"} Student
        </button>
      </form>
    </div>
  );
};

export default StudentForm;
