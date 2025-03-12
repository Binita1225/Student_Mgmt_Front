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
import EnrollReport from "./pages/EnrollReport";
import StudentAllInfo from "./pages/StudentAllInfo";
import SemWiseReport from "./pages/SemWiseReport";
import YearWiseReport from "./pages/YearWiseReport";
import EnrollProgramList from "./pages/EnrollProgramList";

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

        <Route
          path="/all-info"
          element={
            <PrivateRoute>
              <StudentAllInfo />
            </PrivateRoute>
          }
        />

        <Route
          path="/semWise-info"
          element={
            <PrivateRoute>
              <SemWiseReport />
            </PrivateRoute>
          }
        />

        <Route
          path="/YearWise-info"
          element={
            <PrivateRoute>
              <YearWiseReport />
            </PrivateRoute>
          }
        />

        <Route
          path="/report-enroll/:programId"
          element={
            <PrivateRoute>
              <EnrollReport programId={undefined} />
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
