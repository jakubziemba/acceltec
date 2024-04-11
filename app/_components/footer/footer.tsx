import FooterTabs from './tabs';

export default function Footer() {
  return (
    <footer className="flex lg:flex-row flex-col items-center gap-4 leading-8 justify-between max-w-4xl mx-auto py-6">
      <p className="text-white/25">© 2024 acceltec GmbH</p>
      <FooterTabs />
    </footer>
  );
}
