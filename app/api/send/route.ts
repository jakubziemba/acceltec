import { NextRequest, NextResponse } from "next/server";
import { Resend } from "resend";
import * as z from "zod";

const resend = new Resend(process.env.NEXT_PUBLIC_RESEND_API_KEY);

const sendRouteSchema = z.object({
  name: z.string().min(2),
  email: z.string().email(),
  content: z.string().min(2),
});

// TODO - register domain to send emails from any email address

export async function POST(request: NextRequest, response: NextResponse) {
  try {
    const { name, email, content } = await request
      .json()
      .then((body) => sendRouteSchema.parse(body));

    const res = await resend.emails.send({
      from: "Acme <onboarding@resend.dev>", // should be ${name} ${email} when domain is registered
      to: "ziemba.jak@gmail.com",
      subject: `${name} sent you a message`,
      text: content,
    });

    if (res.error) {
      return NextResponse.json({ error: res.error });
    }

    return NextResponse.json(res);
  } catch (error) {
    return NextResponse.json({ error: error });
  }
}
