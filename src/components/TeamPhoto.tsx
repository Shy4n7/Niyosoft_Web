import Image from "next/image";

/**
 * A team portrait with no frame: the person stands on the page, the photo's
 * edges melt into the background, and a layered brand glow sits behind them.
 * The look lives in globals.css under .team-photo.
 */
export function TeamPhoto({ src, alt, sizes, className = "" }: { src: string; alt: string; sizes: string; className?: string }) {
  return (
    <figure className={`team-photo relative ${className}`}>
      <span className="team-photo__glow" aria-hidden="true" />
      <Image src={src} alt={alt} width={640} height={640} sizes={sizes} className="team-photo__img relative aspect-square h-auto w-full object-cover" />
    </figure>
  );
}
