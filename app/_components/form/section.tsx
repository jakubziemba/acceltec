"use client";

import { useState, useRef, useEffect } from "react";
import {
  motion,
  useInView,
  useScroll,
  useSpring,
  useTransform,
} from "framer-motion";
import Form from "./form";

export default function FormSection() {
  const containerRef = useRef<null | HTMLDivElement>(null);
  const formRef = useRef<null | HTMLFormElement>(null);
  const [showForm, setShowForm] = useState(false);
  const [shouldScroll, setShouldScroll] = useState(false);

  function handleButtonClick() {
    setShowForm(true);
    setShouldScroll(true);
  }

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["5% end", "end end"],
  });

  const containerInView = useInView(containerRef, {
    amount: 0.6,
  });

  const springScale = useSpring(scrollYProgress, {
    stiffness: 500,
    damping: 30,
    mass: 0.001,
  });

  const scale = useTransform(springScale, [0.05, 0.4], [1, 1.2]);

  useEffect(() => {
    if (containerInView) {
      setShowForm(true);
    }
  }, [containerInView]);

  useEffect(() => {
    if (!showForm || !formRef.current) return;

    formRef.current?.scrollIntoView({
      block: "start",
      behavior: "smooth",
    });
  }, [showForm]);

  return (
    <section
      ref={containerRef}
      className="relative bottom-0 mx-auto flex min-h-[60vh] w-full max-w-4xl flex-col items-center px-4 pb-20 pt-16 lg:px-0"
    >
      {!showForm ? (
        <motion.button
          onClick={handleButtonClick}
          layoutId="form-button"
          className="origin-top select-none rounded-[32px] px-6 py-3 text-xl text-white/80 shadow-[0px_0px_0px_2px_hsla(0,0%,100%,0.2),0px_2px_2px_0px_hsla(0,0%,0%,0.2)] outline-none transition duration-[200ms] ease-in hover:scale-[1.01] hover:text-white hover:shadow-[0px_0px_0px_2px_hsla(0,0%,100%,1),0px_2px_2px_0px_hsla(0,0%,0%,0.2)] focus-visible:shadow-[0px_0px_0px_2px_hsla(0,0%,100%,1),0px_2px_2px_0px_hsla(0,0%,0%,0.2)] active:scale-[0.99]"
          style={{ scale }}
        >
          Pitch your project
        </motion.button>
      ) : (
        <Form ref={formRef} />
      )}
    </section>
  );
}
