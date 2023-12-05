"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_rate_limit_1 = __importDefault(require("express-rate-limit"));
// Rate limit middleware
const rateLimitMiddleware = (0, express_rate_limit_1.default)({
    windowMs: 60 * 1000,
    max: Number(process.env.RATE_LIMIT),
    message: { message: `You have exceeded your ${process.env.RATE_LIMIT} requests per minute limit.` },
    headers: true,
});
exports.default = rateLimitMiddleware;
