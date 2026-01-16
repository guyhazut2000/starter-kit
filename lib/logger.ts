import winston from "winston";
import DailyRotateFile from "winston-daily-rotate-file";
import { env } from "@/env";

/**
 * Winston logger configuration
 *
 * Log levels (from highest to lowest priority):
 * - error: 0
 * - warn: 1
 * - info: 2
 * - debug: 3
 *
 * Log files are rotated daily and kept for 30 days.
 * Files are named with date pattern: YYYY-MM-DD
 */
const logLevel = env.LOG_LEVEL;

// Define log format
const logFormat = winston.format.combine(
  winston.format.timestamp({ format: "YYYY-MM-DD HH:mm:ss" }),
  winston.format.errors({ stack: true }),
  winston.format.splat(),
  winston.format.json()
);

// Console format for development (more readable)
const consoleFormat = winston.format.combine(
  winston.format.colorize(),
  winston.format.timestamp({ format: "YYYY-MM-DD HH:mm:ss" }),
  winston.format.printf(({ timestamp, level, message, ...metadata }) => {
    let msg = `${timestamp} [${level}]: ${message}`;
    if (Object.keys(metadata).length > 0) {
      msg += ` ${JSON.stringify(metadata)}`;
    }
    return msg;
  })
);

// Daily rotate file options
const dailyRotateFileOptions = {
  dirname: "logs",
  datePattern: "YYYY-MM-DD",
  maxSize: "20m",
  maxFiles: "30d", // Keep logs for 30 days
  zippedArchive: false,
  format: logFormat,
};

// Helper function to create DailyRotateFile transport with error handling
function createDailyRotateTransport(options: { filename: string; level?: string }) {
  const transport = new DailyRotateFile({
    ...dailyRotateFileOptions,
    ...options,
  });

  // Handle transport errors to prevent crashes
  transport.on("error", (error) => {
    console.error("Logger transport error:", error);
  });

  return transport;
}

// Create transports based on environment
const transports: winston.transport[] = [];

// Console transport (all environments)
transports.push(
  new winston.transports.Console({
    format: env.NODE_ENV === "development" ? consoleFormat : logFormat,
    level: logLevel,
  })
);

// Error log file (all environments) - date-based rotation
transports.push(
  createDailyRotateTransport({
    filename: "error-%DATE%.log",
    level: "error",
  })
);

// Combined log file (all environments) - date-based rotation
transports.push(
  createDailyRotateTransport({
    filename: "combined-%DATE%.log",
  })
);

// Development: Add debug log file with date-based rotation
if (env.NODE_ENV === "development") {
  transports.push(
    createDailyRotateTransport({
      filename: "debug-%DATE%.log",
      level: "debug",
    })
  );
}

// Create logger instance
export const logger = winston.createLogger({
  level: logLevel,
  format: logFormat,
  defaultMeta: {
    service: "nextjs-app",
    environment: env.NODE_ENV,
  },
  transports,
  // Don't exit on handled errors
  exitOnError: false,
  // Handle exceptions and rejections with daily rotation
  exceptionHandlers: [
    createDailyRotateTransport({
      filename: "exceptions-%DATE%.log",
    }),
  ],
  rejectionHandlers: [
    createDailyRotateTransport({
      filename: "rejections-%DATE%.log",
    }),
  ],
});

export default logger;
