import "./styles.css";
import React from "react";
import { BarChart, Bar, YAxis, XAxis } from "recharts";

const data = [
  { name: "A", uv: 4000 },
  { name: "B", uv: 3000 },
  { name: "C", uv: 2000 },
];

export default function App() {
  return (
    <BarChart
      layout="vertical"
      width={500}
      height={300}
      data={data}
      margin={{ top: 5, right: 5, left: 5, bottom: 5 }}
    >
      <XAxis type="number" hide /> {/* Required for layout="vertical" */}
      <YAxis dataKey="name" type="category" hide /> {/* Positions bars */}
      <Bar dataKey="uv" barSize={20} fill="#8884d8" />
    </BarChart>
  );
}
