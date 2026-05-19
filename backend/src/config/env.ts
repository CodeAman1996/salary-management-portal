import "dotenv/config";
import Joi from "joi";

type AppEnv = {
  DATABASE_URL: string;
  PORT: number;
  CORS_ORIGIN: string;
};

const envSchema = Joi.object<AppEnv>({
  DATABASE_URL: Joi.string().uri().required(),
  PORT: Joi.number().integer().positive().default(4000),
  CORS_ORIGIN: Joi.string().default("http://localhost:5173")
}).unknown(true);

const { value, error } = envSchema.validate(process.env, {
  abortEarly: false,
  convert: true
});

if (error) {
  throw new Error(`Invalid environment configuration: ${error.message}`);
}

export const env: AppEnv = {
  DATABASE_URL: value.DATABASE_URL,
  PORT: value.PORT,
  CORS_ORIGIN: value.CORS_ORIGIN
};
