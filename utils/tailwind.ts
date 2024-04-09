import clsx from 'clsx';
import { twMerge } from 'tailwind-merge';

export const tw = (initial: any, ...args: any[]) => twMerge(clsx(initial, ...args));
