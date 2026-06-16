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

  // Tangkap event navigasi dari Topbar (Settings, Help)
  useEffect(() => {
    const handler = (e) => setPage(e.detail);
    window.addEventListener("navigate", handler);
    return () => window.removeEventListener("navigate", handler);
  }, []);

  // Cek apakah di halaman login
  if (window.location.pathname === "/login") {
    return <Login />;
  }

  return (
    <div className="flex h-screen overflow-hidden" style={{ background: "#f5f5f0" }}>
      <Sidebar activePage={page} onNavigate={setPage} />
      <div className="flex flex-col flex-1 overflow-hidden">
        <Topbar />
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