"use client";

import React from "react";
import Link from "next/link";
import { motion, useMotionValueEvent, useScroll } from "framer-motion";
import { useState } from "react";

const ButtonHome = ({ children }: { children: React.ReactNode }) => {
  const { scrollY } = useScroll();
  const [isVisible, setIsVisible] = useState(true);
  let lastScrollY = scrollY.get();

  const MotionLink = motion(Link);

  useMotionValueEvent(scrollY, "change", (currentScrollY) => {
    if (currentScrollY > lastScrollY && currentScrollY > 100) {
      setIsVisible(false);
    } else if (currentScrollY < lastScrollY) {
      setIsVisible(true);
    } else {
      setIsVisible(true);
    }
    lastScrollY = currentScrollY;
  });

  return (
    <MotionLink
      href="/"
      initial={{
        opacity: isVisible ? 0 : 1,
        scale: isVisible ? 0.75 : 1,
        boxShadow: "0px 16px 32px 8px rgba(0, 0, 0, 0.35)",
      }}
      animate={{
        opacity: isVisible ? 1 : 0,
        scale: isVisible ? 1 : 0.75,
        visibility: isVisible ? "visible" : "hidden",
      }}
      whileHover={{
        color: "rgba(255, 255, 255, 1)",
      }}
      whileTap={{
        scale: 0.95,
      }}
      transition={{
        scale: { duration: isVisible ? 0.12 : 0.1 },
        opacity: {
          type: "tween",
          duration: isVisible ? 0.15 : 0.08,
          delay: isVisible ? 0 : 0.03,
        },
        visibility: { delay: 0.16 },
      }}
      className="relative origin-center select-none self-center rounded-[32px] bg-[#161616] px-6 py-3 text-lg text-white/80 outline-none focus-visible:shadow-[0px_0px_0px_2px_hsla(0,0%,100%,1),0px_2px_2px_0px_hsla(0,0%,0%,0.2)] sm:text-xl"
      style={{
        boxShadow:
          "0px 0px 0px 2px rgba(255, 255, 255, 0.2), 0px 2px 2px 0px rgba(0, 0, 0, 0.2)",
        opacity: 1,
      }}
    >
      {children}
    </MotionLink>
  );
};

export default React.memo(ButtonHome);
