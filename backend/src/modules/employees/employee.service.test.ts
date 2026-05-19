import { EmploymentStatus, EmploymentType } from "@prisma/client";
import { beforeEach, describe, expect, it, vi } from "vitest";
import {
  createEmployeeRecord,
  deleteEmployeeRecord,
  getEmployeeById,
  listEmployeeRecords,
  updateEmployeeRecord
} from "./employee.repository.js";
import { createEmployee, deleteEmployee, getEmployee, listEmployees, updateEmployee } from "./employee.service.js";
import { Employee } from "./employee.types.js";

vi.mock("./employee.repository.js", () => ({
  createEmployeeRecord: vi.fn(),
  deleteEmployeeRecord: vi.fn(),
  getEmployeeById: vi.fn(),
  listEmployeeRecords: vi.fn(),
  updateEmployeeRecord: vi.fn()
}));

const mockedCreateEmployeeRecord = vi.mocked(createEmployeeRecord);
const mockedDeleteEmployeeRecord = vi.mocked(deleteEmployeeRecord);
const mockedGetEmployeeById = vi.mocked(getEmployeeById);
const mockedListEmployeeRecords = vi.mocked(listEmployeeRecords);
const mockedUpdateEmployeeRecord = vi.mocked(updateEmployeeRecord);

describe("employee service", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("creates an employee with cleaned input", async () => {
    const employee = buildEmployee({
      fullName: "Aman Sharma",
      email: "aman.sharma@example.com",
      jobTitle: "Software Engineer",
      department: "Engineering",
      country: "India",
      salary: 100000,
      currency: "INR"
    });

    mockedCreateEmployeeRecord.mockResolvedValue(employee);

    const result = await createEmployee({
      fullName: " Aman Sharma ",
      email: "AMAN.SHARMA@EXAMPLE.COM ",
      jobTitle: " Software Engineer ",
      department: " Engineering ",
      country: " India ",
      salary: 100000,
      currency: " inr "
    });

    expect(mockedCreateEmployeeRecord).toHaveBeenCalledWith({
      fullName: "Aman Sharma",
      email: "aman.sharma@example.com",
      jobTitle: "Software Engineer",
      department: "Engineering",
      country: "India",
      salary: 100000,
      currency: "INR"
    });
    expect(result).toEqual(employee);
  });

  it("lists employees using pagination and filters", async () => {
    const employee = buildEmployee();
    const listResult = {
      data: [employee],
      meta: {
        page: 1,
        pageSize: 25,
        total: 1,
        totalPages: 1
      }
    };

    mockedListEmployeeRecords.mockResolvedValue(listResult);

    const result = await listEmployees({
      page: 1,
      pageSize: 25,
      country: "India",
      jobTitle: "Software Engineer",
      search: "Aman"
    });

    expect(mockedListEmployeeRecords).toHaveBeenCalledWith({
      page: 1,
      pageSize: 25,
      country: "India",
      jobTitle: "Software Engineer",
      search: "Aman"
    });
    expect(result).toEqual(listResult);
  });

  it("returns one employee by id", async () => {
    const employee = buildEmployee();
    mockedGetEmployeeById.mockResolvedValue(employee);

    const result = await getEmployee(employee.id);

    expect(mockedGetEmployeeById).toHaveBeenCalledWith(employee.id);
    expect(result).toEqual(employee);
  });

  it("throws a clear error when employee is not found", async () => {
    mockedGetEmployeeById.mockResolvedValue(null);

    await expect(getEmployee("missing-id")).rejects.toThrow("Employee not found");
  });

  it("updates an existing employee", async () => {
    const employee = buildEmployee();
    const updatedEmployee = buildEmployee({ salary: 120000 });

    mockedGetEmployeeById.mockResolvedValue(employee);
    mockedUpdateEmployeeRecord.mockResolvedValue(updatedEmployee);

    const result = await updateEmployee(employee.id, { salary: 120000 });

    expect(mockedGetEmployeeById).toHaveBeenCalledWith(employee.id);
    expect(mockedUpdateEmployeeRecord).toHaveBeenCalledWith(employee.id, { salary: 120000 });
    expect(result.salary).toBe(120000);
  });

  it("deletes an existing employee", async () => {
    const employee = buildEmployee();

    mockedGetEmployeeById.mockResolvedValue(employee);
    mockedDeleteEmployeeRecord.mockResolvedValue();

    await deleteEmployee(employee.id);

    expect(mockedGetEmployeeById).toHaveBeenCalledWith(employee.id);
    expect(mockedDeleteEmployeeRecord).toHaveBeenCalledWith(employee.id);
  });
});

function buildEmployee(overrides: Partial<Employee> = {}): Employee {
  const now = new Date("2026-01-01T00:00:00.000Z");

  return {
    id: "employee-1",
    fullName: "Aman Sharma",
    email: "aman.sharma@example.com",
    jobTitle: "Software Engineer",
    department: "Engineering",
    country: "India",
    salary: 100000,
    currency: "INR",
    employmentType: EmploymentType.FULL_TIME,
    status: EmploymentStatus.ACTIVE,
    joiningDate: null,
    createdAt: now,
    updatedAt: now,
    ...overrides
  };
}
