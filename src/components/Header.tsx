"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useEffect, useRef, useState, type MouseEvent } from "react";
import { navLinks, type NavLink } from "@/lib/site";
import { useActiveSection } from "@/lib/useActiveSection";
import { Logo } from "./Logo";

const contactLink: NavLink = { href: "/#contact", label: "Get Started", section: "contact" };
const sectionIds = navLinks.flatMap((link) => (link.section ? [link.section] : []));

export function Header() {
  const pathname = usePathname();
  const router = useRouter();
  const [open, setOpen] = useState(false);
  const menuButtonRef = useRef<HTMLButtonElement>(null);
  const isInitialLoad = useRef(true);
  const onHome = pathname === "/";
  const activeSection = useActiveSection(sectionIds, onHome);
  const isActive = (href: string) => {
    if (onHome) return navLinks.some((link) => link.href === href && link.section === activeSection);
    return pathname === href || pathname === href.slice(0, -1);
  };

  useEffect(() => {
    const initialLoad = isInitialLoad.current;
    isInitialLoad.current = false;
    if (!onHome || !window.location.hash) return;
    const target = document.getElementById(window.location.hash.slice(1));
    if (!target) return;
    if (initialLoad) {
      let frame = 0;
      document.fonts.ready.then(() => {
        frame = requestAnimationFrame(() => target.scrollIntoView({ behavior: "instant", block: "start" }));
      });
      return () => cancelAnimationFrame(frame);
    }
    window.scrollTo({ top: 0, behavior: "instant" });
    const frame = requestAnimationFrame(() => target.scrollIntoView({ behavior: "smooth", block: "start" }));
    return () => cancelAnimationFrame(frame);
  }, [onHome]);

  useEffect(() => {
    if (!open) return;
    const closeOnEscape = (event: KeyboardEvent) => {
      if (event.key !== "Escape") return;
      setOpen(false);
      menuButtonRef.current?.focus();
    };
    document.addEventListener("keydown", closeOnEscape);
    return () => document.removeEventListener("keydown", closeOnEscape);
  }, [open]);

  const scrollToSection = (event: MouseEvent<HTMLAnchorElement>, link: NavLink) => {
    setOpen(false);
    if (!link.section) return;
    event.preventDefault();
    if (!onHome) {
      router.push(link.href, { scroll: false });
      return;
    }
    const target = document.getElementById(link.section);
    if (!target) return;
    requestAnimationFrame(() => target.scrollIntoView({ behavior: "smooth", block: "start" }));
    history.replaceState(null, "", `#${link.section}`);
  };

  return (
    <header className="sticky top-0 z-50 border-b border-navy/10 bg-paper/90 backdrop-blur">
      <div className="mx-auto flex h-20 max-w-6xl items-center justify-between px-4 sm:px-6">
        <Logo />
        <nav className="hidden items-center gap-8 md:flex" aria-label="Main">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              onClick={(event) => scrollToSection(event, link)}
              className={`border-b-2 py-1 text-sm font-medium transition-colors ${isActive(link.href) ? "border-brand text-navy" : "border-transparent text-slate hover:text-navy"}`}
            >
              {link.label}
            </Link>
          ))}
          <Link
            href={contactLink.href}
            onClick={(event) => scrollToSection(event, contactLink)}
            className="bg-brand-gradient rounded-full px-5 py-2.5 text-sm font-semibold text-white shadow-md shadow-brand/20 transition hover:opacity-90"
          >
            {contactLink.label}
          </Link>
        </nav>
        <button
          ref={menuButtonRef}
          type="button"
          className="rounded-md p-2 text-navy md:hidden"
          aria-label={open ? "Close menu" : "Open menu"}
          aria-expanded={open}
          aria-controls="mobile-nav"
          onClick={() => setOpen((value) => !value)}
        >
          <svg viewBox="0 0 24 24" className="h-6 w-6" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" aria-hidden="true">
            <path d={open ? "M6 6l12 12M18 6 6 18" : "M4 7h16M4 12h16M4 17h16"} />
          </svg>
        </button>
      </div>
      {open && (
        <nav id="mobile-nav" className="border-t border-navy/10 bg-paper px-4 pb-5 md:hidden" aria-label="Mobile">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              onClick={(event) => scrollToSection(event, link)}
              className={`block border-b border-navy/5 py-3.5 text-base font-medium ${isActive(link.href) ? "text-brand" : "text-navy"}`}
            >
              {link.label}
            </Link>
          ))}
          <Link
            href={contactLink.href}
            onClick={(event) => scrollToSection(event, contactLink)}
            className="bg-brand-gradient mt-4 block rounded-full py-3 text-center font-semibold text-white"
          >
            {contactLink.label}
          </Link>
        </nav>
      )}
    </header>
  );
}
