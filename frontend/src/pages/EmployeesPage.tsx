import { useState } from "react";
import { EmployeeFilters } from "../components/EmployeeFilters";
import { EmployeeTable } from "../components/EmployeeTable";
import { Pagination } from "../components/Pagination";
import { useEmployees } from "../hooks/useEmployees";
import { EmployeeListFilters } from "../types/employee";

const initialFilters: EmployeeListFilters = {
  page: 1,
  pageSize: 25,
  search: "",
  country: "",
  jobTitle: ""
};

export function EmployeesPage() {
  const [filters, setFilters] = useState(initialFilters);
  const { data, isError, isFetching, isLoading } = useEmployees(filters);

  function changePage(page: number) {
    setFilters((currentFilters) => ({
      ...currentFilters,
      page
    }));
  }

  return (
    <div className="page-stack">
      <section className="page-header">
        <div>
          <h1>Employees</h1>
          <p>Manage employee records, compensation, countries, and job titles.</p>
        </div>
      </section>

      <EmployeeFilters filters={filters} onChange={setFilters} />

      {isLoading ? <div className="state-panel">Loading employees...</div> : null}

      {isError ? (
        <div className="state-panel error-state">
          Unable to load employees. Check that the backend API is running on port 4000.
        </div>
      ) : null}

      {data && data.data.length === 0 ? <div className="state-panel">No employees found.</div> : null}

      {data && data.data.length > 0 ? (
        <>
          {isFetching ? <div className="subtle-status">Refreshing employee data...</div> : null}
          <EmployeeTable employees={data.data} />
          <Pagination
            page={data.meta.page}
            totalPages={data.meta.totalPages}
            total={data.meta.total}
            onPageChange={changePage}
          />
        </>
      ) : null}
    </div>
  );
}
