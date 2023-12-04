import {register, login} from '../controllers/AuthController'
import handlePrismaError from '../validators/PrismaValidator'

/**
 * @async
 * @description create user
 * @param  {Object} req - Express request object
 * @param  {Object} res - Express response object
 */
const registerView = async (req: any, res: any) => {
    try {
        const { name, username, email, password, role } = req.body;
        const token = await register(name, username, email, password, role)
        if (!token) {
            return res.status(400).json({ message: "username already existed" });
        }
        return res.status(200).json({ token });
    } catch (error) {
        return res.status(400).json(handlePrismaError(error));
    }
};

/**
 * @async
 * @description login
 * @param  {Object} req - Express request object
 * @param  {Object} res - Express response object
 */
const loginView = async (req: any, res: any) => {
    try {
        const { username, password } = req.body;
        const token = await login(username, password);

        if (!token) {
            return res.status(401).json({ message: "Incorrect Username or Password" });
        }
        return res.status(200).json({ token });
    } catch (error) {
        return res.status(400).json(handlePrismaError(error));
    }
};

export {registerView, loginView}
