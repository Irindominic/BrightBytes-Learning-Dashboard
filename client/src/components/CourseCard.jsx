import React from "react";
import { Link } from "react-router-dom";

const CourseCard = ({ course, progress = 0, showProgress = false, href }) => {
  const content = (
    <div className="bg-white dark:bg-slate-800 rounded-xl border border-slate-200 dark:border-slate-700 p-5 hover:shadow-lg hover:border-indigo-200 dark:hover:border-indigo-800 transition-all duration-200">
      <h3 className="font-semibold text-slate-800 dark:text-slate-100 truncate">
        {course?.title || "Untitled Course"}
      </h3>
      <p className="text-sm text-slate-500 dark:text-slate-400 mt-1 line-clamp-2">
        {course?.description || "No description"}
      </p>
      {showProgress && (
        <div className="mt-4">
          <div className="flex justify-between text-sm mb-1">
            <span className="text-slate-600 dark:text-slate-400">Progress</span>
            <span className="font-medium text-indigo-600 dark:text-indigo-400">
              {Math.round(progress)}%
            </span>
          </div>
          <div className="h-2 bg-slate-200 dark:bg-slate-700 rounded-full overflow-hidden">
            <div
              className="h-full bg-indigo-500 rounded-full transition-all"
              style={{ width: `${Math.min(100, Math.max(0, progress))}%` }}
            />
          </div>
        </div>
      )}
    </div>
  );

  if (href) {
    return <Link to={href}>{content}</Link>;
  }

  return content;
};

export default CourseCard;
