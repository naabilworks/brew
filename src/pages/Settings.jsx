import { useState } from "react";
import { Store, Bell, Shield, Palette, Save } from "lucide-react";

export default function Settings() {
  const [settings, setSettings] = useState({
    storeName: "Brewly Coffee",
    owner: "Raka Aditya",
    email: "hello@brewly.id",
    phone: "+62 812-3456-7890",
    address: "Jl. Kopi Nikmat No. 42, Bandung",
    openTime: "07:00",
    closeTime: "22:00",
    notificationOrder: true,
    notificationInventory: false,
    notificationStaff: true,
    theme: "light",
    language: "id",
  });

  const [saved, setSaved] = useState(false);

  const handleChange = (key, value) => {
    setSettings(prev => ({ ...prev, [key]: value }));
    setSaved(false);
  };

  const handleSave = () => {
    setSaved(true);
    setTimeout(() => setSaved(false), 2000);
  };

  const inputClass = "w-full text-sm px-3 py-2 rounded-lg bg-transparent outline-none";
  const labelClass = "text-xs uppercase tracking-widest mb-1.5 block";

  return (
    <div className="p-6 space-y-5" style={{ background: "#f5f5f0", minHeight: "100%" }}>
      
      {/* Header */}
      <div className="fade-up">
        <div className="flex items-center gap-2 mb-1">
          <span className="text-xs uppercase tracking-widest" style={{ color: "#cccccc", letterSpacing: "0.1em" }}>Dashboard</span>
          <span style={{ color: "#e8e8e3" }}>/</span>
          <span className="text-xs" style={{ color: "#aaaaaa" }}>Settings</span>
        </div>
        <div className="flex items-end justify-between">
          <h2 className="text-2xl" style={{ color: "#111111", fontFamily: "'Playfair Display', serif", fontWeight: 600 }}>
            Settings
          </h2>
          <button
            onClick={handleSave}
            className="flex items-center gap-2 text-xs px-4 py-2 rounded-lg transition-all"
            style={{
              background: saved ? "#f0f0eb" : "#111111",
              color: saved ? "#888888" : "#ffffff",
              border: `1px solid ${saved ? "#e8e8e3" : "#111111"}`,
            }}
            disabled={saved}
          >
            <Save size={12} /> {saved ? "Saved" : "Save Changes"}
          </button>
        </div>
      </div>

      <div className="grid grid-cols-2 gap-4 fade-up-1">
        
        {/* Store Information */}
        <div className="rounded-xl p-5 space-y-4" style={{ background: "#ffffff", border: "1px solid #e8e8e3" }}>
          <div className="flex items-center gap-2 mb-2">
            <Store size={16} style={{ color: "#111111" }} />
            <h3 className="text-sm font-semibold" style={{ color: "#111111", fontFamily: "'Playfair Display', serif" }}>Store Information</h3>
          </div>
          
          <div>
            <label className={labelClass} style={{ color: "#cccccc" }}>Store Name</label>
            <input
              type="text"
              className={inputClass}
              style={{ color: "#111111", border: "1px solid #e8e8e3", background: "#fafafa" }}
              value={settings.storeName}
              onChange={e => handleChange("storeName", e.target.value)}
            />
          </div>
          
          <div>
            <label className={labelClass} style={{ color: "#cccccc" }}>Owner Name</label>
            <input
              type="text"
              className={inputClass}
              style={{ color: "#111111", border: "1px solid #e8e8e3", background: "#fafafa" }}
              value={settings.owner}
              onChange={e => handleChange("owner", e.target.value)}
            />
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className={labelClass} style={{ color: "#cccccc" }}>Email</label>
              <input
                type="email"
                className={inputClass}
                style={{ color: "#111111", border: "1px solid #e8e8e3", background: "#fafafa" }}
                value={settings.email}
                onChange={e => handleChange("email", e.target.value)}
              />
            </div>
            <div>
              <label className={labelClass} style={{ color: "#cccccc" }}>Phone</label>
              <input
                type="text"
                className={inputClass}
                style={{ color: "#111111", border: "1px solid #e8e8e3", background: "#fafafa" }}
                value={settings.phone}
                onChange={e => handleChange("phone", e.target.value)}
              />
            </div>
          </div>

          <div>
            <label className={labelClass} style={{ color: "#cccccc" }}>Address</label>
            <input
              type="text"
              className={inputClass}
              style={{ color: "#111111", border: "1px solid #e8e8e3", background: "#fafafa" }}
              value={settings.address}
              onChange={e => handleChange("address", e.target.value)}
            />
          </div>
        </div>

        {/* Operational & Notifications */}
        <div className="space-y-4">
          
          {/* Operational Hours */}
          <div className="rounded-xl p-5 space-y-4" style={{ background: "#ffffff", border: "1px solid #e8e8e3" }}>
            <div className="flex items-center gap-2 mb-2">
              <Bell size={16} style={{ color: "#111111" }} />
              <h3 className="text-sm font-semibold" style={{ color: "#111111", fontFamily: "'Playfair Display', serif" }}>Operational Hours</h3>
            </div>
            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className={labelClass} style={{ color: "#cccccc" }}>Open</label>
                <input
                  type="time"
                  className={inputClass}
                  style={{ color: "#111111", border: "1px solid #e8e8e3", background: "#fafafa" }}
                  value={settings.openTime}
                  onChange={e => handleChange("openTime", e.target.value)}
                />
              </div>
              <div>
                <label className={labelClass} style={{ color: "#cccccc" }}>Close</label>
                <input
                  type="time"
                  className={inputClass}
                  style={{ color: "#111111", border: "1px solid #e8e8e3", background: "#fafafa" }}
                  value={settings.closeTime}
                  onChange={e => handleChange("closeTime", e.target.value)}
                />
              </div>
            </div>
          </div>

          {/* Notifications */}
          <div className="rounded-xl p-5 space-y-3" style={{ background: "#ffffff", border: "1px solid #e8e8e3" }}>
            <div className="flex items-center gap-2 mb-2">
              <Bell size={16} style={{ color: "#111111" }} />
              <h3 className="text-sm font-semibold" style={{ color: "#111111", fontFamily: "'Playfair Display', serif" }}>Notifications</h3>
            </div>
            
            {[
              { key: "notificationOrder",     label: "New order alerts" },
              { key: "notificationInventory", label: "Low stock alerts" },
              { key: "notificationStaff",     label: "Staff shift reminders" },
            ].map(item => (
              <div key={item.key} className="flex items-center justify-between py-1">
                <span className="text-sm" style={{ color: "#555555" }}>{item.label}</span>
                <button
                  onClick={() => handleChange(item.key, !settings[item.key])}
                  className="w-9 h-5 rounded-full relative transition-colors"
                  style={{
                    background: settings[item.key] ? "#111111" : "#e8e8e3",
                  }}
                >
                  <span
                    className="absolute top-0.5 w-4 h-4 rounded-full bg-white transition-all"
                    style={{
                      left: settings[item.key] ? "18px" : "2px",
                      boxShadow: "0 1px 3px rgba(0,0,0,0.1)",
                    }}
                  />
                </button>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Preferences */}
      <div className="rounded-xl p-5 space-y-3 fade-up-2" style={{ background: "#ffffff", border: "1px solid #e8e8e3" }}>
        <div className="flex items-center gap-2 mb-2">
          <Palette size={16} style={{ color: "#111111" }} />
          <h3 className="text-sm font-semibold" style={{ color: "#111111", fontFamily: "'Playfair Display', serif" }}>Preferences</h3>
        </div>
        <div className="flex items-center justify-between py-1">
          <div>
            <p className="text-sm font-medium" style={{ color: "#111111" }}>Dashboard Theme</p>
            <p className="text-xs" style={{ color: "#cccccc" }}>Light mode is currently applied</p>
          </div>
          <div className="flex gap-1 p-1 rounded-lg" style={{ background: "#f5f5f0" }}>
            {["light", "dark"].map(t => (
              <button
                key={t}
                onClick={() => handleChange("theme", t)}
                className="text-xs px-3 py-1.5 rounded-md capitalize transition-all"
                style={{
                  background: settings.theme === t ? "#111111" : "transparent",
                  color:      settings.theme === t ? "#ffffff" : "#aaaaaa",
                }}
              >
                {t}
              </button>
            ))}
          </div>
        </div>
        <div className="flex items-center justify-between py-1">
          <div>
            <p className="text-sm font-medium" style={{ color: "#111111" }}>Language</p>
            <p className="text-xs" style={{ color: "#cccccc" }}>Interface language</p>
          </div>
          <div className="flex gap-1 p-1 rounded-lg" style={{ background: "#f5f5f0" }}>
            {[
              { key: "id", label: "ID" },
              { key: "en", label: "EN" },
            ].map(lang => (
              <button
                key={lang.key}
                onClick={() => handleChange("language", lang.key)}
                className="text-xs px-3 py-1.5 rounded-md transition-all"
                style={{
                  background: settings.language === lang.key ? "#111111" : "transparent",
                  color:      settings.language === lang.key ? "#ffffff" : "#aaaaaa",
                }}
              >
                {lang.label}
              </button>
            ))}
          </div>
        </div>
      </div>

    </div>
  );
}