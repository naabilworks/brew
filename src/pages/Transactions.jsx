import { useState } from "react";
import { Search, Filter, Download, ChevronUp, ChevronDown } from "lucide-react";

const allOrders = [
  { id: "#0147", table: "T-03", cashier: "Andi",  items: "Es Kopi Susu × 2, Croissant × 1",     total: 65000,  status: "Completed", time: "21:04", method: "Cash"   },
  { id: "#0146", table: "T-07", cashier: "Budi",  items: "Matcha Latte × 1, Avocado Toast × 2",  total: 115000, status: "Completed", time: "20:58", method: "QRIS"   },
  { id: "#0145", table: "T-11", cashier: "Andi",  items: "Cold Brew × 3",                         total: 90000,  status: "Serving",   time: "20:51", method: "QRIS"   },
  { id: "#0144", table: "T-02", cashier: "Sari",  items: "Es Kopi Susu × 1, Croissant × 2",      total: 75000,  status: "Completed", time: "20:43", method: "Cash"   },
  { id: "#0143", table: "T-09", cashier: "Budi",  items: "Matcha Latte × 2",                      total: 60000,  status: "Serving",   time: "20:38", method: "Debit"  },
  { id: "#0142", table: "T-05", cashier: "Sari",  items: "Avocado Toast × 1, Cold Brew × 1",     total: 85000,  status: "Completed", time: "20:22", method: "QRIS"   },
  { id: "#0141", table: "T-01", cashier: "Andi",  items: "Es Kopi Susu × 3",                      total: 75000,  status: "Completed", time: "20:10", method: "Cash"   },
  { id: "#0140", table: "T-08", cashier: "Budi",  items: "Croissant × 2, Matcha Latte × 1",      total: 80000,  status: "Cancelled", time: "19:58", method: "Debit"  },
  { id: "#0139", table: "T-04", cashier: "Sari",  items: "Cold Brew × 2, Avocado Toast × 1",     total: 95000,  status: "Completed", time: "19:44", method: "QRIS"   },
  { id: "#0138", table: "T-06", cashier: "Andi",  items: "Es Kopi Susu × 1, Matcha Latte × 1",  total: 55000,  status: "Completed", time: "19:30", method: "Cash"   },
  { id: "#0137", table: "T-10", cashier: "Budi",  items: "Croissant × 3",                         total: 60000,  status: "Completed", time: "19:15", method: "QRIS"   },
  { id: "#0136", table: "T-12", cashier: "Sari",  items: "Avocado Toast × 2",                     total: 70000,  status: "Cancelled", time: "19:02", method: "Cash"   },
];

const fmt = (v) => `Rp ${v.toLocaleString("id-ID")}`;

const statusStyle = {
  Completed: { color: "#3a5a40", bg: "#edf3ee", dot: "#3a5a40" },
  Serving:   { color: "#8b6f4c", bg: "#faf6f0", dot: "#8b6f4c" },
  Cancelled: { color: "#aaaaaa", bg: "#fafafa", dot: "#cccccc" },
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
    <div className="p-4 sm:p-6 space-y-4 sm:space-y-5" style={{ background: "#f5f5f0", minHeight: "100%" }}>

      {/* Header */}
      <div className="fade-up">
        <div className="flex items-center gap-2 mb-1">
          <span className="text-xs uppercase tracking-widest" style={{ color: "#cccccc", letterSpacing: "0.1em" }}>Dashboard</span>
          <span style={{ color: "#e8e8e3" }}>/</span>
          <span className="text-xs" style={{ color: "#aaaaaa" }}>Transactions</span>
        </div>
        <div className="flex items-center justify-between gap-2 flex-wrap">
          <h2 className="text-xl sm:text-2xl" style={{ color: "#111111", fontFamily: "'Playfair Display', serif", fontWeight: 600 }}>
            Transactions
          </h2>
          <button
            onClick={exportCSV}
            className="flex items-center gap-2 text-xs px-3 py-2 rounded-lg transition-colors"
            style={{ background: "#111111", color: "#ffffff" }}
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
          <div key={s.label} className="rounded-xl p-4" style={{ background: "#ffffff", border: "1px solid #e8e8e3" }}>
            <p className="text-xs uppercase tracking-widest mb-2" style={{ color: "#cccccc", letterSpacing: "0.1em" }}>{s.label}</p>
            <p className="text-lg sm:text-xl font-semibold" style={{ color: "#111111", fontFamily: "'Playfair Display', serif" }}>{s.value}</p>
          </div>
        ))}
      </div>

      {/* Filters */}
      <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-2 sm:gap-3 fade-up-2">
        {/* Search */}
        <div className="flex items-center gap-2 px-3 py-2 rounded-lg flex-1" style={{ background: "#ffffff", border: "1px solid #e8e8e3" }}>
          <Search size={13} style={{ color: "#aaaaaa" }} />
          <input
            type="text"
            placeholder="Search order, item, cashier..."
            className="bg-transparent text-xs outline-none w-full"
            style={{ color: "#555555" }}
            value={search}
            onChange={e => setSearch(e.target.value)}
          />
        </div>

        <div className="flex gap-2">
          {/* Status tabs */}
          <div className="flex gap-1 p-1 rounded-lg flex-1 overflow-x-auto" style={{ background: "#ffffff", border: "1px solid #e8e8e3" }}>
            {statuses.map(s => (
              <button
                key={s}
                onClick={() => setStatus(s)}
                className="text-xs px-2 sm:px-3 py-1.5 rounded-md transition-all whitespace-nowrap"
                style={{
                  background: statusFilter === s ? "#111111" : "transparent",
                  color:      statusFilter === s ? "#ffffff" : "#aaaaaa",
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
            style={{ background: "#ffffff", border: "1px solid #e8e8e3", color: "#555555" }}
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
          <div className="py-16 text-center rounded-xl" style={{ background: "#ffffff", border: "1px solid #e8e8e3" }}>
            <p className="text-sm" style={{ color: "#cccccc" }}>No orders found</p>
          </div>
        ) : (
          filtered.map((order) => {
            const s = statusStyle[order.status];
            return (
              <div
                key={order.id}
                className="rounded-xl p-4"
                style={{ background: "#ffffff", border: "1px solid #e8e8e3" }}
              >
                {/* Top row */}
                <div className="flex items-center justify-between mb-2">
                  <div className="flex items-center gap-2">
                    <span className="text-xs font-mono font-medium" style={{ color: "#111111" }}>{order.id}</span>
                    <span className="text-xs" style={{ color: "#aaaaaa" }}>{order.table}</span>
                    <span className="text-xs" style={{ color: "#aaaaaa" }}>·</span>
                    <span className="text-xs" style={{ color: "#aaaaaa" }}>{order.cashier}</span>
                  </div>
                  <span className="text-xs font-mono" style={{ color: "#aaaaaa" }}>{order.time}</span>
                </div>

                {/* Items */}
                <p className="text-xs mb-3 truncate" style={{ color: "#888888" }}>{order.items}</p>

                {/* Bottom row */}
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <span className="w-1.5 h-1.5 rounded-full" style={{ background: s.dot }} />
                    <span className="text-xs font-medium" style={{ color: s.color }}>{order.status}</span>
                    <span className="text-xs" style={{ color: "#cccccc" }}>·</span>
                    <span className="text-xs" style={{ color: "#aaaaaa" }}>{order.method}</span>
                  </div>
                  <span className="text-xs font-mono font-semibold" style={{ color: "#111111" }}>{fmt(order.total)}</span>
                </div>
              </div>
            );
          })
        )}
      </div>

      {/* Desktop: Table layout */}
      <div className="hidden sm:block rounded-xl overflow-hidden fade-up-3" style={{ background: "#ffffff", border: "1px solid #e8e8e3" }}>
        <div
          className="grid text-xs px-5 py-3"
          style={{
            gridTemplateColumns: "70px 55px 70px 1fr 90px 80px 75px 65px",
            color: "#cccccc",
            borderBottom: "1px solid #f0f0eb",
            background: "#fafafa",
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
            <p className="text-sm" style={{ color: "#cccccc" }}>No orders found</p>
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
                  borderBottom: i < filtered.length - 1 ? "1px solid #f5f5f0" : "none",
                }}
                onMouseEnter={e => e.currentTarget.style.background = "#fafafa"}
                onMouseLeave={e => e.currentTarget.style.background = "transparent"}
              >
                <span className="font-mono" style={{ color: "#aaaaaa" }}>{order.id}</span>
                <span style={{ color: "#888888" }}>{order.table}</span>
                <span style={{ color: "#555555" }}>{order.cashier}</span>
                <span className="pr-4 truncate" style={{ color: "#888888" }}>{order.items}</span>
                <span className="text-right font-mono font-medium" style={{ color: "#333333" }}>{fmt(order.total)}</span>
                <span className="text-center" style={{ color: "#888888" }}>{order.method}</span>
                <span className="flex items-center justify-center gap-1.5">
                  <span className="w-1.5 h-1.5 rounded-full flex-shrink-0" style={{ background: s.dot }} />
                  <span style={{ color: s.color }}>{order.status}</span>
                </span>
                <span className="text-right font-mono" style={{ color: "#aaaaaa" }}>{order.time}</span>
              </div>
            );
          })
        )}
      </div>

    </div>
  );
}