import React, { useState } from "react";
import DashboardLayout from "../../../components/DashboardLayout";
import { useApi } from "../../../hooks/useApi";
import { getSubmissions, updateSubmission } from "../../../utils/api";
import { useUsers } from "../../../hooks/useUsers";
import toast from "react-hot-toast";

const Grading = () => {
  const { data: submissions, loading, error, refetch } = useApi(getSubmissions);
  const { data: users } = useUsers();
  const [editing, setEditing] = useState(null);
  const [marks, setMarks] = useState("");
  const [feedback, setFeedback] = useState("");
  const [saving, setSaving] = useState(false);

  const getUserName = (id) => users?.find((u) => u._id === id)?.name || id;

  const handleSave = async () => {
    if (!editing) return;
    setSaving(true);
    try {
      await updateSubmission(editing, {
        marks: marks === "" ? null : Number(marks),
        feedback,
      });
      toast.success("Grading saved");
      setEditing(null);
      setMarks("");
      setFeedback("");
      refetch();
    } catch (err) {
      toast.error("Failed to save");
    } finally {
      setSaving(false);
    }
  };

  const openEdit = (s) => {
    setEditing(s._id);
    setMarks(s.marks ?? "");
    setFeedback(s.feedback || "");
  };

  return (
    <DashboardLayout title="Grading">
      <div className="space-y-4">
        <p className="text-slate-600 dark:text-slate-400">
          Review submissions and provide marks and feedback.
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
          <div className="overflow-x-auto rounded-lg border border-slate-200 dark:border-slate-700">
            <table className="w-full text-left">
              <thead className="bg-slate-100 dark:bg-slate-800">
                <tr>
                  <th className="px-4 py-3 font-semibold text-slate-700 dark:text-slate-300">
                    Student
                  </th>
                  <th className="px-4 py-3 font-semibold text-slate-700 dark:text-slate-300">
                    Submission
                  </th>
                  <th className="px-4 py-3 font-semibold text-slate-700 dark:text-slate-300">
                    Marks
                  </th>
                  <th className="px-4 py-3 font-semibold text-slate-700 dark:text-slate-300">
                    Feedback
                  </th>
                  <th className="px-4 py-3 font-semibold text-slate-700 dark:text-slate-300">
                    Action
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-200 dark:divide-slate-700">
                {(submissions || []).length === 0 ? (
                  <tr>
                    <td
                      colSpan="5"
                      className="px-4 py-8 text-center text-slate-500 dark:text-slate-400"
                    >
                      No submissions yet.
                    </td>
                  </tr>
                ) : (
                  (submissions || []).map((s) => (
                    <tr
                      key={s._id}
                      className="bg-white dark:bg-slate-800 hover:bg-slate-50 dark:hover:bg-slate-700/50"
                    >
                      <td className="px-4 py-3 text-slate-800 dark:text-slate-100">
                        {getUserName(s.student_id)}
                      </td>
                      <td className="px-4 py-3 text-slate-600 dark:text-slate-400 max-w-xs truncate">
                        {s.submission_text || s.file_url || "—"}
                      </td>
                      <td className="px-4 py-3">{s.marks ?? "—"}</td>
                      <td className="px-4 py-3 max-w-xs truncate">
                        {s.feedback || "—"}
                      </td>
                      <td className="px-4 py-3">
                        <button
                          onClick={() => openEdit(s)}
                          className="text-indigo-600 dark:text-indigo-400 hover:underline"
                        >
                          Grade
                        </button>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        )}

        {editing && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50">
            <div className="bg-white dark:bg-slate-800 rounded-xl p-6 max-w-md w-full space-y-4">
              <h3 className="font-semibold">Grade Submission</h3>
              <input
                type="number"
                placeholder="Marks"
                value={marks}
                onChange={(e) => setMarks(e.target.value)}
                className="w-full px-4 py-2 rounded-lg border border-slate-300 dark:border-slate-600"
              />
              <textarea
                placeholder="Feedback"
                value={feedback}
                onChange={(e) => setFeedback(e.target.value)}
                rows={4}
                className="w-full px-4 py-2 rounded-lg border border-slate-300 dark:border-slate-600"
              />
              <div className="flex gap-2 justify-end">
                <button
                  onClick={() => setEditing(null)}
                  className="px-4 py-2 rounded-lg border"
                >
                  Cancel
                </button>
                <button
                  onClick={handleSave}
                  disabled={saving}
                  className="px-4 py-2 rounded-lg bg-indigo-600 text-white disabled:opacity-50"
                >
                  {saving ? "Saving..." : "Save"}
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </DashboardLayout>
  );
};

export default Grading;
