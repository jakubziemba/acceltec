"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { tw } from "@/utils/tailwind";

export default function AnimatedText({
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
