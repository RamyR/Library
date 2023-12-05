import jwt from "jsonwebtoken";
import {
    registerUserSchema,
    loginUserSchema,
} from "../validators/AuthValidator";
import { UserRole } from "@prisma/client";

const authenticateToken = (req: any, res: any, next: any) => {
    const authHeader = req.headers["authorization"];
    const token = authHeader && authHeader.split(" ")[1];

    if (token == null)
        return res.status(401).json({ message: "You are not authenticated!" });

    jwt.verify(token, process.env.TOKEN_SECRET || "", (err: any, user: any) => {
        console.log(err);

        if (err)
            return res.status(403).json({ message: `invalid token,  ${err}` });

        req.user = user;

        next();
    });
};

const checkIsAdmin = async (req: any, res: any, next: any) => {
    if (req.user.role !== UserRole.ADMIN) {
        return res.status(401).json({ message: "You are not authorized!" });
    }
    next();
};

const checkIsBorrower = async (req: any, res: any, next: any) => {
    if (req.user.role !== UserRole.BORROWER) {
        return res.status(401).json({ message: "You are not authorized! You must be a borrower!" });
    }
    next();
};

const registerUserValidationMiddware = (req: any, res: any, next: any) => {
    const result = registerUserSchema.validate(req.body);
    if (result.error) {
        res.status(400).json({ message: result.error.details[0].message });
        return;
    }
    next();
};

const loginUserValidationMiddleware = (req: any, res: any, next: any) => {
    const result = loginUserSchema.validate(req.body);
    if (result.error) {
        res.status(400).json({ messgae: result.error.details[0].message });
        return;
    }
    next();
};

export {
    loginUserValidationMiddleware,
    registerUserValidationMiddware,
    authenticateToken,
    checkIsAdmin,
    checkIsBorrower,
};
