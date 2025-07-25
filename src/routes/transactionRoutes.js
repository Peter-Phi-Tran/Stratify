import express from 'express';
import { createTransaction, getTransactions } from '../controllers/transactionController.js';
import { authenticate } from '../middleware/auth.js';
import { validateTransaction, checkValidationErrors } from '../middleware/validation.js';

const router = express.Router();

router.use(authenticate);

router.post('/', validateTransaction, checkValidationErrors, createTransaction);
router.get('/', getTransactions);

export default router;
