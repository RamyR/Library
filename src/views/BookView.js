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
exports.search = exports.destroy = exports.update = exports.create = exports.get = exports.getAll = void 0;
const BookController_1 = require("../controllers/BookController");
const PrismaValidator_1 = __importDefault(require("../validators/PrismaValidator"));
const getAll = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { page = 1, count = 10 } = req.params;
        const { books, booksCount } = yield (0, BookController_1.getAllBooks)(page, count);
        return res.status(200).json({ data: books, total: booksCount, page });
    }
    catch (error) {
        return res.status(400).json((0, PrismaValidator_1.default)(error));
    }
});
exports.getAll = getAll;
const create = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { title, quantity, isbn, shelfLocation, authorId, authorName } = req.body;
        const book = yield (0, BookController_1.createBook)(title, quantity, isbn, shelfLocation, authorId, authorName);
        if (!book)
            return res.status(400).json({ Error: `The Book was not created, please make sure you have entered a valid data` });
        return res.status(201).json({ data: book });
    }
    catch (error) {
        return res.status(400).json((0, PrismaValidator_1.default)(error));
    }
});
exports.create = create;
const get = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const id = res.locals.id;
        const book = yield (0, BookController_1.getBook)(id);
        return res.status(200).json({ book: book });
    }
    catch (error) {
        return res.status(400).json((0, PrismaValidator_1.default)(error));
    }
});
exports.get = get;
const update = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id, title, quantity, isbn, shelfLocation, authorId, authorName } = req.body;
        const book = yield (0, BookController_1.updateBook)(id, title, quantity, isbn, shelfLocation, authorId, authorName);
        return res.status(200).json({ book: book });
    }
    catch (error) {
        return res.status(400).json((0, PrismaValidator_1.default)(error));
    }
});
exports.update = update;
const destroy = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const id = res.locals.id;
        const book = yield (0, BookController_1.deleteBook)(id);
        return res.status(200).json({ message: 'Book was deleted successfuly!' });
    }
    catch (error) {
        return res.status(400).json((0, PrismaValidator_1.default)(error));
    }
});
exports.destroy = destroy;
const search = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const searchQuery = res.locals.query;
        const books = yield (0, BookController_1.searchBooksByQuery)(searchQuery);
        return res.status(200).json({ books: books });
    }
    catch (error) {
        return res.status(400).json((0, PrismaValidator_1.default)(error));
    }
});
exports.search = search;
