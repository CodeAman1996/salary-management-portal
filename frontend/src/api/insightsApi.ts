import { http } from "./http";
import {
  ApiSuccessResponse,
  CountrySalaryInsight,
  JobTitleSalaryInsight,
  SalarySummary
} from "../types/insights";

export async function getSalarySummary(): Promise<SalarySummary> {
  const response = await http.get<ApiSuccessResponse<SalarySummary>>("/insights/summary");
  return response.data.data;
}

export async function getCountrySalaryInsight(country: string): Promise<CountrySalaryInsight> {
  const response = await http.get<ApiSuccessResponse<CountrySalaryInsight>>("/insights/salary-by-country", {
    params: { country }
  });

  return response.data.data;
}

export async function getJobTitleSalaryInsight(country: string, jobTitle: string): Promise<JobTitleSalaryInsight> {
  const response = await http.get<ApiSuccessResponse<JobTitleSalaryInsight>>("/insights/average-by-job-title", {
    params: { country, jobTitle }
  });

  return response.data.data;
}
