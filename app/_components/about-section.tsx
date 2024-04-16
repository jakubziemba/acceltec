export default function AboutSection() {
  return (
    <section className="flex max-w-xl flex-col items-center px-6 py-20 lg:max-w-4xl lg:px-0">
      <div className="mx-auto space-y-8 text-balance text-2xl leading-6 xs:[text-wrap:initial] lg:space-y-6 lg:text-4xl lg:leading-10">
        <h2 className="text-white/80">
          Berlin-based software studio that exclusively works with founders,
          executives and innovative teams.
        </h2>
        <p className="text-white/40">
          We partner with companies and founders who aren’t afraid to challenge
          conventional order. We invest our time, resources and networks in
          those who recognize the value we bring to the table.
        </p>
        <p className="text-white/40">
          We work in a research driven manner. We try to ask the right questions
          to understand and uncover the problem space. We identify the nail
          before we start worrying about the hammer.
        </p>
      </div>
    </section>
  );
}
