import AnimatedText from "../animated-text";

export default function TextSection() {
  return (
    <>
      <AnimatedText el="h2" className="origin-bottom text-white/80">
        Berlin-based software studio that exclusively works with founders,
        forward-looking leaders, and innovative teams.
      </AnimatedText>
      <AnimatedText className="text-white/40">
        By partnering with us, you gain access to outstanding designers and
        developers without the long hiring process or the need to recruit an
        in-house team.
      </AnimatedText>
      <AnimatedText className="text-white/40">
        With dozens of projects launched and 20+ companies we collaborated with,
        we fast track the entire process and drive organisational change from
        within. We bring careful planning, transparent communication, and
        aggressive execution to keep you ahead of the game.
      </AnimatedText>
      <AnimatedText className="text-white/40">
        We build web and mobile apps for companies we believe in and we only
        commit to a handful of projects per year. Let&apos;s start to build.
      </AnimatedText>
    </>
  );
}
