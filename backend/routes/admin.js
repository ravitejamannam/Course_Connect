const { Router } = require("express");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const { z } = require("zod");
const { adminModel, courseModel } = require("../db");
const { adminMiddleware } = require("../middleware/admin");
const { JWT_ADMIN_PASSWORD } = require("../config");

const adminRouter = Router();

// Zod schema for admin validation
const adminSchema = z.object({
    email: z.string().email("Invalid email address"),
    password: z.string().min(6, "Password must be at least 6 characters long"),
    firstName: z.string().min(1, "First name is required"),
    lastName: z.string().min(1, "Last name is required"),
});

adminRouter.post("/signup", async function(req, res) {
    try {
        // Validate admin data
        const validation = adminSchema.safeParse(req.body);
        if (!validation.success) {
            return res.status(400).json({ errors: validation.error.errors });
        }

        const { email, password, firstName, lastName } = req.body;

        // Check if the email already exists
        const existingAdmin = await adminModel.findOne({ email });
        if (existingAdmin) {
            return res.status(400).json({ message: "Email already in use" });
        }

        // Hash the password
        const hashedPassword = await bcrypt.hash(password, 10);

        // Create a new admin
        await adminModel.create({
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

adminRouter.post("/signin", async function(req, res) {
    try {
        const { email, password } = req.body;

        const admin = await adminModel.findOne({ email });
        if (admin) {
            const isPasswordValid = await bcrypt.compare(password, admin.password);
            if (isPasswordValid) {
                const token = jwt.sign({ id: admin._id }, JWT_ADMIN_PASSWORD);

                
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

// Protect routes with adminMiddleware
adminRouter.use(adminMiddleware);

adminRouter.post("/course", async function(req, res) {
    try {
        const { title, description, imageUrl, price } = req.body;

        await courseModel.create({
            title: title,
            description: description,
            imageUrl: imageUrl,
            price: price,
        });

        res.json({
            message: "Course created successfully",
        });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

module.exports = { adminRouter };