import express from 'express';
import rateLimit from 'express-rate-limit';
import winston from 'winston';
import { rateLimitConfig } from './rateLimitConfig';
import { securityConfig } from './securityConfig';

export const applySecurityAndRateLimit = (router) => {
  // Apply security headers and rate limiting
  try {
    Object.values(securityConfig).forEach((config) => router.use(config));
    router.use(rateLimit(rateLimitConfig));
    router.use((req, res, next) => {
      winston.info(`Incoming request: ${req.method} ${req.originalUrl}`);
      next();
    });
    // Fallback error handler middleware
    router.use((err, req, res, next) => {
      winston.error(`Unhandled error: ${err.stack}`);
      res.status(500).send('Internal Server Error');
    });
  } catch (error) {
    winston.error(`Error occurred during security headers and rate limiting setup: ${error.stack}`);
  }
};

const router = express.Router();
applySecurityAndRateLimit(router);

// Middleware to validate requests
const validateRequest = (req, res, next) => {
  try {
    if (req?.specificValidationCheck) {
      next();
    } else {
      res.status(400).json({ error: "Invalid request." });
    }
  } catch (error) {
    next(error); // Pass the error to the error handling middleware
  }
};

// Error handling middleware
const errorHandler = (err, req, res, next) => {
  winston.error(`Error occurred for request: ${req.originalUrl} - ${err.stack}`);
  res.status(500).json({ error: "Internal Server Error" });
  next(err);
};

// Route for root path
router.get("/", validateRequest, (req, res, next) => {
  try {
    res.json({ response: "Server is up and running." });
  } catch (error) {
    next(error);
  }
});

// Apply error handling middleware
router.use(errorHandler);

// Default error handler
router.use((err, req, res, next) => {
  winston.error(`Error occurred for request: ${req.originalUrl} - ${err.stack}`);
  res.status(500).json({ error: "Internal Server Error" });
  next(err);
});

export default router;