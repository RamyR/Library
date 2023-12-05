"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.checkIsBorrower = exports.checkIsAdmin = exports.authenticateToken = exports.registerUserValidationMiddware = exports.loginUserValidationMiddleware = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const AuthValidator_1 = require("../validators/AuthValidator");
const client_1 = require("@prisma/client");
const authenticateToken = (req, res, next) => {
    const authHeader = req.headers["authorization"];
    const token = authHeader && authHeader.split(" ")[1];
    if (token == null)
        return res.status(401).json({ message: "You are not authenticated!" });
    jsonwebtoken_1.default.verify(token, process.env.TOKEN_SECRET || "", (err, user) => {
        console.log(err);
        if (err)
            return res.status(403).json({ message: `invalid token,  ${err}` });
        req.user = user;
        next();
    });
};
exports.authenticateToken = authenticateToken;
const checkIsAdmin = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    if (req.user.role !== client_1.UserRole.ADMIN) {
        return res.status(401).json({ message: "You are not authorized!" });
    }
    next();
});
exports.checkIsAdmin = checkIsAdmin;
const checkIsBorrower = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    if (req.user.role !== client_1.UserRole.BORROWER) {
        return res.status(401).json({ message: "You are not authorized! You must be a borrower!" });
    }
    next();
});
exports.checkIsBorrower = checkIsBorrower;
const registerUserValidationMiddware = (req, res, next) => {
    const result = AuthValidator_1.registerUserSchema.validate(req.body);
    if (result.error) {
        res.status(400).json({ message: result.error.details[0].message });
        return;
    }
    next();
};
exports.registerUserValidationMiddware = registerUserValidationMiddware;
const loginUserValidationMiddleware = (req, res, next) => {
    const result = AuthValidator_1.loginUserSchema.validate(req.body);
    if (result.error) {
        res.status(400).json({ messgae: result.error.details[0].message });
        return;
    }
    next();
};
exports.loginUserValidationMiddleware = loginUserValidationMiddleware;
