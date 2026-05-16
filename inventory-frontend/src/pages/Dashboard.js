import React, { useEffect, useState } from "react";
import axios from "axios";

export default function Dashboard() {
  const API = "http://127.0.0.1:8000/products";
  const [products, setProducts] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const res = await axios.get(API);
      setProducts(res.data || []);
    };
    fetchData();
  }, []);

  const totalProducts = products.length;

  const totalRevenue = products.reduce((a, p) => a + (p.price || 0), 0);
  const totalCost = products.reduce((a, p) => a + (p.cost || 0), 0);
  const profit = totalRevenue - totalCost;

  const lowStockItems = products.filter((p) => (p.stock || 0) < 5);

  const topProfit = [...products]
    .map((p) => ({
      ...p,
      profit: (p.price || 0) - (p.cost || 0),
    }))
    .sort((a, b) => b.profit - a.profit)
    .slice(0, 5);

  const money = (v) =>
    new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
    }).format(v || 0);

  return (
    <div style={styles.page}>
      <div style={styles.header}>
        <h1 style={styles.title}> Inventory Management System</h1>
        <p style={styles.subtitle}>
          Real-time business overview of products, profit and stock performance
        </p>
      </div>

      <div style={styles.kpiGrid}>
        <KpiCard title="Total Products" value={totalProducts} color="#6366f1" />
        <KpiCard title="Revenue" value={money(totalRevenue)} color="#10b981" />
        <KpiCard title="Profit" value={money(profit)} color="#f59e0b" />
        <KpiCard
          title="Low Stock Items"
          value={lowStockItems.length}
          color="#ef4444"
        />
      </div>

      <div style={styles.grid}>
        {/* STOCK ALERTS (SCROLLABLE) */}
        <div style={styles.card}>
          <h3 style={styles.cardTitle}>⚠️ Stock Alerts</h3>

          <div style={styles.scrollArea}>
            {lowStockItems.length === 0 ? (
              <p style={styles.muted}>All products are well stocked.</p>
            ) : (
              lowStockItems.map((p) => (
                <div key={p.id} style={styles.alertItem}>
                  <strong>{p.name}</strong>
                  <span>Low stock ({p.stock || 0})</span>
                </div>
              ))
            )}
          </div>
        </div>

        {/* TOP PROFIT (SCROLLABLE) */}
        <div style={styles.card}>
          <h3 style={styles.cardTitle}>🔥 Top Profit Products</h3>

          <div style={styles.scrollArea}>
            {topProfit.map((p) => (
              <div key={p.id} style={styles.rowItem}>
                <div>
                  <strong>{p.name}</strong>
                  <div style={styles.muted}>{p.sku}</div>
                </div>
                <span style={styles.profitTag}>{money(p.profit)}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

function KpiCard({ title, value, color }) {
  return (
    <div style={{ ...styles.kpiCard, borderLeft: `5px solid ${color}` }}>
      <p style={styles.kpiTitle}>{title}</p>
      <h2 style={styles.kpiValue}>{value}</h2>
    </div>
  );
}

/* STYLES */
const styles = {
  page: {
    padding: "20px",
    background: "#f5f7fb",
    minHeight: "100vh",
    overflowY: "auto",
  },

  header: {
    marginBottom: "20px",
  },

  title: {
    margin: 0,
    fontSize: "26px",
  },

  subtitle: {
    margin: "5px 0 0",
    color: "#6b7280",
    fontSize: "14px",
  },

  kpiGrid: {
    display: "grid",
    gridTemplateColumns: "repeat(4, 1fr)",
    gap: "15px",
    marginBottom: "20px",
  },

  kpiCard: {
    background: "white",
    padding: "18px",
    borderRadius: "12px",
    boxShadow: "0 2px 10px rgba(0,0,0,0.05)",
  },

  kpiTitle: {
    margin: 0,
    fontSize: "13px",
    color: "#6b7280",
  },

  kpiValue: {
    margin: "5px 0 0",
    fontSize: "24px",
  },

  grid: {
    display: "grid",
    gridTemplateColumns: "1fr 1fr",
    gap: "20px",
  },

  /* BIG CARD */
  card: {
    background: "white",
    padding: "20px",
    borderRadius: "14px",
    boxShadow: "0 2px 10px rgba(0,0,0,0.05)",
    height: "420px",          // fixed height for scroll
    display: "flex",
    flexDirection: "column",
  },

  cardTitle: {
    marginBottom: "15px",
    fontSize: "18px",
  },

  /* SCROLL AREA INSIDE CARD */
  scrollArea: {
    flex: 1,
    overflowY: "auto",
    paddingRight: "6px",
  },

  alertItem: {
    background: "#fee2e2",
    padding: "12px",
    borderRadius: "10px",
    marginBottom: "10px",
    display: "flex",
    justifyContent: "space-between",
    color: "#991b1b",
    cursor: "pointer",
  },

  rowItem: {
    display: "flex",
    justifyContent: "space-between",
    padding: "12px",
    borderBottom: "1px solid #eee",
    cursor: "pointer",
  },

  profitTag: {
    fontWeight: "bold",
    color: "#10b981",
  },

  muted: {
    fontSize: "12px",
    color: "#6b7280",
  },
};