import ButtonHome from "../_components/button-home";
import Footer from "../_components/footer/footer";

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <main className="container flex min-h-[calc(100svh-80px)] w-screen flex-col items-center">
      <nav className="fixed top-10 z-10 flex w-full justify-center lg:top-20">
        <ButtonHome>Home</ButtonHome>
      </nav>
      <section className="flex min-h-[calc(100svh-80px)] w-full max-w-xl flex-col gap-6 px-6 py-20 text-left lg:max-w-4xl lg:px-0 lg:py-32">
        <div className="flex w-full flex-col justify-center gap-6 py-4">
          {children}
        </div>
      </section>
      <Footer />
    </main>
  );
}
