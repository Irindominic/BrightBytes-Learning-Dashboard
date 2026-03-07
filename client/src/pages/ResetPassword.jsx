import React, { useEffect, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { getUsers, updateUser } from "../utils/api";
import toast from "react-hot-toast";

const ResetPassword = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const [valid, setValid] = useState(false);
  const [userId, setUserId] = useState("");
  const [password, setPassword] = useState("");
  const [confirm, setConfirm] = useState("");
  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    const token = new URLSearchParams(location.search).get("token") || "";
    const verify = async () => {
      setLoading(true);
      try {
        if (!token) {
          setValid(false);
          return;
        }
        const res = await getUsers();
        const users = res?.data || [];
        const target = users.find((u) => String(u?.reset_token || "") === token);
        if (!target) {
          setValid(false);
          return;
        }
        const exp = target?.reset_expires ? new Date(target.reset_expires) : null;
        const now = new Date();
        if (!exp || exp <= now) {
          setValid(false);
          return;
        }
        setUserId(target._id);
        setValid(true);
      } catch {
        setValid(false);
      } finally {
        setLoading(false);
      }
    };
    verify();
  }, [location.search]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!userId) return;
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
      await updateUser(userId, {
        password,
        reset_token: "",
        reset_expires: "",
      });
      toast.success("Password reset successful. Please log in.");
      navigate("/login");
    } catch {
      toast.error("Failed to reset password.");
    } finally {
      setSubmitting(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-indigo-50 to-purple-100 dark:from-slate-900 dark:to-slate-800 p-4">
        <div className="text-slate-700 dark:text-slate-200">Loading...</div>
      </div>
    );
  }

  if (!valid) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-indigo-50 to-purple-100 dark:from-slate-900 dark:to-slate-800 p-4">
        <div className="bg-white dark:bg-slate-900 shadow-2xl rounded-2xl w-full max-w-md p-8 border border-slate-200 dark:border-slate-700 text-center">
          <h2 className="text-2xl font-bold text-indigo-700 dark:text-indigo-300 mb-2">Invalid or Expired Link</h2>
          <p className="text-slate-600 dark:text-slate-400 mb-4">Request a new password reset link.</p>
          <Link
            to="/forgot-password"
            className="inline-block px-4 py-2 rounded-lg bg-indigo-600 hover:bg-indigo-700 text-white"
          >
            Go to Forgot Password
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-indigo-50 to-purple-100 dark:from-slate-900 dark:to-slate-800 p-4">
      <div className="bg-white dark:bg-slate-900 shadow-2xl rounded-2xl w-full max-w-md p-8 border border-slate-200 dark:border-slate-700">
        <h2 className="text-3xl font-bold text-indigo-700 dark:text-indigo-300 mb-2 text-center">
          Reset Password
        </h2>
        <p className="text-slate-500 dark:text-slate-400 text-center mb-6">
          Enter a new password for your account.
        </p>
        <form className="flex flex-col gap-4" onSubmit={handleSubmit}>
          <div>
            <label className="block text-slate-700 dark:text-slate-200 font-semibold mb-1">
              New Password
            </label>
            <input
              type="password"
              placeholder="Enter new password"
              className="border border-slate-300 dark:border-slate-600 p-2 w-full rounded-lg bg-white dark:bg-slate-800 text-slate-800 dark:text-slate-100 focus:outline-none focus:ring-2 focus:ring-indigo-400"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>
          <div>
            <label className="block text-slate-700 dark:text-slate-200 font-semibold mb-1">
              Confirm Password
            </label>
            <input
              type="password"
              placeholder="Confirm new password"
              className="border border-slate-300 dark:border-slate-600 p-2 w-full rounded-lg bg-white dark:bg-slate-800 text-slate-800 dark:text-slate-100 focus:outline-none focus:ring-2 focus:ring-indigo-400"
              value={confirm}
              onChange={(e) => setConfirm(e.target.value)}
              required
            />
          </div>
          <button
            type="submit"
            disabled={submitting}
            className="bg-indigo-600 hover:bg-indigo-700 disabled:opacity-60 disabled:cursor-not-allowed text-white font-semibold py-2 rounded-lg transition duration-200 mt-2 shadow"
          >
            {submitting ? "Saving..." : "Reset Password"}
          </button>
        </form>
        <div className="text-center mt-4">
          <Link
            to="/login"
            className="text-indigo-600 dark:text-indigo-400 hover:underline font-semibold"
          >
            Back to Login
          </Link>
        </div>
      </div>
    </div>
  );
};

export default ResetPassword;
