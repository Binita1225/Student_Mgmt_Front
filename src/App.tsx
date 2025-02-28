import Navbar from "./components/Menu/Navbar";
import { Router, Route, Routes } from "react-router";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import { useState, useEffect } from "react";
import Faculty from "./pages/Faculty";
import SideBar from "./components/Menu/SideBar";
import Footer from "./components/Menu/Footer";
import Layout from "./components/Menu/layout";

const App = () => {
  const [user, setUser] = useState(null);

  const [currentUserRole, setCurrentUserRole] = useState(null);

  useEffect(() => {
    // Retrieve the user role from localStorage on component mount
    const role = localStorage.getItem("userRole");
    if (role) {
      setCurrentUserRole(role);
    }
  }, []);

  const handleLogin = (user) => {
    setUser(user);
  };

  const handleLogout = () => {
    localStorage.removeItem("token");
    setUser(null);
  };
  return (
    <>
      <Navbar username={user ? user.username : null} onLogout={handleLogout} />
      <SideBar />
      <Footer />
      <Layout>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route
            path="/faculty"
            element={<Faculty userRole={currentUserRole} />}
          />

          <Route path="/login" element={<Login onLogin={handleLogin} />} />
          <Route path="/signup" element={<Signup />} />
        </Routes>
      </Layout>
    </>
  );
};

export default App;
