"use client";

import { useState, useRef, useEffect } from "react";
import {
  MotionConfig,
  motion,
  useInView,
  useMotionValueEvent,
  useScroll,
} from "framer-motion";
import Form from "./form";

export default function FormSection() {
  const container = useRef(null);
  const [showForm, setShowForm] = useState(false);
  const isInView = useInView(container, {
    amount: 0.75,
  });

  useEffect(() => {
    if (isInView) {
      setShowForm(true);
    }
  }, [isInView]);

  return (
    <section
      ref={container}
      className="mx-auto flex min-h-[70vh] w-full max-w-4xl flex-col items-center px-4 pb-20 lg:px-0"
    >
      <MotionConfig
        transition={{ type: "spring", mass: 0.6, damping: 20, stiffness: 100 }}
      >
        {!showForm ? (
          <motion.button
            onClick={() => setShowForm(true)}
            layoutId="form-button"
            className="my-32 origin-top select-none rounded-[32px] px-6 py-3 text-xl text-white/80 shadow-[0px_0px_0px_2px_hsla(0,0%,100%,0.2),0px_2px_2px_0px_hsla(0,0%,0%,0.2)] outline-none transition duration-[200ms] ease-in hover:scale-[1.01] hover:text-white hover:shadow-[0px_0px_0px_2px_hsla(0,0%,100%,1),0px_2px_2px_0px_hsla(0,0%,0%,0.2)] focus-visible:shadow-[0px_0px_0px_2px_hsla(0,0%,100%,1),0px_2px_2px_0px_hsla(0,0%,0%,0.2)] active:scale-[0.99]"
          >
            Pitch your project
          </motion.button>
        ) : (
          <Form />
        )}
      </MotionConfig>
    </section>
  );
}
