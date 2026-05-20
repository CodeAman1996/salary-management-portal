import { useQuery } from "@tanstack/react-query";
import { getCountrySalaryInsight, getJobTitleSalaryInsight, getSalarySummary } from "../api/insightsApi";

export function useSalarySummary() {
  return useQuery({
    queryKey: ["insights", "summary"],
    queryFn: getSalarySummary
  });
}

export function useCountrySalaryInsight(country: string) {
  return useQuery({
    queryKey: ["insights", "country", country],
    queryFn: () => getCountrySalaryInsight(country),
    enabled: country.trim().length >= 2
  });
}

export function useJobTitleSalaryInsight(country: string, jobTitle: string) {
  return useQuery({
    queryKey: ["insights", "job-title", country, jobTitle],
    queryFn: () => getJobTitleSalaryInsight(country, jobTitle),
    enabled: country.trim().length >= 2 && jobTitle.trim().length >= 2
  });
}
