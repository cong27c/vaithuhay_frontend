import { Navigate, Outlet } from "react-router-dom";
import { jwtDecode } from "jwt-decode";

export default function AdminRoute({ children }) {
  const token = localStorage.getItem("admin_access_token");

  if (!token) return <Navigate to="/admin/login" replace />;

  try {
    const decoded = jwtDecode(token);
    const allowedRoles = ["admin", "staff"];
    if (!allowedRoles.includes(decoded.role)) {
      return <Navigate to="/admin/login" replace />;
    }
    return children;
  } catch {
    return <Navigate to="/admin/login" replace />;
  }
}
