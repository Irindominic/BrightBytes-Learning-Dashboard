import React from "react";
import { useAuth } from "../../context/AuthContext";
import DashboardLayout from "../../components/DashboardLayout";
import { Link } from "react-router-dom";

const EducatorPanel = () => {
  const { user } = useAuth();

  const cards = [
    {
      title: "Assignments",
      desc: "Create and manage assignments",
      to: "/dashboard/educator/assignments",
      icon: "📄",
      color: "from-emerald-500 to-emerald-600",
    },
    {
      title: "Quizzes",
      desc: "Create quizzes and set correct answers",
      to: "/dashboard/educator/quizzes",
      icon: "❓",
      color: "from-amber-500 to-amber-600",
    },
    {
      title: "Grading",
      desc: "Evaluate submissions and give feedback",
      to: "/dashboard/educator/grading",
      icon: "✓",
      color: "from-violet-500 to-violet-600",
    },
  ];

  return (
    <DashboardLayout title={`Educator Dashboard · ${user?.name || "Educator"}`}>
      <div className="space-y-8">
        <div>
          <h2 className="text-3xl font-bold text-slate-800 dark:text-slate-100 mb-2">Dashboard</h2>
          <p className="text-slate-500 dark:text-slate-400">Create assignments, quizzes, and grade student work.</p>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
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

export default EducatorPanel;
