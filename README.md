# TaskFlow

A full-stack task management web application built with **React**, **FastAPI**, and **SQLAlchemy**, featuring secure JWT authentication, responsive design, and a clean, maintainable architecture.

![React](https://img.shields.io/badge/React-Vite-61DAFB?logo=react)
![FastAPI](https://img.shields.io/badge/FastAPI-SQLAlchemy-009688?logo=fastapi)
![Python](https://img.shields.io/badge/Python-3.12-blue?logo=python)
![Database](https://img.shields.io/badge/Database-SQLite%20%7C%20PostgreSQL-003B57?logo=sqlite)
![License](https://img.shields.io/badge/License-MIT-green)

---

## 🌐 Live Demo

**Frontend:** https://task-flow-dusky-beta.vercel.app

**Backend API:** https://taskflow-production-51ac.up.railway.app/docs

---

## 📖 Project Overview

TaskFlow is a modern task management application that allows users to securely register, log in, and manage their personal tasks. It includes authentication, task priorities, due dates, search, filtering, dark mode, and a responsive dashboard.

The backend is built with **FastAPI** following REST principles, while the frontend uses **React + Vite** for a fast and responsive user experience.

---

## ✨ Features

- Secure User Registration & Login
- JWT Authentication
- Password Hashing using bcrypt
- CRUD Operations for Tasks
- Priority Levels (High, Medium, Low)
- Task Status Tracking (Pending / Completed)
- Search Tasks by Title
- Filter Tasks by Status
- Responsive Dashboard
- Sidebar Navigation
- Create & Edit Task Modal
- Delete Confirmation Dialog
- Loading Indicators & Empty States
- Toast Notifications
- Dark & Light Theme

---

## 🏗️ Architecture

```text
                React + Vite
                      │
             Axios REST Requests
                      │
                      ▼
                 FastAPI Backend
                      │
               SQLAlchemy ORM
                      │
      SQLite (Development)
               │
               ▼
 PostgreSQL (Production)
```

---

## 🛠 Tech Stack

| Layer | Technologies |
|-------|--------------|
| Frontend | React, Vite, React Router, Axios, Tailwind CSS |
| Backend | FastAPI, SQLAlchemy, Pydantic, Passlib (bcrypt), python-jose (JWT) |
| Database | SQLite (Development), PostgreSQL (Production) |

---

## 📂 Project Structure

```text
taskflow/
│
├── backend/
│   ├── routers/
│   │   ├── users.py
│   │   └── tasks.py
│   ├── auth.py
│   ├── database.py
│   ├── database_models.py
│   ├── models.py
│   ├── main.py
│   ├── requirements.txt
│   ├── .env.example
│   └── README.md
│
├── frontend/
│   ├── src/
│   │   ├── assets/
│   │   ├── components/
│   │   ├── context/
│   │   ├── hooks/
│   │   ├── pages/
│   │   ├── services/
│   │   ├── App.jsx
│   │   └── main.jsx
│   ├── public/
│   ├── package.json
│   ├── vite.config.js
│   └── README.md
│
└── README.md
```

---

## ⚙️ Installation

### Prerequisites

- Python 3.10+
- Node.js 18+
- npm

### Clone the Repository

```bash
git clone https://github.com/your-username/taskflow.git

cd taskflow
```

---

### Backend Setup

```bash
cd backend

python -m venv venv
```

#### Windows

```bash
venv\Scripts\activate
```

#### macOS / Linux

```bash
source venv/bin/activate
```

Install dependencies

```bash
pip install -r requirements.txt
```

Create environment file

```bash
copy .env.example .env
# Windows

# cp .env.example .env
# macOS/Linux
```

Run the backend

```bash
uvicorn main:app --reload --port 8000
```

Backend

```
http://localhost:8000
```

Swagger

```
http://localhost:8000/docs
```

ReDoc

```
http://localhost:8000/redoc
```

---

### Frontend Setup

```bash
cd frontend

npm install
```

Create

```
.env.development
```

```env
VITE_API_URL=http://localhost:8000
```

Run

```bash
npm run dev
```

Frontend

```
http://localhost:5173
```

Production build

```bash
npm run build
```

---

## 🔐 Environment Variables

### Backend

| Variable | Description |
|----------|-------------|
| DATABASE_URL | Database connection string |
| SECRET_KEY | JWT signing secret |
| ALGORITHM | JWT algorithm |
| ACCESS_TOKEN_EXPIRE_MINUTES | Token expiration time |
| FRONTEND_URL | Allowed frontend origin |

Example

```env
DATABASE_URL=sqlite:///./taskflow.db

SECRET_KEY=your-secret-key

ALGORITHM=HS256

ACCESS_TOKEN_EXPIRE_MINUTES=60

FRONTEND_URL=http://localhost:5173
```

---

### Frontend

```env
VITE_API_URL=http://localhost:8000
```

For production, configure

```env
VITE_API_URL=https://your-backend-url.com
```

---

## 📡 API Endpoints

### Authentication

| Method | Endpoint | Description |
|---------|----------|-------------|
| POST | `/register` | Register a new user |
| POST | `/login` | Login and receive JWT |
| GET | `/me` | Get current user |

### Tasks

| Method | Endpoint | Description |
|---------|----------|-------------|
| GET | `/tasks` | List all tasks |
| GET | `/tasks/{id}` | Get a task |
| POST | `/tasks` | Create a task |
| PUT | `/tasks/{id}` | Update a task |
| DELETE | `/tasks/{id}` | Delete a task |

---

## 🗄 Database Schema

### Users

| Column | Type |
|---------|------|
| id | Integer |
| name | String |
| email | String (Unique) |
| hashed_password | String |
| created_at | DateTime |

### Tasks

| Column | Type |
|---------|------|
| id | Integer |
| title | String |
| description | Text |
| due_date | DateTime |
| priority | High / Medium / Low |
| status | Pending / Completed |
| created_at | DateTime |
| updated_at | DateTime |
| user_id | Foreign Key |

Relationship

```
One User
     │
     └──────────────▶ Many Tasks
```



## 🚀 Future Improvements

- Drag & Drop Task Management
- Task Categories & Tags
- Email Reminders
- Team Collaboration
- Activity History
- Refresh Tokens
- Docker Support
- Unit & Integration Testing

---

## 📄 License

This project is licensed under the **MIT License**.

---

## 👨‍💻 Author

**Sandeep Akula**

Built as a portfolio project to demonstrate full-stack development using **React**, **FastAPI**, and **SQLAlchemy**.
