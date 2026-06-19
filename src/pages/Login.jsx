export default function Login() {
  return (
    <div className="min-h-screen flex items-center justify-center" style={{ background: "#f5f5f0" }}>
      <div className="rounded-xl p-8 w-full max-w-sm" style={{ background: "#ffffff", border: "1px solid #e8e8e3" }}>
        <h1 className="text-2xl font-semibold mb-6" style={{ color: "#111111", fontFamily: "'Playfair Display', serif" }}>Brew Login</h1>
        <div className="space-y-4">
          <input
            type="text"
            placeholder="Username"
            className="w-full text-sm px-3 py-2 rounded-lg outline-none"
            style={{ border: "1px solid #e8e8e3", background: "#fafafa", color: "#111111" }}
          />
          <input
            type="password"
            placeholder="Password"
            className="w-full text-sm px-3 py-2 rounded-lg outline-none"
            style={{ border: "1px solid #e8e8e3", background: "#fafafa", color: "#111111" }}
          />
          <button
            className="w-full text-sm py-2 rounded-lg"
            style={{ background: "#111111", color: "#ffffff" }}
            onClick={() => window.location.href = "/"}
          >
            Sign In
          </button>
        </div>
      </div>
    </div>
  );
}