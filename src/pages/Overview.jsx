import StatCard from "../components/ui/StatCard";
import RevenueChart from "../components/charts/RevenueChart";
import WeeklyChart from "../components/charts/WeeklyChart";
import TopProducts from "../components/ui/TopProducts";
import RecentOrders from "../components/ui/RecentOrders";
import { stats } from "../data/mockData";

export default function Overview() {
  return (
    <div
      className="p-4 sm:p-6 lg:p-8 space-y-6 sm:space-y-8 overflow-y-auto h-full"
      style={{ background: "var(--bg-main)" }}
    >

      {/* 1. Page Header & Breadcrumbs */}
      <div className="fade-up flex flex-col sm:flex-row sm:items-end justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 mb-2">
            <span
              className="text-[10px] sm:text-xs font-bold uppercase"
              style={{ color: "var(--text-muted)", letterSpacing: "0.1em" }}
            >
              Dashboard
            </span>
            <span style={{ color: "var(--color-latte)" }}>/</span>
            <span className="text-[10px] sm:text-xs font-medium" style={{ color: "var(--color-roasted)" }}>
              Overview
            </span>
          </div>
          <h2
            className="text-2xl sm:text-3xl tracking-tight"
            style={{ color: "var(--color-espresso)", fontFamily: "var(--font-serif)", fontWeight: 700 }}
          >
            Today's summary
          </h2>
        </div>

        {/* 2. Live Indicator */}
        <div
          className="flex items-center gap-2 px-3.5 py-2 rounded-full w-fit"
          style={{ background: "var(--bg-card)", border: "1px solid var(--color-latte)", boxShadow: "var(--shadow-xs)" }}
        >
          <span className="relative flex h-2 w-2">
            <span
              className="animate-ping absolute inline-flex h-full w-full rounded-full opacity-75"
              style={{ backgroundColor: "var(--color-crema)" }}
            ></span>
            <span
              className="relative inline-flex rounded-full h-2 w-2"
              style={{ backgroundColor: "var(--color-crema)" }}
            ></span>
          </span>
          <span className="text-xs font-medium" style={{ color: "var(--text-muted)" }}>
            Live · updates every 30s
          </span>
        </div>
      </div>

      {/* 3. Stat Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4 sm:gap-6">
        {stats.map((s, i) => (
          <StatCard key={s.id} {...s} delay={i} />
        ))}
      </div>

      {/* 4. Charts Row */}
      <div className="grid grid-cols-1 xl:grid-cols-3 gap-4 sm:gap-6">
        <div className="xl:col-span-2">
          <RevenueChart />
        </div>
        <div>
          <WeeklyChart />
        </div>
      </div>

      {/* 5. Bottom Row */}
      <div className="grid grid-cols-1 xl:grid-cols-3 gap-4 sm:gap-6 pb-4">
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