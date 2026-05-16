import React, { useEffect, useState } from "react";
import axios from "axios";

import {
  PieChart, Pie, Cell,
  BarChart, Bar,
  XAxis, YAxis, Tooltip, ResponsiveContainer
} from "recharts";

export default function Analytics() {
  const API = "http://127.0.0.1:8000/products";
  const [products, setProducts] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const res = await axios.get(API);
      setProducts(res.data);
    };
    fetchData();
  }, []);

  // 📊 Basic calculations
  const totalRevenue = products.reduce(
    (acc, p) => acc + Number(p.price || 0),
    0
  );

  const totalCost = products.reduce(
    (acc, p) => acc + Number(p.cost || 0),
    0
  );

  const profit = totalRevenue - totalCost;

  // 📦 Category distribution
  const categoryData = Object.values(
    products.reduce((acc, p) => {
      acc[p.category] = acc[p.category] || { name: p.category, value: 0 };
      acc[p.category].value += 1;
      return acc;
    }, {})
  );

  // 💰 Top expensive products
  const topProducts = [...products]
    .sort((a, b) => b.price - a.price)
    .slice(0, 5)
    .map((p) => ({
      name: p.name,
      price: Number(p.price)
    }));

  const COLORS = ["#6366f1", "#22c55e", "#f59e0b", "#ef4444", "#14b8a6"];

  return (
    <div>
      <h1>📊 Analytics Dashboard</h1>

      {/* KPI ROW */}
      <div style={{
        display: "grid",
        gridTemplateColumns: "repeat(3, 1fr)",
        gap: 20,
        marginTop: 20
      }}>
        <Card title="Revenue" value={`$${totalRevenue}`} />
        <Card title="Cost" value={`$${totalCost}`} />
        <Card title="Profit" value={`$${profit}`} />
      </div>

      {/* CHARTS SECTION */}
      <div style={{
        display: "grid",
        gridTemplateColumns: "1fr 1fr",
        gap: 30,
        marginTop: 30
      }}>

        {/* PIE CHART */}
        <div style={boxStyle}>
          <h3> Product Categories</h3>

          <ResponsiveContainer width="100%" height={250}>
            <PieChart>
              <Pie
                data={categoryData}
                dataKey="value"
                nameKey="name"
                outerRadius={90}
                fill="#8884d8"
              >
                {categoryData.map((_, index) => (
                  <Cell key={index} fill={COLORS[index % COLORS.length]} />
                ))}
              </Pie>
              <Tooltip />
            </PieChart>
          </ResponsiveContainer>
        </div>

        {/* BAR CHART */}
        <div style={boxStyle}>
          <h3> Top Products by Price</h3>

          <ResponsiveContainer width="100%" height={250}>
            <BarChart data={topProducts}>
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip />
              <Bar dataKey="price" fill="#6366f1" />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
}

function Card({ title, value }) {
  return (
    <div style={{
      background: "white",
      padding: 20,
      borderRadius: 12,
      boxShadow: "0 2px 10px rgba(0,0,0,0.05)"
    }}>
      <p style={{ margin: 0, color: "#777" }}>{title}</p>
      <h2>{value}</h2>
    </div>
  );
}

const boxStyle = {
  background: "white",
  padding: 20,
  borderRadius: 12,
  boxShadow: "0 2px 10px rgba(0,0,0,0.05)"
};