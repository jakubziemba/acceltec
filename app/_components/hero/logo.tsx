"use client";

import { MouseEvent, useEffect, useRef, useState } from "react";
import { useWindowSize } from "usehooks-ts";
import { motion, useMotionTemplate, useSpring } from "framer-motion";
import { tw } from "@/utils/tailwind";

const INITIAL_X = -100;
const INITIAL_Y = -100;
const DEFAULT_X = 486;
const DEFAULT_Y = 84;

const X_OFFSET_MOBILE = 1000;
const X_OFFSET_DESKTOP = 200;

export default function LogoHero({ className = "" }) {
  const { width } = useWindowSize();
  const [logoBounds, setLogoBounds] = useState<DOMRect>();
  const [initialAnimationOver, setInitialAnimationOver] = useState(false);
  const ref = useRef<SVGSVGElement>(null);
  const isMobile = width < 1024;

  const initialTransition = {
    damping: 40,
    stiffness: 50,
    mass: 0.2,
    bounce: 0,
  };

  const defaultTransition = {
    damping: 40,
    mass: 0.2,
    stiffness: 150,
    bounce: 0,
    velocity: 100,
    // restDelta: 0.001,
  };

  const mouseXSpring = useSpring(
    INITIAL_X,
    initialAnimationOver ? defaultTransition : initialTransition,
  );
  const mouseYSpring = useSpring(
    INITIAL_Y,
    initialAnimationOver ? defaultTransition : initialTransition,
  );

  let gradientMove = useMotionTemplate`translate(${mouseXSpring} ${mouseYSpring}) rotate(112.237) scale(${initialAnimationOver ? "350 550" : "300 300"})`;

  function initialAnimation() {
    if (!ref.current || !logoBounds) return;

    const endX = isMobile
      ? logoBounds.right + X_OFFSET_MOBILE
      : logoBounds.right + X_OFFSET_DESKTOP;
    const endY = logoBounds.bottom;

    // Delay the animation slightly to ensure DOM has updated
    const timeout = setTimeout(() => {
      mouseXSpring.set(endX);
      mouseYSpring.set(endY);
    }, 700); // Adjust delay as needed

    return () => clearTimeout(timeout);
  }

  function handleMouseLeave() {
    if (!initialAnimationOver) return;
    const timeout = setTimeout(() => {
      resetMousePosition();
    }, 700);

    return () => clearTimeout(timeout);
  }

  function resetMousePosition() {
    mouseXSpring.set(DEFAULT_X);
    mouseYSpring.set(DEFAULT_Y);
  }

  function handleMouseMove({ currentTarget, clientX, clientY }: MouseEvent) {
    if (!currentTarget || !ref.current || !initialAnimationOver) return;

    const { left, top, right } = ref.current.getBoundingClientRect();
    const xPosition = Math.floor(
      Math.min(right - left, Math.max(0, clientX - left)),
    );
    const yPosition = Math.floor(Math.max(0, clientY - top));

    mouseXSpring.set(xPosition);
    mouseYSpring.set(yPosition);
  }

  useEffect(() => {
    if (!ref.current) return;

    const bounds = ref.current.getBoundingClientRect();
    setLogoBounds(bounds);
  }, []);

  useEffect(() => {
    if (!logoBounds) return;

    initialAnimation();
  }, [logoBounds]); // Add logoBounds as dependency

  useEffect(() => {
    const unsubscribeX = mouseXSpring.on("change", (value) => {
      if (!logoBounds) return;

      if (isMobile && value >= logoBounds.right + X_OFFSET_MOBILE) {
        setInitialAnimationOver(true);
        mouseXSpring.set(DEFAULT_X);
        mouseYSpring.set(DEFAULT_Y);
      } else if (!isMobile && value >= logoBounds.right + X_OFFSET_DESKTOP) {
        setInitialAnimationOver(true);
        mouseXSpring.set(DEFAULT_X);
        mouseYSpring.set(DEFAULT_Y);
      }
    });

    return () => {
      unsubscribeX();
    };
  }, [mouseXSpring, logoBounds, isMobile, mouseYSpring]);

  return (
    <div
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      className="relative top-0 flex w-full justify-center px-6 py-8 lg:p-10"
    >
      <motion.svg
        ref={ref}
        initial={{ attrY: -10, scale: 0.95, opacity: 0 }}
        animate={{ attrY: 0, scale: 1, opacity: 1 }}
        transition={{
          type: "spring",
          duration: 1.2,
          bounce: 0,
          opacity: { type: "tween", duration: 1.2, ease: "easeOut" },
        }}
        width={1134}
        height={651}
        viewBox="0 0 1134 651"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className={tw(
          "h-full max-h-[70svh] w-full min-w-[790px] max-w-[1234px] lg:p-10",
          className,
        )}
      >
        <motion.path
          d="M139.139 609.095L139.14 609.096C183.879 636.706 237.414 650.5 299.723 650.5C352.007 650.5 397.543 640.941 436.318 621.804L436.321 621.803C475.088 602.397 505.733 575.605 528.242 541.426L528.243 541.425C547.055 512.633 559.234 480.311 564.784 444.464C566.62 432.605 557.091 422.391 545.144 422.391H442.894C433.047 422.391 424.767 429.431 422.022 438.828C417.417 454.592 410.744 468.411 402.007 480.293C390.419 496.051 376.006 508.137 358.763 516.558C341.794 524.705 322.523 528.784 300.941 528.784C270.461 528.784 243.914 520.628 221.279 504.328C199.899 488.486 183.059 466.305 170.77 437.763C170.291 436.387 169.731 435.043 169.083 433.735C156.67 402.985 150.456 366.23 150.456 323.454C150.456 281.217 156.672 245.002 169.088 214.796C181.776 184.587 199.445 161.48 222.085 145.448L222.088 145.446C244.725 129.144 271.003 120.988 300.941 120.988C336.286 120.988 364.427 131.186 385.421 151.537L385.425 151.542C402.824 167.973 415.004 187.758 421.968 210.903C424.795 220.298 433.077 227.381 442.952 227.381H545.303C557.19 227.381 566.703 217.265 564.947 205.454C559.514 168.908 547.008 136.397 527.426 107.93C504.103 73.753 472.781 47.3708 433.472 28.7842C394.43 9.92341 349.573 0.5 298.912 0.5C237.953 0.5 185.096 14.2948 140.359 41.9038C95.8991 69.2359 61.4725 107.501 37.0807 156.685C12.6886 205.597 0.5 262.009 0.5 325.909C0.5 342.03 9.63341 353.809 23.5646 363.153C37.4825 372.488 56.2642 379.445 75.7259 385.923C79.9634 387.333 84.2331 388.721 88.4934 390.106C103.827 395.09 119.038 400.034 132.187 405.855C148.995 413.295 162.296 422.114 168.169 434.144C168.715 435.484 169.271 436.81 169.836 438.124C173.738 449.384 172.025 463 167.501 477.705C162.949 492.503 155.584 508.301 148.375 523.764C147.564 525.505 146.754 527.241 145.951 528.971C138.025 546.043 130.697 562.53 128.143 576.483C126.865 583.465 126.773 589.854 128.427 595.386C130.085 600.934 133.49 605.587 139.139 609.095ZM707.351 609.095L707.352 609.096C752.091 636.706 805.626 650.5 867.935 650.5C920.218 650.5 965.755 640.941 1004.53 621.804L1004.53 621.803C1043.3 602.397 1073.94 575.605 1096.45 541.426L1096.45 541.425C1115.27 512.633 1127.45 480.311 1133 444.464C1134.83 432.605 1125.3 422.391 1113.36 422.391H1011.11C1001.26 422.391 992.979 429.431 990.234 438.828C985.629 454.592 978.955 468.411 970.218 480.293C958.631 496.051 944.218 508.137 926.976 516.557C910.006 524.705 890.735 528.784 869.153 528.784C838.673 528.784 812.126 520.628 789.491 504.329C768.111 488.486 751.271 466.306 738.981 437.763C738.503 436.387 737.942 435.043 737.294 433.734C724.882 402.985 718.667 366.229 718.667 323.454C718.667 281.217 724.884 245.002 737.3 214.796C749.987 184.587 767.657 161.48 790.296 145.448L790.299 145.446C812.937 129.144 839.215 120.988 869.153 120.988C904.497 120.988 932.639 131.186 953.632 151.537L953.637 151.542C971.036 167.973 983.215 187.758 990.18 210.903C993.006 220.298 1001.29 227.381 1011.16 227.381H1113.51C1125.4 227.381 1134.91 217.265 1133.16 205.454C1127.73 168.907 1115.22 136.396 1095.64 107.928C1072.31 73.7521 1040.99 47.3706 1001.68 28.7842C962.642 9.92341 917.784 0.5 867.123 0.5C806.165 0.5 753.307 14.2948 708.57 41.9038C664.111 69.2357 629.685 107.501 605.293 156.684C580.9 205.596 568.712 262.009 568.712 325.909C568.712 342.03 577.845 353.809 591.776 363.153C605.694 372.488 624.476 379.445 643.937 385.923C648.175 387.333 652.445 388.721 656.705 390.106C672.038 395.09 687.249 400.034 700.398 405.855C717.206 413.295 730.507 422.113 736.381 434.143C736.927 435.483 737.482 436.81 738.048 438.124C741.949 449.385 740.237 463 735.713 477.705C731.16 492.503 723.795 508.302 716.587 523.764C715.775 525.505 714.966 527.241 714.162 528.971C706.237 546.043 698.909 562.53 696.354 576.483C695.076 583.465 694.984 589.854 696.638 595.386C698.297 600.934 701.702 605.587 707.351 609.095Z"
          stroke={"url(#paint0_radial_1_19)"}
        />
        <defs>
          <motion.radialGradient
            id="paint0_radial_1_19"
            cx={0}
            cy={0}
            r={1}
            gradientUnits="userSpaceOnUse"
            gradientTransform={gradientMove}
          >
            <stop
              stopColor="white"
              stopOpacity={0.87}
              style={{
                stopColor: "white",
                stopOpacity: 0.87,
              }}
            />
            <stop
              offset={1}
              stopColor="white"
              stopOpacity={0.08}
              style={{
                stopColor: "white",
                stopOpacity: 0.08,
              }}
            />
          </motion.radialGradient>
        </defs>
      </motion.svg>
    </div>
  );
}
