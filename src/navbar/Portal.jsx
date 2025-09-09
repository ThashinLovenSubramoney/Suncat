// src/navbar/Portal.jsx
import React, { useEffect, useState } from 'react';
import { Navigate } from 'react-router-dom';
import { auth, onAuthStateChanged } from '../firebaseconfig/firebase';

// Email for Radisson Blu customer
const RADISSON_EMAIL = 'kershnie.chetty@radissonblu.com';

export default function Portal() {
  const [checking, setChecking] = useState(true);
  const [user, setUser] = useState(null);

  useEffect(() => {
    if (!auth) {
      // Local dev with Firebase disabled → treat as logged out
      setChecking(false);
      setUser(null);
      return;
    }

    const unsub = onAuthStateChanged(auth, (u) => {
      setUser(u ?? null);
      setChecking(false);
    });

    return () => unsub && unsub();
  }, []);

  if (checking) {
    return (
      <div className="min-h-[50vh] flex items-center justify-center text-white">
        Loading…
      </div>
    );
  }

  // Not logged in? Redirect to login
  if (!user) return <Navigate to="/login" replace />;

  // Check if user is Radisson Blu
  const isRadisson = user.email?.toLowerCase() === RADISSON_EMAIL;

  return (
    <div className="min-h-screen p-6 text-white">
      <h1 className="text-3xl font-bold mb-4">
        {isRadisson ? 'Radisson Blu' : 'Customer Portal'}
      </h1>

      {isRadisson ? (
        <div className="space-y-4">
          <p className="opacity-90">
            Welcome, {user.email}. This is your Radisson Blu portal.
          </p>

          {/* Price List Block */}
          <div className="bg-black/40 rounded-lg p-4">
            <h2 className="text-xl font-semibold mb-2">Your Price List</h2>
            <p className="opacity-80">Coming soon…</p>
          </div>

          {/* Ordering Block */}
          <div className="bg-black/40 rounded-lg p-4">
            <h2 className="text-xl font-semibold mb-2">Place an Order</h2>
            <p className="opacity-80">Coming soon…</p>
          </div>
        </div>
      ) : (
        <div className="bg-black/40 rounded-lg p-4">
          <p className="opacity-90">
            Hi {user.email}. Your portal is coming soon. If you need access to a
            specific customer area, contact support.
          </p>
        </div>
      )}
    </div>
  );
}
