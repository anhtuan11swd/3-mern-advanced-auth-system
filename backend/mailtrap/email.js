import { mailtrapClient, sender } from "../src/config/mailtrap.config.js";
import {
  PASSWORD_RESET_REQUEST_TEMPLATE,
  PASSWORD_RESET_SUCCESS_TEMPLATE,
  VERIFICATION_EMAIL_TEMPLATE,
  WELCOME_EMAIL_TEMPLATE,
} from "./emailTemplates.js";

export const sendVerificationEmail = async (email, verificationToken) => {
  const recipient = [{ email }];

  try {
    await mailtrapClient.send({
      category: "Email Verification",
      from: sender,
      html: VERIFICATION_EMAIL_TEMPLATE.replace(
        "{verificationCode}",
        verificationToken,
      ),
      subject: "Xác thực tài khoản của bạn",
      to: recipient,
    });
  } catch (error) {
    console.error("Lỗi gửi email xác thực:", error.message);
  }
};

export const sendWelcomeEmail = async (email, name) => {
  const recipient = [{ email }];

  try {
    await mailtrapClient.send({
      category: "Welcome",
      from: sender,
      html: WELCOME_EMAIL_TEMPLATE.replace("{name}", name).replace(
        "{loginURL}",
        "http://localhost:5173/login",
      ),
      subject: "Chào mừng bạn đến với MERN Auth",
      to: recipient,
    });
  } catch (error) {
    console.error("Lỗi gửi email chào mừng:", error.message);
  }
};

export const sendPasswordResetEmail = async (email, resetURL) => {
  const recipient = [{ email }];

  try {
    await mailtrapClient.send({
      category: "Password Reset",
      from: sender,
      html: PASSWORD_RESET_REQUEST_TEMPLATE.replace("{resetURL}", resetURL),
      subject: "Đặt lại mật khẩu",
      to: recipient,
    });
  } catch (error) {
    console.error("Lỗi gửi email đặt lại mật khẩu:", error.message);
  }
};

export const sendResetSuccessEmail = async (email) => {
  const recipient = [{ email }];

  try {
    await mailtrapClient.send({
      category: "Password Reset",
      from: sender,
      html: PASSWORD_RESET_SUCCESS_TEMPLATE,
      subject: "Đặt lại mật khẩu thành công",
      to: recipient,
    });
  } catch (error) {
    console.error("Lỗi gửi email xác nhận đặt lại mật khẩu:", error.message);
  }
};
