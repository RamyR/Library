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
exports.returnBorrowerBook = exports.checkoutBook = exports.getAll = void 0;
const BorrowingProcessController_1 = require("../controllers/BorrowingProcessController");
const PrismaValidator_1 = __importDefault(require("../validators/PrismaValidator"));
const getAll = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { page = 1, count = 10 } = req.params;
        const { books, booksCount } = yield (0, BorrowingProcessController_1.getBooks)(req.user.id);
        return res.status(200).json({ data: books, total: booksCount, page });
    }
    catch (error) {
        return res.status(400).json((0, PrismaValidator_1.default)(error));
    }
});
exports.getAll = getAll;
const checkoutBook = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        console.log("------------------------USER ID------------------", req.user, req.user.id);
        const { bookId, dueDate } = req.body;
        const borrower = yield (0, BorrowingProcessController_1.checkout)(req.user.id, bookId, dueDate);
        return res.status(200).json({ borroweringProcess: borrower });
    }
    catch (error) {
        return res.status(400).json((0, PrismaValidator_1.default)(error));
    }
});
exports.checkoutBook = checkoutBook;
const returnBorrowerBook = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { bookId } = req.body;
        const borrower = yield (0, BorrowingProcessController_1.returnBook)(req.user.id, bookId);
        return res.status(200).json({ message: 'Book was returned successfuly!' });
    }
    catch (error) {
        return res.status(400).json((0, PrismaValidator_1.default)(error));
    }
});
exports.returnBorrowerBook = returnBorrowerBook;
