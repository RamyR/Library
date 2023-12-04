import prisma from "../config/db";
import {Book} from '@prisma/client';

/**
 * @async
 * @description get books
 * @param  {int} offset - pagination offset
 * @param  {int} count - pagination limit
 */
export const getBooks = async (offset: number, count: number) => {
    const books = await prisma.book.findMany({
        skip: offset,
        take: count,
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
 * @description get books
 * @param  {Book} data - book data
 */
export const createOneBook = async (data: Omit<Book, 'id' | 'createdAt' | 'updatedAt' | 'author'>) => {
    const book = await prisma.book.create({ data: data });
    return book;
};

/**
 * @async
 * @description get books
 * @param  {int} id - book id
 * @param  {Book} data - book data
 */
export const updateOneBook = async (id: number, data: Partial<Omit<Book, 'id' | 'createdAt' | 'updatedAt'>>) => {
    const book = await prisma.book.update({ where: { id: id }, data: data });
    return book;
};

/**
 * @async
 * @description get books
 * @param  {int} id - book id
 */
export const deleteOneBook = async (id: number) => {
    const book = await prisma.book.delete({ where: { id: id } });
    return book;
};
