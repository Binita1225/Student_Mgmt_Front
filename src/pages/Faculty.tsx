import React, { useEffect, useState } from "react";
import axios from "axios";

const Faculty = ({ userRole }: any) => {
  const [faculties, setFaculties] = useState([]); // State to hold the list of faculties
  const [faculty, setFaculty] = useState({ FacultyId: "", FacultyName: "" }); // State for the current faculty being edited or added
  const [editing, setEditing] = useState(false); // Flag to determine if editing
  const [error, setError] = useState(""); // State to hold any error messages

  // Fetch faculties when the component mounts
  useEffect(() => {
    fetchFaculties();
  }, []);

  // Function to fetch faculties from the API
  const fetchFaculties = async () => {
    try {
      const response = await axios.get("https://localhost:7108/api/Faculty");
      setFaculties(response.data); // Update state with fetched data
    } catch (error) {
      setError("Failed to fetch faculties."); // Set error message if request fails
    }
  };

  // Handle input changes for the faculty form
  const handleChange = (e: any) => {
    const { name, value } = e.target;
    setFaculty({ ...faculty, [name]: value }); // Update state with new input value
  };

  // Handle form submission for adding or updating a faculty
  const handleSubmit = async (e) => {
    e.preventDefault(); // Prevent default form submission
    try {
      if (editing) {
        // If editing, update the existing faculty
        await axios.put(
          `https://localhost:7108/api/Faculty/${faculty.FacultyId}`,
          faculty
        );
      } else {
        // If adding a new faculty, create it
        await axios.post("https://localhost:7108/api/Faculty", faculty);
      }
      fetchFaculties(); // Refresh faculty list
      setFaculty({ FacultyId: "", FacultyName: "" }); // Reset form
      setEditing(false); // Reset editing flag
    } catch (error) {
      setError("Failed to save faculty."); // Set error message if request fails
    }
  };

  // Function to handle editing a faculty
  const handleEdit = (faculty) => {
    setFaculty(faculty); // Set the selected faculty to state
    setEditing(true); // Set editing flag to true
  };

  // Function to handle deleting a faculty
  const handleDelete = async (id) => {
    try {
      await axios.delete(`https://localhost:7108/api/Faculty/${id}`);
      fetchFaculties(); // Refresh faculty list
    } catch (error) {
      setError("Failed to delete faculty."); // Set error message if request fails
    }
  };

  return (
    <div className="p-6 bg-white rounded-lg shadow-md">
      <h1 className="text-2xl font-bold mb-4">Faculty Management</h1>
      {error && <p className="text-red-500">{error}</p>}
      {userRole === "Admin" && (
        <form onSubmit={handleSubmit} className="mb-6">
          <input
            type="text"
            name="FacultyName"
            value={faculty.FacultyName}
            onChange={handleChange}
            placeholder="Faculty Name"
            required
            className="p-2 border border-gray-300 rounded-lg mb-2 w-full"
          />
          <button
            type="submit"
            className="bg-blue-500 text-white p-2 rounded-lg hover:bg-blue-600 transition"
          >
            {editing ? "Update Faculty" : "Add Faculty"}
          </button>
        </form>
      )}
      <h2 className="text-xl font-semibold mb-2">Faculty List</h2>
      <ul>
        {faculties.map((faculty) => (
          <li
            key={faculty.FacultyId} // Unique key prop for each list item
            className="flex justify-between items-center mb-2"
          >
            <span>{faculty.FacultyName}</span>
            {userRole === "Admin" && (
              <div>
                <button
                  onClick={() => handleEdit(faculty)} // Edit button
                  className="bg-yellow-500 text-white p-1 rounded-lg hover:bg-yellow-600 transition mr-2"
                >
                  Edit
                </button>
                <button
                  onClick={() => handleDelete(faculty.FacultyId)} // Delete button
                  className="bg-red-500 text-white p-1 rounded-lg hover:bg-red-600 transition"
                >
                  Delete
                </button>
              </div>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Faculty; // Export the component
