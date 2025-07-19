import jwt from 'jsonwebtoken'; // Importing the jsonwebtoken library for token handling
import User from '../models/user.js';
import { config } from '../config/environment.js';

export const authenticate = async (req, res, next) => { // Middleware to authenticate user based on JWT
    try {
        const token = req.header('Authorization')?.replace('Bearer ', '');
        if (!token) {
            return res.status(401).json({ error: 'Access denied. No token provided.' });
        }

        const decoded = jwt.verify(token, config.jwtSecret);
        const user = await User.findById(decoded.userId);

        if (!user) { return res.status(401).json({ error: 'User not found.' }); } // If user is not found, return 401 Unauthorized
        req.user = user;
        next();
    } catch (error) {
        res.status(401).json({error: 'Invalid token.'});
    }
};

export const generateToken = (userId) => { // Function to generate a JWT token for a user
    return jwt.sign({ userId }, config.jwtSecret, {
        expiresIn: config.jwtExpire
    });
};