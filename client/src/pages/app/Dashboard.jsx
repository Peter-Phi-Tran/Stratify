// client/src/pages/app/Dashboard.jsx

import React from "react";

export default function Dashboard() {
  // Placeholder—swap for real data and hooks later
  const userName = "Trader";
  const portfolios = [
    { name: "Main Portfolio", value: 100000, change: +2540 },
    { name: "Growth Test", value: 51250, change: -660 },
  ];
  const highlights = [
    { label: "Total Value", value: "$151,250" },
    { label: "Today's P&L", value: "+$1,300", positive: true },
    { label: "Positions", value: "8" },
    { label: "Trades", value: "32" },
  ];

  return (
    <main className="min-h-screen py-16 px-2">
      <section className="max-w-6xl mx-auto">
        {/* Welcome header */}
        <h1 className="text-4xl font-extrabold text-navyblue mb-2">
          Welcome back, {userName}!
        </h1>
        <p className="text-lg text-gray-700 mb-10">
          Here’s your latest account summary. Markets are live—track your portfolio, monitor open positions, and start your next simulated trade.
        </p>

        {/* Highlights row */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-12">
          {highlights.map(h => (
            <div key={h.label} className="rounded-xl bg-calmblue/10 p-6 shadow hover:shadow-lg text-center">
              <div className="text-xl font-semibold text-calmblue mb-1">{h.label}</div>
              <div className={`text-2xl font-bold ${h.positive ? "text-green-600" : h.positive === false ? "text-red-600" : "text-navyblue"}`}>
                {h.value}
              </div>
            </div>
          ))}
        </div>

        {/* Portfolios section */}
        <div className="mb-16">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-2xl font-bold text-navyblue">Your Portfolios</h2>
            <a href="/portfolios" className="text-calmblue font-semibold underline hover:text-navyblue">
              View all
            </a>
          </div>
          <div className="grid sm:grid-cols-2 gap-8">
            {portfolios.map(p => (
              <div key={p.name} className="bg-white rounded-2xl shadow p-6 border border-calmblue/20">
                <h3 className="font-bold text-lg mb-2">{p.name}</h3>
                <div className="text-xl font-mono mb-2">
                  ${p.value.toLocaleString()}
                </div>
                <div className={`text-lg font-semibold ${p.change > 0 ? "text-green-600" : p.change < 0 ? "text-red-600" : "text-gray-700"}`}>
                  {p.change > 0 ? "▲" : p.change < 0 ? "▼" : ""} {p.change >= 0 ? "+" : ""}{p.change}
                </div>
              </div>
            ))}
          </div>
        </div>

       {/* Quick Actions - Only Place a Trade and Explore Markets */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
          <a
            href="/trade"
            className="w-full flex-1 bg-calmblue hover:bg-navyblue text-white rounded-xl p-10 flex flex-col items-center justify-center shadow font-bold text-xl transition"
          >
            <span className="text-3xl mb-2"></span>
            Place a Trade
          </a>
          <a
            href="/market"
            className="w-full flex-1 bg-white hover:bg-calmblue/20 text-navyblue border border-calmblue rounded-xl p-10 flex flex-col items-center justify-center shadow font-bold text-xl transition"
          >
            <span className="text-3xl mb-2"></span>
            Explore Markets
          </a>
        </div>


        {/* Future: Live news, alerts, education modules, etc. */}
      </section>
    </main>
  );
}
