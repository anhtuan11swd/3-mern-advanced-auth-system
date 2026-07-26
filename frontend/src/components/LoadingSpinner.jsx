import { motion } from "framer-motion";

const LoadingSpinner = () => {
  return (
    <div className="flex min-h-screen items-center justify-center bg-zinc-950">
      <motion.div
        animate={{ rotate: 360 }}
        className="h-10 w-10 rounded-full border-[3px] border-emerald-500/30 border-t-emerald-400"
        transition={{
          duration: 0.8,
          ease: "linear",
          repeat: Number.POSITIVE_INFINITY,
        }}
      />
    </div>
  );
};

export default LoadingSpinner;
