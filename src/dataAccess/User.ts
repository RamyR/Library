import prisma from "../config/db";
import { User, UserRole, Borrower} from '@prisma/client';

/**
 * @async
 * @description get users
 * @param  {int} skip - pagination offset
 * @param  {int} take - pagination limit
 */
export const getUsers = async (skip: number, take: number) => {
    const users = await prisma.user.findMany({
        skip,
        take,
        orderBy: {
            name: "desc",
        },
    });
    return users;
};


/**
 * @async
 * @description get borrowers
 * @param  {int} skip - pagination offset
 * @param  {int} take - pagination limit
 */
export const getBorrowers = async (skip: number, take: number, ) => {
    const users = await prisma.user.findMany({
        where: {role: UserRole.BORROWER},
        skip,
        take,
        orderBy: {
            name: "desc",
        },
    });
    return users;
};


/**
 * @async
 * @description count users records
 */
export const countUsers = async () => {
    const count = await prisma.user.count();
    return count;
};

/**
 * @async
 * @description get user
 * @param  {int} id - user ID
 */
export const findUserById = async (id: number) => {
    const user = await prisma.user.findUnique({
        where: {
            id: id,
        },
    });
    return user;
};


/**
 * @async
 * @description get user
 * @param  {string} username - username
 */
export const findUserByUsername = async (username: string) => {
    const user = await prisma.user.findUnique({
        where: {
            username: username,
        },
    });
    return user;
};

/**
 * @async
 * @description get users
 * @param  {Object} data - user data
 */
export const createOneUser = async (data: Omit<User, 'id' | 'createdAt' | 'updatedAt'>) => {
    console.log("New User",data)
    const user = await prisma.user.create({ data: data });
    return user;
};

/**
 * @async
 * @description get users
 * @param  {Object} data - user data
 */
export const createOneBorrower = async (data: Omit<Borrower,'createdAt' | 'updatedAt' | 'user'>) => {
    console.log("New Borrower ",data)
    const borrower = await prisma.borrower.create({ data: data });
    return borrower;
};

/**
 * @async
 * @description get users
 * @param  {int} id - user id
 * @param  {Object} data - user data
 */
export const updateOneUser = async (id: number, data: Partial<Omit<User, 'id' | 'createdAt' | 'updatedAt'>>) => {
    const user = await prisma.user.update({ where: { id: id }, data: data });
    return user;
};

/**
 * @async
 * @description get users
 * @param  {int} id - user id
 */
export const deleteOneUser = async (id: number) => {
    const user = await prisma.user.delete({ where: { id: id } });
    return user;
};
