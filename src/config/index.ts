import * as dotenv from "dotenv";
import * as joi from "joi";

process.env.ENV_PATH
  ? dotenv.config({ path: process.env.ENV_PATH })
  : dotenv.config();

const schema = joi
  .object({
    PORT: joi.number().port().default(2024),
    NODE_ENV: joi
      .string()
      .required()
      .allow("production", "development", "test")
      .default("development"),

    TOKEN_SECRET: joi.string().required().default("my_favorite-secret-token"),

    // database configs
    DATABASE_URL: joi.string().required(),
    DB_LOGGING: joi
      .boolean()
      .truthy("TRUE")
      .truthy("true")
      .falsy("FALSE")
      .falsy("false")
      .default(false),

    // test db configs
    TEST_DATABASE_URI: joi.string(),
  })
  .unknown()
  .required();

const { error, value: envVars } = schema.validate(process.env);
if (error) {
  throw new Error(`Config validation error: ${error.message}`);
}

export default {
  PORT: envVars.PORT,
  NODE_ENV: envVars.NODE_ENV,
  TOKEN_SECRET: envVars.TOKEN_SECRET,
  db: {
    url: envVars.DATABASE_URL,
    logging: envVars.DATABASE_LOGGING,
  },

  test: {
    dbUrl: envVars.TEST_DATABASE_URI,
  },
};
