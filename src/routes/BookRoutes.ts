import express from 'express';
import {getAll,
    get,
    create,
    update,
    destroy,
    search} from '../views/BookView'
import {getBooksValidationMiddleware, createBookValidationMiddleware, bookByIdValidationMiddleware, updateBookValidationMiddleware, searchBookValidationMiddleware} from '../middlewares/BookMiddleware'
import {authenticateToken, checkIsAdmin} from '../middlewares/AuthMiddleware'
import rateLimitMiddleware  from '../middlewares/RateLimiterMiddleware'


const router = express.Router();

router.get('/list', rateLimitMiddleware, authenticateToken, checkIsAdmin, getBooksValidationMiddleware,getAll);
router.get('/:id', authenticateToken, bookByIdValidationMiddleware, get);
router.post('/create', authenticateToken, checkIsAdmin, createBookValidationMiddleware, create);
router.put('/update', authenticateToken, checkIsAdmin , updateBookValidationMiddleware, update);
router.delete('/:id', authenticateToken, checkIsAdmin, bookByIdValidationMiddleware, destroy);
router.get('/search/:query', authenticateToken, searchBookValidationMiddleware, search);
export default router;