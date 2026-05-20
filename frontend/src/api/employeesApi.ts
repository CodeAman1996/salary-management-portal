import { http } from "./http";
import { ApiSuccessResponse, EmployeeListFilters, EmployeeListResult } from "../types/employee";

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
