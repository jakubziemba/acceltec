import FooterTabs from "./tabs";

export default function Footer() {
  return (
    <footer className="mx-auto flex max-w-4xl flex-col items-center justify-between gap-4 py-6 leading-8 lg:flex-row">
      <p className="text-white/25">© 2024 acceltec GmbH</p>
      <FooterTabs />
    </footer>
  );
}
