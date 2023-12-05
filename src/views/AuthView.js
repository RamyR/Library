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
exports.loginView = exports.registerView = void 0;
const AuthController_1 = require("../controllers/AuthController");
const PrismaValidator_1 = __importDefault(require("../validators/PrismaValidator"));
/**
 * @async
 * @description create user
 * @param  {Object} req - Express request object
 * @param  {Object} res - Express response object
 */
const registerView = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { name, username, email, password, role } = req.body;
        const token = yield (0, AuthController_1.register)(name, username, email, password, role);
        if (!token) {
            return res.status(400).json({ message: "username already existed" });
        }
        return res.status(200).json({ token });
    }
    catch (error) {
        return res.status(400).json((0, PrismaValidator_1.default)(error));
    }
});
exports.registerView = registerView;
/**
 * @async
 * @description login
 * @param  {Object} req - Express request object
 * @param  {Object} res - Express response object
 */
const loginView = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { username, password } = req.body;
        const token = yield (0, AuthController_1.login)(username, password);
        if (!token) {
            return res.status(401).json({ message: "Incorrect Username or Password" });
        }
        return res.status(200).json({ token });
    }
    catch (error) {
        return res.status(400).json((0, PrismaValidator_1.default)(error));
    }
});
exports.loginView = loginView;
