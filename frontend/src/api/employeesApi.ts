import { http } from "./http";
import { ApiSuccessResponse, Employee, EmployeeFormInput, EmployeeListFilters, EmployeeListResult } from "../types/employee";

export async function getEmployees(filters: EmployeeListFilters): Promise<EmployeeListResult> {
  const response = await http.get<ApiSuccessResponse<EmployeeListResult>>("/employees", {
    params: {
      page: filters.page,
      pageSize: filters.pageSize,
      search: filters.search || undefined,
      country: filters.country || undefined,
      jobTitle: filters.jobTitle || undefined
    }
  });

  return response.data.data;
}

export async function createEmployee(input: EmployeeFormInput): Promise<Employee> {
  const response = await http.post<ApiSuccessResponse<Employee>>("/employees", cleanEmployeePayload(input));
  return response.data.data;
}

export async function updateEmployee(id: string, input: EmployeeFormInput): Promise<Employee> {
  const response = await http.put<ApiSuccessResponse<Employee>>(`/employees/${id}`, cleanEmployeePayload(input));
  return response.data.data;
}

function cleanEmployeePayload(input: EmployeeFormInput) {
  return {
    ...input,
    email: input.email || null,
    salary: Number(input.salary)
  };
}
