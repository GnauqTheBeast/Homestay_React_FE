import React from "react";
import { Navigate } from "react-router-dom";
import { useAuth } from "../contexts/useAuth";

type Props = { children: React.ReactNode };

const ProtectedRoute = ({ children }: Props) => {
  const { userRole } = useAuth();
  
  return userRole === "admin" ? (
    <>{children}</>
  ) : (
    <Navigate to="/home" />
  );
};

export default ProtectedRoute;