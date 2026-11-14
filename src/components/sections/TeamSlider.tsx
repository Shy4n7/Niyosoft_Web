"use client";

import Image from "next/image";
import { useEffect, useRef, useState, type FocusEvent, type PointerEvent, type TouchEvent } from "react";
import { developers, site } from "@/lib/site";
import { ExperienceList } from "../ExperienceList";
import { Icon } from "../Icon";

/** Time each person stays on screen. */
const AUTOPLAY_MS = 3000;
/** After a finger is lifted from a held card, move on this quickly. */
const RESUME_AFTER_HOLD_MS = 1000;
const SWIPE_PX = 40;

export function TeamSlider() {
  const [index, setIndex] = useState(0);
  const [paused, setPaused] = useState(false);
  const [delay, setDelay] = useState(AUTOPLAY_MS);
  const [reducedMotion, setReducedMotion] = useState(false);
  const [inView, setInView] = useState(false);
  const rootRef = useRef<HTMLDivElement>(null);
  const touchStartX = useRef<number | null>(null);
  const count = developers.length;

  useEffect(() => {
    const query = window.matchMedia("(prefers-reduced-motion: reduce)");
    setReducedMotion(query.matches);
    const onChange = () => setReducedMotion(query.matches);
    query.addEventListener("change", onChange);
    return () => query.removeEventListener("change", onChange);
  }, []);

  // Only play while the slider is on screen, so visitors always meet the first person
  // when they scroll to it, and it does not move while nobody is looking.
  useEffect(() => {
    const element = rootRef.current;
    if (!element) return;
    const observer = new IntersectionObserver(([entry]) => setInView(entry.isIntersecting), { threshold: 0.5 });
    observer.observe(element);
    return () => observer.disconnect();
  }, []);

  // One timer per slide: any change of slide, pause or delay restarts it.
  useEffect(() => {
    if (!inView || paused || reducedMotion) return;
    const timer = setTimeout(() => {
      setDelay(AUTOPLAY_MS);
      setIndex((current) => (current + 1) % count);
    }, delay);
    return () => clearTimeout(timer);
  }, [index, inView, paused, delay, reducedMotion, count]);

  const go = (next: number) => {
    setDelay(AUTOPLAY_MS);
    setIndex((next + count) % count);
  };

  const onTouchStart = (event: TouchEvent) => {
    touchStartX.current = event.touches[0].clientX;
    setPaused(true);
  };

  // Holding the card stops the slider; lifting the finger moves on after one second,
  // unless the finger swiped, which changes the slide straight away.
  const onTouchEnd = (event: TouchEvent) => {
    const start = touchStartX.current;
    touchStartX.current = null;
    setPaused(false);
    const dx = start === null ? 0 : event.changedTouches[0].clientX - start;
    if (Math.abs(dx) > SWIPE_PX) go(index + (dx < 0 ? 1 : -1));
    else setDelay(RESUME_AFTER_HOLD_MS);
  };

  // Hover pauses for mouse users only; touch devices also fire hover events on tap.
  const onPointerEnter = (event: PointerEvent) => {
    if (event.pointerType === "mouse") setPaused(true);
  };
  const onPointerLeave = (event: PointerEvent) => {
    if (event.pointerType === "mouse") setPaused(false);
  };

  // Keyboard focus pauses; a tap on a dot or arrow also focuses it but should not stop the slider.
  const onFocus = (event: FocusEvent) => {
    if (event.target.matches(":focus-visible")) setPaused(true);
  };

  return (
    <div
      ref={rootRef}
      role="region"
      aria-roledescription="carousel"
      aria-label="Our developers"
      onPointerEnter={onPointerEnter}
      onPointerLeave={onPointerLeave}
      onFocus={onFocus}
      onBlur={() => setPaused(false)}
    >
      <div className="relative">
        <div className="overflow-hidden rounded-3xl" onTouchStart={onTouchStart} onTouchEnd={onTouchEnd} onTouchCancel={onTouchEnd}>
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
                className="grid w-full shrink-0 content-start items-center gap-8 bg-paper md:content-center p-6 sm:p-10 md:grid-cols-[16rem_1fr] md:gap-12"
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
                  {person.experience && <ExperienceList title="Experience" jobs={person.experience} className="mx-auto mt-6 md:mx-0" />}
                </div>
              </article>
            ))}
          </div>
        </div>
        {[
          { label: "Previous person", step: -1, side: "left-1 md:-left-5", flip: true },
          { label: "Next person", step: 1, side: "right-1 md:-right-5", flip: false },
        ].map((arrow) => (
          <button
            key={arrow.label}
            type="button"
            onClick={() => go(index + arrow.step)}
            aria-label={arrow.label}
            className={`absolute top-38 md:top-1/2 ${arrow.side} flex h-10 w-10 -translate-y-1/2 md:h-11 md:w-11 items-center justify-center rounded-full border border-navy/10 bg-white text-navy shadow-lg shadow-navy/10 transition hover:border-brand hover:text-brand`}
          >
            <Icon name="arrow" className={`h-5 w-5 ${arrow.flip ? "rotate-180" : ""}`} />
          </button>
        ))}
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
