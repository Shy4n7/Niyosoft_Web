import { SectionHeading } from "./SectionHeading";

const steps = [
  { title: "Understand", text: "We start with the problem, not the technology." },
  { title: "Build", text: "We design and develop the app, site or system." },
  { title: "Launch", text: "We set it up, publish it and train your team." },
  { title: "Support", text: "We stay with you for updates and fixes." },
];

export function ProcessSection() {
  return (
    <section className="px-4 py-20 sm:px-6">
      <div className="mx-auto max-w-6xl">
        <SectionHeading eyebrow="How we work" title="From problem to" accent="working product" />
        <ol className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {steps.map((step, index) => (
            <li key={step.title}>
              <div className="h-full rounded-2xl border border-navy/10 bg-white p-6">
                <span className="text-gradient font-display text-4xl font-bold tracking-[-0.015em]">0{index + 1}</span>
                <h3 className="mt-3 font-display text-lg font-bold text-navy">{step.title}</h3>
                <p className="mt-2 text-slate">{step.text}</p>
              </div>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}
