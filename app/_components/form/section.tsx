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
  const { width } = useWindowSize();
  const containerRef = useRef<null | HTMLDivElement>(null);
  const sectionRef = useRef<null | HTMLDivElement>(null);
  const formRef = useRef<null | HTMLFormElement>(null);
  const [showForm, setShowForm] = useState(false);
  const [shouldButtonScale, setShouldButtonScale] = useState(false);
  const [shouldScroll, setShouldScroll] = useState(false);
  const [playCanvas, setPlayCanvas] = useState(false);
  const isMobile = width < 768;

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
    isMobile ? [0, 0.8] : [0, 0.9],
    [1, 0],
  );

  const canvasOpacity = useTransform(
    scrollYProgressCanvas,
    isMobile ? [0, 0.3] : [0, 0.25],
    [0, 1],
  );

  function handleButtonClick() {
    setShowForm(true);
    setShouldScroll(true);
  }

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

  useEffect(() => {
    if (!isMobile) return;

    const handleScrollSection = (value: any) => {
      if (value > 0.8) {
        setShowForm(true);
        setShouldScroll(false);
      }

      if (shouldScroll) return; // guard for button click

      if (value < 0.8) {
        setShowForm(false);
        setShouldScroll(false);
      }
    };

    const unsubscribe = scrollYProgressSection.on(
      "change",
      handleScrollSection,
    );

    return () => {
      unsubscribe();
    };
  }, [isMobile, scrollYProgressSection, showForm, shouldScroll]);

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
    }, 100);

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
    <div ref={containerRef} className="relative z-50 w-screen overflow-clip">
      <section
        ref={sectionRef}
        className="relative mt-[80lvh] h-[200vh] w-full [perspective:45px] lg:mt-[100lvh] 2xl:mt-[70lvh]"
      >
        <div className="sticky top-0 mx-auto flex h-screen w-full max-w-xl origin-center flex-col items-center justify-center px-6 text-lg leading-5 [perspective:45px] supports-[height:100svh]:h-lvh max-2xs:text-lg max-2xs:leading-5 max-[350px]:text-sm max-[350px]:leading-4 xs:[text-wrap:initial] md:text-2xl md:leading-6 lg:max-w-4xl lg:px-0 lg:pt-0 lg:text-4xl lg:leading-10">
          <motion.div
            initial={{ z: 0 }}
            animate={{
              z: showForm ? -10 : 0,
            }}
            transition={{
              y: { duration: 0.25, stiffness: 150, damping: 28 },
              opacity: { type: "tween", duration: 0.24 },
              z: { duration: 0.24 },
            }}
            className="relative flex h-screen flex-col items-center justify-center space-y-6 supports-[height:100svh]:h-svh max-2xs:-top-10 xl:space-y-8"
            style={{
              translateZ: textTranslateZ,
              opacity: textOpacity,
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
          <motion.div
            animate={{
              height: showForm ? "100vh" : "5vh",
            }}
            transition={{
              height: {
                delay: showForm ? 0.6 : 0,
                duration: 0,
              },
            }}
            className="relative flex w-full justify-center"
          >
            <motion.div
              initial={{
                opacity: showForm ? 0 : 1,
                filter: showForm ? "blur(4px)" : "blur(0px)",
                scale: showForm && !shouldScroll ? 1.8 : undefined,
                y: -30,
              }}
              animate={{
                opacity: showForm ? 0 : 1,
                filter: showForm ? "blur(4px)" : "blur(0px)",
                scale: showForm && !shouldScroll ? 1.8 : undefined,
                visibility: showForm ? "hidden" : "visible",
                y: shouldButtonScale ? -30 : 0,
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
                y: { duration: 0.25, type: "tween" },
              }}
              className="absolute -top-12 left-0 flex w-full origin-bottom flex-col [perspective:100px] max-2xs:-top-5 2xl:-top-20"
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
                position: showForm ? "fixed" : "relative",
              }}
              animate={{
                opacity: showForm ? 1 : 0.05,
                scale: showForm ? 1 : 0.05,
                visibility: showForm ? "visible" : "hidden",
                position: showForm ? "fixed" : "relative",
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
                position: { delay: showForm ? 0 : 0.34 },
              }}
              className="bottom-0 flex h-full min-h-screen w-screen origin-[50%_88%] snap-y snap-mandatory snap-center flex-col items-center justify-between gap-0 overflow-y-scroll max-2xs:origin-[50%_94%] xs:origin-[50%_85%] sm:gap-2 md:origin-[50%_93%] lg:gap-8 2xl:origin-[50%_92%]"
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
        className="pointer-events-none fixed left-0 top-0 -z-50 h-screen w-screen scale-105 lg:scale-100"
        style={{ opacity: canvasOpacity }}
      >
        <CanvasAnimation playCanvas={playCanvas} showForm={showForm} />
      </motion.div>
    </div>
  );
}
