import { Employee, EmployeeFormInput } from "../types/employee";

type EmployeeFormProps = {
  employee?: Employee | null;
  isSubmitting: boolean;
  onCancel: () => void;
  onSubmit: (input: EmployeeFormInput) => void;
};

const emptyForm: EmployeeFormInput = {
  fullName: "",
  email: "",
  jobTitle: "",
  department: "",
  country: "",
  salary: 0,
  currency: "USD",
  employmentType: "FULL_TIME",
  status: "ACTIVE"
};

export function EmployeeForm({ employee, isSubmitting, onCancel, onSubmit }: EmployeeFormProps) {
  const formValue = employee ? employeeToFormInput(employee) : emptyForm;

  function submitForm(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);

    onSubmit({
      fullName: String(formData.get("fullName") ?? ""),
      email: String(formData.get("email") ?? ""),
      jobTitle: String(formData.get("jobTitle") ?? ""),
      department: String(formData.get("department") ?? ""),
      country: String(formData.get("country") ?? ""),
      salary: Number(formData.get("salary") ?? 0),
      currency: String(formData.get("currency") ?? "USD"),
      employmentType: String(formData.get("employmentType") ?? "FULL_TIME") as EmployeeFormInput["employmentType"],
      status: String(formData.get("status") ?? "ACTIVE") as EmployeeFormInput["status"]
    });
  }

  return (
    <form className="form-panel" onSubmit={submitForm}>
      <div className="form-header">
        <div>
          <h2>{employee ? "Edit employee" : "Add employee"}</h2>
          <p>{employee ? "Update employee compensation and role details." : "Create a new employee record."}</p>
        </div>
      </div>

      <div className="form-grid">
        <label>
          Full name
          <input name="fullName" defaultValue={formValue.fullName} required minLength={2} />
        </label>

        <label>
          Email
          <input name="email" type="email" defaultValue={formValue.email} />
        </label>

        <label>
          Job title
          <input name="jobTitle" defaultValue={formValue.jobTitle} required minLength={2} />
        </label>

        <label>
          Department
          <input name="department" defaultValue={formValue.department} required minLength={2} />
        </label>

        <label>
          Country
          <input name="country" defaultValue={formValue.country} required minLength={2} />
        </label>

        <label>
          Salary
          <input name="salary" type="number" min={1} defaultValue={formValue.salary} required />
        </label>

        <label>
          Currency
          <input name="currency" defaultValue={formValue.currency} required minLength={3} maxLength={3} />
        </label>

        <label>
          Employment type
          <select name="employmentType" defaultValue={formValue.employmentType}>
            <option value="FULL_TIME">Full time</option>
            <option value="PART_TIME">Part time</option>
            <option value="CONTRACT">Contract</option>
          </select>
        </label>

        <label>
          Status
          <select name="status" defaultValue={formValue.status}>
            <option value="ACTIVE">Active</option>
            <option value="INACTIVE">Inactive</option>
          </select>
        </label>
      </div>

      <div className="form-actions">
        <button type="button" className="secondary-button" onClick={onCancel}>
          Cancel
        </button>
        <button type="submit" disabled={isSubmitting}>
          {isSubmitting ? "Saving..." : "Save employee"}
        </button>
      </div>
    </form>
  );
}

function employeeToFormInput(employee: Employee): EmployeeFormInput {
  return {
    fullName: employee.fullName,
    email: employee.email ?? "",
    jobTitle: employee.jobTitle,
    department: employee.department,
    country: employee.country,
    salary: employee.salary,
    currency: employee.currency,
    employmentType: employee.employmentType,
    status: employee.status
  };
}
