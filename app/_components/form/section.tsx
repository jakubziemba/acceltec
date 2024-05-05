"use client";

import { useState, useRef, useEffect } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { useWindowSize } from "usehooks-ts";
import Form from "./form";
import AnimatedText from "../animated-text";
import Button from "./button";
import CanvasAnimation from "../canvas-animation";
import Footer from "../footer/footer";

export default function FormSection() {
  const { width, height } = useWindowSize();
  const containerRef = useRef<null | HTMLDivElement>(null);
  const sectionRef = useRef<null | HTMLDivElement>(null);
  const textRef = useRef<null | HTMLDivElement>(null);
  const formRef = useRef<null | HTMLFormElement>(null);
  const [showForm, setShowForm] = useState(false);
  const [shouldButtonScale, setShouldButtonScale] = useState(false);
  const [shouldScrollToForm, setShouldScroll] = useState(false);
  const [playCanvas, setPlayCanvas] = useState(false);
  const isMobile = width < 768;
  const containerHeight = containerRef.current?.getBoundingClientRect().height;
  const boxHeight = 588;
  const offsetFromBottom = (height - boxHeight) / 2;

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
    isMobile ? [0, 0.8] : [0, 0.95],
    isMobile ? [1, 1.25] : [1, 1.4],
  );

  const textTranslateZ = useTransform(
    scrollYProgressSection,
    isMobile ? [0, 0.8] : [0, 0.95],
    [0, -10],
  );

  const textOpacity = useTransform(
    scrollYProgressSection,
    isMobile ? [0, 0.8, 1] : [0, 0.9, 1],
    [1, 0.05, 0],
  );

  const textBlur = useTransform(
    scrollYProgressSection,
    isMobile ? [0.7, 0.8] : [0.6, 0.95],
    ["blur(0px)", "blur(6px)"],
  );

  const canvasOpacity = useTransform(
    scrollYProgressCanvas,
    isMobile ? [0, 0.3, 0.8] : [0, 0.28, 0.95],
    [0, 1, 0.6],
  );

  function handleButtonClick() {
    setShowForm(true);
    setShouldScroll(true);
  }

  // button scale on scroll trigger
  useEffect(() => {
    const handleScrollSection = (value: any) => {
      if (value > 0) {
        setShouldButtonScale(true);
      }

      if (value <= 0) {
        setShouldButtonScale(false);
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

  // show form trigger on scroll up
  useEffect(() => {
    const handleScrollSection = (value: any) => {
      if (shouldScrollToForm) return; // guard for button click

      if (!isMobile && value < 0.95) {
        setShowForm(false);
        setShouldScroll(false);
      }

      if (!isMobile) return;

      if (value < 0.8) {
        setShowForm(false);
        setShouldScroll(false);
      }
    };

    const unsubscribe = scrollYProgress.on("change", handleScrollSection);

    return () => {
      unsubscribe();
    };
  }, [isMobile, scrollYProgress, shouldScrollToForm]);

  // show form trigger on scroll down
  useEffect(() => {
    const handleScroll = (value: any) => {
      if (value > 0.95) {
        setShowForm(true);
        setShouldScroll(false);
      }

      if (!isMobile) return;

      if (value > 0.8) {
        setShowForm(true);
        setShouldScroll(false);
      }
    };

    const unsubscribe = scrollYProgress.on("change", handleScroll);

    return () => {
      unsubscribe();
    };
  }, [scrollYProgress, isMobile]);

  // scroll to form on button click
  useEffect(() => {
    if (!shouldScrollToForm || !containerHeight) return;

    const scrollTimeout = setTimeout(() => {
      window.scrollTo({
        top: containerHeight,
        behavior: "smooth",
      });
    }, 0);

    return () => {
      clearTimeout(scrollTimeout);
    };
  }, [shouldScrollToForm, containerHeight]);

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
    <div ref={containerRef} className="relative z-50 w-screen overflow-clip">
      <section
        ref={sectionRef}
        className="relative mt-[80lvh] min-h-[200vh] w-full [perspective:45px] lg:mt-[100lvh] 2xl:mt-[90lvh]"
      >
        <div className="sticky top-0 mx-auto flex h-screen w-full max-w-xl origin-center flex-col items-center justify-center px-6 text-lg leading-5 [perspective:45px] max-2xs:text-lg max-2xs:leading-5 max-[350px]:text-sm max-[350px]:leading-4 xs:[text-wrap:initial] md:text-2xl md:leading-6 lg:max-w-4xl lg:px-0 lg:pt-0 lg:text-4xl lg:leading-10">
          <motion.div
            ref={textRef}
            initial={{ z: 0 }}
            animate={{
              z: showForm ? -10 : 0,
            }}
            transition={{
              duration: 0.24,
            }}
            className="relative flex h-screen flex-col items-center justify-center space-y-6 xl:space-y-8"
            style={{
              translateZ: textTranslateZ,
              // opacity: textOpacity,
              filter: textBlur,
            }}
          >
            <AnimatedText el="h2" className="origin-bottom text-white/80">
              Berlin-based software studio that exclusively works with founders,
              forward-looking leaders, and innovative teams.
            </AnimatedText>
            <AnimatedText className="text-white/40">
              By partnering with us, you gain access to outstanding designers
              and developers without the long hiring process or the need to
              recruit an in-house team.
            </AnimatedText>
            <AnimatedText className="text-white/40">
              With dozens of projects launched and 20+ companies we collaborated
              with, we fast track the entire process and drive organisational
              change from within. We bring careful planning, transparent
              communication, and aggressive execution to keep you ahead of the
              game.
            </AnimatedText>
            <AnimatedText className="text-white/40">
              We build web and mobile apps for companies we believe in and we
              only commit to a handful of projects per year. Let&apos;s start to
              build.
            </AnimatedText>
          </motion.div>
          <div className="pointer-events-none fixed bottom-[30px] isolate flex h-screen w-full flex-col justify-center 2xs:-bottom-10 ">
            <motion.div
              initial={{
                // opacity: showForm ? 0 : 1,
                filter: showForm ? "blur(4px)" : "blur(0px)",
                // scale: showForm && !shouldScrollToForm ? 1.8 : undefined,
                y: 0,
                bottom: 30,
                transformOrigin: "bottom",
              }}
              animate={{
                // opacity: showForm ? 0 : 1,
                filter: showForm ? "blur(4px)" : "blur(0px)",
                // scale: showForm && !shouldScrollToForm ? 1.8 : undefined,
                visibility: showForm ? "hidden" : "visible",
                bottom: showForm ? offsetFromBottom : 30,
                y: shouldButtonScale ? -40 : 0,
              }}
              transition={{
                type: "tween",
                bounce: 0,
                duration: 0.33,
                opacity: {
                  type: "tween",
                  duration: showForm ? 0.08 : 0.15,
                  delay: showForm ? 0 : 0.18,
                },
                visibility: { delay: showForm ? 0.35 : 0.1 },
                y: { duration: 0.35, type: "tween" },
                bottom: {
                  duration: 0.35,
                  type: "tween",
                  // delay: showForm ? 0.1 : 0,
                },
              }}
              className="pointer-events-auto absolute bottom-10 flex w-full origin-bottom flex-col [perspective:100px]"
              style={{ scale: buttonScale }}
            >
              <Button showForm={showForm} handleButtonClick={handleButtonClick}>
                Pitch your project
              </Button>
            </motion.div>
            <motion.div
              initial={{
                // opacity: 0,
                scale: showForm ? 1 : 0,
                bottom: 30,
                transformOrigin: "bottom",
                y: 0,
              }}
              animate={{
                // opacity: showForm ? 1 : 0,
                scale: showForm ? 1 : 0,
                visibility: showForm ? "visible" : "hidden",
                bottom: showForm ? offsetFromBottom : 30,
                y: shouldButtonScale ? -40 : 0,
              }}
              transition={{
                y: { duration: 0.35, type: "tween" },
                opacity: {
                  type: "tween",
                  duration: showForm ? 0.18 : 0.308,
                  delay: showForm ? 0.02 : 0.085,
                },
                scale: {
                  type: "tween",
                  duration: 0.25,
                  delay: showForm ? 0.02 : 0,
                },
                visibility: { delay: showForm ? 0 : 0.34 },
                bottom: {
                  duration: 0.35,
                  type: "tween",
                  // delay: showForm ? 0.1 : 0,
                },
              }}
              className="pointer-events-auto absolute bottom-10 flex h-full w-full origin-bottom flex-col items-center justify-end gap-0"
            >
              <Form ref={formRef} showForm={showForm} />
            </motion.div>
          </div>
        </div>
        <motion.div
          initial={{
            opacity: 0,
          }}
          animate={{
            opacity: showForm ? 1 : 0,
          }}
          transition={{
            type: "tween",
            delay: showForm ? 0.45 : 0,
            duration: showForm ? 0.3 : 0.2,
            ease: "easeOut",
          }}
          className="fixed bottom-0 w-full"
        >
          <Footer />
        </motion.div>
      </section>
      <motion.div
        className="pointer-events-none fixed left-0 top-0 -z-50 h-screen w-screen scale-105 lg:scale-100"
        style={{ opacity: canvasOpacity }}
      >
        <CanvasAnimation playCanvas={playCanvas} />
      </motion.div>
    </div>
  );
}
