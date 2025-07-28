import bcrypt from "bcryptjs";
import User from "../models/user.js";
import { generateAccessToken, generateRefreshToken } from '../middleware/auth.js';
import jwt from 'jsonwebtoken';
import { config } from '../config/environment.js';

export const registerUser = async (req, res, next) => {
  try {
    const { username, email, password } = req.body;

    // hash password
    const salt           = await bcrypt.genSalt(12);
    const passwordHash   = await bcrypt.hash(password, salt);

    const newUser = await User.create({ username, email, passwordHash });

    const accessToken  = generateAccessToken(newUser._id);
    const refreshToken = generateRefreshToken(newUser._id);

    // Send refresh token in http-only cookie
    res.cookie('refreshToken', refreshToken, {
      httpOnly: true,
      sameSite: 'Strict',
      secure:   process.env.NODE_ENV === 'production',
      maxAge:   1000 * 60 * 60 * 24 * 7 // 7 days
    });

    return res.status(201).json({
      success: true,
      data:    {
        user: {
          id:       newUser._id,
          username: newUser.username,
          email:    newUser.email
        },
        accessToken
      }

    });
  } catch (err) {
    next(err);
  }
};

export const loginUser = async (req, res, next) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ email });
    if (!user) {
      return res.status(401).json({ success: false, error: 'Invalid credentials' });
    }

    const isMatch = await bcrypt.compare(password, user.passwordHash);
    if (!isMatch) {
      return res.status(401).json({ success: false, error: 'Invalid credentials' });
    }

    const accessToken  = generateAccessToken(user._id);
    const refreshToken = generateRefreshToken(user._id);

    res.cookie('refreshToken', refreshToken, {
      httpOnly: true,
      sameSite: 'Strict',
      secure:   process.env.NODE_ENV === 'production',
      maxAge:   1000 * 60 * 60 * 24 * 7
    });

    return res.json({
      success: true,
      data:    {
        user: {
          id:       user._id,
          username: user.username,
          email:    user.email
        },
        accessToken
      }
    });

  } catch (err) {
    next(err);
  }
};

/**
 * Refresh-token endpoint – issues a new access token
 * and rotates the refresh token (refresh-token rotation[27]).
 */
export const refreshAccessToken = async (req, res) => {
  try {
    const token = req.cookies.refreshToken;
    if (!token) {
      return res.status(401).json({ success: false, error: 'No refresh token' });
    }

    const decoded = jwt.verify(token, config.jwt.refreshSecret);
    const user    = await User.findById(decoded.userId);
    if (!user) {
      return res.status(401).json({ success: false, error: 'Invalid refresh token' });
    }

    // OPTIONAL: detect refresh-token reuse here (beyond MVP).

    const newAccessToken  = generateAccessToken(user._id);
    const newRefreshToken = generateRefreshToken(user._id);

    // Rotate token
    res.cookie('refreshToken', newRefreshToken, {
      httpOnly: true,
      sameSite: 'Strict',
      secure:   process.env.NODE_ENV === 'production',
      maxAge:   1000 * 60 * 60 * 24 * 7
    });

    return res.json({ success: true, data: { accessToken: newAccessToken } });
  } catch (err) {
    return res.status(401).json({ success: false, error: 'Refresh token expired' });
  }
};

export const getProfile = async (req, res) => {
    res.json({
        success: true,
        data: {
            user: {
                id: req.user._id,
                username: req.user.username,
                email: req.user.email
            }
        }
    });
};