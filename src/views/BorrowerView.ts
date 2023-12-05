import {getAllBorrowers, updateBorrower, deleteBorrower} from '../controllers/BorrowerController';
import handlePrismaError from '../validators/PrismaValidator'


const getAll = async (req: any, res: any) => {
    try {
        
        const { page = 1, count = 10 } = req.params;
        const { borrowers, borrowersCount } = await getAllBorrowers(page, count); 
        return res.status(200).json({ data: borrowers, total: borrowersCount, page });
    } catch (error) {
        return res.status(400).json(handlePrismaError(error));
    }
};
const update = async (req: any, res: any) => {
    try {
        const { id, name, username, email, password } = req.body;
        const borrower = await updateBorrower( id,  name, username, email, password  ); 
        return res.status(200).json({ borrower: borrower });
    } catch (error) {
        return res.status(400).json(handlePrismaError(error));
    }
};

const destroy = async (req: any, res: any) => {
    try {
        
        const id = res.locals.id;
        const borrower = await deleteBorrower(id); 
        return res.status(200).json({ message: 'Borrower was deleted successfuly!' });
    } catch (error) {
        return res.status(400).json(handlePrismaError(error));
    }
};
export {getAll, update, destroy}