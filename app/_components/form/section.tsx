"use client";

import { useState, useRef, useEffect } from "react";
import { motion, useMotionValueEvent, useScroll } from "framer-motion";
import Form from "./form";
import { tw } from "@/utils/tailwind";
import AnimatedText from "../animated-text";
import Button from "./button";

export default function FormSection() {
  const containerRef = useRef<null | HTMLDivElement>(null);
  const formRef = useRef<null | HTMLFormElement>(null);
  const [showForm, setShowForm] = useState(false);
  const [shouldScroll, setShouldScroll] = useState(false);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["0% end", "end end"],
  });

  function handleButtonClick() {
    setShowForm(true);
    setShouldScroll(true);
  }

  useMotionValueEvent(scrollYProgress, "change", (value) => {
    if (value > 0.9) {
      setShowForm(true);
      setShouldScroll(false);
    }

    if (shouldScroll) return;

    if (value < 0.9) {
      setShowForm(false);
    }
  });

  useEffect(() => {
    if (!shouldScroll || !formRef.current) return;

    formRef.current?.scrollIntoView({
      block: "end",
    });
  }, [shouldScroll]);

  return (
    <section
      ref={containerRef}
      className="2xs:mt-[80vh] 4k:mt-[60vh] relative mt-[100vh] w-full [perspective:45px] lg:mt-[100vh] 2xl:mt-[80vh]"
    >
      <motion.div
        initial={{ opacity: 1, translateZ: "0px", y: 0 }}
        animate={{
          opacity: showForm ? 0.1 : 1,
          translateZ: showForm ? "-2px" : "0px",
          y: showForm ? 20 : 0,
        }}
        transition={{
          duration: 0.25,
          opacity: { type: "linear", duration: 0.2 },
        }}
        className="sticky top-0 z-10 mx-auto flex h-screen w-full max-w-xl -translate-y-1/2 flex-col items-center justify-center space-y-8 text-balance px-6 text-2xl leading-6 [perspective:1000px] supports-[height:100dvh]:h-dvh xs:[text-wrap:initial] lg:max-w-4xl lg:space-y-6 lg:px-0 lg:pt-0 lg:text-4xl lg:leading-10"
      >
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
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ margin: "-10%", once: true }}
          className="flex w-full justify-center pt-8"
        >
          {!showForm && (
            <Button showForm={showForm} handleButtonClick={handleButtonClick}>
              Pitch your project
            </Button>
          )}
        </motion.div>
      </motion.div>
      <motion.div
        key="pitch"
        layout
        initial={{ position: "static", bottom: "0%" }}
        animate={{
          position: showForm ? "sticky" : "static",
          y: showForm ? -160 : 0,
          bottom: "2%",
        }}
        exit={{ opacity: 0 }}
        className="relative z-20 flex h-[476px] w-full flex-col items-center px-4 lg:px-0"
      >
        {showForm && (
          <div className="sticky bottom-0 w-full">
            <Form ref={formRef} showForm={showForm} />
          </div>
        )}
      </motion.div>
    </section>
  );
}
