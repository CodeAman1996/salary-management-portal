import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, expect, it, vi } from "vitest";
import { buildEmployee } from "../test/employeeFactory";
import { EmployeeTable } from "./EmployeeTable";

describe("EmployeeTable", () => {
  it("renders employee rows", () => {
    render(<EmployeeTable employees={[buildEmployee()]} onEdit={vi.fn()} onDelete={vi.fn()} />);

    expect(screen.getByText("Aman Sharma")).toBeInTheDocument();
    expect(screen.getByText("Software Engineer")).toBeInTheDocument();
    expect(screen.getByText("INR 100,000")).toBeInTheDocument();
  });

  it("calls edit and delete handlers", async () => {
    const user = userEvent.setup();
    const employee = buildEmployee();
    const onEdit = vi.fn();
    const onDelete = vi.fn();

    render(<EmployeeTable employees={[employee]} onEdit={onEdit} onDelete={onDelete} />);

    await user.click(screen.getByRole("button", { name: /edit aman sharma/i }));
    await user.click(screen.getByRole("button", { name: /delete aman sharma/i }));

    expect(onEdit).toHaveBeenCalledWith(employee);
    expect(onDelete).toHaveBeenCalledWith(employee);
  });
});
