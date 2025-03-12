

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
