import type { Metadata } from "next";
import { Inter_Tight } from "next/font/google";
import "./globals.css";
import Script from "next/script";
import Footer from "./_components/footer/footer";
import { tw } from "@/utils/tailwind";
import CanvasAnimation from "./_components/canvas-animation";

const inter = Inter_Tight({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "acceltec | Web & Mobile Apps for Start-ups",
  description:
    "We are a Berlin-based software studio that works with founders and innovative teams to create the digital products of tomorrow.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={tw(
          inter.className,
          "flex min-h-screen flex-col items-center justify-between",
        )}
      >
        {children}
        <Script
          defer
          data-domain="acceltec.de"
          src="https://plausible.io/js/script.js"
        />
      </body>
    </html>
  );
}
