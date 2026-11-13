import { ContactBand } from "@/components/ContactBand";
import { Icon } from "@/components/Icon";
import { PageHeader } from "@/components/PageHeader";
import { pageMetadata } from "@/lib/seo";

export const metadata = pageMetadata(
  "Projects",
  "Case study: the Ganesh Department Stores mobile app by Niyosoft Technologies, with online ordering, in-app payment and home delivery.",
  "/projects/",
);

const features = [
  { title: "Browse products", text: "Customers see the store's products by category, right on their phone." },
  { title: "Cart and checkout", text: "Add items, review the order and check out in a few taps." },
  { title: "Pay in the app", text: "Online payment is built into the checkout, so orders arrive already paid." },
  { title: "Home delivery", text: "Orders are delivered to the customer's door." },
];

export default function ProjectsPage() {
  return (
    <>
      <PageHeader eyebrow="Projects" title="Our work" intro="We measure our work by the problems it removes for the businesses we build for." />
      <article className="mx-auto max-w-6xl px-4 py-16 sm:px-6">
        <div className="rounded-3xl border border-navy/10 bg-white p-6 sm:p-10">
          <p className="text-sm font-semibold uppercase tracking-[0.14em] text-brand">Mobile app &middot; Retail</p>
          <h2 className="mt-3 font-display text-3xl font-bold tracking-[-0.015em] text-navy sm:text-4xl">Ganesh Department Stores</h2>
          <div className="mt-6 grid gap-8 text-slate md:grid-cols-2">
            <div>
              <h3 className="font-display font-bold text-navy">The problem</h3>
              <p className="mt-1 leading-relaxed">Customers had to come to the store in person to shop, which cost them time and limited how often they could buy.</p>
            </div>
            <div>
              <h3 className="font-display font-bold text-navy">What we built</h3>
              <p className="mt-1 leading-relaxed">A mobile app where customers order from the store, pay inside the app and get their order delivered home.</p>
            </div>
          </div>
        </div>
        <div className="mt-6 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {features.map((feature) => (
            <div key={feature.title} className="rounded-2xl border border-navy/10 bg-white p-6">
              <Icon name="check" className="h-6 w-6 text-brand" />
              <h3 className="mt-3 font-display font-bold text-navy">{feature.title}</h3>
              <p className="mt-2 text-sm leading-relaxed text-slate">{feature.text}</p>
            </div>
          ))}
        </div>
      </article>
      <ContactBand />
    </>
  );
}
