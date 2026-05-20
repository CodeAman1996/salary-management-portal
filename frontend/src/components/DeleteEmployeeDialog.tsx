import { AlertTriangle } from "lucide-react";
import { Employee } from "../types/employee";

type DeleteEmployeeDialogProps = {
  employee: Employee;
  isDeleting: boolean;
  onCancel: () => void;
  onConfirm: () => void;
};

export function DeleteEmployeeDialog({ employee, isDeleting, onCancel, onConfirm }: DeleteEmployeeDialogProps) {
  return (
    <div className="dialog-backdrop" role="presentation">
      <section className="confirm-dialog" role="dialog" aria-modal="true" aria-labelledby="delete-employee-title">
        <div className="dialog-icon">
          <AlertTriangle size={22} />
        </div>
        <div>
          <h2 id="delete-employee-title">Delete employee?</h2>
          <p>
            This will permanently remove <strong>{employee.fullName}</strong> from salary management records.
          </p>
        </div>
        <div className="dialog-actions">
          <button type="button" className="secondary-button" onClick={onCancel} disabled={isDeleting}>
            Cancel
          </button>
          <button type="button" className="danger-button" onClick={onConfirm} disabled={isDeleting}>
            {isDeleting ? "Deleting..." : "Delete employee"}
          </button>
        </div>
      </section>
    </div>
  );
}
