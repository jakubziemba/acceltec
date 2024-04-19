import HeroSection from "./_components/hero/hero-section";
import Footer from "./_components/footer/footer";
import AboutSection from "./_components/about-section";
import FormSection from "./_components/form/section";
// import BackgroundGradient from "./_components/bg-gradient";

export default function Home() {
  return (
    <div className="relative">
      <HeroSection />
      {/* <div className="sticky top-0 min-h-screen"> */}
      {/* <AboutSection /> */}
      <FormSection />
      {/* </div> */}
      {/* <Footer /> */}
    </div>
  );
}
