import { Router } from "express";
import {
  checkAuth,
  forgotPassword,
  login,
  logout,
  resetPassword,
  signup,
  verifyEmail,
} from "../controllers/auth.controller.js";
import validate from "../middleware/validate.js";
import verifyToken from "../middleware/verifyToken.js";
import {
  forgotPasswordSchema,
  loginSchema,
  resetPasswordSchema,
  signupSchema,
  verifyEmailSchema,
} from "../validators/auth.validator.js";

const router = Router();

/**
 * @openapi
 * /api/v1/auth/signup:
 *   post:
 *     tags: [Auth]
 *     summary: Đăng ký tài khoản mới
 *     description: |
 *       Tạo tài khoản mới và gửi mã xác thực qua email.
 *
 *       ### Validation rules:
 *       **Tên (name):**
 *       - Bắt buộc, 2-100 ký tự
 *       - Chỉ chứa chữ cái, dấu nháy ('), gạch nối (-), khoảng trắng
 *       - Hỗ trợ Unicode tiếng Việt và đa ngôn ngữ
 *
 *       **Mật khẩu (password):**
 *       - Bắt buộc, 8-64 ký tự
 *       - Ít nhất 1 chữ hoa, 1 chữ thường, 1 số, 1 ký tự đặc biệt
 *       - Không chứa khoảng trắng
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/SignupInput'
 *           examples:
 *             valid:
 *               summary: Hợp lệ
 *               value:
 *                 name: "Nguyễn Văn An"
 *                 email: "nguyenvanan@example.com"
 *                 password: "Abc@1234"
 *             vietnamese:
 *               summary: Tên tiếng Việt có dấu
 *               value:
 *                 name: "Trần Thị Bích Ngọc"
 *                 email: "bichngoc@example.com"
 *                 password: "MatKhau@2024"
 *             international:
 *               summary: Tên quốc tế
 *               value:
 *                 name: "Jean-Claude Van Damme"
 *                 email: "jcvd@example.com"
 *                 password: "Strong#Pass1"
 *             hyphenated:
 *               summary: Tên có dấu gạch nối
 *               value:
 *                 name: "Anne-Marie O'Connor"
 *                 email: "annemarie@example.com"
 *                 password: "Pass@1234"
 *             single_name:
 *               summary: Tên một từ
 *               value:
 *                 name: "Lê"
 *                 email: "le@example.com"
 *                 password: "Hello@123"
 *     responses:
 *       201:
 *         description: Đăng ký thành công
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/SignupResponse'
 *       400:
 *         description: Dữ liệu không hợp lệ
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ErrorResponse'
 *             examples:
 *               empty_fields:
 *                 summary: Thiếu thông tin
 *                 value:
 *                   message: "Dữ liệu không hợp lệ"
 *                   errors:
 *                     - field: "name"
 *                       message: "Tên phải có ít nhất 2 ký tự"
 *                     - field: "password"
 *                       message: "Mật khẩu phải có ít nhất 8 ký tự"
 *               weak_password:
 *                 summary: Mật khẩu yếu
 *                 value:
 *                   message: "Dữ liệu không hợp lệ"
 *                   errors:
 *                     - field: "password"
 *                       message: "Mật khẩu phải chứa ít nhất 1 chữ hoa"
 *                     - field: "password"
 *                       message: "Mật khẩu phải chứa ít nhất 1 ký tự đặc biệt"
 *               invalid_name:
 *                 summary: Tên chứa ký tự đặc biệt
 *                 value:
 *                   message: "Dữ liệu không hợp lệ"
 *                   errors:
 *                     - field: "name"
 *                       message: "Tên chỉ được chứa chữ cái, dấu nháy, gạch nối và khoảng trắng"
 *               existing_email:
 *                 summary: Email đã tồn tại
 *                 value:
 *                   message: "Email đã được đăng ký"
 *       500:
 *         description: Lỗi server
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ErrorResponse'
 *             example:
 *               message: "Lỗi server"
 */
router.post("/signup", validate(signupSchema), signup);

/**
 * @openapi
 * /api/v1/auth/verify-email:
 *   post:
 *     tags: [Auth]
 *     summary: Xác thực tài khoản bằng mã OTP
 *     description: |
 *       Xác thực tài khoản người dùng bằng mã 6 chữ số được gửi qua email.
 *
 *       ### Validation rules:
 *       - Mã xác thực phải gồm đúng 6 chữ số
 *       - Mã phải còn hiệu lực (trong vòng 10 phút kể từ khi gửi)
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required: [code]
 *             properties:
 *               code:
 *                 type: string
 *                 description: Mã xác thực 6 chữ số
 *                 example: "483217"
 *           examples:
 *             valid:
 *               summary: Mã hợp lệ
 *               value:
 *                 code: "583291"
 *     responses:
 *       200:
 *         description: Xác thực thành công
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Xác thực email thành công"
 *                 user:
 *                   $ref: '#/components/schemas/SignupResponse/properties/user'
 *       400:
 *         description: Mã không hợp lệ hoặc đã hết hạn
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ErrorResponse'
 *             examples:
 *               invalid_code:
 *                 summary: Mã sai
 *                 value:
 *                   message: "Mã xác thực không hợp lệ hoặc đã hết hạn"
 *               wrong_format:
 *                 summary: Sai định dạng
 *                 value:
 *                   message: "Dữ liệu không hợp lệ"
 *                   errors:
 *                     - field: "code"
 *                       message: "Mã xác thực phải gồm 6 chữ số"
 *       500:
 *         description: Lỗi server
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ErrorResponse'
 *             example:
 *               message: "Lỗi server"
 */
router.post("/verify-email", validate(verifyEmailSchema), verifyEmail);

/**
 * @openapi
 * /api/v1/auth/login:
 *   post:
 *     tags: [Auth]
 *     summary: Đăng nhập tài khoản
 *     description: Đăng nhập bằng email và mật khẩu. Yêu cầu tài khoản đã xác thực email.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required: [email, password]
 *             properties:
 *               email:
 *                 type: string
 *                 format: email
 *                 example: nguyenvana@example.com
 *               password:
 *                 type: string
 *                 format: password
 *                 example: Abc@1234
 *     responses:
 *       200:
 *         description: Đăng nhập thành công
 *       400:
 *         description: Sai thông tin hoặc chưa xác thực email
 *       500:
 *         description: Lỗi server
 */
router.post("/login", validate(loginSchema), login);

/**
 * @openapi
 * /api/v1/auth/logout:
 *   post:
 *     tags: [Auth]
 *     summary: Đăng xuất
 *     description: Xóa cookie chứa JWT khỏi trình duyệt.
 *     responses:
 *       200:
 *         description: Đăng xuất thành công
 *       500:
 *         description: Lỗi server
 */
router.post("/logout", logout);

/**
 * @openapi
 * /api/v1/auth/forgot-password:
 *   post:
 *     tags: [Auth]
 *     summary: Quên mật khẩu
 *     description: Gửi email chứa link đặt lại mật khẩu tới email người dùng.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required: [email]
 *             properties:
 *               email:
 *                 type: string
 *                 format: email
 *                 example: nguyenvana@example.com
 *     responses:
 *       200:
 *         description: Email đặt lại mật khẩu đã được gửi
 *       400:
 *         description: Email không tồn tại
 *       500:
 *         description: Lỗi server
 */
router.post("/forgot-password", validate(forgotPasswordSchema), forgotPassword);

/**
 * @openapi
 * /api/v1/auth/reset-password/{token}:
 *   post:
 *     tags: [Auth]
 *     summary: Đặt lại mật khẩu
 *     description: Đặt lại mật khẩu mới bằng token nhận từ email.
 *     parameters:
 *       - in: path
 *         name: token
 *         required: true
 *         schema:
 *           type: string
 *         description: Token đặt lại mật khẩu
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required: [password]
 *             properties:
 *               password:
 *                 type: string
 *                 format: password
 *                 example: NewPass@123
 *     responses:
 *       200:
 *         description: Đặt lại mật khẩu thành công
 *       400:
 *         description: Token không hợp lệ hoặc đã hết hạn
 *       500:
 *         description: Lỗi server
 */
router.post(
  "/reset-password/:token",
  validate(resetPasswordSchema),
  resetPassword,
);

/**
 * @openapi
 * /api/v1/auth/check-auth:
 *   get:
 *     tags: [Auth]
 *     summary: Kiểm tra xác thực
 *     description: Kiểm tra token và trả về thông tin người dùng hiện tại.
 *     responses:
 *       200:
 *         description: Thành công, trả về thông tin user
 *       401:
 *         description: Token không hợp lệ hoặc đã hết hạn
 *       500:
 *         description: Lỗi server
 */
router.get("/check-auth", verifyToken, checkAuth);

export default router;
