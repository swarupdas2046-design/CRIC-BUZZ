import { Navigate, Outlet } from "react-router";
import { useAuth } from "../hooks/useAuth";

// Guards private routes. Sends unauthenticated users to /login.
const ProtectedRoute = () => {
  const { isAuthenticated } = useAuth();

  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }

  return <Outlet />;
};

export default ProtectedRoute;
