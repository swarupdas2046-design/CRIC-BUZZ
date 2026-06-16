import { Navigate, Outlet } from "react-router";
import { useAuth } from "../hooks/useAuth";

// Guards auth-only-public routes (login/register).
// Sends already-authenticated users to the admin dashboard.
const PublicRoute = () => {
  const { isAuthenticated } = useAuth();

  if (isAuthenticated) {
    return <Navigate to="/admin" replace />;
  }

  return <Outlet />;
};

export default PublicRoute;
