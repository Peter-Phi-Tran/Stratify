// client/src/pages/public/Learn.jsx

import React from "react";

const steps = [
  {
    title: "Getting Started: Account & Navigation",
    desc: "Sign up for Stratify (no payment required), open your dashboard, and explore the intuitive navigation bar—modeled after leading trading apps for clarity and ease."
  },
  {
    title: "Making Your First Simulated Trade",
    desc: "Use our tutorials to learn how to place your first buy or sell order on any asset. You'll see how trades, watchlists, and order tickets operate in a zero-risk environment[15]."
  },
  {
    title: "Portfolio Management Basics",
    desc: "Understand positions, gains and losses, asset allocation, and how to track overall portfolio health in real time."
  },
  {
    title: "Working with Analytics & Charts",
    desc: "Get comfortable with viewing candlestick charts, adding indicators, and reading performance summaries with real market data updates[14]."
  },
  {
    title: "Join Challenges & Leaderboards",
    desc: "Participate in periodic competitions. Climb the leaderboard and measure your simulated performance against peers."
  },
  {
    title: "Deepen Your Knowledge",
    desc: "Explore our resource library for guides, videos, a glossary of terms, and advanced theory—designed for both beginners and those leveling up."
  }
];

export default function Learn() {
  return (
    <main className="min-h-screen py-24 px-2">
      <section className="max-w-6xl mx-auto">
        <h1 className="text-5xl font-extrabold mb-6 text-navyblue text-center">
          Learn with Stratify
        </h1>
        <p className="text-xl text-gray-800 mb-12 text-center max-w-3xl mx-auto">
          Level up your trading and investing knowledge in a real-time, risk-free environment. Our guided tutorials, analytics, and challenges make mastering the markets simple and fun.
        </p>
        <div className="grid sm:grid-cols-2 gap-12">
          {steps.map((step, idx) => (
            <div
              key={step.title}
              className="bg-calmblue/10 rounded-2xl p-8 shadow hover:shadow-xl transition min-h-[200px] flex"
            >
              <div>
                <div className="flex items-center mb-3">
                  <div className="flex-shrink-0 w-11 h-11 rounded-full bg-calmblue text-white flex items-center justify-center text-2xl font-extrabold mr-4 shadow-md">
                    {idx + 1}
                  </div>
                  <h2 className="text-2xl font-bold text-calmblue">{step.title}</h2>
                </div>
                <p className="text-gray-700 text-lg">{step.desc}</p>
              </div>
            </div>
          ))}
        </div>

        <div className="bg-calmblue/10 rounded-xl py-8 px-8 mt-16 text-lg text-gray-900 shadow-inner max-w-3xl mx-auto">
          <h3 className="text-2xl font-bold mb-2 text-navyblue">
            Need Help?
          </h3>
          <p>
            Visit our FAQ, connect with the Stratify community, or reach out directly—learning is better together!
          </p>
        </div>
      </section>
    </main>
  );
}