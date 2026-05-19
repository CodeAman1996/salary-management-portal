import { EmploymentStatus, EmploymentType } from "@prisma/client";
import Joi from "joi";

export const createEmployeeSchema = Joi.object({
  fullName: Joi.string().trim().min(2).max(120).required(),
  email: Joi.string().trim().email().allow(null).optional(),
  jobTitle: Joi.string().trim().min(2).max(100).required(),
  department: Joi.string().trim().min(2).max(100).required(),
  country: Joi.string().trim().min(2).max(80).required(),
  salary: Joi.number().positive().max(999999999.99).required(),
  currency: Joi.string().trim().length(3).uppercase().default("USD"),
  employmentType: Joi.string()
    .valid(...Object.values(EmploymentType))
    .default(EmploymentType.FULL_TIME),
  status: Joi.string()
    .valid(...Object.values(EmploymentStatus))
    .default(EmploymentStatus.ACTIVE),
  joiningDate: Joi.date().allow(null).optional()
});

export const updateEmployeeSchema = createEmployeeSchema
  .fork(["fullName", "jobTitle", "department", "country", "salary"], (schema) => schema.optional())
  .min(1);

export const employeeListQuerySchema = Joi.object({
  page: Joi.number().integer().positive().default(1),
  pageSize: Joi.number().integer().positive().max(100).default(25),
  search: Joi.string().trim().optional(),
  country: Joi.string().trim().optional(),
  jobTitle: Joi.string().trim().optional()
});

export const employeeIdSchema = Joi.object({
  id: Joi.string().uuid().required()
});
