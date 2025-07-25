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

const app = express();