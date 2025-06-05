import React from "react";
import {
  BarChart,
  Bar,
  YAxis,
  XAxis,
  ResponsiveContainer,
  Cell,
} from "recharts";
import { useExpenses } from "../../Contexts/ExpenseContext";
import styles from "./CategoryBarChart.module.css";

const COLORS = ["#8784D2", "#8784D2", "#8784D2"];

function categoryData(expenses) {
  const categoryTotals = expenses.reduce((acc, curr) => {
    const { category, price } = curr;
    acc[category] = (acc[category] || 0) + parseFloat(price);
    return acc;
  }, {});
  return Object.entries(categoryTotals).map(([name, value]) => ({
    name,
    value,
  }));
}

export default function CategoryBarChart() {
  const { expenses } = useExpenses();
  const data = categoryData(expenses);

  return (
    <div className={styles.chartContainer}>
      <ResponsiveContainer width="100%" height={220}>
        <BarChart
          layout="vertical"
          data={data}
          margin={{ top: 10, right: 10, left: 40, bottom: 10 }}
        >
          <XAxis type="number" axisLine={false} tickLine={false} hide />
          <YAxis
            dataKey="name"
            type="category"
            axisLine={false}
            tickLine={false}
            tick={{ fontSize: 12 }}
          />
          <Bar dataKey="value" barSize={20} radius={[0, 20, 20, 0]}>
            {data.map((entry, index) => (
              <Cell
                key={`cell-${index}`}
                fill={COLORS[index % COLORS.length]}
              />
            ))}
          </Bar>
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}
