"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const BookView_1 = require("../views/BookView");
const BookMiddleware_1 = require("../middlewares/BookMiddleware");
const AuthMiddleware_1 = require("../middlewares/AuthMiddleware");
const RateLimiterMiddleware_1 = __importDefault(require("../middlewares/RateLimiterMiddleware"));
const router = express_1.default.Router();
router.get('/list', RateLimiterMiddleware_1.default, AuthMiddleware_1.authenticateToken, AuthMiddleware_1.checkIsAdmin, BookMiddleware_1.getBooksValidationMiddleware, BookView_1.getAll);
router.get('/:id', AuthMiddleware_1.authenticateToken, BookMiddleware_1.bookByIdValidationMiddleware, BookView_1.get);
router.post('/create', AuthMiddleware_1.authenticateToken, AuthMiddleware_1.checkIsAdmin, BookMiddleware_1.createBookValidationMiddleware, BookView_1.create);
router.put('/update', AuthMiddleware_1.authenticateToken, AuthMiddleware_1.checkIsAdmin, BookMiddleware_1.updateBookValidationMiddleware, BookView_1.update);
router.delete('/:id', AuthMiddleware_1.authenticateToken, AuthMiddleware_1.checkIsAdmin, BookMiddleware_1.bookByIdValidationMiddleware, BookView_1.destroy);
router.get('/search/:query', AuthMiddleware_1.authenticateToken, BookMiddleware_1.searchBookValidationMiddleware, BookView_1.search);
exports.default = router;
