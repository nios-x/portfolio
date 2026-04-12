"use client";

import { useEffect } from "react";
import { usePathname } from "next/navigation";

const SESSION_KEY = "analytics_session_id";

function getSessionId(): string {
  if (typeof window === "undefined") return "server";
  const existing = window.sessionStorage.getItem(SESSION_KEY);
  if (existing) return existing;

  const id = crypto.randomUUID ? crypto.randomUUID() : `${Date.now()}-${Math.random()}`;
  window.sessionStorage.setItem(SESSION_KEY, id);
  return id;
}

export default function AnalyticsTracker() {
  const pathname = usePathname();

  useEffect(() => {
    if (typeof window === "undefined") return;

    const sessionId = getSessionId();
    const referrer = document.referrer || "";

    fetch("/api/analytics", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        page: pathname || "/",
        referrer,
        sessionId,
      }),
    }).catch((err) => console.error("Failed to send analytics", err));
  }, [pathname]);

  return null;
}
