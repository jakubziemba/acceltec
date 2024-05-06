import HeroSection from "./_components/hero/hero-section";
import MainSection from "./_components/main-section/section";

export default function Home() {
  return (
    <main className="container flex min-h-[calc(100vh-80px)] w-screen flex-col items-center">
      <div className="relative w-screen">
        <HeroSection />
        <MainSection />
      </div>
    </main>
  );
}
