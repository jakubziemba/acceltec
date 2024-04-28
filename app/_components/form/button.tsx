"use client";

import { motion } from "framer-motion";

export default function Button({
  children,
  showForm,
  shouldScale,
  handleButtonClick,
}: {
  children: React.ReactNode;
  showForm: boolean;
  shouldScale?: boolean;
  handleButtonClick: () => void;
}) {
  return (
    <motion.button
      onClick={handleButtonClick}
      initial={{
        boxShadow:
          "0px 0px 0px 2px rgba(255, 255, 255, 0.2), 0px 2px 2px 0px rgba(0, 0, 0, 0.2)",
      }}
      animate={{
        boxShadow: showForm
          ? "0px 0px 0px 2px rgba(255, 255, 255, 0), 0px 2px 2px 0px rgba(0, 0, 0, 0.0)"
          : "0px 0px 0px 2px rgba(255, 255, 255, 0.2), 0px 2px 2px 0px rgba(0, 0, 0, 0.2)",
        scale: shouldScale ? 1.2 : 1,
      }}
      whileHover={{
        boxShadow:
          "0px 0px 0px 2px rgba(255, 255, 255, 1), 0px 2px 2px 0px rgba(0, 0, 0, 0.2)",
        color: "rgba(255, 255, 255, 1)",
      }}
      // whileInView={{ scale: 1.1, translateZ: 0 }}
      // viewport={{ margin: "-15%" }}
      transition={{
        type: "spring",
        damping: 5,
        mass: 0.01,
        bounce: 0,
        boxShadow: { duration: 0.15, delay: 0.05 },
      }}
      className="relative origin-center select-none self-center rounded-[32px] px-6 py-3 text-xl text-white/80 outline-none focus-visible:shadow-[0px_0px_0px_2px_hsla(0,0%,100%,1),0px_2px_2px_0px_hsla(0,0%,0%,0.2)]"
    >
      <motion.span
        initial={{ opacity: showForm ? 0 : 1, filter: "blur(4px)" }}
        animate={{ opacity: showForm ? 0 : 1, filter: "blur(0px)" }}
        transition={{
          opacity: {
            type: "tween",
            duration: showForm ? 0.05 : 0.2,
            delay: showForm ? 0 : 0.15,
          },
        }}
      >
        {children}
      </motion.span>
    </motion.button>
  );
}
