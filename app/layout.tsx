import type { Metadata } from "next";
import { Inter_Tight } from "next/font/google";
import "./globals.css";
import Footer from "./_components/footer/footer";
import { tw } from "@/utils/tailwind";
import BackgroundGradient from "./_components/bg-gradient";
import GradientCSS from "./_components/gradient-css";

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
          "flex min-h-screen flex-col justify-between",
        )}
      >
        {/* <BackgroundGradient /> */}
        <GradientCSS />
        <main className="container mx-auto flex min-h-[calc(100vh-80px)] flex-col items-center">
          {children}
        </main>
        <Footer />
      </body>
    </html>
  );
}
