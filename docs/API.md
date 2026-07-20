# API Documentation

This document defines the API standards, conventions, authentication mechanisms, request formats, response structures, and endpoint organization used throughout the Hostel Management System.

---

# API Overview

The backend exposes a RESTful API that communicates with the frontend using JSON over HTTP/HTTPS.

All business operations are performed through authenticated API endpoints.

---

# Base URL

## Development

```text
http://localhost:5000/api
```

## Production

```text
https://your-domain.com/api
```

---

# API Principles

The API follows these principles:

- RESTful design
- Stateless communication
- JSON request and response bodies
- Predictable endpoint naming
- Proper HTTP status codes
- Centralized error handling
- Role-based authorization

---

# Authentication

Most endpoints require authentication.

Authentication is performed using JSON Web Tokens (JWT).

Clients must include the token in every protected request.

Example:

```http
Authorization: Bearer <JWT_TOKEN>
```

Unauthenticated requests to protected resources will be rejected.

---

# Content Type

All requests and responses use JSON unless stated otherwise.

```http
Content-Type: application/json
```

---

# API Versioning

Current version:

```text
v1
```

Example:

```text
/api/v1/auth/login
```

Future versions should follow:

```text
/api/v2/
```

without breaking existing clients.

---

# Endpoint Organization

Endpoints are grouped by feature.

```text
/api/auth
/api/users
/api/students
/api/hostels
/api/rooms
/api/applications
/api/allocations
/api/attendance
/api/leave
/api/complaints
/api/payments
/api/inventory
/api/visitors
/api/documents
/api/notifications
```

---

# Standard HTTP Methods

| Method | Purpose |
|----------|---------|
| GET | Retrieve resources |
| POST | Create resources |
| PUT | Replace resources |
| PATCH | Update resources |
| DELETE | Remove resources |

---

# Request Example

```http
POST /api/auth/login
```

```json
{
  "email": "admin@example.com",
  "password": "Password123!"
}
```

---

# Successful Response

```json
{
  "success": true,
  "message": "Login successful",
  "data": {
    "token": "...",
    "user": {}
  }
}
```

---

# Error Response

```json
{
  "success": false,
  "message": "Invalid credentials",
  "errors": []
}
```

---

# Standard Response Format

Every response should follow a consistent structure.

## Success

```json
{
  "success": true,
  "message": "",
  "data": {}
}
```

## Failure

```json
{
  "success": false,
  "message": "",
  "errors": []
}
```

---

# HTTP Status Codes

| Code | Meaning |
|------|---------|
| 200 | OK |
| 201 | Created |
| 204 | No Content |
| 400 | Bad Request |
| 401 | Unauthorized |
| 403 | Forbidden |
| 404 | Not Found |
| 409 | Conflict |
| 422 | Validation Failed |
| 429 | Too Many Requests |
| 500 | Internal Server Error |

---

# Validation

Incoming requests should be validated before reaching business logic.

Validation includes:

- Required fields
- Data types
- Length restrictions
- Email format
- Password strength
- Enum validation
- Object identifiers

Invalid requests should return:

```http
422 Unprocessable Entity
```

---

# Authorization

Authorization is enforced using user roles.

Supported roles include:

- Super Admin
- Admin
- Hostel Warden
- Staff
- Student

Users may only access resources permitted for their role.

---

# Pagination

Collection endpoints should support pagination.

Example:

```http
GET /api/students?page=1&limit=20
```

Example response:

```json
{
  "success": true,
  "data": {
    "items": [],
    "page": 1,
    "limit": 20,
    "total": 240
  }
}
```

---

# Filtering

Resources may support filtering.

Example:

```text
GET /api/students?hostel=A&page=1
```

---

# Sorting

Example:

```text
GET /api/students?sort=name
```

Descending:

```text
GET /api/students?sort=-createdAt
```

---

# Searching

Example:

```text
GET /api/students?search=John
```

---

# File Uploads

Endpoints that accept files should use:

```http
multipart/form-data
```

Example use cases:

- Student documents
- Profile images
- Hostel documents

---

# Rate Limiting

Production deployments should protect the API using rate limiting to reduce abuse and denial-of-service attacks.

---

# Logging

Every request should be logged with:

- Timestamp
- Method
- URL
- Response status
- Processing time

Sensitive information such as passwords and tokens must never be logged.

---

# Error Handling

Errors should be handled centrally.

Responses should never expose:

- Stack traces
- Database queries
- Internal file paths
- Environment variables

Unexpected exceptions should return:

```http
500 Internal Server Error
```

---

# Security Recommendations

The API should implement:

- JWT Authentication
- HTTPS
- Password hashing
- Input validation
- Output sanitization
- CORS protection
- Rate limiting
- Helmet security headers

More information is available in **SECURITY.md**.

---

# Future Improvements

Potential enhancements include:

- OpenAPI (Swagger) documentation
- API key authentication
- Refresh token support
- OAuth integration
- GraphQL gateway
- WebSocket event documentation
- API monitoring
- Request tracing
