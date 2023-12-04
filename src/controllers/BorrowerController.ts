import {
    getBorrowers,
    countUsers,
    updateOneUser,
    deleteOneUser,
} from "../dataAccess/User";
import bcrypt from "bcrypt";

const getAllBorrowers = async (page: number, count: number) => {
    const offset = (page - 1) * count;
    return {
        borrowers: await getBorrowers(offset, count),
        borrowersCount: countUsers(),
    };
};

const updateBorrower = async (
    id: number,
    name?: string,
    username?: string,
    email?: string,
    password?: string
) => {
    let data = {
        name,
        username,
        email,
        password,
    };
    if (password) {
        let hashedPassword = await bcrypt.hash(password, 10);
        data.password = hashedPassword;
    }
    const borrower = await updateOneUser(id, data);
    return borrower;
};

const deleteBorrower = async (id: number) => {
    return await deleteOneUser(id);
};

export { getAllBorrowers, updateBorrower, deleteBorrower };
