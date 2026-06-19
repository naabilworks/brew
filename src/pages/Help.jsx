import { HelpCircle, FileText, MessageCircle, ExternalLink } from "lucide-react";

/* ---------- Palette (matched to Transactions / Staff / Overview / Analytics) ---------- */
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

const faqs = [
  { q: "Bagaimana cara menambah produk baru?", a: "Buka halaman Products, klik tombol \"Add Product\" di kanan atas, lalu isi form yang muncul." },
  { q: "Apa arti status \"Serving\" pada transaksi?", a: "Pesanan sedang dibuat oleh barista, belum selesai." },
  { q: "Bagaimana mengubah shift staff?", a: "Fitur ini akan datang. Saat ini shift ditentukan saat menambah staff." },
  { q: "Apakah data transaksi bisa diekspor?", a: "Ya, di halaman Transactions ada tombol \"Export CSV\"." },
  { q: "Bagaimana menghubungi support?", a: "Email support@brew.id atau klik ikon chat di kanan bawah halaman ini." },
];

export default function Help() {
  return (
    <div className="p-6 space-y-5" style={{ background: COLORS.bg, minHeight: "100%" }}>
      {/* Header */}
      <div className="fade-up">
        <div className="flex items-center gap-2 mb-1">
          <span className="text-xs uppercase tracking-widest" style={{ color: COLORS.textMuted, letterSpacing: "0.1em" }}>General</span>
          <span style={{ color: COLORS.border }}>/</span>
          <span className="text-xs" style={{ color: COLORS.accent }}>Help</span>
        </div>
        <h2 className="text-2xl" style={{ color: COLORS.text, fontFamily: "'Playfair Display', serif", fontWeight: 600 }}>
          Help Center
        </h2>
      </div>

      {/* FAQ */}
      <div className="rounded-xl p-5 space-y-3 fade-up-1" style={{ background: COLORS.card, border: `1px solid ${COLORS.border}` }}>
        <div className="flex items-center gap-2 mb-2">
          <HelpCircle size={16} style={{ color: COLORS.accent }} />
          <h3 className="text-sm font-semibold" style={{ color: COLORS.text, fontFamily: "'Playfair Display', serif" }}>Frequently Asked Questions</h3>
        </div>
        {faqs.map((faq, i) => (
          <div key={i} className="py-2" style={{ borderBottom: i < faqs.length - 1 ? `1px solid ${COLORS.rowBorder}` : "none" }}>
            <p className="text-sm font-medium mb-1" style={{ color: COLORS.text }}>{faq.q}</p>
            <p className="text-xs" style={{ color: COLORS.textMid }}>{faq.a}</p>
          </div>
        ))}
      </div>

      {/* Contact */}
      <div className="grid grid-cols-2 gap-4 fade-up-2">
        <div className="rounded-xl p-5 space-y-3" style={{ background: COLORS.card, border: `1px solid ${COLORS.border}` }}>
          <div className="flex items-center gap-2">
            <FileText size={16} style={{ color: COLORS.accent }} />
            <h3 className="text-sm font-semibold" style={{ color: COLORS.text, fontFamily: "'Playfair Display', serif" }}>Documentation</h3>
          </div>
          <p className="text-xs" style={{ color: COLORS.textMid }}>Lihat panduan lengkap penggunaan dashboard Brew.</p>
          <a href="#" className="text-xs flex items-center gap-1 hover:underline" style={{ color: COLORS.text }}>
            Buka Dokumentasi <ExternalLink size={10} />
          </a>
        </div>

        <div className="rounded-xl p-5 space-y-3" style={{ background: COLORS.card, border: `1px solid ${COLORS.border}` }}>
          <div className="flex items-center gap-2">
            <MessageCircle size={16} style={{ color: COLORS.accent }} />
            <h3 className="text-sm font-semibold" style={{ color: COLORS.text, fontFamily: "'Playfair Display', serif" }}>Contact Support</h3>
          </div>
          <p className="text-xs" style={{ color: COLORS.textMid }}>Tim kami siap membantu lewat email atau chat.</p>
          <a href="mailto:support@brew.id" className="text-xs flex items-center gap-1 hover:underline" style={{ color: COLORS.text }}>
            support@brew.id <ExternalLink size={10} />
          </a>
        </div>
      </div>
    </div>
  );
}