"use strict";

const joi = require("joi");

/**
 * Generate a validation schema using joi to check the type of your environment variables
 */
const envSchema = joi
  .object({
    DB_USER: joi.string(),
    DB_HOST: joi.string(),
    DB_PASSWORD: joi
      .string()
      .optional()
      .empty(""),
    DB_DATABASE: joi.string(),
    DB_PORT: joi.number()
  })
  .unknown()
  .required();

/**
 * Validate the env variables using joi.validate()
 */
const { error, value: envVars } = joi.validate(process.env, envSchema);
if (error) {
  throw new Error(`Config validation error: ${error.message}`);
}

const config = {
  databaseConfig: {
    client: "pg",
    connection: {
      host: envVars.DB_HOST,
      port: envVars.DB_PORT,
      user: envVars.DB_USER,
      password: envVars.DB_PASSWORD,
      database: envVars.DB_DATABASE
    }
    // migrations: {
    //   directory: './migrations',
    // },
  }
};

module.exports = config;
