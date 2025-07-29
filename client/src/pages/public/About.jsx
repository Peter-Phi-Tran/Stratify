// client/src/pages/public/About.jsx

import React from "react";

export default function About() {
  return (
    <main className="py-16">
      <section className="max-w-5xl mx-auto px-6 mb-12">
        <h1 className="text-4xl font-extrabold mb-3 text-navyblue">About Stratify</h1>
        <p className="text-lg text-gray-700 mb-8">
          Stratify is a modern trading simulation platform designed to empower you with hands-on investing experience—risk free. Practice, learn, and master strategies in real time using live market data.
        </p>
        <div className="grid md:grid-cols-2 gap-12">
          <div>
            <h2 className="text-2xl font-semibold text-calmblue mb-2">Our Mission</h2>
            <p className="text-gray-700 mb-4">
              We believe that trading education should be accessible and interactive. Stratify offers a safe environment to test your skills, experiment with portfolio strategies, and grow as an investor long before you risk real money.
            </p>
          </div>
          <div>
            <h2 className="text-2xl font-semibold text-calmblue mb-2">Why Choose Stratify?</h2>
            <ul className="list-disc space-y-2 ml-5 text-gray-700">
              <li>Simulated trading with real-time prices and instant execution</li>
              <li>Portfolio analytics & leaderboards to track your progress</li>
              <li>Education-focused: tutorials, help center, and community support</li>
              <li>Modern, mobile-friendly interface with beautiful charts</li>
            </ul>
          </div>
        </div>
      </section>
      <section className="max-w-5xl mx-auto px-6 py-8 rounded-lg bg-calmblue/5">
        <h2 className="text-xl font-bold mb-2 text-navyblue">Built for Learners, Creators, and Future Traders</h2>
        <div className="md:flex gap-12">
          <ul className="list-inside list-disc mb-4 flex-1 text-gray-700">
            <li>Students & beginners seeking hands-on market experience</li>
            <li>Enthusiasts and entrepreneurs testing new ideas</li>
            <li>Clubs, classes, and cohorts for group competitions</li>
            <li>Traders prototyping and refining new strategies</li>
          </ul>
          <div className="flex-1">
            <p className="text-gray-600 mb-2">
              <span className="font-semibold text-calmblue">Interested in collaborating, teaching, or sponsoring?</span>
              <br />
              Email us at <a className="text-blue-600 underline" href="mailto:info@stratify.app">info@stratify.app</a>
            </p>
          </div>
        </div>
      </section>
    </main>
  );
}
