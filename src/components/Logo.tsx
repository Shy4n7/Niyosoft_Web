import Image from "next/image";
import Link from "next/link";

export function Logo({ light = false }: { light?: boolean }) {
  return (
    <Link href="/" className="flex items-center gap-2.5" aria-label="Niyosoft Technologies home">
      <Image src="/images/logo-mark-sm.png" alt="" width={81} height={84} priority className="h-10 w-auto" />
      <span className="flex flex-col leading-none">
        <span className={`font-display text-xl font-extrabold tracking-tight ${light ? "text-white" : "text-navy"}`}>NIYOSOFT</span>
        <span className={`mt-1 font-display text-[0.6rem] font-semibold tracking-[0.32em] ${light ? "text-white/70" : "text-navy/80"}`}>TECHNOLOGIES</span>
      </span>
    </Link>
  );
}
