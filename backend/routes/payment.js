const express = require('express');
const paymentRouter = express.Router();
const { userModel, courseModel } = require("../db");
const { authMiddleware } = require("../middleware/auth");
const Razorpay = require('razorpay');

const razorpay = new Razorpay({
    key_id: process.env.RAZORPAY_KEY_ID,
    key_secret: process.env.RAZORPAY_KEY_SECRET
});

console.log('Razorpay Key ID:', process.env.RAZORPAY_KEY_ID);
console.log('Razorpay Key Secret:', process.env.RAZORPAY_KEY_SECRET);

// Create payment order
paymentRouter.post("/create-order", authMiddleware, async (req, res) => {
    try {
        const { courseId } = req.body;
        const course = await courseModel.findById(courseId);
        
        if (!course) {
            return res.status(404).json({ message: "Course not found" });
        }

        const options = {
            amount: course.price * 100, // amount in paisa
            currency: "INR",
            receipt: `course_${courseId}`
        };

        const order = await razorpay.orders.create(options);
        res.json({ order });
    } catch (error) {
        console.error('Payment order creation error:', error);
        res.status(500).json({
            message: "Error creating payment order",
            error: error.message
        });
    }
});

// Verify payment
paymentRouter.post("/verify", authMiddleware, async (req, res) => {
    try {
        const { 
            razorpay_order_id, 
            razorpay_payment_id, 
            razorpay_signature,
            courseId 
        } = req.body;

        // Verify payment signature
        const generated_signature = crypto
            .createHmac('sha256', process.env.RAZORPAY_KEY_SECRET)
            .update(razorpay_order_id + "|" + razorpay_payment_id)
            .digest('hex');

        if (generated_signature === razorpay_signature) {
            // Add course to user's purchased courses
            await userModel.findByIdAndUpdate(
                req.user._id,
                { 
                    $push: { 
                        purchasedCourses: {
                            courseId,
                            purchaseDate: new Date(),
                            paymentId: razorpay_payment_id
                        }
                    }
                }
            );

            res.json({ 
                message: "Payment verified and course purchased successfully" 
            });
        } else {
            res.status(400).json({ message: "Invalid payment signature" });
        }
    } catch (error) {
        console.error('Payment verification error:', error);
        res.status(500).json({
            message: "Error verifying payment",
            error: error.message
        });
    }
});

module.exports = {
    paymentRouter
}; 