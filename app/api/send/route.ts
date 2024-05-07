import { NextRequest, NextResponse } from "next/server";
import * as z from "zod";
import { Resend } from "resend";
import { nanoid } from "nanoid";

const resend = new Resend(process.env.NEXT_PUBLIC_RESEND_API_KEY);

const sendRouteSchema = z.object({
  name: z.string().min(2),
  email: z.string().email(),
  content: z.string().min(2),
});

export async function POST(request: NextRequest, response: NextResponse) {
  try {
    const { name, email, content } = await request
      .json()
      .then((body) => sendRouteSchema.parse(body));

    // anti-spam
    if (
      email.includes("@example.com") ||
      email.includes("@test.com") ||
      !email.includes("@") ||
      !email
    ) {
      return NextResponse.json({ ok: true });
    }

    const res = await resend.emails.send({
      from: "Acceltec <send@marketing.acceltec.de>",
      to: "hello@acceltec.de",
      reply_to: email,
      subject: `${name} sent you a message`,
      text: content,
      headers: {
        "X-Entity-Ref-ID": nanoid(10),
      },
    });

    if (res.error) {
      return NextResponse.json({ error: res.error });
    }

    return NextResponse.json(res);
  } catch (error) {
    return NextResponse.json({ error: error });
  }
}
