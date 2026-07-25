"use client";

import { useEffect } from "react";
import { initPostHogClient } from "@/lib/posthog/init-client";

export function PostHogBootstrap() {
  useEffect(() => {
    initPostHogClient();
  }, []);

  return null;
}
