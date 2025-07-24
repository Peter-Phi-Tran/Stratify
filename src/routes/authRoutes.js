import express from 'express';
import { register, login, getProfile } from '../controllers/authController.js';
import { authenticate } from '../middleware/auth.js';
import { validateUser, checkValidationErrors } from '../middleware/validation.js';

const router = express.Router(); // Create a new router instance

router.post('/register', validateUser, checkValidationErrors, register);
router.post('/login', login);
router.get('/profile', authenticate, getProfile);

export default router; // Export the router to be used in the main app


