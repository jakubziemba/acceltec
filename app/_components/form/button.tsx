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
      onClick={handleButtonClick}
      layoutId="form-button"
      layout
      initial={{
        translateZ: 0,
        boxShadow:
          "0px 0px 0px 2px rgba(255, 255, 255, 0.2), 0px 2px 2px 0px rgba(0, 0, 0, 0.2)",
      }}
      animate={{
        translateZ: 0,
        boxShadow:
          "0px 0px 0px 2px rgba(255, 255, 255, 0.2), 0px 2px 2px 0px rgba(0, 0, 0, 0.2)",
      }}
      exit={{
        translateZ: 0,
        boxShadow:
          "0px 0px 0px 2px rgba(255, 255, 255, 0), 0px 2px 2px 0px rgba(0, 0, 0, 0)",
      }}
      whileHover={{
        boxShadow:
          "0px 0px 0px 2px rgba(255, 255, 255, 1), 0px 2px 2px 0px rgba(0, 0, 0, 0.2)",
        color: "rgba(255, 255, 255, 1)",
      }}
      whileInView={{ scale: 1.1, translateZ: 0 }}
      viewport={{ margin: "-12%" }}
      transition={{
        type: "spring",
        damping: 5,
        mass: 0.01,
        bounce: 0,
      }}
      className="relative origin-top select-none self-center rounded-[32px] px-6 py-3 text-xl text-white/80 outline-none focus-visible:shadow-[0px_0px_0px_2px_hsla(0,0%,100%,1),0px_2px_2px_0px_hsla(0,0%,0%,0.2)]"
    >
      <motion.span
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{
          type: "linear",
          duration: 0.3,
          ease: "easeIn",
          delay: showForm ? 0 : 0.3,
        }}
      >
        {children}
      </motion.span>
    </motion.button>
  );
}
