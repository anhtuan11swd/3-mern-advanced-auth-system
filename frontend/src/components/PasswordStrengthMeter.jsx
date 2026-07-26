import { motion } from "framer-motion";

const criteria = [
  { label: "Ít nhất 8 ký tự", test: (pw) => pw.length >= 8 },
  { label: "Chữ thường (a-z)", test: (pw) => /[a-z]/.test(pw) },
  { label: "Chữ hoa (A-Z)", test: (pw) => /[A-Z]/.test(pw) },
  { label: "Chữ số (0-9)", test: (pw) => /[0-9]/.test(pw) },
  {
    label: "Ký tự đặc biệt",
    test: (pw) => /[!@#$%^&*()_+\-=[\]{};':"\\|,.<>/?]/.test(pw),
  },
];

const getStrength = (password) => {
  if (!password)
    return { barWidth: "0%", color: "bg-zinc-700", label: "", score: 0 };
  const passed = criteria.filter((c) => c.test(password)).length;
  if (passed <= 2)
    return {
      barWidth: `${(passed / 5) * 100}%`,
      color: "bg-red-500",
      label: "Yếu",
      score: passed,
    };
  if (passed <= 3)
    return {
      barWidth: `${(passed / 5) * 100}%`,
      color: "bg-yellow-500",
      label: "Trung bình",
      score: passed,
    };
  if (passed === 4)
    return {
      barWidth: `${(passed / 5) * 100}%`,
      color: "bg-emerald-400",
      label: "Tốt",
      score: passed,
    };
  return { barWidth: "100%", color: "bg-emerald-500", label: "Mạnh", score: 5 };
};

const PasswordStrengthMeter = ({ password }) => {
  const { label, color, barWidth } = getStrength(password);

  if (!password) return null;

  return (
    <div className="mt-3 space-y-2">
      <div className="flex items-center gap-2">
        <div className="h-1.5 flex-1 overflow-hidden rounded-full bg-zinc-700/50">
          <motion.div
            animate={{ width: barWidth }}
            className={`h-full rounded-full ${color}`}
            initial={{ width: "0%" }}
            transition={{ duration: 0.3, ease: "easeOut" }}
          />
        </div>
        <span className="min-w-[60px] text-right font-medium text-xs text-zinc-400">
          {label}
        </span>
      </div>
      <ul className="space-y-1">
        {criteria.map((c) => {
          const passed = c.test(password);
          return (
            <li
              className={`flex items-center gap-1.5 text-xs ${
                passed ? "text-emerald-400" : "text-zinc-500"
              }`}
              key={c.label}
            >
              <span className="text-[10px]">{passed ? "✓" : "○"}</span>
              {c.label}
            </li>
          );
        })}
      </ul>
    </div>
  );
};

export default PasswordStrengthMeter;
