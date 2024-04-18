"use client";

import { useState, useRef, useEffect } from "react";
import {
  AnimatePresence,
  motion,
  useInView,
  useMotionValueEvent,
  useScroll,
} from "framer-motion";
import Form from "./form";
import { tw } from "@/utils/tailwind";
import AnimatedText from "../animated-text";

export default function FormSection() {
  const containerRef = useRef<null | HTMLDivElement>(null);
  const buttonRef = useRef<null | HTMLButtonElement>(null);
  const formRef = useRef<null | HTMLFormElement>(null);
  const [showForm, setShowForm] = useState(false);
  const [shouldScroll, setShouldScroll] = useState(false);

  function handleButtonClick() {
    setShowForm(true);
    setShouldScroll(true);
  }

  const { scrollY, scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["0% end", "end end"],
  });

  const containerInView = useInView(containerRef, {});

  const buttonInView = useInView(buttonRef, {
    margin: "-25%",
  });

  useMotionValueEvent(scrollYProgress, "change", (value) => {
    if (value > 0.85) {
      setShowForm(true);
      setShouldScroll(false);
    }

    if (shouldScroll) return;

    if (value < 0.85) {
      setShowForm(false);
    }
  });

  useEffect(() => {
    if (!shouldScroll || !formRef.current) return;

    formRef.current?.scrollIntoView({
      block: "start",
      behavior: "smooth",
    });
  }, [shouldScroll]);

  return (
    <>
      <motion.section
        ref={containerRef}
        className={tw(
          "relative mx-auto mt-20 min-h-screen w-full max-w-xl origin-center space-y-20 px-6 [perspective:45px] lg:max-w-4xl lg:px-0 ",
        )}
      >
        <motion.div
          initial={{ opacity: 1, translateZ: "0px" }}
          animate={{
            // scale: showForm ? 0.95 : 1,
            opacity: showForm ? 0.1 : 1,
            translateZ: showForm ? "-3px" : "0px",
          }}
          transition={{
            duration: 0.2,
            opacity: { type: "linear", duration: 0.2 },
          }}
          className="sticky top-20 mx-auto flex flex-col space-y-8 text-balance text-2xl leading-6 [perspective:1000px] xs:[text-wrap:initial] lg:space-y-6 lg:text-4xl lg:leading-10"
        >
          <AnimatedText el="h2" className="origin-bottom text-white/80">
            Berlin-based software studio that exclusively works with founders,
            executives and innovative teams.
          </AnimatedText>
          <AnimatedText className="text-white/40">
            We partner with companies and founders who aren’t afraid to
            challenge conventional order. We invest our time, resources and
            networks in those who recognize the value we bring to the table.
          </AnimatedText>
          <AnimatedText className="text-white/40">
            We work in a research driven manner. We try to ask the right
            questions to understand and uncover the problem space. We identify
            the nail before we start worrying about the hammer.
          </AnimatedText>
          <div className="flex w-full justify-center pt-10">
            {!showForm && (
              <motion.button
                ref={buttonRef}
                onClick={handleButtonClick}
                layoutId="form-button"
                layout
                initial={{
                  translateZ: 0,
                  boxShadow:
                    "0px 0px 0px 2px rgba(255, 255, 255, 0.2), 0px 2px 2px 0px rgba(0, 0, 0, 0.2)",
                }}
                animate={{
                  translateZ: 0,
                  boxShadow:
                    "0px 0px 0px 2px rgba(255, 255, 255, 0.2), 0px 2px 2px 0px rgba(0, 0, 0, 0.2)",
                }}
                exit={{
                  translateZ: 0,
                  boxShadow:
                    "0px 0px 0px 2px rgba(255, 255, 255, 0), 0px 2px 2px 0px rgba(0, 0, 0, 0)",
                }}
                whileInView={{ scale: 1.25, translateZ: 0 }}
                whileHover={{
                  boxShadow:
                    "0px 0px 0px 2px rgba(255, 255, 255, 1), 0px 2px 2px 0px rgba(0, 0, 0, 0.2)",
                  color: "white",
                }}
                viewport={{ margin: "-20%" }}
                transition={{
                  type: "spring",
                  damping: 5,
                  mass: 0.01,
                  bounce: 0,
                }}
                className="origin-top select-none self-center rounded-[32px] px-6 py-3 text-xl text-white/80 outline-none focus-visible:shadow-[0px_0px_0px_2px_hsla(0,0%,100%,1),0px_2px_2px_0px_hsla(0,0%,0%,0.2)]"
              >
                <motion.span
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.3, delay: showForm ? 0 : 0.3 }}
                >
                  Pitch your project
                </motion.span>
              </motion.button>
            )}
          </div>
        </motion.div>
      </motion.section>
      {showForm && (
        <motion.div
          key="pitch"
          layout
          // initial={{ y: "0%" }}
          // animate={{ y: showForm ? "40%" : "0%" }}
          exit={{ scale: 0 }}
          transition={{
            duration: 0.25,
          }}
          className="fixed bottom-20 flex w-full flex-col items-center"
        >
          <Form ref={formRef} showForm={showForm} />
        </motion.div>
      )}
    </>
  );
}
