import type { IconName } from "@/lib/services";

type Props = { name: IconName | "check" | "mail" | "pin" | "chat" | "arrow" | "shield"; className?: string };

const paths: Record<Props["name"], string> = {
  phone: "M8 2h8a2 2 0 0 1 2 2v16a2 2 0 0 1-2 2H8a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2Zm3 17h2",
  globe: "M12 21a9 9 0 1 0 0-18 9 9 0 0 0 0 18Zm-9-9h18M12 3c2.5 2.7 3.8 5.7 3.8 9s-1.3 6.3-3.8 9c-2.5-2.7-3.8-5.7-3.8-9S9.5 5.7 12 3Z",
  cart: "M3 4h2l2.4 11h10.2L20 8H6.3M9 20a1 1 0 1 0 0-2 1 1 0 0 0 0 2Zm8 0a1 1 0 1 0 0-2 1 1 0 0 0 0 2Z",
  card: "M3 6h18v12H3zM3 10h18M7 15h3",
  wrench: "M14.7 6.3a4 4 0 0 0-5.4 5.4L3 18l3 3 6.3-6.3a4 4 0 0 0 5.4-5.4l-2.5 2.5-2.5-.5-.5-2.5 2.5-2.5Z",
  grid: "M4 4h7v7H4zM13 4h7v7h-7zM4 13h7v7H4zM13 13h7v7h-7z",
  bot: "M12 3v3M7 6h10a3 3 0 0 1 3 3v6a3 3 0 0 1-3 3h-5l-4 3v-3H7a3 3 0 0 1-3-3V9a3 3 0 0 1 3-3Zm2 5.5v1m6-1v1M9.5 14.5c1.5 1 3.5 1 5 0",
  chart: "M4 20h16M7 16v-4m5 4V8m5 8v-6M5 9l5-4 4 3 5-4",
  bolt: "M13 2 4 14h7l-1 8 9-12h-7l1-8Z",
  check: "m5 12 5 5L20 7",
  mail: "M3 6h18v12H3zm0 0 9 7 9-7",
  pin: "M12 21s-7-6.2-7-11a7 7 0 0 1 14 0c0 4.8-7 11-7 11Zm0-8.5a2.5 2.5 0 1 0 0-5 2.5 2.5 0 0 0 0 5Z",
  chat: "M4 5h16v11H8l-4 4V5Z",
  arrow: "M5 12h14m-6-6 6 6-6 6",
  shield: "M12 3 4 6v6c0 4.5 3.4 8.3 8 9 4.6-.7 8-4.5 8-9V6l-8-3Zm-3 9 2 2 4-4",
};

export function Icon({ name, className = "h-6 w-6" }: Props) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.8} strokeLinecap="round" strokeLinejoin="round" className={className} aria-hidden="true">
      <path d={paths[name]} />
    </svg>
  );
}
