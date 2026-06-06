"use client";

import { useEffect } from "react";
import { usePathname } from "next/navigation";

export function AnalyticsTracker() {
  const pathname = usePathname();

  useEffect(() => {
    // Track page view
    const trackView = async () => {
      try {
        await fetch("/api/analytics", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            event_type: "page_view",
            page: pathname,
            referrer: document.referrer || null,
          }),
        });
      } catch {
        // Silently fail
      }
    };

    trackView();
  }, [pathname]);

  return null;
}
