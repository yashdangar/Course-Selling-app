const { Router } = require("express");
const userRouter = Router();
const { userModel, purchaseModel, courseModel } = require("../db");
const z = require("zod");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const { JWT_USER_PASSWORD } = require("../config");
const { userMiddleware } = require("../middleware/user");

userRouter.post("/signup", async function (req, res) {
  const requireBody = z.object({
    email: z.string().email(),
    password: z.string().min(3).max(20),
    // firstName: z.string().min(2).max(50),
    // lastName: z.string().min(2).max(50),
  });

  const validateBody = requireBody.safeParse(req.body);

  if (!validateBody.success) {
    res.json({
      message: "Incorrect format",
      error: validateBody.error,
    });
    return;
  }

  const { email, password} = req.body;
  let error = false;
  try {
    const hashedPassword = await bcrypt.hash(password, 5);
    await userModel.create({
      email,
      password: hashedPassword,
      // firstName,
      // lastName,
    });
  } catch (e) {
    res.json({
      message: "UserExists",
      
    });
    error = true;
  }
  if (!error) {
    res.json({
      message: "You are signed up",
    });
  }
});
userRouter.post("/signin", async function (req, res) {
  const { email, password } = req.body;
  const user = await userModel.findOne({ email });
  const passwordMatch = await bcrypt.compare(password, user.password);

  if (user && passwordMatch) {
    const token = jwt.sign({ id: user._id.toString() }, JWT_USER_PASSWORD);

    res.json({ token,role: 'user' });
  } else {
    res.json({ message: "Invalid credentials" });
  }
});
userRouter.get("/purchases", userMiddleware, async function (req, res) {
  const userId = req.userId;


  const purchases = await purchaseModel.find({ userId });

  if (purchases.length === 0) {
    return res.json({ purchases: [], courseData: [] });
  }

  const courseIds = purchases.map((p) => p.courseId);

  const courseData = await courseModel.find({
    _id: { $in: courseIds },
  });
  res.json({
    purchases,
    courseData,
  });
});

module.exports = {
  userRouter: userRouter,
};
