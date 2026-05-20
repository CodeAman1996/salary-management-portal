import { Employee } from "../types/employee";

type EmployeeTableProps = {
  employees: Employee[];
};

const salaryFormatter = new Intl.NumberFormat("en-US", {
  maximumFractionDigits: 0
});

export function EmployeeTable({ employees }: EmployeeTableProps) {
  return (
    <div className="table-panel">
      <table className="data-table">
        <thead>
          <tr>
            <th>Employee</th>
            <th>Job Title</th>
            <th>Department</th>
            <th>Country</th>
            <th>Salary</th>
            <th>Status</th>
          </tr>
        </thead>
        <tbody>
          {employees.map((employee) => (
            <tr key={employee.id}>
              <td>
                <div className="employee-cell">
                  <strong>{employee.fullName}</strong>
                  <span>{employee.email ?? "No email"}</span>
                </div>
              </td>
              <td>{employee.jobTitle}</td>
              <td>{employee.department}</td>
              <td>{employee.country}</td>
              <td>
                {employee.currency} {salaryFormatter.format(employee.salary)}
              </td>
              <td>
                <span className={employee.status === "ACTIVE" ? "status active" : "status inactive"}>
                  {employee.status}
                </span>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
