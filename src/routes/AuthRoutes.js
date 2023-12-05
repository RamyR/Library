"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const AuthView_1 = require("../views/AuthView");
const AuthMiddleware_1 = require("../middlewares/AuthMiddleware");
const router = express_1.default.Router();
// const borrowerController = require('../controllers/BorrowerController')
// const borrowingController = require('../controllers/BorrowingProcessController')
// const validator = require('../handlers/validatorHandler')
// router.get('/books/overdue', borrowingController.getOverdueBooks);
router.post('/register', AuthMiddleware_1.registerUserValidationMiddware, AuthView_1.registerView);
router.post("/login", AuthMiddleware_1.loginUserValidationMiddleware, AuthView_1.loginView);
// router.get('/books/:id', bookController.get);
// router.post('/books', validator.createBookValidator, bookController.create);
// router.put('/books/:id', validator.updateBookValidator , bookController.update);
// router.delete('/books/:id', bookController.destroy);
// router.get('/books/search/:query', bookController.search);
exports.default = router;
