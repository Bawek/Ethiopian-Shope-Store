/**
 * Environment Configuration & Validation
 * Ensures all required environment variables are present and valid
 * Fails fast with clear error messages on startup
 */

const fs = require('fs');
const path = require('path');

// Required environment variables by environment
const REQUIRED_VARS = {
  all: [
    'NODE_ENV',
    'PORT',
    'DATABASE_URL',
    'ACCESS_TOKEN_SECRET',
    'REFRESH_TOKEN_SECRET',
    'CHAPA_SECRET_KEY',
    'CHAPA_PUBLIC_KEY',
    'CHAPA_ENCRYPTION_KEY',
    'EMAIL_SERVER_HOST',
    'EMAIL_SERVER_PORT',
    'EMAIL_SERVER_USER',
    'EMAIL_SERVER_PASSWORD',
    'ADMIN_EMAIL',
    'SIGNING_SECRET',
    'BASE_URL',
  ],
  production: [
    'SENTRY_DSN',
    'CORS_ORIGIN',
  ],
};

// Variable validation rules
const VALIDATION_RULES = {
  PORT: (val) => {
    const port = parseInt(val, 10);
    if (isNaN(port) || port < 1 || port > 65535) {
      throw new Error('PORT must be a valid number between 1 and 65535');
    }
    return port;
  },
  NODE_ENV: (val) => {
    if (!['development', 'staging', 'production'].includes(val)) {
      throw new Error('NODE_ENV must be one of: development, staging, production');
    }
    return val;
  },
  DATABASE_URL: (val) => {
    if (!val.startsWith('postgresql://') && !val.startsWith('postgres://')) {
      throw new Error('DATABASE_URL must be a valid PostgreSQL connection string');
    }
    return val;
  },
  EMAIL_SERVER_PORT: (val) => {
    const port = parseInt(val, 10);
    if (isNaN(port) || port < 1 || port > 65535) {
      throw new Error('EMAIL_SERVER_PORT must be a valid number between 1 and 65535');
    }
    return port;
  },
  ACCESS_TOKEN_SECRET: (val) => {
    if (val.length < 32) {
      throw new Error('ACCESS_TOKEN_SECRET must be at least 32 characters long');
    }
    return val;
  },
  REFRESH_TOKEN_SECRET: (val) => {
    if (val.length < 32) {
      throw new Error('REFRESH_TOKEN_SECRET must be at least 32 characters long');
    }
    return val;
  },
  SIGNING_SECRET: (val) => {
    if (val.length < 32) {
      throw new Error('SIGNING_SECRET must be at least 32 characters long');
    }
    return val;
  },
};

/**
 * Validate environment configuration
 * @throws {Error} If validation fails
 */
function validateEnvironment() {
  const env = process.env.NODE_ENV || 'development';
  const requiredVars = [...REQUIRED_VARS.all];

  if (env === 'production') {
    requiredVars.push(...REQUIRED_VARS.production);
  }

  const missingVars = [];
  const invalidVars = [];

  for (const varName of requiredVars) {
    const value = process.env[varName];

    // Check if variable exists
    if (!value) {
      missingVars.push(varName);
      continue;
    }

    // Validate if rule exists
    if (VALIDATION_RULES[varName]) {
      try {
        VALIDATION_RULES[varName](value);
      } catch (error) {
        invalidVars.push(`${varName}: ${error.message}`);
      }
    }
  }

  // Report errors
  if (missingVars.length > 0 || invalidVars.length > 0) {
    let errorMessage = '\n❌ ENVIRONMENT CONFIGURATION ERROR\n';
    errorMessage += '='.repeat(50) + '\n\n';

    if (missingVars.length > 0) {
      errorMessage += 'Missing required environment variables:\n';
      missingVars.forEach((v) => {
        errorMessage += `  • ${v}\n`;
      });
      errorMessage += '\n';
    }

    if (invalidVars.length > 0) {
      errorMessage += 'Invalid environment variables:\n';
      invalidVars.forEach((v) => {
        errorMessage += `  • ${v}\n`;
      });
      errorMessage += '\n';
    }

    errorMessage += 'See .env.example for required variables.\n';
    errorMessage += '='.repeat(50) + '\n';

    throw new Error(errorMessage);
  }

  console.log('✅ Environment configuration validated successfully');
}

/**
 * Get environment configuration object
 */
function getConfig() {
  return {
    // Server
    nodeEnv: process.env.NODE_ENV || 'development',
    port: parseInt(process.env.PORT || '8000', 10),
    host: process.env.HOST || '0.0.0.0',

    // Database
    database: {
      url: process.env.DATABASE_URL,
      poolMin: parseInt(process.env.DATABASE_POOL_MIN || '2', 10),
      poolMax: parseInt(process.env.DATABASE_POOL_MAX || '10', 10),
      timeout: parseInt(process.env.DATABASE_TIMEOUT || '30000', 10),
      idleTimeout: parseInt(process.env.DATABASE_IDLE_TIMEOUT || '900000', 10),
    },

    // URLs
    baseUrl: process.env.BASE_URL,
    frontendUrl: process.env.FRONTEND_URL || process.env.BASE_URL,

    // JWT
    jwt: {
      accessSecret: process.env.ACCESS_TOKEN_SECRET,
      refreshSecret: process.env.REFRESH_TOKEN_SECRET,
      accessExpiry: process.env.ACCESS_TOKEN_EXPIRY || '15m',
      refreshExpiry: process.env.REFRESH_TOKEN_EXPIRY || '7d',
    },

    // Payment
    chapa: {
      secretKey: process.env.CHAPA_SECRET_KEY,
      publicKey: process.env.CHAPA_PUBLIC_KEY,
      encryptionKey: process.env.CHAPA_ENCRYPTION_KEY,
      apiUrl: process.env.CHAPA_API_URL || 'https://api.chapa.co/v1',
    },

    // Email
    email: {
      host: process.env.EMAIL_SERVER_HOST,
      port: parseInt(process.env.EMAIL_SERVER_PORT, 10),
      user: process.env.EMAIL_SERVER_USER,
      password: process.env.EMAIL_SERVER_PASSWORD,
      senderName: process.env.EMAIL_SENDER_NAME || 'Ethiopian Shop Store',
      adminEmail: process.env.ADMIN_EMAIL,
    },

    // Security
    security: {
      signingSecret: process.env.SIGNING_SECRET,
      corsOrigin: (process.env.CORS_ORIGIN || 'http://localhost:3000').split(','),
      rateLimitWindowMs: parseInt(process.env.RATE_LIMIT_WINDOW_MS || '900000', 10),
      rateLimitMaxRequests: parseInt(process.env.RATE_LIMIT_MAX_REQUESTS || '100', 10),
    },

    // Optional services
    geminiApiKey: process.env.GEMINI_API_KEY,
    sentryDsn: process.env.SENTRY_DSN,

    // Redis
    redis: {
      url: process.env.REDIS_URL,
      password: process.env.REDIS_PASSWORD,
      db: parseInt(process.env.REDIS_DB || '0', 10),
    },

    // Storage
    storage: {
      type: process.env.STORAGE_TYPE || 'local',
      path: process.env.STORAGE_PATH || './uploads',
      aws: {
        accessKeyId: process.env.AWS_ACCESS_KEY_ID,
        secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
        region: process.env.AWS_REGION,
        bucket: process.env.AWS_S3_BUCKET,
      },
    },

    // Deployment
    deployment: {
      env: process.env.DEPLOYMENT_ENV || 'production',
      region: process.env.DEPLOYMENT_REGION,
      version: process.env.DEPLOYMENT_VERSION || '1.0.0',
    },

    // Logging
    logging: {
      level: process.env.LOG_LEVEL || 'info',
      format: process.env.LOG_FORMAT || 'json',
    },

    // Flags
    isDevelopment: (process.env.NODE_ENV || 'development') === 'development',
    isProduction: process.env.NODE_ENV === 'production',
    isStaging: process.env.NODE_ENV === 'staging',
  };
}

module.exports = {
  validateEnvironment,
  getConfig,
};
