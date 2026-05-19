import cors from "cors";
import express from "express";
import helmet from "helmet";
import { env } from "./config/env.js";
import { employeeRouter } from "./modules/employees/employee.routes.js";
import { errorResponse, successResponse } from "./utils/response.js";

export function createApp() {
  const app = express();

  app.use(helmet());
  app.use(cors({ origin: env.CORS_ORIGIN }));
  app.use(express.json());

  app.get("/health", (_req, res) => {
    successResponse(res, 200, { status: "ok" });
  });

  app.use("/api/employees", employeeRouter);

  app.use((_req, res) => {
    errorResponse(res, 404, "Route not found");
  });

  app.use((error: unknown, _req: express.Request, res: express.Response, _next: express.NextFunction) => {
    if (error instanceof Error) {
      errorResponse(res, 400, error.message);
      return;
    }

    errorResponse(res, 500, "Unexpected server error");
  });

  return app;
}
