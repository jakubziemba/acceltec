import HeroSection from "./_components/hero/hero-section";
import Footer from "./_components/footer/footer";
import AboutSection from "./_components/about-section";
import FormSection from "./_components/form/section";

export default function Home() {
  return (
    <main className="container flex min-h-[calc(100vh-80px)] w-screen flex-col items-center">
      <div className="relative w-screen">
        <HeroSection />
        <FormSection />
      </div>
    </main>
  );
}
