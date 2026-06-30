# Enterprise-Grade Hostel Management System

A centralized digital hostel administration platform built from scratch with MERN Stack (React, Vite, Node, Express, MongoDB).

---

## Folder Structure

```text
Hostel-Management-System/
├── backend/               # Node.js + Express.js + Mongoose + TypeScript API
│   ├── src/
│   │   ├── config/        # Environment and DB connection
│   │   ├── middleware/    # Auth and error handlers
│   │   ├── models/        # 15+ Mongoose Database models
│   │   ├── modules/       # Auth, Rooms, Roommates, Issues API routes/controllers
│   │   ├── utils/         # Helper functions and Multer uploads
│   │   └── app.ts / server.ts
│   ├── scripts/seed.ts    # Seed script with demo credentials
│   └── tsconfig.json
│
├── frontend/              # React.js + Vite + Tailwind CSS v4 SPA
│   ├── src/
│   │   ├── components/    # Reusable layouts, Sidebar, Navbar, Mobile Simulator
│   │   ├── store/         # Redux Toolkit client-side database slice
│   │   ├── pages/         # Admin, Warden, Staff dashboard views
│   │   ├── index.css      # Tailwind v4 configuration
│   │   └── App.jsx / main.jsx
│   ├── tailwind.config.js
│   └── vite.config.js
```

---

## Getting Started

### 1. Backend Setup

1. Open a terminal and navigate to the backend folder:

```bash
cd backend
```

2. Install dependencies:

```bash
npm install
```

3. Set up environment variables:

```bash
cp .env.example .env
```

4. Run database migrations and seed:

```bash
npm run migrate:up
npm run seed
```

5. Start the development server:

```bash
npm run dev
```

The backend API will run at:

```
http://localhost:5000
```

---

### 2. Frontend Setup

1. Open a new terminal and navigate to the frontend folder:

```bash
cd frontend
```

2. Install dependencies:

```bash
npm install
```

3. Run the development server:

```bash
npm run dev
```

The frontend will run at:

```
http://localhost:5173
```

---

## Seed Demo Credentials

| Role | Email | Password |
|------|-------|----------|
| Super Admin | admin@hms.local | Password123! |
| Hostel Warden | warden@hms.local | Password123! |
| Maintenance Staff | staff@hms.local | Password123! |
| Student Resident | john@student.local | Password123! |
| Student Resident | jane@student.local | Password123! |

---

## Database Collections

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

## Key Features

- SaaS Admin Dashboard
- Student Dashboard
- Warden Dashboard
- Staff Dashboard
- Role Based Authentication
- Hostel Applications
- Smart Room Allocation
- QR Attendance
- Fee Management
- Razorpay Integration
- Complaint Management
- Leave Management
- Visitor Management
- Inventory Management
- Mess Management
- Firebase Notifications
- Socket.IO Realtime Updates
- Cloudinary Document Upload
- Analytics Dashboard
- Mobile Responsive UI
- Local Storage Sync

---

## Tech Stack

### Frontend

- React.js
- Vite
- Tailwind CSS
- Redux Toolkit
- React Router DOM
- Axios
- Framer Motion
- Lucide React

### Backend

- Node.js
- Express.js
- MongoDB
- Mongoose
- JWT Authentication

### Integrations

- Razorpay
- Firebase
- Cloudinary
- Socket.IO
- Twilio

---

## License

MIT