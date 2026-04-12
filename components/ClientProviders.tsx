"use client";
import React from "react";
import CountProvider from "@/CountProvider";
import AnalyticsTracker from "@/components/AnalyticsTracker";

export default function ClientProviders({ children }: { children: React.ReactNode }) {
  return (
    <CountProvider>
      <AnalyticsTracker />
      {children}
    </CountProvider>
  );
}
