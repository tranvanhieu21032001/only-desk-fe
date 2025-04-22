/**
 * Application Configuration
 *
 * Centralizes application configuration and settings
 * derived from environment variables.
 */

import { env, isDevelopment, isProduction } from "./env";

/**
 * API Configuration
 */
export const apiConfig = {
  baseURL: env.API_URL,
  timeout: env.API_TIMEOUT,
  // Add other API configuration here
};

/**
 * Authentication Configuration
 */
export const authConfig = {
  enabled: env.AUTH_ENABLED,
  persistAuth: env.AUTH_PERSIST,
  // Add other auth configuration here
};

/**
 * Plugin Configuration
 */
export const pluginConfig = {
  enabled: env.PLUGINS_ENABLED,
  allowThirdParty: env.ALLOW_THIRD_PARTY_PLUGINS,
  // Add other plugin configuration here
};

/**
 * Feature Flags
 */
export const featureFlags = {
  enableAnalytics: env.ENABLE_ANALYTICS && isProduction,
  enableNotifications: env.ENABLE_NOTIFICATIONS,
  // Define other feature flags here
};

/**
 * Application Settings
 */
export const appSettings = {
  defaultTheme: env.DEFAULT_THEME,
  defaultLanguage: env.DEFAULT_LANGUAGE,
  // Add other app settings here
};

/**
 * Debug Configuration
 */
export const debugConfig = {
  enableLogging: isDevelopment,
  verboseErrors: isDevelopment,
  // Add other debug settings here
};

export default {
  api: apiConfig,
  auth: authConfig,
  plugins: pluginConfig,
  features: featureFlags,
  settings: appSettings,
  debug: debugConfig,
};
