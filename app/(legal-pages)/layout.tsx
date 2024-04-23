import ButtonHome from "../_components/button-home";

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <section className="flex min-h-[calc(100vh-80px)] w-full max-w-xl flex-col gap-6 px-6 py-20 text-left lg:max-w-4xl lg:px-0 lg:py-20">
        <nav className="sticky top-10 z-10 flex w-full justify-center lg:top-20">
          <ButtonHome>Home</ButtonHome>
        </nav>
        <div className="flex w-full flex-col justify-center gap-6 py-4">
          {children}
        </div>
      </section>
    </>
  );
}
