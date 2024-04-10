import LogoHero from './_components/logo-hero';
import LenisWrapper from './_components/lenis-wrapper';
import Link from 'next/link';

export default function Home() {
  return (
    <LenisWrapper>
      <main className="container mx-auto flex min-h-screen flex-col items-center justify-center">
        <section className="pb-12 lg:pt-24 px-6 overflow-hidden w-screen">
          <div className="flex items-center justify-center">
            <LogoHero className="relative -bottom-6 w-full min-w-[890px]" />
          </div>
          <h1 className="text-[1.75rem] lg:text-[2.5rem] leading-8 text-center lg:leading-[1.8] font-normal">
            We partner with founders who look for greatness
          </h1>
        </section>
        <section className="flex max-w-xl pt-20 lg:max-w-3xl flex-col items-center px-6 lg:px-0">
          <div className="mx-auto text-2xl lg:text-4xl space-y-8 lg:space-y-6 leading-6 lg:leading-10">
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
              We work in a research driven manner. We try to ask the right questions to understand
              and uncover the problem space. We identify the nail before we start worrying about the
              hammer.
            </p>
          </div>
          <button className="my-32 px-6 py-3 text-xl rounded-[32px] shadow-[0px_0px_0px_2px_hsla(0,0%,100%,0.2),0px_2px_2px_0px_hsla(0,0%,0%,0.2)]">
            Pitch your project
          </button>
        </section>
        <section className="max-w-4xl w-full px-4 lg:px-0 py-20">
          <form>
            <div className="flex rounded-[32px] bg-[#171717] gap-6 p-4 lg:p-7">
              <div className="flex flex-col max-w-md w-full gap-2 leading-10 text-base lg:text-xl tracking-wide flex-2">
                <label
                  htmlFor="name"
                  className="w-full rounded-[18px] bg-white/5 text-white/50 leading-10 lg:text-lg tracking-wide px-4 py-3"
                >
                  From
                </label>
                <input
                  type="text"
                  placeholder="Name"
                  className="border-b bg-inherit border-white/5 py-2 placeholder:text-white/20 placeholder:tracking-wide leading-10 px-4"
                />
                <input
                  type="email"
                  placeholder="Email"
                  className="border-b bg-inherit border-white/5 px-4 py-2 placeholder:text-white/20 placeholder:tracking-wide leading-10"
                />
                <textarea
                  name="content"
                  id="email-content"
                  placeholder="My project is about..."
                  className="border-b border-white/5 bg-inherit px-4 py-2 h-32 lg:h-72 resize-none placeholder:text-white/20 placeholder:tracking-wide leading-10"
                ></textarea>
                <button className="bg-white/10 text-white/50 lg:bg-white lg:text-black rounded-[44px] lg:rounded-xl text-base lg:w-max px-6 py-1 leading-10">
                  Send
                </button>
              </div>
              <div className="flex-1 w-full bg-white/5 rounded-[18px] isolate relative hidden invisible lg:block lg:visible ">
                <div className="absolute inset-0 flex tracking-wide h-full w-full justify-between flex-col px-6 pt-2 pb-4">
                  <p className="text-lg text-white/50 leading-10">To</p>
                  <div className="text-2xl leading-10">
                    <p className="text-white">Laurence Laumann</p>
                    <p className="text-white/70">Founder</p>
                  </div>
                </div>
              </div>
            </div>
          </form>
        </section>
      </main>
      <footer className="flex lg:flex-row flex-col items-center gap-4 leading-8 justify-between max-w-4xl mx-auto py-6">
        <p className="text-white/25">© 2024 acceltec GmbH</p>
        <div className="flex gap-1">
          <Link href="" className="px-3 leading-8 text-white/80">
            Impressum
          </Link>
          <Link href="" className="px-3 leading-8 text-white/20">
            Datenschutz
          </Link>
        </div>
      </footer>
    </LenisWrapper>
  );
}
