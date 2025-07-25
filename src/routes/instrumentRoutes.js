import express from 'express';
import { getInstruments, getInstrument, createInstrument } from '../controllers/instrumentController.js';
import { authenticate } from '../middleware/auth.js';

const router = express.Router();

router.get('/', getInstruments); // Get all instruments
router.get('/:symbol', getInstrument);
router.post('/', authenticate, createInstrument); // Create a new instrument, requires authentication

export default router;