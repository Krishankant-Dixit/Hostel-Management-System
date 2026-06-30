# HMS Backend — Roommates & Room Facilities API

Express + Mongoose + MongoDB backend for hostel room management with facilities, roommates, images, and issue reporting.

## Features

- JWT authentication (student, admin, staff roles)
- Room management with facilities (Study Table, Wardrobe, Attached Washroom, Fan)
- Roommate assignments
- Room image uploads (Multer)
- Issue reporting with status tracking and attachments
- Zod request validation
- MongoDB migrations via migrate-mongo (indexes)
- Seed script with demo data

## Prerequisites

- Node.js 18+
- MongoDB 6+ (local or Atlas)

## Quick Start

```bash
cd backend
npm install
cp .env.example .env
# Edit MONGODB_URI and JWT_SECRET in .env

npm run migrate:up
npm run seed
npm run dev
```

API runs at: **http://localhost:5000**

## Environment Variables

| Variable | Description | Default |
|----------|-------------|---------|
| `NODE_ENV` | Environment | `development` |
| `PORT` | Server port | `5000` |
| `MONGODB_URI` | MongoDB connection string | `mongodb://localhost:27017/hms` |
| `JWT_SECRET` | JWT signing secret (min 32 chars) | — |
| `JWT_EXPIRES_IN` | Token expiry | `7d` |
| `CORS_ORIGIN` | Allowed frontend origin | `http://localhost:5173` |
| `UPLOAD_DIR` | File upload directory | `./uploads` |
| `MAX_FILE_SIZE` | Max upload size in bytes | `5242880` (5 MB) |

## Seed Credentials

| Role | Email | Password |
|------|-------|----------|
| Admin | admin@hms.local | Password123! |
| Student | john@student.local | Password123! |
| Student | jane@student.local | Password123! |

## Scripts

| Command | Description |
|---------|-------------|
| `npm run dev` | Start dev server with hot reload |
| `npm run build` | Compile TypeScript |
| `npm start` | Run production build |
| `npm run seed` | Seed database with demo data |
| `npm run migrate:up` | Run pending migrations |
| `npm run migrate:down` | Rollback last migration |
| `npm run migrate:status` | Check migration status |
| `npm run migrate:create` | Create new migration file |

## API Routes

### Auth
| Method | Endpoint | Auth | Description |
|--------|----------|------|-------------|
| POST | `/api/auth/register` | Public | Register student |
| POST | `/api/auth/login` | Public | Login |
| GET | `/api/auth/me` | User | Profile + assigned room |

### Buildings & Rooms
| Method | Endpoint | Auth | Description |
|--------|----------|------|-------------|
| GET | `/api/rooms/buildings/list` | User | List buildings |
| POST | `/api/rooms/buildings` | Admin | Create building |
| GET | `/api/rooms` | User | List rooms (filterable) |
| GET | `/api/rooms/:id` | User | Room detail + facilities + images + roommates |
| GET | `/api/rooms/:id/facilities` | User | Facility flags only |
| POST | `/api/rooms` | Admin | Create room |
| PATCH | `/api/rooms/:id` | Admin | Update room/facilities |

### Roommates
| Method | Endpoint | Auth | Description |
|--------|----------|------|-------------|
| GET | `/api/me/roommates` | User | Current user's roommates |
| GET | `/api/rooms/:id/roommates` | User | Roommates in a room |
| POST | `/api/rooms/:id/roommates/assign` | Admin | Assign student |
| POST | `/api/rooms/:id/roommates/unassign` | Admin | Remove student |

### Room Images
| Method | Endpoint | Auth | Description |
|--------|----------|------|-------------|
| GET | `/api/rooms/:id/images` | User | List room images |
| POST | `/api/rooms/:id/images` | Admin | Upload image (multipart `image`) |
| PATCH | `/api/rooms/:id/images/:imageId` | Admin | Update caption/primary |
| DELETE | `/api/rooms/:id/images/:imageId` | Admin | Delete image |

### Issues
| Method | Endpoint | Auth | Description |
|--------|----------|------|-------------|
| GET | `/api/issues/categories` | User | List issue categories |
| POST | `/api/rooms/:id/issues` | Student/Admin | Report issue |
| GET | `/api/rooms/:id/issues` | User | Issues for a room |
| GET | `/api/issues` | Admin/Staff | All issues (filterable) |
| GET | `/api/issues/:issueId` | User | Issue detail + logs |
| PATCH | `/api/issues/:issueId` | Admin/Staff | Update status/assignee |
| POST | `/api/issues/:issueId/attachments` | User | Upload attachment (multipart `file`) |

## Example Requests

### Login
```bash
curl -X POST http://localhost:5000/api/auth/login \
  -H "Content-Type: application/json" \
  -d "{\"email\":\"john@student.local\",\"password\":\"Password123!\"}"
```

### Get my room + roommates
```bash
curl http://localhost:5000/api/auth/me \
  -H "Authorization: Bearer YOUR_TOKEN"
```

### Report an issue
```bash
curl -X POST http://localhost:5000/api/rooms/ROOM_ID/issues \
  -H "Authorization: Bearer YOUR_TOKEN" \
  -H "Content-Type: application/json" \
  -d "{\"title\":\"Fan not working\",\"description\":\"Ceiling fan stopped since last night\",\"facilityType\":\"fan\",\"priority\":\"high\"}"
```

## Project Structure

```
backend/
├── migrations/          # migrate-mongo index migrations
├── scripts/seed.ts      # Database seed script
├── src/
│   ├── config/          # env + db connection
│   ├── models/          # Mongoose schemas
│   ├── modules/         # Feature routes/controllers/services
│   ├── middleware/      # auth, validation, errors
│   └── utils/           # helpers, upload config
├── uploads/             # Uploaded files
├── .env.example
└── README.md
```

## License

MIT
