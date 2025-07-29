import { body, validationResult } from 'express-validator';

// Validation for user registration and login
export const validateUser = [ 
    body('username')
        .isLength({ min: 3, max: 20 })
        .withMessage('Username must be between 3 and 20 characters')
        .matches(/^[a-zA-Z0-9_]+$/) // Only alphanumeric characters and underscores
        .withMessage('Username can only contain letters, numbers, and underscores'),

    body('email')
        .isEmail()
        .withMessage('Please provide a valid email address'),
    
    body('password')
        .isLength({ min: 8 })
        .withMessage('Password must be at least 8 characters long')
        .matches(/[!@#$%^&*(),.?":{}|<>]/)
        .withMessage('Password must contain at least one special character')
];

// Validation for market data transactions
export const validateTransaction = [
    body('type')
        .isIn(['buy', 'sell'])
        .withMessage('Transaction type must be either buy or sell'),
    body('symbol')
        .isLength({ min: 1, max: 10}) // Assuming symbol is a stock ticker or crypto symbol
        .withMessage('Symbol is required and must be valid'),
    body('quantity')
        .isNumeric()
        .withMessage('Quantity must be a number')
        .custom((value) => {
            if( value <= 0 ){
                throw new Error('Quantity must be greater than zero');
            }
            return true;
        }),
    body('price')
        .isNumeric()
        .withMessage('Price must be a valid number')
        .custom((value) => {
            if( value <= 0 ){
                throw new Error('Price must be greater than zero');
            }
            return true;
        })
];

// Middleware to check for validation errors
export const checkValidationErrors = (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()){
        return res.status(400).json({ 
            success: false,
            error: 'Validation failed',
            details: errors.array()
        });
    }
    next();
};