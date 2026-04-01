"use client";
import { useEffect, useRef, useState } from "react";

export default function WhyModel3D() {
  const mvRef = useRef(null);
  const [ready, setReady] = useState(false);

  useEffect(() => {
    let cancelled = false;

    (async () => {
      await import("@google/model-viewer"); // ✅ wait until defined
      if (!cancelled) setReady(true);
    })();

    return () => {
      cancelled = true;
    };
  }, []);

  if (!ready) {
    return (
      <div className="w-full h-full rounded-[3rem] bg-gradient-to-b from-black/5 to-transparent" />
    );
  }

  return (
    <model-viewer
      ref={mvRef}
      src="/models/baking_tray.glb"
      camera-orbit="35deg 70deg 3.6m"
      camera-target="0m 0.02m 0m"
      field-of-view="10deg"
      auto-rotate
      auto-rotate-delay="200"
      rotation-per-second="12deg"
      environment-image="neutral"
      shadow-intensity="0"
      interaction-prompt="none"
      style={{ width: "120%", height: "150%", background: "transparent" }}
    />
  );
}
