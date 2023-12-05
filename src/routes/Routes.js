"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const AuthRoutes_1 = __importDefault(require("./AuthRoutes"));
const BookRoutes_1 = __importDefault(require("./BookRoutes"));
const BorrowerRoutes_1 = __importDefault(require("./BorrowerRoutes"));
const BorrowingProcessRoutes_1 = __importDefault(require("./BorrowingProcessRoutes"));
const router = express_1.default.Router();
router.get("/", (req, res) => {
    res.send(router.stack);
});
router.use("/auth", AuthRoutes_1.default);
router.use("/borrowers", BorrowerRoutes_1.default);
router.use("/books", BookRoutes_1.default);
router.use("/borroweringProcess", BorrowingProcessRoutes_1.default);
exports.default = router;
