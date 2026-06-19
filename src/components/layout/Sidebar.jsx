import { useState } from "react";
import {
  LayoutDashboard, ShoppingBag, Package, Users, Settings, ChevronLeft,
  TrendingUp, Bell, HelpCircle, LogOut
} from "lucide-react";

const menuSections = [
  {
    title: "Main menu",
    items: [
      { icon: LayoutDashboard, label: "Overview",    key: "overview" },
      { icon: TrendingUp,      label: "Analytics",   key: "analytics" },
    ],
  },
  {
    title: "Management",
    items: [
      { icon: ShoppingBag, label: "Transactions", key: "transactions" },
      { icon: Package,     label: "Products",     key: "products" },
      { icon: Users,       label: "Staff",        key: "staff" },
    ],
  },
  {
    title: "General",
    items: [
      { icon: Settings,    label: "Settings", key: "settings" },
      { icon: HelpCircle,  label: "Help",     key: "help" },
      { icon: LogOut,      label: "Logout",   key: "logout" },
    ],
  },
];

export default function Sidebar({ activePage, onNavigate }) {
  const [collapsed, setCollapsed] = useState(false);

  const handleClick = (key) => {
    if (key === "logout") {
      window.location.href = "/login";
      return;
    }
    onNavigate(key);
  };

  return (
    <aside
      className="relative flex flex-col h-screen transition-all duration-300 ease-in-out"
      style={{
        width: collapsed ? "76px" : "240px",
        background: "var(--bg-sidebar)",
        borderRight: "1px solid var(--color-latte)",
        boxShadow: "var(--shadow-xs)",
      }}
    >
      {/* Brand Area */}
      <div
        className="flex items-center px-5 overflow-hidden"
        style={{ height: 72, borderBottom: "1px solid var(--color-latte)" }}
      >
        {!collapsed ? (
          <p
            className="text-[15px] leading-tight whitespace-nowrap overflow-hidden"
            style={{ color: "var(--color-espresso)", fontFamily: "var(--font-serif)", fontWeight: 600, letterSpacing: "-0.01em" }}
          >
            Cafe Management
          </p>
        ) : (
          <p
            className="text-[15px] font-semibold"
            style={{ color: "var(--color-espresso)", fontFamily: "var(--font-serif)" }}
          >
            CM
          </p>
        )}
      </div>

      {/* Navigation Sections */}
      <nav className="flex-1 px-3 py-5 space-y-6 overflow-y-auto">
        {menuSections.map((section) => (
          <div key={section.title}>
            {!collapsed && (
              <p
                className="text-[10px] font-bold uppercase tracking-widest px-3 mb-2.5"
                style={{ color: "var(--text-muted)", letterSpacing: "0.08em" }}
              >
                {section.title}
              </p>
            )}
            <div className="space-y-1">
              {section.items.map(({ icon: Icon, label, key }) => {
                const active = activePage === key;
                const isLogout = key === "logout";

                return (
                  <button
                    key={key}
                    onClick={() => handleClick(key)}
                    className="relative w-full flex items-center gap-3 px-3 py-2.5 rounded-xl font-medium"
                    style={{
                      background: active && !isLogout ? "var(--bg-surface)" : "transparent",
                      color: active && !isLogout ? "var(--color-espresso)" : "var(--text-muted)",
                      transition: "background var(--duration-fast) var(--ease-default), color var(--duration-fast) var(--ease-default)",
                    }}
                    onMouseEnter={e => {
                      if (!active) {
                        e.currentTarget.style.background = "var(--bg-hover)";
                        e.currentTarget.style.color = isLogout ? "var(--color-danger)" : "var(--color-espresso)";
                      }
                    }}
                    onMouseLeave={e => {
                      if (!active) {
                        e.currentTarget.style.background = "transparent";
                        e.currentTarget.style.color = "var(--text-muted)";
                      }
                    }}
                  >
                    {/* Active indicator bar */}
                    {active && !isLogout && (
                      <span
                        className="absolute left-0 top-1/2 -translate-y-1/2 rounded-r-full"
                        style={{ width: 3, height: 18, background: "var(--color-crema)" }}
                      />
                    )}

                    <Icon
                      size={18}
                      strokeWidth={active && !isLogout ? 2.1 : 1.75}
                      className="flex-shrink-0"
                      style={{ color: active && !isLogout ? "var(--color-crema)" : "inherit" }}
                    />

                    {!collapsed && (
                      <span className="text-[13.5px] whitespace-nowrap overflow-hidden">{label}</span>
                    )}
                  </button>
                );
              })}
            </div>
          </div>
        ))}
      </nav>
      
      {/* Collapse Toggle Button */}
      <button
        onClick={() => setCollapsed(!collapsed)}
        className="absolute -right-3.5 top-9 flex items-center justify-center rounded-full transition-transform duration-150 hover:scale-110"
        style={{
          width: 28,
          height: 28,
          background: "var(--bg-card)",
          border: "1px solid var(--color-latte)",
          color: "var(--color-roasted)",
          boxShadow: "var(--shadow-sm)",
        }}
      >
        <ChevronLeft
          size={14}
          style={{ transform: collapsed ? "rotate(180deg)" : "rotate(0deg)", transition: "transform 0.3s" }}
        />
      </button>
    </aside>
  );
}