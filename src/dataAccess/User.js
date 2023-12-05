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
exports.deleteOneUser = exports.updateOneUser = exports.createOneBorrower = exports.createOneUser = exports.findUserByUsername = exports.findUserById = exports.countUsers = exports.getBorrowers = exports.getUsers = void 0;
const db_1 = __importDefault(require("../config/db"));
const client_1 = require("@prisma/client");
/**
 * @async
 * @description get users
 * @param  {int} skip - pagination offset
 * @param  {int} take - pagination limit
 */
const getUsers = (skip, take) => __awaiter(void 0, void 0, void 0, function* () {
    const users = yield db_1.default.user.findMany({
        skip,
        take,
        orderBy: {
            name: "desc",
        },
    });
    return users;
});
exports.getUsers = getUsers;
/**
 * @async
 * @description get borrowers
 * @param  {int} skip - pagination offset
 * @param  {int} take - pagination limit
 */
const getBorrowers = (skip, take) => __awaiter(void 0, void 0, void 0, function* () {
    const users = yield db_1.default.user.findMany({
        where: { role: client_1.UserRole.BORROWER },
        skip,
        take,
        orderBy: {
            name: "desc",
        },
    });
    return users;
});
exports.getBorrowers = getBorrowers;
/**
 * @async
 * @description count users records
 */
const countUsers = () => __awaiter(void 0, void 0, void 0, function* () {
    const count = yield db_1.default.user.count();
    return count;
});
exports.countUsers = countUsers;
/**
 * @async
 * @description get user
 * @param  {int} id - user ID
 */
const findUserById = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const user = yield db_1.default.user.findUnique({
        where: {
            id: id,
        },
    });
    return user;
});
exports.findUserById = findUserById;
/**
 * @async
 * @description get user
 * @param  {string} username - username
 */
const findUserByUsername = (username) => __awaiter(void 0, void 0, void 0, function* () {
    const user = yield db_1.default.user.findUnique({
        where: {
            username: username,
        },
    });
    return user;
});
exports.findUserByUsername = findUserByUsername;
/**
 * @async
 * @description get users
 * @param  {Object} data - user data
 */
const createOneUser = (data) => __awaiter(void 0, void 0, void 0, function* () {
    console.log("New User", data);
    const user = yield db_1.default.user.create({ data: data });
    return user;
});
exports.createOneUser = createOneUser;
/**
 * @async
 * @description get users
 * @param  {Object} data - user data
 */
const createOneBorrower = (data) => __awaiter(void 0, void 0, void 0, function* () {
    console.log("New Borrower ", data);
    const borrower = yield db_1.default.borrower.create({ data: data });
    return borrower;
});
exports.createOneBorrower = createOneBorrower;
/**
 * @async
 * @description get users
 * @param  {int} id - user id
 * @param  {Object} data - user data
 */
const updateOneUser = (id, data) => __awaiter(void 0, void 0, void 0, function* () {
    const user = yield db_1.default.user.update({ where: { id: id }, data: data });
    return user;
});
exports.updateOneUser = updateOneUser;
/**
 * @async
 * @description get users
 * @param  {int} id - user id
 */
const deleteOneUser = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const user = yield db_1.default.user.delete({ where: { id: id } });
    return user;
});
exports.deleteOneUser = deleteOneUser;
