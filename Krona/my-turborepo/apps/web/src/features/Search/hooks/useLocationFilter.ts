"use client";

import { useState } from "react";

export type LocationStatus = "idle" | "loading" | "ready" | "denied" | "unsupported";

export function useLocationFilter() {
  const [status, setStatus] = useState<LocationStatus>("idle");
  const [radiusMeters, setRadiusMeters] = useState(1000);
  const [coordinates, setCoordinates] = useState<GeolocationCoordinates | null>(null);

  // Solicita la ubicación real; luego estas coordenadas podrán enviarse al backend.
  function requestLocation() {
    if (!("geolocation" in navigator)) {
      setStatus("unsupported");
      return;
    }

    setStatus("loading");
    navigator.geolocation.getCurrentPosition(
      (position) => {
        setCoordinates(position.coords);
        setStatus("ready");
      },
      () => setStatus("denied"),
      { enableHighAccuracy: true, timeout: 10000, maximumAge: 300000 },
    );
  }

  function disableLocation() {
    setStatus("idle");
    setCoordinates(null);
  }

  return {
    status,
    radiusMeters,
    coordinates,
    isEnabled: status === "ready",
    setRadiusMeters,
    requestLocation,
    disableLocation,
  };
}
