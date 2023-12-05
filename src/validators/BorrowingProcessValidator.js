"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.borrowerByIdSchema = exports.returnBorroweringProcessSchema = exports.createBorroweringProcessSchema = exports.allBorroweringProcessSchema = void 0;
const joi_1 = __importDefault(require("joi"));
exports.allBorroweringProcessSchema = joi_1.default.object().keys({
    page: joi_1.default.number().integer().required().default(1),
    count: joi_1.default.number().integer().required().default(10),
});
exports.createBorroweringProcessSchema = joi_1.default.object().keys({
    bookId: joi_1.default.number().integer().required(),
    dueDate: joi_1.default.date().required()
});
exports.returnBorroweringProcessSchema = joi_1.default.object().keys({
    bookId: joi_1.default.number().integer().required(),
});
exports.borrowerByIdSchema = joi_1.default.object().keys({
    id: joi_1.default.number().integer().required(),
});
