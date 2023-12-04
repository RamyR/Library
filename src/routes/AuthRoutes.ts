import express from 'express';
import {registerView,loginView } from '../views/AuthView'
import {registerUserValidationMiddware, loginUserValidationMiddleware} from '../middlewares/AuthMiddleware'


const router = express.Router();

// const borrowerController = require('../controllers/BorrowerController')
// const borrowingController = require('../controllers/BorrowingProcessController')
// const validator = require('../handlers/validatorHandler')


// router.get('/books/overdue', borrowingController.getOverdueBooks);

router.post('/register', registerUserValidationMiddware,registerView);
router.post("/login", loginUserValidationMiddleware, loginView);
// router.get('/books/:id', bookController.get);
// router.post('/books', validator.createBookValidator, bookController.create);
// router.put('/books/:id', validator.updateBookValidator , bookController.update);
// router.delete('/books/:id', bookController.destroy);
// router.get('/books/search/:query', bookController.search);
export default router;