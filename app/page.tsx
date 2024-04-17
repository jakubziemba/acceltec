import HeroSection from "./_components/hero/hero-section";
import Footer from "./_components/footer/footer";
import AboutSection from "./_components/about-section";
import FormSection from "./_components/form/section";
// import BackgroundGradient from "./_components/bg-gradient";

export default function Home() {
  return (
    <>
      {/* <BackgroundGradient /> */}
      <HeroSection />
      <AboutSection />
      <FormSection />
      {/* <Footer /> */}
    </>
  );
}
