// src/RootLayout.jsx
import React from "react";
import { Outlet, useLocation } from "react-router-dom";
import Navbar from "./navbar/Navbar";
import Footer from "./footer/Footer";

export default function RootLayout() {
  const { pathname } = useLocation();
  const isFullscreenPortal = pathname === "/portal-fullscreen";

  return (
    <div
      className={
        isFullscreenPortal
          ? "min-h-dvh bg-black text-white"
          : "min-h-screen page-bg"
      }
      style={
        isFullscreenPortal
          ? undefined
          : { background: "var(--bg)", color: "var(--fg)" }
      }
    >
      {/* Hide chrome on fullscreen portal */}
      {!isFullscreenPortal && <Navbar />}

      <main
        className={
          isFullscreenPortal
            ? "min-h-dvh w-full flex" // no container/padding; let child center itself
            : "container mx-auto px-3 py-4"
        }
      >
        <Outlet />
      </main>

      {!isFullscreenPortal && <Footer />}
    </div>
  );
}
