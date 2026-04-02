"use client";

import useCoordinateTracker from "@/hooks/useCoordinateTracker";

/**
 * Fixed-position coordinate readout in the bottom-left corner.
 * Maps cursor position to lat/long — a persistent geospatial detail.
 * Purely decorative, hidden on mobile and when reduced motion is on.
 */
export default function CoordinateTracker() {
  const coords = useCoordinateTracker();

  if (!coords) return null;

  return (
    <div
      className="font-mono-text fixed bottom-4 left-4 z-40 hidden lg:block"
      style={{
        fontSize: "10px",
        color: "rgba(255, 253, 216, 0.3)",
        fontWeight: 400,
        letterSpacing: "0.5px",
      }}
      aria-hidden="true"
    >
      {coords}
    </div>
  );
}
