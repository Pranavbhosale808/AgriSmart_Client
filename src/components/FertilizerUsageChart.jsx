import React from "react";
import { BarChart, Bar, XAxis, YAxis, Tooltip, CartesianGrid, ResponsiveContainer } from "recharts";

const data = [
  { crop: "Rice", urea: 50, dap: 40, npk: 30 },
  { crop: "Wheat", urea: 45, dap: 35, npk: 25 },
  { crop: "Maize", urea: 55, dap: 45, npk: 35 },
  { crop: "Cotton", urea: 40, dap: 30, npk: 20 },
];

const FertilizerUsageChart = () => {
  return (
    <div className="bg-white p-4 shadow-md rounded-lg">
      <h2 className="text-xl font-bold text-center mb-4">Crop-wise Fertilizer Usage</h2>
      <ResponsiveContainer width="100%" height={300}>
        <BarChart data={data} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="crop" />
          <YAxis />
          <Tooltip />
          <Bar dataKey="urea" fill="#8884d8" name="Urea" />
          <Bar dataKey="dap" fill="#82ca9d" name="DAP" />
          <Bar dataKey="npk" fill="#ffc658" name="NPK" />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
};

export default FertilizerUsageChart;
