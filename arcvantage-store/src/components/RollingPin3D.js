"use client";

import "@google/model-viewer";
import { useEffect, useRef } from "react";

export default function RollingPin3D() {
  const mvRef = useRef(null);
  const wrapRef = useRef(null);

  useEffect(() => {
    const mv = mvRef.current;
    const wrap = wrapRef.current;
    if (!mv || !wrap) return;

    // Tune these:
    const START_ROLL = 50;          // degrees
    const END_ROLL = 300;          // 2 full rotations (change as you like)
    const START_Y = 0;             // px
    const END_Y = 60;             // px move-down then stop

    // Set a stable base pose (table-like)
    // orientation format behaves like roll/pitch/yaw degrees. :contentReference[oaicite:2]{index=2}
    const BASE_PITCH = 0;         // often makes it lie down (may need 0/90 depending on model)
    const BASE_YAW = 90;

    let raf = null;

    const update = () => {
        const max = document.body.scrollHeight - window.innerHeight;
        const tRaw = max > 0 ? window.scrollY / max : 0;

        // 1. Make it scroll longer (0.7 = 70% of the page)
        const threshold = 1.0; 
        const t = Math.min(Math.max(tRaw, 0), threshold); 
        const p = t / threshold; 

        const roll = START_ROLL + (END_ROLL - START_ROLL) * p;
        const y = START_Y + (END_Y - START_Y) * p;
      // Apply rolling rotation (roll axis) while keeping pitch/yaw fixed
        mv.orientation = `${roll}deg ${BASE_PITCH}deg ${BASE_YAW}deg`;

      // Move down the page while rolling; then it stays put
        wrap.style.transform = `translateY(${y}px)`;
    };

    const onScroll = () => {
      if (raf) cancelAnimationFrame(raf);
      raf = requestAnimationFrame(update);
    };

    update();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => {
      window.removeEventListener("scroll", onScroll);
      if (raf) cancelAnimationFrame(raf);
    };
  }, []);

  return (
    <div
      ref={wrapRef}
      className="w-full flex justify-center will-change-transform"
    >
      <model-viewer
        ref={mvRef}
        src="/models/wooden_rolling_pin.glb"
        // Lift the camera to 75 degrees so we see the 'top' of the pin
        camera-orbit="0deg 75deg 2.5m" 
        field-of-view="45deg"
        // Keep orientation consistent with your starting state
        orientation="90deg 90deg 0deg"
        shadow-intensity="1"
        style={{
            width: "600px",
            height: "300px",
            background: "transparent",
            pointerEvents: "none",
        }}
        />
    </div>
  );
}
