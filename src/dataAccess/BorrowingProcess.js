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
exports.getBookRemainingQuantity = exports.checkoutBorrowerBook = exports.returnBorrowerBooks = exports.countUserBooks = exports.getBorrowerBooks = void 0;
const db_1 = __importDefault(require("../config/db"));
const client_1 = require("@prisma/client");
/**
 * @async
 * @description get borrower books
 * @param  {int} borrowerId - borrower ID
 */
const getBorrowerBooks = (borrowerId) => __awaiter(void 0, void 0, void 0, function* () {
    const books = yield db_1.default.borrowingProcess.findMany({
        where: {
            borrowerId,
            type: client_1.BorrowingProcessType.CHECKOUT
        },
        orderBy: {
            createdAt: "desc",
        },
        select: {
            book: true,
            borrowerId: true
        }
    });
    return books;
});
exports.getBorrowerBooks = getBorrowerBooks;
/**
 * @async
 * @description count borrower Books
 * @param  {int} borrowerId - borrower ID
 */
const countUserBooks = (borrowerId) => __awaiter(void 0, void 0, void 0, function* () {
    const count = yield db_1.default.borrowingProcess.aggregate({ _count: true, where: { borrowerId } });
    return count;
});
exports.countUserBooks = countUserBooks;
/**
 * @async
 * @description return borrower books
 * @param  {int} borrowerId - borrower ID
 * @param  {int} bookId - book ID
 */
const returnBorrowerBooks = (borrowerId, bookId) => __awaiter(void 0, void 0, void 0, function* () {
    const books = yield db_1.default.borrowingProcess.updateMany({
        where: {
            borrowerId,
            bookId,
            type: client_1.BorrowingProcessType.CHECKOUT
        },
        data: { type: client_1.BorrowingProcessType.RETURN, isReturned: true, returnDate: new Date() }
    });
    return books;
});
exports.returnBorrowerBooks = returnBorrowerBooks;
/**
 * @async
 * @description checkout borrower book
 * @param  {BorrowingProcess} data - Borrowing Process Object
 */
const checkoutBorrowerBook = (data) => __awaiter(void 0, void 0, void 0, function* () {
    const books = yield db_1.default.borrowingProcess.create({
        data: data
    });
    return books;
});
exports.checkoutBorrowerBook = checkoutBorrowerBook;
/**
 * @async
 * @description get book remianing quantity
 * @param  {int} bookId - Book ID
 */
const getBookRemainingQuantity = (bookId) => __awaiter(void 0, void 0, void 0, function* () {
    const checkedOutQuantity = yield db_1.default.borrowingProcess.aggregate({ _count: true, where: { bookId, type: client_1.BorrowingProcessType.CHECKOUT } });
    const bookQuantity = yield db_1.default.book.findUnique({ where: { id: bookId }, select: { quantity: true } });
    return ((bookQuantity === null || bookQuantity === void 0 ? void 0 : bookQuantity.quantity) || 0) - checkedOutQuantity._count;
});
exports.getBookRemainingQuantity = getBookRemainingQuantity;
