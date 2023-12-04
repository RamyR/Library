import prisma from "../config/db";
import {Book, Author} from '@prisma/client';

/**
 * @async
 * @description get books
 * @param  {int} skip - pagination offset
 * @param  {int} take - pagination limit
 */
export const getBooks = async (skip: number, take: number) => {
    const books = await prisma.book.findMany({
        skip,
        take,
        orderBy: {
            title: "desc",
        },
    });
    return books;
};

/**
 * @async
 * @description search books
 * @param  {string} query - search query - (Author Name | Title | ISBN)
 */
export const searchBooks = async (query: string) => {
    const books = await prisma.book.findMany({
        where:{
            OR:[
                {'title': {contains: query}},
                {'isbn': {contains: query}},
                {'author':{"name": {contains: query}}}
            ]
        },
        orderBy: {
            title: "desc",
        },
    });
    return books;
};


/**
 * @async
 * @description count books records
 */
export const countBooks = async () => {
    const count = await prisma.book.count();
    return count;
};

/**
 * @async
 * @description get book
 * @param  {int} id - book ID
 */
export const findBookById = async (id: number) => {
    const book = await prisma.book.findUnique({
        where: {
            id: id,
        },
    });
    return book;
};

/**
 * @async
 * @description create book
 * @param  {Book} data - book data
 */
export const createOneBook = async (data: Omit<Book, 'id' | 'createdAt' | 'updatedAt' | 'author'>) => {
    const book = await prisma.book.create({ data: data });
    return book;
};

/**
 * @async
 * @description update book
 * @param  {int} id - book id
 * @param  {Book} data - book data
 */
export const updateOneBook = async (id: number, data: Partial<Omit<Book, 'id' | 'createdAt' | 'updatedAt'>>) => {
    const book = await prisma.book.update({ where: { id: id }, data: data });
    return book;
};

/**
 * @async
 * @description delete book
 * @param  {int} id - book id
 */
export const deleteOneBook = async (id: number) => {
    const book = await prisma.book.delete({ where: { id: id } });
    return book;
};


/**
 * @async
 * @description get author
 * @param  {string} name - author name
 */
export const findAuthorByName = async (name: string) => {
    const author = await prisma.author.findUnique({
        where: {
            name
        },
        select:{id:true}
    });
    return author;
};


/**
 * @async
 * @description create author
 * @param  {Author} data - book data
 */
export const createOneAuthor = async (data: Omit<Author, 'id' | 'createdAt' | 'updatedAt' >) => {
    const author = await prisma.author.create({ data: data });
    return author;
};
