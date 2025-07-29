// client/src/pages/public/Markets.jsx

import React, { useState } from "react";

// -- Placeholder static instrument data for demo UI
const sampleInstruments = [
  {
    symbol: "AAPL",
    name: "Apple Inc.",
    price: 197.23,
    change: +1.13,
    trend: [196.1, 196.5, 196.7, 197, 197.2, 197.23], // Placeholder mini-trend line
  },
  {
    symbol: "TSLA",
    name: "Tesla Inc.",
    price: 276.11,
    change: -4.82,
    trend: [280, 281, 280.2, 279.8, 278, 276.11],
  },
  {
    symbol: "MSFT",
    name: "Microsoft Corp.",
    price: 435.30,
    change: +0.78,
    trend: [433, 434, 434.7, 435.1, 435.2, 435.3],
  },
  {
    symbol: "BTC-USD",
    name: "Bitcoin",
    price: 67892,
    change: +123.54,
    trend: [67000, 67120, 67400, 67700, 67892, 67892],
  },
];

// -- Helper for rendering a basic SVG sparkline
function Sparkline({ data, color }) {
  // No real chart lib, just a simplistic SVG line for placeholder
  const max = Math.max(...data);
  const min = Math.min(...data);
  const points = data.map((v, idx) => {
    const y = 44 - ((v - min) / (max - min + 1e-6)) * 44;
    const x = idx * (80 / (data.length - 1));
    return `${x},${y}`;
  }).join(" ");
  return (
    <svg width="80" height="48" viewBox="0 0 80 48" className="block">
      <polyline fill="none" stroke={color} strokeWidth="3" points={points} />
    </svg>
  );
}

export default function Markets() {
  const [filter, setFilter] = useState("");

  const filteredMarkets =
    filter.trim() === ""
      ? sampleInstruments
      : sampleInstruments.filter(
          (m) =>
            m.symbol.toLowerCase().includes(filter.toLowerCase()) ||
            m.name.toLowerCase().includes(filter.toLowerCase())
        );

  return (
    <main className="min-h-screen py-20 px-2">
      <section className="max-w-6xl mx-auto">
        {/* Header */}
        <h1 className="text-5xl font-extrabold mb-3 text-navyblue">Live Markets</h1>
        <p className="text-lg text-gray-600 mb-10">
          Watch real-time price movements for simulated stocks, crypto, and more. Click any asset for a detailed chart and trading panel (coming soon).
        </p>

        {/* Filter/Search bar */}
        <div className="flex justify-end mb-6">
          <input
            className="rounded border px-4 py-2 text-lg w-full max-w-xs bg-gray-100 focus:ring-2 focus:ring-calmblue"
            type="text"
            placeholder="Search by symbol or name..."
            value={filter}
            onChange={e => setFilter(e.target.value)}
          />
        </div>

        {/* Markets Table */}
        <div className="overflow-x-auto rounded-2xl bg-calmblue/10 shadow">
          <table className="min-w-full divide-y divide-calmblue">
            <thead>
              <tr>
                <th className="p-4 text-left text-xl text-navyblue font-semibold">Symbol</th>
                <th className="p-4 text-left text-xl text-navyblue font-semibold">Name</th>
                <th className="p-4 text-right text-xl text-navyblue font-semibold">Price</th>
                <th className="p-4 text-right text-xl text-navyblue font-semibold">Change</th>
                <th className="p-4 text-right text-xl text-navyblue font-semibold">Trend</th>
                <th className="p-4"></th>
              </tr>
            </thead>
            <tbody>
              {filteredMarkets.length === 0 ? (
                <tr>
                  <td colSpan={6} className="p-6 text-center text-gray-400">No assets found.</td>
                </tr>
              ) : (
                filteredMarkets.map((m) => (
                  <tr key={m.symbol} className="hover:bg-calmblue/30 transition">
                    <td className="p-4 font-mono font-bold">{m.symbol}</td>
                    <td className="p-4">{m.name}</td>
                    <td className="p-4 text-right">${m.price.toLocaleString()}</td>
                    <td
                      className={
                        `p-4 text-right font-bold ${m.change > 0 ? "text-green-600" : "text-red-600"}`
                      }
                    >
                      {m.change > 0 && "+"}{m.change}
                    </td>
                    <td className="p-4">
                      <Sparkline data={m.trend} color={m.change > 0 ? "#059669" : "#ef4444"} />
                    </td>
                    <td className="p-4 text-right">
                      <a
                        href={`/market/${m.symbol}`}
                        className="rounded px-4 py-1 bg-calmblue text-white hover:bg-navyblue"
                      >
                        View
                      </a>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>

        {/* Future Feature: Add category tabs or chart intervals here */}
        {/* You can also add quick "Top Movers" or "My Watchlist" cards */}

        <div className="text-center mt-16 text-gray-500 text-lg">
          Real-time price charts, order panels, and advanced analytics coming soon!
        </div>
      </section>
    </main>
  );
}
