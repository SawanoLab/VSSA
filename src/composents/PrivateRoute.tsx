import { Navigate } from 'react-router-dom';
import { useAuth } from '../hooks/use-auth';
import React, { ReactNode } from 'react';

const PrivateRoute: React.FC<React.PropsWithChildren<{}>> = ({
  children,
}: React.PropsWithChildren<{}>) => {
  const { isAuthenticated } = useAuth();
  return isAuthenticated ? <>{children}</> : <Navigate to="/signin" />;
};

export default PrivateRoute;
