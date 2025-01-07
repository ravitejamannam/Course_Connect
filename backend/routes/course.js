const express = require('express');
const courseRouter = express.Router();
const { courseModel } = require("../models/Course");
const { authMiddleware, isAdmin } = require("../middleware/auth");
const multer = require('multer');
const path = require('path');
const { userModel } = require("../models/User");

// Configure multer for image upload
const storage = multer.diskStorage({
    destination: 'uploads/',
    filename: function(req, file, cb) {
        cb(null, Date.now() + path.extname(file.originalname));
    }
});

const upload = multer({ storage: storage });

// Create course (admin only)
courseRouter.post("/", authMiddleware, isAdmin, upload.single('image'), async (req, res) => {
    try {
        const { title, description, price, originalPrice } = req.body;
        const imageUrl = `/uploads/${req.file.filename}`;

        const course = await courseModel.create({
            title,
            description,
            price,
            originalPrice,
            imageUrl,
            createdBy: req.user._id
        });

        res.json({
            message: "Course created successfully",
            course
        });
    } catch (error) {
        console.error('Course creation error:', error);
        res.status(500).json({
            message: "Error creating course",
            error: error.message
        });
    }
});

// Get all published courses
courseRouter.get("/", async (req, res) => {
    try {
        const courses = await courseModel.find({ published: true })
            .select('-createdBy')
            .sort('-createdAt');
        res.json({ courses });
    } catch (error) {
        res.status(500).json({
            message: "Error fetching courses",
            error: error.message
        });
    }
});

// Get course by ID
courseRouter.get("/:id", async (req, res) => {
    try {
        const course = await courseModel.findById(req.params.id)
            .select('-createdBy');
        if (!course) {
            return res.status(404).json({ message: "Course not found" });
        }
        res.json({ course });
    } catch (error) {
        res.status(500).json({
            message: "Error fetching course",
            error: error.message
        });
    }
});

// Update course (admin only)
courseRouter.put("/:id", authMiddleware, isAdmin, upload.single('image'), async (req, res) => {
    try {
        const updateData = { ...req.body };
        if (req.file) {
            updateData.imageUrl = `/uploads/${req.file.filename}`;
        }

        const course = await courseModel.findByIdAndUpdate(
            req.params.id,
            updateData,
            { new: true }
        );

        if (!course) {
            return res.status(404).json({ message: "Course not found" });
        }

        res.json({
            message: "Course updated successfully",
            course
        });
    } catch (error) {
        res.status(500).json({
            message: "Error updating course",
            error: error.message
        });
    }
});

// Delete course (admin only)
courseRouter.delete("/:id", authMiddleware, isAdmin, async (req, res) => {
    try {
        const course = await courseModel.findByIdAndDelete(req.params.id);
        if (!course) {
            return res.status(404).json({ message: "Course not found" });
        }
        res.json({ message: "Course deleted successfully" });
    } catch (error) {
        res.status(500).json({
            message: "Error deleting course",
            error: error.message
        });
    }
});

// Add this to your courseRouter
courseRouter.post("/:id/purchase", authMiddleware, async (req, res) => {
    try {
        const courseId = req.params.id;
        const userId = req.user._id;

        // Check if course exists
        const course = await courseModel.findById(courseId);
        if (!course) {
            return res.status(404).json({ message: "Course not found" });
        }

        // Check if user already purchased the course
        const user = await userModel.findById(userId);
        const alreadyPurchased = user.purchasedCourses.some(
            purchase => purchase.courseId.toString() === courseId
        );

        if (alreadyPurchased) {
            return res.status(400).json({ message: "Course already purchased" });
        }

        // Add course to user's purchased courses
        user.purchasedCourses.push({ courseId });
        await user.save();

        res.json({ 
            message: "Course purchased successfully",
            purchase: {
                courseId,
                purchaseDate: new Date()
            }
        });
    } catch (error) {
        console.error('Purchase error:', error);
        res.status(500).json({
            message: "Error purchasing course",
            error: error.message
        });
    }
});

module.exports = {
    courseRouter
};