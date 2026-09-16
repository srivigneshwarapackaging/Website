import Image, { type ImageProps } from "next/image";
import { imageSource } from "@/lib/image-source";

export function SiteImage({ src, alt, ...props }: ImageProps) {
  const source = typeof src === "string" ? imageSource(src) : src;
  // Arbitrary CMS URLs render without giving the server an unrestricted image proxy.
  const remote = typeof source === "string" && !source.startsWith("/");
  return <Image {...props} src={source} alt={alt} unoptimized={remote || props.unoptimized} />;
}
