import axios from "axios";

const API_BASE = import.meta.env.VITE_API_URL || "http://localhost:5050";

export const api = axios.create({
  baseURL: API_BASE,
  headers: { "Content-Type": "application/json" },
});

// Users
export const getUsers = () => api.get("/users");
export const getUser = (id) => api.get(`/users/${id}`);
export const createUser = (data) => api.post("/users", data);
export const updateUser = (id, data) => api.patch(`/users/${id}`, data);
export const deleteUser = (id) => api.delete(`/users/${id}`);

// Courses
export const getCourses = () => api.get("/courses");
export const getCourse = (id) => api.get(`/courses/${id}`);
export const createCourse = (data) => api.post("/courses", data);
export const updateCourse = (id, data) => api.patch(`/courses/${id}`, data);
export const deleteCourse = (id) => api.delete(`/courses/${id}`);

// Assignments
export const getAssignments = () => api.get("/assignments");
export const getAssignment = (id) => api.get(`/assignments/${id}`);
export const createAssignment = (data) => api.post("/assignments", data);
export const updateAssignment = (id, data) => api.patch(`/assignments/${id}`, data);
export const deleteAssignment = (id) => api.delete(`/assignments/${id}`);

// Quizzes
export const getQuizzes = () => api.get("/quizzes");
export const getQuiz = (id) => api.get(`/quizzes/${id}`);
export const createQuiz = (data) => api.post("/quizzes", data);
export const updateQuiz = (id, data) => api.patch(`/quizzes/${id}`, data);
export const deleteQuiz = (id) => api.delete(`/quizzes/${id}`);

// Submissions
export const getSubmissions = () => api.get("/submissions");
export const getSubmission = (id) => api.get(`/submissions/${id}`);
export const createSubmission = (data) => api.post("/submissions", data);
export const updateSubmission = (id, data) => api.patch(`/submissions/${id}`, data);
export const deleteSubmission = (id) => api.delete(`/submissions/${id}`);

// Quiz Results
export const getQuizResults = () => api.get("/quiz_results");
export const createQuizResult = (data) => api.post("/quiz_results", data);
