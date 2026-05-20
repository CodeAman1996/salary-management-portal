import { Employee } from "../types/employee";

export function buildEmployee(overrides: Partial<Employee> = {}): Employee {
  return {
    id: "employee-1",
    fullName: "Aman Sharma",
    email: "aman.sharma@example.com",
    jobTitle: "Software Engineer",
    department: "Engineering",
    country: "India",
    salary: 100000,
    currency: "INR",
    employmentType: "FULL_TIME",
    status: "ACTIVE",
    joiningDate: null,
    createdAt: "2026-01-01T00:00:00.000Z",
    updatedAt: "2026-01-01T00:00:00.000Z",
    ...overrides
  };
}
