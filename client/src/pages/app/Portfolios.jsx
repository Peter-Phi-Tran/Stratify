// src/pages/app/Portfolios.jsx
import React from "react";

const mockPortfolios = [
  {
    name: "Main Portfolio",
    value: 105670,
    profit: 3560,
    positions: [
      { symbol: "AAPL", quantity: 12, avg: 183.10, price: 197.22, pl: 170 },
      { symbol: "TSLA", quantity: 4, avg: 320.00, price: 276.11, pl: -176 },
    ],
  },
  {
    name: "Growth Account",
    value: 40250,
    profit: -320,
    positions: [
      { symbol: "BTC-USD", quantity: 0.18, avg: 55000, price: 67892, pl: 2324 },
    ],
  },
];

export default function Portfolios() {
  return (
    <main className="bg-white min-h-screen py-16 px-2">
      <section className="max-w-5xl mx-auto">
        <h1 className="text-4xl font-extrabold text-navyblue mb-5">Your Portfolios</h1>
        <p className="mb-8 text-lg text-gray-700">
          Review, manage, and simulate trades across your multiple demonstration accounts.
        </p>
        <div className="grid sm:grid-cols-2 gap-8">
          {mockPortfolios.map((portfolio) => (
            <div key={portfolio.name} className="bg-calmblue/10 rounded-xl shadow p-6">
              <h2 className="text-xl font-bold text-navyblue mb-2">{portfolio.name}</h2>
              <div className="flex items-baseline gap-6 mb-3">
                <div className="text-lg text-gray-700">Value</div>
                <div className="text-2xl font-bold">${portfolio.value.toLocaleString()}</div>
              </div>
              <div className={`font-semibold ${portfolio.profit >= 0 ? "text-green-600" : "text-red-600"}`}>
                {portfolio.profit >= 0 ? "▲" : "▼"} ${portfolio.profit}
              </div>
              <div className="mt-4">
                <div className="font-bold text-calmblue mb-1">Positions</div>
                {portfolio.positions.length === 0 ? (
                  <div className="text-gray-400">No open positions.</div>
                ) : (
                  <table className="w-full text-sm mb-2">
                    <thead>
                      <tr>
                        <th className="text-left">Symbol</th>
                        <th className="text-right">Qty</th>
                        <th className="text-right">Avg Price</th>
                        <th className="text-right">Current</th>
                        <th className="text-right">P/L</th>
                      </tr>
                    </thead>
                    <tbody>
                      {portfolio.positions.map((p) => (
                        <tr key={p.symbol}>
                          <td className="font-mono">{p.symbol}</td>
                          <td className="text-right">{p.quantity}</td>
                          <td className="text-right">${p.avg}</td>
                          <td className="text-right">${p.price}</td>
                          <td className={`text-right ${p.pl >= 0 ? "text-green-600" : "text-red-600"}`}>{p.pl >= 0 ? "+" : ""}{p.pl}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                )}
                <a href="/trade" className="inline-block mt-2 px-4 py-2 rounded bg-calmblue text-white font-bold hover:bg-navyblue">Trade Now</a>
              </div>
            </div>
          ))}
        </div>
      </section>
    </main>
  );
}
