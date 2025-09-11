// src/Portal/PortalContent.jsx
import { useState } from "react";

export default function PortalContent({ onUnlock, variant = "fullscreen" }) {
  const [msg, setMsg] = useState("");

  const handleClick = () => {
    setMsg("The gateway hums…");
    setTimeout(() => setMsg(""), 1500);
    onUnlock?.(true); // optional: mark unlock for your theme, harmless if unused
  };

  return (
    <div
      className={
        variant === "fullscreen"
          ? "min-h-dvh w-full flex flex-col items-center justify-center bg-black text-white"
          : "min-h-[70vh] w-full flex flex-col items-center justify-center"
      }
    >
      {/* Rotating portal image */}
      <div
        className="relative w-[320px] h-[320px] md:w-[420px] md:h-[420px] flex items-center justify-center select-none"
        onClick={handleClick}
        role="button"
        aria-label="Open portal"
        title="Open portal"
      >
        <img
          src="/TransparentPortal.png"
          alt="Suncat Portal"
          className="w-full h-full object-contain animate-spin-slow will-change-transform"
          draggable="false"
        />
      </div>

      {/* Click message */}
      {msg && (
        <div className="mt-6 px-3 py-1 bg-white/10 rounded-md text-sm">
          {msg}
        </div>
      )}
    </div>
  );
}
