import React from "react";
import { useAuth } from "../../context/AuthContext";
import DashboardLayout from "../../components/DashboardLayout";
import { Link } from "react-router-dom";

const CoordinatorPanel = () => {
  const { user } = useAuth();

  const cards = [
    {
      title: "Students",
      desc: "View student records, enrollments, and progress",
      to: "/dashboard/coordinator/students",
      icon: "👥",
      color: "from-blue-500 to-blue-600",
    },
    {
      title: "Educators",
      desc: "View and manage educator information and assignments",
      to: "/dashboard/coordinator/educators",
      icon: "👨‍🏫",
      color: "from-emerald-500 to-emerald-600",
    },
    {
      title: "Courses",
      desc: "Edit, manage, and delete course content",
      to: "/dashboard/coordinator/courses",
      icon: "📚",
      color: "from-violet-500 to-violet-600",
    },
    {
      title: "Create Course",
      desc: "Design and add new courses with custom content",
      to: "/dashboard/coordinator/course-creator",
      icon: "➕",
      color: "from-amber-500 to-amber-600",
    },
  ];

  return (
    <DashboardLayout title={`Coordinator Dashboard · ${user?.name || "Admin"}`}>
      <div className="space-y-8">
        <div>
          <h2 className="text-3xl font-bold text-slate-800 dark:text-slate-100 mb-2">Dashboard</h2>
          <p className="text-slate-500 dark:text-slate-400">Manage your students, educators, and courses all in one place.</p>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {cards.map((c) => (
            <Link
              key={c.to}
              to={c.to}
              className="block p-6 rounded-2xl bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 hover:shadow-2xl hover:scale-105 hover:border-indigo-300 dark:hover:border-indigo-600 transition-all duration-200 text-center"
            >
              <div
                className={`mx-auto w-24 h-24 rounded-full bg-gradient-to-br ${c.color} flex items-center justify-center text-5xl mb-6 shadow-lg text-white`}
              >
                {c.icon}
              </div>
              <h3 className="font-bold text-lg text-slate-800 dark:text-slate-100 mb-2">
                {c.title}
              </h3>
              <p className="text-sm text-slate-600 dark:text-slate-400">
                {c.desc}
              </p>
            </Link>
          ))}
        </div>
      </div>
    </DashboardLayout>
  );
};

export default CoordinatorPanel;
