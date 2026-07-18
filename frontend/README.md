# TaskFlow Frontend

A modern React + Vite frontend for the TaskFlow task management application. It provides a clean and responsive user interface for authentication, task management, and productivity tracking through a FastAPI backend.

---

## Features

- Secure JWT Authentication
- User Registration & Login
- Dashboard for Task Management
- Create, Edit & Delete Tasks
- Task Status Management
- Due Date & Time Support
- Search & Filter Tasks
- Dark & Light Theme
- Responsive Design
- Toast Notifications

---

## Tech Stack

- React
- Vite
- React Router
- Axios
- Tailwind CSS
- Context API

---

## Project Structure

```
frontend/
├── src/
│   ├── components/     # Reusable UI components
│   ├── pages/          # Login, Register, Dashboard
│   ├── services/       # Axios API client
│   ├── hooks/          # Custom React hooks
│   ├── context/        # Authentication, Theme & Toast providers
│   ├── assets/
│   └── App.jsx
├── public/
├── package.json
└── vite.config.js
```

---

## Installation

```bash
cd frontend

npm install
```

---

## Environment Variables

Create a `.env.development` file.

```env
VITE_API_URL=http://localhost:8000
```

For production, configure the following variable in your hosting platform (e.g., Vercel):

```env
VITE_API_URL=https://your-backend-url.com
```

---

## Running the Application

```bash
npm run dev
```

Frontend:

```
http://localhost:5173
```

---

## Production Build

```bash
npm run build
```

Preview the production build locally:

```bash
npm run preview
```

---

## Backend

The frontend communicates with the TaskFlow FastAPI backend through REST APIs.

Default development backend:

```
http://localhost:8000
```

---

## Production

Recommended deployment:

- Frontend: Vercel
- Backend: Railway
- Database: PostgreSQL

---

## License

This project is intended for educational and portfolio purposes.