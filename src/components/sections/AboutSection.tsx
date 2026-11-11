import Image from "next/image";
import { site } from "@/lib/site";
import { Reveal } from "../Reveal";
import { SectionHeading } from "./SectionHeading";

export function AboutSection() {
  return (
    <section id="about" className="scroll-mt-20 bg-white px-4 py-20 sm:px-6">
      <div className="mx-auto max-w-6xl">
        <SectionHeading eyebrow="About us" title="Technology with a" accent="purpose" />
        <div className="mt-12 grid items-center gap-12 lg:grid-cols-[0.9fr_1.1fr]">
          <Reveal>
            <figure className="relative mx-auto w-full max-w-sm">
              <div className="bg-brand-gradient absolute -bottom-4 -right-4 h-full w-full rounded-3xl" aria-hidden="true" />
              <Image
                src="/images/ashok-thomas.webp"
                alt={`${site.founder}, Founder of ${site.name}`}
                width={900}
                height={1246}
                sizes="(min-width: 1024px) 384px, 90vw"
                className="relative h-auto w-full rounded-3xl border border-navy/10 bg-white"
              />
            </figure>
          </Reveal>
          <Reveal delay={150}>
            <p className="text-sm font-semibold uppercase tracking-[0.2em] text-brand">Founder</p>
            <h3 className="mt-3 font-display text-3xl font-extrabold text-navy sm:text-4xl">{site.founder}</h3>
            <p className="mt-1 font-medium text-slate">Advocate &middot; Founder &amp; Proprietor, {site.name}</p>
            <p className="mt-6 leading-relaxed text-slate">
              An advocate by profession, {site.founder} founded {site.name} on 14 January {site.foundedYear} in Pollachi to help businesses solve everyday problems with software.
            </p>
            <div className="mt-8 grid gap-4 sm:grid-cols-2">
              <div className="rounded-2xl bg-paper p-5">
                <h4 className="font-display font-bold text-navy">Our mission</h4>
                <p className="mt-2 text-sm leading-relaxed text-slate">To solve real problems for businesses through dependable, easy-to-use software.</p>
              </div>
              <div className="rounded-2xl bg-paper p-5">
                <h4 className="font-display font-bold text-navy">Our vision</h4>
                <p className="mt-2 text-sm leading-relaxed text-slate">To be the technology partner businesses trust to transform how they work.</p>
              </div>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
