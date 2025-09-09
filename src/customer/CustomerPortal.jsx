// src/customer/CustomerPortal.jsx
import React from 'react';

export default function CustomerPortal() {
  return (
    <div className="min-h-[60vh] p-6 text-white">
      <h1 className="text-3xl font-bold mb-4">Customer Portal</h1>
      <p>Welcome! This is where customer-specific content will live.</p>
      <div className="mt-6 rounded-lg bg-black/40 p-4">
        <p className="opacity-80">
          (Coming soon) Radisson Blu price list, orders, statements, etc.
        </p>
      </div>
    </div>
  );
}
