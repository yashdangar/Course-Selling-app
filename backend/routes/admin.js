const { Router } = require("express");
const adminRouter = Router();
const { adminModel, courseModel } = require("../db");
const z = require("zod");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const { JWT_ADMIN_PASSWORD } = require("../config");
const {adminMiddleware } = require("../middleware/admin");
adminRouter.post("/signup", async function (req, res) {
  // input validation
  const requireBody = z.object({
    email: z.string().min(3).max(20).email(),
    password: z.string().min(3).max(30),
    // firstName: z.string().min(2).max(20),
    // lastName: z.string().min(2).max(20),
  });
  const validateBody = requireBody.safeParse(req.body);

  if (!validateBody.success) {
    res.status(404).json({
      message: "Incorrect format",
      error: validateBody.error,
    });
    return;
  }

  const email = req.body.email;
  const password = req.body.password;
  // const firstName = req.body.firstName;
  // const lastName = req.body.lastName;
  // password hashing
  let error = false;
  try {
    const hashedPassword = await bcrypt.hash(password, 5);

    await adminModel.create({
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
    res.json({ message: "Signup successful" });
  }
});
adminRouter.post("/signin",async function (req, res) {
  const email = req.body.email;
  const password = req.body.password;
  
  //finding user in the database
  const admin = await adminModel.findOne({ email });

  // matching the password
  const passwordMatch = await bcrypt.compare(password, admin.password);

  // if admin founds and password matches then generate the token
  if (admin && passwordMatch) {
    const token = jwt.sign({ id: admin._id.toString() }, JWT_ADMIN_PASSWORD);
    res.json({ token,role:"admin"});
  } else {
    res.json({ message: "Invalid credentials" });
  }
});
adminRouter.post("/course", adminMiddleware,async function (req, res) {
  const adminId = req.userId;
  const { title, description, imageUrl, price } = req.body;

  const course = await courseModel.create({
    title,
    description,
    imageUrl,
    price,

    creatorId: adminId,
  })
  res.json({
    message: "Course created successfully",
    courseId : course._id,
  })
});

adminRouter.put("/course", adminMiddleware,async function (req, res) {
    const adminId = req.userId;
    const { title, description, imageUrl, price,courseId } = req.body;
  
    // updateOnee function takes first parameter as filter and second para things you want to change
    const course = await courseModel.updateOne({
        _id:courseId,
        creatorId:adminId
    },{
      title,
      description,
      imageUrl,
      price
    })
    res.json({
      message: "Course Updated successfully",
      courseId : course._id,
    })
});

adminRouter.get("/creation",adminMiddleware,async function (req, res) {
    const adminId = req.userId;
    
    const courses = await courseModel.find({
        creatorId:adminId
    })
    res.json({
        courses
    })
});

module.exports = {
  adminRouter: adminRouter,
};
