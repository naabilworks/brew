import { useState } from "react";
import { Search, Plus, Edit2, Trash2, Package, ChevronUp, ChevronDown, X } from "lucide-react";

const initialProducts = [
  { id: 1,  name: "Es Kopi Susu",        category: "Beverage",  price: 25000,  stock: 142, sold: 89,  status: "Active"   },
  { id: 2,  name: "Matcha Latte",        category: "Beverage",  price: 35000,  stock: 98,  sold: 64,  status: "Active"   },
  { id: 3,  name: "Cold Brew",           category: "Beverage",  price: 30000,  stock: 76,  sold: 55,  status: "Active"   },
  { id: 4,  name: "Croissant",           category: "Pastry",    price: 20000,  stock: 45,  sold: 120, status: "Active"   },
  { id: 5,  name: "Avocado Toast",       category: "Food",      price: 45000,  stock: 30,  sold: 42,  status: "Active"   },
  { id: 6,  name: "Banana Bread",        category: "Pastry",    price: 22000,  stock: 0,   sold: 28,  status: "Inactive" },
  { id: 7,  name: "Iced Chocolate",      category: "Beverage",  price: 28000,  stock: 110, sold: 73,  status: "Active"   },
  { id: 8,  name: "Bagel with Cream",    category: "Food",      price: 38000,  stock: 18,  sold: 35,  status: "Active"   },
  { id: 9,  name: "Lemon Tart",          category: "Pastry",    price: 25000,  stock: 22,  sold: 19,  status: "Active"   },
  { id: 10, name: "Americano",           category: "Beverage",  price: 22000,  stock: 200, sold: 101, status: "Active"   },
  { id: 11, name: "Grilled Sandwich",    category: "Food",      price: 42000,  stock: 12,  sold: 31,  status: "Active"   },
  { id: 12, name: "Cinnamon Roll",       category: "Pastry",    price: 18000,  stock: 0,   sold: 44,  status: "Inactive" },
];

const fmt = (v) => `Rp ${v.toLocaleString("id-ID")}`;
const categories = ["All", "Beverage", "Pastry", "Food"];

export default function Products() {
  const [products, setProducts]         = useState(initialProducts);
  const [search, setSearch]             = useState("");
  const [catFilter, setCatFilter]       = useState("All");
  const [sortDir, setSortDir]           = useState("desc");
  const [sortBy, setSortBy]             = useState("sold");
  const [showDeleteId, setShowDeleteId] = useState(null);
  const [showAddModal, setShowAddModal] = useState(false);
  const [newProduct, setNewProduct]     = useState({ name: "", category: "Beverage", price: 0, stock: 0 });

  const filtered = products
    .filter(p => {
      const matchCat    = catFilter === "All" || p.category === catFilter;
      const matchSearch = p.name.toLowerCase().includes(search.toLowerCase()) ||
                          p.category.toLowerCase().includes(search.toLowerCase());
      return matchCat && matchSearch;
    })
    .sort((a, b) => sortDir === "desc" ? b[sortBy] - a[sortBy] : a[sortBy] - b[sortBy]);

  const toggleStatus = (id) => {
    setProducts(prev => prev.map(p => p.id === id ? { ...p, status: p.status === "Active" ? "Inactive" : "Active" } : p));
  };

  const deleteProduct = (id) => {
    setProducts(prev => prev.filter(p => p.id !== id));
    setShowDeleteId(null);
  };

  const addProduct = () => {
    if (!newProduct.name.trim()) return;
    const id = Math.max(...products.map(p => p.id), 0) + 1;
    setProducts(prev => [...prev, { id, ...newProduct, sold: 0, status: "Active" }]);
    setNewProduct({ name: "", category: "Beverage", price: 0, stock: 0 });
    setShowAddModal(false);
  };

  const totalValue = products
    .filter(p => p.status === "Active")
    .reduce((sum, p) => sum + (p.price * p.stock), 0);

  return (
    <div className="p-4 sm:p-6 space-y-4 sm:space-y-5" style={{ background: "#f5f5f0", minHeight: "100%" }}>

      {/* Header */}
      <div className="fade-up">
        <div className="flex items-center gap-2 mb-1">
          <span className="text-xs uppercase tracking-widest" style={{ color: "#cccccc", letterSpacing: "0.1em" }}>Dashboard</span>
          <span style={{ color: "#e8e8e3" }}>/</span>
          <span className="text-xs" style={{ color: "#aaaaaa" }}>Products</span>
        </div>
        <div className="flex items-center justify-between gap-2 flex-wrap">
          <h2 className="text-xl sm:text-2xl" style={{ color: "#111111", fontFamily: "'Playfair Display', serif", fontWeight: 600 }}>
            Products
          </h2>
          <button
            onClick={() => setShowAddModal(true)}
            className="flex items-center gap-2 text-xs px-3 py-2 rounded-lg"
            style={{ background: "#111111", color: "#ffffff" }}
          >
            <Plus size={12} /> Add Product
          </button>
        </div>
      </div>

      {/* Summary Cards - 2 col mobile, 4 desktop */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 sm:gap-4 fade-up-1">
        {[
          { label: "Total Products", value: products.length },
          { label: "Active",          value: products.filter(p => p.status === "Active").length },
          { label: "Out of Stock",    value: products.filter(p => p.stock === 0).length },
          { label: "Inventory Value", value: fmt(totalValue) },
        ].map(s => (
          <div key={s.label} className="rounded-xl p-3 sm:p-4" style={{ background: "#ffffff", border: "1px solid #e8e8e3" }}>
            <p className="text-xs uppercase tracking-widest mb-1 sm:mb-2" style={{ color: "#cccccc", letterSpacing: "0.1em" }}>{s.label}</p>
            <p className="text-base sm:text-xl font-semibold" style={{ color: "#111111", fontFamily: "'Playfair Display', serif" }}>{s.value}</p>
          </div>
        ))}
      </div>

      {/* Filters */}
      <div className="flex flex-col gap-2 fade-up-2">
        {/* Row 1: Search */}
        <div className="flex items-center gap-2 px-3 py-2 rounded-lg" style={{ background: "#ffffff", border: "1px solid #e8e8e3" }}>
          <Search size={13} style={{ color: "#aaaaaa" }} />
          <input
            type="text"
            placeholder="Search products..."
            className="bg-transparent text-xs outline-none w-full"
            style={{ color: "#555555" }}
            value={search}
            onChange={e => setSearch(e.target.value)}
          />
        </div>

        {/* Row 2: Category + Sort */}
        <div className="flex gap-2 overflow-x-auto">
          {/* Category tabs */}
          <div className="flex gap-1 p-1 rounded-lg flex-shrink-0" style={{ background: "#ffffff", border: "1px solid #e8e8e3" }}>
            {categories.map(c => (
              <button
                key={c}
                onClick={() => setCatFilter(c)}
                className="text-xs px-2.5 py-1.5 rounded-md transition-all whitespace-nowrap"
                style={{
                  background: catFilter === c ? "#111111" : "transparent",
                  color:      catFilter === c ? "#ffffff" : "#aaaaaa",
                }}
              >
                {c}
              </button>
            ))}
          </div>

          {/* Sort tabs */}
          <div className="flex gap-1 p-1 rounded-lg flex-shrink-0" style={{ background: "#ffffff", border: "1px solid #e8e8e3" }}>
            {[
              { key: "sold",  label: "Best Seller" },
              { key: "stock", label: "Stock" },
              { key: "price", label: "Price" },
            ].map(s => (
              <button
                key={s.key}
                onClick={() => { setSortBy(s.key); setSortDir(d => sortBy === s.key ? (d === "desc" ? "asc" : "desc") : "desc"); }}
                className="flex items-center gap-1 text-xs px-2.5 py-1.5 rounded-md transition-all whitespace-nowrap"
                style={{
                  background: sortBy === s.key ? "#f5f5f0" : "transparent",
                  color:      sortBy === s.key ? "#111111" : "#aaaaaa",
                }}
              >
                {s.label}
                {sortBy === s.key && (sortDir === "desc" ? <ChevronDown size={12} /> : <ChevronUp size={12} />)}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Mobile: Card layout */}
      <div className="flex flex-col gap-2 sm:hidden fade-up-3">
        {filtered.length === 0 ? (
          <div className="py-16 text-center rounded-xl" style={{ background: "#ffffff", border: "1px solid #e8e8e3" }}>
            <Package size={24} style={{ color: "#e8e8e3", margin: "0 auto 8px" }} />
            <p className="text-sm" style={{ color: "#cccccc" }}>No products found</p>
          </div>
        ) : (
          filtered.map((product) => (
            <div
              key={product.id}
              className="rounded-xl p-4"
              style={{ background: "#ffffff", border: "1px solid #e8e8e3" }}
            >
              {/* Top row */}
              <div className="flex items-center justify-between mb-2">
                <div className="flex items-center gap-2 min-w-0">
                  <div className="flex items-center justify-center rounded-md flex-shrink-0" style={{ width: 28, height: 28, background: "#f5f5f0" }}>
                    <Package size={12} style={{ color: "#aaaaaa" }} />
                  </div>
                  <span className="font-medium text-sm truncate" style={{ color: "#111111" }}>{product.name}</span>
                </div>
                <button
                  onClick={() => toggleStatus(product.id)}
                  className="text-xs px-2.5 py-1 rounded-full flex-shrink-0 ml-2"
                  style={{
                    background: product.status === "Active" ? "#edf3ee" : "#fafafa",
                    color: product.status === "Active" ? "#3a5a40" : "#cccccc",
                  }}
                >
                  {product.status}
                </button>
              </div>

              {/* Info row */}
              <div className="flex items-center gap-3 mb-3">
                <span className="text-xs px-2 py-0.5 rounded-full" style={{ background: "#f5f5f0", color: "#888888" }}>
                  {product.category}
                </span>
                <span className="text-xs font-mono" style={{ color: "#333333" }}>{fmt(product.price)}</span>
              </div>

              {/* Stats + Actions */}
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-4">
                  <div>
                    <p className="text-xs" style={{ color: "#cccccc" }}>Stock</p>
                    <p className="text-sm font-mono font-medium" style={{ color: product.stock === 0 ? "#cccccc" : "#555555" }}>{product.stock}</p>
                  </div>
                  <div>
                    <p className="text-xs" style={{ color: "#cccccc" }}>Sold</p>
                    <p className="text-sm font-mono font-medium" style={{ color: "#555555" }}>{product.sold}</p>
                  </div>
                </div>

                {/* Actions */}
                <div className="flex items-center gap-1">
                  <button className="p-1.5 rounded-md" style={{ color: "#aaaaaa", background: "#f5f5f0" }}>
                    <Edit2 size={13} />
                  </button>
                  {showDeleteId === product.id ? (
                    <div className="flex items-center gap-1">
                      <button
                        onClick={() => deleteProduct(product.id)}
                        className="text-xs px-2 py-1 rounded"
                        style={{ background: "#111111", color: "#ffffff" }}
                      >
                        Sure
                      </button>
                      <button
                        onClick={() => setShowDeleteId(null)}
                        className="text-xs px-2 py-1 rounded"
                        style={{ background: "#f5f5f0", color: "#aaaaaa" }}
                      >
                        No
                      </button>
                    </div>
                  ) : (
                    <button
                      onClick={() => setShowDeleteId(product.id)}
                      className="p-1.5 rounded-md"
                      style={{ color: "#aaaaaa", background: "#f5f5f0" }}
                    >
                      <Trash2 size={13} />
                    </button>
                  )}
                </div>
              </div>
            </div>
          ))
        )}
      </div>

      {/* Desktop: Table layout */}
      <div className="hidden sm:block rounded-xl overflow-hidden fade-up-3" style={{ background: "#ffffff", border: "1px solid #e8e8e3" }}>
        <div
          className="grid text-xs px-5 py-3"
          style={{
            gridTemplateColumns: "1fr 100px 90px 80px 80px 90px 100px",
            color: "#cccccc",
            borderBottom: "1px solid #f0f0eb",
            background: "#fafafa",
          }}
        >
          <span>Product</span>
          <span>Category</span>
          <span className="text-right">Price</span>
          <span className="text-right">Stock</span>
          <span className="text-right">Sold</span>
          <span className="text-center">Status</span>
          <span className="text-center">Actions</span>
        </div>

        {filtered.length === 0 ? (
          <div className="py-16 text-center">
            <Package size={24} style={{ color: "#e8e8e3", margin: "0 auto 8px" }} />
            <p className="text-sm" style={{ color: "#cccccc" }}>No products found</p>
          </div>
        ) : (
          filtered.map((product, i) => (
            <div
              key={product.id}
              className="grid items-center px-5 py-3 text-xs transition-colors"
              style={{
                gridTemplateColumns: "1fr 100px 90px 80px 80px 90px 100px",
                borderBottom: i < filtered.length - 1 ? "1px solid #f5f5f0" : "none",
              }}
              onMouseEnter={e => e.currentTarget.style.background = "#fafafa"}
              onMouseLeave={e => e.currentTarget.style.background = "transparent"}
            >
              <div className="flex items-center gap-3">
                <div className="flex items-center justify-center rounded-md flex-shrink-0" style={{ width: 32, height: 32, background: "#f5f5f0" }}>
                  <Package size={14} style={{ color: "#aaaaaa" }} />
                </div>
                <span className="font-medium" style={{ color: "#111111" }}>{product.name}</span>
              </div>
              <span className="text-xs px-2 py-0.5 rounded-full w-fit" style={{ background: "#f5f5f0", color: "#888888" }}>
                {product.category}
              </span>
              <span className="text-right font-mono" style={{ color: "#333333" }}>{fmt(product.price)}</span>
              <span className="text-right font-mono" style={{ color: product.stock === 0 ? "#cccccc" : "#555555" }}>
                {product.stock}
              </span>
              <span className="text-right font-mono" style={{ color: "#555555" }}>{product.sold}</span>
              <div className="flex justify-center">
                <button
                  onClick={() => toggleStatus(product.id)}
                  className="text-xs px-2.5 py-1 rounded-full transition-all cursor-pointer"
                  style={{
                    background: product.status === "Active" ? "#edf3ee" : "#fafafa",
                    color: product.status === "Active" ? "#3a5a40" : "#cccccc",
                  }}
                >
                  {product.status}
                </button>
              </div>
              <div className="flex items-center justify-center gap-1">
                <button className="p-1.5 rounded-md transition-colors" style={{ color: "#aaaaaa" }}
                  onMouseEnter={e => { e.currentTarget.style.background = "#f5f5f0"; e.currentTarget.style.color = "#555555"; }}
                  onMouseLeave={e => { e.currentTarget.style.background = "transparent"; e.currentTarget.style.color = "#aaaaaa"; }}
                >
                  <Edit2 size={13} />
                </button>
                {showDeleteId === product.id ? (
                  <div className="flex items-center gap-1">
                    <button
                      onClick={() => deleteProduct(product.id)}
                      className="text-xs px-2 py-0.5 rounded"
                      style={{ background: "#111111", color: "#ffffff" }}
                    >
                      Sure
                    </button>
                    <button
                      onClick={() => setShowDeleteId(null)}
                      className="text-xs px-2 py-0.5 rounded"
                      style={{ background: "#f5f5f0", color: "#aaaaaa" }}
                    >
                      No
                    </button>
                  </div>
                ) : (
                  <button className="p-1.5 rounded-md transition-colors" style={{ color: "#aaaaaa" }}
                    onClick={() => setShowDeleteId(product.id)}
                    onMouseEnter={e => { e.currentTarget.style.background = "#f5f5f0"; e.currentTarget.style.color = "#555555"; }}
                    onMouseLeave={e => { e.currentTarget.style.background = "transparent"; e.currentTarget.style.color = "#aaaaaa"; }}
                  >
                    <Trash2 size={13} />
                  </button>
                )}
              </div>
            </div>
          ))
        )}
      </div>

      {/* Add Product Modal */}
      {showAddModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4" style={{ background: "rgba(0,0,0,0.3)" }}>
          <div className="rounded-xl p-5 w-full max-w-md" style={{ background: "#ffffff", border: "1px solid #e8e8e3" }}>
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-semibold" style={{ color: "#111111", fontFamily: "'Playfair Display', serif" }}>Add Product</h3>
              <button onClick={() => setShowAddModal(false)} style={{ color: "#aaaaaa" }}><X size={18} /></button>
            </div>
            <div className="space-y-3">
              <input
                type="text"
                placeholder="Product name"
                className="w-full text-sm px-3 py-2 rounded-lg outline-none"
                style={{ border: "1px solid #e8e8e3", background: "#fafafa", color: "#111111" }}
                value={newProduct.name}
                onChange={e => setNewProduct(prev => ({ ...prev, name: e.target.value }))}
              />
              <select
                className="w-full text-sm px-3 py-2 rounded-lg outline-none"
                style={{ border: "1px solid #e8e8e3", background: "#fafafa", color: "#111111" }}
                value={newProduct.category}
                onChange={e => setNewProduct(prev => ({ ...prev, category: e.target.value }))}
              >
                <option>Beverage</option>
                <option>Pastry</option>
                <option>Food</option>
              </select>
              <input
                type="number"
                placeholder="Price"
                className="w-full text-sm px-3 py-2 rounded-lg outline-none"
                style={{ border: "1px solid #e8e8e3", background: "#fafafa", color: "#111111" }}
                value={newProduct.price}
                onChange={e => setNewProduct(prev => ({ ...prev, price: Number(e.target.value) }))}
              />
              <input
                type="number"
                placeholder="Stock"
                className="w-full text-sm px-3 py-2 rounded-lg outline-none"
                style={{ border: "1px solid #e8e8e3", background: "#fafafa", color: "#111111" }}
                value={newProduct.stock}
                onChange={e => setNewProduct(prev => ({ ...prev, stock: Number(e.target.value) }))}
              />
              <button
                onClick={addProduct}
                className="w-full text-sm py-2 rounded-lg"
                style={{ background: "#111111", color: "#ffffff" }}
              >
                Add Product
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}