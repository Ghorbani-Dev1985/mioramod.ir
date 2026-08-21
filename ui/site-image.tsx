import Image from "next/image";
import type { ImageProps } from "next/image";

type SiteImageProps = Omit<ImageProps, "unoptimized">;

export function SiteImage(props: SiteImageProps) {
  const isDataUrl = typeof props.src === "string" && props.src.startsWith("data:");
  return <Image {...props} unoptimized={isDataUrl || undefined} />;
}
