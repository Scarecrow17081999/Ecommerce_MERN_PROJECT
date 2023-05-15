import mongoose from "mongoose";
import validator from "validator";
import bcryptjs from "bcryptjs";
import Jwt from "jsonwebtoken";
import * as dotenv from "dotenv";
// import use from "express/lib/application";
import crypto from "crypto";

dotenv.config({
  path: "backend/config/config.env",
});
// import * as jwt from "jsonwebtoken";
const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    maxlength: [20, "Name is too long"],
    minlength: [3, "Name is too short"],
  },
  email: {
    type: String,
    required: [true, "Email is required"],
    unique: true,
    validate: [validator.isEmail, "Email is invalid"],
  },
  password: {
    type: String,
    required: [true, "Password is required"],
    minlength: [8, "Password is too short"],
    select: false,
  },
  avatar: {
    public_id: {
      type: String,
      required: true,
    },
    url: {
      type: String,
      required: true,
    },
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
  role: {
    type: String,
    default: "user",
  },
  resetPasswordToken: String,
  resetPasswordExpires: Date,
});

userSchema.pre("save", async function (next) {
  if (!this.isModified("password")) {
    return next();
  }
  const salt = await bcryptjs.genSalt(10);
  this.password = await bcryptjs.hash(this.password, salt);
  next();
});

//JWT TOKEN//
userSchema.methods.generateAuthToken = async function () {
  return Jwt.sign({ id: this._id }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRES_IN,
  });
};
//COMPARING THE PASSWORD//
userSchema.methods.comparePassword = async function (enteredPassword) {
  return await bcryptjs.compare(enteredPassword, this.password);
};
// GENERATIN PASSWORD RESET TOKEN//
userSchema.methods.generateResetPasswordToken = async function () {
  const resetPasswordToken = await crypto.randomBytes(20).toString("hex");
  // HASING ANS ADDING TO USERSCHEMA//

  this.resetPasswordToken = crypto
    .createHash("sha256")
    .update(resetPasswordToken)
    .digest("hex");

  this.resetPasswordExpires = new Date(Date.now() + 5 * 1000 * 60);

  return resetPasswordToken;
};

//CREATING A USER MODEL//
const User = mongoose.model("User", userSchema);

export default User;
