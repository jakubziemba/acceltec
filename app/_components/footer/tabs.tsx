"use client";

import { useState } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { tw } from "@/utils/tailwind";

const tabs = [
  {
    // id: crypto.randomUUID(),
    id: 0,
    href: "/impressum",
    label: "Impressum",
  },
  {
    // id: crypto.randomUUID(),
    id: 1,
    href: "/datenschutz",
    label: "Datenschutz",
  },
];

export default function FooterTabs() {
  const [activeTab, setActiveTab] = useState(tabs[0].label);

  return (
    <ul className="flex w-fit gap-1">
      {tabs.map((tab) => {
        const isActive = tab.label === activeTab;

        return (
          <motion.li
            key={tab.id}
            layout
            className={tw(
              "relative cursor-pointer text-sm leading-8 outline-none transition-colors",
              isActive ? "text-white/80" : "text-white/20",
            )}
            onFocus={() => setActiveTab(tab.label)}
            onMouseOver={() => setActiveTab(tab.label)}
            onMouseLeave={() => setActiveTab(tab.label)}
          >
            <Link href={tab.href} className="px-3 py-1 outline-none">
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
                className="absolute inset-0 -z-10 flex h-full w-full items-center justify-center rounded-[10px] bg-white/10"
              />
            )}
          </motion.li>
        );
      })}
    </ul>
  );
}
