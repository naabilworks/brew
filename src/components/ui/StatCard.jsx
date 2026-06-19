import { DollarSign, ShoppingBag, TrendingUp, TrendingDown, Users } from "lucide-react";

const iconMap = {
  DollarSign: DollarSign,
  ShoppingBag: ShoppingBag,
  TrendingUp: TrendingUp,
  Users: Users,
};

export default function StatCard({ label, value, change, trend, icon, delay = 0 }) {
  const Icon = iconMap[icon] || DollarSign;
  const isUp = trend === "up";
  const TrendIcon = isUp ? TrendingUp : TrendingDown;

  return (
    <div
      className="rounded-2xl p-5"
      style={{
        background: "var(--bg-card)",
        border: "1px solid var(--color-latte)",
        boxShadow: "var(--shadow-sm)",
        transition: "transform var(--duration-base) var(--ease-default), box-shadow var(--duration-base) var(--ease-default)",
        animation: `fadeUp 0.4s ease-out ${delay * 0.1}s both`,
      }}
      onMouseEnter={(e) => {
        e.currentTarget.style.transform = "translateY(-3px)";
        e.currentTarget.style.boxShadow = "var(--shadow-md)";
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.transform = "translateY(0)";
        e.currentTarget.style.boxShadow = "var(--shadow-sm)";
      }}
    >
      <div className="flex items-start justify-between mb-4">
        <p
          className="text-[11px] font-semibold uppercase"
          style={{ color: "var(--text-muted)", letterSpacing: "0.08em" }}
        >
          {label}
        </p>
        <div
          className="flex items-center justify-center rounded-xl flex-shrink-0"
          style={{ width: 34, height: 34, background: "var(--bg-surface)" }}
        >
          <Icon size={16} style={{ color: "var(--color-espresso)" }} strokeWidth={2} />
        </div>
      </div>

      <p
        className="font-bold mb-3 tracking-tight break-all"
        style={{
          color: "var(--color-espresso)",
          fontFamily: "'Space Grotesk', sans-serif",
          fontSize: "clamp(20px, 4vw, 27px)",
          lineHeight: 1.1,
        }}
      >
        {value}
      </p>

      <div className="flex items-center gap-2 flex-wrap">
        <span
          className="flex items-center gap-1 text-[11px] font-semibold px-2 py-0.5 rounded-full"
          style={{
            color: isUp ? "var(--color-success)" : "var(--color-danger)",
            background: isUp ? "var(--color-success-bg)" : "var(--color-danger-bg)",
          }}
        >
          <TrendIcon size={11} strokeWidth={2.5} />
          {change}
        </span>
        <span className="text-[11px]" style={{ color: "var(--text-muted)" }}>
          vs yesterday
        </span>
      </div>
    </div>
  );
}