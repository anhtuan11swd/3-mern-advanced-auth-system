import { motion } from "framer-motion";
import { Loader, Lock, Mail, User, UserPlus } from "lucide-react";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Input from "../components/Input";
import PasswordStrengthMeter from "../components/PasswordStrengthMeter";
import { signupSchema } from "../lib/validations";
import useAuthStore from "../store/authStore";

const SignupPage = () => {
  const [form, setForm] = useState({ email: "", name: "", password: "" });
  const [fieldErrors, setFieldErrors] = useState({});
  const { signup, isLoading } = useAuthStore();
  const navigate = useNavigate();

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
    setFieldErrors({ ...fieldErrors, [e.target.name]: "" });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const result = signupSchema.safeParse(form);
    if (!result.success) {
      const errors = {};
      for (const issue of result.error.issues) {
        const field = issue.path[0];
        if (!errors[field]) errors[field] = issue.message;
      }
      setFieldErrors(errors);
      return;
    }
    setFieldErrors({});
    try {
      await signup(form);
      navigate("/verify-email");
    } catch {
      // error handled in store
    }
  };

  return (
    <div className="flex min-h-screen items-center justify-center px-4 py-12">
      <motion.div
        animate={{ opacity: 1, y: 0 }}
        className="w-full max-w-md"
        initial={{ opacity: 0, y: 30 }}
        transition={{ duration: 0.5, ease: "easeOut" }}
      >
        <div className="rounded-2xl border border-zinc-800/60 bg-zinc-900/70 p-8 shadow-2xl backdrop-blur-xl">
          <div className="mb-8 text-center">
            <h1 className="font-bold text-2xl text-zinc-100">Tạo tài khoản</h1>
            <p className="mt-1 text-sm text-zinc-400">
              Đăng ký để bắt đầu sử dụng dịch vụ
            </p>
          </div>

          <form className="space-y-4" onSubmit={handleSubmit}>
            <div>
              <Input
                disabled={isLoading}
                icon={User}
                label="Họ tên"
                name="name"
                onChange={handleChange}
                placeholder="Nguyễn Văn A"
                required
                type="text"
                value={form.name}
              />
              {fieldErrors.name && (
                <p className="mt-1 text-red-400 text-xs">{fieldErrors.name}</p>
              )}
            </div>

            <div>
              <Input
                disabled={isLoading}
                icon={Mail}
                label="Email"
                name="email"
                onChange={handleChange}
                placeholder="example@gmail.com"
                required
                type="email"
                value={form.email}
              />
              {fieldErrors.email && (
                <p className="mt-1 text-red-400 text-xs">{fieldErrors.email}</p>
              )}
            </div>

            <div>
              <Input
                disabled={isLoading}
                icon={Lock}
                label="Mật khẩu"
                name="password"
                onChange={handleChange}
                placeholder="••••••••"
                required
                type="password"
                value={form.password}
              />
              {fieldErrors.password && (
                <p className="mt-1 text-red-400 text-xs">
                  {fieldErrors.password}
                </p>
              )}
              <PasswordStrengthMeter password={form.password} />
            </div>

            <motion.button
              className="flex w-full cursor-pointer items-center justify-center gap-2 rounded-lg bg-emerald-600 py-2.5 font-semibold text-white transition-colors duration-200 hover:bg-emerald-500 disabled:cursor-not-allowed disabled:opacity-50"
              disabled={isLoading}
              type="submit"
              whileTap={{ scale: 0.98 }}
            >
              {isLoading ? (
                <Loader className="animate-spin" size={18} />
              ) : (
                <UserPlus size={18} />
              )}
              {isLoading ? "Đang xử lý..." : "Tạo tài khoản"}
            </motion.button>
          </form>

          <p className="mt-6 text-center text-sm text-zinc-400">
            Đã có tài khoản?{" "}
            <Link
              className={`cursor-pointer underline underline-offset-2 transition-colors ${isLoading ? "pointer-events-none text-zinc-500 no-underline opacity-50" : "text-emerald-400 hover:text-emerald-300"}`}
              to="/login"
            >
              Đăng nhập
            </Link>
          </p>
        </div>
      </motion.div>
    </div>
  );
};

export default SignupPage;
