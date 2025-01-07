const { Router } = require("express");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const { z } = require("zod");
const { userModel } = require("../db");
const { JWT_USER_PASSWORD } = require("../config");

const userRouter = Router();

// Zod schema for user validation
const userSchema = z.object({
    email: z.string().email("Invalid email address"),
    password: z.string().min(6, "Password must be at least 6 characters long"),
    firstName: z.string().min(1, "First name is required"),
    lastName: z.string().min(1, "Last name is required"),
});

userRouter.post("/signup", async function(req, res) {
    try {
        console.log('Received signup request:', req.body); // Debug log
        const { email, password, firstName, lastName } = req.body;

        // Validate user data
        const userValidation = userSchema.safeParse({
            email,
            password,
            firstName,
            lastName
        });

        if (!userValidation.success) {
            return res.status(400).json({
                message: "Validation failed",
                errors: userValidation.error.errors
            });
        }

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
        const token = jwt.sign({ id: user._id }, JWT_USER_PASSWORD);

        res.json({
            message: "User created successfully",
            token
        });

    } catch (error) {
        console.error('Signup error:', error); // Debug log
        res.status(500).json({
            message: "Error creating user",
            error: error.message
        });
    }
});

userRouter.post("/signin", async function(req, res) {
    try {
        const { email, password } = req.body;

        const user = await userModel.findOne({ email });
        if (user) {
            const isPasswordValid = await bcrypt.compare(password, user.password);
            if (isPasswordValid) {
                const token = jwt.sign({ id: user._id }, JWT_USER_PASSWORD);

                res.json({ token: token });
            } else {
                res.status(403).json({ message: "Invalid credentials" });
            }
        } else {
            res.status(403).json({ message: "Invalid credentials" });
        }
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

module.exports = { userRouter };