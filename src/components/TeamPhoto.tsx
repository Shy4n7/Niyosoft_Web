import Image from "next/image";

/**
 * A team portrait with no frame: the person stands on the page and the bottom of
 * the photo fades into the background. The fade lives in globals.css under .team-photo__img.
 */
export function TeamPhoto({ src, alt, sizes, className = "" }: { src: string; alt: string; sizes: string; className?: string }) {
  return (
    <figure className={`relative ${className}`}>
      <Image src={src} alt={alt} width={640} height={640} sizes={sizes} className="team-photo__img relative aspect-square h-auto w-full object-cover" />
    </figure>
  );
}
