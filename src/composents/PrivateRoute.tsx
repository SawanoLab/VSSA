import React from "react";
import { Navigate } from "react-router-dom";

import { useAuth } from "../hooks/use-auth";

const PrivateRoute: React.FC<
  React.PropsWithChildren<Record<string, never>>
> = ({ children }: React.PropsWithChildren<Record<string, never>>) => {
  const { isAuthenticated } = useAuth();
  return isAuthenticated ? <div>{children}</div> : <Navigate to="/signin" />;
};

export default PrivateRoute;
