// // src/components/Signup.js
// import React, { useState } from "react";
// import axios from "axios";

// const Signup = () => {
//   const [fullName, setFullName] = useState("");
//   const [username, setUsername] = useState("");
//   const [email, setEmail] = useState("");
//   const [password, setPassword] = useState("");
//   const [error, setError] = useState("");

//   const isEmailValid = (email: string) => {
//     const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
//     return emailPattern.test(email);
//   };

//   const handleSubmit = async (e: any) => {
//     e.preventDefault();

//     if (!isEmailValid(email)) {
//       setError("Please enter a valid email address.");
//       return;
//     }

//     const payload = {
//       FullName: fullName.trim(),
//       UserName: username.trim(),
//       Email: email.trim(),
//       PasswordHash: password,
//       Role: "Student",
//     };

//     console.log("Payload:", payload); // Log the payload to verify

//     try {
//       await axios.post("https://localhost:7108/api/User/register", payload);
//       // Handle successful signup (e.g., redirect to login)
//     } catch (error) {
//       setError("Signup failed. Please try again.");
//       console.error("Signup error:", error.response.data); // Log error response for debugging
//     }
//   };

//   return (
//     <div className="flex justify-center items-center h-screen bg-gray-100">
//       <div className="w-full max-w-md bg-white rounded-lg shadow-md p-8">
//         <h1 className="text-2xl font-bold text-center mb-6">Signup</h1>
//         {error && <p className="text-red-500 text-sm text-center">{error}</p>}
//         <form onSubmit={handleSubmit}>
//           <div className="mb-4">
//             <input
//               type="text"
//               placeholder="Full Name"
//               value={fullName}
//               onChange={(e) => setFullName(e.target.value)}
//               required
//               className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring focus:ring-blue-200"
//             />
//           </div>
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
//           <div className="mb-4">
//             <input
//               type="email"
//               placeholder="Email"
//               value={email}
//               onChange={(e) => setEmail(e.target.value)}
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
//             Signup
//           </button>
//         </form>
//       </div>
//     </div>
//   );
// };

// export default Signup;

import { useState } from "react";
import { registerUser } from "../services/authServices";
import { useNavigate } from "react-router-dom";

const Signup = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    FullName: "",
    UserName: "",
    Email: "",
    PasswordHash: "",
    Role: "Student",
  });

  const [error, setError] = useState("");

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await registerUser(formData);
      navigate("/login");
    } catch (err) {
      setError("Error registering user");
    }
  };

  return (
    <div className="flex justify-center items-center h-screen bg-gray-100">
      <form
        onSubmit={handleSubmit}
        className="bg-white p-6 shadow-lg rounded-lg"
      >
        <h2 className="text-2xl font-bold mb-4">Sign Up</h2>
        {error && <p className="text-red-500">{error}</p>}
        <input
          type="text"
          name="FullName"
          onChange={handleChange}
          placeholder="Full Name"
          className="w-full p-2 border rounded mb-3"
          required
        />
        <input
          type="text"
          name="UserName"
          onChange={handleChange}
          placeholder="Username"
          className="w-full p-2 border rounded mb-3"
          required
        />
        <input
          type="email"
          name="Email"
          onChange={handleChange}
          placeholder="Email"
          className="w-full p-2 border rounded mb-3"
          required
        />
        <input
          type="password"
          name="PasswordHash"
          onChange={handleChange}
          placeholder="Password"
          className="w-full p-2 border rounded mb-3"
          required
        />
        <button
          type="submit"
          className="bg-green-500 text-white px-4 py-2 rounded w-full"
        >
          Register
        </button>
      </form>
    </div>
  );
};

export default Signup;
