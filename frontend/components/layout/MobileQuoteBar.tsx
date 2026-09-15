"use client";

import { useEffect, useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { scrollToSection } from "@/lib/scroll-to";
import { whatsappUrl } from "@/lib/whatsapp";

/**
 * Mobile quote bar — §30
 * Compact, appears once the hero is scrolled past, and hides itself again
 * near the contact section so it never covers the form it points at.
 */
export function MobileQuoteBar({
  phone,
  whatsappMessage,
}: {
  phone: string;
  whatsappMessage: string;
}) {
  const reduced = useReducedMotion();
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const onScroll = () => {
      const pastHero = window.scrollY > window.innerHeight * 0.8;

      // Hide once the contact section is within a screen of the viewport.
      const contact = document.getElementById("contact");
      const nearContact = contact
        ? contact.getBoundingClientRect().top < window.innerHeight
        : false;

      setVisible(pastHero && !nearContact);
    };

    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
    };
  }, []);

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          initial={reduced ? { opacity: 0 } : { y: "100%" }}
          animate={reduced ? { opacity: 1 } : { y: 0 }}
          exit={reduced ? { opacity: 0 } : { y: "100%" }}
          transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
          className="fixed inset-x-0 bottom-0 z-40 border-t border-charcoal/10 bg-white/95 backdrop-blur-md lg:hidden"
          style={{ paddingBottom: "env(safe-area-inset-bottom)" }}
        >
          <div className="flex items-stretch gap-2 px-4 py-3">
            <a
              href={whatsappUrl(phone, whatsappMessage)}
              target="_blank"
              rel="noopener noreferrer"
              className="flex min-h-[44px] flex-1 items-center justify-center rounded-[10px] border border-charcoal/15 text-sm font-semibold text-charcoal"
            >
              WhatsApp
            </a>
            <button
              type="button"
              onClick={() => scrollToSection("contact")}
              className="flex min-h-[44px] flex-[1.3] items-center justify-center gap-2 rounded-[10px] bg-copper text-sm font-semibold text-white"
            >
              Get a quote
              <span aria-hidden>→</span>
            </button>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
