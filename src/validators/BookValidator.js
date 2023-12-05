"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.searchQuerySchema = exports.bookByIdSchema = exports.updateBookSchema = exports.createBooksSchema = exports.allBooksSchema = void 0;
const joi_1 = __importDefault(require("joi"));
exports.allBooksSchema = joi_1.default.object().keys({
    page: joi_1.default.number().integer().required().default(1),
    count: joi_1.default.number().integer().required().default(10),
});
exports.createBooksSchema = joi_1.default.object().keys({
    title: joi_1.default.string().min(3).max(255).required(),
    quantity: joi_1.default.number().integer().required(),
    isbn: joi_1.default.string().alphanum().min(3).max(255).required(),
    shelfLocation: joi_1.default.string().alphanum().min(2).max(255).required(),
    authorId: joi_1.default.number().integer().messages({
        "number.base": "Create Author first or send a valid ID"
    }),
    authorName: joi_1.default.string().min(3).max(255)
}).or('authorId', 'authorName');
exports.updateBookSchema = joi_1.default.object().keys({
    id: joi_1.default.number().integer().required(),
    title: joi_1.default.string().min(3).max(255),
    quantity: joi_1.default.number().integer(),
    isbn: joi_1.default.string().alphanum().min(3).max(255),
    shelfLocation: joi_1.default.string().alphanum().min(2).max(255),
    authorId: joi_1.default.number().integer().messages({
        "number.base": "Create Author first or send a valid ID"
    }),
    authorName: joi_1.default.string().min(3).max(255)
}).or('authorId', 'authorName', 'title', 'quantity', 'isbn', 'shelfLocation');
exports.bookByIdSchema = joi_1.default.object().keys({
    id: joi_1.default.number().integer().required(),
});
exports.searchQuerySchema = joi_1.default.object().keys({
    query: joi_1.default.string().min(3).max(255).required(),
});
