"use client";

import { useState, useRef, useEffect } from "react";
import {
  motion,
  useMotionValueEvent,
  useScroll,
  useTransform,
  useMotionValue,
} from "framer-motion";
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
  const [lockBodyScroll, setLockBodyScroll] = useState(false);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["0% end", "end end"],
  });

  const { scrollYProgress: scrollYProgressSection } = useScroll({
    target: sectionRef,
  });

  const buttonScale = useTransform(
    scrollYProgressSection,
    [0.35, 0.99],
    [1.1, 1.4],
  );

  function handleButtonClick() {
    setShowForm(true);
    setShouldScroll(true);
  }

  useMotionValueEvent(scrollYProgressSection, "change", (value) => {
    if (value > 0.35) {
      setShouldButtonScale(true);
    }

    if (value < 0.35) {
      setShouldButtonScale(false);
    }
  });

  useMotionValueEvent(scrollYProgress, "change", (value) => {
    if (value > 0.99 && !shouldScroll) {
      setShowForm(true);
      setShouldScroll(false);
      setLockBodyScroll(true);
    }

    if (shouldScroll) return;

    if (value < 0.9) {
      setShowForm(false);
      setLockBodyScroll(false);
    }
  });

  useEffect(() => {
    if (!shouldScroll || !formRef.current) return;

    formRef.current?.scrollIntoView({
      block: "start",
    });
  }, [shouldScroll]);

  // useEffect(() => {
  //   if (!lockBodyScroll) return;

  //   if (showForm) {
  //     document.body.style.overflow = "clip";
  //   } else {
  //     document.body.style.overflow = "auto";
  //   }

  //   function checkScrollUp(event: any) {
  //     if (event.wheelDeltaY > 15) {
  //       setShowForm(false);
  //     }
  //   }

  //   window.addEventListener("wheel", checkScrollUp);

  //   return () => {
  //     document.body.style.overflow = "auto";
  //     window.removeEventListener("wheel", checkScrollUp);
  //   };
  // }, [lockBodyScroll, showForm]);

  return (
    <div ref={containerRef} className="relative w-screen overflow-clip">
      <section
        ref={sectionRef}
        className="relative mt-[100dvh] h-[150vh] w-full [perspective:45px]"
      >
        <div className="sticky top-0 mx-auto flex h-screen w-full max-w-xl origin-center flex-col items-center justify-center text-balance px-6 text-2xl leading-6 [perspective:45px] xs:[text-wrap:initial] lg:max-w-4xl lg:px-0 lg:pt-0 lg:text-4xl lg:leading-10">
          <motion.div
            initial={{ y: "0%", translateZ: "0px", opacity: 1 }}
            animate={{
              opacity: showForm ? 0 : 1,
              y: showForm ? "-25%" : shouldButtonScale ? "-10%" : "0%",
              translateZ: showForm ? "-15px" : "0px",
            }}
            transition={{
              y: { duration: 0.25, stiffness: 200, damping: 28 },
              opacity: { type: "tween", duration: 0.15 },
            }}
            className="relative flex h-screen flex-col items-center justify-center space-y-8"
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
            initial={{ y: shouldButtonScale ? -40 : 0 }}
            animate={{
              y:
                shouldButtonScale && !showForm
                  ? -40
                  : shouldButtonScale && showForm
                    ? 0
                    : 0,
            }}
            transition={{
              y: { duration: 0.4, stiffness: 150, damping: 28 },
            }}
            className={tw("relative flex h-14 w-full justify-center")}
          >
            <motion.div
              initial={{
                opacity: showForm ? 0 : 1,
                // filter: showForm ? "blur(4px)" : "blur(0px)",
                scale: showForm ? 1.8 : undefined,
              }}
              animate={{
                opacity: showForm ? 0 : 1,
                // filter: showForm ? "blur(4px)" : "blur(0px)",
                scale: showForm ? 1.8 : undefined,
              }}
              transition={{
                type: "spring",
                bounce: 0,
                duration: 0.23,
                opacity: {
                  type: "tween",
                  duration: showForm ? 0.23 : 0.14,
                  delay: showForm ? 0 : 0.06,
                },
              }}
              className="absolute -top-20 left-0 flex w-full origin-bottom flex-col [perspective:100px]"
              style={{ scale: buttonScale }}
            >
              <Button
                showForm={showForm}
                shouldScale={shouldButtonScale}
                handleButtonClick={handleButtonClick}
              >
                Pitch your project
              </Button>
            </motion.div>
            <motion.div
              initial={{
                opacity: 0,
                scale: showForm ? 1 : 0,
                // filter: showForm ? "blur(0px)" : "blur(4px)",
                // y:
                //   shouldButtonScale && !showForm
                //     ? -40
                //     : shouldButtonScale && showForm
                //       ? 0
                //       : 0,
              }}
              animate={{
                opacity: showForm ? 1 : 0,
                scale: showForm ? 1 : 0,
                // filter: showForm ? "blur(0px)" : "blur(4px)",
                visibility: showForm ? "visible" : "hidden",
                //   y:
                //     shouldButtonScale && !showForm
                //       ? -40
                //       : shouldButtonScale && showForm
                //         ? 0
                //         : 0,
              }}
              transition={{
                opacity: {
                  type: "tween",
                  duration: showForm ? 0.05 : 0.27,
                  delay: showForm ? 0 : 0.07,
                },
                scale: {
                  duration: showForm ? 0.23 : 0.22,
                  // delay: showForm ? 0.05 : 0,
                },
                visibility: { delay: showForm ? 0 : 0.25 },
                // y: { duration: 0.25 },
              }}
              className={tw(
                "relative -top-10 flex w-screen origin-center snap-y snap-mandatory snap-center flex-col items-center justify-end gap-8",
              )}
            >
              <Form ref={formRef} showForm={showForm} />
              <motion.div
                initial={{
                  opacity: 0,
                  y: "50%",
                }}
                animate={{
                  opacity: showForm ? 1 : 0,
                  y: showForm ? "0%" : "50%",
                }}
                transition={{
                  type: "tween",
                  duration: 0.15,
                  delay: showForm ? 0.23 : 0,
                }}
                className="w-full"
              >
                <Footer />
              </motion.div>
            </motion.div>
          </motion.div>
        </div>
        {/* <CanvasAnimation /> */}
      </section>
    </div>
  );
}
