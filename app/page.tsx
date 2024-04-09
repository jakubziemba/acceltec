import LogoHero from '@/app/_components/logo-hero';

export default function Home() {
  return (
    <main className="container mx-auto flex min-h-screen flex-col items-center justify-center">
      <section className="mx-auto pb-12 py-24">
        <LogoHero className="relative -bottom-6 w-full" />
        <h1 className="text-[2.5rem] text-center leading-[1.8] font-normal">
          We partner with founders who look for greatness
        </h1>
      </section>
      <section className="flex flex-col items-center">
        <div className="max-w-3xl mx-auto pt-20 text-4xl space-y-6">
          <h2 className="text-white/80 font-medium">
            Berlin-based software studio that exclusively works with founders, executives and
            innovative teams.
          </h2>
          <p className="text-white/40 font-medium">
            We partner with companies and founders who aren’t afraid to challenge conventional
            order. We invest our time, resources and networks in those who recognize the value we
            bring to the table.
          </p>
          <p className="text-white/40 font-medium">
            We work in a research driven manner. We try to ask the right questions to understand and
            uncover the problem space. We identify the nail before we start worrying about the
            hammer.
          </p>
        </div>
        <button className="my-32 px-6 py-3 text-xl rounded-[32px] shadow-[0px_0px_0px_2px_hsla(0,0%,100%,0.2),0px_2px_2px_0px_hsla(0,0%,0%,0.2)]">
          Pitch your project
        </button>
      </section>
    </main>
  );
}
