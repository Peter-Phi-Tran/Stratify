import React from "react";
import { LineChart, Line, ResponsiveContainer } from "recharts";

export default function MiniChart({ data, strokeColor = "#8884d8" }) {
  return (
    <ResponsiveContainer width={100} height={40}>
      <LineChart data={data} margin={{ top: 5, right: 5, left: 0, bottom: 5 }}>
        <Line type="monotone" dataKey="value" stroke={strokeColor} strokeWidth={2} dot={false} />
      </LineChart>
    </ResponsiveContainer>
  );
}
