import { prisma } from "../../db/prisma.js";
import { CountrySalaryInsight, JobTitleSalaryInsight, SalarySummary } from "./insights.types.js";

export async function getSalarySummaryRecord(): Promise<SalarySummary> {
  const salaryStats = await prisma.employee.aggregate({
    _count: { _all: true },
    _min: { salary: true },
    _max: { salary: true },
    _avg: { salary: true }
  });

  const countries = await prisma.employee.findMany({
    distinct: ["country"],
    select: { country: true }
  });

  return {
    employeeCount: salaryStats._count._all,
    countryCount: countries.length,
    minSalary: salaryStats._min.salary ? Number(salaryStats._min.salary) : null,
    maxSalary: salaryStats._max.salary ? Number(salaryStats._max.salary) : null,
    averageSalary: salaryStats._avg.salary ? Number(salaryStats._avg.salary) : null
  };
}

export async function getCountrySalaryInsightRecord(country: string): Promise<CountrySalaryInsight> {
  const salaryStats = await prisma.employee.aggregate({
    where: { country },
    _count: { _all: true },
    _min: { salary: true },
    _max: { salary: true },
    _avg: { salary: true }
  });

  return {
    country,
    employeeCount: salaryStats._count._all,
    minSalary: salaryStats._min.salary ? Number(salaryStats._min.salary) : null,
    maxSalary: salaryStats._max.salary ? Number(salaryStats._max.salary) : null,
    averageSalary: salaryStats._avg.salary ? Number(salaryStats._avg.salary) : null
  };
}

export async function getJobTitleSalaryInsightRecord(country: string, jobTitle: string): Promise<JobTitleSalaryInsight> {
  const salaryStats = await prisma.employee.aggregate({
    where: {
      country,
      jobTitle
    },
    _count: { _all: true },
    _avg: { salary: true }
  });

  return {
    country,
    jobTitle,
    employeeCount: salaryStats._count._all,
    averageSalary: salaryStats._avg.salary ? Number(salaryStats._avg.salary) : null
  };
}
