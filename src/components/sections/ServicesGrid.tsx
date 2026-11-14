"use client";

import { useState } from "react";
import { services } from "@/lib/services";
import { Icon } from "../Icon";
import { Reveal } from "../Reveal";

/** All services as cards; tapping a card reveals what is included. */
export function ServicesGrid() {
  const [open, setOpen] = useState<ReadonlySet<string>>(new Set());

  const toggle = (slug: string) =>
    setOpen((current) => {
      const next = new Set(current);
      if (next.has(slug)) next.delete(slug);
      else next.add(slug);
      return next;
    });

  return (
    <ul className="mt-12 grid items-start gap-5 sm:grid-cols-2 lg:grid-cols-3">
      {services.map((service, index) => {
        const expanded = open.has(service.slug);
        const panelId = `service-${service.slug}`;
        return (
          <li key={service.slug}>
            <Reveal
              delay={(index % 3) * 100}
              className={`group relative overflow-hidden rounded-3xl border bg-white transition ${expanded ? "border-brand/40 shadow-xl shadow-navy/5" : "border-navy/10 hover:border-brand/40 hover:shadow-lg hover:shadow-navy/5"}`}
            >
              <div className="pointer-events-none absolute -right-16 -top-16 h-40 w-40 rounded-full bg-sky/15 blur-2xl" aria-hidden="true" />
              <button
                type="button"
                onClick={() => toggle(service.slug)}
                aria-expanded={expanded}
                aria-controls={panelId}
                className="relative flex w-full items-start gap-4 p-6 text-left"
              >
                <span className="bg-brand-gradient inline-flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl text-white shadow-md shadow-brand/20">
                  <Icon name={service.icon} className="h-6 w-6" />
                </span>
                <span className="min-w-0 flex-1">
                  <span className="block font-display text-lg font-bold leading-snug text-navy">{service.title}</span>
                  <span className="mt-1.5 block text-sm leading-relaxed text-slate">{service.summary}</span>
                  <span className="mt-3 inline-flex items-center gap-1.5 text-sm font-semibold text-brand">
                    {expanded ? "Show less" : "What's included"}
                    <Icon name="arrow" className={`h-4 w-4 transition-transform ${expanded ? "-rotate-90" : "rotate-90"}`} />
                  </span>
                </span>
              </button>
              <div id={panelId} hidden={!expanded} className="relative px-6 pb-6">
                <ul className="grid gap-2 border-t border-navy/10 pt-4">
                  {service.points.map((point) => (
                    <li key={point} className="flex items-start gap-2.5 text-sm font-medium text-navy">
                      <Icon name="check" className="mt-0.5 h-4 w-4 shrink-0 text-brand" /> {point}
                    </li>
                  ))}
                </ul>
              </div>
            </Reveal>
          </li>
        );
      })}
    </ul>
  );
}
