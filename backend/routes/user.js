const { Router } = require("express");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const { z } = require("zod");
const { userModel, purchaseModel, courseModel } = require("../db");
const { userMiddleware } = require("../middleware/user");
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
        // Validate user data
        const validation = userSchema.safeParse(req.body);
        if (!validation.success) {
            return res.status(400).json({ errors: validation.error.errors });
        }

        const { email, password, firstName, lastName } = req.body;

        // Check if the email already exists
        const existingUser = await userModel.findOne({ email });
        if (existingUser) {
            return res.status(400).json({ message: "Email already in use" });
        }

        // Hash the password
        const hashedPassword = await bcrypt.hash(password, 10);

        // Create a new user
        await userModel.create({
            email: email,
            password: hashedPassword,
            firstName: firstName,
            lastName: lastName,
        });

        res.json({
            message: "Signup succeeded",
        });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

userRouter.post("/signin", async function(req, res) {
    try {
        const { email, password } = req.body;
        
        // Input validation
        if (!email || !password) {
            console.log('Missing credentials:', { email: !!email, password: !!password });
            return res.status(400).json({
                message: "Missing credentials",
                detail: "Email and password are required"
            });
        }

        // Find user
        const user = await userModel.findOne({ email });
        console.log('User lookup:', { 
            email,
            userFound: !!user,
            hashedPasswordExists: !!user?.password
        });

        if (!user) {
            return res.status(403).json({
                message: "Invalid credentials",
                detail: "User not found"
            });
        }

        // Password verification
        try {
            const isPasswordValid = await bcrypt.compare(password, user.password);
            console.log('Password verification:', { 
                email,
                isValid: isPasswordValid,
                inputLength: password.length,
                hashedLength: user.password.length
            });

            if (!isPasswordValid) {
                return res.status(403).json({
                    message: "Invalid credentials",
                    detail: "Password incorrect"
                });
            }
        } catch (bcryptError) {
            console.error('bcrypt error:', bcryptError);
            return res.status(500).json({
                message: "Error verifying password",
                detail: bcryptError.message
            });
        }

        // Generate token
        const token = jwt.sign(
            { id: user._id },
            JWT_USER_PASSWORD,
            { expiresIn: '24h' }
        );

        return res.json({
            token,
            user: {
                email: user.email,
                firstName: user.firstName,
                lastName: user.lastName
            }
        });

    } catch (error) {
        console.error('Signin error:', error);
        return res.status(500).json({
            message: "Server error",
            detail: error.message
        });
    }
});

userRouter.get("/purchases", userMiddleware, async function(req, res) {
    try {
        const userId = req.userId;

        const purchases = await purchaseModel.find({ userId });

        let purchasedCourseIds = [];

        for (let i = 0; i < purchases.length; i++) {
            purchasedCourseIds.push(purchases[i].courseId);
        }

        const coursesData = await courseModel.find({
            _id: { $in: purchasedCourseIds },
        });

        res.json({
            purchases,
            coursesData,
        });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// Add this route to get user profile
userRouter.get("/profile", userMiddleware, async function(req, res) {
    try {
        const userId = req.userId; // From userMiddleware
        
        const user = await userModel.findById(userId).select('-password'); // Exclude password
        
        if (!user) {
            return res.status(404).json({
                message: "User not found"
            });
        }

        res.json({
            user: {
                email: user.email,
                firstName: user.firstName,
                lastName: user.lastName,
                // Add any other user fields you want to return
            }
        });
    } catch (error) {
        console.error('Profile fetch error:', error);
        res.status(500).json({ 
            message: "Error fetching profile",
            error: error.message 
        });
    }
});

// Add this route to update user profile
userRouter.put("/profile", userMiddleware, async function(req, res) {
    try {
        const userId = req.userId;
        const { firstName, lastName, email } = req.body;

        // Validate update data
        const updates = {};
        if (firstName) updates.firstName = firstName;
        if (lastName) updates.lastName = lastName;
        if (email) updates.email = email;

        const updatedUser = await userModel.findByIdAndUpdate(
            userId,
            { $set: updates },
            { new: true }
        ).select('-password');

        if (!updatedUser) {
            return res.status(404).json({
                message: "User not found"
            });
        }

        res.json({
            message: "Profile updated successfully",
            user: {
                email: updatedUser.email,
                firstName: updatedUser.firstName,
                lastName: updatedUser.lastName,
                // Add any other user fields you want to return
            }
        });
    } catch (error) {
        console.error('Profile update error:', error);
        res.status(500).json({ 
            message: "Error updating profile",
            error: error.message 
        });
    }
});

// Add this route to change password
userRouter.put("/change-password", userMiddleware, async function(req, res) {
    try {
        const userId = req.userId;
        const { currentPassword, newPassword } = req.body;

        // Find user
        const user = await userModel.findById(userId);
        if (!user) {
            return res.status(404).json({
                message: "User not found"
            });
        }

        // Verify current password
        const isPasswordValid = await bcrypt.compare(currentPassword, user.password);
        if (!isPasswordValid) {
            return res.status(403).json({
                message: "Current password is incorrect"
            });
        }

        // Hash new password
        const hashedNewPassword = await bcrypt.hash(newPassword, 10);

        // Update password
        await userModel.findByIdAndUpdate(userId, {
            password: hashedNewPassword
        });

        res.json({
            message: "Password updated successfully"
        });
    } catch (error) {
        console.error('Password change error:', error);
        res.status(500).json({ 
            message: "Error changing password",
            error: error.message 
        });
    }
});

module.exports = {
    userRouter: userRouter,
};