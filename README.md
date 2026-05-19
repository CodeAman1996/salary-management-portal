# Salary Management Portal

Minimal salary management tool for HR managers to manage employee records and understand salary patterns across countries and roles.

## Current Scope

- Backend first implementation with Node.js, Express, TypeScript, PostgreSQL, and Prisma.
- Employee CRUD API with validation and pagination.
- PostgreSQL runs locally through Docker Compose.
- Prisma migrations manage the database schema.
- Unit tests cover core backend behavior.

## Prerequisites

Install these before running the project:

- Node.js 20+
- npm
- Docker Desktop
- Git

## Local Backend Setup

From the project root:

```bash
cd C:\Users\Aman\salary-management-portal
docker compose up -d
```

Then set up the backend:

```bash
cd backend
npm install
copy .env.example .env
npm run db:generate
npm run db:migrate
npm run dev
```

The API runs at:

```txt
http://localhost:4000
```

Health check:

```bash
curl http://localhost:4000/health
```

## Environment Variables

The local Docker PostgreSQL database uses port `5433` on your machine.

```env
DATABASE_URL="postgresql://postgres:postgres@localhost:5433/salary_management?schema=public"
PORT=4000
CORS_ORIGIN="http://localhost:5173"
```

## Database Commands

```bash
cd backend
npm run db:generate
npm run db:migrate
```

If you need to recreate the local database from scratch:

```bash
cd C:\Users\Aman\salary-management-portal
docker compose down -v
docker compose up -d
cd backend
npm run db:migrate
```

## Test And Build

```bash
cd backend
npm test
npm run build
```

## API Endpoints

```txt
GET    /health
GET    /api/employees?page=1&pageSize=25
GET    /api/employees/:id
POST   /api/employees
PUT    /api/employees/:id
DELETE /api/employees/:id
```

## Example Employee Request

```bash
curl -X POST http://localhost:4000/api/employees ^
  -H "Content-Type: application/json" ^
  -d "{\"fullName\":\"Aman Sharma\",\"email\":\"aman.sharma@example.com\",\"jobTitle\":\"Software Engineer\",\"department\":\"Engineering\",\"country\":\"India\",\"salary\":100000,\"currency\":\"INR\"}"
```

## Deployment Plan

- Backend: Render
- Database: hosted PostgreSQL, for example Neon or Render PostgreSQL
- Frontend: to be added after backend completion

Docker is included only for local development convenience. The app uses `DATABASE_URL`, so Render can connect to any hosted PostgreSQL database.
