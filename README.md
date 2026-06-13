# Task Management API

A production-oriented backend application built using **Node.js, Express.js, MongoDB, Redis, and Session-based Authentication**.

This project allows users to register, login, and manage tasks while demonstrating practical Redis usage including session storage, caching, rate limiting, login throttling, and analytics.

---

# Setup Instructions

## 1. Clone Repository

```bash
git clone https://github.com/NSugam/task-management-apis
```

---

## 2. Install Dependencies

```bash
npm install
```

---

## 3. Setup Environment Variables

Create a `.env` file in root directory.

Example:

```env
PORT=5000
NODE_ENV=dev
MONGO_URI=mongodb://localhost:27017/task-management
REDIS_URL=redis://localhost:6379
SESSION_SECRET=super-secret-key
SESSION_EXPIRY=3600000
```

---

## 4. Start MongoDB

Make sure MongoDB is running locally.

Default URL:

```txt
mongodb://localhost:27017
```

---

## 5. Start Redis Server

Make sure Redis server is running.

Default URL:

```txt
redis://localhost:6379
```

---

## 6. Run Project

Development:

```bash
npm run start:dev
```

Production:

```bash
npm start
```

Server will start at:

```txt
http://localhost:5000
```

---

# API Documentation

Base URL:

```txt
http://localhost:5000/api
```

---

## Authentication APIs

### Register User

### POST `/auth/register`

Request Body:

```json
{
  "fullName": "Sugam Neupane",
  "email": "sugam@gmail.com",
  "password": "sugam123"
}
```

---

### Login User

### POST `/auth/login`

Request Body:

```json
{
  "email": "sugam@gmail.com",
  "password": "sugam123"
}
```

---

### Logout User

### POST `/auth/logout`

---

### Session Info

### GET `/auth/session-info`

---

## Task APIs

### Create Task

### POST `/tasks`

Request Body:

```json
{
  "title": "This is title",
  "description": "This is description",
  "priority": "High"
}
```

---

### Get All Tasks

### GET `/tasks`

Returns logged-in user's tasks.

---

### Update Task

### PATCH `/tasks/:id`

Request Body:

```json
{
  "title": "Updated title",
  "priority": "Medium"
}
```

---

### Delete Task

### DELETE `/tasks/:id`

Deletes task by ID.

---

## Analytics API

### GET `/analytics`

Response:

```json
{
  "success": true,
  "data": {
    "totalLogins": 10,
    "tasksCreated": 25,
    "tasksUpdated": 8,
    "tasksDeleted": 4
  }
}
```

---

# Redis Usage in Project

### Session Store
Used for storing user sessions.

### Rate Limiting
Maximum **20 requests/minute per user/IP**.

### Task List Caching
Tasks are cached for **5 minutes** and invalidated on create, update, and delete.

### Login Attempt Tracking
Maximum **5 failed login attempts within 15 minutes**.

### Activity Analytics
Tracks:
- Total successful logins
- Tasks created
- Tasks updated
- Tasks deleted

---

# Author

** Sugam Neupane | https://neupanesugam.com.np **