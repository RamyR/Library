import { allBorrowersSchema, updateBorrowerSchema, borrowerByIdSchema } from "../validators/BorrowerValidator";

export const getBorrowersValidationMiddleware = (req: any, res: any, next: any) => {
    const result = allBorrowersSchema.validate(req.query);
    if (result.error) {
        return res
            .status(400)
            .json({ message: result.error.details[0].message });
    }
    next();
};

export const updateBorrowerValidationMiddleware = (
    req: any,
    res: any,
    next: any
) => {
    const result = updateBorrowerSchema.validate(req.body);
    if (result.error) {
        return res
            .status(400)
            .json({ message: result.error.details[0].message });
    }
    next();
};

export const borrowerByIdValidationMiddleware = (
    req: any,
    res: any,
    next: any
) => {
    const result = borrowerByIdSchema.validate(req.params);
    console.log("-----------------------", result)
    res.locals.id = result.value.id
    if (result.error) {
        return res
            .status(400)
            .json({ message: result.error.details[0].message });
    }
    next();
};