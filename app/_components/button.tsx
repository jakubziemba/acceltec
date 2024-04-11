'use client';

import { motion } from 'framer-motion';

export default function Button({ children, ...props }: { children: React.ReactNode }) {
  return (
    <motion.button
      // layoutId="form-button"
      className="my-32 px-6 py-3 text-xl text-white/80 rounded-[32px] shadow-[0px_0px_0px_2px_hsla(0,0%,100%,0.2),0px_2px_2px_0px_hsla(0,0%,0%,0.2)] hover:shadow-[0px_0px_0px_2px_hsla(0,0%,100%,1),0px_2px_2px_0px_hsla(0,0%,0%,0.2)] transition duration-[200ms] ease-in hover:text-white active:scale-[0.99] hover:scale-[1.01]"
      {...props}
    >
      {children}
    </motion.button>
  );
}
