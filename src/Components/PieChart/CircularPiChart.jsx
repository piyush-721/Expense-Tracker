import React, { PureComponent } from 'react';
import { PieChart, Pie, Sector, Cell, ResponsiveContainer } from 'recharts';
import { useExpenses } from '../../Contexts/ExpenseContext';

const COLORS = ['#FF9304', '#A000FF', '#FDE006'];

const RADIAN = Math.PI / 180;
const renderCustomizedLabel = ({ cx, cy, midAngle, innerRadius, outerRadius, percent }) => {
  const radius = innerRadius + (outerRadius - innerRadius) * 0.5;
  const x = cx + radius * Math.cos(-midAngle * RADIAN);
  const y = cy + radius * Math.sin(-midAngle * RADIAN);

  return (
    <text x={x} y={y} fill="white" textAnchor={x > cx ? 'start' : 'end'} dominantBaseline="central">
      {`${(percent * 100).toFixed(0)}%`}
    </text>
  );
};

function categoryData(expenses){
  const categoryTotals = expenses.reduce((acc, curr) => {
    const {category, price} = curr;
    acc[category] = (acc[category] || 0) + parseFloat(price);
    return acc;
  }, {});

  return Object.entries(categoryTotals).map(([name, value]) => ({name, value}));
}

export default function CircularPiChart() {

  const {expenses, setExpenses} = useExpenses();

  const data = categoryData(expenses);

 return (
    <div style={{ width: '25%', height: 145 }}>
      <ResponsiveContainer>
        <PieChart>
          <Pie
            data={data}
            cx="50%"
            cy="50%"
            labelLine={false}
            label={renderCustomizedLabel}
            outerRadius={70}
            fill="#8884d8"
            dataKey="value"
          >
            {data.map((entry, index) => (
              <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
            ))}
          </Pie>
        </PieChart>
      </ResponsiveContainer>

      <div style={{ display: "flex", justifyContent: "space-around" }}>
        <p style={{ display: "flex", alignItems: "center", gap: "6px", color:"#FFFFFF" }}>
          <span style={{
            width: '20px',
            height: '10px',
            backgroundColor: '#A000FF',
            borderRadius: '2px',
            display: 'inline-block'
          }}></span>
          Food
        </p>
        <p style={{ display: "flex", alignItems: "center", gap: "6px", color:"#FFFFFF" }}>
          <span style={{
            width: '20px',
            height: '10px',
            backgroundColor: '#FF9304',
            borderRadius: '2px',
            display: 'inline-block'
          }}></span>
          Entertainment
        </p>
        <p style={{ display: "flex", alignItems: "center", gap: "6px", color:"#FFFFFF" }}>
          <span style={{
            width: '20px',
            height: '10px',
            backgroundColor: '#FDE006',
            borderRadius: '2px',
            display: 'inline-block'
          }}></span>
          Travel
        </p>
      </div>

    </div>
  );
}