import express from 'express';
import { getMarketData, getLatestPrice, addMakretData } from '../controllers/marketDataController.js';
import { authenticate } from '../middleware/auth.js';

const router = express.Router();

router.get('/', getMarketData);
router.get('/latest/:symbol', getLatestPrice);
router.post('/', authenticate, addMarketData); // Ensure authentication for adding market data

export default router; // Export the router to be used in the main app