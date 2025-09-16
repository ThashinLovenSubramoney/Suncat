// src/App.jsx
import React, { useEffect } from "react";
import {
  createBrowserRouter,
  RouterProvider,
  Navigate,
} from "react-router-dom";

import RootLayout from "./RootLayout";
import ErrorPage from "./specialsetups/ErrorPage";

// ====== Navbar / Footer pages ======
import Home from "./navbar/Home";
import Login from "./navbar/Login";
import Register from "./navbar/Register";
import VideoUpload from "./navbar/VideoUpload";
import VideoAlter from "./navbar/VideoAlter";
import Videos from "./navbar/Videos";
import Price from "./navbar/Price";
import Services from "./navbar/Services";
import ContactUs from "./navbar/ContactUs";
import OurStaff from "./navbar/OurStaff";
import Brands from "./navbar/Brands";
import FoundingFathers from "./navbar/FoundingFathers";
import NextGeneration from "./navbar/NextGeneration";
import News from "./navbar/News";
import DataProtectionPolicy from "./footer/DataProtectionPolicy";
import FoundersAndAbout from "./FoundersAndAbout";

// ====== Portal (new system) ======
import PortalFullScreen from "./Portal/PortalFullScreen";

// ====== Theme / Auth ======
import { initThemeFromStorage, setUnlocked } from "./theme";
import { auth, onAuthStateChanged } from "./firebaseconfig/firebase";

// ----------------- ROUTER -----------------
const router = createBrowserRouter([
  // ⬛ Full-screen portal (no header/footer)
  { path: "/portal-fullscreen", element: <PortalFullScreen /> },

  // 🌐 Everything else with RootLayout
  {
    path: "/",
    element: <RootLayout />,
    errorElement: <ErrorPage />,
    children: [
      { index: true, element: <Home /> },
      { path: "login", element: <Login /> },
      { path: "register", element: <Register /> },

      // 🔑 Old /portal → redirect to fullscreen
      { path: "portal", element: <Navigate to="/portal-fullscreen" replace /> },

      { path: "video-upload", element: <VideoUpload /> },
      { path: "video-alter", element: <VideoAlter /> },
      { path: "videos", element: <Videos /> },
      {
        path: "about-us",
        element: <Navigate to="/founding-fathers#about" replace />,
      },
      { path: "prices", element: <Price /> },
      { path: "services", element: <Services /> },
      { path: "contact-us", element: <ContactUs /> },
      { path: "our-staff", element: <OurStaff /> },
      { path: "brands", element: <Brands /> },
      { path: "founding-fathers", element: <FoundersAndAbout /> },
      { path: "next-generation", element: <NextGeneration /> },
      { path: "news", element: <News /> },
      { path: "data-protection", element: <DataProtectionPolicy /> },
    ],
  },
]);

// ----------------- APP -----------------
function App() {
  useEffect(() => {
    // restore last theme
    initThemeFromStorage();

    // unlock vivid theme if user logs in
    if (auth && onAuthStateChanged) {
      const unsub = onAuthStateChanged(auth, (user) => {
        if (user) setUnlocked(true);
        // Optional: reset on logout
        // else setUnlocked(false);
      });
      return () => unsub && unsub();
    }
  }, []);

  return <RouterProvider router={router} />;
}

export default App;
