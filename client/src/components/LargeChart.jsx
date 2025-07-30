import React from "react";
import {
  LineChart, Line, XAxis, YAxis, Tooltip, CartesianGrid, ResponsiveContainer
} from "recharts";

export default function LargeChart({ data }) {
  return (
    <ResponsiveContainer width="100%" height={260}>
      <LineChart data={data} margin={{ top: 5, right: 18, left: 0, bottom: 5 }}>
        <CartesianGrid stroke="#e6ecf5" strokeDasharray="5 5" />
        <XAxis dataKey="time" />
        <YAxis domain={["auto", "auto"]} />
        <Tooltip />
        <Line type="monotone" dataKey="price" stroke="#25b1ff" strokeWidth={3} dot={false} />
      </LineChart>
    </ResponsiveContainer>
  );
}
