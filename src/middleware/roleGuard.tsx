import { useAuth } from "@/context/AuthProvider";
import { Navigate, Outlet } from "react-router-dom";

interface Props {
  allow: ("admin" | "member")[];
}

const RoleGuard = ({ allow }: Props) => {
  const { role, checked } = useAuth();

  if (!checked) return null;

  if (!role || !allow.includes(role)) {
    return <Navigate to="/posts" replace />;
  }

  return <Outlet />;
};

export default RoleGuard;
