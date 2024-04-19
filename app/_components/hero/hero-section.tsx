"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import LogoHero from "./logo";

export default function HeroSection() {
  const { scrollYProgress } = useScroll();
  const y = useTransform(scrollYProgress, [0, 0.7], [0, -400]);
  const opacity = useTransform(scrollYProgress, [0, 0.6], [1, 0]);
  return (
    <motion.section
      className="fixed left-0 top-0 h-screen w-screen overflow-hidden pt-32 lg:h-screen lg:pt-48"
      style={{ y, opacity }}
    >
      <motion.h1
        initial={{ opacity: 0, scale: 0.97 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{
          type: "spring",
          duration: 1.2,
          bounce: 0,
          opacity: { type: "linear", duration: 1.2 },
        }}
        className="text-balance px-6 text-center text-[1.75rem] font-normal leading-8 lg:text-[2.5rem] lg:leading-[1.8]"
      >
        We partner with founders who look for greatness
      </motion.h1>
      <LogoHero />
    </motion.section>
  );
}
