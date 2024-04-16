import HeroSection from "./_components/hero/hero-section";
import Footer from "./_components/footer/footer";
import AboutSection from "./_components/about-section";
import FormSection from "./_components/form/section";

export default function Home() {
  return (
    <>
      <main className="container mx-auto flex min-h-screen flex-col items-center justify-center">
        <HeroSection />
        <AboutSection />
        <FormSection />
      </main>
      <Footer />
    </>
  );
}
