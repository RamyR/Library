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
exports.returnBook = exports.checkout = exports.getBooks = void 0;
const BorrowingProcess_1 = require("../dataAccess/BorrowingProcess");
const client_1 = require("@prisma/client");
const getBooks = (borrowerId) => __awaiter(void 0, void 0, void 0, function* () {
    return {
        books: yield (0, BorrowingProcess_1.getBorrowerBooks)(borrowerId),
        booksCount: (0, BorrowingProcess_1.countUserBooks)(borrowerId),
    };
});
exports.getBooks = getBooks;
const checkout = (borrowerId, bookId, dueDate) => __awaiter(void 0, void 0, void 0, function* () {
    const remaingQuantity = yield (0, BorrowingProcess_1.getBookRemainingQuantity)(bookId);
    if (!remaingQuantity) {
        return -1;
    }
    console.log('-----------------FINAL DATA', remaingQuantity, borrowerId, bookId, dueDate);
    const borrower = yield (0, BorrowingProcess_1.checkoutBorrowerBook)({
        borrowerId,
        bookId,
        dueDate,
        type: client_1.BorrowingProcessType.CHECKOUT,
    });
    return borrower;
});
exports.checkout = checkout;
const returnBook = (borrowerId, bookId) => __awaiter(void 0, void 0, void 0, function* () {
    return yield (0, BorrowingProcess_1.returnBorrowerBooks)(borrowerId, bookId);
});
exports.returnBook = returnBook;
