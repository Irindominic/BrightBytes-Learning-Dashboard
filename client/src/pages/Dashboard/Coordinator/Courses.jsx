import React, { useState } from "react";
import DashboardLayout from "../../../components/DashboardLayout";
import { useCourses } from "../../../hooks/useCourses";
import { useUsers } from "../../../hooks/useUsers";
import Modal from "../../../components/Modal";
import { deleteCourse } from "../../../utils/api";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";

const Courses = () => {
  const { data: courses, loading, error, refetch } = useCourses();
  const { data: users } = useUsers();
  const educators = (users || []).filter((u) => u.role === "educator");
  const navigate = useNavigate();
  const [deleteTarget, setDeleteTarget] = useState(null);
  const [deleting, setDeleting] = useState(false);

  const getEducatorName = (educatorId) => {
    const educator = educators.find((e) => e._id === educatorId);
    return educator ? educator.name : "Unassigned";
  };

  const handleDelete = async () => {
    if (!deleteTarget) return;
    setDeleting(true);
    try {
      await deleteCourse(deleteTarget);
      toast.success("Course deleted");
      setDeleteTarget(null);
      refetch();
    } catch (err) {
      toast.error(err?.response?.data || "Failed to delete");
    } finally {
      setDeleting(false);
    }
  };

  return (
    <DashboardLayout title="Manage Courses">
      <div className="space-y-4">
        {loading && (
          <div className="text-slate-500 dark:text-slate-400">Loading...</div>
        )}
        {error && (
          <div className="text-red-500 dark:text-red-400">
            Error: {String(error)}
          </div>
        )}
        {!loading && !error && (
          <>
            {(courses || []).length === 0 ? (
              <div className="flex flex-col items-center justify-center py-12">
                <p className="text-slate-500 dark:text-slate-400 text-lg">📚 No courses available</p>
                <p className="text-slate-400 dark:text-slate-500 text-sm mt-2">Start by creating first course</p>
              </div>
            ) : (
              <div className="overflow-x-auto rounded-lg border border-slate-200 dark:border-slate-700">
                <table className="w-full text-left">
                  <thead className="bg-slate-100 dark:bg-slate-800">
                    <tr>
                      <th className="px-4 py-3 font-semibold text-slate-700 dark:text-slate-300">
                        Title
                      </th>
                      <th className="px-4 py-3 font-semibold text-slate-700 dark:text-slate-300">
                        Description
                      </th>
                      <th className="px-4 py-3 font-semibold text-slate-700 dark:text-slate-300">
                        Educator
                      </th>
                      <th className="px-4 py-3 font-semibold text-slate-700 dark:text-slate-300">
                        Actions
                      </th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-200 dark:divide-slate-700">
                    {(courses || []).map((c) => (
                      <tr
                        key={c._id}
                        className="bg-white dark:bg-slate-800 hover:bg-slate-50 dark:hover:bg-slate-700/50"
                      >
                        <td className="px-4 py-3 text-slate-800 dark:text-slate-100 font-medium">
                          {c.title}
                        </td>
                        <td className="px-4 py-3 text-slate-600 dark:text-slate-400 max-w-xs truncate">
                          {c.description || "—"}
                        </td>
                        <td className="px-4 py-3 text-slate-600 dark:text-slate-400">
                          {getEducatorName(c.educator_id)}
                        </td>
                        <td className="px-4 py-3 flex gap-2">
                          <button
                            onClick={() => navigate(`/dashboard/coordinator/course-creator`, { state: { editCourseId: c._id } })}
                            className="px-3 py-1 bg-indigo-100 dark:bg-indigo-900/50 text-indigo-600 dark:text-indigo-400 hover:bg-indigo-200 dark:hover:bg-indigo-800 rounded transition text-sm font-medium"
                          >
                            Edit
                          </button>
                          <button
                            onClick={() => setDeleteTarget(c._id)}
                            className="px-3 py-1 bg-red-100 dark:bg-red-900/50 text-red-600 dark:text-red-400 hover:bg-red-200 dark:hover:bg-red-800 rounded transition text-sm font-medium"
                          >
                            Delete
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </>
        )}
      </div>

      <Modal
        isOpen={!!deleteTarget}
        onClose={() => !deleting && setDeleteTarget(null)}
        title="Delete Course"
      >
        <p className="text-slate-600 dark:text-slate-400 mb-4">
          Are you sure you want to delete this course?
        </p>
        <div className="flex gap-2 justify-end">
          <button
            onClick={() => setDeleteTarget(null)}
            className="px-4 py-2 rounded-lg border border-slate-300 dark:border-slate-600"
          >
            Cancel
          </button>
          <button
            onClick={handleDelete}
            disabled={deleting}
            className="px-4 py-2 rounded-lg bg-red-500 text-white hover:bg-red-600 disabled:opacity-50"
          >
            {deleting ? "Deleting..." : "Delete"}
          </button>
        </div>
      </Modal>
    </DashboardLayout>
  );
};

export default Courses;
