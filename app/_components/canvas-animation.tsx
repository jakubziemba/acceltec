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

    if (window.innerWidth < 600) {
      ctx.translate(canvas.width, 1);
      ctx.rotate((0 * Math.PI) / 180);
    }

    let animationFrameId: number;

    const col = (
      x: number,
      y: number,
      shade: number,
      pixelWidth: number,
      pixelHeight: number,
    ) => {
      if (!ctx) return;
      ctx.fillStyle = `rgba(${shade}, ${shade}, ${shade}, 1)`;
      ctx.fillRect(x, y, 1, 1);
    };

    const R = (x: number, y: number, t: number) => {
      return Math.floor(1 + 10 * Math.cos((x * x + 50 * y) / 250 + t * 2));
    };

    const G = (x: number, y: number, t: number) => {
      return Math.floor(
        2 +
          6 *
            Math.sin(
              ((x * x * Math.cos(t / 4) + x * 4 * y * Math.sin(t / 3)) * 2) /
                1200,
            ),
      );
    };

    const B = (x: number, y: number, t: number) => {
      return Math.floor(
        6 * Math.sin(40 * Math.sin(t / 6) + (x * x + 20 * y) / 100),
      );
    };

    let t = 0;

    const run = () => {
      if (!playCanvas) return;

      // Clear the canvas
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      const width = canvas.width;
      const height = canvas.height;

      // Run the animation
      for (let x = 0; x < width; x += width / 32) {
        for (let y = 0; y < height; y += height / 32) {
          const shade = Math.max(
            0,
            Math.min(255, R(x, y, t) + G(x, y, t) + B(x, y, t)),
          );
          col(x, y, shade, width / 32, height / 32);
        }
      }
      t = t + 0.0015;
      animationFrameId = window.requestAnimationFrame(run);
    };

    run();

    return () => {
      window.cancelAnimationFrame(animationFrameId);
    };
  }, [playCanvas]);

  return (
    <canvas
      ref={canvasRef}
      width={32}
      height={32}
      className="absolute left-0 top-0 -z-50 h-lvh w-screen opacity-100 lg:rotate-0 lg:scale-100"
    />
  );
}