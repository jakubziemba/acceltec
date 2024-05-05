"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { tw } from "@/utils/tailwind";

const tabs = [
  {
    id: 0,
    href: "/impressum",
    label: "Impressum",
  },
  {
    id: 1,
    href: "/datenschutz",
    label: "Datenschutz",
  },
];

export default function FooterTabs() {
  const [activeTab, setActiveTab] = useState(tabs[0].label);
  const [hovered, setHovered] = useState(false);

  useEffect(() => {
    if (hovered) return;

    const timeout = setTimeout(() => {
      setHovered(false);
      setActiveTab("");
    }, 700);

    return () => {
      clearTimeout(timeout);
    };
  }, [hovered]);

  return (
    <ul className="flex w-fit gap-1 overflow-clip">
      {tabs.map((tab) => {
        const isActive = tab.label === activeTab;

        return (
          <li
            key={tab.id}
            className={tw(
              "relative cursor-pointer text-sm leading-8 outline-none transition-all duration-[180ms] active:scale-[0.98] ",
              isActive ? "text-white/80" : "text-white/20",
            )}
            onFocus={() => setActiveTab(tab.label)}
            onMouseEnter={() => {
              setHovered(true);
              setActiveTab(tab.label);
            }}
            onMouseLeave={() => {
              setHovered(false);
              setActiveTab(tab.label);
            }}
          >
            <Link
              href={tab.href}
              className="relative inset-0 px-3 py-2 outline-none"
            >
              {tab.label}
            </Link>
            {isActive && (
              <motion.span
                layoutId="footer-pill"
                transition={{
                  type: "spring",
                  bounce: 0,
                  duration: 0.4,
                }}
                className="absolute inset-0 -z-10 rounded-[10px] bg-white/10"
              />
            )}
          </li>
        );
      })}
    </ul>
  );
}
