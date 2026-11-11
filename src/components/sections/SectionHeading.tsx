import { Reveal } from "../Reveal";

export function SectionHeading({ eyebrow, title, accent, intro }: { eyebrow: string; title: string; accent: string; intro?: string }) {
  return (
    <Reveal className="mx-auto max-w-3xl text-center">
      <p className="text-sm font-semibold uppercase tracking-[0.2em] text-brand">{eyebrow}</p>
      <h2 className="mt-3 font-display text-3xl font-extrabold leading-tight text-navy sm:text-4xl">
        {title} <span className="text-gradient">{accent}</span>
      </h2>
      {intro && <p className="mt-4 text-lg leading-relaxed text-slate">{intro}</p>}
    </Reveal>
  );
}
