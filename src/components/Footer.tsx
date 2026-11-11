import Link from "next/link";
import { fullAddress, navLinks, site } from "@/lib/site";
import { CurrentYear } from "./CurrentYear";
import { EmailText } from "./EmailText";
import { Logo } from "./Logo";

export function Footer() {
  return (
    <footer className="border-t border-navy/10 bg-white">
      <div className="mx-auto grid max-w-6xl gap-10 px-4 py-14 sm:px-6 md:grid-cols-[1.4fr_1fr_1.4fr]">
        <div>
          <Logo />
          <p className="mt-4 max-w-xs text-sm leading-relaxed text-slate">{site.tagline}.</p>
          <p className="mt-4 inline-flex rounded-full border border-navy/15 px-3 py-1 text-xs font-medium text-navy">
            MSME Registered &middot; {site.udyam}
          </p>
        </div>
        <div>
          <h2 className="font-display text-sm font-bold uppercase tracking-wider text-navy">Company</h2>
          <ul className="mt-2 text-sm text-slate">
            {navLinks.map((link) => (
              <li key={link.href}>
                <Link href={link.href} className="inline-block py-2 hover:text-brand">{link.label}</Link>
              </li>
            ))}
          </ul>
        </div>
        <div>
          <h2 className="font-display text-sm font-bold uppercase tracking-wider text-navy">Reach us</h2>
          <ul className="mt-2 text-sm text-slate">
            <li><a href={site.phoneHref} className="inline-block py-2 hover:text-brand">{site.phone}</a></li>
            <li><a href={`mailto:${site.email}`} className="inline-block py-2 hover:text-brand"><EmailText email={site.email} /></a></li>
            <li className="mt-2 leading-relaxed">{fullAddress}</li>
          </ul>
        </div>
      </div>
      <div className="border-t border-navy/10">
        <div className="mx-auto flex max-w-6xl flex-col gap-3 px-4 py-6 text-xs text-slate sm:flex-row sm:items-center sm:justify-between sm:px-6">
          <p>&copy; <CurrentYear /> {site.name}. All rights reserved.</p>
          <div className="-my-2 flex gap-5">
            <Link href="/privacy/" className="inline-block py-2 hover:text-brand">Privacy Policy</Link>
            <Link href="/terms/" className="inline-block py-2 hover:text-brand">Terms of Service</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
