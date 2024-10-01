const { Router } = require("express");
const {userMiddleware} = require("../middleware/user")
const {purchaseModel,courseModel} = require("../db")
const courseRouter = Router();

courseRouter.post("/purchase",userMiddleware,async function (req, res) {
  const userId = req.userId;
  const courseId = req.body.courseId;
 // should check that  the user has actually paid the price

//  const find = await purchaseModel.findOne({courseId})
  await purchaseModel.create({
    userId,
    courseId
  })
  res.json({
    message: "Purchase successful",
  });
});
courseRouter.get("/preview", async function (req, res) {
  const courses =  await courseModel.find({})
  // console.log(courses)
  res.json({
    courses
  })
});

courseRouter.get("/detail", async function (req, res) {
  const courseId = req.query.courseId;
  const courses =  await courseModel.findOne({_id:courseId})
  res.json({
    courses
  })
});

module.exports = {
  courseRouter: courseRouter,
};
