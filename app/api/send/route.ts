import { NextRequest, NextResponse } from 'next/server';
import { Resend } from 'resend';
import * as z from 'zod';

const resend = new Resend(process.env.NEXT_PUBLIC_RESEND_API_KEY);

const sendRouteSchema = z.object({
  name: z.string().min(2),
  email: z.string().email(),
  content: z.string().min(2),
});

export async function POST(request: NextRequest) {
  const { name, email, content } = await request.json().then(body => sendRouteSchema.parse(body));

  const res = await resend.emails.send({
    from: 'Acme <onboarding@resend.dev>',
    to: 'ziemba.jak@gmail.com',
    subject: `${name} sent you a message`,
    text: content,
  });

  return NextResponse.json(res);
}
