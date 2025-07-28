import express from 'express';
import { 
  createPortfolio, 
  getPortfolios, 
  getPortfolio, 
  updatePortfolio
} from '../controllers/portfolioController.js';
import { authenticate } from '../middleware/auth.js';

const router = express.Router();

router.use(authenticate); // All portfolio routes require authentication

router.post('/', createPortfolio);
router.get('/', getPortfolios);
router.get('/:id', getPortfolio);
router.put('/:id/update-value', updatePortfolio);

export default router;
