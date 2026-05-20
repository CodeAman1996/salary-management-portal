export type Employee = {
  id: string;
  fullName: string;
  email: string | null;
  jobTitle: string;
  department: string;
  country: string;
  salary: number;
  currency: string;
  employmentType: "FULL_TIME" | "PART_TIME" | "CONTRACT";
  status: "ACTIVE" | "INACTIVE";
  joiningDate: string | null;
  createdAt: string;
  updatedAt: string;
};

export type EmployeeListFilters = {
  page: number;
  pageSize: number;
  search: string;
  country: string;
  jobTitle: string;
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

export type ApiSuccessResponse<T> = {
  success: true;
  data: T;
};

export type EmployeeFormInput = {
  fullName: string;
  email: string;
  jobTitle: string;
  department: string;
  country: string;
  salary: number;
  currency: string;
  employmentType: Employee["employmentType"];
  status: Employee["status"];
};
