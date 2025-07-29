// client/src/pages/Landing.jsx

import React from "react";

export default function Landing() {
  return (
    <main className="bg-white min-h-screen flex flex-col justify-center py-20">
      <section className="max-w-6xl mx-auto flex flex-col md:flex-row items-center gap-16 px-6">
        {/* Left Intro Column */}
        <div className="flex-1">
          <h1 className="text-5xl md:text-6xl font-extrabold text-navyblue leading-tight mb-5">
            Welcome to{" "}
            <span className="text-calmblue">Stratify</span>
          </h1>
          <p className="text-xl text-gray-700 mb-8 max-w-2xl">
            Simulate, test, and perfect your trading strategies with live market data—all risk-free. Stratify’s modern platform brings pro-level tools and education to everyone, from new investors to seasoned market explorers.
          </p>
          <div className="flex gap-6 mb-8">
            <a
              href="/register"
              className="px-8 py-4 bg-calmblue hover:bg-navyblue text-white rounded-xl font-bold text-lg transition"
            >
              Get Started
            </a>
            <a
              href="/login"
              className="px-8 py-4 border-2 border-calmblue text-calmblue hover:bg-calmblue hover:text-white rounded-xl font-bold text-lg transition"
            >
              Sign In
            </a>
          </div>
          <div className="flex gap-8 text-calmblue font-medium mt-6">
            <a href="/features" className="underline hover:text-navyblue transition">Features</a>
            <a href="/learn" className="underline hover:text-navyblue transition">Learn</a>
            <a href="/about" className="underline hover:text-navyblue transition">About</a>
          </div>
        </div>

        {/* Right Visual/CTA Column */}
        <div className="flex-1 flex justify-center">
          {/* Placeholder for logo or hero illustration */}
          <div className="w-72 h-72 md:w-96 md:h-96 bg-calmblue/10 rounded-3xl flex flex-col items-center justify-center shadow-lg">
            <img
              src="/transparent-t-logo.png"
              alt="Stratify Logo"
              className="w-40 h-40 mb-5 object-contain"
            />
            <span className="text-2xl font-bold text-calmblue">Real Markets. No Risk.</span>
            <span className="text-lg text-navyblue mt-2">Your Trading Journey Starts Here</span>
          </div>
        </div>
      </section>

      {/* Features Teaser Lower Section */}
      <section className="max-w-6xl mx-auto mt-20 md:mt-32 px-6">
        <div className="grid md:grid-cols-3 gap-10">
          <div className="bg-calmblue/10 rounded-xl p-8 shadow text-center">
            <div className="text-4xl mb-3"></div>
            <h3 className="text-xl font-bold mb-2 text-calmblue">Real-Time Simulation</h3>
            <p className="text-gray-700">Demo-trade stocks & crypto with live price updates, risk-free.</p>
          </div>
          <div className="bg-calmblue/10 rounded-xl p-8 shadow text-center">
            <div className="text-4xl mb-3"></div>
            <h3 className="text-xl font-bold mb-2 text-calmblue">Insights & Analytics</h3>
            <p className="text-gray-700">Monitor your simulated portfolio, track P&amp;L, and test new strategies in real market conditions.</p>
          </div>
          <div className="bg-calmblue/10 rounded-xl p-8 shadow text-center">
            <div className="text-4xl mb-3"></div>
            <h3 className="text-xl font-bold mb-2 text-calmblue">Learn by Doing</h3>
            <p className="text-gray-700">
              Guided education, tutorials, and challenges for every skill level.
            </p>
          </div>
        </div>
      </section>
    </main>
  );
}

