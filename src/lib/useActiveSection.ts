"use client";

import { useEffect, useState } from "react";

export function useActiveSection(sectionIds: readonly string[], enabled: boolean): string | null {
  const [active, setActive] = useState<string | null>(null);

  useEffect(() => {
    if (!enabled) {
      setActive(null);
      return;
    }
    const sections = sectionIds
      .map((id) => document.getElementById(id))
      .filter((element): element is HTMLElement => element !== null);

    const update = () => {
      const atBottom = window.innerHeight + window.scrollY >= document.documentElement.scrollHeight - 2;
      const marker = window.innerHeight * 0.35;
      const current = atBottom ? sections.at(-1) : sections.filter((section) => section.getBoundingClientRect().top <= marker).pop();
      setActive(current?.id ?? null);
    };

    update();
    window.addEventListener("scroll", update, { passive: true });
    window.addEventListener("resize", update);
    return () => {
      window.removeEventListener("scroll", update);
      window.removeEventListener("resize", update);
    };
  }, [sectionIds, enabled]);

  return active;
}
