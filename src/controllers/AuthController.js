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
exports.login = exports.register = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const bcrypt_1 = __importDefault(require("bcrypt"));
const User_1 = require("../dataAccess/User");
const client_1 = require("@prisma/client");
/**
 * @async
 * @description create user
 * @param  {string} name - full name
 * @param  {string} username - username
 * @param  {string} email - email
 * @param  {string} password - password
 * @param  {UserRole} role - User Type ( Borrower, Admin, Author)
 */
const register = (name, username, email, password, role) => __awaiter(void 0, void 0, void 0, function* () {
    const existedUser = yield (0, User_1.findUserByUsername)(username);
    if (existedUser) {
        return;
    }
    const hashedPassword = yield bcrypt_1.default.hash(password, 10);
    const newUser = yield (0, User_1.createOneUser)({
        name,
        username,
        email,
        password: hashedPassword,
        role,
    });
    if (role == client_1.UserRole.BORROWER && newUser) {
        (0, User_1.createOneBorrower)({ userId: newUser.id });
    }
    const token = jsonwebtoken_1.default.sign({
        id: newUser.id,
        username: newUser.username,
        role,
    }, process.env.TOKEN_SECRET || "");
    return token;
});
exports.register = register;
/**
 * @async
 * @description login
 * @param  {string} name - full name
 * @param  {string} username - username
 */
const login = (username, password) => __awaiter(void 0, void 0, void 0, function* () {
    const user = yield (0, User_1.findUserByUsername)(username);
    if (!user) {
        return;
    }
    const passwordMatch = yield bcrypt_1.default.compare(password, user.password);
    if (!passwordMatch) {
        return;
    }
    console.log("Token", process.env.Sec);
    const token = jsonwebtoken_1.default.sign({
        id: user.id,
        username: user.username,
        role: user.role,
    }, process.env.TOKEN_SECRET || "");
    return token;
});
exports.login = login;
