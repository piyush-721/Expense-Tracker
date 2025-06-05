import React from 'react';
import { PieChart, Pie, Cell, ResponsiveContainer } from 'recharts';
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

function categoryData(expenses) {
  const categoryTotals = expenses.reduce((acc, curr) => {
    const { category, price } = curr;
    acc[category] = (acc[category] || 0) + parseFloat(price);
    return acc;
  }, {});

  return Object.entries(categoryTotals).map(([name, value]) => ({ name, value }));
}

export default function CircularPiChart() {
  const { expenses } = useExpenses();
  const data = categoryData(expenses);

  return (
    <div
      style={{
        width: '100%',
        maxWidth: '300px',
        height: 'auto',
        margin: '0 auto',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
      }}
    >
      <div style={{ width: '100%', height: 180 }}>
        <ResponsiveContainer width="100%" height="100%">
          <PieChart>
            <Pie
              data={data}
              cx="50%"
              cy="50%"
              labelLine={false}
              label={renderCustomizedLabel}
              outerRadius={80}
              fill="#8884d8"
              dataKey="value"
            >
              {data.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
              ))}
            </Pie>
          </PieChart>
        </ResponsiveContainer>
      </div>

      {/* Legend - HORIZONTAL */}
      <div
        style={{
          display: 'flex',
          justifyContent: 'space-between',
          gap: '8px',
          width: '100%',
          marginTop: '12px',
        }}
      >
        <p style={{ display: 'flex', alignItems: 'center', gap: '6px', color: '#FFFFFF', fontSize: '1rem' }}>
          <span
            style={{
              width: '20px',
              height: '10px',
              backgroundColor: '#A000FF',
              borderRadius: '2px',
              display: 'inline-block',
            }}
          ></span>
          Food
        </p>
        <p style={{ display: 'flex', alignItems: 'center', gap: '6px', color: '#FFFFFF', fontSize: '1rem' }}>
          <span
            style={{
              width: '20px',
              height: '10px',
              backgroundColor: '#FF9304',
              borderRadius: '2px',
              display: 'inline-block',
            }}
          ></span>
          Entertainment
        </p>
        <p style={{ display: 'flex', alignItems: 'center', gap: '6px', color: '#FFFFFF', fontSize: '1rem' }}>
          <span
            style={{
              width: '20px',
              height: '10px',
              backgroundColor: '#FDE006',
              borderRadius: '2px',
              display: 'inline-block',
            }}
          ></span>
          Travel
        </p>
      </div>
    </div>
  );
}
