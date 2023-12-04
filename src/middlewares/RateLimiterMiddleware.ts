import setRateLimit from "express-rate-limit";

// Rate limit middleware
const rateLimitMiddleware = setRateLimit({
    windowMs: 60 * 1000,
    max: Number(process.env.RATE_LIMIT),
    message: `You have exceeded your ${process.env.RATE_LIMIT} requests per minute limit.`,
    headers: true,
});

export default rateLimitMiddleware;
