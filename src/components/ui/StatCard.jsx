import { DollarSign, ShoppingBag, TrendingUp, Users } from "lucide-react";

const iconMap = {
  DollarSign: DollarSign,
  ShoppingBag: ShoppingBag,
  TrendingUp: TrendingUp,
  Users: Users,
};

export default function StatCard({ label, value, change, trend, icon, delay = 0 }) {
  const Icon = iconMap[icon] || DollarSign;
  const isUp = trend === "up";
  return (
    <div
      className="rounded-xl p-4"
      style={{
        background: "#ffffff",
        border: "1px solid #e8e8e3",
        animation: `fadeUp 0.4s ease-out ${delay * 0.1}s both`,
      }}
    >
      <div className="flex items-start justify-between mb-3">
        <p
          className="text-xs uppercase tracking-widest"
          style={{ color: "#cccccc", letterSpacing: "0.1em" }}
        >
          {label}
        </p>
        <Icon size={16} style={{ color: "#111111", opacity: 0.3 }} />
      </div>
      <p
        className="font-bold mb-1 tracking-tight"
        style={{
          color: "#111111",
          fontFamily: "'Geist Mono', 'JetBrains Mono', monospace",
          fontSize: 28,
          lineHeight: 1.1,
        }}
      >
        {value}
      </p>
      <div className="flex items-center gap-1">
        <span
          className="text-xs font-medium"
          style={{ color: isUp ? "#3a5a40" : "#aaaaaa" }}
        >
          {change}
        </span>
        <span className="text-xs" style={{ color: "#aaaaaa" }}>
          vs yesterday
        </span>
      </div>
    </div>
  );
}