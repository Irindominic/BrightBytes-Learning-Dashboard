import express from "express";
import cors from "cors";

// Import route files
import users from "./routes/users.js";
import courses from "./routes/courses.js";
import assignments from "./routes/assignments.js";
import submissions from "./routes/submissions.js";
import quizzes from "./routes/quizzes.js";
import quizResults from "./routes/quiz_results.js";

const PORT = process.env.PORT || 5050;

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

/*
Connect Routes
*/

app.use("/users", users);
app.use("/courses", courses);
app.use("/assignments", assignments);
app.use("/submissions", submissions);
app.use("/quizzes", quizzes);
app.use("/quiz_results", quizResults);

/*
Start Server
*/

app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`);
});