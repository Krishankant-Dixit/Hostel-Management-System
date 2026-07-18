# Setup Guide

This document explains how to set up the Hostel Management System for local development.

---

# Prerequisites

Ensure the following software is installed before running the project.

| Software | Recommended Version |
|-----------|---------------------|
| Node.js | 20 LTS or newer |
| npm | Latest |
| MongoDB | Community Edition or MongoDB Atlas |
| Git | Latest |
| VS Code | Latest (Recommended) |

Verify installation:

```bash
node -v
npm -v
git --version
```

---

# Clone Repository

```bash
git clone <repository-url>

cd Hostel-Management-System
```

---

# Project Structure

```text
Hostel-Management-System/
│
├── backend/
│
├── frontend/
│
└── docs/
```

---

# Backend Setup

Move into the backend directory.

```bash
cd backend
```

Install dependencies.

```bash
npm install
```

---

# Environment Variables

Copy the example environment file.

```bash
cp .env.example .env
```

Update the values inside `.env`.

Example:

```env
PORT=5000

MONGODB_URI=mongodb://localhost:27017/hostel-management

JWT_SECRET=your_secret_key

JWT_EXPIRES_IN=7d

FIREBASE_PROJECT_ID=

FIREBASE_CLIENT_EMAIL=

FIREBASE_PRIVATE_KEY=

RAZORPAY_KEY_ID=

RAZORPAY_KEY_SECRET=

CLOUDINARY_CLOUD_NAME=

CLOUDINARY_API_KEY=

CLOUDINARY_API_SECRET=

TWILIO_ACCOUNT_SID=

TWILIO_AUTH_TOKEN=
```

> Never commit `.env` files to version control.

---

# Database

Start MongoDB locally or connect to MongoDB Atlas.

Run database migrations.

```bash
npm run migrate:up
```

Seed demo data.

```bash
npm run seed
```

---

# Start Backend

```bash
npm run dev
```

Default backend URL:

```text
http://localhost:5000
```

---

# Frontend Setup

Open a second terminal.

```bash
cd frontend
```

Install dependencies.

```bash
npm install
```

Start development server.

```bash
npm run dev
```

Default frontend URL:

```text
http://localhost:5173
```

---

# Demo Credentials

Use these accounts only during development.

| Role | Email | Password |
|------|-------|----------|
| Super Admin | admin@hms.local | Password123! |
| Hostel Warden | warden@hms.local | Password123! |
| Maintenance Staff | staff@hms.local | Password123! |
| Student | john@student.local | Password123! |
| Student | jane@student.local | Password123! |

---

# Available Scripts

## Backend

| Command | Description |
|----------|-------------|
| npm run dev | Start development server |
| npm run build | Build production bundle |
| npm run start | Start production server |
| npm run seed | Seed demo data |
| npm run migrate:up | Run database migrations |

## Frontend

| Command | Description |
|----------|-------------|
| npm run dev | Start Vite development server |
| npm run build | Build production assets |
| npm run preview | Preview production build |

---

# Recommended Development Workflow

1. Start MongoDB.
2. Start Backend.
3. Start Frontend.
4. Log in using a demo account.
5. Develop features.
6. Test before committing.
7. Push changes.

---

# Common Setup Issues

| Problem | Solution |
|----------|----------|
| MongoDB connection failed | Verify MongoDB service is running and `MONGODB_URI` is correct. |
| Port already in use | Change the port inside `.env`. |
| Environment variables not loading | Ensure `.env` exists inside the backend directory. |
| npm install fails | Delete `node_modules` and `package-lock.json`, then reinstall. |
| Seed script fails | Ensure migrations completed successfully before seeding. |

For additional issues, refer to **`docs/TROUBLESHOOTING.md`**.

---

# Verification Checklist

Before starting development, verify the following:

- Node.js installed
- npm installed
- MongoDB running
- `.env` configured
- Dependencies installed
- Backend running
- Frontend running
- Database seeded
- Login successful

