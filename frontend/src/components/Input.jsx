import { motion } from "framer-motion";
import { Eye, EyeOff } from "lucide-react";
import { useState } from "react";

const Input = ({
  icon: Icon,
  label,
  disabled,
  controlledShow,
  onToggleShow,
  id,
  ...props
}) => {
  const inputId = id || props.name || crypto.randomUUID();
  const [internalShow, setInternalShow] = useState(false);
  const showPassword =
    controlledShow !== undefined ? controlledShow : internalShow;
  const isPassword = props.type === "password";
  const actualType = isPassword && showPassword ? "text" : props.type;

  const handleToggle = () => {
    if (onToggleShow) {
      onToggleShow(!showPassword);
    } else {
      setInternalShow(!showPassword);
    }
  };

  return (
    <div>
      {label && (
        <label
          className="mb-1.5 block font-medium text-sm text-zinc-300"
          htmlFor={inputId}
        >
          {label}
        </label>
      )}
      <div className="relative">
        {Icon && (
          <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3 text-zinc-500">
            <Icon size={18} />
          </div>
        )}
        <motion.input
          className={`w-full rounded-lg border border-zinc-700/60 bg-zinc-800/60 px-4 py-2.5 text-zinc-100 placeholder-zinc-500 outline-none transition-colors duration-200 focus:border-emerald-500/60 focus:ring-1 focus:ring-emerald-500/30 ${Icon ? "pl-10" : ""}
            ${isPassword ? "pr-10" : ""}
            ${disabled ? "cursor-default opacity-50" : ""}
            ${disabled ? "focus:border-zinc-700/60 focus:ring-0" : ""}
          `}
          id={inputId}
          transition={{ damping: 25, stiffness: 400, type: "spring" }}
          whileFocus={disabled ? undefined : { scale: 1.01 }}
          {...props}
          disabled={disabled}
          type={actualType}
        />
        {isPassword && (
          <button
            className={`absolute inset-y-0 right-0 flex items-center pr-3 text-zinc-500 ${disabled ? "cursor-default opacity-50" : "cursor-pointer"}`}
            disabled={disabled}
            onClick={handleToggle}
            tabIndex={-1}
            type="button"
          >
            {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
          </button>
        )}
      </div>
    </div>
  );
};

export default Input;
