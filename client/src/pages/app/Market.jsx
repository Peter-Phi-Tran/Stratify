// src/pages/app/Market.jsx

import React, { useState } from "react";
import { useParams } from "react-router-dom";

// Temporary mock data—replace with API/socket data later
const sample = {
  symbol: "AAPL",
  name: "Apple Inc.",
  price: 197.23,
  change: 1.13,
  percent: 0.58,
  history: [193.5, 194.7, 196.8, 195.9, 197.23], // chart data
  volume: "23.4M",
  marketCap: "3.07T",
};

export default function Market() {
  const { symbol } = useParams(); // When routing as /market/:symbol
  const asset = sample; // Replace with dynamic fetch by symbol

  return (
    <main className="bg-white min-h-screen py-16 px-2">
      <section className="max-w-5xl mx-auto">
        <h1 className="text-4xl font-bold text-navyblue mb-2">{asset.symbol} <span className="text-calmblue">{asset.name}</span></h1>
        <div className="flex flex-col md:flex-row md:items-center md:gap-8 mb-7">
          <div className="text-3xl font-extrabold text-navyblue mb-1">${asset.price.toLocaleString()}</div>
          <div className={`text-lg font-semibold ml-2 ${asset.change >= 0 ? "text-green-600" : "text-red-600"}`}>
            {asset.change >= 0 ? "+" : ""}{asset.change} ({asset.percent >= 0 ? "+" : ""}{asset.percent}%)
          </div>
        </div>

        {/* Chart placeholder */}
        <div className="rounded-xl bg-calmblue/10 p-10 flex flex-col items-center justify-center mb-9" style={{ minHeight: 300 }}>
          {/* Substitute with your React chart component when ready */}
          <div className="text-xl text-calmblue font-bold mb-2">[Live chart coming soon]</div>
          <svg width="320" height="100" className="block">
            <polyline
              fill="none"
              stroke={asset.change >= 0 ? "#059669" : "#ef4444"}
              strokeWidth="4"
              points={asset.history.map((v, i) => `${i * 64},${100 - (v - 193) * 12}`).join(" ")}
            />
          </svg>
        </div>

        <div className="flex flex-wrap gap-8 mb-10">
          <div className="bg-white rounded shadow p-4 w-40">
            <div className="text-gray-500 font-medium">Volume</div>
            <div className="text-xl font-bold text-navyblue">{asset.volume}</div>
          </div>
          <div className="bg-white rounded shadow p-4 w-40">
            <div className="text-gray-500 font-medium">Market Cap</div>
            <div className="text-xl font-bold text-navyblue">{asset.marketCap}</div>
          </div>
        </div>

        <a
          href="/trade"
          className="inline-block px-8 py-3 bg-calmblue hover:bg-navyblue text-xl font-bold text-white rounded-xl transition"
        >
          Place a Trade
        </a>
      </section>
    </main>
  );
}
