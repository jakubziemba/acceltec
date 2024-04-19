"use client";

import { forwardRef } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { MotionConfig, motion } from "framer-motion";
import LogoCard from "./logo-card";

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

const Form = (
  { id = "form", showForm }: { id?: string; showForm?: boolean },
  ref: React.ForwardedRef<HTMLFormElement>,
) => {
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
      ref={ref}
      id={id}
      animate={{ scale: 1, opacity: showForm ? 1 : 0 }}
      transition={{
        duration: 0.2,
        opacity: { type: "linear", duration: 0.2 },
      }}
      layout
      layoutId="form-button"
      className="mx-auto w-full max-w-4xl origin-top -scroll-mt-10"
    >
      <div className="mx-auto flex max-w-xl flex-col gap-6 rounded-[30px] bg-[#171717] p-4 lg:max-w-full lg:flex-row lg:p-7">
        <MotionConfig
          transition={{
            type: "linear",
            delay: 0.15,
            duration: 0.25,
            ease: "easeIn",
          }}
        >
          <motion.div
            // initial={{ opacity: 0 }}
            // animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="lg:flex-2 flex flex-col gap-2 text-base leading-10 tracking-wide lg:w-full lg:max-w-md lg:text-xl"
          >
            <label
              htmlFor="name"
              className="w-full rounded-[18px] px-4 py-3 leading-10 tracking-wide text-white/50 lg:text-lg"
            >
              From
            </label>
            <div className="group/name relative flex flex-col gap-2">
              <input
                id="name"
                type="text"
                placeholder="Name"
                autoComplete="off"
                className="peer bg-inherit px-4 py-2 leading-10 outline-none transition duration-200 placeholder:tracking-wide placeholder:text-white/20"
                {...register("name")}
              />
              <div className="pointer-events-none absolute bottom-0 left-0 h-px w-full rounded-lg bg-white/5 transition-colors duration-200 group-hover/name:bg-white/35 peer-focus-within:bg-white" />
            </div>
            {errors?.name && (
              <p className="px-1 text-xs text-red-600">{errors.name.message}</p>
            )}

            <div className="group/email relative flex flex-col gap-2">
              <input
                id="email"
                type="email"
                placeholder="Email"
                autoComplete="off"
                className="peer bg-inherit px-4 py-2 leading-10 outline-none transition-colors duration-200 placeholder:tracking-wide placeholder:text-white/20"
                {...register("email")}
              />
              <div className="pointer-events-none absolute bottom-0 left-0 h-px w-full rounded-lg bg-white/5 transition-colors duration-200 group-hover/email:bg-white/35 peer-focus-visible:bg-white" />
            </div>
            {errors?.email && (
              <p className="px-1 text-xs text-red-600">
                {errors.email.message}
              </p>
            )}
            <div className="group/content relative flex flex-col gap-2">
              <textarea
                id="content"
                placeholder="My project is about..."
                className="peer h-32 resize-none bg-inherit px-4 py-2 leading-6 outline-none placeholder:tracking-wide placeholder:text-white/20 lg:h-72"
                {...register("content")}
              />
              <div className="pointer-events-none absolute bottom-0 left-0 h-px w-full rounded-lg bg-white/5 transition-colors duration-200 group-hover/content:bg-white/35 peer-focus-visible:bg-white" />
            </div>
            {errors?.content && (
              <p className="px-1 text-xs text-red-600">
                {errors.content.message}
              </p>
            )}
            <button className="rounded-[44px] bg-white/10 px-4 py-1 text-base leading-10 text-white/50 outline-none transition duration-200 focus-visible:scale-[0.98] lg:w-max lg:rounded-xl lg:bg-inherit lg:text-xl lg:text-white lg:hover:scale-[1.02] lg:active:scale-[0.98]">
              Send
            </button>
          </motion.div>
          <motion.div
            // initial={{ opacity: 0 }}
            // animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="relative isolate w-full overflow-hidden rounded-[18px] bg-white/5 lg:flex-1"
          >
            <div className="flex h-auto min-h-48 w-full flex-col justify-between px-6 pb-4 pt-2 tracking-wide lg:absolute lg:inset-0">
              <p className="text-lg leading-10 text-white/50">To</p>
              <div className="text-2xl leading-10">
                <p className="text-white">Laurence Laumann</p>
                <p className="text-xl text-white/70">Founder</p>
              </div>
            </div>
            <LogoCard className="absolute -top-96 left-36 -z-10 h-full w-full select-none lg:-left-7 lg:-top-[360px]" />
          </motion.div>
        </MotionConfig>
      </div>
    </motion.form>
  );
};

export default forwardRef(Form);
