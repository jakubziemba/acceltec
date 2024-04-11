'use client';

import { useState } from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { tw } from '@/utils/tailwind';

const tabs = [
  {
    id: crypto.randomUUID(),
    href: '',
    label: 'Impressum',
  },
  {
    id: crypto.randomUUID(),
    href: '',
    label: 'Datenschutz',
  },
];

export default function FooterTabs() {
  const [activeTab, setActiveTab] = useState(tabs[0].label);

  return (
    <ul className="flex w-fit gap-1">
      {tabs.map(tab => {
        const isActive = tab.label === activeTab;

        return (
          <motion.li
            key={tab.id}
            layout
            className={tw(
              'relative cursor-pointer outline-none text-sm leading-8 transition-colors',
              isActive ? 'text-white/80' : 'text-white/20'
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
                  type: 'spring',
                  bounce: 0,
                  duration: 0.4,
                }}
                className="absolute inset-0 flex items-center justify-center w-full h-full bg-white/10 rounded-[10px]"
              />
            )}
          </motion.li>
        );
      })}
    </ul>
  );
}
