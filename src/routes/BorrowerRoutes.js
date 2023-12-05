"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const BorrowerView_1 = require("../views/BorrowerView");
const BorrowerMiddleware_1 = require("../middlewares/BorrowerMiddleware");
const AuthMiddleware_1 = require("../middlewares/AuthMiddleware");
const RateLimiterMiddleware_1 = __importDefault(require("../middlewares/RateLimiterMiddleware"));
const router = express_1.default.Router();
router.get('/list', RateLimiterMiddleware_1.default, AuthMiddleware_1.authenticateToken, AuthMiddleware_1.checkIsAdmin, BorrowerMiddleware_1.getBorrowersValidationMiddleware, BorrowerView_1.getAll);
router.put('/update', AuthMiddleware_1.authenticateToken, BorrowerMiddleware_1.updateBorrowerValidationMiddleware, BorrowerView_1.update);
router.delete('/:id', AuthMiddleware_1.authenticateToken, BorrowerMiddleware_1.borrowerByIdValidationMiddleware, BorrowerView_1.destroy);
exports.default = router;
