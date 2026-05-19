import { Response } from "express";

export function successResponse<T>(res: Response, statusCode: number, data: T) {
  return res.status(statusCode).json({
    success: true,
    data
  });
}

export function errorResponse(res: Response, statusCode: number, message: string) {
  return res.status(statusCode).json({
    success: false,
    message
  });
}
