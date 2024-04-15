"use client";

import { motion } from "framer-motion";
import LogoHero from "./logo";

export default function HeroSection() {
  return (
    <section className="w-screen overflow-hidden pt-32 lg:h-screen lg:pt-48">
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
    </section>
  );
}
