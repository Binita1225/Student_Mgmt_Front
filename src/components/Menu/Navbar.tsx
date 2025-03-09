// // src/components/Navbar.js
// import React from "react";
// import { Link } from "react-router-dom";

// interface NavbarProps {
//   username: string | null;
//   onLogout: () => void;
// }

// // const Navbar: React.FC<NavbarProps> = ({ username = "", onLogout }) => {
// //   console.log("Navbar username:", username); // Debugging

// //   return (
// //     <nav className="bg-gray-800 text-white p-4 shadow-md fixed top-0 left-64 w-[calc(100%-16rem)] z-10 flex justify-end items-center">
// //       <div className="flex space-x-4">
// //         {username && username.trim() ? (
// //           <>
// //             <span className="mx-2">Welcome, {username}</span>
// //             <button
// //               onClick={onLogout}
// //               className="bg-red-600 px-3 py-1 rounded-md hover:bg-red-700"
// //             >
// //               Logout
// //             </button>
// //           </>
// //         ) : (
// //           <>
// //             <Link
// //               to="/login"
// //               className="bg-gray-870 px-3 py-1 rounded-md hover:bg-gray-950"
// //             >
// //               Login
// //             </Link>
// //             <Link
// //               to="/signup"
// //               className="bg-gray-870 px-3 py-1 rounded-md hover:bg-gray-950"
// //             >
// //               Signup
// //             </Link>
// //           </>
// //         )}
// //       </div>
// //     </nav>
// //   );
// // };

// const Navbar: React.FC<NavbarProps> = ({ username = "", onLogout }) => {
//   console.log("Navbar username:", username); // Debugging

//   return (
//     <nav className="bg-gray-800 text-white p-4 shadow-md fixed top-0 left-64 w-[calc(100%-16rem)] z-10 flex justify-end items-center">
//       <div className="flex space-x-4">
//         {username && username.trim() ? (
//           <>
//             <span className="mx-2">Welcome, {username}</span>
//             <button
//               onClick={onLogout}
//               className="bg-red-600 px-3 py-1 rounded-md hover:bg-red-700"
//             >
//               Logout
//             </button>
//           </>
//         ) : (
//           <>
//             <Link
//               to="/login"
//               className="bg-gray-870 px-3 py-1 rounded-md hover:bg-gray-950"
//             >
//               Login
//             </Link>
//             <Link
//               to="/signup"
//               className="bg-gray-870 px-3 py-1 rounded-md hover:bg-gray-950"
//             >
//               Signup
//             </Link>
//           </>
//         )}
//       </div>
//     </nav>
//   );
// };

// export default Navbar;

// import React from "react";
// import { Link } from "react-router-dom";

// interface NavbarProps {
//   username: string | null;
//   onLogout: () => void;
// }

// const Navbar: React.FC<NavbarProps> = ({ username, onLogout }) => {
//   console.log("Navbar username:", username); // Debugging

//   return (
//     <nav className="bg-gray-800 text-white p-4 shadow-md fixed top-0 left-64 w-[calc(100%-16rem)] z-10 flex justify-between items-center">
//       <div className="flex space-x-4">
//         {username && username.trim() ? (
//           <>
//             <span className="mx-2">Welcome, {username}</span>
//             <button
//               onClick={onLogout}
//               className="bg-red-600 px-3 py-1 rounded-md hover:bg-red-700"
//             >
//               Logout
//             </button>
//           </>
//         ) : (
//           <>
//             <Link
//               to="/login"
//               className="bg-gray-870 px-3 py-1 rounded-md hover:bg-gray-950"
//             >
//               Login
//             </Link>
//             <Link
//               to="/signup"
//               className="bg-gray-870 px-3 py-1 rounded-md hover:bg-gray-950"
//             >
//               Signup
//             </Link>
//           </>
//         )}
//       </div>
//     </nav>
//   );
// };

// export default Navbar;

import { useContext } from "react";
import AuthContext from "../../context/AuthContext";
// import { logoutUser } from "../../services/authServices";
import { Link, useNavigate } from "react-router-dom";

const Navbar = () => {
  const auth = useContext(AuthContext);

  if (!auth) {
    return <div>Loading...</div>;
  }

  const { user, logout } = auth;
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    // setUser(null);
    navigate("/login");
  };

  return (
    <nav className="bg-gray-800 p-4 text-white flex justify-between">
      <Link to="" className="text-xl"></Link>
      <div>
        {user && (
          <>
            <span className="mr-4">{user.UserName}</span>
            <button
              onClick={handleLogout}
              className="bg-red-500 px-4 py-2 rounded"
            >
              Logout
            </button>
          </>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
