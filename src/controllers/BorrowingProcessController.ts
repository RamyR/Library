import {
    getBorrowerBooks,
    checkoutBorrowerBook,
    returnBorrowerBooks,
    countUserBooks,
    getBookRemainingQuantity
} from "../dataAccess/BorrowingProcess";
import bcrypt from "bcrypt";
import { BorrowingProcessType } from "@prisma/client";

const getBooks = async (borrowerId: number) => {
    return {
        books: await getBorrowerBooks(borrowerId),
        booksCount: countUserBooks(borrowerId),
    };
};

const checkout = async (borrowerId: number, bookId: number, dueDate: Date) => {
    const remaingQuantity = await getBookRemainingQuantity(bookId);
    if(!remaingQuantity){
        return -1;
    }
    console.log('-----------------FINAL DATA', remaingQuantity, borrowerId, bookId, dueDate)
    const borrower = await checkoutBorrowerBook({
        borrowerId,
        bookId,
        dueDate,
        type: BorrowingProcessType.CHECKOUT,
    });
    return borrower;
};

const returnBook = async (borrowerId: number, bookId: number) => {
    return await returnBorrowerBooks(borrowerId, bookId);
};

export { getBooks, checkout, returnBook };
