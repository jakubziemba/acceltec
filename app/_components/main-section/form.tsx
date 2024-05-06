"use client";

import { forwardRef } from "react";
import * as z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { AnimatePresence, MotionConfig, motion } from "framer-motion";
import LogoCardSVG from "./logo-card";
import CheckIcon from "./check-icon";
import { tw } from "@/utils/tailwind";

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

const Form = (
  { id = "form", showForm }: { id?: string; showForm?: boolean },
  ref: React.ForwardedRef<HTMLFormElement>,
) => {
  const {
    register,
    handleSubmit,
    formState: { isSubmitting, isSubmitSuccessful, errors },
  } = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
  });
  const DURATION = showForm ? 0.2 : 0.15;
  const DELAY = showForm ? 0.12 : 0.03;

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
    <div className="flex w-full flex-col items-center justify-center rounded-[30px] bg-[#121212] lg:justify-center">
      <motion.form
        ref={ref}
        id={id}
        className="mx-auto w-full max-w-lg origin-bottom rounded-[30px] bg-[#121212] lg:max-w-4xl"
        onSubmit={handleSubmit(onSubmit)}
      >
        <div className="mx-auto flex w-full max-w-xl flex-col gap-4 rounded-[30px] bg-[hsla(0,0%,7%,1)] p-3 2xs:p-4 lg:max-w-full lg:flex-row lg:gap-6 lg:p-7">
          <MotionConfig
            transition={{
              type: "linear",
              delay: 0.15,
              duration: 0.25,
              ease: "easeIn",
            }}
          >
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: showForm ? 1 : 0 }}
              transition={{
                duration: DURATION,
                delay: DELAY,
              }}
              className="lg:flex-2 lg:order-0 order-1 flex flex-col gap-2 text-base leading-10 tracking-wide lg:w-full lg:max-w-md lg:text-xl"
            >
              <label
                htmlFor="name"
                className="w-full rounded-[18px] px-4 py-2 leading-10 tracking-wide text-white/50 lg:text-lg"
              >
                From
              </label>
              <div className="group/name relative flex flex-col gap-2">
                <input
                  id="name"
                  type="text"
                  placeholder="Name"
                  autoComplete="off"
                  required
                  className="peer bg-inherit px-4 py-2 leading-10 outline-none transition duration-200 placeholder:tracking-wide placeholder:text-white/20"
                  {...register("name")}
                  aria-invalid={errors?.name ? "true" : "false"}
                />
                <div
                  className={tw(
                    "pointer-events-none absolute bottom-0 left-0 h-px w-full rounded-lg bg-white/5 transition-colors duration-200 group-hover/name:bg-white/35 peer-focus-within:bg-white",
                  )}
                />
              </div>
              <div className="group/email relative flex flex-col gap-2">
                <input
                  id="email"
                  type="email"
                  required
                  placeholder="Email"
                  autoComplete="off"
                  className="peer bg-inherit px-4 py-2 leading-10 outline-none transition-colors duration-200 placeholder:tracking-wide placeholder:text-white/20"
                  {...register("email")}
                  aria-invalid={errors?.email ? "true" : "false"}
                />
                <div
                  className={tw(
                    "pointer-events-none absolute bottom-0 left-0 h-px w-full rounded-lg bg-white/5 transition-colors duration-200 group-hover/email:bg-white/35 peer-focus-visible:bg-white",
                  )}
                />
              </div>
              <div className="group/content relative flex flex-col gap-2">
                <textarea
                  id="content"
                  required
                  placeholder="My project is about..."
                  className="peer min-h-24 resize-none bg-inherit px-4 py-2 leading-6 outline-none placeholder:tracking-wide placeholder:text-white/20 2xs:min-h-32 lg:min-h-72"
                  {...register("content")}
                  aria-invalid={errors?.content ? "true" : "false"}
                />
                <div
                  className={tw(
                    "pointer-events-none absolute bottom-0 left-0 h-px w-full rounded-lg bg-white/5 transition-colors duration-200 group-hover/content:bg-white/35 peer-focus-visible:bg-white",
                  )}
                />
              </div>
              <div className="flex min-h-10 justify-center py-1 2xs:min-h-14 lg:justify-start">
                <AnimatePresence mode="wait">
                  {!isSubmitSuccessful ? (
                    <motion.button
                      initial={{ opacity: 1 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                      transition={{
                        type: "tween",
                        duration: 0.4,
                      }}
                      disabled={isSubmitting}
                      className="px-4 py-1 text-base leading-6 text-white/50 outline-none transition duration-200 disabled:text-white/50 xs:leading-9 lg:w-max lg:rounded-xl lg:bg-inherit lg:text-xl lg:leading-10 lg:text-white lg:focus-visible:text-white/80 lg:active:scale-[0.98]"
                    >
                      {isSubmitting ? "Sending..." : "Send"}
                    </motion.button>
                  ) : (
                    <motion.div
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1, visibility: "visible" }}
                      exit={{ opacity: 0, visibility: "hidden" }}
                      transition={{
                        type: "tween",
                        duration: 0.4,
                        visibility: { delay: isSubmitSuccessful ? 0 : 0.4 },
                      }}
                      className="flex w-full items-center gap-2"
                    >
                      <span className="inline-flex self-start xs:self-center">
                        <CheckIcon />
                      </span>
                      <p className="text-base text-white/50 lg:text-lg">
                        Your email was sent. We&apos;ll get back to you soon.
                      </p>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            </motion.div>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: showForm ? 1 : 0 }}
              transition={{ duration: DURATION, delay: DELAY }}
              className="order-0 relative isolate w-full overflow-hidden rounded-[18px] bg-white/5 lg:order-1 lg:flex-1"
            >
              <div className="flex h-auto min-h-32 w-full flex-col justify-between px-6 pb-4 pt-2 tracking-wide xs:min-h-48 lg:absolute lg:inset-0">
                <p className="text-base leading-10 text-white/50">To</p>
                <div className="text-xl leading-10">
                  <p className="text-white">Laurence Laumann</p>
                  <p className="text-base text-white/70">Founder</p>
                </div>
              </div>
              <LogoCardSVG className="absolute -top-96 left-36 -z-10 h-full w-full select-none lg:-left-7 lg:-top-[360px]" />
            </motion.div>
          </MotionConfig>
        </div>
      </motion.form>
    </div>
  );
};

export default forwardRef(Form);
