import {
  getCountrySalaryInsightRecord,
  getJobTitleSalaryInsightRecord,
  getSalarySummaryRecord
} from "./insights.repository.js";
import { CountrySalaryInsight, JobTitleSalaryInsight, SalarySummary } from "./insights.types.js";

export async function getSalarySummary(): Promise<SalarySummary> {
  return getSalarySummaryRecord();
}

export async function getCountrySalaryInsight(country: string): Promise<CountrySalaryInsight> {
  return getCountrySalaryInsightRecord(country.trim());
}

export async function getJobTitleSalaryInsight(country: string, jobTitle: string): Promise<JobTitleSalaryInsight> {
  return getJobTitleSalaryInsightRecord(country.trim(), jobTitle.trim());
}
