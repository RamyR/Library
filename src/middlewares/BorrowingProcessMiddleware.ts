import {
    borrowerByIdSchema, 
    returnBorroweringProcessSchema,
    createBorroweringProcessSchema,
    allBorroweringProcessSchema
} from "../validators/BorrowingProcessValidator";

export const getBorrowerBooksValidationMiddleware = (req: any, res: any, next: any) => {
    const result = allBorroweringProcessSchema.validate(req.query);
    if (result.error) {
        return res
            .status(400)
            .json({ message: result.error.details[0].message });
    }
    next();
};

export const checkoutValidationMiddleware = (
    req: any,
    res: any,
    next: any
) => {
    const result = createBorroweringProcessSchema.validate(req.body);
    if (result.error) {
        return res
            .status(400)
            .json({ message: result.error.details[0].message });
    }
    next();
};

export const returnValidationMiddleware = (
    req: any,
    res: any,
    next: any
) => {
    const result = returnBorroweringProcessSchema.validate(req.body);
    if (result.error) {
        return res
            .status(400)
            .json({ message: result.error.details[0].message });
    }
    next();
};
