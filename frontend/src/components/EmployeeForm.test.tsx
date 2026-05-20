import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, expect, it, vi } from "vitest";
import { buildEmployee } from "../test/employeeFactory";
import { EmployeeForm } from "./EmployeeForm";

describe("EmployeeForm", () => {
  it("submits employee details", async () => {
    const user = userEvent.setup();
    const onSubmit = vi.fn();

    render(<EmployeeForm isSubmitting={false} onCancel={vi.fn()} onSubmit={onSubmit} />);

    await user.type(screen.getByLabelText(/full name/i), "Priya Patel");
    await user.type(screen.getByLabelText(/email/i), "priya@example.com");
    await user.type(screen.getByLabelText(/job title/i), "HR Manager");
    await user.type(screen.getByLabelText(/department/i), "People");
    await user.type(screen.getByLabelText(/country/i), "India");
    await user.clear(screen.getByLabelText(/salary/i));
    await user.type(screen.getByLabelText(/salary/i), "90000");
    await user.clear(screen.getByLabelText(/currency/i));
    await user.type(screen.getByLabelText(/currency/i), "INR");
    await user.click(screen.getByRole("button", { name: /save employee/i }));

    expect(onSubmit).toHaveBeenCalledWith({
      fullName: "Priya Patel",
      email: "priya@example.com",
      jobTitle: "HR Manager",
      department: "People",
      country: "India",
      salary: 90000,
      currency: "INR",
      employmentType: "FULL_TIME",
      status: "ACTIVE"
    });
  });

  it("prefills values when editing an employee", () => {
    render(<EmployeeForm employee={buildEmployee()} isSubmitting={false} onCancel={vi.fn()} onSubmit={vi.fn()} />);

    expect(screen.getByRole("heading", { name: /edit employee/i })).toBeInTheDocument();
    expect(screen.getByLabelText(/full name/i)).toHaveValue("Aman Sharma");
    expect(screen.getByLabelText(/salary/i)).toHaveValue(100000);
  });

  it("calls cancel handler", async () => {
    const user = userEvent.setup();
    const onCancel = vi.fn();

    render(<EmployeeForm isSubmitting={false} onCancel={onCancel} onSubmit={vi.fn()} />);

    await user.click(screen.getByRole("button", { name: /cancel/i }));

    expect(onCancel).toHaveBeenCalledOnce();
  });
});
