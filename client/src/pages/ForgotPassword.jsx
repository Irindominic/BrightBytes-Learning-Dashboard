import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { getUsers, updateUser } from "../utils/api";
import toast from "react-hot-toast";

const ForgotPassword = () => {
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirm, setConfirm] = useState("");
  const [submitting, setSubmitting] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (password.length < 6) {
      toast.error("Password must be at least 6 characters.");
      return;
    }

    if (password !== confirm) {
      toast.error("Passwords do not match.");
      return;
    }

    setSubmitting(true);

    try {
      console.log("Searching user with email:", email);

      const res = await getUsers();
      const users = res?.data || [];

      const target = users.find(
        (u) =>
          String(u?.email || "").toLowerCase() ===
          email.trim().toLowerCase()
      );

      if (!target) {
        toast.error("User not found.");
        setSubmitting(false);
        return;
      }

      const targetId = target._id || target.id;

      console.log("User found:", targetId);

      const payload = {
        password: password,
      };

      console.log("Updating with payload:", payload);

      await updateUser(targetId, payload);

      toast.success("Password updated successfully!");

      navigate("/login");
    } catch (err) {
      console.error("Error updating password:", err);
      toast.error("Something went wrong.");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-linear-to-br from-indigo-50 to-purple-100 dark:from-slate-900 dark:to-slate-800 p-4">
      <div className="bg-white dark:bg-slate-900 shadow-2xl rounded-2xl w-full max-w-md p-8 border border-slate-200 dark:border-slate-700">
        <h2 className="text-3xl font-bold text-indigo-700 dark:text-indigo-300 mb-2 text-center">
          Forgot Password
        </h2>

        <p className="text-slate-500 dark:text-slate-400 text-center mb-6">
          Enter your account email and new password.
        </p>

        <form className="flex flex-col gap-4" onSubmit={handleSubmit}>
          <input
            type="email"
            placeholder="Enter your email"
            className="border p-2 rounded-lg"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />

          <input
            type="password"
            placeholder="Enter new password"
            className="border p-2 rounded-lg"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />

          <input
            type="password"
            placeholder="Confirm new password"
            className="border p-2 rounded-lg"
            value={confirm}
            onChange={(e) => setConfirm(e.target.value)}
            required
          />

          <button
            type="submit"
            disabled={submitting}
            className="bg-indigo-600 text-white py-2 rounded-lg"
          >
            {submitting ? "Saving..." : "Reset Password"}
          </button>
        </form>

        <div className="text-center mt-4">
          <Link
            to="/login"
            className="text-indigo-600 hover:underline font-semibold"
          >
            Back to Login
          </Link>
        </div>
      </div>
    </div>
  );
};

export default ForgotPassword;