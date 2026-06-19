import { topProducts } from "../../data/mockData";

const rankStyles = [
  { bar: "#2C1810", badge: "#2C1810", badgeText: "#ffffff" },
  { bar: "#B8732E", badge: "var(--bg-surface)", badgeText: "#5C4233" },
  { bar: "#B8732E", badge: "var(--bg-surface)", badgeText: "#5C4233" },
  { bar: "#E8DDD0", badge: "var(--bg-surface)", badgeText: "#8A7968" },
  { bar: "#E8DDD0", badge: "var(--bg-surface)", badgeText: "#8A7968" },
];

export default function TopProducts() {
  return (
    <div
      className="rounded-2xl p-5 sm:p-6 h-full"
      style={{ background: "var(--bg-card)", border: "1px solid var(--color-latte)", boxShadow: "var(--shadow-sm)" }}
    >
      <div className="mb-5">
        <h3
          className="text-[15px] mb-0.5"
          style={{ color: "var(--color-espresso)", fontFamily: "var(--font-serif)", fontWeight: 600 }}
        >
          Top products
        </h3>
        <p className="text-[11px]" style={{ color: "var(--text-muted)" }}>
          Best sellers this week
        </p>
      </div>

      <div className="space-y-4">
        {topProducts.map((p, i) => {
          const style = rankStyles[i] || rankStyles[4];
          return (
            <div key={p.name}>
              <div className="flex justify-between items-center mb-1.5 gap-2">
                <div className="flex items-center gap-2.5 min-w-0">
                  <span
                    className="flex items-center justify-center text-[11px] font-bold flex-shrink-0 rounded-full"
                    style={{ width: 20, height: 20, background: style.badge, color: style.badgeText }}
                  >
                    {i + 1}
                  </span>
                  <span
                    className="text-[13px] font-medium truncate"
                    style={{ color: "var(--color-espresso)" }}
                  >
                    {p.name}
                  </span>
                </div>
                <span
                  className="text-[11px] flex-shrink-0"
                  style={{ fontFamily: "'Space Grotesk', sans-serif", color: "var(--text-muted)" }}
                >
                  {p.sales} sold
                </span>
              </div>
              <div className="w-full h-2 rounded-full" style={{ background: "var(--bg-surface)" }}>
                <div
                  className="h-full rounded-full transition-all duration-500"
                  style={{ width: `${p.percentage}%`, background: style.bar }}
                />
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}