import StatCard from "../components/ui/StatCard";
import RevenueChart from "../components/charts/RevenueChart";
import WeeklyChart from "../components/charts/WeeklyChart";
import TopProducts from "../components/ui/TopProducts";
import RecentOrders from "../components/ui/RecentOrders";
import { stats } from "../data/mockData";

export default function Overview() {
  return (
    <div className="p-4 sm:p-6 space-y-4 sm:space-y-5 overflow-y-auto h-full" style={{ background: "#f5f5f0" }}>
      
      {/* Page header */}
      <div className="fade-up">
        <div className="flex items-center gap-2 mb-1">
          <span
            className="text-xs uppercase tracking-widest"
            style={{ color: "#cccccc", letterSpacing: "0.1em" }}
          >
            Dashboard
          </span>
          <span style={{ color: "#e8e8e3" }}>/</span>
          <span className="text-xs" style={{ color: "#aaaaaa" }}>Overview</span>
        </div>
        <div className="flex items-center justify-between gap-2 flex-wrap">
          <h2
            className="text-xl sm:text-2xl"
            style={{ color: "#111111", fontFamily: "'Playfair Display', serif", fontWeight: 600 }}
          >
            Today's Summary
          </h2>
          <div className="flex items-center gap-1.5">
            <span className="w-1.5 h-1.5 rounded-full flex-shrink-0" style={{ background: "#111111" }} />
            <span className="text-xs" style={{ color: "#aaaaaa" }}>Live · updates every 30s</span>
          </div>
        </div>
      </div>

      {/* Stat cards - 1 col mobile, 2 tablet, 4 desktop */}
      <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-3 sm:gap-4">
        {stats.map((s, i) => (
          <StatCard key={s.id} {...s} delay={i} />
        ))}
      </div>

      {/* Charts row - stack on mobile, side by side on desktop */}
      <div className="grid grid-cols-1 xl:grid-cols-3 gap-3 sm:gap-4">
        <div className="xl:col-span-2">
          <RevenueChart />
        </div>
        <div>
          <WeeklyChart />
        </div>
      </div>

      {/* Bottom row - stack on mobile, side by side on desktop */}
      <div className="grid grid-cols-1 xl:grid-cols-3 gap-3 sm:gap-4 pb-4">
        <div className="xl:col-span-2">
          <RecentOrders />
        </div>
        <div>
          <TopProducts />
        </div>
      </div>

    </div>
  );
}