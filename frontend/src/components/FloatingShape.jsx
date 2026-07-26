import { motion } from "framer-motion";

const FloatingShape = ({ color, size, top, left, delay }) => {
  return (
    <motion.div
      animate={{
        rotate: [0, 360, 0],
        scale: [1, 1.2, 1],
        x: ["0%", "100%", "0%"],
        y: ["0%", "50%", "0%"],
      }}
      className="pointer-events-none absolute rounded-full"
      style={{
        backgroundColor: color,
        filter: "blur(80px)",
        height: size,
        left,
        opacity: 0.15,
        top,
        width: size,
      }}
      transition={{
        delay: delay || 0,
        duration: 20 + delay,
        ease: "linear",
        repeat: Number.POSITIVE_INFINITY,
      }}
    />
  );
};

export default FloatingShape;
