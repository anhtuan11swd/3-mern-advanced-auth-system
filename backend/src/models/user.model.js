import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
  {
    email: {
      lowercase: true,
      required: true,
      trim: true,
      type: String,
      unique: true,
    },
    isVerified: {
      default: false,
      type: Boolean,
    },
    lastLogin: {
      default: Date.now,
      type: Date,
    },
    name: {
      required: true,
      type: String,
    },
    password: {
      required: true,
      type: String,
    },
    resetPasswordExpiresAt: {
      type: Date,
    },
    resetPasswordToken: {
      type: String,
    },
    verificationToken: {
      type: String,
    },
    verificationTokenExpiresAt: {
      type: Date,
    },
  },
  { timestamps: true },
);

const User = mongoose.model("User", userSchema);

export default User;
