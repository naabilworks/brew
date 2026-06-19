import { useState } from "react";
import { Search, Filter, Download, ChevronUp, ChevronDown } from "lucide-react";

const allOrders = [
  { id: "#0147", table: "T-03", cashier: "Andi",  items: "Es Kopi Susu × 2, Croissant × 1",     total: 4.5,  status: "Completed", time: "21:04", method: "Cash"   },
  { id: "#0146", table: "T-07", cashier: "Budi",  items: "Matcha Latte × 1, Avocado Toast × 2",  total: 7.5, status: "Completed", time: "20:58", method: "QRIS"   },
  { id: "#0145", table: "T-11", cashier: "Andi",  items: "Cold Brew × 3",                         total: 6,  status: "Serving",   time: "20:51", method: "QRIS"   },
  { id: "#0144", table: "T-02", cashier: "Sari",  items: "Es Kopi Susu × 1, Croissant × 2",      total: 5,  status: "Completed", time: "20:43", method: "Cash"   },
  { id: "#0143", table: "T-09", cashier: "Budi",  items: "Matcha Latte × 2",                      total: 4,  status: "Serving",   time: "20:38", method: "Debit"  },
  { id: "#0142", table: "T-05", cashier: "Sari",  items: "Avocado Toast × 1, Cold Brew × 1",     total: 5.5,  status: "Completed", time: "20:22", method: "QRIS"   },
  { id: "#0141", table: "T-01", cashier: "Andi",  items: "Es Kopi Susu × 3",                      total: 5,  status: "Completed", time: "20:10", method: "Cash"   },
  { id: "#0140", table: "T-08", cashier: "Budi",  items: "Croissant × 2, Matcha Latte × 1",      total: 5.5,  status: "Cancelled", time: "19:58", method: "Debit"  },
  { id: "#0139", table: "T-04", cashier: "Sari",  items: "Cold Brew × 2, Avocado Toast × 1",     total: 6.5,  status: "Completed", time: "19:44", method: "QRIS"   },
  { id: "#0138", table: "T-06", cashier: "Andi",  items: "Es Kopi Susu × 1, Matcha Latte × 1",  total: 3.5,  status: "Completed", time: "19:30", method: "Cash"   },
  { id: "#0137", table: "T-10", cashier: "Budi",  items: "Croissant × 3",                         total: 4,  status: "Completed", time: "19:15", method: "QRIS"   },
  { id: "#0136", table: "T-12", cashier: "Sari",  items: "Avocado Toast × 2",                     total: 4.5,  status: "Cancelled", time: "19:02", method: "Cash"   },
];

/* ---------- Palette (matched to Overview / Analytics) ---------- */
const COLORS = {
  bg: "#f5f0e8",
  card: "#ffffff",
  border: "#e8ddc9",
  rowBorder: "#f1e9da",
  headerBg: "#faf6ee",
  accent: "#c17a4f",
  accentSoft: "rgba(193, 122, 79, 0.14)",
  text: "#2b211b",
  textMid: "#6f6354",
  textMuted: "#9c8f7c",
};

const fmt = (v) =>
  `$${v.toLocaleString("en-US", { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`;

const statusStyle = {
  Completed: { color: "#3a7a4c", bg: "rgba(58, 122, 76, 0.1)",  dot: "#3a7a4c" },
  Serving:   { color: "#c17a4f", bg: "rgba(193, 122, 79, 0.12)", dot: "#c17a4f" },
  Cancelled: { color: "#b54a3f", bg: "rgba(181, 74, 63, 0.1)",   dot: "#b54a3f" },
};

/* Reusable style untuk semua angka agar konsisten */
const numberStyle = {
  fontFamily: "'Plus Jakarta Sans', sans-serif",
  fontWeight: 700,
};

export default function Transactions() {
  const [search, setSearch]       = useState("");
  const [statusFilter, setStatus] = useState("All");
  const [sortDir, setSortDir]     = useState("desc");

  const statuses = ["All", "Completed", "Serving", "Cancelled"];

  const filtered = allOrders
    .filter(o =>
      (statusFilter === "All" || o.status === statusFilter) &&
      (o.id.toLowerCase().includes(search.toLowerCase()) ||
       o.items.toLowerCase().includes(search.toLowerCase()) ||
       o.cashier.toLowerCase().includes(search.toLowerCase()))
    )
    .sort((a, b) => sortDir === "desc" ? b.total - a.total : a.total - b.total);

  const totalRevenue = filtered
    .filter(o => o.status === "Completed")
    .reduce((sum, o) => sum + o.total, 0);

  const exportCSV = () => {
    const headers = ["Order ID", "Table", "Cashier", "Items", "Total", "Method", "Status", "Time"];
    const rows = filtered.map(o => [o.id, o.table, o.cashier, `"${o.items}"`, o.total, o.method, o.status, o.time]);
    const csvContent = [headers.join(","), ...rows.map(r => r.join(","))].join("\n");
    const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.setAttribute("download", "transactions.csv");
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div className="p-4 sm:p-6 space-y-4 sm:space-y-5" style={{ background: COLORS.bg, minHeight: "100%" }}>

      {/* Header */}
      <div className="fade-up">
        <div className="flex items-center gap-2 mb-1">
          <span className="text-xs uppercase tracking-widest" style={{ color: COLORS.textMuted, letterSpacing: "0.1em" }}>Dashboard</span>
          <span style={{ color: COLORS.border }}>/</span>
          <span className="text-xs" style={{ color: COLORS.accent }}>Transactions</span>
        </div>
        <div className="flex items-center justify-between gap-2 flex-wrap">
          <h2 className="text-xl sm:text-2xl" style={{ color: COLORS.text, fontFamily: "'Playfair Display', serif", fontWeight: 600 }}>
            Transactions
          </h2>
          <button
            onClick={exportCSV}
            className="flex items-center gap-2 text-xs px-3 py-2 rounded-lg transition-colors"
            style={{ background: COLORS.accent, color: "#ffffff" }}
          >
            <Download size={12} /> Export CSV
          </button>
        </div>
      </div>

      {/* Summary strip - 1 col mobile, 3 desktop */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 sm:gap-4 fade-up-1">
        {[
          { label: "Total orders",    value: filtered.length },
          { label: "Completed",       value: filtered.filter(o => o.status === "Completed").length },
          { label: "Revenue (shown)", value: fmt(totalRevenue) },
        ].map(s => (
          <div key={s.label} className="rounded-xl p-4" style={{ background: COLORS.card, border: `1px solid ${COLORS.border}` }}>
            <p className="text-xs uppercase tracking-widest mb-2" style={{ color: COLORS.textMuted, letterSpacing: "0.1em" }}>{s.label}</p>
            <p className="text-lg sm:text-xl" style={{ color: COLORS.text, ...numberStyle }}>{s.value}</p>
          </div>
        ))}
      </div>

      {/* Filters */}
      <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-2 sm:gap-3 fade-up-2">
        {/* Search */}
        <div className="flex items-center gap-2 px-3 py-2 rounded-lg flex-1" style={{ background: COLORS.card, border: `1px solid ${COLORS.border}` }}>
          <Search size={13} style={{ color: COLORS.textMuted }} />
          <input
            type="text"
            placeholder="Search order, item, cashier..."
            className="bg-transparent text-xs outline-none w-full"
            style={{ color: COLORS.textMid }}
            value={search}
            onChange={e => setSearch(e.target.value)}
          />
        </div>

        <div className="flex gap-2">
          {/* Status tabs */}
          <div className="flex gap-1 p-1 rounded-lg flex-1 overflow-x-auto" style={{ background: COLORS.card, border: `1px solid ${COLORS.border}` }}>
            {statuses.map(s => (
              <button
                key={s}
                onClick={() => setStatus(s)}
                className="text-xs px-2 sm:px-3 py-1.5 rounded-md transition-all whitespace-nowrap"
                style={{
                  background: statusFilter === s ? COLORS.accent : "transparent",
                  color:      statusFilter === s ? "#ffffff" : COLORS.textMuted,
                }}
              >
                {s}
              </button>
            ))}
          </div>

          {/* Sort */}
          <button
            onClick={() => setSortDir(d => d === "desc" ? "asc" : "desc")}
            className="flex items-center gap-1 text-xs px-3 py-2 rounded-lg flex-shrink-0"
            style={{ background: COLORS.card, border: `1px solid ${COLORS.border}`, color: COLORS.textMid }}
          >
            <Filter size={12} />
            <span className="hidden sm:inline">Total</span>
            {sortDir === "desc" ? <ChevronDown size={12} /> : <ChevronUp size={12} />}
          </button>
        </div>
      </div>

      {/* Mobile: Card layout */}
      <div className="flex flex-col gap-2 sm:hidden fade-up-3">
        {filtered.length === 0 ? (
          <div className="py-16 text-center rounded-xl" style={{ background: COLORS.card, border: `1px solid ${COLORS.border}` }}>
            <p className="text-sm" style={{ color: COLORS.textMuted }}>No orders found</p>
          </div>
        ) : (
          filtered.map((order) => {
            const s = statusStyle[order.status];
            return (
              <div
                key={order.id}
                className="rounded-xl p-4"
                style={{ background: COLORS.card, border: `1px solid ${COLORS.border}` }}
              >
                {/* Top row */}
                <div className="flex items-center justify-between mb-2">
                  <div className="flex items-center gap-2">
                    {/* Order ID — angka/kode, bold */}
                    <span className="text-xs" style={{ color: COLORS.text, ...numberStyle }}>{order.id}</span>
                    <span className="text-xs" style={{ color: COLORS.textMuted }}>{order.table}</span>
                    <span className="text-xs" style={{ color: COLORS.textMuted }}>·</span>
                    <span className="text-xs" style={{ color: COLORS.textMuted }}>{order.cashier}</span>
                  </div>
                  {/* Waktu — angka, bold */}
                  <span className="text-xs" style={{ color: COLORS.textMuted, ...numberStyle }}>{order.time}</span>
                </div>

                {/* Items */}
                <p className="text-xs mb-3 truncate" style={{ color: COLORS.textMid }}>{order.items}</p>

                {/* Bottom row */}
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <span className="w-1.5 h-1.5 rounded-full" style={{ background: s.dot }} />
                    <span className="text-xs font-medium" style={{ color: s.color }}>{order.status}</span>
                    <span className="text-xs" style={{ color: COLORS.border }}>·</span>
                    <span className="text-xs" style={{ color: COLORS.textMuted }}>{order.method}</span>
                  </div>
                  {/* Total — angka, bold */}
                  <span className="text-xs" style={{ color: COLORS.text, ...numberStyle }}>{fmt(order.total)}</span>
                </div>
              </div>
            );
          })
        )}
      </div>

      {/* Desktop: Table layout */}
      <div className="hidden sm:block rounded-xl overflow-hidden fade-up-3" style={{ background: COLORS.card, border: `1px solid ${COLORS.border}` }}>
        <div
          className="grid text-xs px-5 py-3"
          style={{
            gridTemplateColumns: "70px 55px 70px 1fr 90px 80px 75px 65px",
            color: COLORS.textMuted,
            borderBottom: `1px solid ${COLORS.border}`,
            background: COLORS.headerBg,
          }}
        >
          <span>Order</span>
          <span>Table</span>
          <span>Cashier</span>
          <span>Items</span>
          <span className="text-right">Total</span>
          <span className="text-center">Method</span>
          <span className="text-center">Status</span>
          <span className="text-right">Time</span>
        </div>

        {filtered.length === 0 ? (
          <div className="py-16 text-center">
            <p className="text-sm" style={{ color: COLORS.textMuted }}>No orders found</p>
          </div>
        ) : (
          filtered.map((order, i) => {
            const s = statusStyle[order.status];
            return (
              <div
                key={order.id}
                className="grid items-center px-5 py-3.5 text-xs cursor-pointer transition-colors"
                style={{
                  gridTemplateColumns: "70px 55px 70px 1fr 90px 80px 75px 65px",
                  borderBottom: i < filtered.length - 1 ? `1px solid ${COLORS.rowBorder}` : "none",
                }}
                onMouseEnter={e => e.currentTarget.style.background = COLORS.headerBg}
                onMouseLeave={e => e.currentTarget.style.background = "transparent"}
              >
                {/* Order ID — bold */}
                <span style={{ color: COLORS.textMuted, ...numberStyle }}>{order.id}</span>
                <span style={{ color: COLORS.textMid }}>{order.table}</span>
                <span style={{ color: COLORS.textMid }}>{order.cashier}</span>
                <span className="pr-4 truncate" style={{ color: COLORS.textMid }}>{order.items}</span>
                {/* Total — bold */}
                <span className="text-right" style={{ color: COLORS.text, ...numberStyle }}>{fmt(order.total)}</span>
                <span className="text-center" style={{ color: COLORS.textMid }}>{order.method}</span>
                <span className="flex items-center justify-center gap-1.5">
                  <span className="w-1.5 h-1.5 rounded-full flex-shrink-0" style={{ background: s.dot }} />
                  <span style={{ color: s.color }}>{order.status}</span>
                </span>
                {/* Time — bold */}
                <span className="text-right" style={{ color: COLORS.textMuted, ...numberStyle }}>{order.time}</span>
              </div>
            );
          })
        )}
      </div>

    </div>
  );
}