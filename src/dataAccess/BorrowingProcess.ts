import prisma from "../config/db";
import {BorrowingProcess, BorrowingProcessType} from '@prisma/client';

/**
 * @async
 * @description get borrower books
 * @param  {int} borrowerId - borrower ID
 */
export const getBorrowerBooks = async (borrowerId: number) => {
    const books = await prisma.borrowingProcess.findMany({
        where:{
            borrowerId,
            type: BorrowingProcessType.CHECKOUT
        },
        orderBy: {
            createdAt: "desc",
        },
        select: {
            book: true,
            borrowerId: true
        }
    });
    return books;
};

/**
 * @async
 * @description count borrower Books
 * @param  {int} borrowerId - borrower ID
 */
export const countUserBooks = async (borrowerId: number) => {
    const count = await prisma.borrowingProcess.aggregate({_count: true, where: {borrowerId}});
    return count;
};

/**
 * @async
 * @description return borrower books
 * @param  {int} borrowerId - borrower ID
 * @param  {int} bookId - book ID
 */
export const returnBorrowerBooks = async (borrowerId: number, bookId: number) => {
    const books = await prisma.borrowingProcess.updateMany({
        where:{
            borrowerId,
            bookId,
            type: BorrowingProcessType.CHECKOUT
        },
        data: {type: BorrowingProcessType.RETURN, isReturned: true, returnDate: new Date()}
    });
    return books;
};

/**
 * @async
 * @description checkout borrower book
 * @param  {BorrowingProcess} data - Borrowing Process Object
 */
export const checkoutBorrowerBook = async (data: Omit<BorrowingProcess, 'id' | 'createdAt' | 'updatedAt' | 'isReturned' | 'book' | 'borrower' | 'returnDate'>) => {
    const books = await prisma.borrowingProcess.create({
        data: data
    });
    return books;
};

/**
 * @async
 * @description get book remianing quantity
 * @param  {int} bookId - Book ID
 */
export const getBookRemainingQuantity = async (bookId: number) => {
    const checkedOutQuantity = await prisma.borrowingProcess.aggregate({_count: true, where: {bookId, type:BorrowingProcessType.CHECKOUT}});
    const bookQuantity = await prisma.book.findUnique({where:{id: bookId}, select:{quantity:true}});
    return (bookQuantity?.quantity || 0) - checkedOutQuantity._count;
};