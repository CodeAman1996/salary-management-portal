import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, expect, it, vi } from "vitest";
import { buildEmployee } from "../test/employeeFactory";
import { DeleteEmployeeDialog } from "./DeleteEmployeeDialog";

describe("DeleteEmployeeDialog", () => {
  it("shows employee name and confirms deletion", async () => {
    const user = userEvent.setup();
    const onConfirm = vi.fn();

    render(
      <DeleteEmployeeDialog
        employee={buildEmployee()}
        isDeleting={false}
        onCancel={vi.fn()}
        onConfirm={onConfirm}
      />
    );

    expect(screen.getByText("Aman Sharma")).toBeInTheDocument();

    await user.click(screen.getByRole("button", { name: /delete employee/i }));

    expect(onConfirm).toHaveBeenCalledOnce();
  });

  it("calls cancel handler", async () => {
    const user = userEvent.setup();
    const onCancel = vi.fn();

    render(
      <DeleteEmployeeDialog
        employee={buildEmployee()}
        isDeleting={false}
        onCancel={onCancel}
        onConfirm={vi.fn()}
      />
    );

    await user.click(screen.getByRole("button", { name: /cancel/i }));

    expect(onCancel).toHaveBeenCalledOnce();
  });
});
