import React, { useState } from "react";
import DashboardLayout from "../../../components/DashboardLayout";
import { useCourses } from "../../../hooks/useCourses";
import { useApi } from "../../../hooks/useApi";
import { createAssignment, getAssignments } from "../../../utils/api";
import toast from "react-hot-toast";

const Assignments = () => {
  const { data: courses } = useCourses();
  const { data: assignments, refetch: refetchAssignments } = useApi(getAssignments);
  const [assignmentForm, setAssignmentForm] = useState({
    title: "",
    description: "",
    course_id: "",
    due_date: "",
  });
  const [submitting, setSubmitting] = useState(false);

  const handleAssignmentSubmit = async (e) => {
    e.preventDefault();
    setSubmitting(true);
    try {
      await createAssignment(assignmentForm);
      toast.success("Assignment created");
      setAssignmentForm({ title: "", description: "", course_id: "", due_date: "" });
      refetchAssignments();
    } catch (err) {
      toast.error("Failed to create assignment");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <DashboardLayout title="Assignments">
      <div className="space-y-6 max-w-xl">
        <form onSubmit={handleAssignmentSubmit} className="space-y-4">
          <input
            required
            placeholder="Assignment title"
            value={assignmentForm.title}
            onChange={(e) =>
              setAssignmentForm((p) => ({ ...p, title: e.target.value }))
            }
            className="w-full px-4 py-2 rounded-lg border border-slate-300 dark:border-slate-600 bg-white dark:bg-slate-700"
          />
          <textarea
            placeholder="Description"
            value={assignmentForm.description}
            onChange={(e) =>
              setAssignmentForm((p) => ({ ...p, description: e.target.value }))
            }
            className="w-full px-4 py-2 rounded-lg border border-slate-300 dark:border-slate-600 bg-white dark:bg-slate-700"
            rows={3}
          />
          <select
            value={assignmentForm.course_id}
            onChange={(e) =>
              setAssignmentForm((p) => ({ ...p, course_id: e.target.value }))
            }
            className="w-full px-4 py-2 rounded-lg border border-slate-300 dark:border-slate-600 bg-white dark:bg-slate-700"
          >
            <option value="">Select course</option>
            {(courses || []).map((c) => (
              <option key={c._id} value={c._id}>
                {c.title}
              </option>
            ))}
          </select>
          <input
            type="date"
            value={assignmentForm.due_date}
            onChange={(e) =>
              setAssignmentForm((p) => ({ ...p, due_date: e.target.value }))
            }
            className="w-full px-4 py-2 rounded-lg border border-slate-300 dark:border-slate-600 bg-white dark:bg-slate-700"
          />
          <button
            type="submit"
            disabled={submitting}
            className="px-6 py-2 rounded-lg bg-indigo-600 text-white hover:bg-indigo-700 disabled:opacity-50"
          >
            Create Assignment
          </button>
        </form>
        <div>
          <h4 className="font-medium mb-2">Recent Assignments</h4>
          <ul className="space-y-2">
            {(assignments || []).slice(0, 5).map((a) => (
              <li
                key={a._id}
                className="p-3 rounded-lg bg-slate-100 dark:bg-slate-800"
              >
                {a.title}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </DashboardLayout>
  );
};

export default Assignments;
