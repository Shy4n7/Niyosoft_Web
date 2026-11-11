import { site } from "@/lib/site";
import { Icon } from "./Icon";

export function ContactBand() {
  return (
    <section className="px-4 py-16 sm:px-6">
      <div className="mx-auto max-w-6xl overflow-hidden rounded-3xl bg-navy px-6 py-12 text-white sm:px-12">
        <div className="flex flex-col gap-8 lg:flex-row lg:items-center lg:justify-between">
          <div>
            <h2 className="font-display text-3xl font-bold tracking-[-0.015em] sm:text-4xl">Have a problem worth solving?</h2>
            <p className="mt-3 max-w-xl text-white/75">Tell us what is slowing your business down. We will tell you how technology can fix it.</p>
          </div>
          <div className="flex flex-col gap-3 sm:flex-row">
            <a href={site.phoneHref} className="bg-brand-gradient inline-flex items-center justify-center gap-2 rounded-full px-6 py-3 font-semibold">
              <Icon name="phone" className="h-5 w-5" /> {site.phone}
            </a>
            <a href={site.whatsappHref} target="_blank" rel="noopener noreferrer" className="inline-flex items-center justify-center gap-2 rounded-full border border-white/30 px-6 py-3 font-semibold hover:bg-white/10">
              <Icon name="chat" className="h-5 w-5" /> WhatsApp
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
