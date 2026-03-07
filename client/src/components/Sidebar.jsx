import React, { useState } from "react";
import { Link, useLocation } from "react-router-dom";

const Sidebar = ({ role }) => {
  const [collapsed, setCollapsed] = useState(false);
  const location = useLocation();

  const baseClasses =
    "flex items-center gap-3 px-4 py-3 rounded-lg font-medium transition-colors";

  const activeClasses =
    "bg-indigo-100 dark:bg-indigo-900/50 text-indigo-700 dark:text-indigo-200";

  const inactiveClasses =
    "text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800 hover:text-slate-900 dark:hover:text-slate-100";

  const navLink = (to, label, icon) => {
    const isActive = location.pathname === to || location.pathname.startsWith(to + "/");
    return (
      <Link
        key={to}
        to={to}
        className={`${baseClasses} ${isActive ? activeClasses : inactiveClasses}`}
      >
        <span className="text-lg">{icon}</span>
        {!collapsed && <span>{label}</span>}
      </Link>
    );
  };

  const links = {
    coordinator: [
      ["/dashboard/coordinator", "Dashboard", "📊"],
      ["/dashboard/coordinator/students", "Students", "👥"],
      ["/dashboard/coordinator/educators", "Educators", "👨‍🏫"],
      ["/dashboard/coordinator/courses", "Courses", "📚"],
      ["/dashboard/coordinator/course-creator", "Create Course", "➕"],
    ],
    educator: [
      ["/dashboard/educator", "Dashboard", "📊"],
      ["/dashboard/educator/assignments", "Assignments", "📄"],
      ["/dashboard/educator/quizzes", "Quizzes", "❓"],
      ["/dashboard/educator/grading", "Grading", "✓"],
    ],
    learner: [
      ["/dashboard/learner", "Dashboard", "📊"],
      ["/dashboard/learner/courses", "Browse Courses", "📚"],
      ["/dashboard/learner/tasks", "Active Tasks", "📌"],
      ["/dashboard/learner/submit", "Submit Work", "📤"],
    ],
  };

  const roleLinks = links[role] || links.learner;

  return (
    <aside
      className={`${
        collapsed ? "w-20" : "w-64"
      } flex flex-col min-h-screen bg-white dark:bg-slate-800 border-r border-slate-200 dark:border-slate-700 transition-all duration-300`}
    >
      <div className="p-4 flex items-center justify-between border-b border-slate-200 dark:border-slate-700">
        {!collapsed && (
          <span className="font-bold text-indigo-600 dark:text-indigo-400">
            Learning Hub
          </span>
        )}
        <button
          onClick={() => setCollapsed(!collapsed)}
          className="p-2 rounded hover:bg-slate-100 dark:hover:bg-slate-700"
          aria-label={collapsed ? "Expand" : "Collapse"}
        >
          {collapsed ? "→" : "←"}
        </button>
      </div>
      <nav className="flex-1 p-4 flex flex-col gap-2 overflow-y-auto">
        {roleLinks.map(([path, label, icon]) => navLink(path, label, icon))}
      </nav>
    </aside>
  );
};

export default Sidebar;
