import { motion } from "framer-motion";
import { ArrowLeft, Loader, Mail, Send } from "lucide-react";
import { useState } from "react";
import { Link } from "react-router-dom";
import Input from "../components/Input";
import { forgotPasswordSchema } from "../lib/validations";
import useAuthStore from "../store/authStore";

const ForgotPasswordPage = () => {
  const [email, setEmail] = useState("");
  const [fieldError, setFieldError] = useState("");
  const [sent, setSent] = useState(false);
  const { forgotPassword, isLoading } = useAuthStore();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const result = forgotPasswordSchema.safeParse({ email });
    if (!result.success) {
      setFieldError(result.error.issues[0].message);
      return;
    }
    setFieldError("");
    try {
      await forgotPassword(email);
      setSent(true);
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
            <h1 className="font-bold text-2xl text-zinc-100">Quên mật khẩu</h1>
            <p className="mt-1 text-sm text-zinc-400">
              {sent
                ? "Email đặt lại mật khẩu đã được gửi. Vui lòng kiểm tra hộp thư."
                : "Nhập email của bạn để nhận liên kết đặt lại mật khẩu"}
            </p>
          </div>

          {!sent ? (
            <form className="space-y-4" onSubmit={handleSubmit}>
              <div>
                <Input
                  disabled={isLoading}
                  icon={Mail}
                  label="Email"
                  onChange={(e) => {
                    setEmail(e.target.value);
                    setFieldError("");
                  }}
                  placeholder="example@gmail.com"
                  required
                  type="email"
                  value={email}
                />
                {fieldError && (
                  <p className="mt-1 text-red-400 text-xs">{fieldError}</p>
                )}
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
                  <Send size={18} />
                )}
                {isLoading ? "Đang xử lý..." : "Gửi yêu cầu"}
              </motion.button>
            </form>
          ) : (
            <div className="text-center">
              <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-emerald-500/20">
                <Mail className="text-emerald-400" size={28} />
              </div>
              <Link
                className={`inline-block cursor-pointer text-sm underline underline-offset-2 transition-colors ${isLoading ? "pointer-events-none text-zinc-500 no-underline opacity-50" : "text-emerald-400 hover:text-emerald-300"}`}
                to="/login"
              >
                Quay lại đăng nhập
              </Link>
            </div>
          )}

          <div className="mt-6 text-center">
            <Link
              className={`inline-flex cursor-pointer items-center gap-1.5 text-sm transition-colors ${isLoading ? "pointer-events-none text-zinc-500 opacity-50" : "text-zinc-400 hover:text-zinc-200"}`}
              to="/login"
            >
              <ArrowLeft size={14} />
              Quay lại đăng nhập
            </Link>
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default ForgotPasswordPage;
