"use client";

import { useRef, memo } from "react";
import { motion, useInView } from "framer-motion";

const AnimatedText = memo(function AnimatedText({
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
    <Wrapper className={className}>
      <motion.span
        ref={ref}
        initial={{
          opacity: 0,
          y: 8,
        }}
        animate={{
          opacity: isInView ? 1 : 0,
          y: isInView ? 0 : 8,
        }}
        transition={{ duration: 0.38 }}
        className="inline-flex origin-top-left"
      >
        {children}
      </motion.span>
    </Wrapper>
  );
});

export default AnimatedText;
