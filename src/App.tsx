import Navbar from "./components/Menu/Navbar";
import { Route, Routes } from "react-router";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import { useState, useEffect } from "react";
import Faculty from "./pages/Faculty";
import SideBar from "./components/Menu/SideBar";
import Layout from "./components/Menu/Layout";
import PrivateRoute from "./routes/PrivateRoute";
import Program from "./pages/Program";

const App = () => {
  const [user, setUser] = useState<string | null>(null);

  // Check localStorage for saved user data
  useEffect(() => {
    const storedUserData = localStorage.getItem("userData");
    if (storedUserData) {
      try {
        const userData = JSON.parse(storedUserData);
        setUser(userData.UserName); // Set username from user data
      } catch (error) {
        console.error("Error parsing userData:", error);
      }
    }
  }, []);

  const handleLogin = (user: any) => {
    setUser(user.UserName); // Save username after login
    localStorage.setItem("userData", JSON.stringify(user)); // Save user data to localStorage
  };

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("userData");
    setUser(null); // Clear the user data
  };

  return (
    <>
      <Layout username={user} onLogout={handleLogout}>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route
            path="/faculty"
            element={
              // <PrivateRoute>
              <Faculty />
              // {/* </PrivateRoute> */}
            }
          />
          <Route
            path="/program"
            element={
              // <PrivateRoute>
              <Program />
              // {/* </PrivateRoute> */}
            }
          />
          <Route path="/login" element={<Login onLogin={handleLogin} />} />
          <Route path="/signup" element={<Signup />} />
        </Routes>
      </Layout>
    </>
  );
};

export default App;
