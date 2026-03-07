import React from "react";
import { useNavigate } from "react-router-dom";

const Welcome = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen w-full flex items-center justify-center bg-linear-to-br from-indigo-50 to-purple-100 dark:from-slate-900 dark:to-slate-800 p-4">
      <div className="bg-white dark:bg-slate-900 shadow-2xl rounded-2xl w-full max-w-lg p-0 flex flex-col items-center border border-slate-200 dark:border-slate-700 overflow-hidden">
        <img
          src="/src/assets/bg-learn.png"
          alt="Learning Illustration"
          className="w-full object-cover object-center"
        />
        <div className="p-8 w-full flex flex-col items-center gap-2">
          <h1 className="text-4xl font-bold text-indigo-700 dark:text-indigo-300 text-center">BrightBytes</h1>
          <p className="text-slate-500 dark:text-slate-400 text-center mb-4">
            Streamline Your Studies. Elevate Your Skills.
          </p>
          <button
            className="w-full bg-indigo-600 hover:bg-indigo-700 text-white font-semibold py-3 rounded-lg transition duration-200 text-lg shadow"
            onClick={() => navigate("/login")}
          >
            Get Started
          </button>
          {/* <p className="text-slate-600 dark:text-slate-300 text-sm mt-2">
            New here?{" "}
            <span
              className="text-indigo-600 dark:text-indigo-400 hover:underline font-semibold cursor-pointer"
              onClick={() => navigate("/signup")}
            >
              Create an account
            </span>
          </p> */}
        </div>
      </div>
    </div>
  );
};

export default Welcome;
