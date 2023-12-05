import {
    getBooks,
    countBooks,
    findBookById,
    createOneBook,
    updateOneBook,
    deleteOneBook,
    findAuthorByName,
    createOneAuthor,
    searchBooks
} from "../dataAccess/Book";

const getAllBooks = async (page: number, count: number) => {
    const offset = (page - 1) * count;
    return { books: await getBooks(offset, count), booksCount: countBooks() };
};

const getBook = async (id: number) => {
    return await findBookById(id)
};

const deleteBook = async (id: number) => {
    return await deleteOneBook(id)
};

const searchBooksByQuery = async (query: string) => {
    return await searchBooks(query)
};

const createBook = async (
    title: string,
    quantity: number,
    isbn: string,
    shelfLocation: string,
    authorId?: number,
    authorName?: string
) => {
    if (!authorId && authorName) {
        let author = await findAuthorByName(authorName);
        if (author) {
            authorId = author?.id;
        } else {
            author = await createOneAuthor({name: authorName});
            authorId = author.id
        }
    }
    if (!authorId) return null;
    const book = await createOneBook({
        title,
        quantity,
        isbn,
        shelfLocation,
        authorId,
    });
    return book;
};

const updateBook = async (
    id: number,
    title?: string,
    quantity?: number,
    isbn?: string,
    shelfLocation?: string,
    authorId?: number,
    authorName?: string
) => {
    if (!authorId && authorName) {
        let author = await findAuthorByName(authorName);
        if (author) {
            authorId = author?.id;
        } else {
            author = await createOneAuthor({name: authorName});
            authorId = author.id
        }
    }
    const book = await updateOneBook(id,{
        title,
        quantity,
        isbn,
        shelfLocation,
        authorId,
    });
    return book;
};

const createAuthor = async (name: string) => {
    const author = await createOneAuthor({
        name,
    });
    return author;
};

export { getAllBooks, createBook, createAuthor, getBook, updateBook, deleteBook, searchBooks, searchBooksByQuery };
