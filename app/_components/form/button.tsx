"use client";

import { motion } from "framer-motion";

export default function Button({
  children,
  showForm,
  handleButtonClick,
}: {
  children: React.ReactNode;
  showForm: boolean;
  handleButtonClick: () => void;
}) {
  return (
    <motion.button
      initial={{ opacity: 1 }}
      onClick={handleButtonClick}
      whileHover={{
        color: "rgba(255, 255, 255, 1)",
      }}
      whileInView={{
        opacity: 1,
        boxShadow: "0px 16px 32px 8px rgba(0, 0, 0, 0.35)",
      }}
      viewport={{ margin: "-60px", once: true }}
      transition={{
        type: "tween",
        duration: 0.38,
      }}
      className="relative origin-bottom select-none self-center rounded-[32px] bg-[#121212] px-6 py-3 text-lg text-white/80 outline-none focus-visible:shadow-[0px_0px_0px_2px_hsla(0,0%,100%,1),0px_2px_2px_0px_hsla(0,0%,0%,0.2)] sm:text-xl"
    >
      <motion.span
        initial={{
          opacity: showForm ? 0 : 1,
        }}
        animate={{
          opacity: showForm ? 0 : 1,
          filter: showForm
            ? ["blur(6px)", "blur(0px)"]
            : ["blur(6px)", "blur(0px)"],
        }}
        transition={{
          type: "tween",
          duration: showForm ? 0.056 : 0.24,
          delay: showForm ? 0 : 0.2,
          filter: {
            duration: 0.3,
            delay: showForm ? 0 : 0.2,
          },
        }}
      >
        {children}
      </motion.span>
    </motion.button>
  );
}
