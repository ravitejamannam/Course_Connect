const { Router } = require("express");
const { userMiddleware } = require("../middleware/user");
const { purchaseModel, courseModel } = require("../db");
const courseRouter = Router();

courseRouter.post("/purchase", userMiddleware, async function(req, res) {
    try {
        const userId = req.userId;
        const courseId = req.body.courseId;

        // should check that the user has actually paid the price
        await purchaseModel.create({
            userId,
            courseId,
        });

        res.json({
            message: "You have successfully bought the course",
        });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

courseRouter.get("/preview", async function(req, res) {
    try {
        const courses = await courseModel.find({});

        res.json({
            courses,
        });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

module.exports = { courseRouter };