import React, { useState } from "react";
import DashboardLayout from "../../../components/DashboardLayout";
import { useCourses } from "../../../hooks/useCourses";
import { useAuth } from "../../../context/AuthContext";
import { updateUser } from "../../../utils/api";
import toast from "react-hot-toast";

const AvailableCourses = () => {
  const { user, setUserData } = useAuth();
  const { data: courses, loading, error } = useCourses();
  const [enrolling, setEnrolling] = useState(null);

  const enrolledIds = (user?.courses_enrolled || []).map((id) =>
    typeof id === "object" ? id._id || id : id
  );

  const handleEnroll = async (courseId) => {
    if (!user?._id) return;
    const current = (user.courses_enrolled || []).map((c) =>
      typeof c === "object" ? c._id || c : c
    );
    if (current.includes(courseId)) {
      toast("Already enrolled");
      return;
    }
    setEnrolling(courseId);
    try {
      const payload = {
        ...user,
        courses_enrolled: [...current, courseId],
      };
      // Never attempt to overwrite the primary key from the client
      delete payload._id;
      const { data } = await updateUser(user._id, payload);
      if (data) setUserData(data);
      toast.success("Enrolled successfully!");
    } catch (err) {
      toast.error(err?.response?.data || "Failed to enroll");
    } finally {
      setEnrolling(null);
    }
  };

  return (
    <DashboardLayout title="Available Courses">
      <div className="space-y-6">
        <p className="text-slate-600 dark:text-slate-400">
          Browse courses and register to get started.
        </p>
        {loading && (
          <div className="text-slate-500 dark:text-slate-400">Loading...</div>
        )}
        {error && (
          <div className="text-red-500 dark:text-red-400">
            Error: {String(error)}
          </div>
        )}
        {!loading && !error && (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {(courses || []).map((c) => {
              const isEnrolled = enrolledIds.includes(c._id);
              return (
                <div
                  key={c._id}
                  className="bg-white dark:bg-slate-800 rounded-xl border border-slate-200 dark:border-slate-700 p-5 hover:shadow-lg hover:border-indigo-200 dark:hover:border-indigo-800 transition-all duration-200"
                >
                  <h3 className="font-semibold text-slate-800 dark:text-slate-100 truncate">
                    {c.title || "Untitled Course"}
                  </h3>
                  <p className="text-sm text-slate-500 dark:text-slate-400 mt-1 line-clamp-2">
                    {c.description || "No description"}
                  </p>
                  <div className="mt-4">
                    <button
                      onClick={() => handleEnroll(c._id)}
                      disabled={isEnrolled || enrolling === c._id}
                      className={`w-full px-4 py-2 rounded-lg font-medium transition ${
                        isEnrolled
                          ? "bg-slate-200 dark:bg-slate-700 text-slate-500 cursor-not-allowed"
                          : "bg-indigo-600 text-white hover:bg-indigo-700 disabled:opacity-50"
                      }`}
                    >
                      {isEnrolled
                        ? "Enrolled"
                        : enrolling === c._id
                        ? "Enrolling..."
                        : "Register"}
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        )}
        {!loading && !error && (!courses || courses.length === 0) && (
          <p className="text-slate-500 dark:text-slate-400 text-center py-12">
            No courses available yet.
          </p>
        )}
      </div>
    </DashboardLayout>
  );
};

export default AvailableCourses;
