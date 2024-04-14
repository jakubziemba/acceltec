"use client";

import { motion } from "framer-motion";
import LogoHero from "./logo";

export default function HeroSection() {
  return (
    <section className="min-h-screen w-screen overflow-hidden pb-12">
      {/* <div className="flex w-full items-center justify-center px-6"> */}
      <LogoHero className="relative -bottom-6 top-0 h-full w-full min-w-[890px] pb-12 lg:pt-24" />
      {/* </div> */}
      <motion.h1
        initial={{ opacity: 0, scale: 0.98, y: -10 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        transition={{
          type: "spring",
          duration: 1.2,
          bounce: 0,
          opacity: { type: "linear", duration: 1.2 },
        }}
        className="px-6 text-center text-[1.75rem] font-normal leading-8 lg:text-[2.5rem] lg:leading-[1.8]"
      >
        We partner with founders who look for greatness
      </motion.h1>
    </section>
  );
}
