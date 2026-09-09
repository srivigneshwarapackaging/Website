export type TrackingEvent = {
  sectionId: string;
  eventType: "page_view" | "section_engagement" | "click";
  duration?: number;
  metadata?: Record<string, unknown>;
};

export const sendAnalyticsPayload = async (event: TrackingEvent) => {
  if (typeof window === "undefined") return;
  // Skip client analytics in dev — avoids hung MongoDB requests while iterating locally.
  if (process.env.NODE_ENV === "development") return;

  try {
    const body =
      event.eventType === "page_view"
        ? { eventType: "page_view" }
        : event.eventType === "section_engagement"
          ? {
              eventType: "section_engagement",
              sectionId: event.sectionId,
              duration: event.duration,
            }
          : event;

    await fetch("/api/analytics", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      keepalive: true,
      body: JSON.stringify(body),
    });
  } catch (error) {
    console.error("Analytics Error:", error);
  }
};

export const trackClick = (elementId: string, customMetadata?: Record<string, unknown>) => {
  sendAnalyticsPayload({
    sectionId: elementId,
    eventType: "click",
    metadata: customMetadata,
  });
};
