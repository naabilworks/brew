import { topProducts } from "../../data/mockData";

const rankColors = [
  "#3a5a40",
  "#8b6f4c",
  "#8b6f4c",
  "#cccccc",
  "#cccccc",
];

export default function TopProducts() {
  return (
    <div className="rounded-xl p-4 sm:p-5" style={{ background: "#ffffff", border: "1px solid #e8e8e3" }}>
      <h3
        className="text-sm font-semibold mb-4"
        style={{ color: "#111111", fontFamily: "'Playfair Display', serif" }}
      >
        Top Products
      </h3>
      <div className="space-y-3 sm:space-y-4">
        {topProducts.map((p, i) => (
          <div key={p.name}>
            <div className="flex justify-between items-center mb-1 gap-2">
              <div className="flex items-center gap-2 min-w-0">
                <span
                  className="text-xs font-mono font-bold flex-shrink-0"
                  style={{ color: rankColors[i], minWidth: 16 }}
                >
                  {i + 1}
                </span>
                <span
                  className="text-sm font-medium truncate"
                  style={{ color: "#111111" }}
                >
                  {p.name}
                </span>
              </div>
              <span
                className="text-xs flex-shrink-0"
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