import React, { useState, useEffect } from "react";
import DashboardLayout from "../../../components/DashboardLayout";
import { useUsers } from "../../../hooks/useUsers";
import { useLocation, useNavigate } from "react-router-dom";
import { createCourse, updateCourse, getCourse } from "../../../utils/api";
import toast from "react-hot-toast";

const CourseCreator = () => {
  const { data: users } = useUsers();
  const location = useLocation();
  const navigate = useNavigate();
  const educators = (users || []).filter((u) => u.role === "educator");
  
  const editCourseId = location.state?.editCourseId;
  const [isEditing, setIsEditing] = useState(!!editCourseId);
  const [loading, setLoading] = useState(!!editCourseId);
  
  const [form, setForm] = useState({
    title: "",
    description: "",
    educator_id: "",
  });
  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    if (editCourseId) {
      const loadCourse = async () => {
        try {
          const response = await getCourse(editCourseId);
          const course = response.data;
          setForm({
            title: course.title || "",
            description: course.description || "",
            educator_id: course.educator_id || "",
          });
          setLoading(false);
        } catch (err) {
          toast.error("Failed to load course");
          setLoading(false);
        }
      };
      loadCourse();
    }
  }, [editCourseId]);

  const handleChange = (e) => {
    setForm((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitting(true);
    try {
      const courseData = {
        ...form,
        educator_id: form.educator_id || undefined,
      };

      if (isEditing) {
        await updateCourse(editCourseId, courseData);
        toast.success("Course updated successfully!");
      } else {
        await createCourse(courseData);
        toast.success("Course created successfully!");
        setForm({ title: "", description: "", educator_id: "" });
      }
      
      if (isEditing) {
        navigate("/dashboard/coordinator/courses");
      }
    } catch (err) {
      toast.error(err?.response?.data || `Failed to ${isEditing ? "update" : "create"} course`);
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <DashboardLayout title={isEditing ? "Edit Course" : "Create Course"}>
      {loading ? (
        <div className="text-slate-500 dark:text-slate-400">Loading course...</div>
      ) : (
        <form
          onSubmit={handleSubmit}
          className="max-w-xl space-y-4 bg-white dark:bg-slate-800 rounded-xl border border-slate-200 dark:border-slate-700 p-6"
        >
          <div>
            <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">
              Course Title
            </label>
            <input
              name="title"
              value={form.title}
              onChange={handleChange}
              required
              className="w-full px-4 py-2 rounded-lg border border-slate-300 dark:border-slate-600 bg-white dark:bg-slate-700 text-slate-800 dark:text-slate-100"
              placeholder="e.g. Introduction to React"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">
              Description
            </label>
            <textarea
              name="description"
              value={form.description}
              onChange={handleChange}
              rows={4}
              className="w-full px-4 py-2 rounded-lg border border-slate-300 dark:border-slate-600 bg-white dark:bg-slate-700 text-slate-800 dark:text-slate-100"
              placeholder="Brief description of the course"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">
              Assign Educator (optional)
            </label>
            <select
              name="educator_id"
              value={form.educator_id}
              onChange={handleChange}
              className="w-full px-4 py-2 rounded-lg border border-slate-300 dark:border-slate-600 bg-white dark:bg-slate-700 text-slate-800 dark:text-slate-100"
            >
              <option value="">Select educator</option>
              {educators.map((e) => (
                <option key={e._id} value={e._id}>
                  {e.name} ({e.email})
                </option>
              ))}
            </select>
          </div>
          <button
            type="submit"
            disabled={submitting}
            className="px-6 py-2 rounded-lg bg-indigo-600 hover:bg-indigo-700 text-white font-medium disabled:opacity-50"
          >
            {submitting ? (isEditing ? "Updating..." : "Creating...") : (isEditing ? "Update Course" : "Create Course")}
          </button>
        </form>
      )}
    </DashboardLayout>
  );
};

export default CourseCreator;
