'use client';

import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { motion } from 'framer-motion';

const formSchema = z.object({
  name: z.string().min(2, {
    message: 'Name must be at least 2 characters.',
  }),
  email: z.string().email({
    message: 'Email must be in proper format',
  }),
  content: z.string().min(2, {
    message: 'Message must be at least 2 characters.',
  }),
});

// TODO: clean up, ask for error states in design

export default function Form() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
  });

  async function onSubmit(values: z.infer<typeof formSchema>) {
    await fetch('/api/send', {
      method: 'POST',
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
      <div className="flex rounded-[30px] bg-[#171717] gap-6 p-4 lg:p-7">
        <div className="flex flex-col max-w-md w-full gap-2 leading-10 text-base lg:text-xl tracking-wide flex-2">
          <label
            htmlFor="name"
            className="w-full rounded-[18px] bg-white/5 text-white/50 leading-10 lg:text-lg tracking-wide px-4 py-3"
          >
            From
          </label>
          <input
            id="name"
            type="text"
            placeholder="Name"
            className="border-b bg-inherit outline-none border-white/5 py-2 placeholder:text-white/20 placeholder:tracking-wide leading-10 px-4"
            {...register('name')}
          />
          {errors?.name && <p className="px-1 text-xs text-red-600">{errors.name.message}</p>}
          <input
            id="email"
            type="email"
            placeholder="Email"
            className="border-b bg-inherit border-white/5 outline-none px-4 py-2 placeholder:text-white/20 placeholder:tracking-wide leading-10"
            {...register('email')}
          />
          {errors?.email && <p className="px-1 text-xs text-red-600">{errors.email.message}</p>}
          <textarea
            id="content"
            placeholder="My project is about..."
            className="border-b border-white/5 bg-inherit px-4 py-2 h-32 outline-none lg:h-72 resize-none placeholder:text-white/20 placeholder:tracking-wide leading-6"
            {...register('content')}
          ></textarea>
          {errors?.content && <p className="px-1 text-xs text-red-600">{errors.content.message}</p>}
          <button className="bg-white/10 text-white/50 lg:bg-white outline-none lg:text-black rounded-[44px] lg:rounded-xl text-base lg:w-max px-6 py-1 leading-10">
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
