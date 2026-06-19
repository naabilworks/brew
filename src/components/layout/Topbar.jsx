import { useState, useRef, useEffect } from "react";
import { Search, Bell, ChevronDown, Settings, HelpCircle, LogOut, User, Menu } from "lucide-react";

const notifications = [
  { id: 1, text: "New order #0147 just completed", time: "2 min ago" },
  { id: 2, text: "Staff Nurul started shift", time: "10 min ago" },
  { id: 3, text: "Inventory low: Croissant (2 left)", time: "1 hour ago" },
];

export default function Topbar({ onMenuClick }) {
  const now = new Date();
  const hour = now.getHours();
  const greeting =
    hour < 12 ? "Good morning" : hour < 17 ? "Good afternoon" : "Good evening";

  const dateStr = now.toLocaleDateString("en-GB", {
    weekday: "long",
    day: "numeric",
    month: "long",
    year: "numeric",
  });

  const [searchValue, setSearchValue] = useState("");
  const [showNotif, setShowNotif] = useState(false);
  const [showProfile, setShowProfile] = useState(false);

  const notifRef = useRef(null);
  const profileRef = useRef(null);

  useEffect(() => {
    const handler = (e) => {
      if (notifRef.current && !notifRef.current.contains(e.target)) {
        setShowNotif(false);
      }
      if (profileRef.current && !profileRef.current.contains(e.target)) {
        setShowProfile(false);
      }
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, []);

  return (
    <header
      className="flex items-center justify-between px-6 flex-shrink-0"
      style={{
        height: 72,
        borderBottom: "1px solid var(--color-latte)",
        background: "var(--bg-card)",
      }}
    >
      {/* Left: hamburger + greeting */}
      <div className="flex items-center gap-4">
        <button
          onClick={onMenuClick}
          className="flex lg:hidden items-center justify-center rounded-xl"
          style={{ width: 38, height: 38, background: "var(--bg-surface)" }}
        >
          <Menu size={16} style={{ color: "var(--color-roasted)" }} />
        </button>

        <div>
          <h1
            className="text-lg leading-tight"
            style={{ color: "var(--color-espresso)", fontFamily: "var(--font-serif)", fontWeight: 600 }}
          >
            {greeting}, Manager
          </h1>
          <p className="text-xs mt-0.5 hidden sm:block" style={{ color: "var(--text-muted)" }}>
            {dateStr}
          </p>
        </div>
      </div>

      {/* Right: search, notifications, profile */}
      <div className="flex items-center gap-3">
        {/* Search */}
        <div
          className="hidden sm:flex items-center gap-2.5 px-3.5 py-2.5 rounded-xl transition-colors"
          style={{ background: "var(--bg-surface)", width: 220 }}
        >
          <Search size={14} style={{ color: "var(--text-muted)" }} />
          <input
            type="text"
            placeholder="Search anything..."
            className="bg-transparent text-[13px] outline-none w-full"
            style={{ color: "var(--color-espresso)" }}
            value={searchValue}
            onChange={(e) => setSearchValue(e.target.value)}
          />
        </div>

        {/* Notifications */}
        <div className="relative" ref={notifRef}>
          <button
            onClick={() => {
              setShowNotif(!showNotif);
              setShowProfile(false);
            }}
            className="relative flex items-center justify-center rounded-xl transition-colors"
            style={{
              width: 40,
              height: 40,
              background: showNotif ? "var(--bg-hover)" : "var(--bg-surface)",
            }}
          >
            <Bell size={15} style={{ color: "var(--color-roasted)" }} />
            {notifications.length > 0 && (
              <span
                className="absolute -top-1 -right-1 w-4 h-4 rounded-full flex items-center justify-center text-[9px] font-bold"
                style={{ background: "var(--color-crema)", color: "#ffffff" }}
              >
                {notifications.length}
              </span>
            )}
          </button>

          {showNotif && (
            <div
              className="absolute right-0 mt-2.5 w-72 rounded-2xl z-50 overflow-hidden"
              style={{ background: "var(--bg-card)", border: "1px solid var(--color-latte)", boxShadow: "var(--shadow-lg)" }}
            >
              <div className="px-4 py-3" style={{ borderBottom: "1px solid var(--color-latte)" }}>
                <p className="text-[13px] font-semibold" style={{ color: "var(--color-espresso)" }}>
                  Notifications
                </p>
              </div>
              <div className="max-h-56 overflow-y-auto">
                {notifications.map((n) => (
                  <div
                    key={n.id}
                    className="px-4 py-3 cursor-pointer transition-colors"
                    style={{ borderBottom: "1px solid var(--color-latte)" }}
                    onMouseEnter={e => e.currentTarget.style.background = "var(--bg-surface)"}
                    onMouseLeave={e => e.currentTarget.style.background = "transparent"}
                  >
                    <p className="text-[13px]" style={{ color: "var(--color-roasted)" }}>
                      {n.text}
                    </p>
                    <p className="text-[11px] mt-1" style={{ color: "var(--text-muted)" }}>
                      {n.time}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Profile */}
        <div className="relative" ref={profileRef}>
          <button
            onClick={() => {
              setShowProfile(!showProfile);
              setShowNotif(false);
            }}
            className="flex items-center gap-2.5 pl-2 pr-3 py-2 rounded-xl transition-colors"
            style={{ background: showProfile ? "var(--bg-hover)" : "var(--bg-surface)" }}
          >
            <div
              className="rounded-full flex items-center justify-center text-xs font-bold"
              style={{ width: 26, height: 26, background: "var(--color-espresso)", color: "#ffffff" }}
            >
              M
            </div>
            <span className="text-[13px] font-medium hidden sm:block" style={{ color: "var(--color-espresso)" }}>
              Manager
            </span>
            <ChevronDown
              size={13}
              style={{
                color: "var(--text-muted)",
                transform: showProfile ? "rotate(180deg)" : "rotate(0deg)",
                transition: "transform 0.2s",
              }}
            />
          </button>

          {showProfile && (
            <div
              className="absolute right-0 mt-2.5 w-52 rounded-2xl z-50 overflow-hidden"
              style={{ background: "var(--bg-card)", border: "1px solid var(--color-latte)", boxShadow: "var(--shadow-lg)" }}
            >
              <div className="px-4 py-3" style={{ borderBottom: "1px solid var(--color-latte)" }}>
                <p className="text-[13px] font-semibold" style={{ color: "var(--color-espresso)" }}>
                  Manager
                </p>
                <p className="text-[11px] mt-0.5" style={{ color: "var(--text-muted)" }}>
                  manager@brew.id
                </p>
              </div>
              <div className="py-1.5">
                {[
                  { icon: User, label: "Profile", action: () => alert("Profile page") },
                  {
                    icon: Settings,
                    label: "Settings",
                    action: () =>
                      window.dispatchEvent(new CustomEvent("navigate", { detail: "settings" })),
                  },
                  {
                    icon: HelpCircle,
                    label: "Help",
                    action: () =>
                      window.dispatchEvent(new CustomEvent("navigate", { detail: "help" })),
                  },
                  { icon: LogOut, label: "Logout", action: () => (window.location.href = "/login") },
                ].map(({ icon: Icon, label, action }) => (
                  <button
                    key={label}
                    onClick={() => {
                      setShowProfile(false);
                      action();
                    }}
                    className="w-full flex items-center gap-3 px-4 py-2.5 text-[13px] transition-colors font-medium"
                    style={{ color: "var(--color-roasted)" }}
                    onMouseEnter={e => e.currentTarget.style.background = "var(--bg-surface)"}
                    onMouseLeave={e => e.currentTarget.style.background = "transparent"}
                  >
                    <Icon size={14} style={{ color: "var(--color-crema)" }} />
                    {label}
                  </button>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </header>
  );
}