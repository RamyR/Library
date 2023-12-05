import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import {
    getUsers,
    countUsers,
    findUserById,
    findUserByUsername,
    createOneUser,
    updateOneUser,
    deleteOneUser,
    createOneBorrower
} from "../dataAccess/User";
import { UserRole } from "@prisma/client";

/**
 * @async
 * @description create user
 * @param  {string} name - full name
 * @param  {string} username - username
 * @param  {string} email - email
 * @param  {string} password - password
 * @param  {UserRole} role - User Type ( Borrower, Admin, Author)
 */
const register = async (
    name: string,
    username: string,
    email: string,
    password: string,
    role: UserRole
) => {
    const existedUser = await findUserByUsername(username);
    if (existedUser) {
        return;
    }
    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = await createOneUser({
        name,
        username,
        email,
        password: hashedPassword,
        role,
    });
    if(role == UserRole.BORROWER && newUser){
        createOneBorrower({userId: newUser.id})
    }
    const token = jwt.sign(
        {
            id: newUser.id,
            username: newUser.username,
            role,
        },
        process.env.TOKEN_SECRET || ""
    );
    return token;
};

/**
 * @async
 * @description login
 * @param  {string} name - full name
 * @param  {string} username - username
 */
const login = async (username: string, password: string) => {
    const user = await findUserByUsername(username);

    if (!user) {
        return;
    }
    const passwordMatch = await bcrypt.compare(password, user.password);

    if (!passwordMatch) {
        return;
    }
    console.log("Token", process.env.Sec);
    const token = jwt.sign(
        {
            id: user.id,
            username: user.username,
            role: user.role,
        },
        process.env.TOKEN_SECRET || ""
    );
    return token;
};

export { register, login };
