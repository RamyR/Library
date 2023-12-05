"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const BorrowingProcessView_1 = require("../views/BorrowingProcessView");
const BorrowingProcessMiddleware_1 = require("../middlewares/BorrowingProcessMiddleware");
const AuthMiddleware_1 = require("../middlewares/AuthMiddleware");
const router = express_1.default.Router();
router.get("/list", AuthMiddleware_1.authenticateToken, AuthMiddleware_1.checkIsBorrower, BorrowingProcessMiddleware_1.getBorrowerBooksValidationMiddleware, BorrowingProcessView_1.getAll);
router.post("/checkout", AuthMiddleware_1.authenticateToken, AuthMiddleware_1.checkIsBorrower, BorrowingProcessMiddleware_1.checkoutValidationMiddleware, BorrowingProcessView_1.checkoutBook);
router.put("/return", AuthMiddleware_1.authenticateToken, AuthMiddleware_1.checkIsBorrower, BorrowingProcessMiddleware_1.returnValidationMiddleware, BorrowingProcessView_1.returnBorrowerBook);
exports.default = router;
