import { useQuery } from "@tanstack/react-query";
import { getEmployees } from "../api/employeesApi";
import { EmployeeListFilters } from "../types/employee";

export function useEmployees(filters: EmployeeListFilters) {
  return useQuery({
    queryKey: ["employees", filters],
    queryFn: () => getEmployees(filters),
    placeholderData: (previousData) => previousData
  });
}
