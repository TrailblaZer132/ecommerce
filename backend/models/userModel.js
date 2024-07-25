import mongoose from "mongoose";
import crypto from "crypto";
import jwt from "jsonwebtoken";

const userSchema = new mongoose.Schema(
  {
    username: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    isAdmin: { type: Boolean, required: true, default: false },
    isSeller: { type: Boolean, required: true, default: false },
    isSuperAdmin: { type: Boolean, required: true, default: false },
    pincode: { type: String, required: false },
    verificationToken: { type: String },
  },
  { timestamps: true }
);

userSchema.methods.generateVerificationToken = function () {
  this.verificationToken = crypto.randomBytes(20).toString("hex");
};

userSchema.methods.generateVerificationToken = function () {
  const user = this;
  const token = jwt.sign(
    { id: user._id, email: user.email },
    process.env.JWT_SECRET,
    { expiresIn: "1h" }
  );
  return token;
};
const User = mongoose.model("User", userSchema);

export default User;
