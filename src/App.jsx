import React from 'react';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import Home from './navbar/Home';
import Login from './navbar/Login';
import Register from './navbar/Register';
import RootLayout from './RootLayout';
import ErrorPage from './specialsetups/ErrorPage';
import VideoUpload from './navbar/VideoUpload';
import DataProtectionPolicy from './footer/DataProtectionPolicy';
import VideoAlter from './navbar/VideoAlter';
import Videos from './navbar/Videos';
import AboutUs from './navbar/AboutUs';
import Price from './navbar/Price';
import Services from './navbar/Services';
import ContactUs from './navbar/ContactUs';
import OurStaff from './navbar/OurStaff';
import Brands from './navbar/Brands';
import FoundingFathers from './navbar/FoundingFathers';
import NextGeneration from './navbar/NextGeneration';
import News from './navbar/News';
import Portal from './navbar/Portal';


// NEW
import CustomerPortal from './customer/CustomerPortal';

const router = createBrowserRouter([
  {
    path: '/',
    element: <RootLayout />,
    errorElement: <ErrorPage />,
    children: [
      { index: true, element: <Home /> },
      { path: 'login', element: <Login /> },
      { path: 'register', element: <Register /> },
      { path: 'portal', element: <Portal /> },   // 👈 NEW ROUTE HERE
      { path: 'video-upload', element: <VideoUpload /> },
      { path: 'video-alter', element: <VideoAlter /> },
      { path: 'videos', element: <Videos /> },
      { path: 'about-us', element: <AboutUs /> },
      { path: 'prices', element: <Price /> },
      { path: 'services', element: <Services /> },
      { path: 'contact-us', element: <ContactUs /> },
      { path: 'our-staff', element: <OurStaff /> },
      { path: 'brands', element: <Brands /> },
      { path: 'founding-fathers', element: <FoundingFathers /> },
      { path: 'next-generation', element: <NextGeneration /> },
      { path: 'news', element: <News /> },

      // NEW
      { path: 'portal', element: <CustomerPortal /> },

      { path: 'data-protection', element: <DataProtectionPolicy /> },
    ],
  },
]);

function App() {
  return <RouterProvider router={router} />;
}

export default App;
