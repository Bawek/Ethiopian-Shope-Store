/**
 * Structured Logging Configuration
 * Production-ready logging with JSON format, request tracing, and error tracking
 */

const fs = require('fs');
const path = require('path');

// Ensure logs directory exists
const logsDir = path.join(__dirname, '../logs');
if (!fs.existsSync(logsDir)) {
  fs.mkdirSync(logsDir, { recursive: true });
}

const LOG_LEVELS = {
  ERROR: 0,
  WARN: 1,
  INFO: 2,
  DEBUG: 3,
  TRACE: 4,
};

const LOG_LEVEL_NAMES = {
  0: 'ERROR',
  1: 'WARN',
  2: 'INFO',
  3: 'DEBUG',
  4: 'TRACE',
};

class Logger {
  constructor(context = 'APP') {
    this.context = context;
    this.logLevel = LOG_LEVELS[process.env.LOG_LEVEL?.toUpperCase() || 'INFO'];
    this.format = process.env.LOG_FORMAT || 'json';
  }

  /**
   * Format log entry
   */
  formatLog(level, message, data = {}) {
    const timestamp = new Date().toISOString();
    const levelName = LOG_LEVEL_NAMES[level];

    if (this.format === 'json') {
      return JSON.stringify({
        timestamp,
        level: levelName,
        context: this.context,
        message,
        ...data,
        pid: process.pid,
        env: process.env.NODE_ENV || 'development',
      });
    }

    // Human-readable format
    return `[${timestamp}] [${levelName}] [${this.context}] ${message} ${
      Object.keys(data).length > 0 ? JSON.stringify(data) : ''
    }`;
  }

  /**
   * Write log to console and file
   */
  write(level, message, data = {}) {
    if (level > this.logLevel) return;

    const formatted = this.formatLog(level, message, data);

    // Console output
    if (level === LOG_LEVELS.ERROR) {
      console.error(formatted);
    } else if (level === LOG_LEVELS.WARN) {
      console.warn(formatted);
    } else {
      console.log(formatted);
    }

    // File output (errors and warnings always logged)
    if (level <= LOG_LEVELS.WARN) {
      const logFile = path.join(logsDir, `${LOG_LEVEL_NAMES[level].toLowerCase()}.log`);
      fs.appendFileSync(logFile, formatted + '\n');
    }
  }

  error(message, error = null, data = {}) {
    const errorData = {
      ...data,
      ...(error && {
        error: {
          message: error.message,
          stack: error.stack,
          code: error.code,
        },
      }),
    };
    this.write(LOG_LEVELS.ERROR, message, errorData);
  }

  warn(message, data = {}) {
    this.write(LOG_LEVELS.WARN, message, data);
  }

  info(message, data = {}) {
    this.write(LOG_LEVELS.INFO, message, data);
  }

  debug(message, data = {}) {
    this.write(LOG_LEVELS.DEBUG, message, data);
  }

  trace(message, data = {}) {
    this.write(LOG_LEVELS.TRACE, message, data);
  }
}

/**
 * Request logging middleware
 */
function requestLogger(req, res, next) {
  const logger = new Logger('HTTP');
  const startTime = Date.now();

  // Capture response
  const originalSend = res.send;
  res.send = function (data) {
    const duration = Date.now() - startTime;
    const statusCode = res.statusCode;

    logger.info(`${req.method} ${req.path}`, {
      method: req.method,
      path: req.path,
      statusCode,
      duration: `${duration}ms`,
      ip: req.ip,
      userAgent: req.get('user-agent'),
      userId: req.user?.id,
    });

    return originalSend.call(this, data);
  };

  next();
}

/**
 * Error logging middleware
 */
function errorLogger(err, req, res, next) {
  const logger = new Logger('ERROR');

  logger.error(`${req.method} ${req.path}`, err, {
    method: req.method,
    path: req.path,
    statusCode: err.statusCode || 500,
    ip: req.ip,
    userId: req.user?.id,
    body: req.body,
  });

  next(err);
}

module.exports = {
  Logger,
  requestLogger,
  errorLogger,
  LOG_LEVELS,
};
