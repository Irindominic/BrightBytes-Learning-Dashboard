import React from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { AuthProvider } from "./context/AuthContext";
import { ThemeProvider } from "./context/ThemeContext";

import Signup from "./pages/Signup";
import Login from "./pages/login";
import ForgotPassword from "./pages/ForgotPassword";
import ProtectedRoute from "./components/ProtectedRoute";
import Navbar from "./components/Navbar";
import Welcome from "./pages/Welcome";
import DashboardHome from "./pages/DashboardHome";
import CoordinatorPanel from "./pages/Dashboard/CoordinatorPanel";
import EducatorPanel from "./pages/Dashboard/EducatorPanel";
import LearnerPanel from "./pages/Dashboard/LearnerPanel";

import Students from "./pages/Dashboard/Coordinator/Students";
import Educators from "./pages/Dashboard/Coordinator/Educators";
import CoordinatorCourses from "./pages/Dashboard/Coordinator/Courses";
import CourseCreator from "./pages/Dashboard/Coordinator/CourseCreator";

import Assignments from "./pages/Dashboard/Educator/Assignments";
import Quizzes from "./pages/Dashboard/Educator/Quizzes";
import Grading from "./pages/Dashboard/Educator/Grading";

import AvailableCourses from "./pages/Dashboard/Learner/AvailableCourses";
import Tasks from "./pages/Dashboard/Learner/Tasks";
import Submit from "./pages/Dashboard/Learner/Submit";

import NotFound from "./pages/NotFound";

const App = () => {
  return (
    <ThemeProvider>
      <AuthProvider>
        <BrowserRouter>
          <Navbar />
          <Routes>
            <Route path="/" element={<Welcome />} />
            <Route path="/signup" element={<Signup />} />
            <Route path="/login" element={<Login />} />
            <Route path="/forgot-password" element={<ForgotPassword />} />

            <Route
              path="/dashboard"
              element={
                <ProtectedRoute>
                  <DashboardHome />
                </ProtectedRoute>
              }
            />
            <Route
              path="/dashboard/coordinator"
              element={
                <ProtectedRoute allowedRoles={["coordinator"]}>
                  <CoordinatorPanel />
                </ProtectedRoute>
              }
            />
            <Route
              path="/dashboard/coordinator/students"
              element={
                <ProtectedRoute allowedRoles={["coordinator"]}>
                  <Students />
                </ProtectedRoute>
              }
            />
            <Route
              path="/dashboard/coordinator/educators"
              element={
                <ProtectedRoute allowedRoles={["coordinator"]}>
                  <Educators />
                </ProtectedRoute>
              }
            />
            <Route
              path="/dashboard/coordinator/courses"
              element={
                <ProtectedRoute allowedRoles={["coordinator"]}>
                  <CoordinatorCourses />
                </ProtectedRoute>
              }
            />
            <Route
              path="/dashboard/coordinator/course-creator"
              element={
                <ProtectedRoute allowedRoles={["coordinator"]}>
                  <CourseCreator />
                </ProtectedRoute>
              }
            />

            <Route
              path="/dashboard/educator"
              element={
                <ProtectedRoute allowedRoles={["educator"]}>
                  <EducatorPanel />
                </ProtectedRoute>
              }
            />
            <Route
              path="/dashboard/educator/assignments"
              element={
                <ProtectedRoute allowedRoles={["educator"]}>
                  <Assignments />
                </ProtectedRoute>
              }
            />
            <Route
              path="/dashboard/educator/quizzes"
              element={
                <ProtectedRoute allowedRoles={["educator"]}>
                  <Quizzes />
                </ProtectedRoute>
              }
            />
            <Route
              path="/dashboard/educator/grading"
              element={
                <ProtectedRoute allowedRoles={["educator"]}>
                  <Grading />
                </ProtectedRoute>
              }
            />

            <Route
              path="/dashboard/learner"
              element={
                <ProtectedRoute allowedRoles={["learner"]}>
                  <LearnerPanel />
                </ProtectedRoute>
              }
            />
            <Route
              path="/dashboard/learner/courses"
              element={
                <ProtectedRoute allowedRoles={["learner"]}>
                  <AvailableCourses />
                </ProtectedRoute>
              }
            />
            <Route
              path="/dashboard/learner/tasks"
              element={
                <ProtectedRoute allowedRoles={["learner"]}>
                  <Tasks />
                </ProtectedRoute>
              }
            />
            <Route
              path="/dashboard/learner/submit"
              element={
                <ProtectedRoute allowedRoles={["learner"]}>
                  <Submit />
                </ProtectedRoute>
              }
            />

            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
      </AuthProvider>
    </ThemeProvider>
  );
};

export default App;
