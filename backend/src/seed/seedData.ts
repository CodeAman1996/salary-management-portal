import { EmploymentStatus, EmploymentType } from "@prisma/client";
import { readFile } from "node:fs/promises";

export type SeedEmployee = {
  fullName: string;
  email: string;
  jobTitle: string;
  department: string;
  country: string;
  salary: number;
  currency: string;
  employmentType: EmploymentType;
  status: EmploymentStatus;
  joiningDate: Date;
};

const countries = ["India", "United States", "Germany", "United Kingdom", "Canada"];

const jobRoles = [
  { jobTitle: "Software Engineer", department: "Engineering", salary: 90000 },
  { jobTitle: "HR Manager", department: "People", salary: 85000 },
  { jobTitle: "Product Manager", department: "Product", salary: 115000 },
  { jobTitle: "Data Analyst", department: "Analytics", salary: 78000 },
  { jobTitle: "Finance Manager", department: "Finance", salary: 98000 }
];

const currencyByCountry: Record<string, string> = {
  India: "INR",
  "United States": "USD",
  Germany: "EUR",
  "United Kingdom": "GBP",
  Canada: "CAD"
};

export async function readNamesFromFile(filePath: string): Promise<string[]> {
  const fileContent = await readFile(filePath, "utf8");

  return fileContent
    .split(/\r?\n/)
    .map((name) => name.trim())
    .filter(Boolean);
}

export function createSeedEmployees(firstNames: string[], lastNames: string[], count: number, startNumber = 1): SeedEmployee[] {
  if (firstNames.length === 0 || lastNames.length === 0) {
    throw new Error("First name and last name files must contain at least one name");
  }

  const employees: SeedEmployee[] = [];

  for (let index = 0; index < count; index += 1) {
    const employeeNumber = startNumber + index;
    employees.push(createSeedEmployee(employeeNumber, firstNames, lastNames));
  }

  return employees;
}

export function createSeedEmployee(employeeNumber: number, firstNames: string[], lastNames: string[]): SeedEmployee {
  const firstName = firstNames[(employeeNumber - 1) % firstNames.length];
  const lastName = lastNames[(employeeNumber - 1) % lastNames.length];
  const country = countries[(employeeNumber - 1) % countries.length];
  const role = jobRoles[(employeeNumber - 1) % jobRoles.length];

  return {
    fullName: `${firstName} ${lastName}`,
    email: `${firstName}.${lastName}.${employeeNumber}@example.com`.toLowerCase(),
    jobTitle: role.jobTitle,
    department: role.department,
    country,
    salary: role.salary + employeeNumber * 10,
    currency: currencyByCountry[country],
    employmentType: EmploymentType.FULL_TIME,
    status: EmploymentStatus.ACTIVE,
    joiningDate: new Date(Date.UTC(2021, employeeNumber % 12, 1))
  };
}
