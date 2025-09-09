// src/navbar/Portal.jsx
import React, { useEffect, useState } from 'react';

export default function Portal() {
  const [showMessage, setShowMessage] = useState(false);
  const [imageSrc, setImageSrc] = useState('/GBFire%20Symbol.png');
  const [attemptedJpg, setAttemptedJpg] = useState(false);

  // graceful image fallback: .png -> .jpg -> logo
  const handleImgError = () => {
    if (!attemptedJpg) {
      setAttemptedJpg(true);
      setImageSrc('/GBFire%20Symbol.jpg');
    } else {
      setImageSrc('/Suncat3.png');
    }
  };

  // Optional: preload to prevent first-spin stutter
  useEffect(() => {
    const img = new Image();
    img.src = imageSrc;
  }, [imageSrc]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-b from-black via-gray-900 to-black p-6">
      {/* local CSS for slow spin + shimmer */}
      <style>{`
        @keyframes slow-spin {
          from { transform: rotate(0deg); }
          to   { transform: rotate(360deg); }
        }
        .animate-slow-spin {
          animation: slow-spin 16s linear infinite;
        }
        @keyframes portal-glow {
          0%, 100% { box-shadow: 0 0 12px rgba(0, 255, 200, 0.35), 0 0 48px rgba(0, 255, 200, 0.22); }
          50%      { box-shadow: 0 0 18px rgba(0, 255, 200, 0.55), 0 0 72px rgba(0, 255, 200, 0.35); }
        }
        .portal-ring {
          animation: portal-glow 2.8s ease-in-out infinite;
        }
      `}</style>

      <div className="w-full max-w-3xl mx-auto flex flex-col items-center">
        <h1 className="text-white text-3xl md:text-4xl font-bold tracking-wide mb-6">
          The Portal
        </h1>

        {/* Portal wrapper */}
        <button
          type="button"
          onClick={() => setShowMessage((v) => !v)}
          className="relative group outline-none focus:outline-none"
          aria-label="Open portal"
        >
          {/* Glow ring */}
          <div className="portal-ring rounded-full p-4 md:p-6 transition-transform duration-300 group-hover:scale-105">
            {/* Inner container to create layered glow */}
            <div className="rounded-full bg-black/40 p-3 md:p-5">
              {/* Symbol */}
              <img
                src={imageSrc}
                onError={handleImgError}
                alt="Suncat Portal"
                className="
                  animate-slow-spin
                  w-[220px] h-[220px]
                  md:w-[320px] md:h-[320px]
                  object-contain select-none
                  transition-transform duration-300
                  group-hover:scale-105
                  drop-shadow-[0_0_25px_rgba(0,255,200,0.35)]
                "
                draggable="false"
              />
            </div>
          </div>

          {/* Subtle halo behind */}
          <div
            aria-hidden="true"
            className="pointer-events-none absolute inset-0 blur-3xl opacity-40 group-hover:opacity-60 transition-opacity duration-300"
            style={{
              background:
                'radial-gradient(40% 40% at 50% 50%, rgba(0,255,200,0.18), transparent 70%)',
            }}
          />
        </button>

        {/* Click message */}
        <div
          className={`text-center mt-6 max-w-xl transition-all duration-300 ${
            showMessage ? 'opacity-100 translate-y-0' : 'opacity-0 -translate-y-2 pointer-events-none'
          }`}
        >
          <p className="text-teal-200/90 text-lg">
            The gateway hums softly… access will be granted soon.
          </p>
          <p className="text-gray-300 mt-2 text-sm">
            (For now this is a visual placeholder. Next, we’ll wire it to your customer portal & tokens.)
          </p>
        </div>
      </div>
    </div>
  );
}
