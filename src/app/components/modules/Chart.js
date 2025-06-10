"use client"
import { useState } from "react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

const mockData = {
  "12H": [
    { time: "0h", value: 104000 },
    { time: "2h", value: 104500 },
    { time: "4h", value: 105000 },
    { time: "6h", value: 105500 },
    { time: "8h", value: 106000 },
    { time: "10h", value: 107000 },
    { time: "12h", value: 106800 },
  ],
  "1D": [
    { time: "0h", value: 103000 },
    { time: "12h", value: 106800 },
    { time: "24h", value: 104500 },
  ],
  "1W": [
    { time: "Mon", value: 101000 },
    { time: "Tue", value: 103000 },
    { time: "Wed", value: 106000 },
    { time: "Thu", value: 107000 },
    { time: "Fri", value: 104000 },
    { time: "Sat", value: 105000 },
    { time: "Sun", value: 106784 },
  ],
  "1M": [
    { time: "Week 1", value: 95000 },
    { time: "Week 2", value: 98000 },
    { time: "Week 3", value: 103000 },
    { time: "Week 4", value: 106784 },
  ],
  "3M": [
    { time: "Jan", value: 87000 },
    { time: "Feb", value: 95000 },
    { time: "Mar", value: 106784 },
  ],
  "1Y": [
    { time: "2024 Q1", value: 76000 },
    { time: "Q2", value: 85000 },
    { time: "Q3", value: 98000 },
    { time: "Q4", value: 106784 },
  ],
  "ALL": [
    { time: "2017", value: 1000 },
    { time: "2019", value: 5000 },
    { time: "2021", value: 20000 },
    { time: "2023", value: 40000 },
    { time: "Now", value: 106784 },
  ],
};

const getLineColor = (data) => {
  const diff = data[data.length - 1].value - data[0].value;
  if (diff > 1000) return "#22c55e"; // green
  if (diff < -1000) return "#ef4444"; // red
  return "#eab308"; // yellow
};

export default function Chart() {
  const [timeframe, setTimeframe] = useState("12H");
  const data = mockData[timeframe];
  const lineColor = getLineColor(data);

  const timeframes = ["12H", "1D", "1W", "1M", "3M", "1Y", "ALL"];

  return (
    <div className="p-4 bg-gray-900 w-full text-white rounded-2xl shadow-xl max-w-4xl mx-auto">
      <h2 className="text-2xl font-bold mb-4">Bitcoin</h2>
      <p className="text-4xl font-semibold text-green-400 mb-2">$106,784.4</p>
      <p className="text-sm text-green-500 mb-4">+$1,285.78 (1.218%)</p>

      {/* Custom styled tab buttons like the screenshot */}
      <div className="flex gap-2 mb-4">
        {timeframes.map((frame) => (
          <button
            key={frame}
            onClick={() => setTimeframe(frame)}
            className={`px-3 py-1 rounded-full text-xs font-medium border transition-colors duration-200 ${
              timeframe === frame
                ? "bg-orange-500 text-white border-orange-500"
                : "bg-transparent text-gray-300 border-gray-600 hover:border-orange-500 hover:text-white"
            }`}
          >
            {frame}
          </button>
        ))}
      </div>

      <ResponsiveContainer width="100%" height={300}>
        <LineChart data={data}>
          <XAxis dataKey="time" stroke="#ccc" />
          <YAxis stroke="#ccc" domain={["auto", "auto"]} />
          <Tooltip formatter={(value) => `$${value}`} />
          <Line type="monotone" dataKey="value" stroke={lineColor} strokeWidth={3} dot={false} />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
}