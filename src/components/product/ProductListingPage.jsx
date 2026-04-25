import { useState, useEffect, useMemo } from "react";
import { axiosInstance } from "../../utils/axiosInstance";
import ProductCard from "./ProductCard";
import cate1 from "../../assets/images/allCate/cate1.png";
import cate2 from "../../assets/images/allCate/cate2.png";
import cate3 from "../../assets/images/allCate/cate3.png";
import cate4 from "../../assets/images/allCate/cate4.png";
import cate5 from "../../assets/images/allCate/cate5.png";
import cate6 from "../../assets/images/allCate/cate6.png";
import Banner from "../layout/Banner";
import OfferScrollBar from "../layout/OfferScrollBar";
import FirstBanner from "../layout/banner/FirstBanner";

// ── Constants ──────────────────────────────────────────────────────────────────
const FALLBACK_EMOJIS = ["🌿", "❤️", "🛡️", "🌱", "✨", "💊", "🔋", "🧘", "🧴", "🥣"];
const FALLBACK_IMAGES = [cate1, cate2, cate3, cate4, cate5, cate6];
const calcDiscount = (p, f) => Math.round(((parseFloat(p) - parseFloat(f)) / parseFloat(p)) * 100);

const TAG_FILTER_PALETTES = [
  { bg: "#EFF6FF", activeBg: "#03349a", border: "#BFDBFE", text: "#1e40af" },
  { bg: "#F0FDF4", activeBg: "#166534", border: "#BBF7D0", text: "#166534" },
  { bg: "#FFF7ED", activeBg: "#c9643a", border: "#FED7AA", text: "#9a3412" },
  { bg: "#FEF2F2", activeBg: "#991B1B", border: "#FECACA", text: "#991b1b" },
  { bg: "#FAF5FF", activeBg: "#6B21A8", border: "#E9D5FF", text: "#6b21a8" },
  { bg: "#FFFBEB", activeBg: "#92400E", border: "#FDE68A", text: "#92400e" },
  { bg: "#FDF4FF", activeBg: "#9D174D", border: "#F5D0FE", text: "#9d174d" },
];

function getFilterTagColors(tag) {
  if (tag === "All") return { bg: "#F3F4F6", activeBg: "#111827", border: "#D1D5DB", text: "#374151" };
  let hash = 0;
  for (let c of tag) hash = c.charCodeAt(0) + ((hash << 5) - hash);
  return TAG_FILTER_PALETTES[Math.abs(hash) % TAG_FILTER_PALETTES.length];
}

// ── SVG Icons ──────────────────────────────────────────────────────────────────
const SearchIcon = () => (
  <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
    <circle cx="11" cy="11" r="8" /><path d="m21 21-4.35-4.35" />
  </svg>
);
const CloseIcon = () => (
  <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" strokeWidth={2.5} viewBox="0 0 24 24">
    <path d="M18 6 6 18M6 6l12 12" />
  </svg>
);
const FilterIcon = () => (
  <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
    <line x1="4" y1="6" x2="20" y2="6" /><line x1="8" y1="12" x2="16" y2="12" /><line x1="11" y1="18" x2="13" y2="18" />
  </svg>
);
const ChevronIcon = () => (
  <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" strokeWidth={2.5} viewBox="0 0 24 24">
    <path d="m9 18 6-6-6-6" />
  </svg>
);

// ── Sidebar ────────────────────────────────────────────────────────────────────
function Sidebar({ categories, selected, onSelect }) {
  return (
    <aside className="w-48 hidden md:block flex-shrink-0 sticky top-20 self-start">
      <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">

        {/* Header */}
        <div className="px-4 py-3 border-b border-gray-100 bg-gray-50">
          <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">
            Categories
          </p>
        </div>

        {/* Category list */}
        <nav className="p-2.5 flex flex-col gap-2">
          {categories.map((cat) => {
            const active = selected === cat.id;
            return (
              <button
                key={cat.id}
                onClick={() => onSelect(cat.id)}
                className={`w-full flex flex-col rounded-xl overflow-hidden text-left transition-all duration-200 border focus:outline-none
                  ${active
                    ? "border-[#03349a] shadow-md"
                    : "border-gray-100 hover:border-gray-300 hover:-translate-y-0.5 hover:shadow-sm"
                  }`}
              >
                {/* Active indicator bar */}
                {active && (
                  <div className="h-[3px] w-full bg-[#03349a] flex-shrink-0" />
                )}

                {/* Rectangle image — full width, fixed height */}
                <div className="w-full overflow-hidden flex-shrink-0" style={{ height: 88 }}>
                  <img
                    src={cat.img}
                    alt={cat.name}
                    className="w-full h-full object-cover transition-transform duration-300 hover:scale-105"
                  />
                </div>

                {/* Name + count */}
                <div
                  className={`px-3 py-2 flex items-center justify-between gap-1
                    ${active ? "bg-blue-50" : "bg-white"}`}
                >
                  <p
                    className={`text-[12.5px] font-semibold leading-snug truncate
                      ${active ? "text-[#03349a]" : "text-gray-700"}`}
                  >
                    {cat.name}
                  </p>
                  <span
                    className={`text-[10px] font-bold px-1.5 py-0.5 rounded-full flex-shrink-0
                      ${active
                        ? "bg-[#03349a] text-white"
                        : "bg-gray-100 text-gray-500"
                      }`}
                  >
                    {cat.count}
                  </span>
                </div>
              </button>
            );
          })}
        </nav>

      </div>
    </aside>
  );
}
// ── Mobile Drawer ──────────────────────────────────────────────────────────────
function MobileDrawer({ categories, selected, onSelect, open, onClose }) {
  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [open]);

  if (!open) return null;

  return (
    <div className="fixed inset-0 z-50 md:hidden">
      <div className="absolute inset-0 bg-black/40 backdrop-blur-sm" onClick={onClose} />
      <div className="absolute bottom-0 left-0 right-0 bg-white rounded-t-3xl max-h-[75vh] overflow-y-auto">
        <div className="sticky top-0 bg-white flex items-center justify-between px-5 py-4 border-b border-gray-100">
          <p className="font-bold text-gray-800 text-[15px]">Browse Categories</p>
          <button
            onClick={onClose}
            className="w-8 h-8 rounded-full bg-gray-100 hover:bg-gray-200 grid place-items-center text-gray-500 transition-colors"
          >
            <CloseIcon />
          </button>
        </div>
        <div className="p-3 grid grid-cols-2 gap-2 pb-10">
          {categories.map((cat) => {
            const active = selected === cat.id;
            return (
              <button
                key={cat.id}
                onClick={() => { onSelect(cat.id); onClose(); }}
                className={`flex items-center gap-3 p-3 rounded-xl border transition-all text-left
                  ${active ? "bg-blue-50 border-blue-200" : "bg-gray-50 border-transparent hover:bg-gray-100"}`}
              >
                <div className="w-9 h-9 rounded-xl overflow-hidden flex-shrink-0 ring-1 ring-gray-100">
                  <img src={cat.img} alt={cat.name} className="w-full h-full object-cover" />
                </div>
                <div className="min-w-0">
                  <p className={`text-[13px] font-semibold truncate ${active ? "text-blue-700" : "text-gray-700"}`}>
                    {cat.name}
                  </p>
                  <p className="text-[11px] text-gray-400">{cat.count} items</p>
                </div>
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
}

// ── Loading Skeleton ────────────────────────────────────────────────────────────
function SkeletonCard() {
  return (
    <div className="bg-white rounded-2xl overflow-hidden border border-gray-100 animate-pulse">
      <div className="w-full bg-gray-100" style={{ height: 280 }} />
      <div className="p-4 space-y-3">
        <div className="h-4 bg-gray-100 rounded-lg w-3/4" />
        <div className="h-3 bg-gray-100 rounded w-full" />
        <div className="h-3 bg-gray-100 rounded w-2/3" />
        <div className="flex gap-2 mt-2">
          <div className="h-5 bg-gray-100 rounded-full w-20" />
          <div className="h-5 bg-gray-100 rounded-full w-16" />
        </div>
        <div className="h-px bg-gray-100" />
        <div className="h-11 bg-gray-100 rounded-xl mt-1" />
      </div>
    </div>
  );
}

// ── Empty State ────────────────────────────────────────────────────────────────
function EmptyState({ search, onClear }) {
  return (
    <div className="col-span-full flex flex-col items-center justify-center py-20 text-center">
      <div className="text-5xl mb-4">🔍</div>
      <h3 className="text-lg font-bold text-gray-700 mb-1">No products found</h3>
      <p className="text-sm text-gray-400 mb-5">
        {search ? `No results for "${search}"` : "Try adjusting your filters"}
      </p>
      <button
        onClick={onClear}
        className="px-5 py-2 rounded-xl bg-[#03349a] text-white text-sm font-semibold hover:bg-[#022a7a] transition-colors"
      >
        Clear filters
      </button>
    </div>
  );
}

// ── Main Page ──────────────────────────────────────────────────────────────────
export default function ProductListingPage() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [rawCategories, setRawCategories] = useState([]);
  const [category, setCategory] = useState("all");
  const [search, setSearch] = useState("");
  const [sortBy, setSortBy] = useState("default");
  const [offerTag, setOfferTag] = useState("All");
  const [drawerOpen, setDrawerOpen] = useState(false);

  useEffect(() => {
    axiosInstance.get("/product/getAllProduct")
      .then((r) => setProducts(Array.isArray(r.data.products) ? r.data.products : [r.data.products]))
      .catch((e) => console.error(e))
      .finally(() => setLoading(false));
  }, []);

  useEffect(() => {
    axiosInstance.get("/category/getCategory")
      .then((r) => { if (r.data.success) setRawCategories(r.data.data); })
      .catch((e) => console.error(e));
  }, []);

  const computedCategories = useMemo(() => {
    const allItem = { id: "all", name: "All Products", emoji: "🌿", img: cate1, count: products.length };
    const dynamic = (rawCategories || []).map((cat, idx) => ({
      id: cat.id,
      name: cat.category,
      emoji: FALLBACK_EMOJIS[idx % FALLBACK_EMOJIS.length],
      img: cat.image || FALLBACK_IMAGES[idx % FALLBACK_IMAGES.length],
      count: products.filter((p) => p.categoryId === cat.id).length,
    }));
    return [allItem, ...dynamic];
  }, [rawCategories, products]);

  const offerTags = useMemo(() => {
    const s = new Set(["All"]);
    products.filter(Boolean).forEach((p) => p.offerTags?.forEach((t) => t && s.add(t)));
    return [...s];
  }, [products]);

  const filteredProducts = useMemo(() => {
    let list = products.filter((p) => {
      const matchCat = category === "all" || p.categoryId === category;
      const q = search.toLowerCase();
      const matchQ = !q || p.productName.toLowerCase().includes(q) || p.productTags?.some((t) => t.toLowerCase().includes(q));
      const matchTag = offerTag === "All" || p.offerTags?.includes(offerTag);
      return matchCat && matchQ && matchTag;
    });
    if (sortBy === "price-asc") list = [...list].sort((a, b) => +a.finalPrice - +b.finalPrice);
    if (sortBy === "price-desc") list = [...list].sort((a, b) => +b.finalPrice - +a.finalPrice);
    if (sortBy === "discount") list = [...list].sort((a, b) => calcDiscount(b.price, b.finalPrice) - calcDiscount(a.price, a.finalPrice));
    return list;
  }, [products, category, search, offerTag, sortBy]);

  const activeCategoryName = computedCategories.find((c) => c.id === category)?.name ?? "All Products";

  const clearFilters = () => { setSearch(""); setCategory("all"); setOfferTag("All"); setSortBy("default"); };

  return (
    <div className="min-h-screen bg-[#f8f5f1]">
      <Banner />
      <OfferScrollBar />

      {/* ── Sticky search header ── */}
      <header className="sticky top-0 z-40 bg-white/95 backdrop-blur-sm border-b border-gray-100 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 h-14 flex items-center justify-center">
          <label className="flex items-center gap-2.5 bg-gray-50 border border-gray-200 rounded-xl px-3.5 py-2.5 w-full max-w-md cursor-text transition-all focus-within:bg-white focus-within:border-[#03349a] focus-within:ring-2 focus-within:ring-blue-100">
            <span className="text-gray-400 flex-shrink-0"><SearchIcon /></span>
            <input
              type="text"
              placeholder="Search products..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="flex-1 text-sm bg-transparent outline-none text-gray-700 placeholder-gray-400"
            />
            {search && (
              <button onClick={() => setSearch("")} className="flex-shrink-0 text-gray-400 hover:text-gray-600 p-0.5 rounded hover:bg-gray-100 transition-colors">
                <CloseIcon />
              </button>
            )}
          </label>
        </div>
      </header>

      <FirstBanner />

      <MobileDrawer
        categories={computedCategories}
        selected={category}
        onSelect={setCategory}
        open={drawerOpen}
        onClose={() => setDrawerOpen(false)}
      />

      <div className="w-full mx-auto px-4 sm:px-6 py-6 sm:py-8">
        <div className="flex gap-6 items-start">

          {/* Sidebar */}
          <Sidebar categories={computedCategories} selected={category} onSelect={setCategory} />

          {/* Main */}
          <main className="flex-1 min-w-0">

            {/* Breadcrumb */}
            <nav className="flex items-center gap-1.5 text-xs text-gray-400 mb-5">
              <span className="hover:text-gray-600 cursor-pointer transition-colors">Home</span>
              <ChevronIcon />
              <span className="text-gray-700 font-semibold">{activeCategoryName}</span>
            </nav>

            {/* Controls */}
            <div className="flex flex-wrap items-center gap-3 justify-between mb-5">
              {/* Left: mobile filter + offer pills */}
              <div className="flex items-center gap-2 flex-wrap">
                <button
                  onClick={() => setDrawerOpen(true)}
                  className="flex md:hidden items-center gap-1.5 px-3 py-1.5 rounded-full border border-gray-200 bg-white text-xs font-semibold text-gray-600 hover:border-[#03349a] hover:text-[#03349a] transition-all shadow-sm"
                >
                  <FilterIcon />
                  {activeCategoryName}
                </button>

                {offerTags.length > 1 && offerTags.map((tag) => {
                  const c = getFilterTagColors(tag);
                  const active = offerTag === tag;
                  return (
                    <button
                      key={tag}
                      onClick={() => setOfferTag(tag)}
                      className="px-3.5 py-1.5 rounded-full text-[13px] font-bold border transition-all shadow-sm"
                      style={{
                        background: active ? c.activeBg : c.bg,
                        color: active ? "#fff" : c.text,
                        borderColor: active ? c.activeBg : c.border,
                      }}
                    >
                      {tag}
                    </button>
                  );
                })}
              </div>

              {/* Right: count + sort */}
              <div className="flex items-center gap-3">
                <span className="text-xs text-gray-400 hidden sm:block">
                  <span className="font-bold text-gray-700">{filteredProducts.length}</span> products
                </span>
                <select
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value)}
                  className="text-[13px] border border-gray-200 bg-white rounded-xl px-3 py-2 outline-none text-gray-700 cursor-pointer hover:border-[#03349a] focus:border-[#03349a] focus:ring-2 focus:ring-blue-100 transition-all shadow-sm"
                >
                  <option value="default">Featured</option>
                  <option value="price-asc">Price: Low → High</option>
                  <option value="price-desc">Price: High → Low</option>
                  <option value="discount">Best Discount</option>
                </select>
              </div>
            </div>

            {/* Section heading */}
            <div className="flex items-center justify-between mb-5">
              <h1 className="text-xl sm:text-2xl font-extrabold text-[#111827] tracking-tight">
                {activeCategoryName}
                <span className="ml-2 text-sm font-normal text-gray-400">
                  ({filteredProducts.length})
                </span>
              </h1>
            </div>

            {/* Grid */}
            {loading ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
                {[...Array(6)].map((_, i) => <SkeletonCard key={i} />)}
              </div>
            ) : filteredProducts.length === 0 ? (
              <EmptyState search={search} onClear={clearFilters} />
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
                {filteredProducts.filter(Boolean).map((product, idx) => (
                  <ProductCard
                    key={product.id || idx}
                    product={product}
                    animDelay={idx * 0.07}
                    sectionVisible={true}
                  />
                ))}
              </div>
            )}
          </main>
        </div>
      </div>
    </div>
  );
}