import React, { useState } from "react";
import { useParams } from "react-router-dom";
import LargeChart from "../../components/LargeChart";
import CandleChart from "../../components/CandleChart";

const sampleAsset = {
  symbol: "AAPL",
  name: "Apple Inc.",
  price: 197.23,
  change: 1.13,
  percent: 0.58,
  history: [
    // Demo for line chart
    { time: "09:30", price: 194.5 },
    { time: "10:00", price: 195.7 },
    { time: "10:30", price: 196.8 },
    { time: "11:00", price: 195.9 },
    { time: "13:00", price: 197.23 },
  ],
  volume: "23.4M",
  marketCap: "3.07T",
};

// DEMO candlestick data (use your backend later)
const candleData = [
  { x: new Date("2025-07-29T10:00:00"), y: [195.5, 198.1, 194.2, 197.2] },
  { x: new Date("2025-07-29T11:00:00"), y: [197.2, 199.2, 196.1, 198.4] },
  { x: new Date("2025-07-29T12:00:00"), y: [198.4, 198.7, 196.7, 197.1] },
  { x: new Date("2025-07-29T13:00:00"), y: [197.1, 197.9, 195.6, 196.3] },
];

const TIMEFRAMES = ["1D", "1M", "3M", "1Y", "5Y", "All"];

export default function Market() {
  const { symbol } = useParams();
  const [selectedTf, setSelectedTf] = useState("1D");
  const [chartType, setChartType] = useState("line");
  const asset = sampleAsset; // Swap with API data using `symbol` param.

  // If you support full timeframes, switch data here
  const chartData = asset.history;

  return (
    <main className="bg-white min-h-screen py-16 px-2">
      <section className="max-w-5xl mx-auto">
        {/* Asset header */}
        <div className="flex flex-col md:flex-row md:items-center md:gap-8 mb-4">
          <div>
            <h1 className="text-4xl font-bold text-navyblue mb-1">
              {asset.symbol} <span className="text-calmblue">{asset.name}</span>
            </h1>
            <div className="text-3xl font-extrabold text-navyblue mb-1">
              ${asset.price?.toLocaleString()}
            </div>
            <div className={`text-lg font-semibold ${asset.change >= 0 ? "text-green-600" : "text-red-600"}`}>
              {asset.change >= 0 ? "+" : ""}
              {asset.change} ({asset.percent >= 0 ? "+" : ""}
              {asset.percent}%)
            </div>
          </div>
        </div>

        {/* Chart controls */}
        <div className="flex items-center justify-end gap-3 mb-6">
          {TIMEFRAMES.map(tf => (
            <button
              key={tf}
              className={`px-3 py-1 rounded ${selectedTf === tf ? "bg-calmblue text-white" : "bg-gray-200 text-navyblue"}`}
              onClick={() => setSelectedTf(tf)}
            >
              {tf}
            </button>
          ))}
          <button
            className={`ml-6 px-3 py-1 rounded ${chartType === "candlestick" ? "bg-calmblue text-white" : "bg-gray-200 text-navyblue"}`}
            onClick={() => setChartType(chartType === "line" ? "candlestick" : "line")}
          >
            {chartType === "candlestick" ? "Candlesticks" : "Line"}
          </button>
        </div>

        {/* Chart */}
        <div className="bg-calmblue/10 p-8 rounded-2xl shadow-md mb-7">
          {chartType === "candlestick"
            ? <CandleChart data={candleData} />
            : <LargeChart data={chartData} />
          }
          <div className="text-center text-gray-500 mt-2">
            {chartType === "candlestick"
              ? "Candlestick chart (demo data)"
              : "Line chart (demo data)"}
          </div>
        </div>

        {/* Stats */}
        <div className="flex gap-8 flex-wrap mb-12">
          <div className="bg-white rounded shadow p-4 w-48">
            <div className="text-gray-500">Volume</div>
            <div className="text-xl font-bold text-navyblue">{asset.volume}</div>
          </div>
          <div className="bg-white rounded shadow p-4 w-48">
            <div className="text-gray-500">Market Cap</div>
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
