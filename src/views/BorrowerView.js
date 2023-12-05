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
exports.destroy = exports.update = exports.getAll = void 0;
const BorrowerController_1 = require("../controllers/BorrowerController");
const PrismaValidator_1 = __importDefault(require("../validators/PrismaValidator"));
const getAll = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { page = 1, count = 10 } = req.params;
        const { borrowers, borrowersCount } = yield (0, BorrowerController_1.getAllBorrowers)(page, count);
        return res.status(200).json({ data: borrowers, total: borrowersCount, page });
    }
    catch (error) {
        return res.status(400).json((0, PrismaValidator_1.default)(error));
    }
});
exports.getAll = getAll;
const update = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id, name, username, email, password } = req.body;
        const borrower = yield (0, BorrowerController_1.updateBorrower)(id, name, username, email, password);
        return res.status(200).json({ borrower: borrower });
    }
    catch (error) {
        return res.status(400).json((0, PrismaValidator_1.default)(error));
    }
});
exports.update = update;
const destroy = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const id = res.locals.id;
        const borrower = yield (0, BorrowerController_1.deleteBorrower)(id);
        return res.status(200).json({ message: 'Borrower was deleted successfuly!' });
    }
    catch (error) {
        return res.status(400).json((0, PrismaValidator_1.default)(error));
    }
});
exports.destroy = destroy;
