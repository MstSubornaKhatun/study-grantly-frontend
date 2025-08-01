import React from "react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

const dummyData = [
  { name: "Users", count: 25 },
  { name: "Scholarships", count: 10 },
  { name: "Applications", count: 40 },
  { name: "Reviews", count: 15 },
  { name: "Payments", count: 8 },
];

const AnalyticsChart = () => {
  return (
    <div className="p-6 bg-white rounded-md shadow-md max-w-4xl mx-auto">
      <h2 className="text-2xl font-bold mb-6 text-[#640d14]">
        Admin Analytics Dashboard
      </h2>

      <ResponsiveContainer width="100%" height={350}>
        <BarChart data={dummyData}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="name" />
          <YAxis allowDecimals={false} />
          <Tooltip />
          <Bar dataKey="count" fill="#640d14" radius={[6, 6, 0, 0]} />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
};

export default AnalyticsChart;