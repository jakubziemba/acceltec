import LenisWrapper from "./_components/lenis-wrapper";
import LogoHero from "./_components/logo-hero";
import Button from "./_components/button";
import Form from "./_components/form";
import Footer from "./_components/footer/footer";

export default function Home() {
  return (
    <LenisWrapper>
      <main className="container mx-auto flex min-h-screen flex-col items-center justify-center">
        <section className="min-h-screen w-screen overflow-hidden pb-12 lg:pt-24">
          <div className="flex w-full items-center justify-center px-6">
            <LogoHero className="relative -bottom-6 w-full min-w-[890px]" />
          </div>
          <h1 className="px-6 text-center text-[1.75rem] font-normal leading-8 lg:text-[2.5rem] lg:leading-[1.8]">
            We partner with founders who look for greatness
          </h1>
        </section>
        <section className="flex min-h-screen max-w-xl flex-col items-center px-6 pt-20 lg:max-w-3xl lg:px-0">
          <div className="mx-auto space-y-8 text-2xl leading-6 lg:space-y-6 lg:text-4xl lg:leading-10">
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
    </LenisWrapper>
  );
}
