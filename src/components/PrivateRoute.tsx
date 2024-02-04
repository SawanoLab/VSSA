import React from "react";
import { Navigate } from "react-router-dom";

import { useAuth } from "../hooks/use-auth";

interface PrivateRouteProps {
  children: React.ReactNode;
}

const PrivateRoute: React.FC<PrivateRouteProps> = ({ children }: PrivateRouteProps) => {
  const { isAuthenticated } = useAuth();
  return isAuthenticated ? <div>{children}</div> : <Navigate to="/signin" />;
};

export default PrivateRoute;
