export type SalarySummary = {
  employeeCount: number;
  countryCount: number;
  minSalary: number | null;
  maxSalary: number | null;
  averageSalary: number | null;
};

export type CountrySalaryInsight = {
  country: string;
  employeeCount: number;
  minSalary: number | null;
  maxSalary: number | null;
  averageSalary: number | null;
};

export type JobTitleSalaryInsight = {
  country: string;
  jobTitle: string;
  employeeCount: number;
  averageSalary: number | null;
};

export type ApiSuccessResponse<T> = {
  success: true;
  data: T;
};
