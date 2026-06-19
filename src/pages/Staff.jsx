import { useState } from "react";
import { Search, Plus, Trash2, Users, Star, Clock, MapPin, ChevronUp, ChevronDown, X } from "lucide-react";

const initialStaff = [
  { id: 1,  name: "Andi Pratama",    role: "Cashier",   shift: "Morning",   performance: 94, status: "On Duty",  location: "Counter A", since: "08:00" },
  { id: 2,  name: "Budi Setiawan",   role: "Barista",   shift: "Morning",   performance: 91, status: "On Duty",  location: "Bar 1",     since: "07:30" },
  { id: 3,  name: "Sari Dewi",       role: "Cashier",   shift: "Afternoon", performance: 88, status: "On Duty",  location: "Counter B", since: "14:00" },
  { id: 4,  name: "Rizky Aditya",    role: "Barista",   shift: "Evening",   performance: 79, status: "On Duty",  location: "Bar 2",     since: "16:00" },
  { id: 5,  name: "Nurul Hidayah",   role: "Server",    shift: "Morning",   performance: 96, status: "On Duty",  location: "Floor",     since: "08:00" },
  { id: 6,  name: "Dimas Sulistyo",  role: "Server",    shift: "Afternoon", performance: 82, status: "Break",    location: "Floor",     since: "12:00" },
  { id: 7,  name: "Lina Mariani",    role: "Barista",   shift: "Evening",   performance: 85, status: "On Duty",  location: "Bar 1",     since: "17:00" },
  { id: 8,  name: "Faisal Rahman",   role: "Cashier",   shift: "Morning",   performance: 90, status: "Off Duty", location: "–",         since: "06:00" },
  { id: 9,  name: "Ayu Kencana",     role: "Server",    shift: "Afternoon", performance: 87, status: "On Duty",  location: "Floor",     since: "14:30" },
  { id: 10, name: "Bayu Nugroho",    role: "Barista",   shift: "Morning",   performance: 93, status: "On Duty",  location: "Bar 2",     since: "07:00" },
  { id: 11, name: "Citra Mahardika", role: "Cashier",   shift: "Evening",   performance: 76, status: "Off Duty", location: "–",         since: "16:00" },
  { id: 12, name: "Eko Prasetyo",    role: "Server",    shift: "Afternoon", performance: 81, status: "Break",    location: "Floor",     since: "13:00" },
];

const roles    = ["All", "Cashier", "Barista", "Server"];
const shifts   = ["All", "Morning", "Afternoon", "Evening"];
const statuses = ["All", "On Duty", "Break", "Off Duty"];

/* ---------- Palette (matched to Transactions / Overview / Analytics) ---------- */
const COLORS = {
  bg: "#f5f0e8",
  card: "#ffffff",
  border: "#e8ddc9",
  rowBorder: "#f1e9da",
  headerBg: "#faf6ee",
  accent: "#c17a4f",
  accentSoft: "rgba(193, 122, 79, 0.14)",
  text: "#2b211b",
  textMid: "#6f6354",
  textMuted: "#9c8f7c",
};

/* Reusable style untuk semua angka agar konsisten (Plus Jakarta Sans, bold) */
const numberStyle = {
  fontFamily: "'Plus Jakarta Sans', sans-serif",
  fontWeight: 700,
};

const statusStyle = {
  "On Duty":  { bg: "rgba(58, 122, 76, 0.1)",   color: "#3a7a4c",     dot: "#3a7a4c" },
  "Break":    { bg: "rgba(193, 122, 79, 0.12)", color: COLORS.accent, dot: COLORS.accent },
  "Off Duty": { bg: COLORS.headerBg,            color: COLORS.textMuted, dot: COLORS.textMuted },
};

function FilterGroup({ options, selected, setSelected }) {
  return (
    <div className="flex gap-1 p-1 rounded-lg flex-shrink-0" style={{ background: COLORS.card, border: `1px solid ${COLORS.border}` }}>
      {options.map(o => (
        <button
          key={o}
          onClick={() => setSelected(o)}
          className="text-xs px-2 sm:px-3 py-1.5 rounded-md transition-all whitespace-nowrap"
          style={{
            background: selected === o ? COLORS.accent : "transparent",
            color:      selected === o ? "#ffffff" : COLORS.textMuted,
          }}
        >
          {o}
        </button>
      ))}
    </div>
  );
}

export default function Staff() {
  const [staffList, setStaffList]       = useState(initialStaff);
  const [search, setSearch]             = useState("");
  const [roleFilter, setRoleFilter]     = useState("All");
  const [statusFilter, setStatusFilter] = useState("All");
  const [shiftFilter, setShiftFilter]   = useState("All");
  const [sortDir, setSortDir]           = useState("desc");
  const [showDeleteId, setShowDeleteId] = useState(null);
  const [showAddModal, setShowAddModal] = useState(false);
  const [newStaff, setNewStaff]         = useState({ name: "", role: "Barista", shift: "Morning", location: "Bar 1" });

  const filtered = staffList
    .filter(s => {
      if (roleFilter !== "All" && s.role !== roleFilter) return false;
      if (statusFilter !== "All" && s.status !== statusFilter) return false;
      if (shiftFilter !== "All" && s.shift !== shiftFilter) return false;
      if (search && !s.name.toLowerCase().includes(search.toLowerCase()) &&
          !s.role.toLowerCase().includes(search.toLowerCase())) return false;
      return true;
    })
    .sort((a, b) => sortDir === "desc" ? b.performance - a.performance : a.performance - b.performance);

  const deleteStaff = (id) => {
    setStaffList(prev => prev.filter(s => s.id !== id));
    setShowDeleteId(null);
  };

  const addStaff = () => {
    if (!newStaff.name.trim()) return;
    const id = Math.max(...staffList.map(s => s.id), 0) + 1;
    setStaffList(prev => [...prev, {
      id, ...newStaff,
      performance: Math.floor(Math.random() * 30) + 70,
      status: "On Duty",
      since: new Date().toLocaleTimeString("id-ID", { hour: "2-digit", minute: "2-digit" }),
    }]);
    setNewStaff({ name: "", role: "Barista", shift: "Morning", location: "Bar 1" });
    setShowAddModal(false);
  };

  const onDutyCount = staffList.filter(s => s.status === "On Duty").length;
  const avgPerf     = Math.round(staffList.reduce((sum, s) => sum + s.performance, 0) / staffList.length);
  const topPerf     = staffList.reduce((top, s) => s.performance > top.performance ? s : top, staffList[0]);

  return (
    <div className="p-4 sm:p-6 space-y-4 sm:space-y-5" style={{ background: COLORS.bg, minHeight: "100%" }}>

      {/* Header */}
      <div className="fade-up">
        <div className="flex items-center gap-2 mb-1">
          <span className="text-xs uppercase tracking-widest" style={{ color: COLORS.textMuted, letterSpacing: "0.1em" }}>Dashboard</span>
          <span style={{ color: COLORS.border }}>/</span>
          <span className="text-xs" style={{ color: COLORS.accent }}>Staff</span>
        </div>
        <div className="flex items-center justify-between gap-2 flex-wrap">
          <h2 className="text-xl sm:text-2xl" style={{ color: COLORS.text, fontFamily: "'Playfair Display', serif", fontWeight: 600 }}>
            Staff
          </h2>
          <button
            onClick={() => setShowAddModal(true)}
            className="flex items-center gap-2 text-xs px-3 py-2 rounded-lg"
            style={{ background: COLORS.accent, color: "#ffffff" }}
          >
            <Plus size={12} /> Add Staff
          </button>
        </div>
      </div>

      {/* Summary - 2 col mobile, 4 desktop */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 sm:gap-4 fade-up-1">
        {[
          { label: "Total Staff",      value: staffList.length,    numeric: true },
          { label: "On Duty",          value: onDutyCount,         numeric: true },
          { label: "Avg Performance",  value: `${avgPerf}%`,       numeric: true },
          { label: "Top Performer",    value: topPerf.name.split(" ")[0], numeric: false },
        ].map(card => (
          <div key={card.label} className="rounded-xl p-3 sm:p-4" style={{ background: COLORS.card, border: `1px solid ${COLORS.border}` }}>
            <p className="text-xs uppercase tracking-widest mb-1 sm:mb-2" style={{ color: COLORS.textMuted, letterSpacing: "0.1em" }}>{card.label}</p>
            <p
              className="text-base sm:text-xl"
              style={
                card.numeric
                  ? { color: COLORS.text, ...numberStyle }
                  : { color: COLORS.text, fontFamily: "'Playfair Display', serif", fontWeight: 600 }
              }
            >
              {card.value}
            </p>
          </div>
        ))}
      </div>

      {/* Filters */}
      <div className="flex flex-col gap-2 fade-up-2">
        {/* Search */}
        <div className="flex items-center gap-2 px-3 py-2 rounded-lg" style={{ background: COLORS.card, border: `1px solid ${COLORS.border}` }}>
          <Search size={13} style={{ color: COLORS.textMuted }} />
          <input
            type="text"
            placeholder="Search name or role..."
            className="bg-transparent text-xs outline-none w-full"
            style={{ color: COLORS.textMid }}
            value={search}
            onChange={e => setSearch(e.target.value)}
          />
        </div>

        {/* Filter tabs - scrollable */}
        <div className="flex gap-2 overflow-x-auto pb-1">
          <FilterGroup options={roles}    selected={roleFilter}   setSelected={setRoleFilter} />
          <FilterGroup options={statuses} selected={statusFilter} setSelected={setStatusFilter} />
          <FilterGroup options={shifts}   selected={shiftFilter}  setSelected={setShiftFilter} />
          <button
            onClick={() => setSortDir(d => d === "desc" ? "asc" : "desc")}
            className="flex items-center gap-1 text-xs px-3 py-2 rounded-lg flex-shrink-0"
            style={{ background: COLORS.card, border: `1px solid ${COLORS.border}`, color: COLORS.textMid }}
          >
            Perf {sortDir === "desc" ? <ChevronDown size={12} /> : <ChevronUp size={12} />}
          </button>
        </div>
      </div>

      {/* Mobile: Card layout */}
      <div className="flex flex-col gap-2 sm:hidden fade-up-3">
        {filtered.length === 0 ? (
          <div className="py-16 text-center rounded-xl" style={{ background: COLORS.card, border: `1px solid ${COLORS.border}` }}>
            <Users size={24} style={{ color: COLORS.border, margin: "0 auto 8px" }} />
            <p className="text-sm" style={{ color: COLORS.textMuted }}>No staff found</p>
          </div>
        ) : (
          filtered.map((staff) => {
            const st = statusStyle[staff.status];
            return (
              <div
                key={staff.id}
                className="rounded-xl p-4"
                style={{ background: COLORS.card, border: `1px solid ${COLORS.border}` }}
              >
                {/* Top row */}
                <div className="flex items-center justify-between mb-3">
                  <div className="flex items-center gap-2 min-w-0">
                    <div
                      className="flex items-center justify-center rounded-full flex-shrink-0 text-xs font-semibold"
                      style={{ width: 32, height: 32, background: COLORS.headerBg, color: COLORS.textMid }}
                    >
                      {staff.name.charAt(0)}
                    </div>
                    <div className="min-w-0">
                      <p className="text-sm font-medium truncate" style={{ color: COLORS.text }}>{staff.name}</p>
                      <p className="text-xs" style={{ color: COLORS.textMuted }}>{staff.role} · {staff.shift}</p>
                    </div>
                  </div>
                  <span
                    className="flex items-center gap-1.5 text-xs px-2.5 py-1 rounded-full flex-shrink-0 ml-2"
                    style={{ background: st.bg, color: st.color }}
                  >
                    <span className="w-1.5 h-1.5 rounded-full" style={{ background: st.dot }} />
                    {staff.status}
                  </span>
                </div>

                {/* Stats row */}
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-4">
                    <div className="flex items-center gap-1">
                      <Star size={12} style={{ color: COLORS.accent, fill: staff.performance >= 90 ? COLORS.accent : "none" }} />
                      <span className="text-sm" style={{ color: COLORS.text, ...numberStyle }}>{staff.performance}%</span>
                    </div>
                    <div className="flex items-center gap-1" style={{ color: COLORS.textMuted }}>
                      <MapPin size={11} />
                      <span className="text-xs">{staff.location}</span>
                    </div>
                    <div className="flex items-center gap-1" style={{ color: COLORS.textMuted }}>
                      <Clock size={11} />
                      <span className="text-xs" style={numberStyle}>{staff.since}</span>
                    </div>
                  </div>

                  {/* Delete */}
                  {showDeleteId === staff.id ? (
                    <div className="flex items-center gap-1">
                      <button
                        onClick={() => deleteStaff(staff.id)}
                        className="text-xs px-2 py-1 rounded"
                        style={{ background: COLORS.accent, color: "#ffffff" }}
                      >
                        Sure
                      </button>
                      <button
                        onClick={() => setShowDeleteId(null)}
                        className="text-xs px-2 py-1 rounded"
                        style={{ background: COLORS.headerBg, color: COLORS.textMuted }}
                      >
                        No
                      </button>
                    </div>
                  ) : (
                    <button
                      onClick={() => setShowDeleteId(staff.id)}
                      className="p-1.5 rounded-md"
                      style={{ color: COLORS.textMuted, background: COLORS.headerBg }}
                    >
                      <Trash2 size={13} />
                    </button>
                  )}
                </div>
              </div>
            );
          })
        )}
      </div>

      {/* Desktop: Table layout */}
      <div className="hidden sm:block rounded-xl overflow-hidden fade-up-3" style={{ background: COLORS.card, border: `1px solid ${COLORS.border}` }}>
        <div
          className="grid text-xs px-5 py-3"
          style={{
            gridTemplateColumns: "1fr 90px 80px 90px 90px 90px 90px",
            color: COLORS.textMuted,
            borderBottom: `1px solid ${COLORS.border}`,
            background: COLORS.headerBg,
          }}
        >
          <span>Name</span>
          <span>Role</span>
          <span>Shift</span>
          <span className="text-center">Perf.</span>
          <span className="text-center">Status</span>
          <span>Location</span>
          <span className="text-center">Since</span>
        </div>

        {filtered.length === 0 ? (
          <div className="py-16 text-center">
            <Users size={24} style={{ color: COLORS.border, margin: "0 auto 8px" }} />
            <p className="text-sm" style={{ color: COLORS.textMuted }}>No staff found</p>
          </div>
        ) : (
          filtered.map((staff, i) => {
            const st = statusStyle[staff.status];
            return (
              <div
                key={staff.id}
                className="grid items-center px-5 py-3 text-xs transition-colors"
                style={{
                  gridTemplateColumns: "1fr 90px 80px 90px 90px 90px 90px",
                  borderBottom: i < filtered.length - 1 ? `1px solid ${COLORS.rowBorder}` : "none",
                }}
                onMouseEnter={e => e.currentTarget.style.background = COLORS.headerBg}
                onMouseLeave={e => e.currentTarget.style.background = "transparent"}
              >
                <div className="flex items-center gap-3">
                  <div
                    className="flex items-center justify-center rounded-full flex-shrink-0"
                    style={{ width: 28, height: 28, background: COLORS.headerBg, color: COLORS.textMuted, fontSize: 11, fontWeight: 600 }}
                  >
                    {staff.name.charAt(0)}
                  </div>
                  <div>
                    <p className="font-medium" style={{ color: COLORS.text }}>{staff.name}</p>
                  </div>
                </div>
                <span className="px-2 py-0.5 rounded-full w-fit text-xs" style={{ background: COLORS.headerBg, color: COLORS.textMid }}>{staff.role}</span>
                <span style={{ color: COLORS.textMid }}>{staff.shift}</span>
                <div className="flex items-center justify-center gap-1.5">
                  <Star size={12} style={{ color: COLORS.accent, fill: staff.performance >= 90 ? COLORS.accent : "none" }} />
                  <span style={{ color: COLORS.text, ...numberStyle }}>{staff.performance}%</span>
                </div>
                <div className="flex justify-center">
                  <span
                    className="flex items-center gap-1.5 text-xs px-2.5 py-1 rounded-full"
                    style={{ background: st.bg, color: st.color }}
                  >
                    <span className="w-1.5 h-1.5 rounded-full" style={{ background: st.dot }} />
                    {staff.status}
                  </span>
                </div>
                <div className="flex items-center gap-1" style={{ color: COLORS.textMuted }}>
                  <MapPin size={11} />
                  <span>{staff.location}</span>
                </div>
                <div className="flex items-center justify-center gap-1" style={{ color: COLORS.textMuted }}>
                  <Clock size={11} />
                  <span style={numberStyle}>{staff.since}</span>
                </div>
              </div>
            );
          })
        )}
      </div>

      {/* Add Staff Modal */}
      {showAddModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4" style={{ background: "rgba(0,0,0,0.3)" }}>
          <div className="rounded-xl p-5 w-full max-w-md" style={{ background: COLORS.card, border: `1px solid ${COLORS.border}` }}>
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-semibold" style={{ color: COLORS.text, fontFamily: "'Playfair Display', serif" }}>Add Staff</h3>
              <button onClick={() => setShowAddModal(false)} style={{ color: COLORS.textMuted }}><X size={18} /></button>
            </div>
            <div className="space-y-3">
              <input
                type="text"
                placeholder="Full name"
                className="w-full text-sm px-3 py-2 rounded-lg outline-none"
                style={{ border: `1px solid ${COLORS.border}`, background: COLORS.headerBg, color: COLORS.text }}
                value={newStaff.name}
                onChange={e => setNewStaff(prev => ({ ...prev, name: e.target.value }))}
              />
              <select
                className="w-full text-sm px-3 py-2 rounded-lg outline-none"
                style={{ border: `1px solid ${COLORS.border}`, background: COLORS.headerBg, color: COLORS.text }}
                value={newStaff.role}
                onChange={e => setNewStaff(prev => ({ ...prev, role: e.target.value }))}
              >
                <option>Barista</option>
                <option>Cashier</option>
                <option>Server</option>
              </select>
              <select
                className="w-full text-sm px-3 py-2 rounded-lg outline-none"
                style={{ border: `1px solid ${COLORS.border}`, background: COLORS.headerBg, color: COLORS.text }}
                value={newStaff.shift}
                onChange={e => setNewStaff(prev => ({ ...prev, shift: e.target.value }))}
              >
                <option>Morning</option>
                <option>Afternoon</option>
                <option>Evening</option>
              </select>
              <input
                type="text"
                placeholder="Location (e.g., Bar 1)"
                className="w-full text-sm px-3 py-2 rounded-lg outline-none"
                style={{ border: `1px solid ${COLORS.border}`, background: COLORS.headerBg, color: COLORS.text }}
                value={newStaff.location}
                onChange={e => setNewStaff(prev => ({ ...prev, location: e.target.value }))}
              />
              <button
                onClick={addStaff}
                className="w-full text-sm py-2 rounded-lg"
                style={{ background: COLORS.accent, color: "#ffffff" }}
              >
                Add Staff
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}