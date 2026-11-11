import Link from "next/link";
import { Icon } from "../Icon";
import { ServiceOrbit } from "./ServiceOrbit";

export function Hero() {
  return (
    <section className="relative overflow-hidden">
      <div className="pointer-events-none absolute inset-0 -z-10" aria-hidden="true">
        <div className="absolute -top-40 left-1/2 h-[32rem] w-[48rem] -translate-x-1/2 rounded-full bg-sky/25 blur-3xl lg:left-[30%]" />
        <div className="absolute -top-24 left-[10%] h-72 w-72 rounded-full bg-brand/15 blur-3xl" />
      </div>
      <div className="mx-auto grid max-w-6xl items-center gap-12 px-4 pb-20 pt-20 sm:px-6 md:pb-28 md:pt-28 lg:grid-cols-[1.25fr_0.75fr]">
        <div className="text-center lg:text-left">
          <p className="inline-flex rounded-full border border-navy/10 bg-white/70 px-4 py-1.5 text-xs font-semibold uppercase tracking-[0.2em] text-brand">
            Niyosoft Technologies
          </p>
          <h1 className="mt-6 font-display text-4xl font-extrabold leading-[1.1] text-navy sm:text-5xl xl:text-6xl">
            Transforming Enterprises through <span className="text-gradient sm:whitespace-nowrap">Digital Innovation</span>
          </h1>
          <p className="mx-auto mt-6 max-w-2xl text-lg leading-relaxed text-slate lg:mx-0">
            We build mobile apps, websites and software that solve real business problems, from online ordering and payments to IT setup and support.
          </p>
          <div className="mt-9 flex flex-col justify-center gap-3 sm:flex-row lg:justify-start">
            <Link href="#contact" className="bg-brand-gradient inline-flex items-center justify-center gap-2 rounded-full px-7 py-3.5 font-semibold text-white shadow-lg shadow-brand/25 transition hover:opacity-90">
              Get Started <Icon name="arrow" className="h-5 w-5" />
            </Link>
            <Link href="#services" className="inline-flex items-center justify-center rounded-full border border-navy/20 bg-white px-7 py-3.5 font-semibold text-navy transition hover:border-brand hover:text-brand">
              Explore services
            </Link>
          </div>
        </div>
        <div className="relative hidden lg:block">
          <div className="absolute inset-8 rounded-full bg-sky/30 blur-3xl" aria-hidden="true" />
          <ServiceOrbit />
        </div>
      </div>
    </section>
  );
}
