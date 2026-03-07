import React from "react";
import { useAuth } from "../context/AuthContext";
import Sidebar from "./Sidebar";
import ThemeToggle from "./ThemeToggle";

const DashboardLayout = ({ children, title }) => {
  const { user } = useAuth();

  return (
    <div className="flex min-h-screen bg-slate-50 dark:bg-slate-900">
      <Sidebar role={user?.role || "learner"} />
      <main className="flex-1 flex flex-col min-h-screen">
        <header className="sticky top-0 z-10 flex items-center justify-between px-6 py-4 bg-white dark:bg-slate-800 border-b border-slate-200 dark:border-slate-700 shadow-sm">
          <h1 className="text-xl font-semibold text-slate-800 dark:text-slate-100">
            {title || `Welcome, ${user?.name || "User"}`}
          </h1>
          <ThemeToggle />
        </header>
        <div className="flex-1 p-6 overflow-auto">{children}</div>
      </main>
    </div>
  );
};

export default DashboardLayout;
