// // src/components/Login.js
// import React, { useState } from "react";
// import axios from "axios";
// import { useNavigate } from "react-router-dom"; // Import useNavigate

// const Login = ({ onLogin }) => {
//   const [username, setUsername] = useState("");
//   const [password, setPassword] = useState("");
//   const [error, setError] = useState("");
//   const navigate = useNavigate(); // Initialize useNavigate

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     try {
//       const response = await axios.post(
//         "https://localhost:7108/api/User/login",
//         { UserName: username, Password: password }
//       );
//       const token = response.data.token;
//       const userRole = response.data.Role;
//       localStorage.setItem("token", token);
//       localStorage.setItem("userRole", userRole);
//       const user = { username, role: userRole }; // Replace with actual decoding logic if necessary
//       onLogin(user);
//       navigate("/"); // Navigate back to the home page after login
//     } catch (error) {
//       setError("Login failed. Please check your credentials.");
//     }
//   };

//   // const handleSubmit = async (e) => {
//   //   e.preventDefault();

//   //   const userData = { UserName: "JohnDoe", Role: "Student" }; // Replace with API response

//   //   onLogin(userData); // Update parent state
//   //   navigate("/"); // Redirect after login
//   // };

//   return (
//     <div className="flex justify-center items-center h-screen bg-gray-100">
//       <div className="w-full max-w-md bg-white rounded-lg shadow-md p-8">
//         <h1 className="text-2xl font-bold text-center mb-6">Login</h1>
//         {error && <p className="text-red-500 text-sm text-center">{error}</p>}
//         <form onSubmit={handleSubmit}>
//           <div className="mb-4">
//             <input
//               type="text"
//               placeholder="Username"
//               value={username}
//               onChange={(e) => setUsername(e.target.value)}
//               required
//               className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring focus:ring-blue-200"
//             />
//           </div>
//           <div className="mb-6">
//             <input
//               type="password"
//               placeholder="Password"
//               value={password}
//               onChange={(e) => setPassword(e.target.value)}
//               required
//               className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring focus:ring-blue-200"
//             />
//           </div>
//           <button
//             type="submit"
//             className="w-full p-3 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition"
//           >
//             Login
//           </button>
//         </form>
//       </div>
//     </div>
//   );
// };

// export default Login;

import { useState, useContext } from "react";
import { loginUser } from "../services/authServices";
import AuthContext from "../context/AuthContext";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const auth = useContext(AuthContext);

  if (!auth) {
    return <div>Loading...</div>; // Handle undefined context
  }

  const { setUser } = auth; // Now destructure safely
  const navigate = useNavigate();
  const [formData, setFormData] = useState({ UserName: "", Password: "" });
  const [error, setError] = useState("");

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const res = await loginUser(formData);
      localStorage.setItem("token", res.data.Token);
      setUser(res.data);
      navigate("/");
    } catch (err) {
      setError("Invalid Credentials");
    }
  };

  return (
    <div className="flex justify-center items-center h-screen bg-gray-200">
      <form
        onSubmit={handleSubmit}
        className="bg-white p-8 shadow-xl rounded-lg max-w-md w-full"
      >
        <h2 className="text-3xl font-bold text-center text-gray-800 mb-6">
          Login
        </h2>
        {error && <p className="text-red-500 text-center mb-4">{error}</p>}

        <input
          type="text"
          name="UserName"
          onChange={handleChange}
          placeholder="Username"
          className="w-full p-3 border border-gray-300 rounded-md mb-4 shadow-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          required
        />
        <input
          type="password"
          name="Password"
          onChange={handleChange}
          placeholder="Password"
          className="w-full p-3 border border-gray-300 rounded-md mb-6 shadow-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          required
        />

        <button
          type="submit"
          className="bg-blue-500 text-white px-4 py-3 rounded-md w-full text-xl font-semibold hover:bg-blue-600 transition duration-300"
        >
          Login
        </button>

        <p className="text-center text-gray-600 mt-4">
          Don't have an account?{" "}
          <span
            onClick={() => navigate("/signup")}
            className="text-blue-500 cursor-pointer hover:underline"
          >
            Sign Up
          </span>
        </p>
      </form>
    </div>
  );
};

export default Login;
