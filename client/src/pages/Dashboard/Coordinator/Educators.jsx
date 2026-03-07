import React, { useState } from "react";
import DashboardLayout from "../../../components/DashboardLayout";
import { useUsers } from "../../../hooks/useUsers";
import Modal from "../../../components/Modal";
import { createUser, updateUser, deleteUser } from "../../../utils/api";
import toast from "react-hot-toast";

const Educators = () => {
  const { data: users, loading, error, refetch } = useUsers();
  const educators = (users || []).filter((u) => u.role === "educator");
  
  const [editingEducator, setEditingEducator] = useState(null);
  const [form, setForm] = useState({ name: "" });
  const [submitting, setSubmitting] = useState(false);
  const [deleteTarget, setDeleteTarget] = useState(null);
  const [deleting, setDeleting] = useState(false);

  const openEditModal = (educator) => {
    setEditingEducator(educator);
    setForm({ name: educator.name });
  };

  const handleFormChange = (e) => {
    setForm((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSave = async () => {
    if (!form.name) {
      toast.error("Name is required");
      return;
    }
    setSubmitting(true);
    try {
      // Preserve all original fields, only update the name
      const updateData = {
        ...editingEducator,
        name: form.name,
      };
      await updateUser(editingEducator._id, updateData);
      toast.success("Educator updated successfully!");
      setEditingEducator(null);
      await refetch();
    } catch (err) {
      toast.error(err?.response?.data || "Failed to save educator");
    } finally {
      setSubmitting(false);
    }
  };

  const handleDelete = async () => {
    if (!deleteTarget) return;
    setDeleting(true);
    try {
      await deleteUser(deleteTarget);
      toast.success("Educator deleted successfully!");
      setDeleteTarget(null);
      refetch();
    } catch (err) {
      toast.error(err?.response?.data || "Failed to delete educator");
    } finally {
      setDeleting(false);
    }
  };

  return (
    <DashboardLayout title="Manage Educators">
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
            <div className="overflow-x-auto rounded-lg border border-slate-200 dark:border-slate-700">
            <table className="w-full text-left">
              <thead className="bg-slate-100 dark:bg-slate-800">
                <tr>
                  <th className="px-4 py-3 font-semibold text-slate-700 dark:text-slate-300">
                    Name
                  </th>
                  <th className="px-4 py-3 font-semibold text-slate-700 dark:text-slate-300">
                    Email
                  </th>
                  <th className="px-4 py-3 font-semibold text-slate-700 dark:text-slate-300">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-200 dark:divide-slate-700">
                {educators.length === 0 ? (
                  <tr>
                    <td
                      colSpan="3"
                      className="px-4 py-8 text-center text-slate-500 dark:text-slate-400"
                    >
                      No educators found.
                    </td>
                  </tr>
                ) : (
                  educators.map((e) => (
                    <tr
                      key={e._id}
                      className="bg-white dark:bg-slate-800 hover:bg-slate-50 dark:hover:bg-slate-700/50"
                    >
                      <td className="px-4 py-3 text-slate-800 dark:text-slate-100">
                        {e.name}
                      </td>
                      <td className="px-4 py-3 text-slate-600 dark:text-slate-400">
                        {e.email}
                      </td>
                      <td className="px-4 py-3 flex gap-2">
                        <button
                          onClick={() => openEditModal(e)}
                          className="px-3 py-1 bg-indigo-100 dark:bg-indigo-900/50 text-indigo-600 dark:text-indigo-400 hover:bg-indigo-200 dark:hover:bg-indigo-800 rounded transition text-sm font-medium"
                        >
                          Edit
                        </button>
                        <button
                          onClick={() => setDeleteTarget(e._id)}
                          className="px-3 py-1 bg-red-100 dark:bg-red-900/50 text-red-600 dark:text-red-400 hover:bg-red-200 dark:hover:bg-red-800 rounded transition text-sm font-medium"
                        >
                          Delete
                        </button>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
            </div>
          </>
        )}
      </div>

      <Modal isOpen={!!editingEducator} onClose={() => !submitting && setEditingEducator(null)} title="Edit Educator">
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">
              Name
            </label>
            <input
              type="text"
              name="name"
              value={form.name}
              onChange={handleFormChange}
              className="w-full px-4 py-2 rounded-lg border border-slate-300 dark:border-slate-600 bg-white dark:bg-slate-700 text-slate-800 dark:text-slate-100"
              placeholder="Educator name"
            />
          </div>
          <div className="flex gap-2 justify-end pt-4">
            <button
              onClick={() => setEditingEducator(null)}
              className="px-4 py-2 rounded-lg border border-slate-300 dark:border-slate-600 text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-700 transition"
            >
              Cancel
            </button>
            <button
              onClick={handleSave}
              disabled={submitting}
              className="px-4 py-2 rounded-lg bg-indigo-600 text-white hover:bg-indigo-700 disabled:opacity-50 transition"
            >
              {submitting ? "Saving..." : "Save"}
            </button>
          </div>
        </div>
      </Modal>

      <Modal isOpen={!!deleteTarget} onClose={() => !deleting && setDeleteTarget(null)} title="Delete Educator">
        <p className="text-slate-600 dark:text-slate-400 mb-4">Are you sure you want to delete this educator?</p>
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

export default Educators;
