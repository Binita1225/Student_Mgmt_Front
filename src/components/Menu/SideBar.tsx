import React from "react";
import { Link, useNavigate } from "react-router-dom";

const SideBar = () => {
  return (
    <div className="w-64 bg-gray-800 h-screen fixed top-0 left-0 flex flex-col shadow-lg">
      <Link
        to="/"
        className="text-white text-xl font-semibold p-4 border-b border-gray-700"
      >
        StdMgmt
      </Link>
      <nav className="mt-4 flex-grow">
        <ul className="text-white text-lg">
          <li className="px-4 py-2 hover:bg-gray-700">
            <Link to="/faculty">Faculty</Link>
          </li>
        </ul>
      </nav>
    </div>
  );
};

export default SideBar;
