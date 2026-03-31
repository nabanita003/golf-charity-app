import helmet from "helmet";
import rateLimit from "express-rate-limit";

export const securityMiddleware = (app) => {

  // Secure headers
  app.use(helmet());

  // Rate limiting (prevent brute force)
  const limiter = rateLimit({
    windowMs: 15 * 60 * 1000,
    max: 100
  });

  app.use(limiter);
};