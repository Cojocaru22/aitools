// Un exemplu simplificat de utilizare într-o rută privată sau componentă

import React from "react";
import { useAuth } from "./authContext"; // Ajustează calea de import
import { Navigate, Outlet } from "react-router-dom";

const PrivateRoute = () => {
  const { currentUser, loading } = useAuth();

  if (loading) return <div>Loading...</div>;

  return currentUser ? <Outlet /> : <Navigate to="/login" />;
};
export default PrivateRoute;
