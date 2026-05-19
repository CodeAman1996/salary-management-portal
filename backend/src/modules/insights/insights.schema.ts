import Joi from "joi";

export const countryInsightQuerySchema = Joi.object({
  country: Joi.string().trim().min(2).max(80).required()
});

export const jobTitleInsightQuerySchema = Joi.object({
  country: Joi.string().trim().min(2).max(80).required(),
  jobTitle: Joi.string().trim().min(2).max(100).required()
});
