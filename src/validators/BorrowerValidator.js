"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.borrowerByIdSchema = exports.updateBorrowerSchema = exports.allBorrowersSchema = void 0;
const joi_1 = __importDefault(require("joi"));
exports.allBorrowersSchema = joi_1.default.object().keys({
    page: joi_1.default.number().integer().required().default(1),
    count: joi_1.default.number().integer().required().default(10),
});
exports.updateBorrowerSchema = joi_1.default.object().keys({
    id: joi_1.default.number().integer(),
    username: joi_1.default.string().alphanum().min(3).max(30),
    name: joi_1.default.string(),
    email: joi_1.default.string().email(),
    password: joi_1.default.string().min(8)
        .regex(/^[a-zA-Z0-9]{3,30}$/)
        .messages({
        "string.min": "Must have at least 8 characters",
        'string.empty': `"a" cannot be an empty field`,
        'object.regex': `Must have at least 8 characters`,
        "string.pattern.base": "Must have at least 8 characters and alphanumeric only..."
    }),
}).or('username', 'name', 'email', 'password');
exports.borrowerByIdSchema = joi_1.default.object().keys({
    id: joi_1.default.number().integer().required(),
});
