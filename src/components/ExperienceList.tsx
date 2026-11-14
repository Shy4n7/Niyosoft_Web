export type Job = { role: string; company: string; period: string; summary: string };

/** A short timeline of past roles, shown under a team member's bio. */
export function ExperienceList({
  title,
  jobs,
  headingLevel = "h4",
  className = "",
}: {
  title: string;
  jobs: readonly Job[];
  /** One level below the person's name, so the page outline stays correct. */
  headingLevel?: "h4" | "h5";
  className?: string;
}) {
  const Heading = headingLevel;
  return (
    <div className={`w-full max-w-xl text-left ${className}`}>
      <Heading className="text-center text-sm font-semibold uppercase tracking-[0.14em] text-navy sm:text-left">{title}</Heading>
      <ol className="mt-3 space-y-4 border-l-2 border-brand/20 pl-5">
        {jobs.map((job) => (
          <li key={`${job.company}-${job.period}`} className="relative">
            <span className="bg-brand-gradient absolute -left-[1.6rem] top-1.5 h-3 w-3 rounded-full" aria-hidden="true" />
            <p className="font-display font-bold text-navy">
              {job.role} &middot; <span className="text-brand">{job.company}</span>
            </p>
            <p className="text-xs font-medium uppercase tracking-wider text-slate/80">{job.period}</p>
            <p className="mt-1 text-sm leading-relaxed text-slate">{job.summary}</p>
          </li>
        ))}
      </ol>
    </div>
  );
}
