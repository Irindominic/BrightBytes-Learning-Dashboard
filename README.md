# BrightBytes

Full‑stack learning dashboard with role‑based experiences for Learners, Educators, and Coordinators. The repository contains a React (Vite) client and an Express + MongoDB backend.

## Features

- Role‑based dashboards (Learner, Educator, Coordinator)
- Authentication with local persistence
- Course management and enrollment
- Assignments, quizzes, submissions, and grading workflows
- Light/Dark theme with toggle and persistence
- Responsive layout for desktop and mobile

## Tech Stack

- Client: Vite + React 19, React Router DOM 7, Tailwind CSS 4, Axios, react-hot-toast
- Server: Node.js, Express 5, MongoDB Node.js Driver

## Monorepo Structure

```
project_cgpc/
  client/                 # Frontend (Vite + React)
    src/
      components/         # Navbar, Sidebar, ThemeToggle, DashboardLayout, etc.
      context/            # AuthContext, ThemeContext
      hooks/              # useApi, useUsers, useCourses
      pages/              # Screens (Welcome, Login, Signup, Dashboard*, etc.)
      utils/              # API client (utils/api.js)
  server/                 # Backend (Express + MongoDB)
    db/                   # Mongo connection (db/connection.js)
    routes/               # REST resources: users, courses, assignments, quizzes, submissions, quiz_results
    server.js             # Server entry (CORS, JSON middleware, route mounting)
```

## Quick Start

### Prerequisites

- Node.js 18+
- npm 9+ (or compatible package manager)
- MongoDB Atlas (or another MongoDB instance) connection string

### Backend (Server)

1) Install dependencies

```bash
cd server
npm install
```

2) Configure environment

The server expects a MongoDB connection string in `ATLAS_URI`. It does not load `.env` files by default, so set the variable in your shell:

- macOS/Linux (bash/zsh):

```bash
export ATLAS_URI="your-mongodb-connection-string"
```

- Windows PowerShell:

```powershell
$env:ATLAS_URI="your-mongodb-connection-string"
```

Optional: set a custom port with `PORT` (defaults to `5050`).

3) Start the server

```bash
node server.js
```

The API listens on `http://localhost:5050` unless you provide a different `PORT`.

### Frontend (Client)

1) Install dependencies

```bash
cd client
npm install
```

2) Configure API URL (optional)

The client reads `VITE_API_URL` and falls back to `http://localhost:5050`. To point at a different server:

Create `.env` in `client/`:

```
VITE_API_URL=http://localhost:5050
```

3) Run the dev server

```bash
npm run dev
```

The app runs at `http://localhost:5173/` by default.

## API Overview

Base URL: `http://localhost:5050`

- Users: `GET /users`, `GET /users/:id`, `POST /users`, `PATCH /users/:id`, `DELETE /users/:id`
- Courses: `GET /courses`, `GET /courses/:id`, `POST /courses`, `PATCH /courses/:id`, `DELETE /courses/:id`
- Assignments: `GET /assignments`, `GET /assignments/:id`, `POST /assignments`, `PATCH /assignments/:id`, `DELETE /assignments/:id`
- Quizzes: `GET /quizzes`, `GET /quizzes/:id`, `POST /quizzes`, `PATCH /quizzes/:id`, `DELETE /quizzes/:id`
- Submissions: `GET /submissions`, `GET /submissions/:id`, `POST /submissions`, `PATCH /submissions/:id`, `DELETE /submissions/:id`
- Quiz Results: `GET /quiz_results`, `GET /quiz_results/:id`, `POST /quiz_results`, `PUT /quiz_results/:id`, `DELETE /quiz_results/:id`

## Scripts

- Client:
  - `npm run dev` – start Vite dev server
  - `npm run build` – production build
  - `npm run preview` – preview production build
  - `npm run lint` – run ESLint
- Server:
  - Start with `node server.js` (after setting `ATLAS_URI`)

## Troubleshooting

- Connection errors: ensure `ATLAS_URI` is set and reachable. The server pings MongoDB on startup.
- CORS or 404s: confirm the client’s `VITE_API_URL` points to your running server.
- Port collisions: change `PORT` for the backend or `--port` for Vite.

## License

Specify your license here.

