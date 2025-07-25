import express from 'express';
import { getPortfolio, createPortfolio, getPortfolios, updatePortfolioValue } from '../controllers/portfolioController.js';
import { authenticate } from '../middleware/auth.js';

const router = express.Router();

router.use(authenticate); // Apply authentication middleware to all routes

router.post('/', createPortfolio);
router.get('/', getPortfolios);
router.get('/:id', getPortfolio);
router.put('/:id/update-value', updatePortfolioValue);

export default router; // Export the router to be used in the main app;
