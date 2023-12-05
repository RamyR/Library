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
exports.deleteBorrower = exports.updateBorrower = exports.getAllBorrowers = void 0;
const User_1 = require("../dataAccess/User");
const bcrypt_1 = __importDefault(require("bcrypt"));
const getAllBorrowers = (page, count) => __awaiter(void 0, void 0, void 0, function* () {
    const offset = (page - 1) * count;
    return {
        borrowers: yield (0, User_1.getBorrowers)(offset, count),
        borrowersCount: (0, User_1.countUsers)(),
    };
});
exports.getAllBorrowers = getAllBorrowers;
const updateBorrower = (id, name, username, email, password) => __awaiter(void 0, void 0, void 0, function* () {
    let data = {
        name,
        username,
        email,
        password,
    };
    if (password) {
        let hashedPassword = yield bcrypt_1.default.hash(password, 10);
        data.password = hashedPassword;
    }
    const borrower = yield (0, User_1.updateOneUser)(id, data);
    return borrower;
});
exports.updateBorrower = updateBorrower;
const deleteBorrower = (id) => __awaiter(void 0, void 0, void 0, function* () {
    return yield (0, User_1.deleteOneUser)(id);
});
exports.deleteBorrower = deleteBorrower;
