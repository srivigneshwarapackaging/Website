"use client";

import { MapPin, ExternalLink } from "lucide-react";
import { cn } from "@/lib/utils";
import { ParallaxLayer } from "@/components/motion/ParallaxLayer";

function mapsLinkUrl(address: string) {
  return `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(address)}`;
}

export function ContactMap({
  address,
  label = "Bengaluru, India",
  mapUrl,
  coordinates,
  className,
}: {
  address: string;
  label?: string;
  mapUrl?: string;
  coordinates?: string;
  className?: string;
}) {
  const href = mapUrl || mapsLinkUrl(address);
  return (
    <ParallaxLayer speed={0.12} className={cn("relative", className)}>
      <div className="relative h-52 overflow-hidden bg-[#0b0a09] md:h-56">
        <div
          className="absolute inset-0 opacity-[0.5]"
          style={{
            backgroundImage:
              "linear-gradient(rgba(196,165,116,0.08) 1px, transparent 1px), linear-gradient(90deg, rgba(196,165,116,0.08) 1px, transparent 1px)",
            backgroundSize: "32px 32px",
          }}
        />
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0"
          style={{
            background:
              "radial-gradient(ellipse 70% 80% at 50% 45%, rgba(196,165,116,0.1) 0%, transparent 65%)",
          }}
        />
        <svg className="absolute inset-0 h-full w-full" preserveAspectRatio="none" aria-hidden>
          <g stroke="rgba(196,165,116,0.22)" fill="none" strokeWidth="1.5">
            <path d="M0,70 L260,120 L520,40 L760,150" />
            <path d="M120,0 L180,140 L140,260" />
            <path d="M0,200 L300,180 L600,230 L820,170" />
          </g>
          <g stroke="rgba(196,165,116,0.55)" fill="none" strokeWidth="2" strokeDasharray="4 6">
            <path d="M180,140 L300,180 L460,120 L600,230">
              <animate
                attributeName="stroke-dashoffset"
                from="100"
                to="0"
                dur="4s"
                repeatCount="indefinite"
              />
            </path>
          </g>
        </svg>

        <div className="absolute left-1/2 top-[42%] -translate-x-1/2 -translate-y-1/2">
          <span className="absolute inset-0 -m-5 animate-ping rounded-full bg-kraft/25" />
          <span className="relative flex h-11 w-11 items-center justify-center rounded-full bg-gradient-to-br from-kraft to-kraft-dark text-charcoal shadow-[0_0_40px_rgba(196,165,116,0.55)] ring-2 ring-kraft/30">
            <MapPin size={18} />
          </span>
        </div>

        <div className="absolute bottom-0 left-0 right-0 flex items-end justify-between gap-4 bg-gradient-to-t from-[#0b0a09] via-[#0b0a09]/90 to-transparent p-5 md:p-6">
          <div>
            <p className="text-[9px] font-black uppercase tracking-[0.3em] text-kraft-light">
              {label}
            </p>
            <p className="mt-1 max-w-md text-sm text-stone-400">{address}</p>
            {coordinates && (
              <p className="mt-1 text-[10px] font-mono text-stone-600">{coordinates}</p>
            )}
          </div>
          <a
            href={href}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex shrink-0 items-center gap-1.5 rounded-full border border-kraft/30 bg-kraft/10 px-4 py-2 text-[10px] font-black uppercase tracking-wider text-kraft hover:bg-kraft/20"
            data-cursor="link"
          >
            Google Maps
            <ExternalLink size={11} />
          </a>
        </div>
      </div>
    </ParallaxLayer>
  );
}
