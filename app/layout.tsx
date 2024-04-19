import type { Metadata } from "next";
import { Inter_Tight } from "next/font/google";
import "./globals.css";
import Footer from "./_components/footer/footer";
import { tw } from "@/utils/tailwind";
import BackgroundGradient from "./_components/bg-gradient";

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
      <body className={inter.className}>
        {/* <BackgroundGradient /> */}
        <main className="container relative mx-auto flex flex-col items-center justify-center">
          {children}
        </main>
        <Footer />
      </body>
    </html>
  );
}
