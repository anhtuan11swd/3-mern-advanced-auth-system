import { z } from "zod";

const nameSchema = z
  .string()
  .trim()
  .min(2, "Tên phải có ít nhất 2 ký tự")
  .max(100, "Tên không được vượt quá 100 ký tự")
  .regex(
    /^[\p{L}\p{M}'\-\s]+$/u,
    "Tên chỉ được chứa chữ cái, dấu nháy, gạch nối và khoảng trắng",
  );

const passwordSchema = z
  .string()
  .min(8, "Mật khẩu phải có ít nhất 8 ký tự")
  .max(64, "Mật khẩu không được vượt quá 64 ký tự")
  .regex(/[a-z]/, "Mật khẩu phải chứa ít nhất 1 chữ thường")
  .regex(/[A-Z]/, "Mật khẩu phải chứa ít nhất 1 chữ hoa")
  .regex(/[0-9]/, "Mật khẩu phải chứa ít nhất 1 chữ số")
  .regex(
    /[!@#$%^&*()_+\-=[\]{};':"\\|,.<>/?]/,
    "Mật khẩu phải chứa ít nhất 1 ký tự đặc biệt",
  )
  .regex(/^\S*$/, "Mật khẩu không được chứa khoảng trắng");

const signupSchema = z.object({
  email: z.string().email("Email không hợp lệ"),
  name: nameSchema,
  password: passwordSchema,
});

const verifyEmailSchema = z.object({
  code: z
    .string()
    .length(6, "Mã xác thực phải gồm 6 chữ số")
    .regex(/^\d{6}$/, "Mã xác thực chỉ được chứa chữ số"),
});

const loginSchema = z.object({
  email: z.string().email("Email không hợp lệ"),
  password: z.string().min(1, "Mật khẩu không được để trống"),
});

export {
  loginSchema,
  nameSchema,
  passwordSchema,
  signupSchema,
  verifyEmailSchema,
};
