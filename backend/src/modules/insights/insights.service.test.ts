import { beforeEach, describe, expect, it, vi } from "vitest";
import {
  getCountrySalaryInsightRecord,
  getJobTitleSalaryInsightRecord,
  getSalarySummaryRecord
} from "./insights.repository.js";
import { getCountrySalaryInsight, getJobTitleSalaryInsight, getSalarySummary } from "./insights.service.js";

vi.mock("./insights.repository.js", () => ({
  getCountrySalaryInsightRecord: vi.fn(),
  getJobTitleSalaryInsightRecord: vi.fn(),
  getSalarySummaryRecord: vi.fn()
}));

const mockedGetSalarySummaryRecord = vi.mocked(getSalarySummaryRecord);
const mockedGetCountrySalaryInsightRecord = vi.mocked(getCountrySalaryInsightRecord);
const mockedGetJobTitleSalaryInsightRecord = vi.mocked(getJobTitleSalaryInsightRecord);

describe("insights service", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("returns overall salary summary", async () => {
    const summary = {
      employeeCount: 10000,
      countryCount: 5,
      minSalary: 40000,
      maxSalary: 200000,
      averageSalary: 95000
    };

    mockedGetSalarySummaryRecord.mockResolvedValue(summary);

    const result = await getSalarySummary();

    expect(mockedGetSalarySummaryRecord).toHaveBeenCalledOnce();
    expect(result).toEqual(summary);
  });

  it("returns salary insight for a country", async () => {
    const insight = {
      country: "India",
      employeeCount: 1200,
      minSalary: 30000,
      maxSalary: 180000,
      averageSalary: 85000
    };

    mockedGetCountrySalaryInsightRecord.mockResolvedValue(insight);

    const result = await getCountrySalaryInsight(" India ");

    expect(mockedGetCountrySalaryInsightRecord).toHaveBeenCalledWith("India");
    expect(result).toEqual(insight);
  });

  it("returns average salary for a job title in a country", async () => {
    const insight = {
      country: "India",
      jobTitle: "Software Engineer",
      employeeCount: 300,
      averageSalary: 110000
    };

    mockedGetJobTitleSalaryInsightRecord.mockResolvedValue(insight);

    const result = await getJobTitleSalaryInsight(" India ", " Software Engineer ");

    expect(mockedGetJobTitleSalaryInsightRecord).toHaveBeenCalledWith("India", "Software Engineer");
    expect(result).toEqual(insight);
  });

  it("allows null salary values when no employees match", async () => {
    const insight = {
      country: "Brazil",
      employeeCount: 0,
      minSalary: null,
      maxSalary: null,
      averageSalary: null
    };

    mockedGetCountrySalaryInsightRecord.mockResolvedValue(insight);

    const result = await getCountrySalaryInsight("Brazil");

    expect(result.employeeCount).toBe(0);
    expect(result.averageSalary).toBeNull();
  });
});
