# Hostel Management System

A production-oriented Hostel Management System built with the MERN stack to streamline hostel administration through a centralized, role-based platform.

The project is designed with scalability, maintainability, and production readiness in mind, making it suitable for educational institutions, universities, and campus hostels.

---

## Overview

This repository contains a full-stack hostel management platform consisting of a React frontend and an Express backend. The system centralizes hostel operations including student management, room allocation, fee management, complaints, attendance, inventory, and administrative workflows.

Current architecture focuses on:

- Modular backend architecture
- Role-based authentication and authorization
- Scalable MongoDB data model
- Responsive frontend
- Production-ready development practices
- Documentation-first workflow

---

# Features

### Authentication & Authorization

- Role-Based Access Control (RBAC)
- JWT Authentication
- Secure login system
- Protected routes

### Administration

- Super Admin Dashboard
- Hostel Dashboard
- Student Dashboard
- Staff Dashboard
- Warden Dashboard

### Hostel Management

- Hostel Management
- Room Management
- Smart Room Allocation
- Hostel Applications
- Student Records
- Roommate Management

### Operations

- Attendance Management
- Leave Requests
- Complaint Management
- Visitor Management
- Inventory Management
- Mess Management
- Emergency Contacts

### Finance

- Fee Management
- Payment Tracking
- Razorpay Integration

### Communication

- Notifications
- Firebase Integration
- Socket.IO Realtime Updates

### Documents

- Cloudinary Uploads
- Student Documents

### User Experience

- Responsive Interface
- Mobile Friendly
- Local Storage Sync
- Analytics Dashboard

---

# Tech Stack

## Frontend

- React
- Vite
- Redux Toolkit
- React Router DOM
- Tailwind CSS
- Axios
- Framer Motion
- Lucide React

## Backend

- Node.js
- Express.js
- TypeScript
- MongoDB
- Mongoose
- JWT Authentication
- Multer

## Integrations

- Firebase
- Cloudinary
- Socket.IO
- Razorpay
- Twilio

---

# Repository Structure

```text
Hostel-Management-System/
│
├── backend/
│   ├── src/
│   │   ├── config/
│   │   ├── middleware/
│   │   ├── models/
│   │   ├── modules/
│   │   ├── utils/
│   │   ├── app.ts
│   │   └── server.ts
│   │
│   ├── scripts/
│   │   └── seed.ts
│   │
│   └── tsconfig.json
│
├── frontend/
│   ├── src/
│   │   ├── components/
│   │   ├── pages/
│   │   ├── store/
│   │   ├── App.jsx
│   │   ├── main.jsx
│   │   └── index.css
│   │
│   ├── tailwind.config.js
│   └── vite.config.js
│
└── docs/
    ├── SETUP.md
    ├── ARCHITECTURE.md
    ├── REQUIREMENTS.md
    ├── API.md
    ├── DATABASE.md
    ├── SECURITY.md
    ├── TROUBLESHOOTING.md
    └── DEPLOYMENT.md
```

---

# Documentation

Detailed project documentation is available inside the **docs/** directory.


| Document | Description |
| :--- | :--- |
| [SETUP.md](docs/SETUP.md) | Local development environment setup |
| [ARCHITECTURE.md](docs/ARCHITECTURE.md) | System architecture and project structure |
| [REQUIREMENTS.md](docs/REQUIREMENTS.md) | Functional and technical requirements |
| [API.md](docs/API.md) | API conventions and endpoint documentation |
| [DATABASE.md](docs/DATABASE.md) | Database schema and relationships |
| [SECURITY.md](docs/SECURITY.md) | Authentication and security practices |
| [TROUBLESHOOTING.md](docs/TROUBLESHOOTING.md) | Common issues and solutions |
| [DEPLOYMENT.md](docs/DEPLOYMENT.md) | Production deployment guide |


---

# Quick Start

## Backend

```bash
cd backend

npm install

cp .env.example .env

npm run migrate:up

npm run seed

npm run dev
```

Backend:

```text
http://localhost:5000
```

---

## Frontend

```bash
cd frontend

npm install

npm run dev
```

Frontend:

```text
http://localhost:5173
```

---

# Demo Credentials

> Intended only for local development and testing.

| Role | Email | Password |
|------|-------|----------|
| Super Admin | admin@hms.local | Password123! |
| Hostel Warden | warden@hms.local | Password123! |
| Maintenance Staff | staff@hms.local | Password123! |
| Student | john@student.local | Password123! |
| Student | jane@student.local | Password123! |

---

# Database Collections

Current primary collections:

- users
- studentdetails
- hostels
- rooms
- applications
- allocations
- fees
- payments
- attendance
- leaveRequests
- visitors
- complaints
- inventory
- notifications
- documents
- mess
- emergencyContacts

---

# Development Goals

The project is being developed with the following long-term objectives:

- Clean and maintainable architecture
- Modular backend
- Scalable database design
- Production-ready authentication
- Comprehensive documentation
- Enterprise-grade coding standards
- SaaS-ready foundation

---

# Project Status

🚧 **Active Development**

Current focus:

- Backend architecture refinement
- Authentication improvements
- Documentation
- Production readiness
- Testing
- Deployment preparation

---

# Contributing

Before contributing:

1. Read the documentation inside the `docs/` directory.
2. Follow the existing project architecture.
3. Keep modules independent and reusable.
4. Avoid duplicate business logic.
5. Test changes before submitting.

---

# License

This project is licensed under the **MIT License**.