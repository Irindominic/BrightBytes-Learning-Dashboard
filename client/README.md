# BrightBytes (Client)

Modern React front‑end for a learning dashboard with role‑based experiences for Learners, Educators, and Coordinators. Includes authentication, course browsing and enrollment, assignments, quizzes, and a responsive UI with Light/Dark theme.

## Features

- Role‑based dashboards (Learner, Educator, Coordinator)
- Authentication with local persistence
- Course management and enrollment
- Assignments and quiz workflows
- Light/Dark theme with toggle and persistence
- Responsive layout for desktop and mobile
- “Forgot Password” demo flow (email + new password)

## Tech Stack

- Vite + React 19
- React Router DOM 7
- Tailwind CSS 4
- Axios
- react-hot-toast

## Getting Started

### Prerequisites

- Node.js 18+ (recommended)
- npm 9+ (or compatible package manager)

### Install

```bash
npm install
```

### Environment

Create a `.env` file at the project root (next to `package.json`) if you want to override the default API URL:

```
VITE_API_URL=http://localhost:5050
```

If not set, the app defaults to `http://localhost:5050`.

### Run

```bash
npm run dev
```

Local dev server runs at `http://localhost:5173/`.

### Lint

```bash
npm run lint
```

### Build & Preview

```bash
npm run build
npm run preview
```

## Project Structure

```
src/
  components/      # Reusable UI (Navbar, Sidebar, ThemeToggle, DashboardLayout)
  context/         # AuthContext, ThemeContext
  hooks/           # useApi, useUsers, useCourses
  pages/           # Screens (Welcome, Login, Signup, Dashboard*, ForgotPassword, etc.)
  utils/           # API client and endpoints (utils/api.js)
  assets/          # Images and static assets
```

## Theming

- Uses Tailwind dark mode classes and CSS variables in `src/index.css`.
- Theme state persists in `localStorage` under `theme` (`light` or `dark`).
- On page load, a small script in `index.html` applies the saved theme to the `<html>` element before React mounts to prevent flicker.
- The toggle button lives in `src/components/ThemeToggle.jsx` and uses `ThemeContext` for state.

## Authentication

- `AuthContext` stores the current user and persists it to `localStorage` (`user` key).
- `ProtectedRoute` guards routes and redirects based on role:
  - `/dashboard/coordinator`, `/dashboard/educator`, `/dashboard/learner`

## API

The client talks to a REST API at `VITE_API_URL` (default `http://localhost:5050`).
Endpoints used by the client (see `src/utils/api.js`):

- Users: `/users`, `/users/:id`
- Courses: `/courses`, `/courses/:id`
- Assignments: `/assignments`, `/assignments/:id`
- Quizzes: `/quizzes`, `/quizzes/:id`

> Note: This repository contains only the client. Ensure your backend exposes the above routes with expected payloads.

## Forgot Password (Demo)

The current flow is intended for demos:

- “Forgot Password?” opens a page where the user enters email, new password, and confirmation.
- If the email exists, the password is updated directly and the user is redirected to Login.

For production, replace this with a tokenized email link flow handled by the server.

## Troubleshooting

- Theme not toggling: Ensure the `<html>` element has either `light` or `dark` class and that `localStorage.theme` is set. The app sets these automatically via `ThemeContext` and `index.html` boot script.
- API errors: Confirm `VITE_API_URL` points to a running backend and that CORS is configured appropriately.
- Lint errors: Run `npm run lint` and address reported issues.

## Scripts

- `dev`: Start Vite dev server
- `build`: Production build
- `preview`: Preview the production build
- `lint`: Run ESLint

## License

Specify your license here.

