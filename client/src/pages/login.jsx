import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import bgLogin from "../assets/login_image.jpeg";

const Login = () => {
  const navigate = useNavigate();
  const { login } = useAuth();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [rememberMe, setRememberMe] = useState(false);

  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch("http://localhost:5050/users");
      const users = await response.json();

      // Check user credentials
      const user = users.find(
        (u) => u.email === email && u.password === password
      );

      if (user) {
        alert("Login Successful");
        login(user);
        if (rememberMe) localStorage.setItem("rememberMe", "true");
        if (rememberMe) {
          localStorage.setItem("rememberMe", JSON.stringify(true));
        }

        navigate("/dashboard");
      } else {
        alert("Invalid email or password");
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-linear-to-br from-indigo-50 to-purple-100 dark:from-slate-900 dark:to-slate-800 p-4">
      <div className="bg-white dark:bg-slate-900 shadow-2xl rounded-2xl w-full max-w-md p-0 flex flex-col items-center border border-slate-200 dark:border-slate-700 overflow-hidden">
        <div className="w-full flex flex-col items-center p-0 pb-0">
          <img
            src={bgLogin}
            alt="Login illustration"
            className="w-full h-99 object-cover object-top rounded-t-2xl"
            style={{ marginBottom: '-8px' }}
          />
          <div className="w-full flex flex-col items-center p-8 pb-4">
            <h2 className="text-3xl font-bold text-indigo-700 dark:text-indigo-300 mb-2 text-center">Welcome Back</h2>
            <p className="text-slate-500 dark:text-slate-400 text-center mb-6">Sign in to your account</p>
          </div>
        </div>
        <form className="w-full px-8 pb-8 flex flex-col gap-4" onSubmit={handleLogin}>
          <div>
            <label className="block text-slate-700 dark:text-slate-200 font-semibold mb-1">Email Address</label>
            <input
              type="email"
              placeholder="Enter your email"
              className="border border-slate-300 dark:border-slate-600 p-2 w-full rounded-lg bg-white dark:bg-slate-800 text-slate-800 dark:text-slate-100 focus:outline-none focus:ring-2 focus:ring-indigo-400"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>
          <div>
            <label className="block text-slate-700 dark:text-slate-200 font-semibold mb-1">Password</label>
            <input
              type="password"
              placeholder="Enter your password"
              className="border border-slate-300 dark:border-slate-600 p-2 w-full rounded-lg bg-white dark:bg-slate-800 text-slate-800 dark:text-slate-100 focus:outline-none focus:ring-2 focus:ring-indigo-400"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>
          <div className="flex items-center justify-between mb-2">
            <label className="flex items-center">
              <input
                type="checkbox"
                className="w-4 h-4 text-indigo-500 rounded focus:ring-2 focus:ring-indigo-400 cursor-pointer"
                checked={rememberMe}
                onChange={(e) => setRememberMe(e.target.checked)}
              />
              <span className="ml-2 text-slate-700 dark:text-slate-200 text-sm">Remember me</span>
            </label>
            <Link
              to="/forgot-password"
              className="text-indigo-500 dark:text-indigo-400 text-sm hover:underline font-semibold"
            >
              Forgot Password?
            </Link>
          </div>
          <button
            type="submit"
            className="bg-indigo-600 hover:bg-indigo-700 text-white font-semibold py-2 rounded-lg transition duration-200 mt-2 shadow"
          >
            Login
          </button>
        </form>
        <div className="w-full px-8 pb-6">
          <p className="text-center text-slate-600 dark:text-slate-300 text-sm mt-2">
            Don't have an account?{' '}
            <Link
              to="/signup"
              className="text-indigo-600 dark:text-indigo-400 hover:underline font-semibold"
            >
              Sign Up
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login;
