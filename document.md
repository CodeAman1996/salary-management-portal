# Salary Management Portal - Project Document

## Overview

Salary Management Portal is an end-to-end HR tool for managing employee salary records and reviewing compensation insights. It supports employee CRUD operations, seeded data for 10,000 employees, and salary insight dashboards by country and job title.

## How Codex Was Used

Codex was used as an AI pair-programming assistant throughout the development process.

- Planned the backend and frontend architecture.
- Built the backend incrementally with Prisma, Express, PostgreSQL, and Joi validation.
- Used focused backend tests to validate employee and salary insight business logic.
- Built frontend capabilities incrementally across employee management, salary insights, tests, and UI polish.
- Helped generate documentation, setup instructions, and OpenAPI/Swagger-style docs.

Each AI-generated change was verified with build and test commands before being treated as complete.

## Product Scope

The portal is designed for an HR manager who needs to:

- Add, view, update, and delete employees.
- Search and filter employees by name, email, job title, and country.
- Work with a large employee dataset using pagination.
- Review salary insights for countries and roles.

## Backend Design

The backend is built with:

- Node.js
- Express
- TypeScript
- PostgreSQL
- Prisma ORM
- Joi for runtime request validation
- Vitest for tests

Backend structure:

```txt
backend/src
  config/       environment validation
  db/           Prisma client
  modules/
    employees/ employee CRUD logic
    insights/  salary aggregation logic
  seed/         employee seed generation
  utils/        response and validation helpers
```

### Backend Flow

```txt
Route -> Joi validation -> Service -> Repository -> Prisma -> PostgreSQL
```

The repository layer contains database queries. The service layer keeps business behavior simple and testable. Routes handle HTTP concerns.

## Frontend Design

The frontend is built with:

- React
- Vite
- TypeScript
- React Router
- TanStack Query
- Axios
- Lucide React icons
- Vitest and React Testing Library

Frontend structure:

```txt
frontend/src
  api/          API clients
  components/   reusable UI components
  hooks/        React Query hooks
  pages/        Employees and Insights screens
  types/        TypeScript types
  test/         test helpers
```

### Frontend Flow

```txt
Page -> Hook -> API client -> Backend API
```

TanStack Query manages loading, error, caching, and refetching after create, update, and delete actions.

## Database Design

The main table is `Employee`.

Important fields:

- fullName
- email
- jobTitle
- department
- country
- salary
- currency
- employmentType
- status
- joiningDate

Indexes are added for:

- country
- jobTitle
- country + jobTitle
- department

These indexes support the filtering and salary insight queries.

## Seed Data

The seed script reads:

```txt
backend/src/seed/first_names.txt
backend/src/seed/last_names.txt
```

It generates deterministic employees and inserts them in batches using Prisma `createMany`.

Default behavior:

```txt
10,000 employees
1,000 employees per batch
```

The seed generation logic is separated from Prisma so it can be tested without a database.

## Run Sequence

### 1. Start PostgreSQL

From project root:

```powershell
docker compose up -d
```

PostgreSQL runs locally on:

```txt
localhost:5433
```

### 2. Configure Backend Environment

From `backend/`:

```powershell
copy .env.example .env
```

Expected local value:

```env
DATABASE_URL="postgresql://postgres:postgres@localhost:5433/salary_management?schema=public"
PORT=4000
CORS_ORIGIN="http://localhost:5173"
```

### 3. Install Backend Dependencies

```powershell
cd backend
npm install
```

### 4. Generate Prisma Client

```powershell
npm run db:generate
```

### 5. Run Database Migration

```powershell
npm run db:migrate
```

### 6. Seed Employees

```powershell
npm run db:seed
```

For quick testing with fewer employees:

```powershell
$env:SEED_EMPLOYEE_COUNT=20
npm run db:seed
```

### 7. Run Backend

```powershell
npm run dev
```

Backend URL:

```txt
http://localhost:4000
```

Health check:

```powershell
curl http://localhost:4000/health
```

### 8. Install Frontend Dependencies

Open a new terminal:

```powershell
cd frontend
npm install
```

### 9. Run Frontend

```powershell
npm run dev
```

Frontend URL:

```txt
http://localhost:5173
```

### 10. Test Employee Module

Open:

```txt
http://localhost:5173
```

Verify:

- Employee table loads.
- Search works.
- Country and job title filters work.
- Pagination works.
- Add employee works.
- Edit employee works.
- Delete employee works with confirmation.

### 11. Test Insights Module

Open:

```txt
http://localhost:5173/insights
```

Verify:

- Summary cards load.
- Country salary stats load.
- Job title average salary loads.
- Changing country/job title updates metrics.

## Test Commands

Backend:

```powershell
cd backend
npm test
npm run build
```

Frontend:

```powershell
cd frontend
npm test
npm run build
```

## Swagger / API Documentation

Backend OpenAPI documentation:

```txt
docs/backend-openapi.yaml
```

This documents:

- Employee CRUD APIs
- Salary insights APIs
- Request bodies
- Query parameters
- Response shapes

Frontend route documentation:

```txt
docs/frontend-openapi.yaml
```

This documents:

- `/` Employees screen
- `/insights` Salary Insights screen
- Purpose of each UI route

You can open either YAML file in Swagger Editor:

```txt
https://editor.swagger.io/
```

## Deployment Plan

Backend:

- Deploy Node service on Render.
- Use hosted PostgreSQL such as Render PostgreSQL or Neon.
- Set `DATABASE_URL`, `PORT`, and `CORS_ORIGIN`.
- Use `npm run db:deploy` for production migrations.

Frontend:

- Deploy React app on Vercel or Netlify.
- Set `VITE_API_BASE_URL` to `https://salary-management-portal-production.up.railway.app/api`.

## Tradeoffs

- Joi is used at API boundaries because TypeScript does not validate runtime request payloads.
- Prisma is used for type-safe database access and migrations.
- Docker is used only for local PostgreSQL convenience.
- Seed data is deterministic so engineers can reproduce test data.
- Frontend tests focus on user-visible component behavior instead of testing implementation details.
