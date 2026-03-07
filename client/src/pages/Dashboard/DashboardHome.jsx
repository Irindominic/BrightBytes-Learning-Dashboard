import React from "react";
import { useAuth } from "../../context/AuthContext";
import Sidebar from "../../components/Sidebar";

const DashboardHome = () => {
  const { user } = useAuth();
  return (
    <div className="flex min-h-screen">
      <Sidebar role={user?.role || "learner"} />
      <main className="flex-1 p-8 bg-gray-50 dark:bg-gray-900">
        <h1 className="text-2xl font-bold mb-4 text-indigo-700 dark:text-indigo-200">Welcome, {user?.name || "User"}!</h1>
        <p className="text-gray-700 dark:text-gray-300">This is your dashboard. Use the sidebar to navigate.</p>
      </main>
    </div>
  );
};

export default DashboardHome;
