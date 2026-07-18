# TaskFlow Backend

A FastAPI-based REST API that powers the TaskFlow task management application. It provides secure JWT authentication, task management, search, filtering, and a clean REST architecture for the frontend.

---

## Features

- JWT Authentication
- User Registration & Login
- CRUD Operations for Tasks
- Search & Filter Tasks
- Due Date & Time Management
- Protected API Endpoints
- Interactive API Documentation
- SQLite for Development
- PostgreSQL Ready for Production

---

## Tech Stack

- FastAPI
- SQLAlchemy
- Pydantic
- JWT (python-jose)
- Passlib (bcrypt)
- SQLite (Development)
- PostgreSQL (Production)
- Uvicorn

---

## Project Structure

```
backend/
├── routers/          # API routes
├── models.py         # Pydantic models
├── database.py       # Database connection
├── database_models.py# SQLAlchemy models
├── auth.py           # Authentication logic
├── main.py           # FastAPI entry point
├── requirements.txt
└── .env.example
```

---

## Installation

```bash
cd backend

python -m venv venv
```

### Windows

```bash
venv\Scripts\activate
```

### macOS / Linux

```bash
source venv/bin/activate
```

Install dependencies

```bash
pip install -r requirements.txt
```

Create an environment file

```bash
cp .env.example .env
```

---

## Environment Variables

| Variable | Description |
|----------|-------------|
| `DATABASE_URL` | Database connection string |
| `SECRET_KEY` | Secret key used to sign JWT tokens |
| `ALGORITHM` | JWT signing algorithm |
| `ACCESS_TOKEN_EXPIRE_MINUTES` | JWT token expiration time |
| `FRONTEND_URL` | Allowed frontend origin for CORS |

Example:

```env
DATABASE_URL=sqlite:///./taskflow.db

SECRET_KEY=your_secret_key

ALGORITHM=HS256

ACCESS_TOKEN_EXPIRE_MINUTES=60

FRONTEND_URL=http://localhost:5173
```

---

## Running the Server

```bash
uvicorn main:app --reload --host 0.0.0.0 --port 8000
```

Backend:

```
http://localhost:8000
```

Swagger UI:

```
http://localhost:8000/docs
```

ReDoc:

```
http://localhost:8000/redoc
```

---

## API Endpoints

| Method | Endpoint | Authentication | Description |
|---------|----------|---------------|-------------|
| POST | `/register` | No | Register a new user |
| POST | `/login` | No | Login and receive JWT token |
| GET | `/me` | Yes | Get current user |
| GET | `/tasks` | Yes | Retrieve all tasks |
| GET | `/tasks/{id}` | Yes | Retrieve a specific task |
| POST | `/tasks` | Yes | Create a new task |
| PUT | `/tasks/{id}` | Yes | Update an existing task |
| DELETE | `/tasks/{id}` | Yes | Delete a task |

---

## Production

For production deployment:

- PostgreSQL database
- Environment variables
- Railway (Backend)
- Vercel (Frontend)

---

## License

This project is intended for educational and portfolio purposes.