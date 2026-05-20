import { Banknote } from "lucide-react";
import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { InsightCard } from "./InsightCard";

describe("InsightCard", () => {
  it("renders metric content", () => {
    render(
      <InsightCard
        title="Average salary"
        value="95,000"
        helper="Across all employees"
        icon={Banknote}
        accent="amber"
      />
    );

    expect(screen.getByText("Average salary")).toBeInTheDocument();
    expect(screen.getByText("95,000")).toBeInTheDocument();
    expect(screen.getByText("Across all employees")).toBeInTheDocument();
  });
});
