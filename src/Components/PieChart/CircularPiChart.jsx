import React from 'react';
import { PieChart, Pie, Cell, ResponsiveContainer } from 'recharts';
import { useExpenses } from '../../Contexts/ExpenseContext';
import styles from './CircularPiChart.module.css';

// ✅ FIXED: Consistent category-to-color mapping
const CATEGORY_COLORS = {
  'Food': '#A000FF',        // Purple
  'Entertainment': '#FF9304', // Orange  
  'Travel': '#FDE006'       // Yellow
};

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
    <div className={styles.container}>
      <div className={styles.chartWrapper}>
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
                <Cell 
                  key={`cell-${index}`} 
                  fill={CATEGORY_COLORS[entry.name] || '#8884d8'} 
                />
              ))}
            </Pie>
          </PieChart>
        </ResponsiveContainer>
      </div>

      <div className={styles.legend}>
        <p>
          <span className={styles.colorBox} style={{ backgroundColor: '#A000FF' }}></span>
          Food
        </p>
        <p>
          <span className={styles.colorBox} style={{ backgroundColor: '#FF9304' }}></span>
          Entertainment
        </p>
        <p>
          <span className={styles.colorBox} style={{ backgroundColor: '#FDE006' }}></span>
          Travel
        </p>
      </div>
    </div>
  );
}
