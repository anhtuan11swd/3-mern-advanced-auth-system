import bcryptjs from "bcryptjs";
import User from "../models/user.model.js";
import generateTokenAndSetCookie from "../utils/generateTokenAndSetCookie.js";
import generateVerificationCode from "../utils/generateVerificationCode.js";
import sendVerificationEmail from "../utils/sendVerificationEmail.js";

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
