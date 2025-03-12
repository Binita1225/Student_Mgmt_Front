import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

const SideBar = () => {
  const [isReportOpen, setIsReportOpen] = useState(false);

  const toggleRepprt = () => {
    setIsReportOpen(!isReportOpen);
  };

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
          <li className="px-4 py-2 hover:bg-gray-700">
            <Link to="/program">Program</Link>
          </li>
          <li className="px-4 py-2 hover:bg-gray-700">
            <Link to="/students">Student</Link>
          </li>

          <li
            className="px-4 py-2 hover:bg-gray-700 cursor-pointer"
            onClick={toggleRepprt}
          >
            <span>Report</span>
          </li>

          {isReportOpen && (
            <ul className="pl-6 space-y-2">
              <li className="px-4 py-2 hover:bg-gray-700">
                <Link to="/all-info">Student Info</Link>
              </li>
              <li className="px-4 py-2 hover:bg-gray-700">
                <Link to="/semWise-info">SemWise Report</Link>
              </li>
              <li className="px-4 py-2 hover:bg-gray-700">
                <Link to="/YearWise-info">YearWise Report</Link>
              </li>

              <li className="px-4 py-2 hover:bg-gray-700">
                <Link to="/report-enroll/:programId">Enroll Student</Link>
              </li>
            </ul>
          )}
        </ul>
      </nav>
    </div>
  );
};

export default SideBar;
