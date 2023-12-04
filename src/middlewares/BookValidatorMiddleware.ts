import Joi from "joi";

import { allBooksSchema, createBooksSchema, updateBookSchema, bookByIdSchema, searchQuerySchema } from "../validators/BookValidator";

export const getBooksValidationMiddleware = (req: any, res: any, next: any) => {
    const result = allBooksSchema.validate(req.query);
    if (result.error) {
        return res
            .status(400)
            .json({ message: result.error.details[0].message });
    }
    next();
};

export const createBookValidationMiddleware = (
    req: any,
    res: any,
    next: any
) => {
    const result = createBooksSchema.validate(req.body);
    if (result.error) {
        return res
            .status(400)
            .json({ message: result.error.details[0].message });
    }
    next();
};

export const updateBookValidationMiddleware = (
    req: any,
    res: any,
    next: any
) => {
    const result = updateBookSchema.validate(req.body);
    if (result.error) {
        return res
            .status(400)
            .json({ message: result.error.details[0].message });
    }
    next();
};

export const bookByIdValidationMiddleware = (
    req: any,
    res: any,
    next: any
) => {
    const result = bookByIdSchema.validate(req.params);
    console.log("-----------------------", result)
    res.locals.id = result.value.id
    if (result.error) {
        return res
            .status(400)
            .json({ message: result.error.details[0].message });
    }
    next();
};

export const searchBookValidationMiddleware = (
    req: any,
    res: any,
    next: any
) => {
    const result = searchQuerySchema.validate(req.params);
    res.locals.query = result.value.query
    if (result.error) {
        return res
            .status(400)
            .json({ message: result.error.details[0].message });
    }
    next();
};

export const createAuthorValidationMiddleware = (
    req: any,
    res: any,
    next: any
) => {
    const result = createBooksSchema.validate(req.body);
    if (result.error) {
        return res
            .status(400)
            .json({ message: result.error.details[0].message });
    }
    next();
};

export const getAuthorValidationMiddleware = (
    req: any,
    res: any,
    next: any
) => {
    const result = allBooksSchema.validate(req.query);
    if (result.error) {
        return res
            .status(400)
            .json({ message: result.error.details[0].message });
    }
    next();
};
