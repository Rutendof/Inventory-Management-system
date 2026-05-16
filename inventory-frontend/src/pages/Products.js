import React, { useEffect, useRef, useState } from "react";
import axios from "axios";

export default function Products() {
  const API = "http://127.0.0.1:8000/products";

  const [products, setProducts] = useState([]);
  const [search, setSearch] = useState("");

  // Modal + form state
  const [showModal, setShowModal] = useState(false);

  const [form, setForm] = useState({
    name: "",
    sku: "",
    category: "",
    price: "",
    cost: "",
  });

  // CSV file state
  const [file, setFile] = useState(null);

  // File input ref
  const fileInputRef = useRef(null);

  useEffect(() => {
    fetchProducts();
  }, []);

  // FETCH PRODUCTS
  const fetchProducts = async () => {
    try {
      const res = await axios.get(API);
      setProducts(res.data || []);
    } catch (err) {
      console.error("Error fetching products:", err);
    }
  };

  // DELETE PRODUCT
  const deleteProduct = async (id) => {
    try {
      await axios.delete(`${API}/${id}`);
      setProducts((prev) => prev.filter((p) => p.id !== id));
    } catch (err) {
      console.error("Delete failed:", err);
    }
  };

  // ADD PRODUCT
  const addProduct = async () => {
    // VALIDATION
    if (
      !form.name ||
      !form.sku ||
      !form.category ||
      !form.price ||
      !form.cost
    ) {
      alert("Please fill in all fields");
      return;
    }

    try {
      const payload = {
        name: form.name.trim(),
        sku: form.sku.trim(),
        category: form.category.trim(),
        price: Number(form.price),
        cost: Number(form.cost),
      };

      const res = await axios.post(API, payload);

      setProducts((prev) => [...prev, res.data]);

      // RESET FORM
      setForm({
        name: "",
        sku: "",
        category: "",
        price: "",
        cost: "",
      });

      setShowModal(false);

      alert("Product added successfully!");
    } catch (err) {
      console.error("Add product failed:", err);
      alert("Failed to add product");
    }
  };

  // CSV UPLOAD
  const uploadCSV = async () => {
    if (!file) {
      alert("Please choose a CSV file first");
      return;
    }

    const formData = new FormData();
    formData.append("file", file);

    try {
      const response = await axios.post(
        "http://127.0.0.1:8000/upload-csv",
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );

      console.log("UPLOAD RESPONSE:", response.data);

      alert("CSV uploaded successfully!");

      // REFRESH PRODUCTS
      const refreshed = await axios.get(API);

      setProducts(refreshed.data || []);

      // CLEAR FILE
      setFile(null);

      // RESET INPUT
      if (fileInputRef.current) {
        fileInputRef.current.value = "";
      }

    } catch (err) {
      console.error("FULL ERROR:", err);

      if (err.response) {
        console.error("SERVER RESPONSE:", err.response.data);

        alert(
          err.response.data.detail ||
          "Server failed to process CSV"
        );
      } else if (err.request) {
        alert("Cannot connect to backend server");
      } else {
        alert("Upload failed");
      }
    }
  };

  // FILTER PRODUCTS
  const filtered = products.filter((p) => {
    const name = (p?.name || "").toLowerCase();
    const sku = (p?.sku || "").toLowerCase();
    const q = search.toLowerCase();

    return name.includes(q) || sku.includes(q);
  });

  return (
    <div style={styles.page}>
      {/* HEADER */}
      <div style={styles.header}>
        <div>
          <h1 style={styles.title}>Products</h1>

          <p style={styles.subtitle}>
            Manage inventory, pricing, and product performance
          </p>
        </div>

        <div style={styles.actions}>
          {/* SEARCH */}
          <input
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search products or SKU..."
            style={styles.search}
          />

          {/* HIDDEN FILE INPUT */}
          <input
            type="file"
            accept=".csv"
            ref={fileInputRef}
            onChange={(e) => setFile(e.target.files[0])}
            style={{ display: "none" }}
          />

          {/* CHOOSE CSV BUTTON */}
          <button
            style={styles.secondaryBtn}
            onClick={() => fileInputRef.current.click()}
          >
            {file ? file.name : "Choose CSV"}
          </button>

          {/* UPLOAD BUTTON */}
          <button
            style={{
              ...styles.addBtn,
              opacity: !file ? 0.6 : 1,
              cursor: !file ? "not-allowed" : "pointer",
            }}
            onClick={uploadCSV}
            disabled={!file}
          >
            Upload CSV
          </button>

          {/* ADD PRODUCT BUTTON */}
          <button
            style={styles.addBtn}
            onClick={() => setShowModal(true)}
          >
            + Add Product
          </button>
        </div>
      </div>

      {/* STATS */}
      <div style={styles.statsRow}>
        <Stat label="Total Products" value={products.length} />

        <Stat
          label="Categories"
          value={[...new Set(products.map((p) => p.category))].length}
        />

        <Stat
          label="Avg Price"
          value={`$${(
            products.reduce((a, b) => a + (b.price || 0), 0) /
            (products.length || 1)
          ).toFixed(2)}`}
        />
      </div>

      {/* TABLE */}
      <div
        style={{
          ...styles.tableCard,
          maxHeight: "60vh",
          overflowY: "auto",
        }}
      >
        {/* TABLE HEADER */}
        <div
          style={{
            ...styles.tableHeader,
            position: "sticky",
            top: 0,
            zIndex: 1,
          }}
        >
          <div>Product</div>
          <div>SKU</div>
          <div>Category</div>
          <div>Price</div>
          <div>Profit</div>
          <div>Action</div>
        </div>

        {/* EMPTY STATE */}
        {filtered.length === 0 ? (
          <div style={styles.empty}>No products found</div>
        ) : (
          filtered.map((p) => {
            const profit = (p.price || 0) - (p.cost || 0);

            const isProfit = profit >= 0;

            return (
              <div key={p.id} style={styles.row}>
                {/* PRODUCT */}
                <div>
                  <div style={styles.productName}>
                    {p.name || "Unnamed"}
                  </div>

                  <div style={styles.smallText}>
                    {isProfit ? "Healthy margin" : "Low margin"}
                  </div>
                </div>

                {/* SKU */}
                <div style={styles.mono}>
                  {p.sku || "N/A"}
                </div>

                {/* CATEGORY */}
                <div>
                  <span style={styles.badge}>
                    {p.category || "Other"}
                  </span>
                </div>

                {/* PRICE */}
                <div style={styles.price}>
                  ${Number(p.price || 0).toFixed(2)}
                </div>

                {/* PROFIT */}
                <div>
                  <span
                    style={{
                      ...styles.badge,
                      background: isProfit
                        ? "#dcfce7"
                        : "#fee2e2",

                      color: isProfit
                        ? "#166534"
                        : "#991b1b",
                    }}
                  >
                    ${profit.toFixed(2)}
                  </span>
                </div>

                {/* DELETE */}
                <div>
                  <button
                    onClick={() => deleteProduct(p.id)}
                    style={styles.deleteBtn}
                  >
                    Delete
                  </button>
                </div>
              </div>
            );
          })
        )}
      </div>

      {/* ADD PRODUCT MODAL */}
      {showModal && (
        <div style={styles.modalOverlay}>
          <div style={styles.modal}>
            <h2 style={{ marginTop: 0 }}>
              Add Product
            </h2>

            {/* NAME */}
            <input
              placeholder="Product Name"
              value={form.name}
              onChange={(e) =>
                setForm({
                  ...form,
                  name: e.target.value,
                })
              }
              style={styles.input}
            />

            {/* SKU */}
            <input
              placeholder="SKU Code"
              value={form.sku}
              onChange={(e) =>
                setForm({
                  ...form,
                  sku: e.target.value,
                })
              }
              style={styles.input}
            />

            {/* CATEGORY */}
            <input
              placeholder="Category"
              value={form.category}
              onChange={(e) =>
                setForm({
                  ...form,
                  category: e.target.value,
                })
              }
              style={styles.input}
            />

            {/* PRICE */}
            <input
              placeholder="Selling Price"
              type="number"
              min="0"
              value={form.price}
              onChange={(e) =>
                setForm({
                  ...form,
                  price: e.target.value,
                })
              }
              style={styles.input}
            />

            {/* COST */}
            <input
              placeholder="Cost Price"
              type="number"
              min="0"
              value={form.cost}
              onChange={(e) =>
                setForm({
                  ...form,
                  cost: e.target.value,
                })
              }
              style={styles.input}
            />

            {/* BUTTONS */}
            <div style={{ display: "flex", gap: "10px" }}>
              <button
                style={styles.saveBtn}
                onClick={addProduct}
              >
                Save Product
              </button>

              <button
                style={styles.cancelBtn}
                onClick={() => setShowModal(false)}
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

/* REUSABLE STAT CARD */
function Stat({ label, value }) {
  return (
    <div style={styles.statCard}>
      <div style={styles.statLabel}>{label}</div>

      <div style={styles.statValue}>{value}</div>
    </div>
  );
}

/* STYLES */
const styles = {
  page: {
    padding: "20px",
    background: "#f6f7fb",
    minHeight: "100vh",
  },

  header: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: "20px",
    gap: "20px",
  },

  actions: {
    display: "flex",
    gap: "10px",
    alignItems: "center",
    flexWrap: "wrap",
  },

  title: {
    margin: 0,
    fontSize: "26px",
    fontWeight: "700",
  },

  subtitle: {
    margin: 0,
    fontSize: "13px",
    color: "#6b7280",
  },

  search: {
    padding: "10px 14px",
    borderRadius: "10px",
    border: "1px solid #e5e7eb",
    width: "260px",
    outline: "none",
    background: "white",
  },

  addBtn: {
    background: "#111827",
    color: "white",
    border: "none",
    padding: "10px 14px",
    borderRadius: "10px",
    cursor: "pointer",
    fontWeight: "600",
  },

  secondaryBtn: {
    background: "white",
    color: "#111827",
    border: "1px solid #d1d5db",
    padding: "10px 14px",
    borderRadius: "10px",
    cursor: "pointer",
    fontWeight: "600",
  },

  statsRow: {
    display: "flex",
    gap: "12px",
    marginBottom: "20px",
  },

  statCard: {
    background: "white",
    padding: "12px 16px",
    borderRadius: "12px",
    flex: 1,
    boxShadow: "0 2px 10px rgba(0,0,0,0.05)",
  },

  statLabel: {
    fontSize: "12px",
    color: "#6b7280",
  },

  statValue: {
    fontSize: "18px",
    fontWeight: "700",
    marginTop: "4px",
  },

  tableCard: {
    background: "white",
    borderRadius: "14px",
    overflow: "hidden",
    boxShadow: "0 4px 20px rgba(0,0,0,0.06)",
  },

  tableHeader: {
    display: "grid",
    gridTemplateColumns: "2fr 1fr 1fr 1fr 1fr 1fr",
    padding: "14px",
    background: "#f9fafb",
    fontSize: "12px",
    fontWeight: "700",
    color: "#374151",
  },

  row: {
    display: "grid",
    gridTemplateColumns: "2fr 1fr 1fr 1fr 1fr 1fr",
    padding: "14px",
    borderTop: "1px solid #f1f1f1",
    alignItems: "center",
  },

  productName: {
    fontWeight: "600",
  },

  smallText: {
    fontSize: "11px",
    color: "#6b7280",
    marginTop: "2px",
  },

  mono: {
    fontFamily: "monospace",
    fontSize: "13px",
  },

  price: {
    fontWeight: "600",
  },

  badge: {
    background: "#eef2ff",
    color: "#3730a3",
    padding: "4px 10px",
    borderRadius: "999px",
    fontSize: "12px",
  },

  deleteBtn: {
    background: "#ef4444",
    color: "white",
    border: "none",
    padding: "6px 10px",
    borderRadius: "8px",
    cursor: "pointer",
    fontSize: "12px",
    fontWeight: "600",
  },

  empty: {
    padding: "20px",
    textAlign: "center",
    color: "#6b7280",
  },

  modalOverlay: {
    position: "fixed",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    background: "rgba(0,0,0,0.4)",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    zIndex: 1000,
  },

  modal: {
    background: "white",
    padding: "24px",
    borderRadius: "14px",
    width: "360px",
    display: "flex",
    flexDirection: "column",
    gap: "12px",
    boxShadow: "0 10px 30px rgba(0,0,0,0.15)",
  },

  input: {
    padding: "12px",
    borderRadius: "10px",
    border: "1px solid #ddd",
    outline: "none",
    fontSize: "14px",
  },

  saveBtn: {
    flex: 1,
    background: "#10b981",
    color: "white",
    border: "none",
    padding: "12px",
    borderRadius: "10px",
    cursor: "pointer",
    fontWeight: "600",
  },

  cancelBtn: {
    flex: 1,
    background: "#6b7280",
    color: "white",
    border: "none",
    padding: "12px",
    borderRadius: "10px",
    cursor: "pointer",
    fontWeight: "600",
  },
};