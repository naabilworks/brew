import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, ReferenceLine } from "recharts";
import { revenueHourly } from "../../data/mockData";

const fmtShort = (v) => {
  if (v >= 1000) return `$${(v / 1000).toFixed(1)}K`;
  return `$${v}`;
};

const CustomTooltip = ({ active, payload, label }) => {
  if (active && payload && payload.length) {
    return (
      <div
        className="rounded-xl px-4 py-3"
        style={{
          background: "var(--color-espresso)",
          boxShadow: "var(--shadow-lg)",
        }}
      >
        <p className="mb-1.5 text-[11px] font-medium" style={{ color: "var(--color-crema-soft)" }}>
          {`${label}:00`}
        </p>
        {payload.map((entry, idx) => (
          <p
            key={idx}
            className="font-bold text-[15px]"
            style={{ fontFamily: "'Space Grotesk', sans-serif", color: "#ffffff" }}
          >
            ${entry.value.toLocaleString("en-US")}
          </p>
        ))}
      </div>
    );
  }
  return null;
};

export default function RevenueChart() {
  const avg =
    revenueHourly.reduce((sum, d) => sum + d.revenue, 0) / revenueHourly.length;
  const peak = revenueHourly.reduce((a, b) => (b.revenue > a.revenue ? b : a));

  return (
    <div
      className="rounded-2xl p-5 sm:p-6"
      style={{ background: "var(--bg-card)", border: "1px solid var(--color-latte)", boxShadow: "var(--shadow-sm)" }}
    >
      <div className="flex items-start justify-between mb-1">
        <div>
          <h3
            className="text-[15px] mb-0.5"
            style={{ color: "var(--color-espresso)", fontFamily: "var(--font-serif)", fontWeight: 600 }}
          >
            Revenue per hour
          </h3>
          <p className="text-[11px]" style={{ color: "var(--text-muted)" }}>
            Today's earning pattern
          </p>
        </div>
        <div
          className="flex items-center gap-1.5 px-2.5 py-1 rounded-full"
          style={{ background: "var(--bg-surface)" }}
        >
          <span className="w-1.5 h-1.5 rounded-full" style={{ background: "var(--color-crema)" }} />
          <span className="text-[10px] font-semibold uppercase tracking-wide" style={{ color: "var(--text-muted)" }}>
            Revenue
          </span>
        </div>
      </div>

      <div className="flex items-baseline gap-4 mb-4">
        <div>
          <span
            className="font-bold"
            style={{ fontFamily: "'Space Grotesk', sans-serif", color: "var(--color-espresso)", fontSize: "26px" }}
          >
            {fmtShort(peak.revenue)}
          </span>
          <span className="text-[11px] ml-2" style={{ color: "var(--text-muted)" }}>
            peak at {peak.hour}:00
          </span>
        </div>
      </div>

      <ResponsiveContainer width="100%" height={250}>
        <AreaChart data={revenueHourly} margin={{ top: 8, right: 8, left: -16, bottom: 0 }}>
          <defs>
            <linearGradient id="revGrad" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#B8732E" stopOpacity={0.45} />
              <stop offset="45%" stopColor="#B8732E" stopOpacity={0.15} />
              <stop offset="100%" stopColor="#B8732E" stopOpacity={0.02} />
            </linearGradient>
            <linearGradient id="revLine" x1="0" y1="0" x2="1" y2="0">
              <stop offset="0%" stopColor="#8A4F1F" />
              <stop offset="100%" stopColor="#D9924F" />
            </linearGradient>
          </defs>

          <CartesianGrid strokeDasharray="3 5" stroke="#EFE6D9" vertical={false} />

          <XAxis
            dataKey="hour"
            tick={{ fontSize: 11, fill: "#B5A696" }}
            axisLine={false}
            tickLine={false}
            tickMargin={10}
          />
          <YAxis
            tick={{ fontSize: 11, fill: "#B5A696" }}
            axisLine={false}
            tickLine={false}
            tickFormatter={fmtShort}
            width={48}
          />

          <ReferenceLine
            y={avg}
            stroke="#DCCBB8"
            strokeDasharray="4 4"
            strokeWidth={1.5}
            label={{
              value: `avg ${fmtShort(avg)}`,
              position: "insideTopRight",
              fill: "#B5A696",
              fontSize: 10,
              fontWeight: 600,
            }}
          />

          <Tooltip
            content={<CustomTooltip />}
            cursor={{ stroke: "#DCCBB8", strokeWidth: 1.5, strokeDasharray: "4 4" }}
          />

          <Area
            type="monotone"
            dataKey="revenue"
            stroke="url(#revLine)"
            strokeWidth={3}
            fill="url(#revGrad)"
            dot={false}
            activeDot={{
              r: 6,
              fill: "#B8732E",
              stroke: "#ffffff",
              strokeWidth: 3,
              style: { filter: "drop-shadow(0 2px 6px rgba(184,115,46,0.5))" },
            }}
          />
        </AreaChart>
      </ResponsiveContainer>
    </div>
  );
}