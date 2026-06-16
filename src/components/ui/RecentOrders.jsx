import { recentOrders } from "../../data/mockData";

const statusDot = {
  Completed: "#3a5a40",
  Serving: "#8b6f4c",
  Cancelled: "#cccccc",
};

const statusTextColor = {
  Completed: "#3a5a40",
  Serving: "#8b6f4c",
  Cancelled: "#aaaaaa",
};

export default function RecentOrders() {
  return (
    <div className="rounded-xl p-4 sm:p-5" style={{ background: "#ffffff", border: "1px solid #e8e8e3" }}>
      <h3
        className="text-sm font-semibold mb-4"
        style={{ color: "#111111", fontFamily: "'Playfair Display', serif" }}
      >
        Recent Orders
      </h3>
      <div className="space-y-1">
        {recentOrders.map((order) => (
          <div
            key={order.id}
            className="flex items-center gap-2 sm:gap-3 py-2 px-2 rounded-lg transition-colors hover:bg-[#fafafa]"
            style={{ borderBottom: "1px solid #f5f5f0" }}
          >
            {/* Left side */}
            <div className="flex-1 min-w-0">
              <div className="flex items-center gap-1.5 flex-wrap">
                <span
                  className="text-xs font-mono flex-shrink-0"
                  style={{ color: "#111111", fontWeight: 500 }}
                >
                  {order.id}
                </span>
                <span
                  className="w-1.5 h-1.5 rounded-full flex-shrink-0"
                  style={{ background: statusDot[order.status] }}
                />
                <span
                  className="text-xs font-medium flex-shrink-0"
                  style={{ color: statusTextColor[order.status] }}
                >
                  {order.status}
                </span>
              </div>
              <p
                className="text-xs mt-0.5 truncate"
                style={{ color: "#888888", maxWidth: "100%" }}
              >
                {order.items}
              </p>
            </div>

            {/* Right side */}
            <div className="text-right flex-shrink-0 ml-auto">
              <p
                className="text-xs font-semibold"
                style={{
                  fontFamily: "'Geist Mono', 'JetBrains Mono', monospace",
                  color: "#111111",
                  fontSize: "clamp(10px, 2.5vw, 12px)",
                }}
              >
                {order.amount}
              </p>
              <p className="text-[10px]" style={{ color: "#cccccc" }}>
                {order.time}
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}