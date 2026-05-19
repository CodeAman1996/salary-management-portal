import cors from "cors";
import express from "express";
import helmet from "helmet";
import { env } from "./config/env.js";

export function createApp() {
  const app = express();

  app.use(helmet());
  app.use(cors({ origin: env.CORS_ORIGIN }));
  app.use(express.json());

  app.get("/health", (_req, res) => {
    res.status(200).json({ status: "ok" });
  });

  app.use((_req, res) => {
    res.status(404).json({ message: "Route not found" });
  });

  app.use((error: unknown, _req: express.Request, res: express.Response, _next: express.NextFunction) => {
    if (error instanceof Error) {
      res.status(400).json({ message: error.message });
      return;
    }

    res.status(500).json({ message: "Unexpected server error" });
  });

  return app;
}
