"use client";

import { useEffect } from "react";
import { keepForOffline } from "@/lib/offline";

// Opening a report keeps it on this device, so it opens again without a connection (A3).
export default function KeepOffline({ reference }: { reference: string }) {
  useEffect(() => keepForOffline(reference), [reference]);
  return null;
}
