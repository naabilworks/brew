import { topProducts } from "../../data/mockData";

const rankColors = [
  "#3a5a40", // 1st - olive
  "#8b6f4c", // 2nd - amber
  "#8b6f4c", // 3rd - amber
  "#cccccc", // 4th
  "#cccccc", // 5th
];

export default function TopProducts() {
  return (
    <div className="rounded-xl p-5" style={{ background: "#ffffff", border: "1px solid #e8e8e3" }}>
      <h3
        className="text-sm font-semibold mb-4"
        style={{ color: "#111111", fontFamily: "'Playfair Display', serif" }}
      >
        Top Products
      </h3>
      <div className="space-y-4">
        {topProducts.map((p, i) => (
          <div key={p.name}>
            <div className="flex justify-between items-baseline mb-1">
              <div className="flex items-center gap-2">
                <span
                  className="text-xs font-mono font-bold"
                  style={{ color: rankColors[i], minWidth: 16 }}
                >
                  {i + 1}
                </span>
                <span className="text-sm font-medium" style={{ color: "#111111" }}>
                  {p.name}
                </span>
              </div>
              <span
                className="text-xs"
                style={{ fontFamily: "'Geist Mono', 'JetBrains Mono', monospace", color: "#888888" }}
              >
                {p.sales} sold
              </span>
            </div>
            <div className="w-full h-1.5 rounded-full" style={{ background: "#f5f5f0" }}>
              <div
                className="h-full rounded-full transition-all duration-500"
                style={{
                  width: `${p.percentage}%`,
                  background: i === 0 ? "#3a5a40" : i < 3 ? "#8b6f4c" : "#cccccc",
                }}
              />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}