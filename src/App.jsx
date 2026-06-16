import Sidebar from "./components/layout/Sidebar";
import Topbar from "./components/layout/Topbar";
import Overview from "./pages/Overview";
import Transactions from "./pages/Transactions";
import Products from "./pages/Products";
import Staff from "./pages/Staff";
import Analytics from "./pages/Analytics";
import Settings from "./pages/Settings";
import Help from "./pages/Help";
import Login from "./pages/Login";
import { useState, useEffect } from "react";

export default function App() {
  const [page, setPage] = useState("overview");
  const [sidebarOpen, setSidebarOpen] = useState(false);

  useEffect(() => {
    const handler = (e) => setPage(e.detail);
    window.addEventListener("navigate", handler);
    return () => window.removeEventListener("navigate", handler);
  }, []);

  if (window.location.pathname === "/login") {
    return <Login />;
  }

  return (
    <div className="flex h-screen overflow-hidden" style={{ background: "#f5f5f0" }}>
      {/* Mobile overlay */}
      {sidebarOpen && (
        <div
          className="fixed inset-0 z-20 bg-black/30 lg:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* Sidebar */}
      <div
        className={`fixed lg:static z-30 h-full transition-transform duration-300 lg:translate-x-0 ${
          sidebarOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        <Sidebar
          activePage={page}
          onNavigate={(key) => {
            setPage(key);
            setSidebarOpen(false);
          }}
        />
      </div>

      <div className="flex flex-col flex-1 overflow-hidden min-w-0">
        <Topbar onMenuClick={() => setSidebarOpen(!sidebarOpen)} />
        <main className="flex-1 overflow-y-auto">
          {page === "overview"      && <Overview />}
          {page === "transactions"  && <Transactions />}
          {page === "products"      && <Products />}
          {page === "staff"         && <Staff />}
          {page === "analytics"     && <Analytics />}
          {page === "settings"      && <Settings />}
          {page === "help"          && <Help />}
        </main>
      </div>
    </div>
  );
}