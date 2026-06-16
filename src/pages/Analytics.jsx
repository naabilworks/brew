import { useState } from "react";
import {
  TrendingUp, DollarSign, ShoppingBag, Users, Star,
  Calendar, ChevronDown, ArrowUpRight, ArrowDownRight
} from "lucide-react";
import {
  AreaChart, Area, BarChart, Bar, XAxis, YAxis, CartesianGrid,
  Tooltip, ResponsiveContainer, Cell, Legend
} from "recharts";

const revenueDataSets = {
  "This Week": [
    { day: "Mon", revenue: 4200000 }, { day: "Tue", revenue: 3800000 }, { day: "Wed", revenue: 5100000 },
    { day: "Thu", revenue: 4700000 }, { day: "Fri", revenue: 6200000 }, { day: "Sat", revenue: 7800000 }, { day: "Sun", revenue: 7100000 },
  ],
  "Last Week": [
    { day: "Mon", revenue: 3900000 }, { day: "Tue", revenue: 3600000 }, { day: "Wed", revenue: 4800000 },
    { day: "Thu", revenue: 4400000 }, { day: "Fri", revenue: 5800000 }, { day: "Sat", revenue: 7400000 }, { day: "Sun", revenue: 6800000 },
  ],
  "This Month": [
    { day: "Week 1", revenue: 28500000 }, { day: "Week 2", revenue: 31200000 },
    { day: "Week 3", revenue: 29800000 }, { day: "Week 4", revenue: 33500000 },
  ],
};

const categoryData = [
  { category: "Beverage", sales: 186 },
  { category: "Pastry",   sales: 95 },
  { category: "Food",     sales: 124 },
];

const topStaff = [
  { name: "Nurul Hidayah",  role: "Server",   orders: 142, rating: 4.9 },
  { name: "Bayu Nugroho",   role: "Barista",  orders: 128, rating: 4.8 },
  { name: "Andi Pratama",   role: "Cashier",  orders: 115, rating: 4.7 },
  { name: "Budi Setiawan",  role: "Barista",  orders: 98,  rating: 4.6 },
  { name: "Sari Dewi",      role: "Cashier",  orders: 87,  rating: 4.5 },
];

const dailyStats = {
  today:     { revenue: 6200000, orders: 47, avgValue: 131900, tables: 18 },
  yesterday: { revenue: 5800000, orders: 41, avgValue: 141400, tables: 15 },
};

const fmt = (v) => `Rp ${v.toLocaleString("id-ID")}`;
const fmtShort = (v) => {
  if (v >= 1000000) return `${(v / 1000000).toFixed(1)}M`;
  return `${(v / 1000).toFixed(0)}K`;
};

function StatCard({ label, value, change, icon: Icon }) {
  const isPositive = change > 0;
  return (
    <div className="rounded-xl p-4" style={{ background: "#ffffff", border: "1px solid #e8e8e3" }}>
      <div className="flex items-start justify-between mb-3">
        <p className="text-xs uppercase tracking-widest" style={{ color: "#cccccc", letterSpacing: "0.1em" }}>{label}</p>
        <Icon size={16} style={{ color: "#111111", opacity: 0.3 }} />
      </div>
      <p className="text-2xl font-semibold mb-1" style={{ color: "#111111", fontFamily: "'Playfair Display', serif" }}>{value}</p>
      <div className="flex items-center gap-1">
        {isPositive ? <ArrowUpRight size={12} style={{ color: "#111111" }} /> : <ArrowDownRight size={12} style={{ color: "#cccccc" }} />}
        <span className="text-xs font-medium" style={{ color: isPositive ? "#111111" : "#cccccc" }}>
          {Math.abs(change)}% vs yesterday
        </span>
      </div>
    </div>
  );
}

function CustomTooltip({ active, payload, label, prefix = "Rp", format = fmt }) {
  if (active && payload && payload.length) {
    return (
      <div className="rounded-lg px-3 py-2 text-xs" style={{ background: "#111111", color: "#ffffff", border: "none" }}>
        <p className="mb-1" style={{ opacity: 0.7 }}>{label}</p>
        {payload.map((entry, idx) => (
          <p key={idx} style={{ color: "#ffffff" }}>
            {entry.name}: {format(entry.value)}
          </p>
        ))}
      </div>
    );
  }
  return null;
}

export default function Analytics() {
  const [period, setPeriod] = useState("This Week");

  const revenueData = revenueDataSets[period];

  const calcChange = (today, yesterday) => {
    if (yesterday === 0) return 100;
    return Math.round(((today - yesterday) / yesterday) * 100);
  };

  const revenueChange = calcChange(dailyStats.today.revenue, dailyStats.yesterday.revenue);
  const ordersChange  = calcChange(dailyStats.today.orders, dailyStats.yesterday.orders);
  const avgChange     = calcChange(dailyStats.today.avgValue, dailyStats.yesterday.avgValue);
  const tablesChange  = calcChange(dailyStats.today.tables, dailyStats.yesterday.tables);

  return (
    <div className="p-6 space-y-5" style={{ background: "#f5f5f0", minHeight: "100%" }}>
      
      {/* Header */}
      <div className="fade-up">
        <div className="flex items-center gap-2 mb-1">
          <span className="text-xs uppercase tracking-widest" style={{ color: "#cccccc", letterSpacing: "0.1em" }}>Dashboard</span>
          <span style={{ color: "#e8e8e3" }}>/</span>
          <span className="text-xs" style={{ color: "#aaaaaa" }}>Analytics</span>
        </div>
        <div className="flex items-end justify-between">
          <h2 className="text-2xl" style={{ color: "#111111", fontFamily: "'Playfair Display', serif", fontWeight: 600 }}>
            Analytics
          </h2>
          <div className="relative">
            <select
              className="flex items-center gap-2 text-xs px-3 py-2 rounded-lg outline-none appearance-none cursor-pointer"
              style={{ background: "#ffffff", border: "1px solid #e8e8e3", color: "#555555" }}
              value={period}
              onChange={e => setPeriod(e.target.value)}
            >
              <option>This Week</option>
              <option>Last Week</option>
              <option>This Month</option>
            </select>
            <ChevronDown size={12} className="absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none" style={{ color: "#aaaaaa" }} />
          </div>
        </div>
      </div>

      {/* Stat Cards */}
      <div className="grid grid-cols-4 gap-4 fade-up-1">
        <StatCard label="Revenue"     value={fmtShort(dailyStats.today.revenue)} change={revenueChange} icon={DollarSign} />
        <StatCard label="Orders"      value={dailyStats.today.orders}           change={ordersChange}  icon={ShoppingBag} />
        <StatCard label="Avg. Order"  value={fmtShort(dailyStats.today.avgValue)} change={avgChange}   icon={TrendingUp} />
        <StatCard label="Tables"      value={`${dailyStats.today.tables}/20`}   change={tablesChange}  icon={Users} />
      </div>

      {/* Charts */}
      <div className="grid grid-cols-3 gap-4 fade-up-2">
        {/* Revenue Trend */}
        <div className="col-span-2 rounded-xl p-5" style={{ background: "#ffffff", border: "1px solid #e8e8e3" }}>
          <h3 className="text-sm font-semibold mb-4" style={{ color: "#111111", fontFamily: "'Playfair Display', serif" }}>Revenue Trend</h3>
          <ResponsiveContainer width="100%" height={220}>
            <AreaChart data={revenueData}>
              <defs>
                <linearGradient id="revGradient" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#111111" stopOpacity={0.08}/>
                  <stop offset="95%" stopColor="#111111" stopOpacity={0}/>
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" stroke="#f0f0eb" />
              <XAxis dataKey="day" tick={{ fontSize: 11, fill: "#cccccc" }} axisLine={false} tickLine={false} />
              <YAxis tick={{ fontSize: 11, fill: "#cccccc" }} axisLine={false} tickLine={false} tickFormatter={fmtShort} />
              <Tooltip content={<CustomTooltip format={fmt} />} />
              <Area type="monotone" dataKey="revenue" stroke="#111111" strokeWidth={1.5} fill="url(#revGradient)" />
            </AreaChart>
          </ResponsiveContainer>
        </div>

        {/* Category Breakdown */}
        <div className="rounded-xl p-5" style={{ background: "#ffffff", border: "1px solid #e8e8e3" }}>
          <h3 className="text-sm font-semibold mb-4" style={{ color: "#111111", fontFamily: "'Playfair Display', serif" }}>By Category</h3>
          <ResponsiveContainer width="100%" height={220}>
            <BarChart data={categoryData}>
              <CartesianGrid strokeDasharray="3 3" stroke="#f0f0eb" />
              <XAxis dataKey="category" tick={{ fontSize: 10, fill: "#cccccc" }} axisLine={false} tickLine={false} />
              <YAxis tick={{ fontSize: 10, fill: "#cccccc" }} axisLine={false} tickLine={false} />
              <Tooltip content={<CustomTooltip prefix="" format={(v) => `${v} items`} />} />
              <Bar dataKey="sales" radius={[4, 4, 0, 0]} barSize={28}>
                {categoryData.map((entry, index) => (
                  <Cell key={index} fill={index === 0 ? "#111111" : index === 1 ? "#cccccc" : "#e8e8e3"} />
                ))}
              </Bar>
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Top Staff */}
      <div className="rounded-xl p-5 fade-up-3" style={{ background: "#ffffff", border: "1px solid #e8e8e3" }}>
        <h3 className="text-sm font-semibold mb-4" style={{ color: "#111111", fontFamily: "'Playfair Display', serif" }}>Top Performing Staff</h3>
        <div className="space-y-2">
          {topStaff.map((s, i) => (
            <div key={s.name} className="flex items-center gap-3 py-2" style={{ borderBottom: i < topStaff.length - 1 ? "1px solid #f5f5f0" : "none" }}>
              <span className="text-xs font-mono w-5" style={{ color: i < 3 ? "#111111" : "#cccccc", fontWeight: i === 0 ? 700 : 400 }}>
                {i + 1}
              </span>
              <div className="flex items-center justify-center rounded-full flex-shrink-0" style={{ width: 28, height: 28, background: i === 0 ? "#111111" : "#f5f5f0", color: i === 0 ? "#ffffff" : "#aaaaaa", fontSize: 11, fontWeight: 600 }}>
                {s.name.charAt(0)}
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-sm font-medium truncate" style={{ color: "#111111" }}>{s.name}</p>
                <p className="text-xs" style={{ color: "#aaaaaa" }}>{s.role}</p>
              </div>
              <div className="text-right">
                <p className="text-sm font-mono font-medium" style={{ color: "#111111" }}>{s.orders}</p>
                <p className="text-xs" style={{ color: "#aaaaaa" }}>orders</p>
              </div>
              <div className="flex items-center gap-1 min-w-[50px] justify-end">
                <Star size={12} style={{ color: "#111111", fill: "#111111" }} />
                <span className="text-sm font-mono" style={{ color: "#111111" }}>{s.rating}</span>
              </div>
            </div>
          ))}
        </div>
      </div>

    </div>
  );
}