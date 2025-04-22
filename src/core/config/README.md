# Environment Configuration System

This module provides a structured way to manage environment variables and application configuration in the Only Chat application.

## Structure

- `env.ts`: Core environment variable definitions and utilities for accessing them
- `app-config.ts`: Application-specific configuration derived from environment variables
- `index.ts`: Exports for easy importing

## Usage

### Environment Variables

Environment variables can be set in the following files:

- `.env`: Default environment variables
- `.env.development`: Development-specific environment variables (overrides defaults)
- `.env.production`: Production-specific environment variables (overrides defaults)

All environment variables should be prefixed with `VITE_` to be accessible in the browser.

### Importing and Using Configuration

```typescript
// Import just the env variables
import { env } from "@/core/config";

// Use a specific environment variable
console.log(env.API_URL);

// Import the config object
import { config } from "@/core/config";

// Use a specific configuration
const apiBaseUrl = config.api.baseURL;

// Check environment
import { isDevelopment, isProduction } from "@/core/config";

if (isDevelopment) {
  console.log("Running in development mode");
}
```

## Available Configuration

### API Configuration

- `baseURL`: Base URL for API requests
- `timeout`: Timeout for API requests in milliseconds

### Authentication Configuration

- `enabled`: Whether authentication is enabled
- `persistAuth`: Whether to persist authentication across sessions

### Plugin Configuration

- `enabled`: Whether plugins are enabled
- `allowThirdParty`: Whether third-party plugins are allowed

### Feature Flags

- `enableAnalytics`: Whether analytics are enabled
- `enableNotifications`: Whether notifications are enabled

### Application Settings

- `defaultTheme`: Default theme for the application ('light' or 'dark')
- `defaultLanguage`: Default language for the application

### Debug Configuration

- `enableLogging`: Whether logging is enabled
- `verboseErrors`: Whether to show verbose errors

## Adding New Configuration

To add new environment variables:

1. Add them to the `.env` files
2. Add their types to the `EnvConfig` interface in `env.ts`
3. Add them to the `env` object in `env.ts`
4. Add any derived configuration to the appropriate section in `app-config.ts`

## Notes

- All environment variables should be documented in the `.env` file
- Sensitive information should never be included in the environment files committed to version control
- Production-specific environment variables should be set on the deployment server
