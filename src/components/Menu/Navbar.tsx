// src/components/Navbar.js
import React from "react";
import { Link } from "react-router-dom";

const Navbar = ({ username, onLogout }: any) => {
  return (
    <nav className="bg-gray-800 text-white p-4 shadow-md fixed top-0 left-64 w-[calc(100%-16rem)] z-10 flex justify-end items-center">
      <div className="flex space-x-4">
        {username ? (
          <>
            <span className="mx-2">Welcome, {username}</span>
            <button
              onClick={onLogout}
              className="bg-red-600 px-3 py-1 rounded-md hover:bg-red-700"
            >
              Logout
            </button>
          </>
        ) : (
          <>
            <Link
              to="/login"
              className="bg-gray-870 px-3 py-1 rounded-md hover:bg-gray-950"
            >
              Login
            </Link>
            <Link
              to="/signup"
              className="bg-gray-870 px-3 py-1 rounded-md hover:bg-gray-950"
            >
              Signup
            </Link>
          </>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
