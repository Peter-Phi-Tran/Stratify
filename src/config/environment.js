// src/config/environment.js
import dotenv from 'dotenv';
dotenv.config();

export const config = {
  port:         process.env.PORT      || 5000,
  nodeEnv:      process.env.NODE_ENV  || 'development',
  env:         process.env.NODE_ENV  || 'development',
  mongoUri:     process.env.MONGO_URI,
  jwt: {
    accessSecret:  process.env.JWT_ACCESS_SECRET,
    refreshSecret: process.env.JWT_REFRESH_SECRET,
    accessExpire:  process.env.JWT_ACCESS_EXPIRE || '15m',
    refreshExpire: process.env.JWT_REFRESH_EXPIRE || '7d'
  }
};
