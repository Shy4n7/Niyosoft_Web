import { fullAddress, site } from "@/lib/site";
import { CopyButton } from "../CopyButton";
import { Icon } from "../Icon";
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
        <div className="mt-12 grid gap-5 md:grid-cols-3">
          {channels.map((channel) => (
            <div
              key={channel.label}
              className="group relative rounded-2xl border border-navy/10 bg-paper p-6 transition hover:border-brand hover:shadow-xl hover:shadow-navy/5"
            >
              <a href={channel.href} {...(channel.external ? { target: "_blank", rel: "noopener noreferrer" } : {})} className="block">
                <div className="bg-brand-gradient inline-flex h-12 w-12 items-center justify-center rounded-xl text-white">
                  <Icon name={channel.icon} />
                </div>
                <p className="mt-4 text-sm font-medium text-slate">{channel.label}</p>
                <p className="mt-1 break-all font-display text-lg font-bold text-navy group-hover:text-brand">{channel.value}</p>
              </a>
              {channel.copy && (
                <div className="absolute right-5 top-5">
                  <CopyButton value={channel.copy} label={channel.label === "Email" ? "email address" : "phone number"} />
                </div>
              )}
            </div>
          ))}
        </div>
        <div className="mt-6 grid overflow-hidden rounded-2xl border border-navy/10 bg-paper lg:grid-cols-[1fr_1.6fr]">
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
        </div>
      </div>
    </section>
  );
}
