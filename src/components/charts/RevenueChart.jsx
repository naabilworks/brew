import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts";
import { revenueHourly } from "../../data/mockData";

const fmtShort = (v) => {
  if (v >= 1000000) return `${(v / 1000000).toFixed(1)}M`;
  if (v >= 1000) return `${(v / 1000).toFixed(0)}K`;
  return v;
};

const CustomTooltip = ({ active, payload, label }) => {
  if (active && payload && payload.length) {
    return (
      <div
        className="rounded-lg px-3 py-2 text-xs shadow-sm"
        style={{ background: "#ffffff", border: "1px solid #e8e8e3", color: "#111111" }}
      >
        <p className="mb-1" style={{ color: "#aaaaaa" }}>{`${label}:00`}</p>
        {payload.map((entry, idx) => (
          <p
            key={idx}
            className="font-semibold"
            style={{ fontFamily: "'Geist Mono', 'JetBrains Mono', monospace", color: "#111111" }}
          >
            Rp {entry.value.toLocaleString("id-ID")}
          </p>
        ))}
      </div>
    );
  }
  return null;
};

export default function RevenueChart() {
  return (
    <div className="rounded-xl p-5" style={{ background: "#ffffff", border: "1px solid #e8e8e3" }}>
      <h3
        className="text-sm font-semibold mb-4"
        style={{ color: "#111111", fontFamily: "'Playfair Display', serif" }}
      >
        Revenue per Hour
      </h3>
      <ResponsiveContainer width="100%" height={240}>
        <AreaChart data={revenueHourly}>
          <defs>
            <linearGradient id="revGrad" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor="#3a5a40" stopOpacity={0.08} />
              <stop offset="95%" stopColor="#3a5a40" stopOpacity={0} />
            </linearGradient>
          </defs>
          <CartesianGrid strokeDasharray="3 3" stroke="#f0f0eb" />
          <XAxis
            dataKey="hour"
            tick={{ fontSize: 11, fill: "#cccccc" }}
            axisLine={false}
            tickLine={false}
          />
          <YAxis
            tick={{ fontSize: 11, fill: "#cccccc" }}
            axisLine={false}
            tickLine={false}
            tickFormatter={fmtShort}
          />
          <Tooltip content={<CustomTooltip />} />
          <Area
            type="monotone"
            dataKey="revenue"
            stroke="#3a5a40"
            strokeWidth={2}
            fill="url(#revGrad)"
            dot={false}
            activeDot={{ r: 4, fill: "#3a5a40", stroke: "#ffffff", strokeWidth: 2 }}
          />
        </AreaChart>
      </ResponsiveContainer>
    </div>
  );
}