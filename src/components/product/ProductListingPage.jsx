import React, { useState, useMemo } from "react";
import { useNavigate } from "react-router-dom";
import {  FaShoppingCart, } from "react-icons/fa";

const BRAND = "#820c0c";
const ACCENT = "#c9643a";

const badgeMap = {
  "Best Seller": "bg-amber-100 border-amber-300 text-amber-800",
  "New":         "bg-blue-100 border-blue-300 text-blue-800",
  "Top Rated":   "bg-emerald-100 border-emerald-300 text-emerald-800",
  "Popular":     "bg-violet-100 border-violet-300 text-violet-800",
};

const products = [
  { id: 1, name: "Cherry Iron Supplement", category: "Supplements", description: "Iron-rich supplement to support healthy hemoglobin levels and daily vitality.", price: 299, originalPrice: 499, rating: 4.5, reviews: 128, badge: "Best Seller", tags: ["Iron-Rich", "Energy"], images: ["https://www.amway.in/_next/image?url=https://media.amway.in/sys-master/images/h86/h9c/9201499865118/EIA.w560.h560.316167ID_Cherry-iron2.png&w=1440&q=75", "https://www.amway.in/_next/image?url=https://media.amway.in/sys-master/images/h7b/h8f/9201499868670/EIA.w560.h560.316167ID_Cherry-iron3.png&w=1440&q=75"] },
  { id: 2, name: "Daily Multivitamin Tablets", category: "Vitamins", description: "Complete multivitamin for immunity, energy, and daily nutrition support.", price: 449, originalPrice: 699, rating: 5, reviews: 210, badge: "Top Rated", tags: ["Immunity", "Daily Use"], images: ["https://originnutrition.in/cdn/shop/files/supergreens_5.webp?v=1740766116&width=533", "https://www.rippedupnutrition.com/cdn/shop/files/Protein_Oats_1770975628_79737921-2303-440f-8255-a34e82949b97.webp?v=1771041223&width=400"] },
  { id: 3, name: "Protein Nutrition Powder", category: "Protein", description: "High-quality protein blend for muscle recovery and strength gains.", price: 599, originalPrice: 899, rating: 4.2, reviews: 96, badge: "Popular", tags: ["Muscle", "Recovery"], images: ["https://originnutrition.in/cdn/shop/files/supergreens_5.webp?v=1740766116&width=533", "https://www.rippedupnutrition.com/cdn/shop/files/Protein_Oats_1770975628_79737921-2303-440f-8255-a34e82949b97.webp?v=1771041223&width=400"] },
  { id: 4, name: "Omega-3 Fish Oil Capsules", category: "Supplements", description: "Supports heart health and brain function with pure Omega-3 fatty acids.", price: 399, originalPrice: 599, rating: 4.8, reviews: 180, badge: "Best Seller", tags: ["Heart", "Brain"], images: ["https://originnutrition.in/cdn/shop/files/supergreens_5.webp?v=1740766116&width=533", "https://www.rippedupnutrition.com/cdn/shop/files/Protein_Oats_1770975628_79737921-2303-440f-8255-a34e82949b97.webp?v=1771041223&width=400"] },
  { id: 5, name: "Herbal Skin Cleanser", category: "Skincare", description: "Gentle herbal cleanser that refreshes skin and removes impurities naturally.", price: 349, originalPrice: 499, rating: 4.1, reviews: 74, badge: "New", tags: ["Herbal", "Gentle"], images: ["https://originnutrition.in/cdn/shop/files/supergreens_5.webp?v=1740766116&width=533", "https://www.rippedupnutrition.com/cdn/shop/files/Protein_Oats_1770975628_79737921-2303-440f-8255-a34e82949b97.webp?v=1771041223&width=400"] },
  { id: 6, name: "Calcium Magnesium Tablets", category: "Supplements", description: "Essential minerals for bone strength and optimal muscle function.", price: 479, originalPrice: 699, rating: 4.7, reviews: 143, badge: "Popular", tags: ["Bones", "Minerals"], images: ["https://originnutrition.in/cdn/shop/files/supergreens_5.webp?v=1740766116&width=533", "https://www.rippedupnutrition.com/cdn/shop/files/Protein_Oats_1770975628_79737921-2303-440f-8255-a34e82949b97.webp?v=1771041223&width=400"] },
  { id: 7, name: "Vitamin C Boost Capsules", category: "Vitamins", description: "Powerful antioxidant capsules to boost immunity and overall wellbeing.", price: 279, originalPrice: 449, rating: 4.3, reviews: 89, badge: "New", tags: ["Antioxidant", "Immunity"], images: ["https://originnutrition.in/cdn/shop/files/supergreens_5.webp?v=1740766116&width=533", "https://www.rippedupnutrition.com/cdn/shop/files/Protein_Oats_1770975628_79737921-2303-440f-8255-a34e82949b97.webp?v=1771041223&width=400"] },
  { id: 8, name: "Energy Booster Drink Mix", category: "Protein", description: "Instant mix to enhance energy levels and mental focus throughout the day.", price: 329, originalPrice: 499, rating: 3.9, reviews: 52, badge: "New", tags: ["Energy", "Focus"], images: ["https://originnutrition.in/cdn/shop/files/supergreens_5.webp?v=1740766116&width=533", "https://www.rippedupnutrition.com/cdn/shop/files/Protein_Oats_1770975628_79737921-2303-440f-8255-a34e82949b97.webp?v=1771041223&width=400"] },
  { id: 9, name: "Digestive Enzyme Tablets", category: "Supplements", description: "Supports digestion and nutrient absorption for a healthier gut.", price: 519, originalPrice: 749, rating: 4.9, reviews: 230, badge: "Top Rated", tags: ["Gut Health", "Digest"], images: ["https://originnutrition.in/cdn/shop/files/supergreens_5.webp?v=1740766116&width=533", "https://www.rippedupnutrition.com/cdn/shop/files/Protein_Oats_1770975628_79737921-2303-440f-8255-a34e82949b97.webp?v=1771041223&width=400"] },
  { id: 10, name: "Immunity Support Syrup", category: "Vitamins", description: "Advanced herbal formula to strengthen immune defense naturally.", price: 399, originalPrice: 599, rating: 4.4, reviews: 167, badge: "Popular", tags: ["Herbal", "Immunity"], images: ["https://originnutrition.in/cdn/shop/files/supergreens_5.webp?v=1740766116&width=533", "https://www.rippedupnutrition.com/cdn/shop/files/Protein_Oats_1770975628_79737921-2303-440f-8255-a34e82949b97.webp?v=1771041223&width=400"] },
];

const categories = ["All", ...Array.from(new Set(products.map((p) => p.category)))];
const ratingOptions = [0, 3, 3.5, 4, 4.5];
const MAX_PRICE = 800, MIN_PRICE = 200;

/* ── Star Rating ── */
const StarRating = ({ rating, reviews }) => (
  <div className="flex items-center gap-0.5 mb-2">
    {Array.from({ length: 5 }).map((_, i) => {
      const filled = rating >= i + 1;
      const half = !filled && rating >= i + 0.5;
      return (
        <svg key={i} viewBox="0 0 24 24" className={`w-3.5 h-3.5 ${filled ? "text-amber-400" : half ? "text-amber-300" : "text-gray-200"}`} fill="currentColor">
          <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
        </svg>
      );
    })}
    <span className="text-xs text-gray-400 ml-1">{rating.toFixed(1)} ({reviews})</span>
  </div>
);

/* ── Product Card ── */
const ProductCard = ({ product, animDelay = 0 }) => {
  const [hov, setHov] = useState(false);
  const [added, setAdded] = useState(false);
  const disc = Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100);
  const bm = badgeMap[product.badge];

  const handleCart = (e) => {
    e.stopPropagation();
    setAdded(true);
    setTimeout(() => setAdded(false), 1800);
  };
const navigate = useNavigate()
  return (
    <div
      onMouseEnter={() => setHov(true)}
      onMouseLeave={() => setHov(false)}
      className={`bg-white rounded-2xl overflow-hidden flex flex-col border transition-all duration-300 cursor-pointer select-none
        ${hov ? "border-orange-300 shadow-2xl -translate-y-2 scale-[1.013]" : "border-orange-100 shadow-sm"}`}
      style={{ animation: `cardIn 0.45s ease ${animDelay}s both` }}
      onClick={
        ()=>navigate('/product')
      }
    >
      {/* ── Image ── */}
      <div className="relative h-52 overflow-hidden bg-orange-50 shrink-0">
        <img src={product.images[0]} alt={product.name} draggable={false}
          className={`absolute inset-0 w-full h-full object-cover transition-all duration-500 ${hov ? "opacity-0 scale-105" : "opacity-100 scale-100"}`} />
        <img src={product.images[1]} alt={product.name} draggable={false}
          className={`absolute inset-0 w-full h-full object-cover transition-all duration-500 ${hov ? "opacity-100 scale-100" : "opacity-0 scale-105"}`} />

        {/* Tags */}
        <div className={`absolute bottom-2 left-2 flex flex-col gap-1 z-10 transition-all duration-300 ${hov ? "opacity-100 translate-y-0" : "opacity-0 translate-y-2"}`}>
          {product.tags.map((t, i) => (
            <span key={i} className="text-[9px] font-bold uppercase tracking-wider px-2.5 py-1 rounded-full text-white shadow-sm" style={{ background: BRAND }}>
              {t}
            </span>
          ))}
        </div>

        {/* Discount */}
       <div
  style={{
    position: "absolute",
    top: 6,
    right: 10,
    zIndex: 5,
    background: "#c9643a",
    color: "#fff",
    padding: "12px 12px",
    fontWeight: 800,
    textAlign: "center",
    lineHeight: 1.1,
    fontFamily: "sans-serif",
    clipPath:
      "polygon(0 0,100% 0,100% 75%,85% 100%,70% 75%,55% 100%,40% 75%,25% 100%,10% 75%,0 100%)",
    boxShadow: "0 4px 10px rgba(0,0,0,0.25)",
  }}
>
  <div className="-mt-2">
    <div style={{ fontSize: 18 }}>{disc}%</div>
    <div style={{ fontSize: 12 }}>OFF</div>
  </div>
</div>

        {/* Wishlist */}
        <button onClick={(e) => e.stopPropagation()}
          className={`absolute top-2.5 left-2.5 z-10 w-8 h-8 rounded-full bg-white/90 flex items-center justify-center shadow-md transition-all duration-200 border-none cursor-pointer
            ${hov ? "opacity-100 scale-100" : "opacity-0 scale-75"}`}>
          <svg viewBox="0 0 24 24" className="w-3.5 h-3.5" style={{ color: BRAND }} fill="none" stroke="currentColor" strokeWidth={2.2}>
            <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" />
          </svg>
        </button>
      </div>

      {/* ── Body ── */}
      <div className="p-4 flex flex-col flex-grow">
        {bm && (
          <span className={`self-start text-[10px] font-bold uppercase tracking-widest px-2.5 py-0.5 rounded-full border mb-2 ${bm}`}>
            {product.badge}
          </span>
        )}

        <h3 className="font-bold text-gray-900 text-[15px] leading-snug mb-1 truncate" style={{ fontFamily: "'Libre Baskerville', Georgia, serif" }}>
          {product.name}
        </h3>

        <p className="text-xs text-gray-400 leading-relaxed line-clamp-2 mb-2 flex-grow">
          {product.description}
        </p>

        <StarRating rating={product.rating} reviews={product.reviews} />

        {/* Price */}
        <div className="flex items-baseline gap-2 mt-1 mb-2">
          <span className="text-xl font-extrabold" style={{ color: BRAND, fontFamily: "'Libre Baskerville', serif" }}>
            ₹{product.price}
          </span>
          <span className="text-sm text-gray-400 line-through">₹{product.originalPrice}</span>
          <span className="ml-auto text-[11px] font-bold text-emerald-600 bg-emerald-50 px-2 py-0.5 rounded-full">
            Save ₹{product.originalPrice - product.price}
          </span>
        </div>

        {/* Promo strip */}
        <div className="text-xs font-bold text-center py-1.5 px-3 rounded-lg mb-3 border border-dashed"
          style={{ color: BRAND, background: "#fff4f4", borderColor: "rgba(130,12,12,.25)" }}>
          Use code <strong>GRAB</strong> → Get @ ₹{product.price -20}
        </div>

        <div className="h-px bg-gray-100 mb-3" />

        {/* Cart Button */}
       <button
  onClick={handleCart}
  className={`w-full py-2.5 text-sm font-bold tracking-widest uppercase text-white cursor-pointer border-none transition-all duration-300
  flex items-center justify-center gap-2
  ${added ? "rounded-xl bg-emerald-500" : "rounded-tl-[50px] rounded-br-[50px] rounded-tr-none rounded-bl-none"}`}
  style={!added ? { background: BRAND } : {}}
  onMouseEnter={(e) => { if (!added) e.currentTarget.style.background = ACCENT; }}
  onMouseLeave={(e) => { if (!added) e.currentTarget.style.background = BRAND; }}
>
  {added ? (
    <>
      <FaShoppingCart size={14} />
      Added!
    </>
  ) : (
    <>
      <FaShoppingCart size={14} />
      Add to Cart
    </>
  )}
</button>
      </div>
    </div>
  );
};

/* ── Filter Panel ── */
const FilterPanel = ({ selectedCategory, setSelectedCategory, maxPrice, setMaxPrice, minRating, setMinRating, filtered, clearFilters, activeFilterCount }) => (
  <div className="w-full">
    <div className="flex items-center justify-between mb-5">
      <span className="text-[11px] font-extrabold tracking-widest text-gray-800 uppercase">Filters</span>
      {activeFilterCount > 0 && (
        <button onClick={clearFilters} className="text-xs font-bold px-3 py-1 rounded-full bg-red-50 hover:bg-red-100 transition cursor-pointer border-none" style={{ color: BRAND }}>
          Clear all
        </button>
      )}
    </div>

    {/* Category */}
    <div className="mb-6">
      <p className="text-[10px] font-extrabold tracking-[.12em] text-gray-400 uppercase mb-2.5">Category</p>
      <div className="flex flex-col gap-1">
        {categories.map((cat) => (
          <button key={cat} onClick={() => setSelectedCategory(cat)}
            className={`flex items-center justify-between px-3 py-2 rounded-xl text-xs font-semibold transition-all cursor-pointer border-none
              ${selectedCategory === cat ? "text-white shadow" : "text-gray-600 hover:bg-red-50"}`}
            style={{ background: selectedCategory === cat ? BRAND : "transparent" }}>
            <span>{cat}</span>
            <span className={`text-[11px] font-bold px-2 py-0.5 rounded-full ${selectedCategory === cat ? "bg-white/20 text-white" : "bg-gray-100 text-gray-500"}`}>
              {cat === "All" ? products.length : products.filter((p) => p.category === cat).length}
            </span>
          </button>
        ))}
      </div>
    </div>

    {/* Price */}
    <div className="mb-6">
      <p className="text-[10px] font-extrabold tracking-[.12em] text-gray-400 uppercase mb-2.5">Price Range</p>
      <div className="flex justify-between mb-2">
        <span className="text-[11px] text-gray-400">₹{MIN_PRICE}</span>
        <span className="text-xs font-extrabold" style={{ color: BRAND }}>Up to ₹{maxPrice}</span>
        <span className="text-[11px] text-gray-400">₹{MAX_PRICE}</span>
      </div>
      <input type="range" min={MIN_PRICE} max={MAX_PRICE} value={maxPrice}
        onChange={(e) => setMaxPrice(Number(e.target.value))}
        className="w-full h-1.5 rounded-full appearance-none cursor-pointer accent-red-800 bg-gray-200" />
    </div>

    {/* Rating */}
    <div className="mb-6">
      <p className="text-[10px] font-extrabold tracking-[.12em] text-gray-400 uppercase mb-2.5">Min. Rating</p>
      <div className="flex flex-col gap-1">
        {ratingOptions.map((r) => (
          <button key={r} onClick={() => setMinRating(r)}
            className={`flex items-center gap-1.5 px-3 py-2 rounded-xl text-xs font-semibold transition-all cursor-pointer border-none
              ${minRating === r ? "text-white shadow" : "text-gray-600 hover:bg-red-50"}`}
            style={{ background: minRating === r ? BRAND : "transparent" }}>
            {r === 0 ? "All Ratings" : (
              <>
                {Array.from({ length: 5 }).map((_, i) => (
                  <svg key={i} viewBox="0 0 24 24" className={`w-3 h-3 ${i < Math.floor(r) ? "text-amber-400" : i === Math.floor(r) && r % 1 !== 0 ? "text-amber-300" : minRating === r ? "text-white/30" : "text-gray-200"}`} fill="currentColor">
                    <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
                  </svg>
                ))}
                <span className={`text-[11px] ${minRating === r ? "text-white/70" : "text-gray-400"}`}>& up</span>
              </>
            )}
          </button>
        ))}
      </div>
    </div>

    {/* Count */}
    <div className="bg-gradient-to-br from-red-50 to-orange-50 border border-orange-100 rounded-xl p-3 text-center">
      <p className="text-2xl font-extrabold" style={{ color: BRAND }}>{filtered.length}</p>
      <p className="text-xs text-gray-400">products found</p>
    </div>
  </div>
);

/* ── Main App ── */
export default function App() {
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [maxPrice, setMaxPrice] = useState(MAX_PRICE);
  const [minRating, setMinRating] = useState(0);
  const [sortBy, setSortBy] = useState("default");
  const [searchQuery, setSearchQuery] = useState("");
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [mobileDrawerOpen, setMobileDrawerOpen] = useState(false);

  const activeFilterCount = [selectedCategory !== "All", maxPrice < MAX_PRICE, minRating > 0, sortBy !== "default", searchQuery !== ""].filter(Boolean).length;
  const clearFilters = () => { setSelectedCategory("All"); setMaxPrice(MAX_PRICE); setMinRating(0); setSortBy("default"); setSearchQuery(""); };

  const filtered = useMemo(() => {
    let list = products.filter((p) => {
      if (selectedCategory !== "All" && p.category !== selectedCategory) return false;
      if (p.price > maxPrice) return false;
      if (p.rating < minRating) return false;
      if (searchQuery && !p.name.toLowerCase().includes(searchQuery.toLowerCase())) return false;
      return true;
    });
    if (sortBy === "price-asc") list = [...list].sort((a, b) => a.price - b.price);
    if (sortBy === "price-desc") list = [...list].sort((a, b) => b.price - a.price);
    if (sortBy === "rating") list = [...list].sort((a, b) => b.rating - a.rating);
    if (sortBy === "popular") list = [...list].sort((a, b) => b.reviews - a.reviews);
    return list;
  }, [selectedCategory, maxPrice, minRating, sortBy, searchQuery]);

  const filterProps = { selectedCategory, setSelectedCategory, maxPrice, setMaxPrice, minRating, setMinRating, filtered, clearFilters, activeFilterCount };

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Libre+Baskerville:wght@400;700&family=DM+Sans:wght@400;600;700;800&display=swap');
        body { font-family: 'DM Sans', sans-serif; }
        @keyframes cardIn {
          from { opacity: 0; transform: translateY(20px) scale(.97); }
          to   { opacity: 1; transform: translateY(0) scale(1); }
        }
      `}</style>

      <div className="min-h-screen bg-gradient-to-br from-orange-50 via-white to-rose-50">

        {/* ── Hero Header ── */}
        <div className="relative overflow-hidden px-5 sm:px-10 py-10 sm:py-14"
          style={{ background: `linear-gradient(130deg, #3d0404 0%, #820c0c 50%, #c9643a 100%)` }}>
          <div className="absolute -top-14 -right-10 w-52 h-52 rounded-full bg-white opacity-5" />
          <div className="absolute -bottom-20 left-1/3 w-72 h-72 rounded-full bg-white opacity-5" />
          <div className="absolute top-5 left-3 w-24 h-24 rounded-full bg-white opacity-5" />
          <div className="relative z-10 max-w-screen-xl mx-auto">
            <p className="text-[11px] font-bold tracking-[.18em] text-red-200 uppercase mb-2">Wellness & Nutrition</p>
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white leading-tight mb-3"
              style={{ fontFamily: "'Libre Baskerville', serif" }}>Our Products</h1>
            <div className="flex flex-wrap items-center gap-3">
              <span className="text-sm text-red-200">
                Showing <strong className="text-white">{filtered.length}</strong> of {products.length} products
              </span>
              {activeFilterCount > 0 && (
                <span className="bg-white/20 text-white text-xs font-semibold px-3 py-1 rounded-full">
                  {activeFilterCount} filter{activeFilterCount > 1 ? "s" : ""} active
                </span>
              )}
            </div>
          </div>
        </div>

        {/* ── Toolbar ── */}
        <div className="sticky top-0 z-30 bg-white border-b border-gray-100 shadow-sm px-4 sm:px-6 py-3">
          <div className="max-w-screen-xl mx-auto flex flex-wrap items-center gap-2 sm:gap-3">
            {/* Search */}
            <div className="relative flex-1 min-w-[140px]">
              <svg className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2.5}>
                <circle cx="11" cy="11" r="8" /><path d="m21 21-4.35-4.35" />
              </svg>
              <input type="text" placeholder="Search products…" value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-9 pr-3 py-2.5 border border-gray-200 rounded-xl text-sm text-gray-700 bg-gray-50 outline-none focus:border-red-400 focus:ring-2 focus:ring-red-100 transition" />
            </div>

            {/* Sort */}
            <select value={sortBy} onChange={(e) => setSortBy(e.target.value)}
              className="px-3 py-2.5 border border-gray-200 rounded-xl text-sm font-semibold text-gray-700 bg-gray-50 outline-none focus:border-red-400 cursor-pointer">
              <option value="default">Sort: Default</option>
              <option value="price-asc">Price ↑</option>
              <option value="price-desc">Price ↓</option>
              <option value="rating">Top Rated</option>
              <option value="popular">Popular</option>
            </select>

            {/* Desktop filter toggle */}
            <button onClick={() => setSidebarOpen((v) => !v)}
              className={`hidden sm:flex items-center gap-2 px-4 py-2.5 rounded-xl text-sm font-bold border-none cursor-pointer transition-all
                ${sidebarOpen ? "text-white shadow-md" : "bg-gray-100 text-gray-700 hover:bg-gray-200"}`}
              style={{ background: sidebarOpen ? BRAND : undefined }}>
              <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2.5}>
                <line x1="4" y1="6" x2="20" y2="6" /><line x1="4" y1="12" x2="14" y2="12" /><line x1="4" y1="18" x2="10" y2="18" />
              </svg>
              Filters
              {activeFilterCount > 0 && (
                <span className={`text-[11px] font-extrabold w-5 h-5 rounded-full flex items-center justify-center ${sidebarOpen ? "bg-white/25 text-white" : "text-white"}`}
                  style={{ background: sidebarOpen ? undefined : BRAND }}>
                  {activeFilterCount}
                </span>
              )}
            </button>

            {/* Mobile filter */}
            <button onClick={() => setMobileDrawerOpen(true)}
              className="sm:hidden flex items-center gap-1.5 px-4 py-2.5 rounded-xl text-sm font-bold text-white border-none cursor-pointer"
              style={{ background: BRAND }}>
              <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2.5}>
                <line x1="4" y1="6" x2="20" y2="6" /><line x1="4" y1="12" x2="14" y2="12" /><line x1="4" y1="18" x2="10" y2="18" />
              </svg>
              Filters
              {activeFilterCount > 0 && <span className="bg-white text-[11px] font-extrabold w-5 h-5 rounded-full flex items-center justify-center" style={{ color: BRAND }}>{activeFilterCount}</span>}
            </button>
          </div>
        </div>

        {/* ── Mobile Drawer ── */}
        {mobileDrawerOpen && (
          <div className="fixed inset-0 z-50 sm:hidden">
            <div className="absolute inset-0 bg-black/50" onClick={() => setMobileDrawerOpen(false)} />
            <div className="absolute bottom-0 left-0 right-0 bg-white rounded-t-3xl max-h-[88vh] overflow-y-auto p-5 shadow-2xl">
              <div className="flex items-center justify-between mb-5">
                <span className="text-base font-extrabold text-gray-900">Filters</span>
                <button onClick={() => setMobileDrawerOpen(false)}
                  className="w-8 h-8 rounded-full bg-gray-100 flex items-center justify-center border-none cursor-pointer">
                  <svg className="w-4 h-4 text-gray-600" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2.5}><path d="M18 6L6 18M6 6l12 12" /></svg>
                </button>
              </div>
              <FilterPanel {...filterProps} />
              <button onClick={() => setMobileDrawerOpen(false)}
                className="mt-5 w-full py-3 rounded-2xl text-white font-bold text-sm border-none cursor-pointer"
                style={{ background: `linear-gradient(135deg, ${BRAND}, ${ACCENT})` }}>
                Show {filtered.length} Results
              </button>
            </div>
          </div>
        )}

        {/* ── Body ── */}
        <div className="max-w-screen-xl mx-auto flex">

          {/* Desktop Sidebar */}
          <div className={`hidden sm:block shrink-0 transition-all duration-300 overflow-hidden ${sidebarOpen ? "w-56 md:w-64" : "w-0"}`}>
            <div className={`w-56 md:w-64 bg-white border-r border-gray-100 sticky top-[57px] h-[calc(100vh-57px)] overflow-y-auto transition-opacity duration-200 ${sidebarOpen ? "opacity-100" : "opacity-0 pointer-events-none"}`}>
              <div className="p-5">
                <FilterPanel {...filterProps} />
              </div>
            </div>
          </div>

          {/* Products */}
          <div className="flex-1 p-4 sm:p-5 md:p-6 min-w-0">

            {/* Category Pills */}
            <div className="flex flex-wrap gap-2 mb-5">
              {categories.map((cat) => (
                <button key={cat} onClick={() => setSelectedCategory(cat)}
                  className={`px-4 py-1.5 rounded-full text-xs font-bold border-none cursor-pointer transition-all
                    ${selectedCategory === cat ? "text-white shadow-md" : "bg-white text-gray-500 border border-gray-200 hover:border-red-300 hover:text-red-800"}`}
                  style={{ background: selectedCategory === cat ? BRAND : undefined }}>
                  {cat}
                </button>
              ))}
            </div>

            {/* Empty State */}
            {filtered.length === 0 ? (
              <div className="flex flex-col items-center justify-center py-24 text-center">
                <div className="text-6xl mb-4">🔍</div>
                <h3 className="text-lg font-bold text-gray-700 mb-2">No products found</h3>
                <p className="text-sm text-gray-400 mb-6">Try adjusting your filters or search terms</p>
                <button onClick={clearFilters}
                  className="px-6 py-2.5 rounded-xl text-white font-bold text-sm border-none cursor-pointer"
                  style={{ background: `linear-gradient(135deg, ${BRAND}, ${ACCENT})` }}>
                  Clear Filters
                </button>
              </div>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-1 md:grid-cols-3 lg:grid-cols-3 xl:grid-cols-4 gap-3 sm:gap-4 md:gap-5">
                {filtered.map((product, idx) => (
                  <ProductCard key={product.id} product={product} animDelay={idx * 0.05} />
                ))}
              </div>
            )}
          </div>
        </div>

       
      </div>
    </>
  );
}