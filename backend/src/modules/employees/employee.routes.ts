import { NextFunction, Response, Router } from "express";
import { errorResponse, successResponse } from "../../utils/response.js";
import { validateBody, validateParams, validateQuery } from "../../utils/validate.js";
import {
  createEmployeeSchema,
  employeeIdSchema,
  employeeListQuerySchema,
  updateEmployeeSchema
} from "./employee.schema.js";
import { createEmployee, deleteEmployee, getEmployee, listEmployees, updateEmployee } from "./employee.service.js";

export const employeeRouter = Router();

employeeRouter.get("/", async (req, res, next) => {
  try {
    const query = validateQuery(employeeListQuerySchema, req.query);
    const employees = await listEmployees(query);
    successResponse(res, 200, employees);
  } catch (error) {
    next(error);
  }
});

employeeRouter.get("/:id", async (req, res, next) => {
  try {
    const { id } = validateParams(employeeIdSchema, req.params);
    const employee = await getEmployee(id);
    successResponse(res, 200, employee);
  } catch (error) {
    sendEmployeeError(error, res, next);
  }
});

employeeRouter.post("/", async (req, res, next) => {
  try {
    const input = validateBody(createEmployeeSchema, req.body);
    const employee = await createEmployee(input);
    successResponse(res, 201, employee);
  } catch (error) {
    sendEmployeeError(error, res, next);
  }
});

employeeRouter.put("/:id", async (req, res, next) => {
  try {
    const { id } = validateParams(employeeIdSchema, req.params);
    const input = validateBody(updateEmployeeSchema, req.body);
    const employee = await updateEmployee(id, input);
    successResponse(res, 200, employee);
  } catch (error) {
    sendEmployeeError(error, res, next);
  }
});

employeeRouter.delete("/:id", async (req, res, next) => {
  try {
    const { id } = validateParams(employeeIdSchema, req.params);
    await deleteEmployee(id);
    res.status(204).send();
  } catch (error) {
    sendEmployeeError(error, res, next);
  }
});

function sendEmployeeError(error: unknown, res: Response, next: NextFunction) {
  if (error instanceof Error && error.message === "Employee not found") {
    errorResponse(res, 404, error.message);
    return;
  }

  if (isUniqueEmailError(error)) {
    errorResponse(res, 409, "Employee email already exists");
    return;
  }

  next(error);
}

function isUniqueEmailError(error: unknown): boolean {
  return error instanceof Error && "code" in error && error.code === "P2002";
}
