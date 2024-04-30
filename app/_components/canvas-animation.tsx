"use client";

import { useEffect, useRef } from "react";
import { motion } from "framer-motion";

export default function CanvasAnimation({
  playCanvas,
}: {
  playCanvas: boolean;
}) {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let animationFrameId: number;

    const col = (x: number, y: number, shade: number) => {
      if (!ctx) return;
      ctx.fillStyle = `rgba(${shade}, ${shade}, ${shade}, 1)`;
      ctx.fillRect(x, y, 1, 1);
    };

    const R = (x: number, y: number, t: number) => {
      return Math.floor(0 + 9 * Math.cos((x * x + 40 * y) / 150 + t * 2));
    };

    const G = (x: number, y: number, t: number) => {
      return Math.floor(
        0 +
          4 *
            Math.sin(
              ((x * x * Math.cos(t / 4) + x * 4 * y * Math.sin(t / 3)) * 2) /
                1250,
            ),
      );
    };

    const B = (x: number, y: number, t: number) => {
      return Math.floor(
        4 * Math.sin(40 * Math.sin(t / 6) + (x * x + 20 * y) / 1500),
      );
    };

    let t = 0;

    const run = () => {
      if (!playCanvas) return;

      // Run the animation
      for (let x = 0; x <= 31; x++) {
        // Loop through the canvas
        for (let y = 0; y <= 31; y++) {
          const shade = Math.max(
            0,
            Math.min(255, R(x, y, t) + G(x, y, t) + B(x, y, t)),
          );
          col(x, y, shade);
        }
      }
      t = t + 0.0009;
      animationFrameId = window.requestAnimationFrame(run);
    };

    const stop = () => {
      window.cancelAnimationFrame(animationFrameId);
      animationFrameId = 0;
    };

    const pause = () => {
      if (animationFrameId) {
        window.cancelAnimationFrame(animationFrameId);
      } else {
        run();
      }
    };

    run();

    return () => {
      window.cancelAnimationFrame(animationFrameId);
    };
  }, [playCanvas]);

  return (
    <motion.canvas
      ref={canvasRef}
      width={32}
      height={32}
      className="absolute left-0 top-0 -z-50 h-screen w-screen opacity-100"
    />
  );
}
