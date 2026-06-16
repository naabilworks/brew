import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Cell } from "recharts";
import { weeklySales } from "../../data/mockData";

const CustomTooltip = ({ active, payload, label }) => {
  if (active && payload && payload.length) {
    return (
      <div
        className="rounded-lg px-3 py-2 text-xs shadow-sm"
        style={{ background: "#ffffff", border: "1px solid #e8e8e3", color: "#111111" }}
      >
        <p className="mb-1" style={{ color: "#aaaaaa" }}>{label}</p>
        {payload.map((entry, idx) => (
          <p
            key={idx}
            className="font-semibold"
            style={{ fontFamily: "'Geist Mono', 'JetBrains Mono', monospace", color: "#111111" }}
          >
            {entry.value} orders
          </p>
        ))}
      </div>
    );
  }
  return null;
};

export default function WeeklyChart() {
  const max = Math.max(...weeklySales.map((d) => d.sales));

  return (
    <div className="rounded-xl p-5" style={{ background: "#ffffff", border: "1px solid #e8e8e3" }}>
      <h3
        className="text-sm font-semibold mb-4"
        style={{ color: "#111111", fontFamily: "'Playfair Display', serif" }}
      >
        This Week
      </h3>
      <ResponsiveContainer width="100%" height={240}>
        <BarChart data={weeklySales}>
          <CartesianGrid strokeDasharray="3 3" stroke="#f0f0eb" />
          <XAxis
            dataKey="day"
            tick={{ fontSize: 11, fill: "#cccccc" }}
            axisLine={false}
            tickLine={false}
          />
          <YAxis
            tick={{ fontSize: 11, fill: "#cccccc" }}
            axisLine={false}
            tickLine={false}
          />
          <Tooltip content={<CustomTooltip />} />
          <Bar dataKey="sales" radius={[4, 4, 0, 0]} barSize={28}>
            {weeklySales.map((entry, index) => (
              <Cell
                key={index}
                fill={entry.sales === max ? "#3a5a40" : "#e8e8e3"}
              />
            ))}
          </Bar>
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}