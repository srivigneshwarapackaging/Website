"use client";

import { useEffect, useRef } from "react";

const COLORS = ["#c4a574", "#e8d5b7", "#9a7b4f", "#f5e6c8", "#b45309"];

/**
 * One-shot kraft-gold confetti burst on a transparent canvas. Self-contained,
 * dependency-free, and skipped under reduced-motion.
 */
export function Confetti() {
  const ref = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const canvas = ref.current;
    const ctx = canvas?.getContext("2d");
    if (!canvas || !ctx) return;

    const dpr = window.devicePixelRatio || 1;
    const w = canvas.clientWidth || 320;
    const h = canvas.clientHeight || 240;
    canvas.width = w * dpr;
    canvas.height = h * dpr;
    ctx.scale(dpr, dpr);

    const parts = Array.from({ length: 48 }).map(() => ({
      x: w / 2,
      y: h * 0.4,
      vx: (Math.random() - 0.5) * 9,
      vy: (Math.random() - 1) * 10,
      r: Math.random() * 5 + 2,
      c: COLORS[Math.floor(Math.random() * COLORS.length)],
      life: 1,
      rot: Math.random() * Math.PI,
      spin: (Math.random() - 0.5) * 0.3,
    }));

    let raf = 0;
    const g = 0.28;

    const tick = () => {
      ctx.clearRect(0, 0, w, h);
      let alive = false;
      for (const p of parts) {
        p.vy += g;
        p.x += p.vx;
        p.y += p.vy;
        p.rot += p.spin;
        p.life -= 0.0085;
        if (p.life > 0 && p.y < h + 24) alive = true;
        ctx.globalAlpha = Math.max(0, p.life);
        ctx.fillStyle = p.c;
        ctx.save();
        ctx.translate(p.x, p.y);
        ctx.rotate(p.rot);
        ctx.fillRect(-p.r / 2, -p.r / 2, p.r, p.r * 1.6);
        ctx.restore();
      }
      if (alive) raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, []);

  return (
    <canvas
      ref={ref}
      className="pointer-events-none absolute inset-0 h-full w-full"
      aria-hidden
    />
  );
}
