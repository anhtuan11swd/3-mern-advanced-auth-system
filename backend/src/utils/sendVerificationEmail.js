import { mailtrapClient, sender } from "../config/mailtrap.config.js";

const sendVerificationEmail = async (email, verificationToken) => {
  const recipient = [{ email }];

  try {
    await mailtrapClient.send({
      from: sender,
      html: `
        <h1>Xác thực tài khoản</h1>
        <p>Mã xác thực của bạn là: <strong>${verificationToken}</strong></p>
        <p>Mã này có hiệu lực trong 10 phút.</p>
      `,
      subject: "Xác thực tài khoản của bạn",
      to: recipient,
    });
  } catch (error) {
    console.error("Lỗi gửi email xác thực:", error.message);
  }
};

export default sendVerificationEmail;
