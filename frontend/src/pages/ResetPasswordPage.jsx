import { motion } from "framer-motion";
import { KeyRound, Loader, Lock } from "lucide-react";
import { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import Input from "../components/Input";
import PasswordStrengthMeter from "../components/PasswordStrengthMeter";
import { resetPasswordSchema } from "../lib/validations";
import useAuthStore from "../store/authStore";

const ResetPasswordPage = () => {
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [fieldError, setFieldError] = useState("");
  const [done, setDone] = useState(false);
  const { token } = useParams();
  const { resetPassword, isLoading } = useAuthStore();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (password !== confirmPassword) {
      setFieldError("Mật khẩu xác nhận không khớp");
      return;
    }

    const result = resetPasswordSchema.safeParse({ password });
    if (!result.success) {
      setFieldError(result.error.issues[0].message);
      return;
    }

    setFieldError("");
    try {
      await resetPassword(token, password);
      setDone(true);
    } catch {
      // error handled in store
    }
  };

  const passwordsMatch = password === confirmPassword;

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
            <h1 className="font-bold text-2xl text-zinc-100">
              Đặt lại mật khẩu
            </h1>
            <p className="mt-1 text-sm text-zinc-400">
              {done
                ? "Mật khẩu đã được đặt lại thành công. Đang chuyển hướng..."
                : "Nhập mật khẩu mới cho tài khoản của bạn"}
            </p>
          </div>

          {!done ? (
            <form className="space-y-4" onSubmit={handleSubmit}>
              <div>
                <Input
                  controlledShow={showPassword}
                  disabled={isLoading}
                  icon={Lock}
                  label="Mật khẩu mới"
                  onChange={(e) => {
                    setPassword(e.target.value);
                    setFieldError("");
                  }}
                  onToggleShow={setShowPassword}
                  placeholder="••••••••"
                  required
                  type="password"
                  value={password}
                />
                <PasswordStrengthMeter password={password} />
              </div>

              <div>
                <Input
                  controlledShow={showPassword}
                  disabled={isLoading}
                  icon={Lock}
                  label="Xác nhận mật khẩu"
                  onChange={(e) => {
                    setConfirmPassword(e.target.value);
                    setFieldError("");
                  }}
                  onToggleShow={setShowPassword}
                  placeholder="••••••••"
                  required
                  type="password"
                  value={confirmPassword}
                />
                {confirmPassword && !passwordsMatch && (
                  <p className="mt-1 text-red-400 text-xs">
                    Mật khẩu xác nhận không khớp
                  </p>
                )}
              </div>

              {fieldError && (
                <p className="text-red-400 text-xs">{fieldError}</p>
              )}

              <motion.button
                className="flex w-full cursor-pointer items-center justify-center gap-2 rounded-lg bg-emerald-600 py-2.5 font-semibold text-white transition-colors duration-200 hover:bg-emerald-500 disabled:cursor-not-allowed disabled:opacity-50"
                disabled={
                  isLoading || !password || !confirmPassword || !passwordsMatch
                }
                type="submit"
                whileTap={{ scale: 0.98 }}
              >
                {isLoading ? (
                  <Loader className="animate-spin" size={18} />
                ) : (
                  <KeyRound size={18} />
                )}
                {isLoading ? "Đang xử lý..." : "Đặt lại mật khẩu"}
              </motion.button>
            </form>
          ) : (
            <div className="text-center">
              <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-emerald-500/20">
                <Lock className="text-emerald-400" size={28} />
              </div>
              <button
                className="cursor-pointer text-emerald-400 text-sm underline underline-offset-2 transition-colors hover:text-emerald-300"
                onClick={() => navigate("/login")}
                type="button"
              >
                Đăng nhập ngay
              </button>
            </div>
          )}
        </div>
      </motion.div>
    </div>
  );
};

export default ResetPasswordPage;
