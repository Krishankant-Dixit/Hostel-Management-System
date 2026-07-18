
# Primary Objective

Develop a secure, maintainable, scalable Hostel Management System.

Every generated code change must improve the project while preserving architecture consistency.

Never sacrifice maintainability for shorter code.

---

# Project Stack

Frontend

- React
- Vite
- Redux Toolkit
- Tailwind CSS
- React Router

Backend

- Node.js
- Express
- TypeScript
- MongoDB
- Mongoose

Integrations

- Firebase
- Cloudinary
- Razorpay
- Socket.IO
- Twilio

---

# Read Documentation First

Before modifying any code, always understand the project by reading:

README.md

docs/

- SETUP.md
- ARCHITECTURE.md
- REQUIREMENTS.md
- API.md
- DATABASE.md
- SECURITY.md
- TROUBLESHOOTING.md
- DEPLOYMENT.md

Never assume undocumented behavior.

---

# Architecture Rules

Always preserve modular architecture.

Never place business logic inside:

- routes
- controllers
- React components

Business logic belongs inside services/modules.

Controllers should:

- validate request
- call service
- return response

Nothing more.

---

# Folder Structure

Never create random folders.

Always follow existing project structure.

Backend

config/
middleware/
models/
modules/
routes/
services/
utils/

Frontend

components/
pages/
hooks/
store/
services/
utils/

---

# Never Break Existing Features

Before editing code:

Understand

- dependencies
- imports
- module usage
- data flow

Avoid unnecessary refactoring.

Only modify what is required.

---

# Authentication Rules

Never bypass authentication.

Always protect private routes.

Use JWT.

Never expose

- passwords
- secrets
- tokens

Never disable middleware for testing.

---

# Authorization Rules

Always verify permissions.

Do not trust frontend role validation.

Authorization must happen on backend.

---

# Input Validation

Every endpoint must validate

- required fields
- type
- enum
- string length
- ObjectId
- email
- phone
- numeric limits

Never trust client input.

---

# Database Rules

Never duplicate data unnecessarily.

Prefer references over duplication.

Use indexes for:

- email
- studentId
- hostelId
- roomId

Always use timestamps.

Avoid deeply nested documents.

---

# API Rules

Maintain REST conventions.

Correct status codes:

200

201

400

401

403

404

409

422

500

Return consistent JSON.

Example

{
    "success": true,
    "message": "",
    "data": {}
}

---

# Error Handling

Never expose

- stack trace
- database errors
- internal paths
- secrets

Return user-friendly errors.

Log internal errors separately.

---

# Security Rules

Never commit

.env

Never hardcode

- passwords
- secrets
- API keys

Always use environment variables.

Hash passwords.

Sanitize inputs.

Validate uploads.

Use HTTPS in production.

---

# Code Quality

Prefer

small functions

single responsibility

meaningful names

reusable utilities

Avoid

magic numbers

duplicate logic

deep nesting

large functions

---

# Naming Convention

Variables

camelCase

Functions

camelCase

React Components

PascalCase

Types

PascalCase

Interfaces

PascalCase

Files

Match existing project style.

---

# React Rules

Prefer

functional components

hooks

Redux Toolkit

Avoid

class components

prop drilling

duplicate state

Use reusable components.

---

# Backend Rules

Controllers

↓

Services

↓

Models

Never access database directly from routes.

Never place database queries inside frontend.

---

# Database Access

Always use Mongoose models.

Validate ObjectId.

Handle missing records.

Never assume data exists.

---

# Async Rules

Always use

async/await

Avoid nested Promise chains.

Handle every async error.

---

# Logging

Log

errors

warnings

important events

Never log

passwords

JWT

API keys

personal data

---

# Performance

Avoid

N+1 queries

duplicate API calls

unnecessary rerenders

large payloads

Optimize

database queries

pagination

indexes

memoization

lazy loading

---

# Git Rules

Never modify unrelated files.

Keep commits focused.

Do not remove comments without reason.

Preserve formatting.

---

# Dependency Rules

Never install packages without necessity.

Prefer existing dependencies.

Avoid abandoned packages.

Remove unused imports.

---

# UI Rules

Maintain existing design.

Follow current spacing.

Keep responsive layout.

Maintain accessibility.

Never break dark/light themes if present.

---

# Documentation Rules

Whenever adding

API

Module

Feature

Database model

Update documentation.

Documentation must stay synchronized with code.

---

# AI Behaviour Rules

Before generating code:

1. Read related files.
2. Understand architecture.
3. Search existing implementation.
4. Reuse existing utilities.
5. Avoid duplicate logic.
6. Follow naming conventions.
7. Preserve compatibility.
8. Validate security.
9. Consider scalability.
10. Update documentation if necessary.

Never invent APIs.

Never assume model fields.

Never remove working code without justification.

Never rewrite large modules for small fixes.

---

# Testing Checklist

Before considering work complete, verify:

✓ No TypeScript errors

✓ No ESLint errors

✓ Imports resolved

✓ Build succeeds

✓ Authentication works

✓ Authorization works

✓ Database queries validated

✓ API responses consistent

✓ No console errors

✓ No security regressions

---

# Forbidden Practices

Do NOT

❌ hardcode credentials

❌ bypass authentication

❌ bypass authorization

❌ disable validation

❌ ignore TypeScript errors

❌ duplicate code

❌ create unnecessary files

❌ break folder structure

❌ expose stack traces

❌ log sensitive data

❌ commit .env

❌ install unnecessary libraries

❌ rewrite unrelated modules

❌ ignore existing documentation

---

# Preferred Practices

Always

✔ write readable code

✔ keep functions small

✔ follow architecture

✔ write reusable code

✔ validate everything

✔ sanitize input

✔ use environment variables

✔ handle errors properly

✔ preserve modularity

✔ keep documentation updated

✔ think before generating code

---

# Definition of Done

A task is complete only if

- Feature works correctly
- Existing functionality remains intact
- Security is preserved
- Build passes
- Documentation updated
- No lint errors
- No type errors
- No unnecessary code added
- No duplicated logic introduced
- Code follows project architecture

---
