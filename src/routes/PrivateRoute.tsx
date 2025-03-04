import React from "react";
import { Navigate, useLocation } from "react-router-dom";

interface PrivateRouteProps {
  children: React.ReactNode;
}

const PrivateRoute: React.FC<PrivateRouteProps> = ({ children }) => {
  const token = localStorage.getItem("token");
  const Token = token ? JSON.parse(token) : null;

  return token && token ? <>{children}</> : <Navigate to="/login" replace />;
};

export default PrivateRoute;
