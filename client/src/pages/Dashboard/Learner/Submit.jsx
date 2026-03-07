import React, { useState } from "react";
import DashboardLayout from "../../../components/DashboardLayout";
import { useApi } from "../../../hooks/useApi";
import { getAssignments, createSubmission } from "../../../utils/api";
import { useAuth } from "../../../context/AuthContext";
import toast from "react-hot-toast";

const Submit = () => {
  const { user } = useAuth();
  const { data: assignments, loading, error, refetch } = useApi(getAssignments);
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  const openAssignments = (assignments || []).filter((a) => {
    if (!a.due_date) return true;
    const due = new Date(a.due_date);
    due.setHours(0, 0, 0, 0);
    return due >= today;
  });
  const [selected, setSelected] = useState("");
  const [text, setText] = useState("");
  const [submitting, setSubmitting] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!selected || !text.trim()) {
      toast.error("Select an assignment and enter your submission.");
      return;
    }
    setSubmitting(true);
    try {
      await createSubmission({
        assignment_id: selected,
        student_id: user?._id,
        submission_text: text.trim(),
        file_url: "",
      });
      toast.success("Submission sent successfully!");
      setSelected("");
      setText("");
      refetch();
    } catch (err) {
      toast.error(err?.response?.data || "Failed to submit");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <DashboardLayout title="Submit Work">
      <div className="space-y-6 w-full max-w-none">
        <p className="text-slate-600 dark:text-slate-400">
          Upload or paste your assignment submission below. Assignments can be resubmitted until the due date.
        </p>

        {openAssignments.length === 0 && !loading && (
          <p className="text-amber-600 dark:text-amber-400 bg-amber-50 dark:bg-amber-900/20 px-4 py-3 rounded-lg">
            No assignments open for submission. Either all are past due or none exist.
          </p>
        )}

        <form
          onSubmit={handleSubmit}
          className="bg-white dark:bg-slate-800 rounded-xl border border-slate-200 dark:border-slate-700 p-6 space-y-4"
        >
          <div>
            <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">
              Select Assignment
            </label>
            <select
              value={selected}
              onChange={(e) => setSelected(e.target.value)}
              required
              className="w-full px-4 py-2 rounded-lg border border-slate-300 dark:border-slate-600 bg-white dark:bg-slate-700 text-slate-800 dark:text-slate-100"
            >
              <option value="">Choose assignment</option>
              {openAssignments.map((a) => (
                <option key={a._id} value={a._id}>
                  {a.title}
                  {a.due_date &&
                    ` (Due: ${new Date(a.due_date).toLocaleDateString()})`}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">
              Your Submission
            </label>
            <textarea
              value={text}
              onChange={(e) => setText(e.target.value)}
              required
              rows={6}
              placeholder="Paste your answer or provide a link to your work..."
              className="w-full px-4 py-2 rounded-lg border border-slate-300 dark:border-slate-600 bg-white dark:bg-slate-700 text-slate-800 dark:text-slate-100"
            />
          </div>

          <button
            type="submit"
            disabled={submitting}
            className="px-6 py-2 rounded-lg bg-indigo-600 text-white hover:bg-indigo-700 disabled:opacity-50"
          >
            {submitting ? "Submitting..." : "Submit"}
          </button>
        </form>

        {loading && (
          <div className="text-slate-500 dark:text-slate-400">Loading...</div>
        )}
        {error && (
          <div className="text-red-500 dark:text-red-400">
            Error: {String(error)}
          </div>
        )}
      </div>
    </DashboardLayout>
  );
};

export default Submit;
