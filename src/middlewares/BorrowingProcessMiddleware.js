"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.returnValidationMiddleware = exports.checkoutValidationMiddleware = exports.getBorrowerBooksValidationMiddleware = void 0;
const BorrowingProcessValidator_1 = require("../validators/BorrowingProcessValidator");
const getBorrowerBooksValidationMiddleware = (req, res, next) => {
    const result = BorrowingProcessValidator_1.allBorroweringProcessSchema.validate(req.query);
    if (result.error) {
        return res
            .status(400)
            .json({ message: result.error.details[0].message });
    }
    next();
};
exports.getBorrowerBooksValidationMiddleware = getBorrowerBooksValidationMiddleware;
const checkoutValidationMiddleware = (req, res, next) => {
    const result = BorrowingProcessValidator_1.createBorroweringProcessSchema.validate(req.body);
    if (result.error) {
        return res
            .status(400)
            .json({ message: result.error.details[0].message });
    }
    next();
};
exports.checkoutValidationMiddleware = checkoutValidationMiddleware;
const returnValidationMiddleware = (req, res, next) => {
    const result = BorrowingProcessValidator_1.returnBorroweringProcessSchema.validate(req.body);
    if (result.error) {
        return res
            .status(400)
            .json({ message: result.error.details[0].message });
    }
    next();
};
exports.returnValidationMiddleware = returnValidationMiddleware;
