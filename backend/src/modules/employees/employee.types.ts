import { EmploymentStatus, EmploymentType } from "@prisma/client";

export type Employee = {
  id: string;
  fullName: string;
  email: string | null;
  jobTitle: string;
  department: string;
  country: string;
  salary: number;
  currency: string;
  employmentType: EmploymentType;
  status: EmploymentStatus;
  joiningDate: Date | null;
  createdAt: Date;
  updatedAt: Date;
};

export type CreateEmployeeInput = {
  fullName: string;
  email?: string | null;
  jobTitle: string;
  department: string;
  country: string;
  salary: number;
  currency?: string;
  employmentType?: EmploymentType;
  status?: EmploymentStatus;
  joiningDate?: Date | null;
};

export type UpdateEmployeeInput = Partial<CreateEmployeeInput>;

export type EmployeeListQuery = {
  page: number;
  pageSize: number;
  search?: string;
  country?: string;
  jobTitle?: string;
};

export type EmployeeListResult = {
  data: Employee[];
  meta: {
    page: number;
    pageSize: number;
    total: number;
    totalPages: number;
  };
};
