import {getAllBooks, createBook, getBook, updateBook, deleteBook, searchBooksByQuery} from '../controllers/BookController';
import handlePrismaError from '../validators/PrismaValidator'


const getAll = async (req: any, res: any) => {
    try {
        
        const { page = 1, count = 10 } = req.params;
        const { books, booksCount } = await getAllBooks(page, count); 
        return res.status(200).json({ data: books, total: booksCount, page });
    } catch (error) {
        return res.status(400).json(handlePrismaError(error));
    }
};

const create = async (req: any, res: any) => {
    try {
        
        const { title, quantity, isbn, shelfLocation, authorId, authorName } = req.body;
        const book  = await createBook(title, quantity, isbn, shelfLocation, authorId, authorName); 
        if(!book) return res.status(400).json({ Error: `The Book was not created, please make sure you have entered a valid data` })
        return res.status(201).json({ data: book });
    } catch (error) {
        return res.status(400).json(handlePrismaError(error));
    }
};

const get = async (req: any, res: any) => {
    try {
        const id = res.locals.id;
        const book = await getBook(id); 
        return res.status(200).json({ book: book });
    } catch (error) {
        return res.status(400).json(handlePrismaError(error));
    }
};

const update = async (req: any, res: any) => {
    try {
        const { id, title, quantity, isbn, shelfLocation, authorId, authorName } = req.body;
        const book = await updateBook( id, title, quantity, isbn, shelfLocation, authorId, authorName ); 
        return res.status(200).json({ book: book });
    } catch (error) {
        return res.status(400).json(handlePrismaError(error));
    }
};

const destroy = async (req: any, res: any) => {
    try {
        
        const id = res.locals.id;
        const book = await deleteBook(id); 
        return res.status(200).json({ message: 'Book was deleted successfuly!' });
    } catch (error) {
        return res.status(400).json(handlePrismaError(error));
    }
};

const search = async (req: any, res: any) => {
    try {
        
        const searchQuery = res.locals.query;
        const books = await searchBooksByQuery(searchQuery); 
        return res.status(200).json({ books: books });
    } catch (error) {
        return res.status(400).json(handlePrismaError(error));
    }
};

export {
    getAll,
    get,
    create,
    update,
    destroy,
    search,
};
