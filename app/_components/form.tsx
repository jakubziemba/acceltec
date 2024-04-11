'use client';

import { motion } from 'framer-motion';

export default function Form() {
  return (
    <motion.form
    // layoutId="form-button"
    >
      <div className="flex rounded-[32px] bg-[#171717] gap-6 p-4 lg:p-7">
        <div className="flex flex-col max-w-md w-full gap-2 leading-10 text-base lg:text-xl tracking-wide flex-2">
          <label
            htmlFor="name"
            className="w-full rounded-[18px] bg-white/5 text-white/50 leading-10 lg:text-lg tracking-wide px-4 py-3"
          >
            From
          </label>
          <input
            id="name"
            name="name"
            type="text"
            placeholder="Name"
            className="border-b bg-inherit border-white/5 py-2 placeholder:text-white/20 placeholder:tracking-wide leading-10 px-4"
          />
          <input
            type="email"
            name="email"
            placeholder="Email"
            className="border-b bg-inherit border-white/5 px-4 py-2 placeholder:text-white/20 placeholder:tracking-wide leading-10"
          />
          <textarea
            id="content"
            name="content"
            placeholder="My project is about..."
            className="border-b border-white/5 bg-inherit px-4 py-2 h-32 lg:h-72 resize-none placeholder:text-white/20 placeholder:tracking-wide leading-10"
          ></textarea>
          <button className="bg-white/10 text-white/50 lg:bg-white lg:text-black rounded-[44px] lg:rounded-xl text-base lg:w-max px-6 py-1 leading-10">
            Send
          </button>
        </div>
        <div className="flex-1 w-full bg-white/5 rounded-[18px] isolate relative hidden invisible lg:block lg:visible ">
          <div className="absolute inset-0 flex tracking-wide h-full w-full justify-between flex-col px-6 pt-2 pb-4">
            <p className="text-lg text-white/50 leading-10">To</p>
            <div className="text-2xl leading-10">
              <p className="text-white">Laurence Laumann</p>
              <p className="text-white/70">Founder</p>
            </div>
          </div>
        </div>
      </div>
    </motion.form>
  );
}
