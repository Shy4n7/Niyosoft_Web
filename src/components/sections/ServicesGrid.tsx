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
    <ul className="mt-10 grid items-start gap-3 sm:mt-12 sm:grid-cols-2 sm:gap-5 lg:grid-cols-3">
      {services.map((service, index) => {
        const expanded = open.has(service.slug);
        const panelId = `service-${service.slug}`;
        return (
          <li key={service.slug}>
            <Reveal
              delay={(index % 3) * 100}
              className={`group relative overflow-hidden rounded-2xl border bg-white transition sm:rounded-3xl ${expanded ? "border-brand/40 shadow-xl shadow-navy/5" : "border-navy/10 hover:border-brand/40 hover:shadow-lg hover:shadow-navy/5"}`}
            >
              <div className="pointer-events-none absolute -right-16 -top-16 h-40 w-40 rounded-full bg-sky/15 blur-2xl" aria-hidden="true" />
              <button
                type="button"
                onClick={() => toggle(service.slug)}
                aria-expanded={expanded}
                aria-controls={panelId}
                className="relative flex w-full items-center gap-4 px-4 py-3.5 text-left transition-transform active:scale-[0.99] motion-reduce:active:scale-100 sm:items-start sm:p-6"
              >
                <span className={`bg-brand-gradient inline-flex h-10 w-10 shrink-0 transition-transform duration-300 motion-reduce:transition-none ${expanded ? "scale-110" : ""} items-center justify-center rounded-xl text-white shadow-md shadow-brand/20 sm:h-12 sm:w-12 sm:rounded-2xl`}>
                  <Icon name={service.icon} className="h-5 w-5 sm:h-6 sm:w-6" />
                </span>
                <span className="min-w-0 flex-1">
                  <span className="block font-display text-base font-bold leading-snug text-navy sm:text-lg">{service.title}</span>
                  <span className="mt-1.5 hidden text-sm leading-relaxed text-slate sm:block">{service.summary}</span>
                  <span className="mt-3 hidden items-center gap-1.5 text-sm font-semibold text-brand sm:inline-flex">
                    {expanded ? "Show less" : "What's included"}
                    <Icon name="arrow" className={`h-4 w-4 transition-transform ${expanded ? "-rotate-90" : "rotate-90"}`} />
                  </span>
                </span>
                <Icon name="arrow" className={`h-5 w-5 shrink-0 text-brand transition-transform sm:hidden ${expanded ? "-rotate-90" : "rotate-90"}`} />
              </button>
              {/* Grows open smoothly: the grid row animates from 0fr to 1fr while the content fades and slides in. */}
              <div
                id={panelId}
                inert={!expanded}
                className={`relative grid transition-[grid-template-rows] duration-300 ease-out motion-reduce:transition-none ${expanded ? "grid-rows-[1fr]" : "grid-rows-[0fr]"}`}
              >
                <div className="overflow-hidden">
                  <div
                    className={`px-4 pb-4 transition duration-300 ease-out motion-reduce:transition-none sm:px-6 sm:pb-6 ${expanded ? "translate-y-0 opacity-100" : "-translate-y-2 opacity-0"}`}
                  >
                    <p className="mb-3 text-sm leading-relaxed text-slate sm:hidden">{service.summary}</p>
                    <ul className="grid gap-2 border-t border-navy/10 pt-4">
                      {service.points.map((point) => (
                        <li key={point} className="flex items-start gap-2.5 text-sm font-medium text-navy">
                          <Icon name="check" className="mt-0.5 h-4 w-4 shrink-0 text-brand" /> {point}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>
            </Reveal>
          </li>
        );
      })}
    </ul>
  );
}
