"use client";
import "@google/model-viewer";

export default function WhyModel3D() {
  return (
    <model-viewer
      src="/models/baking_tray.glb"

      // Pull camera back (bigger distance = smaller object)
      camera-orbit="35deg 70deg 11m"

      // Narrower FOV reduces edge clipping
      field-of-view="75deg"

      // Centering
      camera-target="0m 0.03m 0m"

      auto-rotate
      auto-rotate-delay="200"
      rotation-per-second="12deg"

      environment-image="neutral"
      shadow-intensity="0"
      interaction-prompt="none"

      style={{ width: "120%", height: "100%", background: "transparent" }}
    />
  );
}
