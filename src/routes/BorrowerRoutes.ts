import express from 'express';
import { getAll, update, destroy } from '../views/BorrowerView'
import { getBorrowersValidationMiddleware, updateBorrowerValidationMiddleware, borrowerByIdValidationMiddleware} from '../middlewares/BorrowerMiddleware'
import {authenticateToken, checkIsAdmin} from '../middlewares/AuthMiddleware'
import rateLimitMiddleware  from '../middlewares/RateLimiterMiddleware'


const router = express.Router();


router.get('/list', rateLimitMiddleware, authenticateToken, checkIsAdmin,getBorrowersValidationMiddleware,getAll);
router.put('/update', authenticateToken , updateBorrowerValidationMiddleware, update);
router.delete('/:id', authenticateToken, borrowerByIdValidationMiddleware, destroy);


export default router;