import Image from "next/image";
import Link from "next/link";

type LogoSize = "sm" | "lg";

const sizes: Record<LogoSize, { mark: string; name: string; sub: string; gap: string }> = {
  sm: { mark: "h-7", name: "text-[1.05rem]", sub: "text-[0.42rem] tracking-[0.36em] mt-[3px]", gap: "mt-1" },
  lg: { mark: "h-14", name: "text-[1.7rem]", sub: "text-[0.66rem] tracking-[0.38em] mt-1.5", gap: "mt-2" },
};

/** Stacked brand lockup: N mark on top, NIYOSOFT and TECHNOLOGIES centered beneath it. */
export function Logo({ light = false, size = "sm" }: { light?: boolean; size?: LogoSize }) {
  const s = sizes[size];
  return (
    <Link href="/" className="inline-flex flex-col items-center leading-none" aria-label="Niyosoft Technologies home">
      <Image src="/images/logo-mark-sm.png" alt="" width={81} height={84} priority className={`${s.mark} w-auto`} />
      <span className={`${s.gap} flex flex-col items-center`}>
        <span className={`font-brand font-extrabold tracking-tight ${s.name} ${light ? "text-white" : "text-navy"}`}>NIYOSOFT</span>
        <span className={`font-brand font-semibold ${s.sub} pl-[0.36em] ${light ? "text-white/70" : "text-navy/80"}`}>TECHNOLOGIES</span>
      </span>
    </Link>
  );
}
