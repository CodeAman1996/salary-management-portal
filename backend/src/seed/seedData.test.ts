import { describe, expect, it } from "vitest";
import { createSeedEmployee, createSeedEmployees } from "./seedData.js";

describe("seed data generation", () => {
  const firstNames = ["Aman", "Priya"];
  const lastNames = ["Sharma", "Patel"];

  it("creates one predictable employee", () => {
    const employee = createSeedEmployee(1, firstNames, lastNames);

    expect(employee).toMatchObject({
      fullName: "Aman Sharma",
      email: "aman.sharma.1@example.com",
      jobTitle: "Software Engineer",
      department: "Engineering",
      country: "India",
      salary: 90010,
      currency: "INR"
    });
  });

  it("creates the requested number of employees", () => {
    const employees = createSeedEmployees(firstNames, lastNames, 3);

    expect(employees).toHaveLength(3);
  });

  it("cycles through names, countries, and job roles", () => {
    const employees = createSeedEmployees(firstNames, lastNames, 3);

    expect(employees.map((employee) => employee.fullName)).toEqual(["Aman Sharma", "Priya Patel", "Aman Sharma"]);
    expect(employees.map((employee) => employee.country)).toEqual(["India", "United States", "Germany"]);
    expect(employees.map((employee) => employee.jobTitle)).toEqual([
      "Software Engineer",
      "HR Manager",
      "Product Manager"
    ]);
  });

  it("supports later batches with unique employee numbers", () => {
    const employees = createSeedEmployees(firstNames, lastNames, 2, 1001);

    expect(employees.map((employee) => employee.email)).toEqual([
      "aman.sharma.1001@example.com",
      "priya.patel.1002@example.com"
    ]);
  });

  it("throws a clear error when names are missing", () => {
    expect(() => createSeedEmployees([], lastNames, 1)).toThrow("First name and last name files");
    expect(() => createSeedEmployees(firstNames, [], 1)).toThrow("First name and last name files");
  });
});
