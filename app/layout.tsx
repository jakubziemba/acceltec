import type { Metadata } from "next";
import { Inter_Tight } from "next/font/google";
import "./globals.css";
import Footer from "./_components/footer/footer";
import { tw } from "@/utils/tailwind";
import CanvasAnimation from "./_components/canvas-animation";

const inter = Inter_Tight({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Acceltec",
  description:
    "Berlin-based software studio that exclusively works with founders, executives and innovative teams.",
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
        {/* <Footer /> */}
      </body>
    </html>
  );
}
