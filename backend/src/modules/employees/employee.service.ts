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
  const cleanedInput = { ...input };

  if (input.fullName) {
    cleanedInput.fullName = input.fullName.trim();
  }

  if (input.email !== undefined) {
    cleanedInput.email = input.email ? input.email.trim().toLowerCase() : null;
  }

  if (input.jobTitle) {
    cleanedInput.jobTitle = input.jobTitle.trim();
  }

  if (input.department) {
    cleanedInput.department = input.department.trim();
  }

  if (input.country) {
    cleanedInput.country = input.country.trim();
  }

  if (input.currency) {
    cleanedInput.currency = input.currency.trim().toUpperCase();
  }

  return cleanedInput;
}
