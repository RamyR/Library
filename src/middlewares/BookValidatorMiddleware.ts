import Joi from "joi";

import {
    allBooksSchema,
    createBooksSchema,
} from "../validators/BookValidator";

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
