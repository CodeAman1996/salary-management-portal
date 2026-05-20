import { useState } from "react";
import { Plus } from "lucide-react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { createEmployee, updateEmployee } from "../api/employeesApi";
import { EmployeeFilters } from "../components/EmployeeFilters";
import { EmployeeForm } from "../components/EmployeeForm";
import { EmployeeTable } from "../components/EmployeeTable";
import { Pagination } from "../components/Pagination";
import { useEmployees } from "../hooks/useEmployees";
import { Employee, EmployeeFormInput, EmployeeListFilters } from "../types/employee";

const initialFilters: EmployeeListFilters = {
  page: 1,
  pageSize: 25,
  search: "",
  country: "",
  jobTitle: ""
};

export function EmployeesPage() {
  const [filters, setFilters] = useState(initialFilters);
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [selectedEmployee, setSelectedEmployee] = useState<Employee | null>(null);
  const [formError, setFormError] = useState("");
  const { data, isError, isFetching, isLoading } = useEmployees(filters);
  const queryClient = useQueryClient();

  const createMutation = useMutation({
    mutationFn: createEmployee,
    onSuccess: handleSuccessfulSave
  });

  const updateMutation = useMutation({
    mutationFn: ({ id, input }: { id: string; input: EmployeeFormInput }) => updateEmployee(id, input),
    onSuccess: handleSuccessfulSave
  });

  function changePage(page: number) {
    setFilters((currentFilters) => ({
      ...currentFilters,
      page
    }));
  }

  function openCreateForm() {
    setSelectedEmployee(null);
    setFormError("");
    setIsFormOpen(true);
  }

  function openEditForm(employee: Employee) {
    setSelectedEmployee(employee);
    setFormError("");
    setIsFormOpen(true);
  }

  function closeForm() {
    setIsFormOpen(false);
    setSelectedEmployee(null);
    setFormError("");
  }

  function saveEmployee(input: EmployeeFormInput) {
    setFormError("");

    if (selectedEmployee) {
      updateMutation.mutate(
        { id: selectedEmployee.id, input },
        {
          onError: () => setFormError("Unable to update employee. Please review the details and try again.")
        }
      );
      return;
    }

    createMutation.mutate(input, {
      onError: () => setFormError("Unable to create employee. Please review the details and try again.")
    });
  }

  function handleSuccessfulSave() {
    closeForm();
    queryClient.invalidateQueries({ queryKey: ["employees"] });
  }

  const isSaving = createMutation.isPending || updateMutation.isPending;

  return (
    <div className="page-stack">
      <section className="page-header">
        <div>
          <h1>Employees</h1>
          <p>Manage employee records, compensation, countries, and job titles.</p>
        </div>
        <button type="button" className="primary-button" onClick={openCreateForm}>
          <Plus size={18} />
          Add employee
        </button>
      </section>

      <section className="summary-strip" aria-label="Employee list summary">
        <div className="summary-tile accent-green">
          <span>Total employees</span>
          <strong>{data?.meta.total ?? "..."}</strong>
        </div>
        <div className="summary-tile accent-blue">
          <span>Current page</span>
          <strong>{data?.meta.page ?? filters.page}</strong>
        </div>
        <div className="summary-tile accent-amber">
          <span>Rows per page</span>
          <strong>{filters.pageSize}</strong>
        </div>
      </section>

      {isFormOpen ? (
        <div className="form-shell">
          <EmployeeForm
            employee={selectedEmployee}
            isSubmitting={isSaving}
            onCancel={closeForm}
            onSubmit={saveEmployee}
          />
          {formError ? <div className="state-panel error-state">{formError}</div> : null}
        </div>
      ) : null}

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
          <EmployeeTable employees={data.data} onEdit={openEditForm} />
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
