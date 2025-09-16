// src/Portal/PortalFullScreen.jsx
import React, { useEffect, useState } from "react";
import PortalContent from "./PortalContent"; // if you still use it elsewhere (harmless)
import { setUnlocked } from "../theme";

export default function PortalFullScreen() {
  const [uiVisible, setUiVisible] = useState(false);

  // Lock scrolling only on this screen
  useEffect(() => {
    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = prevOverflow;
    };
  }, []);

  const handleRingClick = () => {
    // reveal buttons; keep the “one true click” feel
    setUiVisible(true);
  };

  return (
    <div
      className="
        portal-canvas
        min-h-dvh w-full bg-black text-white
        flex flex-col items-center justify-center
      "
    >
      {/* Portal ring */}
      <button
        type="button"
        onClick={handleRingClick}
        aria-label="Open portal"
        className="
          relative
          rounded-full
          portal-ring
          ring-2 ring-emerald-400/60
          animate-glow-pulse
          select-none
          flex items-center justify-center
          shadow-2xl
          transition-transform
          hover:scale-[1.01]
        "
        style={{
          width: "520px",
          height: "520px",
          // keep animations GPU-accelerated and stable
          willChange: "transform",
          contain: "layout paint size",
        }}
      >
        <img
          src="/TransparentPortal(3).png"
          alt="Suncat Portal"
          className="spin-slow"
          style={{
            width: "78%",
            height: "78%",
            objectFit: "contain",
            pointerEvents: "none",
            userSelect: "none",
            backfaceVisibility: "hidden",
            transform: "translateZ(0)",
          }}
          draggable="false"
        />
        {/* Optional faint inner glow to suggest depth */}
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0 rounded-full"
          style={{
            boxShadow: "inset 0 0 120px rgba(16,185,129,0.22)",
            filter: "blur(0.2px)",
          }}
        />
      </button>

      {/* Hidden until clicked */}
      <div
        className={`
          mt-10 grid gap-4 grid-cols-1 sm:grid-cols-2
          transition-all duration-500
          ${uiVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4 pointer-events-none"}
        `}
        style={{ willChange: "opacity, transform" }}
      >
        {/* TOKEN PATH */}
        <a
          href="#token"
          onClick={(e) => {
            e.preventDefault();
            // If you have a side panel token UI, toggle it here;
            // or navigate('/portal') after setUnlocked, your call.
            setUnlocked(true);
            // example: send them to a themed page you already have
            window.location.href = "/portal";
          }}
          className="
            px-5 py-3 rounded-full
            bg-emerald-600 hover:bg-emerald-700
            text-white text-sm font-semibold
            text-center shadow
          "
        >
          Enter with Token
        </a>

        {/* CHAT PATH */}
        <a
          href="#chat"
          onClick={(e) => {
            e.preventDefault();
            // If you mount ChatAssist as a drawer, open it here.
            // For now, route to /register as a placeholder:
            window.location.href = "/register";
          }}
          className="
            px-5 py-3 rounded-full
            bg-gray-800 hover:bg-gray-700
            text-white text-sm font-semibold
            text-center border border-emerald-500/40
            shadow
          "
        >
          Talk to Assistant
        </a>
      </div>
    </div>
  );
}
