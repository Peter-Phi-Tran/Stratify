import bcrypt from "bcryptjs";
import User from "../models/user.js";
import { generateToken } from "../middleware/auth.js";

export const registerUser = async (req, res, next) => {
    try {
        const { username, email, password } = req.body;

        // Hash the password
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        // Create a new user
        const user = new User({
            username, 
            email,
            passwordHash: hashedPassword
        });

        await user.save();

        // Generate token
        const token = generateToken(user._id);

        res.status(201).json({
            success: true,
            message: 'User registered successfully',
            data: {
                user: {
                    id: user._id,
                    username: user.username,
                    email: user.email
                },
                token
            }
        });
    } catch (error) {
        next(error); // Pass the error to the error handler middleware
    }
};

export const loginUser = async (req, res, next) => {
    try {
        const { email, password } = req.body;

        // Find user 
        const user = await User.findOne({ email });
        if(!user) {
            return res.status(401).json({
                success: false,
                error: 'Invalid credentials'
            });
        }

        const isMatch = await bcrypt.compare(password, user.passwordHash);
        if(!isMatch){
            return res.status(401).json({
                success: false,
                error: 'Invalid credentials'
            });
        }

        const token = generateToken(user._id);

        res.json({
            success: true,
            message: 'Login successful',
            data: {
                user: {
                    id: user._id,
                    username: user.username,
                    email: user.email
                },
                token
            }
        });
    } catch (error) {
        next(error);
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