import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import rateLimit from 'express-rate-limit';

import authRoutes from './routes/authRoutes.js';
import instrumentRoutes from './routes/instrumentRoutes.js';
import transactionRoutes from './routes/transactionRoutes.js';
import portfolioRoutes from './routes/portfolioRoutes.js';
import marketDataRoutes from './routes/marketDataRoutes.js';

import { errorHandler } from './middleware/errorHandler.js';
import { config } from './config/environment.js';

import cookieParser from 'cookie-parser';
import socketRoutes from './routes/socketRoutes.js';


const app = express();

app.use(helmet()); // Security middleware to set various HTTP headers
app.use(cors()); // Enable CORS for all routes
app.use(cookieParser()); // Parse cookies from request headers
app.use('/api/socket', socketRoutes); // Socket routes

const limiter = rateLimit({
    windowMs: 15 * 60 * 1000, // 15 minutes
    max: 100, // Limit each IP to 100 requests per windowMs
    message: 'Too many requests, please try again later.'
});
app.use('/api', limiter);

app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ extended: true }));

app.use('/api/auth', authRoutes);
app.use('/api/instruments', instrumentRoutes);
app.use('/api/transactions', transactionRoutes);
app.use('/api/portfolios', portfolioRoutes);
app.use('/api/market-data', marketDataRoutes);

app.get('/api/health', (req, res) => {
    res.json({
        success: true,
        message: 'Stratify API is running',
        timestamp: new Date().toISOString()
    });
});

app.use('/*splat', (req, res) => {
    res.status(404).json({
        success: false,
        error: 'Route Not Found'
    });
});

app.use(errorHandler);
export default app;