import {getBooks, checkout, returnBook} from '../controllers/BorrowingProcessController';
import handlePrismaError from '../validators/PrismaValidator'


const getAll = async (req: any, res: any) => {
    try {
        
        const { page = 1, count = 10 } = req.params;
        const { books, booksCount } = await getBooks(req.user.id); 
        return res.status(200).json({ data: books, total: booksCount, page });
    } catch (error) {
        return res.status(400).json(handlePrismaError(error));
    }
};
const checkoutBook = async (req: any, res: any) => {
    try {
        console.log("------------------------USER ID------------------",req.user, req.user.id)
        const { bookId, dueDate } = req.body;
        const borrower = await checkout( req.user.id,  bookId, dueDate ); 
        return res.status(200).json({ borroweringProcess: borrower });
    } catch (error) {
        return res.status(400).json(handlePrismaError(error));
    }
};

const returnBorrowerBook = async (req: any, res: any) => {
    try {
        
        const { bookId } = req.body;
        const borrower = await returnBook(req.user.id, bookId); 
        return res.status(200).json({ message: 'Book was returned successfuly!' });
    } catch (error) {
        return res.status(400).json(handlePrismaError(error));
    }
};
export {getAll, checkoutBook, returnBorrowerBook}