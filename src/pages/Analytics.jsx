import { useState } from "react";
import {
  TrendingUp, DollarSign, ShoppingBag, Users, Star,
  ChevronDown, ArrowUpRight, ArrowDownRight
} from "lucide-react";
import {
  AreaChart, Area, BarChart, Bar, XAxis, YAxis, CartesianGrid,
  Tooltip, ResponsiveContainer, Cell
} from "recharts";

/* ---------- Palette (matched to Overview) ----------
   Background:      #f5f0e8  (warm cream)
   Card:            #ffffff
   Border:          #e8ddc9  (warm sand)
   Accent:          #c17a4f  (terracotta)
   Accent soft:      #c17a4f at low opacity (fills, chips)
   Text primary:    #2b211b  (near-black warm brown)
   Text secondary:  #9c8f7c  (muted sand-brown)
   Negative:        #b54a3f  (muted brick red, matches "-2.1%" chip in Overview)
------------------------------------------------------ */

const revenueDataSets = {
  "This Week": [
    { day: "Mon", revenue: 278 }, { day: "Tue", revenue: 252 }, { day: "Wed", revenue: 338 },
    { day: "Thu", revenue: 311 }, { day: "Fri", revenue: 411 }, { day: "Sat", revenue: 517 }, { day: "Sun", revenue: 470 },
  ],
  "Last Week": [
    { day: "Mon", revenue: 258 }, { day: "Tue", revenue: 238 }, { day: "Wed", revenue: 318 },
    { day: "Thu", revenue: 291 }, { day: "Fri", revenue: 384 }, { day: "Sat", revenue: 490 }, { day: "Sun", revenue: 450 },
  ],
  "This Month": [
    { day: "Week 1", revenue: 1887 }, { day: "Week 2", revenue: 2066 },
    { day: "Week 3", revenue: 1974 }, { day: "Week 4", revenue: 2219 },
  ],
};

const categoryData = [
  { category: "Beverage", sales: 186 },
  { category: "Pastry",   sales: 95 },
  { category: "Food",     sales: 124 },
];

const topStaff = [
  { name: "Nurul Hidayah",  role: "Server",  orders: 142, rating: 4.9 },
  { name: "Bayu Nugroho",   role: "Barista", orders: 128, rating: 4.8 },
  { name: "Andi Pratama",   role: "Cashier", orders: 115, rating: 4.7 },
  { name: "Budi Setiawan",  role: "Barista", orders: 98,  rating: 4.6 },
  { name: "Sari Dewi",      role: "Cashier", orders: 87,  rating: 4.5 },
];

const dailyStats = {
  today:     { revenue: 411, orders: 47, avgValue: 8.74, tables: 18 },
  yesterday: { revenue: 384, orders: 41, avgValue: 9.37, tables: 15 },
};

const COLORS = {
  bg: "#f5f0e8",
  card: "#ffffff",
  border: "#e8ddc9",
  accent: "#c17a4f",
  accentSoft: "rgba(193, 122, 79, 0.14)",
  text: "#2b211b",
  textMuted: "#9c8f7c",
  negative: "#b54a3f",
};

const fmt = (v) => `$${v.toLocaleString("en-US")}`;
const fmtShort = (v) => {
  if (v >= 1000) return `$${(v / 1000).toFixed(1)}K`;
  return `$${v}`;
};

function StatCard({ label, value, change, icon: Icon }) {
  const isPositive = change > 0;
  return (
    <div className="rounded-xl p-3 sm:p-4" style={{ background: COLORS.card, border: `1px solid ${COLORS.border}` }}>
      <div className="flex items-start justify-between mb-2 sm:mb-3">
        <p className="text-xs uppercase tracking-widest" style={{ color: COLORS.textMuted, letterSpacing: "0.1em" }}>{label}</p>
        <div
          className="flex items-center justify-center rounded-lg"
          style={{ width: 28, height: 28, background: COLORS.accentSoft }}
        >
          <Icon size={14} style={{ color: COLORS.accent }} />
        </div>
      </div>
      <p
        className="text-lg sm:text-2xl font-semibold mb-1"
        style={{ color: COLORS.text, fontFamily: "'Space Grotesk', sans-serif" }}
      >
        {value}
      </p>
      <div className="flex items-center gap-1">
        <span
          className="inline-flex items-center gap-0.5 px-1.5 py-0.5 rounded-md text-xs font-medium"
          style={{
            background: isPositive ? "rgba(58, 122, 76, 0.12)" : "rgba(181, 74, 63, 0.12)",
            color: isPositive ? "#3a7a4c" : COLORS.negative,
          }}
        >
          {isPositive ? <ArrowUpRight size={11} /> : <ArrowDownRight size={11} />}
          {Math.abs(change)}%
        </span>
        <span className="text-xs hidden sm:inline" style={{ color: COLORS.textMuted }}>vs yesterday</span>
      </div>
    </div>
  );
}

function CustomTooltip({ active, payload, label, format = fmt }) {
  if (active && payload && payload.length) {
    return (
      <div className="rounded-lg px-3 py-2 text-xs" style={{ background: COLORS.text, color: "#fff" }}>
        <p className="mb-1" style={{ opacity: 0.65 }}>{label}</p>
        {payload.map((entry, idx) => (
          <p key={idx} style={{ color: "#fff", fontFamily: "'Space Grotesk', sans-serif" }}>
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

  const revenueChange = calcChange(dailyStats.today.revenue,   dailyStats.yesterday.revenue);
  const ordersChange  = calcChange(dailyStats.today.orders,    dailyStats.yesterday.orders);
  const avgChange     = calcChange(dailyStats.today.avgValue,  dailyStats.yesterday.avgValue);
  const tablesChange  = calcChange(dailyStats.today.tables,    dailyStats.yesterday.tables);

  return (
    <div className="p-4 sm:p-6 space-y-4 sm:space-y-5" style={{ background: COLORS.bg, minHeight: "100%" }}>

      {/* Header */}
      <div className="fade-up">
        <div className="flex items-center gap-2 mb-1">
          <span className="text-xs uppercase tracking-widest" style={{ color: COLORS.textMuted, letterSpacing: "0.1em" }}>Dashboard</span>
          <span style={{ color: COLORS.border }}>/</span>
          <span className="text-xs" style={{ color: COLORS.accent }}>Analytics</span>
        </div>
        <div className="flex items-center justify-between gap-2 flex-wrap">
          <h2 className="text-xl sm:text-2xl" style={{ color: COLORS.text, fontFamily: "'Playfair Display', serif", fontWeight: 600 }}>
            Analytics
          </h2>
          <div className="relative">
            <select
              className="text-xs px-3 py-2 pr-7 rounded-lg outline-none appearance-none cursor-pointer"
              style={{ background: COLORS.card, border: `1px solid ${COLORS.border}`, color: COLORS.text }}
              value={period}
              onChange={e => setPeriod(e.target.value)}
            >
              <option>This Week</option>
              <option>Last Week</option>
              <option>This Month</option>
            </select>
            <ChevronDown size={12} className="absolute right-2 top-1/2 -translate-y-1/2 pointer-events-none" style={{ color: COLORS.textMuted }} />
          </div>
        </div>
      </div>

      {/* Stat Cards */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 sm:gap-4 fade-up-1">
        <StatCard label="Revenue"    value={fmtShort(dailyStats.today.revenue)}          change={revenueChange} icon={DollarSign} />
        <StatCard label="Orders"     value={dailyStats.today.orders}                     change={ordersChange}  icon={ShoppingBag} />
        <StatCard label="Avg. Order" value={`$${dailyStats.today.avgValue.toFixed(2)}`}  change={avgChange}     icon={TrendingUp} />
        <StatCard label="Tables"     value={`${dailyStats.today.tables}/20`}             change={tablesChange}  icon={Users} />
      </div>

      {/* Charts */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 sm:gap-4 fade-up-2">
        <div className="sm:col-span-2 rounded-xl p-4 sm:p-5" style={{ background: COLORS.card, border: `1px solid ${COLORS.border}` }}>
          <h3 className="text-sm font-semibold mb-4" style={{ color: COLORS.text, fontFamily: "'Playfair Display', serif" }}>
            Revenue Trend
          </h3>
          <ResponsiveContainer width="100%" height={200}>
            <AreaChart data={revenueData} margin={{ top: 4, right: 4, left: -20, bottom: 0 }}>
              <defs>
                <linearGradient id="revGradient" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%"  stopColor={COLORS.accent} stopOpacity={0.22} />
                  <stop offset="95%" stopColor={COLORS.accent} stopOpacity={0} />
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" stroke={COLORS.border} />
              <XAxis dataKey="day" tick={{ fontSize: 10, fill: COLORS.textMuted }} axisLine={false} tickLine={false} />
              <YAxis tick={{ fontSize: 10, fill: COLORS.textMuted }} axisLine={false} tickLine={false} tickFormatter={fmtShort} />
              <Tooltip content={<CustomTooltip format={fmt} />} />
              <Area type="monotone" dataKey="revenue" stroke={COLORS.accent} strokeWidth={2} fill="url(#revGradient)" />
            </AreaChart>
          </ResponsiveContainer>
        </div>

        <div className="rounded-xl p-4 sm:p-5" style={{ background: COLORS.card, border: `1px solid ${COLORS.border}` }}>
          <h3 className="text-sm font-semibold mb-4" style={{ color: COLORS.text, fontFamily: "'Playfair Display', serif" }}>
            By Category
          </h3>
          <ResponsiveContainer width="100%" height={200}>
            <BarChart data={categoryData} margin={{ top: 4, right: 4, left: -20, bottom: 0 }}>
              <CartesianGrid strokeDasharray="3 3" stroke={COLORS.border} />
              <XAxis dataKey="category" tick={{ fontSize: 10, fill: COLORS.textMuted }} axisLine={false} tickLine={false} />
              <YAxis tick={{ fontSize: 10, fill: COLORS.textMuted }} axisLine={false} tickLine={false} />
              <Tooltip content={<CustomTooltip format={(v) => `${v} items`} />} />
              <Bar dataKey="sales" radius={[4, 4, 0, 0]} barSize={24}>
                {categoryData.map((entry, index) => (
                  <Cell key={index} fill={index === 0 ? COLORS.accent : index === 1 ? "#e3c4a8" : COLORS.border} />
                ))}
              </Bar>
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Top Staff */}
      <div className="rounded-xl p-4 sm:p-5 fade-up-3" style={{ background: COLORS.card, border: `1px solid ${COLORS.border}` }}>
        <h3 className="text-sm font-semibold mb-4" style={{ color: COLORS.text, fontFamily: "'Playfair Display', serif" }}>
          Top Performing Staff
        </h3>
        <div className="space-y-2">
          {topStaff.map((s, i) => (
            <div
              key={s.name}
              className="flex items-center gap-2 sm:gap-3 py-2"
              style={{ borderBottom: i < topStaff.length - 1 ? `1px solid ${COLORS.bg}` : "none" }}
            >
              <span
                className="text-xs w-4 flex-shrink-0"
                style={{ color: i < 3 ? COLORS.accent : COLORS.textMuted, fontWeight: i === 0 ? 700 : 400, fontFamily: "'Space Grotesk', sans-serif" }}
              >
                {i + 1}
              </span>
              <div
                className="flex items-center justify-center rounded-full flex-shrink-0"
                style={{
                  width: 28, height: 28,
                  background: i === 0 ? COLORS.accent : COLORS.bg,
                  color: i === 0 ? "#ffffff" : COLORS.textMuted,
                  fontSize: 11, fontWeight: 600,
                }}
              >
                {s.name.charAt(0)}
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-sm font-medium truncate" style={{ color: COLORS.text }}>{s.name}</p>
                <p className="text-xs" style={{ color: COLORS.textMuted }}>{s.role}</p>
              </div>
              <div className="text-right flex-shrink-0">
                <p className="text-sm font-medium" style={{ color: COLORS.text, fontFamily: "'Space Grotesk', sans-serif" }}>{s.orders}</p>
                <p className="text-xs hidden sm:block" style={{ color: COLORS.textMuted }}>orders</p>
              </div>
              <div className="flex items-center gap-1 flex-shrink-0">
                <Star size={12} style={{ color: COLORS.accent, fill: COLORS.accent }} />
                <span className="text-sm" style={{ color: COLORS.text, fontFamily: "'Space Grotesk', sans-serif" }}>{s.rating}</span>
              </div>
            </div>
          ))}
        </div>
      </div>

    </div>
  );
}