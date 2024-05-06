import FooterTabs from "./tabs";

export default function Footer() {
  return (
    <footer className="relative z-10 mx-auto flex w-full max-w-4xl flex-col items-center justify-between gap-4 overflow-clip py-4 leading-8 lg:flex-row lg:py-6">
      <p className="text-sm text-white/25">© 2024 acceltec GmbH</p>
      <FooterTabs />
    </footer>
  );
}
