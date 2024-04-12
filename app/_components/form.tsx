"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { motion } from "framer-motion";

const formSchema = z.object({
  name: z.string().min(2, {
    message: "Name must be at least 2 characters.",
  }),
  email: z.string().email({
    message: "Email must be in proper format",
  }),
  content: z.string().min(2, {
    message: "Message must be at least 2 characters.",
  }),
});

// TODO: clean up, ask for error states in design, submit message & loading state

export default function Form() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
  });

  async function onSubmit(values: z.infer<typeof formSchema>) {
    await fetch("/api/send", {
      method: "POST",
      body: JSON.stringify({
        name: values.name,
        email: values.email,
        content: values.content,
      }),
    });
  }

  return (
    <motion.form
      onSubmit={handleSubmit(onSubmit)}
      // layoutId="form-button"
    >
      <div className="flex flex-col gap-6 rounded-[30px] bg-[#171717] p-4 lg:flex-row lg:p-7">
        <div className="flex-2 flex max-w-md flex-col gap-2 text-base leading-10 tracking-wide lg:w-full lg:text-xl">
          <label
            htmlFor="name"
            className="w-full rounded-[18px] bg-white/5 px-4 py-3 leading-10 tracking-wide text-white/50 lg:text-lg"
          >
            From
          </label>
          <input
            id="name"
            type="text"
            placeholder="Name"
            className="border-b border-white/5 bg-inherit px-4 py-2 leading-10 outline-none placeholder:tracking-wide placeholder:text-white/20"
            {...register("name")}
          />
          {errors?.name && (
            <p className="px-1 text-xs text-red-600">{errors.name.message}</p>
          )}
          <input
            id="email"
            type="email"
            placeholder="Email"
            className="border-b border-white/5 bg-inherit px-4 py-2 leading-10 outline-none placeholder:tracking-wide placeholder:text-white/20"
            {...register("email")}
          />
          {errors?.email && (
            <p className="px-1 text-xs text-red-600">{errors.email.message}</p>
          )}
          <textarea
            id="content"
            placeholder="My project is about..."
            className="h-32 resize-none border-b border-white/5 bg-inherit px-4 py-2 leading-6 outline-none placeholder:tracking-wide placeholder:text-white/20 lg:h-72"
            {...register("content")}
          ></textarea>
          {errors?.content && (
            <p className="px-1 text-xs text-red-600">
              {errors.content.message}
            </p>
          )}
          <button className="rounded-[44px] bg-white/10 px-6 py-1 text-base leading-10 text-white/50 outline-none lg:w-max lg:rounded-xl lg:bg-white lg:text-black">
            Send
          </button>
        </div>
        <div className="relative isolate w-full rounded-[18px] bg-white/5 lg:flex-1">
          <div className="flex h-full w-full flex-col justify-between px-6 pb-4 pt-2 tracking-wide lg:absolute lg:inset-0">
            <p className="text-lg leading-10 text-white/50">To</p>
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
