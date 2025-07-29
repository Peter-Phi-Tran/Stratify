// client/src/pages/public/Features.jsx

import React from "react";

const features = [
  {
    title: "Real-Time Trading Simulator",
    desc: "Trade stocks, crypto, and ETFs with live market data—all in a risk-free environment that mimics real brokers[23][14]."
  },
  {
    title: "Portfolio Management",
    desc: "Track portfolio value, P&L, risk metrics, and asset allocation. Create multiple portfolios for different strategies."
  },
  {
    title: "Customizable Market Dashboards",
    desc: "Personalize your workspace—add watchlists, newsfeeds, chart widgets, and performance summaries[13][20]."
  },
  {
    title: "Analytics & Charts",
    desc: "Visualize your trades and portfolio growth with instant, interactive charts and in-depth analytics[14]."
  },
  {
    title: "Strategy Backtesting",
    desc: "Run strategies on historical data to see what works and what doesn't—sharpen your approach over time."
  },    
  {
    title: "Learning Center",
    desc: "Access tutorials, lessons, and a rich FAQ to speed up your progress with guided, practical education[23]."
  }
];

export default function Features() {
  return (
    <main className="py-16">
      <section className="max-w-6xl mx-auto px-6">
        <h1 className="text-4xl font-extrabold mb-5 text-navyblue">Platform Features</h1>
        <p className="text-lg text-gray-600 mb-8">
          Everything you need to simulate, practice, and refine your trading—from real-time execution to analytics and social learning.
        </p>
        <div className="grid sm:grid-cols-2 xl:grid-cols-3 gap-8">
          {features.map(f => (
            <div key={f.title} className="bg-calmblue/10 rounded-xl p-7 shadow hover:shadow-lg backdrop-blur">
              <h2 className="text-xl font-bold text-calmblue mb-2">{f.title}</h2>
              <p className="text-gray-800">{f.desc}</p>
            </div>
          ))}
        </div>
      </section>
    </main>
  );
}
