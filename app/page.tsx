import HeroSection from "./_components/hero/hero-section";
import Button from "./_components/button";
import Form from "./_components/form";
import Footer from "./_components/footer/footer";

export default function Home() {
  return (
    <>
      <main className="container mx-auto flex min-h-screen flex-col items-center justify-center">
        <HeroSection />
        <section className="flex min-h-screen max-w-xl flex-col items-center px-6 pt-20 lg:max-w-3xl lg:px-0">
          <div className="xs:[text-wrap:initial] mx-auto space-y-8 text-balance text-2xl leading-6 lg:space-y-6 lg:text-4xl lg:leading-10">
            <h2 className="text-white/80">
              Berlin-based software studio that exclusively works with founders,
              executives and innovative teams.
            </h2>
            <p className="text-white/40">
              We partner with companies and founders who aren’t afraid to
              challenge conventional order. We invest our time, resources and
              networks in those who recognize the value we bring to the table.
            </p>
            <p className="text-white/40">
              We work in a research driven manner. We try to ask the right
              questions to understand and uncover the problem space. We identify
              the nail before we start worrying about the hammer.
            </p>
          </div>
          <Button>Pitch your project</Button>
        </section>
        <section className="min-h-screen w-full px-4 py-20 lg:px-0">
          <Form />
        </section>
      </main>
      <Footer />
    </>
  );
}
