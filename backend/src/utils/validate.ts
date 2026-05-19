import Joi from "joi";

export function validateBody<T>(schema: Joi.ObjectSchema<T>, body: unknown): T {
  return validate(schema, body);
}

export function validateQuery<T>(schema: Joi.ObjectSchema<T>, query: unknown): T {
  return validate(schema, query);
}

export function validateParams<T>(schema: Joi.ObjectSchema<T>, params: unknown): T {
  return validate(schema, params);
}

function validate<T>(schema: Joi.ObjectSchema<T>, value: unknown): T {
  const { value: validatedValue, error } = schema.validate(value, {
    abortEarly: false,
    convert: true,
    stripUnknown: true
  });

  if (error) {
    throw new Error(error.details.map((detail) => detail.message).join(", "));
  }

  return validatedValue;
}
