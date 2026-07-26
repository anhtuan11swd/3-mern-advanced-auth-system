import { motion } from "framer-motion";
import { ArrowLeft, Loader } from "lucide-react";
import { useCallback, useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { verifyEmailSchema } from "../lib/validations";
import useAuthStore from "../store/authStore";

const EmailVerificationPage = () => {
  const [code, setCode] = useState(Array(6).fill(""));
  const [fieldError, setFieldError] = useState("");
  const inputRefs = useRef([]);
  const codeRef = useRef(code);
  const { verifyEmail, isLoading, user } = useAuthStore();
  const navigate = useNavigate();

  useEffect(() => {
    if (user?.isVerified) {
      navigate("/");
    }
  }, [user, navigate]);

  const handleChange = useCallback(
    (index, e) => {
      const value = e.target.value;
      if (Number.isNaN(value)) return;

      const newCode = [...code];
      newCode[index] = value.slice(-1);
      codeRef.current = newCode;
      setCode(newCode);
      setFieldError("");

      const fullCode = newCode.join("");
      if (fullCode.length === 6) {
        const result = verifyEmailSchema.safeParse({ code: fullCode });
        if (!result.success) {
          setFieldError(result.error.issues[0].message);
          return;
        }
        verifyEmail(fullCode).catch(() => {});
      }

      if (value && index < 5) {
        inputRefs.current[index + 1]?.focus();
      }
    },
    [code, verifyEmail],
  );

  const handleKeyDown = useCallback(
    (index, e) => {
      if (e.key === "Backspace") {
        if (!code[index] && index > 0) {
          inputRefs.current[index - 1]?.focus();
        }
      }
      if (e.key === "ArrowRight" && index < 5) {
        inputRefs.current[index + 1]?.focus();
      }
      if (e.key === "ArrowLeft" && index > 0) {
        inputRefs.current[index - 1]?.focus();
      }
    },
    [code],
  );

  const otpKeys = ["otp-0", "otp-1", "otp-2", "otp-3", "otp-4", "otp-5"];

  const handlePaste = useCallback(
    (e) => {
      e.preventDefault();
      const pasted = e.clipboardData.getData("text/plain").trim();
      if (!/^\d{6}$/.test(pasted)) return;

      const digits = pasted.split("").slice(0, 6);
      codeRef.current = digits;
      setCode(digits);
      setFieldError("");

      const fullCode = digits.join("");
      const result = verifyEmailSchema.safeParse({ code: fullCode });
      if (!result.success) {
        setFieldError(result.error.issues[0].message);
        return;
      }
      verifyEmail(fullCode).catch(() => {});

      inputRefs.current[5]?.focus();
    },
    [verifyEmail],
  );

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
            <h1 className="font-bold text-2xl text-zinc-100">Xác thực email</h1>
            <p className="mt-1 text-sm text-zinc-400">
              Nhập mã 6 chữ số đã được gửi đến email của bạn
            </p>
          </div>

          <div className="mb-4 flex justify-center gap-3">
            {[0, 1, 2, 3, 4, 5].map((pos) => (
              <motion.input
                autoComplete="one-time-code"
                className={`h-14 w-12 rounded-lg border border-zinc-700/60 bg-zinc-800/60 text-center font-bold text-xl text-zinc-100 outline-none transition-colors duration-200 focus:border-emerald-500/60 focus:ring-1 focus:ring-emerald-500/30 ${isLoading ? "cursor-default opacity-50 focus:border-zinc-700/60 focus:ring-0" : ""}`}
                disabled={isLoading}
                inputMode="numeric"
                key={otpKeys[pos]}
                maxLength={1}
                onChange={(e) => handleChange(pos, e)}
                onKeyDown={(e) => handleKeyDown(pos, e)}
                onPaste={pos === 0 ? handlePaste : undefined}
                ref={(el) => (inputRefs.current[pos] = el)}
                transition={{
                  damping: 25,
                  stiffness: 400,
                  type: "spring",
                }}
                type="text"
                value={code[pos]}
                whileFocus={isLoading ? undefined : { scale: 1.05 }}
              />
            ))}
          </div>

          {fieldError && (
            <p className="mb-3 text-center text-red-400 text-xs">
              {fieldError}
            </p>
          )}

          {isLoading && (
            <div className="mb-4 flex justify-center">
              <Loader className="animate-spin text-emerald-400" size={24} />
            </div>
          )}

          <button
            className={`mx-auto flex items-center gap-2 text-sm transition-colors ${isLoading ? "cursor-default text-zinc-500 opacity-50" : "cursor-pointer text-zinc-400 hover:text-zinc-200"}`}
            onClick={() => navigate(-1)}
            type="button"
          >
            <ArrowLeft size={16} />
            Quay lại
          </button>
        </div>
      </motion.div>
    </div>
  );
};

export default EmailVerificationPage;
