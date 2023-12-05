"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getAuthorValidationMiddleware = exports.createAuthorValidationMiddleware = exports.searchBookValidationMiddleware = exports.bookByIdValidationMiddleware = exports.updateBookValidationMiddleware = exports.createBookValidationMiddleware = exports.getBooksValidationMiddleware = void 0;
const BookValidator_1 = require("../validators/BookValidator");
const getBooksValidationMiddleware = (req, res, next) => {
    const result = BookValidator_1.allBooksSchema.validate(req.query);
    if (result.error) {
        return res
            .status(400)
            .json({ message: result.error.details[0].message });
    }
    next();
};
exports.getBooksValidationMiddleware = getBooksValidationMiddleware;
const createBookValidationMiddleware = (req, res, next) => {
    const result = BookValidator_1.createBooksSchema.validate(req.body);
    if (result.error) {
        return res
            .status(400)
            .json({ message: result.error.details[0].message });
    }
    next();
};
exports.createBookValidationMiddleware = createBookValidationMiddleware;
const updateBookValidationMiddleware = (req, res, next) => {
    const result = BookValidator_1.updateBookSchema.validate(req.body);
    if (result.error) {
        return res
            .status(400)
            .json({ message: result.error.details[0].message });
    }
    next();
};
exports.updateBookValidationMiddleware = updateBookValidationMiddleware;
const bookByIdValidationMiddleware = (req, res, next) => {
    const result = BookValidator_1.bookByIdSchema.validate(req.params);
    console.log("-----------------------", result);
    res.locals.id = result.value.id;
    if (result.error) {
        return res
            .status(400)
            .json({ message: result.error.details[0].message });
    }
    next();
};
exports.bookByIdValidationMiddleware = bookByIdValidationMiddleware;
const searchBookValidationMiddleware = (req, res, next) => {
    const result = BookValidator_1.searchQuerySchema.validate(req.params);
    res.locals.query = result.value.query;
    if (result.error) {
        return res
            .status(400)
            .json({ message: result.error.details[0].message });
    }
    next();
};
exports.searchBookValidationMiddleware = searchBookValidationMiddleware;
const createAuthorValidationMiddleware = (req, res, next) => {
    const result = BookValidator_1.createBooksSchema.validate(req.body);
    if (result.error) {
        return res
            .status(400)
            .json({ message: result.error.details[0].message });
    }
    next();
};
exports.createAuthorValidationMiddleware = createAuthorValidationMiddleware;
const getAuthorValidationMiddleware = (req, res, next) => {
    const result = BookValidator_1.allBooksSchema.validate(req.query);
    if (result.error) {
        return res
            .status(400)
            .json({ message: result.error.details[0].message });
    }
    next();
};
exports.getAuthorValidationMiddleware = getAuthorValidationMiddleware;
