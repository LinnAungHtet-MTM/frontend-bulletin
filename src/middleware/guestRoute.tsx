import { useAuth } from "@/context/AuthProvider";
import { Navigate, Outlet } from "react-router-dom";

const GuestRoute = () => {
  const { isAuthenticated, checked } = useAuth();

  if (!checked) return null;

  if (isAuthenticated) {
    return <Navigate to="/posts" replace />;
  }

  return <Outlet />;
};

export default GuestRoute;
