import { Prisma } from "@prisma/client";
import { prisma } from "../../db/prisma.js";
import {
  CreateEmployeeInput,
  Employee,
  EmployeeListQuery,
  EmployeeListResult,
  UpdateEmployeeInput
} from "./employee.types.js";

export async function createEmployeeRecord(input: CreateEmployeeInput): Promise<Employee> {
  const employee = await prisma.employee.create({ data: input });
  return mapEmployee(employee);
}

export async function getEmployeeById(id: string): Promise<Employee | null> {
  const employee = await prisma.employee.findUnique({ where: { id } });
  return employee ? mapEmployee(employee) : null;
}

export async function listEmployeeRecords(query: EmployeeListQuery): Promise<EmployeeListResult> {
  const where = buildEmployeeFilter(query);
  const skip = (query.page - 1) * query.pageSize;

  const [employees, total] = await prisma.$transaction([
    prisma.employee.findMany({
      where,
      skip,
      take: query.pageSize,
      orderBy: { createdAt: "desc" }
    }),
    prisma.employee.count({ where })
  ]);

  return {
    data: employees.map(mapEmployee),
    meta: {
      page: query.page,
      pageSize: query.pageSize,
      total,
      totalPages: Math.ceil(total / query.pageSize)
    }
  };
}

export async function updateEmployeeRecord(id: string, input: UpdateEmployeeInput): Promise<Employee> {
  const employee = await prisma.employee.update({
    where: { id },
    data: input
  });

  return mapEmployee(employee);
}

export async function deleteEmployeeRecord(id: string): Promise<void> {
  await prisma.employee.delete({ where: { id } });
}

function buildEmployeeFilter(query: EmployeeListQuery): Prisma.EmployeeWhereInput {
  const where: Prisma.EmployeeWhereInput = {};

  if (query.country) {
    where.country = query.country;
  }

  if (query.jobTitle) {
    where.jobTitle = query.jobTitle;
  }

  if (query.search) {
    where.OR = [
      { fullName: { contains: query.search, mode: "insensitive" } },
      { email: { contains: query.search, mode: "insensitive" } },
      { jobTitle: { contains: query.search, mode: "insensitive" } }
    ];
  }

  return where;
}

function mapEmployee(employee: {
  id: string;
  fullName: string;
  email: string | null;
  jobTitle: string;
  department: string;
  country: string;
  salary: Prisma.Decimal;
  currency: string;
  employmentType: Employee["employmentType"];
  status: Employee["status"];
  joiningDate: Date | null;
  createdAt: Date;
  updatedAt: Date;
}): Employee {
  return {
    ...employee,
    salary: Number(employee.salary)
  };
}
