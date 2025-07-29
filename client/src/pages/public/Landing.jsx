import React from 'react';

export default function Landing() {
  return (
    <div className="min-h-screen w-full flex flex-col items-center justify-center">
      <h1 className="text-5xl font-bold mb-4 text-gray-900">Welcome to Stratify</h1>
      <p className="mb-8 text-gray-700 text-lg">Simulate, test, and perfect your trading strategies risk-free.</p>
      <div className="space-x-4">
        {/* <a href="/register" className="px-6 py-3 bg-blue-600 text-white rounded hover:bg-blue-700">
          Get Started
        </a>
        <a href="/login" className="px-6 py-3 border border-blue-600 text-blue-600 rounded hover:bg-blue-50">
          Sign In
        </a> */}
      </div>
    </div>
  );
}
