import dotenv from "dotenv";
dotenv.config();

/**
 * Checks that all required environment variables are defined and not empty.
 */
function checkEnvVariables(requiredKeys: string[]): void {
  const missing: string[] = [];
  for (const key of requiredKeys) {
    const val = process.env[key];
    if (val === undefined || val.trim() === "") {
      missing.push(key);
    }
  }
  if (missing.length > 0) {
    throw new Error(`Missing environment variable: ${missing.join(", ")}`);
  }
}

// Run check on required keys
const REQUIRED_KEYS: string[] = [
  "CURRENCY",
  "PRICE_PER_MINUTE",
  "TYPE_MACHINE",
  "PORT",
  "TIMEOUT",
];
checkEnvVariables(REQUIRED_KEYS);

// ?==> Export config
export const CONFIG = {
  CURRENCY: process.env.CURRENCY as string,
  PRICE_PER_MINUTE: Number(process.env.PRICE_PER_MINUTE),
  TYPE_MACHINE: process.env.TYPE_MACHINE,
  PORT: Number(process.env.PORT),
  TIMEOUT: Number(process.env.TIMEOUT),
} as const;
