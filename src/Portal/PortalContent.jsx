// src/Portal/PortalContent.jsx
import { useState } from "react";

export default function PortalContent({ onUnlock, variant = "fullscreen" }) {
  const [msg, setMsg] = useState("");

  const handleClick = () => {
    setMsg("The gateway hums…");
    setTimeout(() => setMsg(""), 1500);
   // onUnlock?.(true); //disabled
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
{/* Big circular ring with green glow (clickable) */}
<div
  className="
    relative rounded-full
    border-4 border-emerald-400
    shadow-[0_0_40px_rgba(16,185,129,0.6)]
    animate-glow-pulse
    w-[92vw] max-w-[940px] aspect-square
    flex items-center justify-center select-none
  "
  onClick={handleClick}
  role="button"
  aria-label="Open portal"
  title="Open portal"
>
  <img
    src="/TransparentPortal(2).png"  /* or /TransparentPortal(2).png if that’s your file */
    alt="Suncat Portal"
    className="w-[94%] h-[94%] object-contain animate-spin-slow will-change-transform"
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
