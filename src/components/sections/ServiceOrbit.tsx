import Image from "next/image";
import type { CSSProperties } from "react";
import { services } from "@/lib/services";
import { Icon } from "../Icon";

const ORBIT_RADIUS_PERCENT = 41;
// The orbit has room for four services; these are the most eye-catching ones.
const ORBIT_SLUGS = ["mobile-apps", "websites", "ai-chatbots", "custom-software"];
const orbitServices = ORBIT_SLUGS.map((slug) => services.find((service) => service.slug === slug)).filter((service) => service !== undefined);
const SPIN = "motion-safe:animate-[spin_70s_linear_infinite] group-hover:[animation-play-state:paused]";
const COUNTER_SPIN = "motion-safe:animate-[spin_70s_linear_infinite_reverse] group-hover:[animation-play-state:paused]";

function orbitPosition(index: number): CSSProperties {
  const angle = (index / orbitServices.length) * 2 * Math.PI - Math.PI / 2;
  return {
    left: `${(50 + ORBIT_RADIUS_PERCENT * Math.cos(angle)).toFixed(2)}%`,
    top: `${(50 + ORBIT_RADIUS_PERCENT * Math.sin(angle)).toFixed(2)}%`,
  };
}

export function ServiceOrbit() {
  return (
    <div className="group relative mx-auto aspect-square w-full max-w-[26rem]" aria-hidden="true">
      <div className="absolute inset-[9%] rounded-full border-2 border-dashed border-brand/20" />
      <div className="absolute inset-[27%] rounded-full border border-navy/10" />
      <div className="absolute inset-[34%] flex items-center justify-center">
        <div className="absolute inset-0 rounded-full bg-sky/40 blur-2xl" />
        <Image src="/images/n-mark.webp" alt="" width={280} height={291} className="relative h-auto w-[60%] drop-shadow-xl" />
      </div>
      <div className={`absolute inset-0 ${SPIN}`}>
        {orbitServices.map((service, index) => (
          <div key={service.slug} className="absolute -translate-x-1/2 -translate-y-1/2" style={orbitPosition(index)}>
            <div className={`flex flex-col items-center gap-1.5 ${COUNTER_SPIN}`}>
              <span className="bg-brand-gradient flex h-14 w-14 items-center justify-center rounded-2xl text-white shadow-lg shadow-brand/25">
                <Icon name={service.icon} className="h-7 w-7" />
              </span>
              <span className="whitespace-nowrap rounded-full bg-white/90 px-2.5 py-0.5 text-xs font-semibold text-navy shadow-sm">
                {service.shortTitle}
              </span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
