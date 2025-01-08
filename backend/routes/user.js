const express = require('express');
const userRouter = express.Router();
const { userModel } = require("../db");
const jwt = require("jsonwebtoken");
const { JWT_SECRET } = require("../config");
const bcrypt = require("bcrypt");

// Authentication middleware
const authMiddleware = async (req, res, next) => {
    try {
        const token = req.headers.authorization?.split(' ')[1];
        if (!token) {
            return res.status(401).json({ message: 'No token provided' });
        }

        const decoded = jwt.verify(token, JWT_SECRET);
        const user = await userModel.findById(decoded.userId);
        
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        req.user = user;
        next();
    } catch (error) {
        return res.status(401).json({ message: 'Invalid token' });
    }
};

// Get profile
userRouter.get("/profile", authMiddleware, async (req, res) => {
    try {
        const user = await userModel.findById(req.user._id)
            .select('-password')
            .populate('purchasedCourses.courseId');
        
        res.json({ user });
    } catch (error) {
        console.error('Profile fetch error:', error);
        res.status(500).json({ 
            message: "Error fetching profile",
            error: error.message 
        });
    }
});

// Update profile
userRouter.put("/profile", authMiddleware, async (req, res) => {
    try {
        const { firstName, lastName, email } = req.body;
        const updatedUser = await userModel.findByIdAndUpdate(
            req.user._id,
            { firstName, lastName, email },
            { new: true }
        ).select('-password');

        res.json({ 
            message: "Profile updated successfully",
            user: updatedUser 
        });
    } catch (error) {
        console.error('Profile update error:', error);
        res.status(500).json({ 
            message: "Error updating profile",
            error: error.message 
        });
    }
});

// Signin route - update to include userId in token
userRouter.post("/signin", async (req, res) => {
    try {
        const { email, password } = req.body;
        const user = await userModel.findOne({ email });

        if (!user || !(await bcrypt.compare(password, user.password))) {
            return res.status(401).json({ message: "Invalid credentials" });
        }

        const token = jwt.sign({ userId: user._id }, JWT_SECRET);
        res.json({
            token,
            user: {
                email: user.email,
                firstName: user.firstName,
                lastName: user.lastName
            }
        });
    } catch (error) {
        res.status(500).json({ message: "Error during signin" });
    }
});

// Signup route
userRouter.post("/signup", async (req, res) => {
    try {
        const { email, password, firstName, lastName } = req.body;
        console.log('Received signup data:', { email, firstName, lastName }); // Debug log

        // Check if user already exists
        const existingUser = await userModel.findOne({ email });
        if (existingUser) {
            return res.status(400).json({
                message: "User already exists"
            });
        }

        // Hash password
        const hashedPassword = await bcrypt.hash(password, 10);

        // Create user
        const user = await userModel.create({
            email,
            password: hashedPassword,
            firstName,
            lastName
        });

        // Generate token
        const token = jwt.sign({ userId: user._id }, JWT_SECRET);

        console.log('User created successfully:', user._id); // Debug log

        res.json({
            message: "User created successfully",
            token,
            user: {
                email: user.email,
                firstName: user.firstName,
                lastName: user.lastName
            }
        });

    } catch (error) {
        console.error('Signup error:', error);
        res.status(500).json({
            message: "Error creating user",
            error: error.message
        });
    }
});

userRouter.post('/register', async (req, res) => {
    const { firstName, lastName, email, password, role } = req.body; // Include role

    try {
        // Check if the user already exists
        const existingUser = await userModel.findOne({ email });
        if (existingUser) {
            return res.status(400).json({ message: 'User already exists' });
        }

        // Hash the password
        const hashedPassword = await bcrypt.hash(password, 10);

        // Create a new user with the specified role
        const newUser = await userModel.create({
            firstName,
            lastName,
            email,
            password: hashedPassword,
            role: role || 'user' // Default to 'user' if not provided
        });

        // Generate a token
        const token = jwt.sign({ userId: newUser._id }, JWT_SECRET, { expiresIn: '1h' });

        res.status(201).json({
            message: 'User registered successfully',
            user: {
                id: newUser._id,
                firstName: newUser.firstName,
                lastName: newUser.lastName,
                email: newUser.email,
                role: newUser.role
            },
            token // Send the token back to the client
        });
    } catch (error) {
        console.error('Registration error:', error);
        res.status(500).json({ message: 'Error registering user', error: error.message });
    }
});

userRouter.post('/signin', async (req, res) => {
    const { email, password, role } = req.body; // Include role if needed

    try {
        // Find the user by email
        const user = await userModel.findOne({ email });
        if (!user) {
            return res.status(400).json({ message: 'User not found' });
        }

        // Check if the password is correct
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(400).json({ message: 'Invalid credentials' });
        }

        // Generate a token
        const token = jwt.sign({ userId: user._id, role: user.role }, JWT_SECRET, { expiresIn: '1h' });

        res.status(200).json({
            message: 'Signin successful',
            user: {
                id: user._id,
                firstName: user.firstName,
                lastName: user.lastName,
                email: user.email,
                role: user.role
            },
            token // Send the token back to the client
        });
    } catch (error) {
        console.error('Signin error:', error);
        res.status(500).json({ message: 'Error signing in', error: error.message });
    }
});

module.exports = {
    userRouter
};