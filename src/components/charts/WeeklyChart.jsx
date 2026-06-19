import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Cell, LabelList } from "recharts";
import { weeklySales } from "../../data/mockData";

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
        <p className="mb-1.5 text-[11px] font-medium" style={{ color: "var(--color-crema-soft)" }}>{label}</p>
        {payload.map((entry, idx) => (
          <p
            key={idx}
            className="font-bold text-[15px]"
            style={{ fontFamily: "'Space Grotesk', sans-serif", color: "#ffffff" }}
          >
            {entry.value} orders
          </p>
        ))}
      </div>
    );
  }
  return null;
};

const BestLabel = (props) => {
  const { x, y, width, value, index } = props;
  if (!props.isBest?.(index)) return null;
  return (
    <text
      x={x + width / 2}
      y={y - 10}
      textAnchor="middle"
      fontSize={12}
      fontWeight={700}
      fontFamily="'Space Grotesk', sans-serif"
      fill="#2C1810"
    >
      {value}
    </text>
  );
};

export default function WeeklyChart() {
  const max = Math.max(...weeklySales.map((d) => d.sales));
  const maxIndex = weeklySales.findIndex((d) => d.sales === max);
  const total = weeklySales.reduce((sum, d) => sum + d.sales, 0);

  return (
    <div
      className="rounded-2xl p-5 sm:p-6 h-full"
      style={{ background: "var(--bg-card)", border: "1px solid var(--color-latte)", boxShadow: "var(--shadow-sm)" }}
    >
      <div className="flex items-start justify-between mb-1">
        <div>
          <h3
            className="text-[15px] mb-0.5"
            style={{ color: "var(--color-espresso)", fontFamily: "var(--font-serif)", fontWeight: 600 }}
          >
            This week
          </h3>
          <p className="text-[11px]" style={{ color: "var(--text-muted)" }}>
            Best day highlighted
          </p>
        </div>
      </div>

      <div className="mb-4">
        <span
          className="font-bold"
          style={{ fontFamily: "'Space Grotesk', sans-serif", color: "var(--color-espresso)", fontSize: "26px" }}
        >
          {total}
        </span>
        <span className="text-[11px] ml-2" style={{ color: "var(--text-muted)" }}>
          orders this week
        </span>
      </div>

      <ResponsiveContainer width="100%" height={210}>
        <BarChart data={weeklySales} margin={{ top: 24, right: 4, left: -20, bottom: 0 }}>
          <defs>
            <linearGradient id="barBest" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#4A2C1D" />
              <stop offset="100%" stopColor="#2C1810" />
            </linearGradient>
            <linearGradient id="barRest" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#EEE3D4" />
              <stop offset="100%" stopColor="#E0D2BF" />
            </linearGradient>
          </defs>

          <CartesianGrid strokeDasharray="3 5" stroke="#EFE6D9" vertical={false} />
          <XAxis
            dataKey="day"
            tick={{ fontSize: 11, fill: "#B5A696" }}
            axisLine={false}
            tickLine={false}
          />
          <YAxis
            tick={{ fontSize: 11, fill: "#B5A696" }}
            axisLine={false}
            tickLine={false}
            width={32}
          />
          <Tooltip content={<CustomTooltip />} cursor={{ fill: "#F1E9DD" }} />
          <Bar dataKey="sales" radius={[8, 8, 8, 8]} barSize={26}>
            <LabelList
              dataKey="sales"
              content={(props) => (
                <BestLabel {...props} isBest={(i) => i === maxIndex} />
              )}
            />
            {weeklySales.map((entry, index) => (
              <Cell
                key={index}
                fill={index === maxIndex ? "url(#barBest)" : "url(#barRest)"}
              />
            ))}
          </Bar>
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}