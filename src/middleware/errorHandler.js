import { config } from '../config/environment.js';

export const errorHandler = (err, req, res, next) => {
    console.error(err.stack); // Log the error stack trace for debugging
    
    // Mongo validation error
    if (err.name === 'ValidationError'){
        const errors = Object.values(err.errors).map(val => val.message);
        return res.status(400).json({ 
            success: false,
            error: 'Validation error',
            details: errors 
        });
    }

    // Mongo duplicate key error
    if (err.code === 11000) {
        const field = Object.keys(err.keyValue)[0];
        return res.status(400).json({
            success: false,
            error: `${field} already exists`
        });
    }

    // JWT errors
    if (err.name === 'JsonWebTokenError'){
        return res.status(401).json({
            success: false,
            error: 'Invalid token'
        });
    }

    // Default error handler
    // Set status code to 500 if not specified & spread into response object adding stack property
    res.status(err.statusCode || 500).json({
        success: false,
        error: config.nodeEnv === 'development' ? err.message : 'Server Error', 
        ...(config.nodeEnv === 'development' && { stack: err.stack })
    });
};


