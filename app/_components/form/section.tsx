"use client";

import { useState, useRef, useEffect } from "react";
import {
  MotionConfig,
  motion,
  useInView,
  useMotionValueEvent,
  useScroll,
  useSpring,
  useTransform,
} from "framer-motion";
import Form from "./form";

export default function FormSection() {
  const containerRef = useRef<null | HTMLDivElement>(null);
  const formRef = useRef<null | HTMLFormElement>(null);
  const [showForm, setShowForm] = useState(false);
  const containerInView = useInView(containerRef, {
    amount: 0.5,
  });
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["100px end", "end end"],
  });

  const springScale = useSpring(scrollYProgress, {
    stiffness: 2000,
    damping: 15,
    mass: 0.1,
    bounce: 0,
  });
  const scale = useTransform(scrollYProgress, [0, 1], [1, 1.5]);

  useEffect(() => {
    if (containerInView) {
      setShowForm(true);
    }
  }, [containerInView]);

  useEffect(() => {
    if (showForm && containerRef.current) {
      window.requestAnimationFrame(() => {
        if (!containerRef.current) return;
        // Interrupt the current scroll
        const currentScrollPosition = containerRef.current.scrollTop;
        containerRef.current.scrollTop = currentScrollPosition;

        // Now, scroll into view
        formRef.current?.scrollIntoView({
          block: "start",
          behavior: "smooth",
        });
      });
    }
  }, [showForm]);

  return (
    <section
      ref={containerRef}
      className="relative bottom-0 mx-auto flex min-h-[70vh] w-full max-w-4xl flex-col items-center px-4 pb-20 pt-16 lg:px-0"
    >
      {/* <MotionConfig
        transition={{ type: "spring", mass: 0.6, damping: 20, stiffness: 100 }}
      > */}
      {!showForm ? (
        <motion.button
          onClick={() => setShowForm(true)}
          layoutId="form-button"
          className="sticky bottom-0 left-0 right-0 origin-top select-none rounded-[32px] px-6 py-3 text-xl text-white/80 shadow-[0px_0px_0px_2px_hsla(0,0%,100%,0.2),0px_2px_2px_0px_hsla(0,0%,0%,0.2)] outline-none transition duration-[200ms] ease-in hover:scale-[1.01] hover:text-white hover:shadow-[0px_0px_0px_2px_hsla(0,0%,100%,1),0px_2px_2px_0px_hsla(0,0%,0%,0.2)] focus-visible:shadow-[0px_0px_0px_2px_hsla(0,0%,100%,1),0px_2px_2px_0px_hsla(0,0%,0%,0.2)] active:scale-[0.99]"
          style={{ scale }}
        >
          Pitch your project
        </motion.button>
      ) : (
        <Form ref={formRef} />
      )}
      {/* </MotionConfig> */}
    </section>
  );
}
