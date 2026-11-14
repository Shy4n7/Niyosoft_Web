import { SectionHeading } from "./SectionHeading";
import { ServicesGrid } from "./ServicesGrid";

export function ServicesSection() {
  return (
    <section id="services" className="scroll-mt-20 px-4 py-20 sm:px-6">
      <div className="mx-auto max-w-6xl">
        <SectionHeading
          eyebrow="Services"
          title="Technology that solves"
          accent="real problems"
          intro="Every project starts with one question: what is getting in the way of your business? Then we build the right tool to remove it."
        />
        <ServicesGrid />
      </div>
    </section>
  );
}
