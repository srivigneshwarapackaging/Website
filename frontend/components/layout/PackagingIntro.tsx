"use client";

import { useEffect, useRef, useState } from "react";
import { IntroMonogram } from "./IntroMonogram";

const PRIMARY = ["CORRUGATED", "PACKAGING", "BENGALURU", "FMCG", "AUTOMOTIVE"];
const SECONDARY = ["BUILT TO LAST", "DESIGNED TO PROTECT", "3 PLY", "5 PLY", "7 PLY", "DIE-CUT"];

/** Brand introduction adapted from the company's deployed rolling-text intro. */
export function PackagingIntro({ name, tagline }: { name: string; tagline: string }) {
  const [visible, setVisible] = useState(false);
  const skip = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    if (window.location.hash || window.matchMedia("(prefers-reduced-motion: reduce), (pointer: coarse)").matches) return;
    try { if (sessionStorage.getItem("svp-intro-seen")) return; } catch { /* Storage can be disabled. */ }
    const previousFocus = document.activeElement;
    const overflow = document.body.style.overflow;
    const main = document.getElementById("main-content");
    const wasInert = main?.inert ?? false;
    if (main) main.inert = true;
    document.body.style.overflow = "hidden";
    const showTimer = window.setTimeout(() => setVisible(true), 0);
    const focusTimer = window.setTimeout(() => skip.current?.focus({ preventScroll: true }), 100);
    let active = true;
    const finish = () => {
      if (!active) return;
      active = false;
      try { sessionStorage.setItem("svp-intro-seen", "1"); } catch { /* Optional session storage. */ }
      setVisible(false);
      document.body.style.overflow = overflow;
      if (main) main.inert = wasInert;
      if (previousFocus instanceof HTMLElement) previousFocus.focus({ preventScroll: true });
    };
    const timer = window.setTimeout(finish, 1200);
    const keydown = (event: KeyboardEvent) => {
      if (!active) return;
      if (event.key === "Escape") finish();
      if (event.key === "Tab") { event.preventDefault(); skip.current?.focus(); }
    };
    // The button mounts on the next render; a document event keeps cleanup
    // and all completion paths owned by this single effect.
    document.addEventListener("svp-skip-intro", finish);
    window.addEventListener("keydown", keydown);
    return () => {
      clearTimeout(timer);
      clearTimeout(showTimer);
      clearTimeout(focusTimer);
      document.body.style.overflow = overflow;
      if (main) main.inert = wasInert;
      document.removeEventListener("svp-skip-intro", finish);
      window.removeEventListener("keydown", keydown);
    };
  }, []);

  if (!visible) return null;
  return <div role="dialog" aria-modal="true" aria-label="Welcome to Sri Vigneshwara Packaging" className="svp-intro fixed inset-0 z-[300] overflow-hidden bg-[#191817] text-[#f5f1e8]">
    <div aria-hidden className="absolute inset-0 opacity-[0.06]" style={{ backgroundImage: "repeating-linear-gradient(90deg,transparent,transparent 11px,#c4a574 11px,#c4a574 12px)" }} />
    <div aria-hidden className="svp-intro-words pointer-events-none absolute inset-0 flex flex-col justify-center gap-8">
      {[PRIMARY, SECONDARY].map((phrases, row) => <div key={row} className="overflow-hidden"><div className={`svp-intro-row ${row ? "svp-intro-reverse" : ""}`}>
        {[0, 1].map(copy => <div key={copy} className="flex shrink-0 items-center">{phrases.map(phrase => <span key={phrase} className="px-6 text-[clamp(2.5rem,9vw,8rem)] font-bold leading-none tracking-[-0.05em] whitespace-nowrap" style={row ? { color: "transparent", WebkitTextStroke: "1px #c4a574" } : { color: "#c4a574" }}>{phrase} ·</span>)}</div>)}
      </div></div>)}
    </div>
    <div className="svp-intro-brand absolute inset-0 flex flex-col items-center justify-center px-6 text-center">
      <div className="mb-7 text-[#c4a574]"><IntroMonogram /></div>
      <p className="mb-5 max-w-xl text-[10px] uppercase tracking-[0.35em] text-[#c4a574]">{tagline}</p>
      <p className="max-w-5xl font-body text-[clamp(2.4rem,6vw,6rem)] leading-[1.04] tracking-[-0.05em]">{name}</p>
      <span className="mt-8 h-px w-40 bg-gradient-to-r from-transparent via-[#c4a574] to-transparent" />
    </div>
    <button ref={skip} onClick={() => document.dispatchEvent(new Event("svp-skip-intro"))} className="absolute right-6 bottom-6 min-h-11 px-4 text-xs uppercase tracking-[0.2em] text-[#e8d5b7] focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#c4a574]">Skip intro →</button>
    <style>{`
      .svp-intro { animation: svp-intro-exit .3s .9s both; }
      .svp-intro-row { display:flex; width:max-content; animation:svp-intro-roll 28s linear infinite; }
      .svp-intro-reverse { animation-direction:reverse; }
      .svp-intro-words { animation:svp-intro-dim .3s .1s both; }
      .svp-intro-brand { animation:svp-intro-brand .3s .15s both; }
      @keyframes svp-intro-roll { to { transform:translateX(-50%); } }
      @keyframes svp-intro-dim { from { opacity:.45; } to { opacity:.05; filter:blur(6px); } }
      @keyframes svp-intro-brand { from { opacity:0; transform:translateY(20px); } to { opacity:1; transform:translateY(0); } }
      @keyframes svp-intro-exit { from { opacity:1; } to { opacity:0; visibility:hidden; } }
      @media(prefers-reduced-motion:reduce) { .svp-intro { display:none; } }
    `}</style>
  </div>;
}
