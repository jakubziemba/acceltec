export default function Page() {
  return (
    <section className="flex w-full max-w-xl flex-col px-6 py-20 text-left lg:max-w-4xl lg:px-0">
      <h1 className="text-4xl">Impressum</h1>
      <h2 className="text-[1.75rem] text-white/80">
        Anbieterkennzeichnung gem. § 5 TMG
      </h2>
      <div className="flex flex-col gap-6 pt-8 text-xl leading-7 text-white/50">
        <div>
          <p>acceltec GmbH</p>
          <p>David-Friedländer-Weg 150</p>
          <p>13057 Berlin</p>
        </div>
        <div>
          <p>Handelsregister: Amtsgericht Charlottenburg</p>
          <p>Handelsregisternummer: HRB 246919 B</p>
          <p>Steuernummer: 137/201/53586</p>
          <p>USt-IdNr.: DE356812123</p>
        </div>
        <div>
          <p>
            E-Mail: <a href="mailto:info@acceltec.com">info@acceltec.com</a>
          </p>
          <p>
            Telefon: <a href="tel:+4917251234567">+49 172 512 345 67</a>
          </p>
        </div>
        <div>
          <p>Vertretungsberechtigter Geschäftsführer:</p>
          <p>Laurence Laumann</p>
        </div>
      </div>
    </section>
  );
}
