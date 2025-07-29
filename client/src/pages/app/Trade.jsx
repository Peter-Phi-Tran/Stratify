// src/pages/app/Trade.jsx

import React, { useState } from "react";

// Example asset options—for now, hard-coded
const assets = [
  { symbol: "AAPL", name: "Apple Inc.", price: 197.23 },
  { symbol: "TSLA", name: "Tesla Inc.", price: 276.11 },
  { symbol: "BTC-USD", name: "Bitcoin", price: 67892 },
];

export default function Trade() {
  const [form, setForm] = useState({
    action: "buy",
    asset: assets[0].symbol,
    quantity: "",
  });
  const [confirm, setConfirm] = useState("");
  const asset = assets.find(a => a.symbol === form.asset);

  const handleChange = e => {
    setForm({ ...form, [e.target.name]: e.target.value });
    setConfirm("");
  };

  const handleSubmit = e => {
    e.preventDefault();
    if (!form.quantity || isNaN(form.quantity) || form.quantity <= 0) return;
    // Place trade here (API/Socket)
    setConfirm(`${form.action === "buy" ? "Bought" : "Sold"} ${form.quantity} ${asset.symbol} @ $${asset.price}`);
    setForm({ ...form, quantity: "" });
  };

  return (
    <main className="bg-white min-h-screen py-16 px-2 flex flex-col items-center">
      <section className="w-full max-w-md bg-calmblue/10 rounded-xl shadow p-10">
        <h1 className="text-3xl font-bold mb-6 text-navyblue">Place a Trade</h1>

        <form className="space-y-5" onSubmit={handleSubmit}>
          <div>
            <label className="block text-gray-700 font-medium mb-1">Action</label>
            <select
              name="action"
              value={form.action}
              onChange={handleChange}
              className="w-full rounded border px-4 py-2 bg-white"
            >
              <option value="buy">Buy</option>
              <option value="sell">Sell</option>
            </select>
          </div>
          <div>
            <label className="block text-gray-700 font-medium mb-1">Asset</label>
            <select
              name="asset"
              value={form.asset}
              onChange={handleChange}
              className="w-full rounded border px-4 py-2 bg-white"
            >
              {assets.map(a => (
                <option key={a.symbol} value={a.symbol}>
                  {a.symbol} ({a.name})
                </option>
              ))}
            </select>
          </div>
          <div>
            <label className="block text-gray-700 font-medium mb-1">Quantity</label>
            <input
              type="number"
              name="quantity"
              step="any"
              min="0"
              value={form.quantity}
              onChange={handleChange}
              className="w-full rounded border px-4 py-2 bg-white"
              placeholder="Amount"
            />
          </div>
          <div className="flex items-center justify-between">
            <div className="text-gray-600">Est. Price: <span className="font-bold text-navyblue">${asset.price}</span></div>
            <div className="text-gray-600">
              Total: <span className="font-bold text-calmblue">
                ${form.quantity ? (form.quantity * asset.price).toLocaleString(undefined, { maximumFractionDigits: 2 }) : "0.00"}
              </span>
            </div>
          </div>
          <button
            type="submit"
            className="w-full bg-calmblue hover:bg-navyblue text-lg font-bold text-white py-3 rounded-xl transition"
            disabled={!form.quantity || isNaN(form.quantity) || form.quantity <= 0}
          >
            {form.action === "buy" ? "Buy" : "Sell"} {asset.symbol}
          </button>
        </form>

        {confirm && (
          <div className="bg-green-100 text-green-800 rounded p-3 mt-6 text-center font-semibold">
            {confirm}! (Simulated)
          </div>
        )}
      </section>
    </main>
  );
}
