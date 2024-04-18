"use client";

import { useState, useRef, useEffect } from "react";
import {
  AnimatePresence,
  motion,
  useInView,
  useMotionValueEvent,
  useScroll,
  useSpring,
  useTransform,
} from "framer-motion";
import Form from "./form";
import { tw } from "@/utils/tailwind";

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
    offset: ["start end", "end end"],
  });

  const containerInView = useInView(containerRef, {
    amount: 0.85,
  });

  const buttonInView = useInView(buttonRef, {
    amount: 0.9,
  });

  // useMotionValueEvent(scrollYProgress, "change", (value) => {
  //   // console.log(containerInView);
  //   console.log(buttonInView);
  // });

  // const buttonInView = useInView(wrapperRef, {
  //   amount: 0.2,
  //   // margin: "100px",
  // });

  // const springScale = useSpring(scrollYProgress, {
  //   stiffness: 500,
  //   damping: 30,
  //   mass: 0.001,
  // });

  // const scale = useTransform(springScale, [0.5, 0.8], [1, 1.3]);

  // useMotionValueEvent(scrollYProgress, "change", (value) => {
  //   console.log(scrollYProgress);
  //   const previousScrollY = scrollYProgress.getPrevious();
  //   if (
  //     previousScrollY !== undefined &&
  //     value < previousScrollY &&
  //     scrollYProgress.get() < 0.7
  //   ) {
  //     setShowForm(false);
  //   }

  //   // if (scrollYProgress.get() > 0.85) {
  //   //   setShowForm(true);
  //   //   // console.log("show form");
  //   // }
  // });

  useEffect(() => {
    if (containerInView) {
      setShowForm(true);
    } else {
      setShowForm(false);
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
    <>
      <motion.section
        ref={containerRef}
        className={tw(
          "relative mx-auto mt-20 h-[900px] max-w-xl origin-center space-y-20 px-6 lg:max-w-4xl lg:px-0",
        )}
      >
        <motion.div
          key="about"
          animate={{
            scale: showForm ? [1, 0.85] : 1,
            opacity: showForm ? 0 : 1,
          }}
          transition={{
            bounce: 0,
            opacity: { type: "linear", duration: 0.2 },
          }}
          className="relative mx-auto origin-center space-y-8 text-balance text-2xl leading-6 xs:[text-wrap:initial] lg:space-y-6 lg:text-4xl lg:leading-10"
        >
          <h2 className="text-white/80">
            Berlin-based software studio that exclusively works with founders,
            executives and innovative teams.
          </h2>
          <p className="text-white/40">
            We partner with companies and founders who aren’t afraid to
            challenge conventional order. We invest our time, resources and
            networks in those who recognize the value we bring to the table.
          </p>
          <p className="text-white/40">
            We work in a research driven manner. We try to ask the right
            questions to understand and uncover the problem space. We identify
            the nail before we start worrying about the hammer.
          </p>
        </motion.div>
        <motion.div
          key="pitch"
          initial={{ y: "0%" }}
          animate={{ y: showForm ? "-50%" : "0%" }}
          transition={{
            duration: 0.25,
          }}
          className={tw("relative z-10 flex w-full flex-col items-center")}
        >
          {!showForm ? (
            <motion.button
              ref={buttonRef}
              onClick={handleButtonClick}
              layoutId="form-button"
              layout
              animate={{ scale: buttonInView ? 1.25 : 1 }}
              transition={{
                type: "spring",
                damping: 5,
                mass: 0.01,
                bounce: 0,
                duration: 0.5,
              }}
              className="origin-top select-none rounded-[32px] px-6 py-3 text-xl text-white/80 shadow-[0px_0px_0px_2px_hsla(0,0%,100%,0.2),0px_2px_2px_0px_hsla(0,0%,0%,0.2)] outline-none transition-shadow duration-200 hover:scale-[1.01] hover:text-white hover:shadow-[0px_0px_0px_2px_hsla(0,0%,100%,1),0px_2px_2px_0px_hsla(0,0%,0%,0.2)] focus-visible:shadow-[0px_0px_0px_2px_hsla(0,0%,100%,1),0px_2px_2px_0px_hsla(0,0%,0%,0.2)] active:scale-[0.99]"
              // style={{ scale: buttonInView ? 1.25 : 1 }}
            >
              <motion.span
                initial={{ opacity: 0, scale: 1 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.3, delay: 0.2 }}
                className="scale-100"
              >
                Pitch your project
              </motion.span>
            </motion.button>
          ) : (
            <Form ref={formRef} showForm={showForm} />
          )}
        </motion.div>
      </motion.section>
      {/* <motion.div
        ref={containerRef}
        layoutRoot
        className={tw(
          "relative mx-auto flex min-h-[60vh] w-full max-w-4xl flex-col items-center px-4 pb-20 pt-16 lg:px-0",
          showForm ? "-top-64" : "top-0",
        )}
      >
        {!showForm ? (
          <motion.button
            onClick={handleButtonClick}
            layoutId="form-button"
            layout
            className="origin-top select-none rounded-[32px] px-6 py-3 text-xl text-white/80 shadow-[0px_0px_0px_2px_hsla(0,0%,100%,0.2),0px_2px_2px_0px_hsla(0,0%,0%,0.2)] outline-none transition duration-[200ms] ease-in hover:scale-[1.01] hover:text-white hover:shadow-[0px_0px_0px_2px_hsla(0,0%,100%,1),0px_2px_2px_0px_hsla(0,0%,0%,0.2)] focus-visible:shadow-[0px_0px_0px_2px_hsla(0,0%,100%,1),0px_2px_2px_0px_hsla(0,0%,0%,0.2)] active:scale-[0.99]"
            style={{ scale }}
          >
            Pitch your project
          </motion.button>
        ) : (
          <Form ref={formRef} showForm={showForm} />
        )}
      </motion.div> */}
    </>
  );
}
