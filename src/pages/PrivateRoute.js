import React from "react";
import { useLocation } from "react-router-dom";
import { useAuth0 } from "@auth0/auth0-react";
import { Navigate } from "react-router-dom";

const PrivateRoute = ({ children }) => {
  const { isAuthenticated, user } = useAuth0();
  const location = useLocation();

  const isUser = isAuthenticated && user;
  if (!isUser) {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }
  return [children];
};
export default PrivateRoute;
