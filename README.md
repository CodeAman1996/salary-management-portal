<<<<<<< HEAD
# Salary Management Portal

Minimal salary management tool for HR managers to manage employee records and understand salary patterns across countries and roles.

## Current Scope

- Backend first implementation with Node.js, Express, TypeScript, PostgreSQL, and Prisma.
- Employee CRUD API with validation and pagination.
- Salary insights API for country-level salary stats and job-title averages.
- Seed script designed for 10,000 employees using batched inserts.
- Unit tests for the core employee and insights services.

## Local Backend Setup

```bash
cd backend
cp .env.example .env
npm install
docker compose up -d
npm run db:migrate
npm run db:seed
npm run dev
```

The API runs at:

```txt
http://localhost:4000
```

## API Endpoints

```txt
GET    /health
GET    /api/employees?page=1&pageSize=25
GET    /api/employees/:id
POST   /api/employees
PUT    /api/employees/:id
DELETE /api/employees/:id

GET    /api/insights/summary
GET    /api/insights/salary-by-country?country=India
GET    /api/insights/average-by-job-title?country=India&jobTitle=Software Engineer
```

## Testing

```bash
cd backend
npm test
```

## Deployment Plan

- Backend: Render
- Database: hosted PostgreSQL, for example Neon or Render PostgreSQL
- Frontend: to be added after backend completion

Docker is included only for local development convenience. The app uses `DATABASE_URL`, so Render can connect to any hosted PostgreSQL database.
=======
# salary-management-portal
Salary management portal to manage salaries of employees based on their department and the relevant metrics
>>>>>>> 1a006d37dcd7c7b22a76efbfee533c8fbefe2a68
