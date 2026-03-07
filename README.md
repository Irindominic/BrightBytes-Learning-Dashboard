# BrightBytes

**BrightBytes** is a full-stack learning dashboard with role-based access for **Learners, Educators, and Coordinators**.
It provides course management, assignments, quizzes, and grading features through a React frontend and an Express + MongoDB backend.

---

# Features

* Role-based dashboards
* User authentication
* Course creation and enrollment
* Assignments and submissions
* Quiz management and results
* Responsive interface

---

# Tech Stack

**Frontend**

* React (Vite)
* React Router
* Tailwind CSS
* Axios

**Backend**

* Node.js
* Express.js
* MongoDB

---

# Project Structure

```
project_cgpc/
  client/        # React frontend
  server/        # Express backend
```

---

# Setup

## Backend

```bash
cd server
npm install
```

Set MongoDB connection:

```bash
export ATLAS_URI="your-mongodb-connection-string"
```

Start server:

```bash
node server.js
```

Backend runs on:

```
http://localhost:5050
```

---

## Frontend

```bash
cd client
npm install
npm run dev
```

Frontend runs on:

```
http://localhost:5173
```

---

# API Base URL

```
http://localhost:5050
```

Main resources:

* `/users`
* `/courses`
* `/assignments`
* `/quizzes`
* `/submissions`
* `/quiz_results`

