import { Router } from "express";
import { successResponse } from "../../utils/response.js";
import { validateQuery } from "../../utils/validate.js";
import { countryInsightQuerySchema, jobTitleInsightQuerySchema } from "./insights.schema.js";
import { getCountrySalaryInsight, getJobTitleSalaryInsight, getSalarySummary } from "./insights.service.js";

export const insightsRouter = Router();

insightsRouter.get("/summary", async (_req, res, next) => {
  try {
    const summary = await getSalarySummary();
    successResponse(res, 200, summary);
  } catch (error) {
    next(error);
  }
});

insightsRouter.get("/salary-by-country", async (req, res, next) => {
  try {
    const { country } = validateQuery(countryInsightQuerySchema, req.query);
    const insight = await getCountrySalaryInsight(country);
    successResponse(res, 200, insight);
  } catch (error) {
    next(error);
  }
});

insightsRouter.get("/average-by-job-title", async (req, res, next) => {
  try {
    const { country, jobTitle } = validateQuery(jobTitleInsightQuerySchema, req.query);
    const insight = await getJobTitleSalaryInsight(country, jobTitle);
    successResponse(res, 200, insight);
  } catch (error) {
    next(error);
  }
});
