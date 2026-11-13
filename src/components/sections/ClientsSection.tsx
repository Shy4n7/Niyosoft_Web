import Link from "next/link";
import { clients } from "@/lib/site";
import { Reveal } from "../Reveal";
import { SectionHeading } from "./SectionHeading";

function initials(name: string) {
  return name
    .split(" ")
    .slice(0, 2)
    .map((word) => word[0])
    .join("");
}

export function ClientsSection() {
  return (
    <section id="clients" className="scroll-mt-20 bg-paper px-4 py-20 sm:px-6">
      <div className="mx-auto max-w-6xl">
        <SectionHeading eyebrow="Our clients" title="Businesses that" accent="trust us" intro="Local businesses that rely on Niyosoft for their software and IT needs." />
        <ul className="mt-12 grid gap-5 sm:grid-cols-3">
          {clients.map((client, index) => (
            <li key={client.name}>
              <Reveal delay={index * 120} className="flex h-full items-center gap-4 rounded-2xl border border-navy/10 bg-white p-6">
                <span className="bg-brand-gradient inline-flex h-14 w-14 shrink-0 items-center justify-center rounded-xl font-brand text-lg font-extrabold text-white" aria-hidden="true">
                  {initials(client.name)}
                </span>
                <span className="min-w-0">
                  <span className="block font-display text-lg font-bold leading-snug text-navy">{client.name}</span>
                  {client.href && (
                    <Link href={client.href} className="mt-1 inline-block text-sm font-semibold text-brand hover:underline">
                      See the project
                    </Link>
                  )}
                </span>
              </Reveal>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
