# Troubleshooting Guide

This document provides solutions to common issues encountered while setting up, developing, and running the Hostel Management System.

---

# Purpose

The purpose of this guide is to help developers quickly identify and resolve common problems without interrupting development.

If an issue is not listed here, review the application logs and verify your local environment before seeking additional support.

---

# Before You Begin

Verify the following:

- Node.js is installed.
- npm is installed.
- MongoDB is running.
- The `.env` file exists.
- Dependencies are installed.
- Ports are available.
- Internet connection is active (for third-party services).

---

# Backend Issues

## Backend Does Not Start

### Symptoms

- Server exits immediately
- Blank terminal
- Startup errors

### Possible Causes

- Missing dependencies
- Invalid environment variables
- TypeScript compilation errors

### Solutions

```bash
npm install
```

```bash
npm run dev
```

Verify:

- `.env` exists
- MongoDB is running
- Required environment variables are configured

---

## Port Already in Use

### Error

```text
EADDRINUSE
```

### Solution

Change the application port in the `.env` file.

Example:

```env
PORT=5001
```

or stop the process currently using the port.

---

## MongoDB Connection Failed

### Possible Causes

- MongoDB service not running
- Incorrect connection string
- Firewall restrictions

### Verify

```env
MONGODB_URI=
```

Ensure MongoDB is running before starting the backend.

---

## Environment Variables Not Loaded

### Symptoms

- JWT errors
- Database connection failures
- Missing API keys

### Verify

- `.env` is located inside the backend directory.
- Variable names match the application configuration.
- The server has been restarted after editing `.env`.

---

# Frontend Issues

## Frontend Will Not Start

Run:

```bash
npm install
```

then

```bash
npm run dev
```

If the problem persists:

- Delete `node_modules`
- Delete `package-lock.json`
- Reinstall dependencies

---

## Blank Screen

Possible causes:

- JavaScript runtime error
- Invalid route
- API unavailable

Check:

- Browser Developer Tools
- Console output
- Backend server status

---

## API Requests Fail

Verify:

- Backend is running.
- API URL is correct.
- CORS configuration allows the frontend origin.
- Authentication token is valid.

---

# Authentication Issues

## Login Fails

Verify:

- Email address
- Password
- Demo data has been seeded
- JWT configuration

Run:

```bash
npm run seed
```

if demo accounts are missing.

---

## Unauthorized (401)

Possible causes:

- Missing JWT
- Expired JWT
- Invalid JWT

Verify the request contains:

```http
Authorization: Bearer <TOKEN>
```

---

## Forbidden (403)

The authenticated user does not have permission to access the requested resource.

Verify:

- Assigned role
- Route permissions
- Backend authorization middleware

---

# Database Issues

## Seed Script Fails

Verify:

- MongoDB is running.
- Database connection is valid.
- Migrations completed successfully.

Run:

```bash
npm run migrate:up
npm run seed
```

---

## Duplicate Key Error

Possible causes:

- Existing data
- Unique index violation

Check for duplicate values before inserting new records.

---

## Missing Collections

Collections are created automatically when documents are inserted.

Run the seed script if required.

---

# File Upload Issues

Verify:

- Cloudinary credentials
- File size limits
- Allowed file types
- Network connectivity

---

# Firebase Issues

Verify:

- Firebase credentials
- Project configuration
- Service account permissions

Restart the backend after updating credentials.

---

# Razorpay Issues

Verify:

- Key ID
- Secret Key
- Test mode configuration
- Internet connectivity

---

# Socket.IO Issues

Verify:

- Backend is running.
- Socket server is initialized.
- Client connects to the correct endpoint.

---

# Dependency Issues

## Package Installation Failed

Run:

```bash
npm cache clean --force
```

Delete:

```text
node_modules
package-lock.json
```

Reinstall:

```bash
npm install
```

---

# Build Issues

## Production Build Failed

Verify:

- TypeScript errors
- Missing dependencies
- Environment variables
- Import paths

Run:

```bash
npm run build
```

Review the error output carefully.

---

# Performance Issues

Recommendations:

- Paginate large queries.
- Add database indexes.
- Avoid unnecessary API requests.
- Optimize images.
- Remove unused dependencies.

---

# Logging

Useful places to check:

Backend:

- Terminal output
- Application logs

Frontend:

- Browser Console
- Network tab
- React Developer Tools

Database:

- MongoDB logs

---

# Clean Installation

If multiple issues occur:

Backend:

```bash
rm -rf node_modules
rm package-lock.json

npm install
```

Frontend:

```bash
rm -rf node_modules
rm package-lock.json

npm install
```

Restart both servers.

---

# Verification Checklist

Before reporting an issue, verify:

- Node.js installed
- npm installed
- MongoDB running
- Dependencies installed
- Environment variables configured
- Backend running
- Frontend running
- Database seeded
- API reachable
- Browser console checked

---

# Reporting Issues

When reporting a bug, include:

- Operating system
- Node.js version
- npm version
- Error message
- Steps to reproduce
- Relevant logs
- Screenshots (if applicable)

Do **not** include:

- Passwords
- JWT tokens
- API keys
- `.env` contents
- Sensitive user data
