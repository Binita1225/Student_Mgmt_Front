import Navbar from "./components/Menu/Navbar";
import { Route, Routes } from "react-router";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import { useState, useEffect, useContext } from "react";
import Faculty from "./pages/Faculty";
import SideBar from "./components/Menu/SideBar";
import Layout from "./components/Menu/Layout";
import PrivateRoute from "./routes/PrivateRoute";
import Program from "./pages/Program";
import StudentList from "./pages/StudentList";
import StudentDetails from "./pages/StudentDetail";
import StudentForm from "./pages/StudentForm";
import AuthContext from "./context/AuthContext";

// const App = () => {
//   const [user, setUser] = useState<string | null>(null);

//   useEffect(() => {
//     try {
//       const storedUserData = localStorage.getItem("userData");
//       if (storedUserData) {
//         const userData = JSON.parse(storedUserData);
//         setUser(userData.UserName);
//       }
//     } catch (error) {
//       console.error("Error parsing userData:", error);
//     }
//   }, []);

//   const handleLogin = (user: any) => {
//     setUser(user.UserName); // Save username after login
//     localStorage.setItem("userData", JSON.stringify(user)); // Save user data to localStorage
//   };

//   const handleLogout = () => {
//     localStorage.removeItem("token");
//     localStorage.removeItem("userData");
//     setUser(null); // Clear the user data
//   };

//   return (
//     <>
//       <Layout username={user} onLogout={handleLogout}>
//         <Routes>
//           <Route path="/" element={<Home />} />
//           <Route
//             path="/faculty"
//             element={
//               // <PrivateRoute>
//               <Faculty />
//               // {/* </PrivateRoute> */}
//             }
//           />
//           <Route
//             path="/program"
//             element={
//               // <PrivateRoute>
//               <Program />
//               // {/* </PrivateRoute> */}
//             }
//           />
//           <Route path="/students" element={<StudentList />} />
//           <Route path="/students/add" element={<StudentForm />} />
//           <Route path="/students/edit/:id" element={<StudentForm />} />
//           <Route path="/students/:id" element={<StudentDetails />} />

//           <Route path="/login" element={<Login onLogin={handleLogin} />} />
//           <Route path="/signup" element={<Signup />} />
//         </Routes>
//       </Layout>
//     </>
//   );
// };

const App = () => {
  const auth = useContext(AuthContext);

  if (!auth) {
    return <div>Loading...</div>;
  }

  const { user, logout } = auth;

  return (
    <Layout username={user?.UserName} onLogout={logout}>
      <Routes>
        <Route
          path="/"
          element={
            <PrivateRoute>
              <Home />
            </PrivateRoute>
          }
        />

        {/* Protect these routes */}
        <Route
          path="/faculty"
          element={
            <PrivateRoute>
              <Faculty />
            </PrivateRoute>
          }
        />
        <Route
          path="/program"
          element={
            <PrivateRoute>
              <Program />
            </PrivateRoute>
          }
        />
        <Route
          path="/students"
          element={
            <PrivateRoute>
              <StudentList />
            </PrivateRoute>
          }
        />
        <Route
          path="/students/add"
          element={
            <PrivateRoute>
              <StudentForm />
            </PrivateRoute>
          }
        />
        <Route
          path="/students/edit/:id"
          element={
            <PrivateRoute>
              <StudentForm />
            </PrivateRoute>
          }
        />
        <Route
          path="/students/:id"
          element={
            <PrivateRoute>
              <StudentDetails />
            </PrivateRoute>
          }
        />

        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
      </Routes>
    </Layout>
  );
};

export default App;
