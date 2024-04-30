"use client";

import { useState, useRef, useEffect } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import Form from "./form";
import { tw } from "@/utils/tailwind";
import AnimatedText from "../animated-text";
import Button from "./button";
import CanvasAnimation from "../canvas-animation";
import Footer from "../footer/footer";

export default function FormSection() {
  const containerRef = useRef<null | HTMLDivElement>(null);
  const sectionRef = useRef<null | HTMLDivElement>(null);
  const formRef = useRef<null | HTMLFormElement>(null);
  const [showForm, setShowForm] = useState(false);
  const [shouldButtonScale, setShouldButtonScale] = useState(false);
  const [shouldScroll, setShouldScroll] = useState(false);
  const [playCanvas, setPlayCanvas] = useState(false);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["0% end", "end end"],
  });

  const { scrollYProgress: scrollYProgressSection } = useScroll({
    target: sectionRef,
  });

  const { scrollYProgress: scrollYProgressCanvas } = useScroll({
    target: sectionRef,
    offset: ["30% end", "end end"],
  });

  const buttonScale = useTransform(
    scrollYProgressSection,
    [0.25, 0.95],
    [1, 1.4],
  );

  const textTranslateZ = useTransform(
    scrollYProgressSection,
    [0.25, 0.95],
    [0, -10],
  );

  const textOpacity = useTransform(scrollYProgressSection, [0.4, 0.95], [1, 0]);

  const canvasOpacity = useTransform(
    scrollYProgressCanvas,
    [0, 0.25, 0.8],
    [0, 1, 1],
  );

  function handleButtonClick() {
    setShowForm(true);
    setShouldScroll(true);
  }

  useEffect(() => {
    const handleScrollSection = (value: any) => {
      if (value < 0.25) {
        setShouldButtonScale(false);
      }

      if (value > 0.25) {
        setShouldButtonScale(true);
      }
    };

    const unsubscribe = scrollYProgressSection.on(
      "change",
      handleScrollSection,
    );

    return () => {
      unsubscribe();
    };
  }, [scrollYProgressSection, showForm]);

  useEffect(() => {
    const handleScroll = (value: any) => {
      if (value > 0.95) {
        setShowForm(true);
        setShouldScroll(false);
      }

      if (shouldScroll) return; // guard for button click

      if (value < 0.95) {
        setShowForm(false);
        setShouldScroll(false);
      }
    };

    const unsubscribe = scrollYProgress.on("change", handleScroll);

    return () => {
      unsubscribe();
    };
  }, [scrollYProgress, shouldScroll]);

  useEffect(() => {
    if (!shouldScroll || !formRef.current) return;

    const scrollTimeout = setTimeout(() => {
      formRef.current?.scrollIntoView({
        block: "start",
        behavior: "smooth",
      });
    }, 80);

    return () => {
      clearTimeout(scrollTimeout);
    };
  }, [shouldScroll]);

  useEffect(() => {
    const unsubscribe = scrollYProgressCanvas.on("change", (value: any) => {
      if (value > 0) {
        setPlayCanvas(true);
      }

      if (value <= 0) {
        setPlayCanvas(false);
      }
    });

    return () => {
      unsubscribe();
    };
  }, [scrollYProgressCanvas]);

  return (
    <div ref={containerRef} className="relative w-screen overflow-clip">
      <section
        ref={sectionRef}
        className="relative mt-[100dvh] h-[160dvh] w-full [perspective:45px]"
      >
        <div className="sticky top-0 mx-auto flex h-screen w-full max-w-xl origin-center flex-col items-center justify-center text-balance px-6 text-2xl leading-6 [perspective:45px] xs:[text-wrap:initial] lg:max-w-4xl lg:px-0 lg:pt-0 lg:text-4xl lg:leading-10">
          <motion.div
            initial={{ translateZ: "0px" }}
            animate={{
              // opacity: showForm ? 0 : undefined,
              translateZ: showForm ? "-15px" : "0px",
            }}
            transition={{
              y: { duration: 0.25, stiffness: 150, damping: 28 },
              opacity: { type: "tween", duration: 0.15 },
            }}
            className="relative flex h-screen flex-col items-center justify-center space-y-8"
            style={{
              translateZ: textTranslateZ,
              opacity: textOpacity,
            }}
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
          </motion.div>
          <motion.div
            initial={{
              y: shouldButtonScale ? -40 : 0,
            }}
            animate={{
              y:
                shouldButtonScale && !showForm
                  ? -40
                  : shouldButtonScale && showForm
                    ? 0
                    : 0,
            }}
            transition={{
              y: { duration: 0.25, stiffness: 150, damping: 28 },
            }}
            className="relative flex h-14 w-full justify-center"
          >
            <motion.div
              initial={{
                opacity: showForm ? 0 : 1,
                filter: showForm ? "blur(4px)" : "blur(0px)",
                scale: showForm && !shouldScroll ? 1.8 : undefined,
              }}
              animate={{
                opacity: showForm ? 0 : 1,
                filter: showForm ? "blur(4px)" : "blur(0px)",
                scale: showForm && !shouldScroll ? 1.8 : undefined,
                visibility: showForm ? "hidden" : "visible",
              }}
              transition={{
                type: "spring",
                bounce: 0,
                duration: 0.33,
                opacity: {
                  type: "tween",
                  duration: showForm ? 0.175 : 0.15,
                  delay: showForm ? 0.012 : 0.1,
                },
                visibility: { delay: showForm ? 0.35 : 0.1 },
              }}
              className="absolute -top-20 left-0 flex w-full origin-bottom flex-col [perspective:100px]"
              style={{ scale: buttonScale }}
            >
              <Button showForm={showForm} handleButtonClick={handleButtonClick}>
                Pitch your project
              </Button>
            </motion.div>
            <motion.div
              initial={{
                opacity: 0,
                scale: showForm ? 1 : 0.05,
              }}
              animate={{
                opacity: showForm ? 1 : 0.05,
                scale: showForm ? 1 : 0.05,
                visibility: showForm ? "visible" : "hidden",
              }}
              transition={{
                opacity: {
                  type: "tween",
                  duration: showForm ? 0.055 : 0.308,
                  delay: showForm ? 0.016 : 0.085,
                },
                scale: {
                  type: "spring",
                  bounce: 0,
                  stiffness: 270,
                  damping: 30,
                },
                visibility: { delay: showForm ? 0 : 0.34 },
              }}
              className="relative -top-10 flex w-screen origin-center snap-y snap-mandatory snap-center flex-col items-center justify-end gap-8"
            >
              <Form ref={formRef} showForm={showForm} />
              <motion.div
                initial={{
                  opacity: 0,
                  y: 20,
                }}
                animate={{
                  opacity: showForm ? 1 : 0,
                  y: showForm ? 0 : 20,
                }}
                transition={{
                  type: "tween",
                  duration: showForm ? 0.3 : 0.1,
                  delay: showForm ? 0.45 : 0,
                  ease: "easeOut",
                }}
                className="w-full"
              >
                <Footer />
              </motion.div>
            </motion.div>
          </motion.div>
        </div>
      </section>
      <motion.div
        className="pointer-events-none fixed left-0 top-0 -z-50 h-screen w-screen"
        transition={{
          opacity: { duration: 0.25, type: "tween" },
        }}
        style={{ opacity: canvasOpacity }}
      >
        <CanvasAnimation playCanvas={playCanvas} />
      </motion.div>
    </div>
  );
}
