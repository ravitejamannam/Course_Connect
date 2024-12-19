const { Router } = require("express");
const { userMiddleware } = require("../middleware/user");
const {purchaseModel } = require("../db");
const courseRouter = Router();

courseRouter.post("/purchase",userMiddleware,async function(req, res) {
    const userId = req.userId ;
    const courseId = req.body.courseId;

    await purchaseModel.create({
        userId: userId,
        courseId: courseId
    })
    res.json({
        message: "you have successfully purchased the course"
    })
})

courseRouter.get("/preview",async function(req, res) {

    const courses = await courseModel.find({});
    res.json({
        courses
    })
})

module.exports = {
    courseRouter: courseRouter
}