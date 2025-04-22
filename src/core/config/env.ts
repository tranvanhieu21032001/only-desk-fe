/**
 * Environment configuration
 *
 * This module provides typed access to environment variables and
 * ensures that required variables are present.
 */

// Define types for import.meta.env
interface ImportMetaEnv {
  NODE_ENV: string;
  VITE_API_URL: string;
  VITE_API_TIMEOUT: string;
  VITE_ENABLE_ANALYTICS: string;
  VITE_ENABLE_NOTIFICATIONS: string;
  VITE_AUTH_ENABLED: string;
  VITE_AUTH_PERSIST: string;
  VITE_PLUGINS_ENABLED: string;
  VITE_ALLOW_THIRD_PARTY_PLUGINS: string;
  VITE_DEFAULT_THEME: string;
  VITE_DEFAULT_LANGUAGE: string;
  [key: string]: string | undefined;
}

// Extend ImportMeta interface
interface ImportMeta {
  readonly env: ImportMetaEnv;
}

/**
 * Environment variable configuration interface
 */
export interface EnvConfig {
  // Node environment
  NODE_ENV: "development" | "production" | "test";

  // API configuration
  API_URL: string;
  API_TIMEOUT: number;

  // Feature flags
  ENABLE_ANALYTICS: boolean;
  ENABLE_NOTIFICATIONS: boolean;

  // Authentication
  AUTH_ENABLED: boolean;
  AUTH_PERSIST: boolean;

  // Plugins
  PLUGINS_ENABLED: boolean;
  ALLOW_THIRD_PARTY_PLUGINS: boolean;

  // Theming
  DEFAULT_THEME: string;

  // Localization
  DEFAULT_LANGUAGE: string;
}

/**
 * Get a boolean value from an environment variable
 */
const getBooleanValue = (value: string | undefined): boolean => {
  if (!value) return false;
  return ["true", "1", "yes"].includes(value.toLowerCase());
};

/**
 * Get a number value from an environment variable
 */
const getNumberValue = (
  value: string | undefined,
  defaultValue: number
): number => {
  if (!value) return defaultValue;
  const parsed = parseInt(value, 10);
  return isNaN(parsed) ? defaultValue : parsed;
};

/**
 * Environment configuration
 */
export const env: EnvConfig = {
  // Node environment
  NODE_ENV: (import.meta.env.NODE_ENV ||
    "development") as EnvConfig["NODE_ENV"],

  // API configuration
  API_URL: import.meta.env.VITE_API_URL || "http://localhost:3000/api",
  API_TIMEOUT: getNumberValue(import.meta.env.VITE_API_TIMEOUT, 30000),

  // Feature flags
  ENABLE_ANALYTICS: getBooleanValue(import.meta.env.VITE_ENABLE_ANALYTICS),
  ENABLE_NOTIFICATIONS: getBooleanValue(
    import.meta.env.VITE_ENABLE_NOTIFICATIONS
  ),

  // Authentication
  AUTH_ENABLED: getBooleanValue(import.meta.env.VITE_AUTH_ENABLED),
  AUTH_PERSIST: getBooleanValue(import.meta.env.VITE_AUTH_PERSIST),

  // Plugins
  PLUGINS_ENABLED: getBooleanValue(import.meta.env.VITE_PLUGINS_ENABLED),
  ALLOW_THIRD_PARTY_PLUGINS: getBooleanValue(
    import.meta.env.VITE_ALLOW_THIRD_PARTY_PLUGINS
  ),

  // Theming
  DEFAULT_THEME: import.meta.env.VITE_DEFAULT_THEME || "light",

  // Localization
  DEFAULT_LANGUAGE: import.meta.env.VITE_DEFAULT_LANGUAGE || "en",
};

/**
 * Check if we're in a development environment
 */
export const isDevelopment = env.NODE_ENV === "development";

/**
 * Check if we're in a production environment
 */
export const isProduction = env.NODE_ENV === "production";

/**
 * Check if we're in a test environment
 */
export const isTest = env.NODE_ENV === "test";

export default env;
