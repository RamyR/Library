import express from 'express';
import {getAll, create} from '../views/BookView'
import {getBooksValidationMiddleware, createBookValidationMiddleware} from '../middlewares/BookValidatorMiddleware'
import {authenticateToken, checkIsAdmin} from '../middlewares/AuthMiddleware'


const router = express.Router();

// const borrowerController = require('../controllers/BorrowerController')
// const borrowingController = require('../controllers/BorrowingProcessController')
// const validator = require('../handlers/validatorHandler')


// router.get('/books/overdue', borrowingController.getOverdueBooks);

router.get('/list', authenticateToken, checkIsAdmin, getBooksValidationMiddleware,getAll);
// router.get('/books/:id', bookController.get);
router.post('/create', authenticateToken, checkIsAdmin, createBookValidationMiddleware, create);
// router.put('/books/:id', validator.updateBookValidator , bookController.update);
// router.delete('/books/:id', bookController.destroy);
// router.get('/books/search/:query', bookController.search);
export default router;