export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <section className="flex w-full max-w-xl flex-col gap-6 px-6 py-20 text-left lg:max-w-4xl lg:px-0 lg:py-32">
      {children}
    </section>
  );
}
