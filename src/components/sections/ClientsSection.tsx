import Image from "next/image";
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
        <SectionHeading eyebrow="Our clients" title="Businesses that" accent="trust us" intro="Businesses that rely on Niyosoft for their software and IT needs." />
        <ul className="mt-12 grid gap-5 sm:grid-cols-3">
          {clients.map((client, index) => (
            <li key={client.name}>
              <Reveal delay={index * 120} className="flex h-full flex-col items-center rounded-2xl border border-navy/10 bg-white p-6 text-center">
                <div className="flex h-28 w-full items-center justify-center">
                  {client.logo ? (
                    <Image
                      src={client.logo.src}
                      alt={`${client.name} logo`}
                      width={client.logo.width}
                      height={client.logo.height}
                      className="max-h-28 w-auto max-w-[70%] object-contain"
                    />
                  ) : (
                    <span className="bg-brand-gradient inline-flex h-20 w-20 items-center justify-center rounded-2xl font-brand text-2xl font-extrabold text-white" aria-hidden="true">
                      {initials(client.name)}
                    </span>
                  )}
                </div>
                <span className="mt-5 block font-display text-lg font-bold leading-snug text-navy">{client.name}</span>
                {client.href && (
                  <Link href={client.href} className="mt-1 inline-block text-sm font-semibold text-brand hover:underline">
                    See the project
                  </Link>
                )}
              </Reveal>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
