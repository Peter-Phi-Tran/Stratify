// src/middleware/auth.js
import jwt from 'jsonwebtoken';
import User from '../models/user.js';
import { config } from '../config/environment.js';

/**
 * Issue a signed access token for a given userId.
 */
export const generateAccessToken = (userId) =>
  jwt.sign({ userId }, config.jwt.accessSecret, {
    expiresIn: config.jwt.accessExpire
  });

/**
 * Issue a signed refresh token (stored client-side, ideally in an Http-Only cookie).
 */
export const generateRefreshToken = (userId) =>
  jwt.sign({ userId }, config.jwt.refreshSecret, {
    expiresIn: config.jwt.refreshExpire
  });

/**
 * Middleware to authenticate incoming requests via the Authorization header.
 * Expects:  Authorization: Bearer <token>
 */
export const authenticate = async (req, res, next) => {
  try {
    const authHeader = req.header('Authorization') || '';
    const token      = authHeader.startsWith('Bearer ')
      ? authHeader.substring(7)
      : null;

    if (!token) {
      return res.status(401).json({ success: false, error: 'No token provided' });
    }

    // Verify signature & expiry
    const decoded = jwt.verify(token, config.jwt.accessSecret);
    const user    = await User.findById(decoded.userId).select('-passwordHash');

    if (!user) {
      return res.status(401).json({ success: false, error: 'User not found' });
    }

    req.user = user;          // attach to downstream handlers
    next();
  } catch (err) {
    // Token expired or invalid
    return res.status(401).json({ success: false, error: 'Invalid or expired token' });
  }
};
