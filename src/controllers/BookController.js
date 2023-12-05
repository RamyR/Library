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
Object.defineProperty(exports, "__esModule", { value: true });
exports.searchBooksByQuery = exports.searchBooks = exports.deleteBook = exports.updateBook = exports.getBook = exports.createAuthor = exports.createBook = exports.getAllBooks = void 0;
const Book_1 = require("../dataAccess/Book");
Object.defineProperty(exports, "searchBooks", { enumerable: true, get: function () { return Book_1.searchBooks; } });
const getAllBooks = (page, count) => __awaiter(void 0, void 0, void 0, function* () {
    const offset = (page - 1) * count;
    return { books: yield (0, Book_1.getBooks)(offset, count), booksCount: (0, Book_1.countBooks)() };
});
exports.getAllBooks = getAllBooks;
const getBook = (id) => __awaiter(void 0, void 0, void 0, function* () {
    return yield (0, Book_1.findBookById)(id);
});
exports.getBook = getBook;
const deleteBook = (id) => __awaiter(void 0, void 0, void 0, function* () {
    return yield (0, Book_1.deleteOneBook)(id);
});
exports.deleteBook = deleteBook;
const searchBooksByQuery = (query) => __awaiter(void 0, void 0, void 0, function* () {
    return yield (0, Book_1.searchBooks)(query);
});
exports.searchBooksByQuery = searchBooksByQuery;
const createBook = (title, quantity, isbn, shelfLocation, authorId, authorName) => __awaiter(void 0, void 0, void 0, function* () {
    if (!authorId && authorName) {
        let author = yield (0, Book_1.findAuthorByName)(authorName);
        if (author) {
            authorId = author === null || author === void 0 ? void 0 : author.id;
        }
        else {
            author = yield (0, Book_1.createOneAuthor)({ name: authorName });
            authorId = author.id;
        }
    }
    if (!authorId)
        return null;
    const book = yield (0, Book_1.createOneBook)({
        title,
        quantity,
        isbn,
        shelfLocation,
        authorId,
    });
    return book;
});
exports.createBook = createBook;
const updateBook = (id, title, quantity, isbn, shelfLocation, authorId, authorName) => __awaiter(void 0, void 0, void 0, function* () {
    if (!authorId && authorName) {
        let author = yield (0, Book_1.findAuthorByName)(authorName);
        if (author) {
            authorId = author === null || author === void 0 ? void 0 : author.id;
        }
        else {
            author = yield (0, Book_1.createOneAuthor)({ name: authorName });
            authorId = author.id;
        }
    }
    const book = yield (0, Book_1.updateOneBook)(id, {
        title,
        quantity,
        isbn,
        shelfLocation,
        authorId,
    });
    return book;
});
exports.updateBook = updateBook;
const createAuthor = (name) => __awaiter(void 0, void 0, void 0, function* () {
    const author = yield (0, Book_1.createOneAuthor)({
        name,
    });
    return author;
});
exports.createAuthor = createAuthor;
