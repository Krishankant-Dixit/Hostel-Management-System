# Enterprise-Grade Hostel Management System

A centralized digital hostel administration platform built from scratch with MERN Stack (React, Vite, Node, Express, MongoDB).

---

## Folder Structure

```
HMS/
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
   ```
   ```bash
   npm run seed
   ```
5. Start the development server:
   ```bash
   npm run dev
   ```
   The backend API will run at `http://localhost:5000`.

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
3. Run the Vite development server:
   ```bash
   npm run dev
   ```
   The frontend UI will run at `http://localhost:5173`.

---

## Seed Demo Credentials

To experience the role-based dashboard states, you can log in or toggle using the **Demo View Switcher** in the left sidebar:

| Role | Email | Password |
|------|-------|----------|
| Super Admin | `admin@hms.local` | `Password123!` |
| Hostel Warden | `warden@hms.local` | `Password123!` |
| Maintenance Staff | `staff@hms.local` | `Password123!` |
| Student Resident | `john@student.local` | `Password123!` |
| Student Resident | `jane@student.local` | `Password123!` |

---

## Database Schemas & Collections

- **users**: Authentication credentials, roles (`admin`, `warden`, `staff`, `student`), and profile references.
- **studentdetails**: Enrollment number, course department, year, profile avatar, and parent contact.
- **hostels**: Hostel type blocks, overall bed capacities, warden assignments.
- **rooms**: Room numbers, floor configurations, sharing capacities, occupant sizes, and amenities.
- **applications**: Admission application flows (Pending -> Review -> Approved -> Allocated).
- **allocations**: Live roommate allocation links.
- **fees**: Generated billing cycles (Hostel, Mess, Security deposit, Maintenance).
- **payments**: UPI, Credit card, and net-banking transactions logs.
- **attendance**: Daily scanner checks, in-times and out-times.
- **leaveRequests**: Reason, destination logs, parent SMS approvals, and warden approvals.
- **visitors**: Expected visitor gatepasses with entrance/exit status flags.
- **complaints**: Categories (Electricity, Water, Cleaning, Internet) and staff assignment logs.
- **inventory**: Quantity details for beds, tables, fans, and water coolers.
- **notifications**: Fee dues, room assignments, leave request statuses.
- **documents**: File upload states for verification (ID Proofs, Receipts).
- **mess**: Weekly dining menus.
- **emergencyContacts**: Main gate security and clinic direct dial contacts.

---

## Key Features Implemented

1. **SaaS Dashboard (Super Admin)**: Occupancy progress rings, Line and Doughnut charts, upcoming birthdays list, and main modules directories.
2. **Student Mobile App Simulator**: Modeled inside a physical phone frame on the right side of the screen. Supports QR Check-in scanner simulation, Razorpay payments, leave requests, complaint registrations, visitor passes, and document uploads.
3. **Warden Approvals**: Direct actions to Approve/Reject leaves, confirm gatepass check-ins/outs, and auto-allocate rooms to approved applicants.
4. **Staff Maintenance Console**: Mark assigned complaint logs as In Progress, Resolved, or Closed.
5. **Local Persistence**: Full frontend operations sync to `localStorage` in real-time.
