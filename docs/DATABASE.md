# Database Documentation

This document describes the database design, collections, relationships, naming conventions, and best practices used in the Hostel Management System.

---

# Database Overview

The Hostel Management System uses **MongoDB** as its primary database.

MongoDB was selected because it provides:

- Flexible document-based storage
- High scalability
- Fast development workflow
- Easy integration with Mongoose
- Support for complex relationships

The backend interacts with MongoDB through **Mongoose ODM**.

---

# Database Design Principles

The database is designed with the following goals:

- Data consistency
- Scalability
- Maintainability
- Minimal duplication
- Clear relationships
- Efficient querying

---

# Naming Conventions

## Collections

Collections use lowercase plural names.

Examples:

```text
users
rooms
hostels
applications
payments
complaints
```

---

## Fields

Use camelCase.

Example:

```text
firstName
createdAt
roomNumber
paymentStatus
```

---

## Primary Key

MongoDB automatically generates:

```text
_id
```

for every document.

---

## Timestamps

Every collection should include:

```text
createdAt

updatedAt
```

using Mongoose timestamps.

---

# Collections

## Users

Stores authentication and user information.

Responsibilities:

- Login
- Authentication
- Roles
- User profile

Relationships:

- Student Details
- Hostel
- Room Allocation
- Documents

---

## Student Details

Stores student-specific information.

Examples:

- Roll Number
- Department
- Year
- Guardian Information
- Emergency Contacts

Relationship:

```text
User → StudentDetails
```

---

## Hostels

Stores hostel information.

Examples:

- Hostel Name
- Capacity
- Address
- Warden

Relationship:

```text
Hostel

↓

Rooms
```

---

## Rooms

Stores room information.

Examples:

- Room Number
- Floor
- Capacity
- Occupancy
- Hostel

Relationship:

```text
Hostel

↓

Rooms

↓

Allocations
```

---

## Applications

Stores hostel applications.

Examples:

- Pending
- Approved
- Rejected

Relationship:

```text
Student

↓

Application
```

---

## Allocations

Stores room allocation records.

Contains:

- Student
- Room
- Hostel
- Allocation Date
- Status

---

## Fees

Stores generated fee records.

Examples:

- Amount
- Due Date
- Status

---

## Payments

Stores payment history.

Examples:

- Transaction ID
- Amount
- Payment Method
- Date

---

## Attendance

Stores attendance records.

Examples:

- Date
- Student
- Status

---

## Leave Requests

Stores leave applications.

Examples:

- Start Date
- End Date
- Reason
- Approval Status

---

## Visitors

Stores visitor logs.

Examples:

- Visitor Name
- Student
- Check-In
- Check-Out

---

## Complaints

Stores maintenance and hostel complaints.

Examples:

- Category
- Priority
- Status
- Assigned Staff

---

## Inventory

Stores hostel inventory.

Examples:

- Furniture
- Appliances
- Quantity
- Condition

---

## Notifications

Stores notification history.

Examples:

- Title
- Message
- Recipient
- Status

---

## Documents

Stores uploaded document metadata.

Examples:

- File URL
- File Type
- Owner

Actual files are stored in Cloudinary.

---

## Mess

Stores mess-related information.

Examples:

- Menu
- Meal Plans
- Attendance

---

## Emergency Contacts

Stores emergency contact information for students.

---

# Collection Relationships

```text
User
│
├── Student Details
├── Documents
├── Notifications
├── Applications
├── Allocations
├── Payments
├── Attendance
├── Leave Requests
└── Complaints

Hostel
│
└── Rooms
     │
     └── Allocations
```

---

# Entity Relationship Overview

```text
Hostel
   │
   ▼
Room
   │
   ▼
Allocation
   │
   ▼
Student
   │
   ├── Payments
   ├── Attendance
   ├── Complaints
   ├── Visitors
   ├── Documents
   ├── Notifications
   └── Leave Requests
```

---

# Indexing Strategy

Frequently queried fields should be indexed.

Examples:

- email
- role
- hostelId
- roomId
- studentId
- applicationStatus
- paymentStatus
- createdAt

Indexes improve query performance but should be added only when justified.

---

# Validation Rules

Database models should validate:

- Required fields
- Unique values
- Enumerations
- String lengths
- Numeric ranges
- ObjectId references

Validation should occur before data is written.

---

# Soft Delete Strategy

Important records should not be permanently deleted.

Instead, consider:

```text
isDeleted

deletedAt
```

This preserves historical data and supports auditing.

---

# Transactions

MongoDB transactions should be used when multiple collections must be updated together.

Examples:

- Room allocation
- Payment processing
- Student admission
- Hostel transfer

---

# Data Integrity

The application should ensure:

- No room exceeds capacity.
- Allocations reference valid students.
- Payments reference existing fee records.
- Applications belong to registered users.
- Notifications target valid recipients.

---

# Backup Strategy

Production deployments should include:

- Scheduled database backups
- Secure off-site storage
- Backup verification
- Disaster recovery procedures

---

# Performance Recommendations

To maintain database performance:

- Use indexes appropriately.
- Avoid unnecessary document nesting.
- Paginate large queries.
- Limit returned fields.
- Archive historical records when necessary.

---

# Future Improvements

Potential database enhancements include:

- Multi-campus support
- Multi-tenant architecture
- Audit logs
- Activity history
- Read replicas
- Redis caching
- Full-text search
- Analytics database
- Data warehouse integration
