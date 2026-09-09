"use client";

import { useEffect, useRef } from "react";
import { sendAnalyticsPayload } from "@/lib/analytics-utils";

export function AnalyticsProvider({ children }: { children: React.ReactNode }) {
  const activeSection = useRef("hero");
  const startTime = useRef(Date.now());
  const pageViewSent = useRef(false);

  useEffect(() => {
    if (pageViewSent.current || window.location.pathname.includes("admin")) return;
    pageViewSent.current = true;

    sendAnalyticsPayload({
      sectionId: "page",
      eventType: "page_view",
    });

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const now = Date.now();
            const timeSpent = Math.round((now - startTime.current) / 1000);

            if (timeSpent > 1 && activeSection.current) {
              sendAnalyticsPayload({
                sectionId: activeSection.current,
                eventType: "section_engagement",
                duration: timeSpent,
              });
            }

            activeSection.current = entry.target.id;
            startTime.current = now;
          }
        });
      },
      { threshold: 0.55 }
    );

    document.querySelectorAll("section[id]").forEach((section) => {
      observer.observe(section);
    });

    return () => observer.disconnect();
  }, []);

  return <>{children}</>;
}
