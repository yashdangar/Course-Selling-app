const mongoose = require("mongoose");
console.log("Connected to mongo")
// mongoose.connect(
//   "mongodb+srv://admin:Yash%402005@first.yv7q3.mongodb.net/course-app-database"
// );
const Schema = mongoose.Schema;
// const ObjectId = Schema.ObjectId; 
const ObjectId = mongoose.Types.ObjectId; 


const userSchema = new Schema({
  email: { type: String, unique: true },
  password: String,
  // role:{ type: String, enum : ["admin","user"] }
  // firstName: String,
  // lastName: String,
});

const adminSchema = new Schema({
  email: { type: String, unique: true },
  password: String,
  // role:{ type: String, enum : ["admin","user"] }
  // firstName: String,
  // lastName: String,
});
 
const courseSchema = new Schema({
  title: String,
  description: String,
  price: Number,
  imageUrl: String,
  creatorId: ObjectId,
});

const purchaseSchema = new Schema({
  userId: ObjectId,
  courseId: ObjectId,
});

const userModel = mongoose.model("user", userSchema);
const adminModel = mongoose.model("admin", adminSchema);
const courseModel = mongoose.model("course", courseSchema);
const purchaseModel = mongoose.model("purchase", purchaseSchema);

module.exports = {
  userModel,
  adminModel,
  courseModel,
  purchaseModel
};
