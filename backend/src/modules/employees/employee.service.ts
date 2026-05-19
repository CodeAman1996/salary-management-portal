import {
  createEmployeeRecord,
  deleteEmployeeRecord,
  getEmployeeById,
  listEmployeeRecords,
  updateEmployeeRecord
} from "./employee.repository.js";
import { CreateEmployeeInput, Employee, EmployeeListQuery, EmployeeListResult, UpdateEmployeeInput } from "./employee.types.js";

export async function createEmployee(input: CreateEmployeeInput): Promise<Employee> {
  return createEmployeeRecord(cleanEmployeeInput(input));
}

export async function listEmployees(query: EmployeeListQuery): Promise<EmployeeListResult> {
  return listEmployeeRecords(query);
}

export async function getEmployee(id: string): Promise<Employee> {
  const employee = await getEmployeeById(id);

  if (!employee) {
    throw new Error("Employee not found");
  }

  return employee;
}

export async function updateEmployee(id: string, input: UpdateEmployeeInput): Promise<Employee> {
  await getEmployee(id);
  return updateEmployeeRecord(id, cleanEmployeeInput(input));
}

export async function deleteEmployee(id: string): Promise<void> {
  await getEmployee(id);
  await deleteEmployeeRecord(id);
}

function cleanEmployeeInput<T extends CreateEmployeeInput | UpdateEmployeeInput>(input: T): T {
  return {
    ...input,
    fullName: input.fullName?.trim(),
    email: input.email?.trim().toLowerCase() || null,
    jobTitle: input.jobTitle?.trim(),
    department: input.department?.trim(),
    country: input.country?.trim(),
    currency: input.currency?.trim().toUpperCase()
  };
}
