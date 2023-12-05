import express from "express";
import {
    getAll,
    checkoutBook,
    returnBorrowerBook,
} from "../views/BorrowingProcessView";
import {
    returnValidationMiddleware,
    checkoutValidationMiddleware,
    getBorrowerBooksValidationMiddleware,
} from "../middlewares/BorrowingProcessMiddleware";
import {
    authenticateToken,
    checkIsBorrower,
} from "../middlewares/AuthMiddleware";

const router = express.Router();

router.get(
    "/list",
    authenticateToken,
    checkIsBorrower,
    getBorrowerBooksValidationMiddleware,
    getAll
);
router.post(
    "/checkout",
    authenticateToken,
    checkIsBorrower,
    checkoutValidationMiddleware,
    checkoutBook
);
router.put(
    "/return",
    authenticateToken,
    checkIsBorrower,
    returnValidationMiddleware,
    returnBorrowerBook
);

export default router;
