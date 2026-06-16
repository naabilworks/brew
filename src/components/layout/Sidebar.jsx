import { useState } from "react";
import {
  LayoutDashboard, ShoppingBag, Package, Users, Settings, ChevronLeft, Coffee,
  TrendingUp, Bell, HelpCircle, LogOut
} from "lucide-react";

const menuSections = [
  {
    title: "Main Menu",
    items: [
      { icon: LayoutDashboard, label: "Overview",    key: "overview" },
      { icon: TrendingUp,      label: "Analytics",   key: "analytics" },
    ],
  },
  {
    title: "Management",
    items: [
      { icon: ShoppingBag, label: "Transactions", key: "transactions" },
      { icon: Package,      label: "Products",     key: "products" },
      { icon: Users,        label: "Staff",        key: "staff" },
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
      // Aksi logout: misalnya redirect ke login page
      window.location.href = "/login"; // ganti sesuai route login kamu
      return;
    }
    onNavigate(key);
  };

  return (
    <aside
      className="relative flex flex-col h-screen border-r transition-all duration-300 ease-in-out"
      style={{ width: collapsed ? "64px" : "220px", background: "#ffffff", borderColor: "#e8e8e3" }}
    >
      {/* Logo */}
      <div className="flex items-center gap-3 px-4 py-6 overflow-hidden">
        <div className="flex-shrink-0 flex items-center justify-center rounded-lg" style={{ width: 32, height: 32, background: "#111111" }}>
          <Coffee size={16} color="#ffffff" strokeWidth={2} />
        </div>
        {!collapsed && (
          <div className="overflow-hidden whitespace-nowrap">
            <p className="text-sm font-semibold" style={{ color: "#111111", fontFamily: "'Playfair Display', serif" }}>Brew</p>
            <p className="text-xs" style={{ color: "#aaaaaa" }}>Management</p>
          </div>
        )}
      </div>

      {/* Navigation Sections */}
      <nav className="flex-1 px-2 space-y-4 overflow-y-auto">
        {menuSections.map((section) => (
          <div key={section.title}>
            {!collapsed && (
              <p
                className="text-xs uppercase tracking-widest px-3 mb-1.5"
                style={{ color: "#cccccc", letterSpacing: "0.1em" }}
              >
                {section.title}
              </p>
            )}
            <div className="space-y-0.5">
              {section.items.map(({ icon: Icon, label, key }) => {
                const active = activePage === key;
                return (
                  <button
                    key={key}
                    onClick={() => handleClick(key)}
                    className="w-full flex items-center gap-3 px-3 py-2.5 rounded-lg transition-all duration-150"
                    style={{
                      background: active && key !== "logout" ? "#f5f5f0" : "transparent",
                      color: active ? "#111111" : key === "logout" ? "#aaaaaa" : "#aaaaaa",
                      ...(key === "logout" && { color: "#aaaaaa" }),
                    }}
                    onMouseEnter={e => {
                      if (!active) e.currentTarget.style.color = key === "logout" ? "#111111" : "#555555";
                    }}
                    onMouseLeave={e => {
                      if (!active) e.currentTarget.style.color = key === "logout" ? "#aaaaaa" : "#aaaaaa";
                    }}
                  >
                    <Icon size={16} strokeWidth={active && key !== "logout" ? 2 : 1.5} className="flex-shrink-0" />
                    {!collapsed && <span className="text-sm whitespace-nowrap overflow-hidden">{label}</span>}
                    {active && !collapsed && key !== "logout" && (
                      <span className="ml-auto w-1 h-1 rounded-full" style={{ background: "#111111", opacity: 0.5 }} />
                    )}
                  </button>
                );
              })}
            </div>
          </div>
        ))}
      </nav>

      {/* Peak hours info */}
      {!collapsed && (
        <div className="p-4">
          <div className="rounded-lg p-3" style={{ background: "#f5f5f0", border: "1px solid #e8e8e3" }}>
            <div className="flex items-center gap-2 mb-1">
              <Bell size={12} style={{ color: "#aaaaaa" }} />
              <span className="text-xs" style={{ color: "#aaaaaa" }}>Today's peak</span>
            </div>
            <p className="text-sm font-medium" style={{ color: "#111111" }}>13:00 – 15:00</p>
            <p className="text-xs mt-0.5" style={{ color: "#aaaaaa" }}>47 orders in 2 hrs</p>
          </div>
        </div>
      )}

      {/* Collapse toggle */}
      <button
        onClick={() => setCollapsed(!collapsed)}
        className="absolute -right-3 top-8 flex items-center justify-center rounded-full transition-all duration-150 hover:scale-110"
        style={{ width: 22, height: 22, background: "#ffffff", border: "1px solid #e8e8e3", color: "#aaaaaa" }}
      >
        <ChevronLeft size={12} style={{ transform: collapsed ? "rotate(180deg)" : "rotate(0deg)", transition: "transform 0.3s" }} />
      </button>
    </aside>
  );
}