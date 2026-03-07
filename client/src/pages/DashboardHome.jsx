import React from "react";
import { Navigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

const DashboardHome = () => {
  const { user } = useAuth();
  const role = user?.role || "learner";

  if (role === "coordinator") return <Navigate to="/dashboard/coordinator" replace />;
  if (role === "educator") return <Navigate to="/dashboard/educator" replace />;
  return <Navigate to="/dashboard/learner" replace />;
};

export default DashboardHome;
