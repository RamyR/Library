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
exports.createOneAuthor = exports.findAuthorByName = exports.deleteOneBook = exports.updateOneBook = exports.createOneBook = exports.findBookById = exports.countBooks = exports.searchBooks = exports.getBooks = void 0;
const db_1 = __importDefault(require("../config/db"));
/**
 * @async
 * @description get books
 * @param  {int} skip - pagination offset
 * @param  {int} take - pagination limit
 */
const getBooks = (skip, take) => __awaiter(void 0, void 0, void 0, function* () {
    const books = yield db_1.default.book.findMany({
        skip,
        take,
        orderBy: {
            title: "desc",
        },
    });
    return books;
});
exports.getBooks = getBooks;
/**
 * @async
 * @description search books
 * @param  {string} query - search query - (Author Name | Title | ISBN)
 */
const searchBooks = (query) => __awaiter(void 0, void 0, void 0, function* () {
    const books = yield db_1.default.book.findMany({
        where: {
            OR: [
                { 'title': { contains: query } },
                { 'isbn': { contains: query } },
                { 'author': { "name": { contains: query } } }
            ]
        },
        orderBy: {
            title: "desc",
        },
    });
    return books;
});
exports.searchBooks = searchBooks;
/**
 * @async
 * @description count books records
 */
const countBooks = () => __awaiter(void 0, void 0, void 0, function* () {
    const count = yield db_1.default.book.count();
    return count;
});
exports.countBooks = countBooks;
/**
 * @async
 * @description get book
 * @param  {int} id - book ID
 */
const findBookById = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const book = yield db_1.default.book.findUnique({
        where: {
            id: id,
        },
    });
    return book;
});
exports.findBookById = findBookById;
/**
 * @async
 * @description create book
 * @param  {Book} data - book data
 */
const createOneBook = (data) => __awaiter(void 0, void 0, void 0, function* () {
    const book = yield db_1.default.book.create({ data: data });
    return book;
});
exports.createOneBook = createOneBook;
/**
 * @async
 * @description update book
 * @param  {int} id - book id
 * @param  {Book} data - book data
 */
const updateOneBook = (id, data) => __awaiter(void 0, void 0, void 0, function* () {
    const book = yield db_1.default.book.update({ where: { id: id }, data: data });
    return book;
});
exports.updateOneBook = updateOneBook;
/**
 * @async
 * @description delete book
 * @param  {int} id - book id
 */
const deleteOneBook = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const book = yield db_1.default.book.delete({ where: { id: id } });
    return book;
});
exports.deleteOneBook = deleteOneBook;
/**
 * @async
 * @description get author
 * @param  {string} name - author name
 */
const findAuthorByName = (name) => __awaiter(void 0, void 0, void 0, function* () {
    const author = yield db_1.default.author.findUnique({
        where: {
            name
        },
        select: { id: true }
    });
    return author;
});
exports.findAuthorByName = findAuthorByName;
/**
 * @async
 * @description create author
 * @param  {Author} data - book data
 */
const createOneAuthor = (data) => __awaiter(void 0, void 0, void 0, function* () {
    const author = yield db_1.default.author.create({ data: data });
    return author;
});
exports.createOneAuthor = createOneAuthor;
