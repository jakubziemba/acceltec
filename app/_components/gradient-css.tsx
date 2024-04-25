"use client";

import {
  motion,
  useSpring,
  useTime,
  useMotionTemplate,
  useTransform,
} from "framer-motion";
import { useEffect } from "react";

const DEFAULT_GRADIENT_1_Y = 33;
const DEFAULT_GRADIENT_1_X = 17;
const DEFAULT_GRADIENT_2_Y = 88;
const DEFAULT_GRADIENT_2_X = 12;
const DEFAULT_GRADIENT_3_Y = 84;
const DEFAULT_GRADIENT_3_X = 67;
const DEFAULT_GRADIENT_4_Y = 0;
const DEFAULT_GRADIENT_4_X = 0;
const DEFAULT_GRADIENT_5_Y = 0;
const DEFAULT_GRADIENT_5_X = 0;

export default function GradientCSS() {
  const gradient1y = useSpring(12);
  const gradient2y = useSpring(5);
  const gradient3y = useSpring(60);
  const gradient4y = useSpring(98);
  const gradient5y = useSpring(4);
  const gradient1x = useSpring(15);
  const gradient2x = useSpring(29);
  const gradient3x = useSpring(67);
  const gradient4x = useSpring(88);
  const gradient5x = useSpring(110);

  const time = useTime();
  const gradient1yTransform = useTransform(
    time,
    [0, 15000, 30000],
    [DEFAULT_GRADIENT_1_Y, 40, DEFAULT_GRADIENT_1_Y],
    {
      clamp: false,
    },
  );
  const gradient2yTransform = useTransform(
    time,
    [0, 15000, 30000],
    [DEFAULT_GRADIENT_2_Y, 20, DEFAULT_GRADIENT_2_Y],
    {
      clamp: false,
    },
  );
  const gradient3yTransform = useTransform(
    time,
    [0, 15000, 30000],
    [DEFAULT_GRADIENT_3_Y, -7, DEFAULT_GRADIENT_3_Y],
    {
      clamp: false,
    },
  );

  const gradient1xTransform = useTransform(
    time,
    [0, 6000, 12000],
    [DEFAULT_GRADIENT_1_X, -5, DEFAULT_GRADIENT_1_X],
    {
      clamp: false,
    },
  );
  const gradient2xTransform = useTransform(
    time,
    [0, 7500, 15000],
    [DEFAULT_GRADIENT_2_X, 45, DEFAULT_GRADIENT_2_X],
    {
      clamp: false,
    },
  );
  const gradient3xTransform = useTransform(
    time,
    [0, 10000, 20000],
    [DEFAULT_GRADIENT_3_X, 90, DEFAULT_GRADIENT_3_X],
    {
      clamp: false,
    },
  );

  const gradient4yTransform = useTransform(
    time,
    [0, 15000, 30000],
    [DEFAULT_GRADIENT_4_Y, -7, DEFAULT_GRADIENT_4_Y],
    {
      clamp: false,
    },
  );
  const gradient4xTransform = useTransform(
    time,
    [0, 15000, 30000],
    [DEFAULT_GRADIENT_4_X, -5, DEFAULT_GRADIENT_4_X],
    {
      clamp: false,
    },
  );
  const gradient5yTransform = useTransform(
    time,
    [0, 15000, 30000],
    [DEFAULT_GRADIENT_5_Y, -7, DEFAULT_GRADIENT_5_Y],
    {
      clamp: false,
    },
  );
  const gradient5xTransform = useTransform(
    time,
    [0, 15000, 30000],
    [DEFAULT_GRADIENT_5_X, -5, DEFAULT_GRADIENT_5_X],
    {
      clamp: false,
    },
  );

  const radialGradient1 = useMotionTemplate`
  radial-gradient(at ${gradient1xTransform}% ${gradient1yTransform}%, hsla(0,0%,100%,0.08) 6px, black 100%),
  radial-gradient(at ${gradient2xTransform}% ${gradient2yTransform}%, hsla(0,0%,100%,0.08) 7px, black 40%), 
  radial-gradient(at ${gradient3xTransform}% ${gradient3yTransform}%, hsla(0,0%,100%,0.08) 15px, black 12%),
  radial-gradient(at ${gradient4xTransform}% ${gradient4yTransform}%, hsla(0,0%,100%,0.08) 3px, black 20%), 
  radial-gradient(at ${gradient5xTransform}% ${gradient5yTransform}%, hsla(0,0%,100%,0.08) 30px, black 80%)`;
  // const time = useTime();

  const moveGradient = (spring: any, increment: number, max: number) => {
    let prev = spring.get();
    let newValue = prev + increment;
    spring.set(newValue > max ? max : newValue);
  };

  // useEffect(() => {
  //   const interval = setInterval(() => {
  //     moveGradient(gradient1y, 1, 100);
  //     moveGradient(gradient1x, 1, 100);
  //     moveGradient(gradient2y, 1, 100);
  //     moveGradient(gradient2x, 0.1, 100);
  //     moveGradient(gradient3y, 0.1, 100);
  //     moveGradient(gradient3x, 0.1, 100);
  //   }, 100);

  //   return () => clearInterval(interval);
  // }, []);

  return (
    <motion.div
      className="pointer-events-none fixed inset-0 -z-20 h-full w-full overflow-hidden"
      style={{
        backgroundColor: "hsla(0,0%,100%,0)",
        backgroundImage: radialGradient1,
      }}
    ></motion.div>
  );
}
