"use client";

import Image from "next/image";
import { useEffect, useRef, useState, type TouchEvent } from "react";
import { developers, site } from "@/lib/site";

const AUTOPLAY_MS = 4500;
const SWIPE_PX = 40;

export function TeamSlider() {
  const [index, setIndex] = useState(0);
  const [paused, setPaused] = useState(false);
  const [reducedMotion, setReducedMotion] = useState(false);
  const touchStartX = useRef<number | null>(null);
  const count = developers.length;

  useEffect(() => {
    const query = window.matchMedia("(prefers-reduced-motion: reduce)");
    setReducedMotion(query.matches);
    const onChange = () => setReducedMotion(query.matches);
    query.addEventListener("change", onChange);
    return () => query.removeEventListener("change", onChange);
  }, []);

  useEffect(() => {
    if (paused || reducedMotion) return;
    const timer = setInterval(() => setIndex((current) => (current + 1) % count), AUTOPLAY_MS);
    return () => clearInterval(timer);
  }, [paused, reducedMotion, count]);

  const go = (next: number) => setIndex((next + count) % count);

  const onTouchStart = (event: TouchEvent) => {
    touchStartX.current = event.touches[0].clientX;
    setPaused(true);
  };

  const onTouchEnd = (event: TouchEvent) => {
    const start = touchStartX.current;
    touchStartX.current = null;
    setPaused(false);
    if (start === null) return;
    const dx = event.changedTouches[0].clientX - start;
    if (Math.abs(dx) > SWIPE_PX) go(index + (dx < 0 ? 1 : -1));
  };

  return (
    <div
      role="region"
      aria-roledescription="carousel"
      aria-label="Our developers"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
      onFocus={() => setPaused(true)}
      onBlur={() => setPaused(false)}
    >
      <div className="overflow-hidden rounded-3xl" onTouchStart={onTouchStart} onTouchEnd={onTouchEnd}>
        <div
          className="flex transition-transform duration-700 ease-out motion-reduce:transition-none"
          style={{ transform: `translateX(-${index * 100}%)` }}
          aria-live={paused || reducedMotion ? "polite" : "off"}
        >
          {developers.map((person, i) => (
            <article
              key={person.name}
              role="group"
              aria-roledescription="slide"
              aria-label={`${i + 1} of ${count}: ${person.name}`}
              aria-hidden={i !== index}
              inert={i !== index}
              className="grid w-full shrink-0 items-center gap-8 bg-paper p-6 sm:p-10 md:grid-cols-[16rem_1fr] md:gap-12"
            >
              <figure className="relative mx-auto w-full max-w-64">
                <div className="bg-brand-gradient absolute -bottom-3 -right-3 h-full w-full rounded-3xl" aria-hidden="true" />
                <Image
                  src={person.photo}
                  alt={`${person.name}, ${person.role} at ${site.name}`}
                  width={640}
                  height={640}
                  sizes="256px"
                  className="relative aspect-square h-auto w-full rounded-3xl border border-navy/10 bg-white object-cover"
                />
              </figure>
              <div className="text-center md:text-left">
                <p className="text-sm font-semibold uppercase tracking-[0.14em] text-brand">{person.role}</p>
                <h4 className="mt-2 font-display text-2xl font-bold tracking-[-0.015em] text-navy sm:text-3xl">{person.name}</h4>
                <p className="mt-4 leading-relaxed text-slate">{person.bio}</p>
              </div>
            </article>
          ))}
        </div>
      </div>
      <div className="mt-6 flex justify-center gap-3">
        {developers.map((person, i) => (
          <button
            key={person.name}
            type="button"
            onClick={() => go(i)}
            aria-label={`Show ${person.name}`}
            aria-current={i === index}
            className="flex h-6 items-center justify-center px-1"
          >
            <span className={`block h-2.5 rounded-full transition-all ${i === index ? "w-8 bg-brand" : "w-2.5 bg-navy/20 hover:bg-navy/40"}`} />
          </button>
        ))}
      </div>
    </div>
  );
}
