import { PageHeader } from "./PageHeader";

export type LegalSection = { heading: string; body: string };

export function LegalPage({ title, updated, sections }: { title: string; updated: string; sections: readonly LegalSection[] }) {
  return (
    <>
      <PageHeader eyebrow="Legal" title={title} intro={`Last updated: ${updated}`} />
      <article className="mx-auto max-w-3xl px-4 py-16 sm:px-6">
        {sections.map((section) => (
          <section key={section.heading} className="mb-8">
            <h2 className="font-display text-xl font-bold text-navy">{section.heading}</h2>
            <p className="mt-2 leading-relaxed text-slate">{section.body}</p>
          </section>
        ))}
      </article>
    </>
  );
}
