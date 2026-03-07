import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { createUser } from "../utils/api";
import { useTheme } from "../context/ThemeContext";

const Signup = () => {

  const navigate = useNavigate();
  const { theme } = useTheme();

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    role: ""
  });

  // Handle input change
  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  // Handle signup submit
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const payload = { ...formData, theme: theme === "dark" ? "dark" : "light" };
      const response = await createUser(payload);

      if (response && response.status >= 200 && response.status < 300) {
        alert("Signup successful! Please login.");
        navigate("/login");
      } else {
        alert("Signup failed");
      }

    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-indigo-50 to-purple-100 dark:from-slate-900 dark:to-slate-800 p-4">
      <div className="bg-white dark:bg-slate-900 shadow-2xl rounded-2xl w-full max-w-md p-0 flex flex-col items-center border border-slate-200 dark:border-slate-700">
        <div className="w-full flex flex-col items-center p-8 pb-4">
          <h2 className="text-3xl font-bold text-indigo-700 dark:text-indigo-300 mb-2 text-center">Create Your Account</h2>
          <p className="text-slate-500 dark:text-slate-400 text-center mb-6">Sign up to access the learning dashboard</p>
        </div>
        <form className="w-full px-8 pb-8 flex flex-col gap-4" onSubmit={handleSubmit}>
          <div>
            <label className="block text-slate-700 dark:text-slate-200 font-semibold mb-1">Name</label>
            <input
              type="text"
              name="name"
              placeholder="Enter your name"
              className="border border-slate-300 dark:border-slate-600 p-2 w-full rounded-lg bg-white dark:bg-slate-800 text-slate-800 dark:text-slate-100 focus:outline-none focus:ring-2 focus:ring-indigo-400"
              onChange={handleChange}
              required
            />
          </div>
          <div>
            <label className="block text-slate-700 dark:text-slate-200 font-semibold mb-1">Email</label>
            <input
              type="email"
              name="email"
              placeholder="Enter your email"
              className="border border-slate-300 dark:border-slate-600 p-2 w-full rounded-lg bg-white dark:bg-slate-800 text-slate-800 dark:text-slate-100 focus:outline-none focus:ring-2 focus:ring-indigo-400"
              onChange={handleChange}
              required
            />
          </div>
          <div>
            <label className="block text-slate-700 dark:text-slate-200 font-semibold mb-1">Password</label>
            <input
              type="password"
              name="password"
              placeholder="Create a password"
              className="border border-slate-300 dark:border-slate-600 p-2 w-full rounded-lg bg-white dark:bg-slate-800 text-slate-800 dark:text-slate-100 focus:outline-none focus:ring-2 focus:ring-indigo-400"
              onChange={handleChange}
              required
            />
          </div>
          <div>
            <label className="block text-slate-700 dark:text-slate-200 font-semibold mb-1">Role</label>
            <select
              name="role"
              className="border border-slate-300 dark:border-slate-600 p-2 w-full rounded-lg bg-white dark:bg-slate-800 text-slate-800 dark:text-slate-100 focus:outline-none focus:ring-2 focus:ring-indigo-400"
              onChange={handleChange}
              required
              value={formData.role}
            >
              <option value="" disabled>Select role</option>
              <option value="learner">Learner</option>
              <option value="educator">Educator</option>
              <option value="coordinator">Coordinator</option>
            </select>
          </div>
          <button
            type="submit"
            className="bg-indigo-600 hover:bg-indigo-700 text-white font-semibold py-2 rounded-lg transition duration-200 mt-2 shadow"
          >
            Sign Up
          </button>
        </form>
        <div className="w-full px-8 pb-6">
          <p className="text-center text-slate-600 dark:text-slate-300 text-sm mt-2">
            Already have an account?{' '}
            <span
              className="text-indigo-600 dark:text-indigo-400 hover:underline cursor-pointer"
              onClick={() => navigate('/login')}
            >
              Login
            </span>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Signup;
