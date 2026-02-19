"use client";
import "@google/model-viewer";
import { useEffect, useRef } from "react";

export default function RollingJar3D() {
  const mvRef = useRef(null);
  const wrapRef = useRef(null);

  useEffect(() => {
    const mv = mvRef.current;
    const wrap = wrapRef.current;
    if (!mv || !wrap) return;

    let raf = null;

    // --- Tune these ---
    const TRAVEL_PX = 500;            // how far it travels on page
    const ROLL_DEG = 720;             // total roll degrees across TRAVEL_PX
    const BASE = { x: 90, y: 0, z: 0 }; // lays it down (common for “upright” models)

    // If rolling looks wrong, we’ll swap which axis gets the roll:
    // Option A: roll on Z  (often correct after laying down with x=90)
    // Option B: roll on X
    const ROLL_AXIS = "z"; // change to "x" if needed

    const clamp01 = (v) => Math.min(Math.max(v, 0), 1);

    const update = () => {
      const rect = wrap.getBoundingClientRect();
      const vh = window.innerHeight;

      // when wrapper enters viewport bottom → start
      const startTrigger = vh * 0.9;
      const endTrigger = -TRAVEL_PX;

      let p = (rect.top - startTrigger) / (endTrigger - startTrigger);
      p = clamp01(p);

      const yMove = p * TRAVEL_PX;
      const roll = p * ROLL_DEG;

      // apply scroll movement
      mv.style.transform = `translateY(${yMove}px)`;

      // apply orientation (base + rolling axis)
      let x = BASE.x, y = BASE.y, z = BASE.z;
      if (ROLL_AXIS === "z") z = BASE.z + roll;
      if (ROLL_AXIS === "x") x = BASE.x + roll;

      mv.orientation = `${x}deg ${y}deg ${z}deg`;
    };

    const onScroll = () => {
      if (raf) cancelAnimationFrame(raf);
      raf = requestAnimationFrame(update);
    };

    window.addEventListener("scroll", onScroll, { passive: true });
    update();

    return () => {
      window.removeEventListener("scroll", onScroll);
      if (raf) cancelAnimationFrame(raf);
    };
  }, []);

  return (
    <div
      ref={wrapRef}
      className="w-full flex justify-center py-20 pointer-events-none"
      style={{ height: "900px" }}
    >
      <model-viewer
        ref={mvRef}
        src="/models/glass_jar_with_wooden_cover.glb"
        // ✅ more like your screenshot
        camera-orbit="0deg 0deg auto"
        field-of-view="45deg"
        shadow-intensity="1.2"
        shadow-softness="1"

        // ✅ make it smaller (pick ONE method below)
        // Method 1 (recommended): scale the model
        scale="0.6 0.6 0.6"

        // Method 2 (optional): limit screen size
        style={{
          width: "900px",
          height: "420px",
          maxWidth: "100%",
          background: "transparent",
          willChange: "transform",
        }}
      />
    </div>
  );
}
