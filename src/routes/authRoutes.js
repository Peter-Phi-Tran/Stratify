// src/routes/authRoutes.js
import express from 'express';
import { authenticate } from '../middleware/auth.js';
import {
  registerUser,
  loginUser,
  getProfile,
  refreshAccessToken
} from '../controllers/authController.js';
import {
  validateUser,
  checkValidationErrors
} from '../middleware/validation.js';

const router = express.Router();

router.post('/register', validateUser, checkValidationErrors, registerUser);
router.post('/login',    loginUser);
router.get('/refresh',   refreshAccessToken);          // new route
router.get('/profile',   authenticate, getProfile);

export default router;
