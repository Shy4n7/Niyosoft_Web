import Image from "next/image";
import { fullAddress, site } from "@/lib/site";
import { CopyButton } from "../CopyButton";
import { EmailText } from "../EmailText";
import { Icon } from "../Icon";
import { Reveal } from "../Reveal";
import { SectionHeading } from "./SectionHeading";

const mapSrc = `https://www.google.com/maps?q=${encodeURIComponent(fullAddress)}&output=embed`;

const channels = [
  { icon: "phone", label: "Call us", value: site.phone, href: site.phoneHref, external: false, copy: site.phone },
  { icon: "chat", label: "WhatsApp", value: "Chat with us", href: site.whatsappHref, external: true, copy: null },
  { icon: "mail", label: "Email", value: site.email, href: `mailto:${site.email}`, external: false, copy: site.email },
] as const;

export function ContactSection() {
  return (
    <section id="contact" className="scroll-mt-20 bg-white px-4 py-20 sm:px-6">
      <div className="mx-auto max-w-6xl">
        <SectionHeading eyebrow="Contact" title="Let's talk about" accent="your problem" intro="Call, message or email us. We usually reply the same day." />
        <div className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {channels.map((channel, index) => (
            <Reveal
              key={channel.label}
              delay={index * 120}
              className={`group relative rounded-2xl border border-navy/10 bg-paper p-6 transition hover:border-brand hover:shadow-xl hover:shadow-navy/5 ${channel.label === "Email" ? "sm:col-span-2 lg:col-span-1" : ""}`}
            >
              <a href={channel.href} {...(channel.external ? { target: "_blank", rel: "noopener noreferrer" } : {})} className="block">
                <div className="bg-brand-gradient inline-flex h-12 w-12 items-center justify-center rounded-xl text-white">
                  <Icon name={channel.icon} />
                </div>
                <p className="mt-4 text-sm font-medium text-slate">{channel.label}</p>
                <p className="mt-1 font-display text-lg font-bold text-navy group-hover:text-brand">
                  {channel.label === "Email" ? <EmailText email={channel.value} /> : channel.value}
                </p>
              </a>
              {channel.copy && (
                <div className="absolute right-5 top-5">
                  <CopyButton value={channel.copy} label={channel.label === "Email" ? "email address" : "phone number"} />
                </div>
              )}
            </Reveal>
          ))}
        </div>
        <Reveal className="group relative mt-6 flex flex-col gap-5 rounded-2xl border border-navy/10 bg-paper p-6 transition hover:border-brand hover:shadow-xl hover:shadow-navy/5 sm:flex-row sm:items-center">
          <Image
            src={site.hr.photo}
            alt={`${site.hr.name}, ${site.hr.role} at ${site.name}`}
            width={400}
            height={400}
            sizes="96px"
            className="h-24 w-24 shrink-0 rounded-2xl object-cover"
          />
          <div className="min-w-0 flex-1">
            <p className="text-sm font-medium text-slate">{site.hr.role}</p>
            <h3 className="mt-1 font-display text-xl font-bold text-navy">{site.hr.name}</h3>
            <a href={site.hr.phoneHref} className="mt-2 inline-flex items-center gap-2 font-display text-lg font-bold text-navy hover:text-brand">
              <Icon name="phone" className="h-5 w-5 text-brand" />
              {site.hr.phone}
            </a>
          </div>
          <div className="absolute right-5 top-5">
            <CopyButton value={site.hr.phone} label="phone number" />
          </div>
        </Reveal>
        <Reveal className="mt-6 grid overflow-hidden rounded-2xl border border-navy/10 bg-paper lg:grid-cols-[1fr_1.6fr]">
          <div className="p-6 sm:p-8">
            <div className="bg-brand-gradient inline-flex h-12 w-12 items-center justify-center rounded-xl text-white">
              <Icon name="pin" />
            </div>
            <h3 className="mt-4 font-display text-xl font-bold text-navy">Our office</h3>
            <address className="mt-2 not-italic leading-relaxed text-slate">
              {site.name}
              <br />
              {site.address.street}
              <br />
              {site.address.locality}, {site.address.district}
              <br />
              {site.address.region} {site.address.postalCode}
            </address>
          </div>
          <iframe
            title="Niyosoft Technologies location on Google Maps"
            src={mapSrc}
            className="h-80 w-full border-0 lg:h-full lg:min-h-80"
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
          />
        </Reveal>
      </div>
    </section>
  );
}
