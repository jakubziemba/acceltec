'use client';
import { useState } from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';

const links = [
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

export default function Footer() {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <footer className="flex lg:flex-row flex-col items-center gap-4 leading-8 justify-between max-w-4xl mx-auto py-6">
      <p className="text-white/25">© 2024 acceltec GmbH</p>
      <div className="flex gap-1">
        {links.map(link => (
          <Link href={link.href} key={link.id} className="px-3 leading-8 text-white/80">
            {link.label}
            {isHovered && (
              <motion.span className="absolute inset-0 flex items-center justify-center w-full h-full bg-white/80 rounded-[32px] transition duration-[200ms] ease-in" />
            )}
          </Link>
        ))}
      </div>
    </footer>
  );
}
