import {
    getBooks,
    countBooks,
    findBookById,
    createOneBook,
    updateOneBook,
    deleteOneBook,
} from "../dataAccess/Book";

const getAllBooks = async (page: number, count: number) => {
    const offset = (page - 1) * count;
    return { books: await getBooks(offset, count), booksCount: countBooks() };
};

const createBook = async (
    title: string,
    quantity: number,
    isbn: string,
    shelfLocation: string,
    authorId: number
) => {
    const book = await createOneBook({
        title,
        quantity,
        isbn,
        shelfLocation,
        authorId,
    });
    return book;
};

export { getAllBooks, createBook };
