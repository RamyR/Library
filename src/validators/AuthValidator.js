"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.loginUserSchema = exports.registerUserSchema = void 0;
const joi_1 = __importDefault(require("joi"));
const registerUserSchema = joi_1.default.object().keys({
    username: joi_1.default.string().alphanum().min(3).max(30).required(),
    name: joi_1.default.string().required(),
    email: joi_1.default.string().email(),
    password: joi_1.default.string().min(8)
        .regex(/^[a-zA-Z0-9]{3,30}$/)
        .required().messages({
        "string.min": "Must have at least 8 characters",
        'string.empty': `"a" cannot be an empty field`,
        'object.regex': `Must have at least 8 characters`,
        "string.pattern.base": "Must have at least 8 characters and alphanumeric only..."
    }),
    role: joi_1.default.string().valid("BORROWER", "ADMIN").required()
});
exports.registerUserSchema = registerUserSchema;
const loginUserSchema = joi_1.default.object().keys({
    username: joi_1.default.string().alphanum().min(3).max(30).required(),
    password: joi_1.default.string()
        .regex(/^[a-zA-Z0-9]{3,30}$/)
        .required().messages({
        "string.min": "Must have at least 8 characters",
        'string.empty': `"a" cannot be an empty field`,
        'object.regex': `Must have at least 8 characters`,
        "string.pattern.base": "Must have at least 8 characters and alphanumeric only..."
    })
});
exports.loginUserSchema = loginUserSchema;
