import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, expect, it, vi } from "vitest";
import { Pagination } from "./Pagination";

describe("Pagination", () => {
  it("moves to previous and next pages", async () => {
    const user = userEvent.setup();
    const onPageChange = vi.fn();

    render(<Pagination page={2} totalPages={4} total={80} onPageChange={onPageChange} />);

    await user.click(screen.getByRole("button", { name: /previous/i }));
    await user.click(screen.getByRole("button", { name: /next/i }));

    expect(onPageChange).toHaveBeenNthCalledWith(1, 1);
    expect(onPageChange).toHaveBeenNthCalledWith(2, 3);
  });

  it("disables previous on first page", () => {
    render(<Pagination page={1} totalPages={4} total={80} onPageChange={vi.fn()} />);

    expect(screen.getByRole("button", { name: /previous/i })).toBeDisabled();
  });
});
