"use client";

import { useEffect, useRef } from "react";
import { motion } from "framer-motion";

const CanvasAnimation: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const col = (x: number, y: number, shade: number) => {
      if (!ctx) return;
      ctx.fillStyle = `rgba(${shade}, ${shade}, ${shade}, 1)`;
      ctx.fillRect(x, y, 1, 1);
    };

    const R = (x: number, y: number, t: number) => {
      return Math.floor(10 + 4 * Math.cos((x * x + y * y) / 100 + t)); // Decreased amplitude and adjusted frequency
    };

    const G = (x: number, y: number, t: number) => {
      return Math.floor(
        0 +
          2 *
            Math.sin((x * x * Math.cos(t / 2) + y * y * Math.sin(t / 3)) / 100),
      ); // Decreased amplitude and adjusted frequency
    };

    const B = (x: number, y: number, t: number) => {
      return Math.floor(0 + 2 * Math.sin(5 * Math.sin(t / 6) + (x * y) / 800)); // Decreased amplitude and adjusted frequency
    };

    let t = 0;

    let animationFrameId: number;

    const run = () => {
      for (let x = 0; x <= 31; x++) {
        for (let y = 0; y <= 31; y++) {
          const shade = Math.max(
            0,
            Math.min(255, R(x, y, t) + G(x, y, t) + B(x, y, t)),
          );
          col(x, y, shade);
        }
      }
      t = t + 0.01;
      animationFrameId = window.requestAnimationFrame(run);
    };

    run();

    // Cleanup function
    return () => {
      window.cancelAnimationFrame(animationFrameId);
    };
  }, []);

  return (
    <motion.canvas
      ref={canvasRef}
      initial={{ opacity: 0 }}
      animate={{ opacity: 0.7 }}
      transition={{ duration: 0.5, delay: 0.5 }}
      id="canv"
      width={32}
      height={32}
      className="fixed inset-0 -z-50 h-screen w-screen opacity-80"
    />
  );
};

export default CanvasAnimation;
