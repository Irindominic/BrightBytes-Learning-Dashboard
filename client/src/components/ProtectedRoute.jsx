import { Navigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

const ProtectedRoute = ({ children, allowedRoles }) => {
  const { user } = useAuth();
  const stored = typeof window !== "undefined" && localStorage.getItem("user");

  if (!user && !stored) {
    return <Navigate to="/login" replace />;
  }

  let currentUser = user;
  if (!currentUser && stored) {
    try {
      currentUser = JSON.parse(stored);
    } catch {
      return <Navigate to="/login" replace />;
    }
  }
  if (allowedRoles && currentUser) {
    const role = currentUser.role || "learner";
    if (!allowedRoles.includes(role)) {
      const redirect =
        role === "coordinator"
          ? "/dashboard/coordinator"
          : role === "educator"
          ? "/dashboard/educator"
          : "/dashboard/learner";
      return <Navigate to={redirect} replace />;
    }
  }

  return children;
};

export default ProtectedRoute;
