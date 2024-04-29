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
      initial={
        {
          // boxShadow:
          //   "0px 0px 0px 2px rgba(255, 255, 255, 0.0), 0px 2px 2px 0px rgba(0, 0, 0, 0.0)",
        }
      }
      animate={{
        // boxShadow: showForm
        //   ? "0px 0px 0px 2px rgba(255, 255, 255, 0), 0px 2px 2px 0px rgba(0, 0, 0, 0.0)"
        //   : "0px 0px 0px 2px rgba(255, 255, 255, 0.2), 0px 2px 2px 0px rgba(0, 0, 0, 0.2)",
        transition: {
          // delay: showForm ? 0 : 0.26,
        },
        // scale: shouldScale ? 1.4 : 1,
      }}
      whileHover={{
        // boxShadow:
        //   "0px 0px 0px 2px rgba(255, 255, 255, 1), 0px 2px 2px 0px rgba(0, 0, 0, 0.2)",
        color: "rgba(255, 255, 255, 1)",
      }}
      transition={{
        type: "spring",
        damping: 5,
        mass: 0.01,
        bounce: 0,
        boxShadow: { duration: 0.04, type: "tween", ease: "easeIn" },
      }}
      className="relative origin-top select-none self-center rounded-[32px] bg-[#121212] px-6 py-3 text-xl text-white/80 outline-none focus-visible:shadow-[0px_0px_0px_2px_hsla(0,0%,100%,1),0px_2px_2px_0px_hsla(0,0%,0%,0.2)]"
    >
      <motion.span
        initial={{
          opacity: showForm ? 0 : 1,
        }}
        animate={{
          opacity: showForm ? 0 : 1,
          filter: ["blur(6px)", "blur(0px)"],
        }}
        transition={{
          type: "tween",
          duration: showForm ? 0.017 : 0.24,
          delay: showForm ? 0 : 0.24,
          filter: {
            duration: 0.25,
          },
        }}
      >
        {children}
      </motion.span>
    </motion.button>
  );
}
