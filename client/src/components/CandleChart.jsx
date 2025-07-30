import React from "react";
import ReactApexChart from "react-apexcharts";

export default function CandleChart({ data }) {
  const series = [{ data }];

  const options = {
    chart: { type: "candlestick", height: 260 },
    xaxis: { type: "datetime" },
    yaxis: { tooltip: { enabled: true } },
    tooltip: { enabled: true },
    grid: { borderColor: "#e6ecf5" },
    title: { text: "", align: "left" },
  };

  return (
    <ReactApexChart
      options={options}
      series={series}
      type="candlestick"
      height={260}
    />
  );
}
