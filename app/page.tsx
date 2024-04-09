import Image from 'next/image';

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center p-24">
      <div className="container max-w-3xl mx-auto text-4xl space-y-6">
        <h1 className="text-white/80">
          Berlin-based software studio that exclusively works with founders, executives and
          innovative teams.
        </h1>
        <p className="text-white/40">
          We partner with companies and founders who aren’t afraid to challenge conventional order.
          We invest our time, resources and networks in those who recognize the value we bring to
          the table.
        </p>
        <p className="text-white/40">
          We work in a research driven manner. We try to ask the right questions to understand and
          uncover the problem space. We identify the nail before we start worrying about the hammer.
        </p>
      </div>
      <button className="my-32 px-6 py-3 text-xl rounded-[32px] shadow-[0px_0px_0px_2px_hsla(0,0%,100%,0.2),0px_2px_2px_0px_hsla(0,0%,0%,0.2)]">
        Pitch your project
      </button>
    </main>
  );
}
