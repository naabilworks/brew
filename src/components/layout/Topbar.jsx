import { useState, useRef, useEffect } from "react";
import { Search, Bell, ChevronDown, Settings, HelpCircle, LogOut, User } from "lucide-react";

const notifications = [
  { id: 1, text: "New order #0147 just completed", time: "2 min ago" },
  { id: 2, text: "Staff Nurul started shift", time: "10 min ago" },
  { id: 3, text: "Inventory low: Croissant (2 left)", time: "1 hour ago" },
];

export default function Topbar() {
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

  // Tutup dropdown kalau klik di luar
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
      className="flex items-center justify-between px-6 py-4 border-b flex-shrink-0"
      style={{ borderColor: "#e8e8e3", background: "#ffffff" }}
    >
      {/* Left: greeting & date */}
      <div>
        <h1
          className="text-lg font-semibold leading-tight"
          style={{ color: "#111111", fontFamily: "'Playfair Display', serif" }}
        >
          {greeting}, Manager
        </h1>
        <p className="text-xs mt-0.5" style={{ color: "#aaaaaa" }}>
          {dateStr}
        </p>
      </div>

      {/* Right: search, notifications, profile */}
      <div className="flex items-center gap-3">
        {/* Search */}
        <div
          className="flex items-center gap-2 px-3 py-2 rounded-lg"
          style={{ background: "#f5f5f0", border: "1px solid #e8e8e3" }}
        >
          <Search size={13} style={{ color: "#aaaaaa" }} />
          <input
            type="text"
            placeholder="Search..."
            className="bg-transparent text-xs outline-none w-32"
            style={{ color: "#555555" }}
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
            className="relative flex items-center justify-center rounded-lg"
            style={{
              width: 36,
              height: 36,
              background: showNotif ? "#f0f0eb" : "#f5f5f0",
              border: "1px solid #e8e8e3",
            }}
          >
            <Bell size={14} style={{ color: "#aaaaaa" }} />
            {notifications.length > 0 && (
              <span
                className="absolute -top-0.5 -right-0.5 w-4 h-4 rounded-full flex items-center justify-center text-[9px] font-medium"
                style={{ background: "#111111", color: "#ffffff" }}
              >
                {notifications.length}
              </span>
            )}
          </button>

          {showNotif && (
            <div
              className="absolute right-0 mt-2 w-64 rounded-lg shadow-sm z-50"
              style={{ background: "#ffffff", border: "1px solid #e8e8e3" }}
            >
              <div className="p-3 border-b" style={{ borderColor: "#f5f5f0" }}>
                <p className="text-xs font-semibold" style={{ color: "#111111" }}>
                  Notifications
                </p>
              </div>
              <div className="max-h-48 overflow-y-auto">
                {notifications.map((n) => (
                  <div
                    key={n.id}
                    className="px-3 py-2 border-b last:border-b-0 hover:bg-[#fafafa] cursor-pointer transition-colors"
                    style={{ borderColor: "#f5f5f0" }}
                  >
                    <p className="text-xs" style={{ color: "#555555" }}>
                      {n.text}
                    </p>
                    <p className="text-[10px] mt-0.5" style={{ color: "#cccccc" }}>
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
            className="flex items-center gap-2 px-3 py-2 rounded-lg"
            style={{
              background: showProfile ? "#f0f0eb" : "#f5f5f0",
              border: "1px solid #e8e8e3",
            }}
          >
            <div
              className="rounded-full flex items-center justify-center text-xs font-medium"
              style={{ width: 22, height: 22, background: "#111111", color: "#ffffff" }}
            >
              M
            </div>
            <span className="text-xs" style={{ color: "#555555" }}>
              Manager
            </span>
            <ChevronDown
              size={12}
              style={{
                color: "#aaaaaa",
                transform: showProfile ? "rotate(180deg)" : "rotate(0deg)",
                transition: "transform 0.2s",
              }}
            />
          </button>

          {showProfile && (
            <div
              className="absolute right-0 mt-2 w-48 rounded-lg shadow-sm z-50"
              style={{ background: "#ffffff", border: "1px solid #e8e8e3" }}
            >
              <div className="p-2 border-b" style={{ borderColor: "#f5f5f0" }}>
                <p className="text-xs font-medium" style={{ color: "#111111" }}>
                  Manager
                </p>
                <p className="text-[10px]" style={{ color: "#cccccc" }}>
                  manager@brew.id
                </p>
              </div>
              <div className="py-1">
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
                    className="w-full flex items-center gap-3 px-3 py-2 text-xs hover:bg-[#fafafa] transition-colors"
                    style={{ color: "#555555" }}
                  >
                    <Icon size={13} style={{ color: "#aaaaaa" }} />
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