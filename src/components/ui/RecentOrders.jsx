import { recentOrders } from "../../data/mockData";

const statusStyle = {
  Completed: { dot: "#5C7A4F", text: "#5C7A4F", bg: "var(--color-success-bg)" },
  Serving: { dot: "#B8732E", text: "#B8732E", bg: "var(--color-warning-bg)" },
  Cancelled: { dot: "#A8453E", text: "#A8453E", bg: "var(--color-danger-bg)" },
};

export default function RecentOrders() {
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
          Recent orders
        </h3>
        <p className="text-[11px]" style={{ color: "var(--text-muted)" }}>
          Latest activity from the floor
        </p>
      </div>

      <div className="space-y-1">
        {recentOrders.map((order) => {
          const s = statusStyle[order.status] || statusStyle.Completed;
          return (
            <div
              key={order.id}
              className="flex items-center gap-3 py-3 px-2.5 rounded-xl transition-colors"
              style={{ borderBottom: "1px solid var(--color-latte)" }}
              onMouseEnter={(e) => (e.currentTarget.style.background = "var(--bg-surface)")}
              onMouseLeave={(e) => (e.currentTarget.style.background = "transparent")}
            >
              {/* Left side */}
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2 flex-wrap mb-1">
                  <span
                    className="text-[12px] font-medium flex-shrink-0"
                    style={{ fontFamily: "'Space Grotesk', sans-serif", color: "var(--color-espresso)" }}
                  >
                    {order.id}
                  </span>
                  <span
                    className="flex items-center gap-1 text-[10px] font-semibold px-2 py-0.5 rounded-full flex-shrink-0"
                    style={{ color: s.text, background: s.bg }}
                  >
                    <span className="w-1.5 h-1.5 rounded-full" style={{ background: s.dot }} />
                    {order.status}
                  </span>
                </div>
                <p
                  className="text-[12px] truncate"
                  style={{ color: "var(--text-muted)", maxWidth: "100%" }}
                >
                  {order.items}
                </p>
              </div>

              {/* Right side */}
              <div className="text-right flex-shrink-0 ml-auto">
                <p
                  className="font-semibold"
                  style={{
                    fontFamily: "'Space Grotesk', sans-serif",
                    color: "var(--color-espresso)",
                    fontSize: "clamp(11px, 2.5vw, 13px)",
                  }}
                >
                  {order.amount}
                </p>
                <p className="text-[10px] mt-0.5" style={{ color: "var(--text-muted)" }}>
                  {order.time}
                </p>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}