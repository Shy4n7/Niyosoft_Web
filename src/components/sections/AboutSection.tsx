import Image from "next/image";
import { site } from "@/lib/site";
import { ExperienceList } from "../ExperienceList";
import { Reveal } from "../Reveal";
import { SectionHeading } from "./SectionHeading";
import { TeamSlider } from "./TeamSlider";

const team = [
  {
    name: site.founder,
    role: "Founder & Proprietor",
    photo: "/images/ashok-thomas.webp",
    bio: `${site.founder} founded ${site.name} on 14 January ${site.foundedYear} in Pollachi with a simple aim: help businesses solve everyday problems with software. He sets the direction of the company, works closely with clients to understand what they really need, and makes sure every project is delivered with care, honesty and long-term support.`,
  },
  {
    name: site.hr.name,
    role: site.hr.role,
    photo: site.hr.photo,
    bio: `${site.hr.name} leads people and culture at ${site.name}. He brings years of HR experience from IT companies, covering technical recruitment, onboarding, payroll coordination, vendor management and employee engagement. He builds strong teams and makes sure every new joiner settles in well. For careers and HR enquiries, email ${site.hr.email}.`,
    experience: site.hr.experience,
  },
];

export function AboutSection() {
  return (
    <section id="about" className="scroll-mt-20 bg-white px-4 py-20 sm:px-6">
      <div className="mx-auto max-w-6xl">
        <SectionHeading
          eyebrow="About us"
          title="Meet the"
          accent="team"
          intro={`Founded in Pollachi in ${site.foundedYear}, ${site.name} builds dependable software for businesses. Meet the people behind it.`}
        />
        <div className="mt-14 grid gap-14 lg:grid-cols-2 lg:gap-10">
          {team.map((person, index) => (
            <Reveal key={person.name} delay={index * 150} className="flex flex-col items-center text-center sm:items-start sm:text-left">
              <figure className="relative w-full max-w-72">
                <div className="bg-brand-gradient absolute -bottom-3 -right-3 h-full w-full rounded-3xl" aria-hidden="true" />
                <Image
                  src={person.photo}
                  alt={`${person.name}, ${person.role} at ${site.name}`}
                  width={640}
                  height={640}
                  sizes="288px"
                  className="relative aspect-square h-auto w-full rounded-3xl border border-navy/10 bg-white object-cover"
                />
              </figure>
              <p className="mt-9 text-sm font-semibold uppercase tracking-[0.14em] text-brand">{person.role}</p>
              <h3 className="mt-2 font-display text-2xl font-bold tracking-[-0.015em] text-navy sm:text-3xl">{person.name}</h3>
              <p className="mt-4 max-w-xl leading-relaxed text-slate">{person.bio}</p>
              {person.experience && <ExperienceList title="Experience in IT" jobs={person.experience} className="mt-6" />}
            </Reveal>
          ))}
        </div>
        <div className="mt-20">
          <Reveal className="text-center">
            <h3 className="font-display text-2xl font-bold tracking-[-0.015em] text-navy sm:text-3xl">The people who build it</h3>
            <p className="mt-2 text-slate">Our developers design, build and support every product we deliver.</p>
          </Reveal>
          <Reveal className="mt-8">
            <TeamSlider />
          </Reveal>
        </div>
        <Reveal className="mt-16 grid gap-4 sm:grid-cols-2">
          <div className="rounded-2xl bg-paper p-6">
            <h4 className="font-display font-bold text-navy">Our mission</h4>
            <p className="mt-2 text-sm leading-relaxed text-slate">To solve real problems for businesses through dependable, easy-to-use software.</p>
          </div>
          <div className="rounded-2xl bg-paper p-6">
            <h4 className="font-display font-bold text-navy">Our vision</h4>
            <p className="mt-2 text-sm leading-relaxed text-slate">To be the technology partner businesses trust to transform how they work.</p>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
