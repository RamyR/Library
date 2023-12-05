"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.borrowerByIdValidationMiddleware = exports.updateBorrowerValidationMiddleware = exports.getBorrowersValidationMiddleware = void 0;
const BorrowerValidator_1 = require("../validators/BorrowerValidator");
const getBorrowersValidationMiddleware = (req, res, next) => {
    const result = BorrowerValidator_1.allBorrowersSchema.validate(req.query);
    if (result.error) {
        return res
            .status(400)
            .json({ message: result.error.details[0].message });
    }
    next();
};
exports.getBorrowersValidationMiddleware = getBorrowersValidationMiddleware;
const updateBorrowerValidationMiddleware = (req, res, next) => {
    const result = BorrowerValidator_1.updateBorrowerSchema.validate(req.body);
    if (result.error) {
        return res
            .status(400)
            .json({ message: result.error.details[0].message });
    }
    next();
};
exports.updateBorrowerValidationMiddleware = updateBorrowerValidationMiddleware;
const borrowerByIdValidationMiddleware = (req, res, next) => {
    const result = BorrowerValidator_1.borrowerByIdSchema.validate(req.params);
    console.log("-----------------------", result);
    res.locals.id = result.value.id;
    if (result.error) {
        return res
            .status(400)
            .json({ message: result.error.details[0].message });
    }
    next();
};
exports.borrowerByIdValidationMiddleware = borrowerByIdValidationMiddleware;
