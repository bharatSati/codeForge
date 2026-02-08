import rateLimit from "express-rate-limit";

export const globalRateLimiter = rateLimit({
  windowMs: 1 * 60 * 1000,
  max: 1,               

  keyGenerator: (req) => {
    return req.ip;
  },

  handler: (req, res) => {
    res.status(429).json({
      message: "Too many requests. Please wait a minute and try again.",
    });
  },

  standardHeaders: true,
  legacyHeaders: false,
});
