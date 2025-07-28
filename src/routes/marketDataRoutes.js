import express from 'express';
import { 
  getMarketData, 
  getLatestPrice, 
  addMarketData 
} from '../controllers/marketDataController.js';
import { authenticate } from '../middleware/auth.js';

const router = express.Router();

router.get('/', getMarketData);
router.get('/latest/:symbol', getLatestPrice);
router.post('/', authenticate, addMarketData); // Only authenticated users can add data

export default router;
