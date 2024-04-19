"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { tw } from "@/utils/tailwind";

export default function AboutSection() {
  return (
    <section className="flex max-w-xl flex-col items-center px-6 py-20 lg:max-w-4xl lg:px-0">
      <div className="mx-auto space-y-8 text-balance text-2xl leading-6 [perspective:1000px] xs:[text-wrap:initial] lg:space-y-6 lg:text-4xl lg:leading-10">
        <AnimatedText el="h2" className="origin-bottom text-white/80">
          Berlin-based software studio that exclusively works with founders,
          executives and innovative teams.
        </AnimatedText>
        <AnimatedText className="text-white/40">
          We partner with companies and founders who aren’t afraid to challenge
          conventional order. We invest our time, resources and networks in
          those who recognize the value we bring to the table.
        </AnimatedText>
        <AnimatedText className="text-white/40">
          We work in a research driven manner. We try to ask the right questions
          to understand and uncover the problem space. We identify the nail
          before we start worrying about the hammer.
        </AnimatedText>
      </div>
    </section>
  );
}

function AnimatedText({
  el: Wrapper = "p",
  className,
  children,
}: {
  el?: keyof JSX.IntrinsicElements;
  className?: string;
  children: any;
}) {
  const ref = useRef<HTMLElement>(null);
  const isInView = useInView(ref, {
    margin: "-20%",
    once: true,
  });
  return (
    <Wrapper className={tw("[perspective:100px]", className)}>
      <motion.span
        ref={ref}
        initial={{
          opacity: 0,
          transform: "translate3d(0px, 8px, -1px) scaleX(0.98)",
        }}
        animate={{
          opacity: isInView ? 1 : 0,
          transform: isInView
            ? "translate3d(0px, 0px, 0px) scaleX(1)"
            : "translate3d(0px, 8px, -1px) scaleX(0.98)",
        }}
        transition={{ duration: 0.38 }}
        className="inline-flex"
      >
        {children}
      </motion.span>
    </Wrapper>
  );
}
