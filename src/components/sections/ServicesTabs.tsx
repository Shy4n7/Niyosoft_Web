"use client";

import { useRef, useState, type KeyboardEvent } from "react";
import { services } from "@/lib/services";
import { Icon } from "../Icon";

const lastIndex = services.length - 1;

function targetIndex(key: string, current: number): number | null {
  if (key === "ArrowRight") return current === lastIndex ? 0 : current + 1;
  if (key === "ArrowLeft") return current === 0 ? lastIndex : current - 1;
  if (key === "Home") return 0;
  if (key === "End") return lastIndex;
  return null;
}

export function ServicesTabs() {
  const [activeIndex, setActiveIndex] = useState(0);
  const tabRefs = useRef<(HTMLButtonElement | null)[]>([]);
  const active = services[activeIndex];

  const onKeyDown = (event: KeyboardEvent<HTMLDivElement>) => {
    const next = targetIndex(event.key, activeIndex);
    if (next === null) return;
    event.preventDefault();
    setActiveIndex(next);
    tabRefs.current[next]?.focus();
  };

  return (
    <div className="mt-12">
      <div role="tablist" aria-label="Services" onKeyDown={onKeyDown} className="-mx-4 flex snap-x scroll-px-4 gap-2 overflow-x-auto px-4 pb-1 [scrollbar-width:none] sm:mx-0 sm:flex-wrap sm:justify-center sm:overflow-visible sm:px-0 sm:pb-0">
        {services.map((service, index) => {
          const selected = index === activeIndex;
          return (
            <button
              key={service.slug}
              ref={(element) => {
                tabRefs.current[index] = element;
              }}
              type="button"
              role="tab"
              id={`tab-${service.slug}`}
              aria-selected={selected}
              aria-controls="service-panel"
              tabIndex={selected ? 0 : -1}
              onClick={() => setActiveIndex(index)}
              className={`shrink-0 snap-start whitespace-nowrap rounded-full px-4 py-2 text-sm font-semibold transition ${selected ? "bg-brand-gradient text-white shadow-md shadow-brand/20" : "border border-navy/15 bg-white text-navy hover:border-brand hover:text-brand"}`}
            >
              {service.shortTitle}
            </button>
          );
        })}
      </div>
      <div
        id="service-panel"
        role="tabpanel"
        aria-labelledby={`tab-${active.slug}`}
        tabIndex={0}
        className="relative mt-8 overflow-hidden rounded-3xl border border-brand/20 bg-white p-7 sm:p-12"
      >
        <div className="pointer-events-none absolute -right-24 -top-24 h-72 w-72 rounded-full bg-sky/20 blur-3xl" aria-hidden="true" />
        <div className="relative grid gap-8 md:grid-cols-[1.2fr_1fr] md:items-center">
          <div>
            <div className="bg-brand-gradient inline-flex h-14 w-14 items-center justify-center rounded-2xl text-white">
              <Icon name={active.icon} className="h-7 w-7" />
            </div>
            <h3 className="mt-5 font-display text-2xl font-extrabold text-navy sm:text-3xl">{active.title}</h3>
            <p className="mt-3 text-lg leading-relaxed text-slate">{active.summary}</p>
          </div>
          <ul className="grid gap-3">
            {active.points.map((point) => (
              <li key={point} className="flex items-center gap-3 rounded-xl bg-paper px-4 py-3 font-medium text-ink">
                <Icon name="check" className="h-5 w-5 shrink-0 text-brand" /> {point}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}
