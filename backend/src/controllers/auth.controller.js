import bcryptjs from "bcryptjs";
import {
  sendVerificationEmail,
  sendWelcomeEmail,
} from "../../mailtrap/email.js";
import User from "../models/user.model.js";
import generateTokenAndSetCookie from "../utils/generateTokenAndSetCookie.js";
import generateVerificationCode from "../utils/generateVerificationCode.js";

export const signup = async (req, res) => {
  try {
    const { email, password, name } = req.body;

    const existingUser = await User.findOne({ email });

    if (existingUser) {
      return res.status(400).json({ message: "Email đã được đăng ký" });
    }

    const hashedPassword = await bcryptjs.hash(password, 10);
    const verificationToken = generateVerificationCode();

    const user = new User({
      email,
      name,
      password: hashedPassword,
      verificationToken,
      verificationTokenExpiresAt: Date.now() + 10 * 60 * 1000,
    });

    await user.save();

    generateTokenAndSetCookie(user._id, res);

    await sendVerificationEmail(user.email, verificationToken);

    const userResponse = user.toObject();
    delete userResponse.password;

    res.status(201).json({
      message: "Đăng ký thành công. Vui lòng kiểm tra email để xác thực.",
      user: userResponse,
    });
  } catch (error) {
    console.error("Lỗi đăng ký:", error.message);
    res.status(500).json({ message: "Lỗi server" });
  }
};

export const verifyEmail = async (req, res) => {
  try {
    const { code } = req.body;

    const user = await User.findOne({
      verificationToken: code,
      verificationTokenExpiresAt: { $gt: Date.now() },
    });

    if (!user) {
      return res
        .status(400)
        .json({ message: "Mã xác thực không hợp lệ hoặc đã hết hạn" });
    }

    user.isVerified = true;
    user.verificationToken = undefined;
    user.verificationTokenExpiresAt = undefined;

    await user.save();

    await sendWelcomeEmail(user.email, user.name);

    const userResponse = user.toObject();
    delete userResponse.password;

    res.status(200).json({
      message: "Xác thực email thành công",
      user: userResponse,
    });
  } catch (error) {
    console.error("Lỗi xác thực email:", error.message);
    res.status(500).json({ message: "Lỗi server" });
  }
};
