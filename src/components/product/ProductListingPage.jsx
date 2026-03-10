import React, { useState, useMemo } from "react";
import { useNavigate } from "react-router-dom";
import { FaShoppingCart } from "react-icons/fa";

const BRAND = "#820c0c";
const ACCENT = "#c9643a";

const badgeMap = {
  "Best Seller": "bg-amber-100 border-amber-300 text-amber-800",
  "New":         "bg-blue-100 border-blue-300 text-blue-800",
  "Top Rated":   "bg-emerald-100 border-emerald-300 text-emerald-800",
  "Popular":     "bg-violet-100 border-violet-300 text-violet-800",
};

const categoryMeta = {
  "All":         { image: "https://images.unsplash.com/photo-1584308666744-24d5c474f2ae?w=400&q=80", icon: "🛍️" },
  "Supplements": { image: "https://images.unsplash.com/photo-1550572017-edd951b55104?w=400&q=80", icon: "💊" },
  "Vitamins":    { image: "https://images.unsplash.com/photo-1471864190281-a93a3070b6de?w=400&q=80", icon: "🧬" },
  "Protein":     { image: "https://images.unsplash.com/photo-1593095948071-474c5cc2989d?w=400&q=80", icon: "💪" },
  "Skincare":    { image: "https://images.unsplash.com/photo-1556228578-8c89e6adf883?w=400&q=80", icon: "✨" },
};

const products = [
  { id: 1,  name: "Cherry Iron Supplement",    category: "Supplements", description: "Iron-rich supplement to support healthy hemoglobin levels and daily vitality.", price: 299, originalPrice: 499, rating: 4.5, reviews: 128, badge: "Best Seller", tags: ["Iron-Rich","Energy"],   images: ["https://www.amway.in/_next/image?url=https://media.amway.in/sys-master/images/h86/h9c/9201499865118/EIA.w560.h560.316167ID_Cherry-iron2.png&w=1440&q=75","https://www.amway.in/_next/image?url=https://media.amway.in/sys-master/images/h7b/h8f/9201499868670/EIA.w560.h560.316167ID_Cherry-iron3.png&w=1440&q=75"] },
  { id: 2,  name: "Daily Multivitamin Tablets", category: "Vitamins",    description: "Complete multivitamin for immunity, energy, and daily nutrition support.",   price: 449, originalPrice: 699, rating: 5,   reviews: 210, badge: "Top Rated",  tags: ["Immunity","Daily Use"], images: ["https://originnutrition.in/cdn/shop/files/supergreens_5.webp?v=1740766116&width=533","https://www.rippedupnutrition.com/cdn/shop/files/Protein_Oats_1770975628_79737921-2303-440f-8255-a34e82949b97.webp?v=1771041223&width=400"] },
  { id: 3,  name: "Protein Nutrition Powder",  category: "Protein",     description: "High-quality protein blend for muscle recovery and strength gains.",          price: 599, originalPrice: 899, rating: 4.2, reviews: 96,  badge: "Popular",    tags: ["Muscle","Recovery"],   images: ["https://originnutrition.in/cdn/shop/files/supergreens_5.webp?v=1740766116&width=533","https://www.rippedupnutrition.com/cdn/shop/files/Protein_Oats_1770975628_79737921-2303-440f-8255-a34e82949b97.webp?v=1771041223&width=400"] },
  { id: 4,  name: "Omega-3 Fish Oil Capsules", category: "Supplements", description: "Supports heart health and brain function with pure Omega-3 fatty acids.",     price: 399, originalPrice: 599, rating: 4.8, reviews: 180, badge: "Best Seller", tags: ["Heart","Brain"],       images: ["https://originnutrition.in/cdn/shop/files/supergreens_5.webp?v=1740766116&width=533","https://www.rippedupnutrition.com/cdn/shop/files/Protein_Oats_1770975628_79737921-2303-440f-8255-a34e82949b97.webp?v=1771041223&width=400"] },
  { id: 5,  name: "Herbal Skin Cleanser",      category: "Skincare",    description: "Gentle herbal cleanser that refreshes skin and removes impurities naturally.", price: 349, originalPrice: 499, rating: 4.1, reviews: 74,  badge: "New",        tags: ["Herbal","Gentle"],     images: ["https://originnutrition.in/cdn/shop/files/supergreens_5.webp?v=1740766116&width=533","https://www.rippedupnutrition.com/cdn/shop/files/Protein_Oats_1770975628_79737921-2303-440f-8255-a34e82949b97.webp?v=1771041223&width=400"] },
  { id: 6,  name: "Calcium Magnesium Tablets", category: "Supplements", description: "Essential minerals for bone strength and optimal muscle function.",             price: 479, originalPrice: 699, rating: 4.7, reviews: 143, badge: "Popular",    tags: ["Bones","Minerals"],    images: ["https://originnutrition.in/cdn/shop/files/supergreens_5.webp?v=1740766116&width=533","https://www.rippedupnutrition.com/cdn/shop/files/Protein_Oats_1770975628_79737921-2303-440f-8255-a34e82949b97.webp?v=1771041223&width=400"] },
  { id: 7,  name: "Vitamin C Boost Capsules",  category: "Vitamins",    description: "Powerful antioxidant capsules to boost immunity and overall wellbeing.",       price: 279, originalPrice: 449, rating: 4.3, reviews: 89,  badge: "New",        tags: ["Antioxidant","Immunity"], images: ["https://originnutrition.in/cdn/shop/files/supergreens_5.webp?v=1740766116&width=533","https://www.rippedupnutrition.com/cdn/shop/files/Protein_Oats_1770975628_79737921-2303-440f-8255-a34e82949b97.webp?v=1771041223&width=400"] },
  { id: 8,  name: "Energy Booster Drink Mix",  category: "Protein",     description: "Instant mix to enhance energy levels and mental focus throughout the day.",    price: 329, originalPrice: 499, rating: 3.9, reviews: 52,  badge: "New",        tags: ["Energy","Focus"],      images: ["https://originnutrition.in/cdn/shop/files/supergreens_5.webp?v=1740766116&width=533","https://www.rippedupnutrition.com/cdn/shop/files/Protein_Oats_1770975628_79737921-2303-440f-8255-a34e82949b97.webp?v=1771041223&width=400"] },
  { id: 9,  name: "Digestive Enzyme Tablets",  category: "Supplements", description: "Supports digestion and nutrient absorption for a healthier gut.",              price: 519, originalPrice: 749, rating: 4.9, reviews: 230, badge: "Top Rated",  tags: ["Gut Health","Digest"], images: ["https://originnutrition.in/cdn/shop/files/supergreens_5.webp?v=1740766116&width=533","https://www.rippedupnutrition.com/cdn/shop/files/Protein_Oats_1770975628_79737921-2303-440f-8255-a34e82949b97.webp?v=1771041223&width=400"] },
  { id: 10, name: "Immunity Support Syrup",    category: "Vitamins",    description: "Advanced herbal formula to strengthen immune defense naturally.",              price: 399, originalPrice: 599, rating: 4.4, reviews: 167, badge: "Popular",    tags: ["Herbal","Immunity"],   images: ["https://originnutrition.in/cdn/shop/files/supergreens_5.webp?v=1740766116&width=533","https://www.rippedupnutrition.com/cdn/shop/files/Protein_Oats_1770975628_79737921-2303-440f-8255-a34e82949b97.webp?v=1771041223&width=400"] },
];

const categories = ["All", ...Array.from(new Set(products.map(p => p.category)))];



/* ── Product Card ── */
const ProductCard = ({ product, animDelay = 0 }) => {
  const [hov, setHov] = useState(false);
  const [added, setAdded] = useState(false);
  const navigate = useNavigate();
  const disc = Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100);
  const bm = badgeMap[product.badge];

  return (
    <div
      onMouseEnter={() => setHov(true)}
      onMouseLeave={() => setHov(false)}
      onClick={() => navigate('/product')}
      className={`bg-white rounded-2xl overflow-hidden flex flex-col border transition-all duration-300 cursor-pointer select-none
        ${hov ? "border-orange-300 shadow-2xl -translate-y-1 scale-[1.012]" : "border-orange-100 shadow-sm"}`}
      style={{ animation: `cardIn 0.45s ease ${animDelay}s both` }}
    >
      {/* Image */}
      <div className="relative h-44 sm:h-48 overflow-hidden bg-orange-50 shrink-0">
        <img src={product.images[0]} alt={product.name} draggable={false}
          className={`absolute inset-0 w-full h-full object-cover transition-all duration-500 ${hov ? "opacity-0 scale-105" : "opacity-100 scale-100"}`} />
        <img src={product.images[1]} alt={product.name} draggable={false}
          className={`absolute inset-0 w-full h-full object-cover transition-all duration-500 ${hov ? "opacity-100 scale-100" : "opacity-0 scale-105"}`} />

        {/* Tags */}
        <div className={`absolute bottom-2 left-2 flex flex-col gap-1 z-10 transition-all duration-300 ${hov ? "opacity-100 translate-y-0" : "opacity-0 translate-y-2"}`}>
          {product.tags.map((t, i) => (
            <span key={i} className="text-[9px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-full text-white shadow-sm" style={{ background: BRAND }}>{t}</span>
          ))}
        </div>

        {/* Discount badge */}
        <div style={{ position:"absolute", top:8, right:0, zIndex:5, background:"#c9643a", color:"#fff", padding:"10px 10px", fontWeight:800, textAlign:"center", lineHeight:1.1, fontFamily:"sans-serif", clipPath:"polygon(0 0,100% 0,100% 75%,85% 100%,70% 75%,55% 100%,40% 75%,25% 100%,10% 75%,0 100%)", boxShadow:"0 4px 10px rgba(0,0,0,0.25)" }}>
          <div className="-mt-1.5">
            <div style={{ fontSize:16 }}>{disc}%</div>
            <div style={{ fontSize:10 }}>OFF</div>
          </div>
        </div>

        {/* Wishlist */}
        <button onClick={e => e.stopPropagation()}
          className={`absolute top-2.5 left-2.5 z-10 w-7 h-7 rounded-full bg-white/90 flex items-center justify-center shadow-md transition-all duration-200 border-none cursor-pointer
            ${hov ? "opacity-100 scale-100" : "opacity-0 scale-75"}`}>
          <svg viewBox="0 0 24 24" className="w-3 h-3" style={{ color: BRAND }} fill="none" stroke="currentColor" strokeWidth={2.2}>
            <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" />
          </svg>
        </button>
      </div>

      {/* Body */}
      <div className="p-3 sm:p-4 flex flex-col flex-grow">
        {bm && <span className={`self-start text-[9px] font-bold uppercase tracking-widest px-2 py-0.5 rounded-full border mb-1.5 ${bm}`}>{product.badge}</span>}

        <div className="inline-block group">
          <h3 className="text-[14px] sm:text-[15px] font-bold text-[#1a1a1a] mb-[3px] whitespace-nowrap overflow-hidden text-ellipsis">
            {product.name}
          </h3>
          <div className="h-[2px] w-0 transition-all duration-300 group-hover:w-full" style={{ backgroundColor: BRAND }} />
        </div>

        <p className="text-sm text-gray-600 font-bold leading-relaxed line-clamp-2 mb-2 flex-grow mt-1">{product.description}</p>
        
        {product.rating && (
          <span style={{
            fontSize: 12,
            fontWeight: 600,
            color: "#f59e0b",
            marginBottom: 10,
            display: "inline-flex",
            alignItems: "center",
            gap: 4,
          }}>
            <span>⭐</span>
            <span>{product.rating.toFixed(1)} Ratings </span>({product.reviews})
          </span>
        )}

        <div className="flex items-baseline gap-1.5 mt-1 mb-2 flex-wrap">
          <span className="text-lg font-extrabold" style={{ color: BRAND, fontFamily:"'Libre Baskerville', serif" }}>₹{product.price}</span>
          <span className="text-xs text-gray-400 line-through">₹{product.originalPrice}</span>
          <span className="ml-auto text-[10px] font-bold text-emerald-600 bg-emerald-50 px-1.5 py-0.5 rounded-full">Save ₹{product.originalPrice - product.price}</span>
        </div>

        <div className="text-[10px] sm:text-xs font-bold text-center py-1 px-2 rounded-lg mb-2.5 border border-dashed" style={{ color:BRAND, background:"#fff4f4", borderColor:"rgba(130,12,12,.25)" }}>
          Use code <strong>GRAB</strong> → Get @ ₹{product.price - 20}
        </div>

        <div className="h-px bg-gray-100 mb-2.5" />

        <button
          onClick={e => { e.stopPropagation(); const [a, setA] = [added, setAdded]; setAdded(true); setTimeout(() => setAdded(false), 1800); }}
          className={`w-full py-2 text-xs font-bold tracking-widest uppercase text-white cursor-pointer border-none transition-all duration-300 flex items-center justify-center gap-1.5
            ${added ? "rounded-xl bg-emerald-500" : "rounded-tl-[40px] rounded-br-[40px]"}`}
          style={!added ? { background: BRAND } : {}}
          onMouseEnter={e => { if (!added) e.currentTarget.style.background = ACCENT; }}
          onMouseLeave={e => { if (!added) e.currentTarget.style.background = BRAND; }}
        >
          <FaShoppingCart size={12} />
          {added ? "Added!" : "Add to Cart"}
        </button>
      </div>
    </div>
  );
};

/* ── Desktop Category Sidebar ── */
const DesktopSidebar = ({ selectedCategory, setSelectedCategory }) => (
  <div className="p-4">
    <p className="text-[9px] font-extrabold tracking-[.18em] text-gray-400 uppercase mb-4">Categories</p>
    <div className="flex flex-col gap-2.5">
      {categories.map(cat => {
        const meta = categoryMeta[cat];
        const isActive = selectedCategory === cat;
        const count = cat === "All" ? products.length : products.filter(p => p.category === cat).length;
        return (
          <button key={cat} onClick={() => setSelectedCategory(cat)}
            className={`relative w-full rounded-xl overflow-hidden cursor-pointer border-none text-left transition-all duration-300
              ${isActive ? "shadow-lg scale-[1.03]" : "hover:scale-[1.01] hover:shadow-md"}`}
            style={isActive ? { outline: `2px solid ${BRAND}`, outlineOffset: 2 } : {}}>
            <div className="relative h-16 overflow-hidden">
              <img src={meta?.image} alt={cat} className={`w-full h-full object-cover transition-transform duration-500 ${isActive ? "scale-110" : "hover:scale-105"}`} />
              <div className="absolute inset-0" style={{ background: isActive ? `linear-gradient(135deg, ${BRAND}cc, ${ACCENT}99)` : "linear-gradient(135deg,rgba(0,0,0,0.5),rgba(0,0,0,0.2))" }} />
              <div className="absolute inset-0 flex items-center justify-between px-3">
                <div>
                  <div className="text-xs font-extrabold text-white" style={{ fontFamily:"'Libre Baskerville',serif" }}>{cat}</div>
                  <div className="text-[9px] text-white/70">{count} items</div>
                </div>
                <span className="text-lg">{meta?.icon}</span>
              </div>
            </div>
          </button>
        );
      })}
    </div>
  </div>
);

/* ── Mobile Category Drawer ── */
const MobileCategoryDrawer = ({ selectedCategory, setSelectedCategory, onClose }) => (
  <div className="fixed inset-0 z-50">
    <div className="absolute inset-0 bg-black/50 backdrop-blur-sm" onClick={onClose} />
    <div className="absolute bottom-0 left-0 right-0 bg-white rounded-t-3xl max-h-[80vh] overflow-y-auto shadow-2xl">
      {/* Handle */}
      <div className="flex justify-center pt-3 pb-1">
        <div className="w-10 h-1 rounded-full bg-gray-200" />
      </div>
      <div className="px-5 pt-2 pb-6">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-base font-extrabold text-gray-900" style={{ fontFamily:"'Libre Baskerville',serif" }}>Browse Categories</h3>
          <button onClick={onClose} className="w-8 h-8 rounded-full bg-gray-100 flex items-center justify-center border-none cursor-pointer">
            <svg className="w-4 h-4 text-gray-500" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2.5}><path d="M18 6L6 18M6 6l12 12"/></svg>
          </button>
        </div>
        {/* Grid of category cards */}
        <div className="grid grid-cols-2 gap-3">
          {categories.map(cat => {
            const meta = categoryMeta[cat];
            const isActive = selectedCategory === cat;
            const count = cat === "All" ? products.length : products.filter(p => p.category === cat).length;
            return (
              <button key={cat} onClick={() => { setSelectedCategory(cat); onClose(); }}
                className="relative rounded-2xl overflow-hidden cursor-pointer border-none h-24 transition-all duration-200 active:scale-95"
                style={isActive ? { outline:`2.5px solid ${BRAND}`, outlineOffset:2 } : {}}>
                <img src={meta?.image} alt={cat} className="w-full h-full object-cover" />
                <div className="absolute inset-0" style={{ background: isActive ? `linear-gradient(135deg,${BRAND}cc,${ACCENT}99)` : "linear-gradient(135deg,rgba(0,0,0,0.55),rgba(0,0,0,0.2))" }} />
                <div className="absolute inset-0 flex flex-col items-center justify-center gap-0.5 p-2">
                  <span className="text-2xl">{meta?.icon}</span>
                  <span className="text-xs font-extrabold text-white text-center leading-tight" style={{ fontFamily:"'Libre Baskerville',serif" }}>{cat}</span>
                  <span className="text-[9px] text-white/70">{count} items</span>
                </div>
                {isActive && (
                  <div className="absolute top-2 right-2 w-5 h-5 rounded-full bg-white flex items-center justify-center">
                    <svg className="w-3 h-3" viewBox="0 0 24 24" fill="none" stroke={BRAND} strokeWidth={3}><path d="M5 13l4 4L19 7"/></svg>
                  </div>
                )}
              </button>
            );
          })}
        </div>
      </div>
    </div>
  </div>
);

/* ── Main App ── */
export default function App() {
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [sortBy, setSortBy] = useState("default");
  const [searchQuery, setSearchQuery] = useState("");
  const [drawerOpen, setDrawerOpen] = useState(false);

  const filtered = useMemo(() => {
    let list = products.filter(p => {
      if (selectedCategory !== "All" && p.category !== selectedCategory) return false;
      if (searchQuery && !p.name.toLowerCase().includes(searchQuery.toLowerCase())) return false;
      return true;
    });
    if (sortBy === "price-asc")  list = [...list].sort((a,b) => a.price - b.price);
    if (sortBy === "price-desc") list = [...list].sort((a,b) => b.price - a.price);
    if (sortBy === "rating")     list = [...list].sort((a,b) => b.rating - a.rating);
    if (sortBy === "popular")    list = [...list].sort((a,b) => b.reviews - a.reviews);
    return list;
  }, [selectedCategory, sortBy, searchQuery]);

  const activeMeta = categoryMeta[selectedCategory];

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Libre+Baskerville:wght@400;700&family=DM+Sans:wght@400;600;700;800&display=swap');
        * { font-family: 'DM Sans', sans-serif; box-sizing: border-box; }
        @keyframes cardIn {
          from { opacity:0; transform:translateY(18px) scale(.97); }
          to   { opacity:1; transform:translateY(0) scale(1); }
        }
        @keyframes slideUp {
          from { transform:translateY(100%); }
          to   { transform:translateY(0); }
        }
        ::-webkit-scrollbar { width: 4px; }
        ::-webkit-scrollbar-track { background: transparent; }
        ::-webkit-scrollbar-thumb { background: #e2b8b8; border-radius: 99px; }
      `}</style>

      <div className="min-h-screen bg-gradient-to-br from-orange-50 via-white to-rose-50">

        {/* ── Hero ── */}
        <div className="relative overflow-hidden px-4 sm:px-8 lg:px-12 py-8 sm:py-12"
          style={{ background:"linear-gradient(130deg,#3d0404 0%,#820c0c 50%,#c9643a 100%)" }}>
          <div className="absolute -top-10 -right-10 w-40 h-40 rounded-full bg-white opacity-5" />
          <div className="absolute -bottom-16 left-1/3 w-60 h-60 rounded-full bg-white opacity-5" />
          <div className="relative z-10 max-w-screen-xl mx-auto">
            <p className="text-[10px] font-bold tracking-[.2em] text-red-200 uppercase mb-1.5">Wellness & Nutrition</p>
            <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-white leading-tight mb-2" style={{ fontFamily:"'Libre Baskerville',serif" }}>Our Products</h1>
            <p className="text-sm text-red-200">
              <strong className="text-white">{filtered.length}</strong> of {products.length} products
              {selectedCategory !== "All" && (
                <span className="ml-2 inline-flex items-center gap-1 bg-white/20 text-white text-xs font-semibold px-2.5 py-0.5 rounded-full">
                  {activeMeta?.icon} {selectedCategory}
                </span>
              )}
            </p>
          </div>
        </div>

        {/* ── Sticky Toolbar ── */}
        <div className="sticky top-0 z-30 bg-white/95 backdrop-blur-sm border-b border-gray-100 shadow-sm">
          <div className="max-w-screen-xl mx-auto px-3 sm:px-5 py-2.5 flex items-center gap-2">

            {/* Mobile: Category Button */}
            <button onClick={() => setDrawerOpen(true)}
              className="sm:hidden flex items-center gap-2 px-3 py-2 rounded-xl text-xs font-bold text-white border-none cursor-pointer shrink-0 transition-all active:scale-95"
              style={{ background: BRAND }}>
              <span>{activeMeta?.icon}</span>
              <span className="max-w-[70px] truncate">{selectedCategory}</span>
              <svg className="w-3 h-3 opacity-70" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2.5}><path d="M6 9l6 6 6-6"/></svg>
            </button>

            {/* Search */}
            <div className="relative flex-1 min-w-0">
              <svg className="absolute left-3 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-gray-400" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2.5}>
                <circle cx="11" cy="11" r="8"/><path d="m21 21-4.35-4.35"/>
              </svg>
              <input type="text" placeholder="Search products…" value={searchQuery}
                onChange={e => setSearchQuery(e.target.value)}
                className="w-full pl-8 pr-3 py-2 border border-gray-200 rounded-xl text-xs sm:text-sm text-gray-700 bg-gray-50 outline-none focus:border-red-300 focus:ring-2 focus:ring-red-50 transition" />
            </div>

            {/* Sort */}
            <select value={sortBy} onChange={e => setSortBy(e.target.value)}
              className="px-2 sm:px-3 py-2 border border-gray-200 rounded-xl text-xs sm:text-sm font-semibold text-gray-700 bg-gray-50 outline-none cursor-pointer shrink-0">
              <option value="default">Default</option>
              <option value="price-asc">Price ↑</option>
              <option value="price-desc">Price ↓</option>
              <option value="rating">Top Rated</option>
              <option value="popular">Popular</option>
            </select>
          </div>
        </div>

        {/* ── Mobile Category Drawer ── */}
        {drawerOpen && (
          <MobileCategoryDrawer
            selectedCategory={selectedCategory}
            setSelectedCategory={setSelectedCategory}
            onClose={() => setDrawerOpen(false)}
          />
        )}

        {/* ── Body Layout ── */}
        <div className="max-w-screen-xl mx-auto flex">

          {/* Desktop Sidebar */}
          <aside className="hidden sm:block w-48 md:w-56 shrink-0">
            <div className="sticky top-[53px] h-[calc(100vh-53px)] overflow-y-auto bg-white border-r border-gray-100">
              <DesktopSidebar selectedCategory={selectedCategory} setSelectedCategory={setSelectedCategory} />
            </div>
          </aside>

          {/* Products Area */}
          <main className="flex-1 min-w-0 p-3 sm:p-4 md:p-6">

            {/* Section title */}
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-2">
                <span className="text-xl">{activeMeta?.icon}</span>
                <div>
                  <h2 className="text-base sm:text-lg font-extrabold text-gray-900 leading-tight" style={{ fontFamily:"'Libre Baskerville',serif" }}>
                    {selectedCategory === "All" ? "All Products" : selectedCategory}
                  </h2>
                  <p className="text-[10px] sm:text-xs text-gray-400">{filtered.length} product{filtered.length !== 1 ? "s" : ""} available</p>
                </div>
              </div>
            </div>

            {/* Empty state */}
            {filtered.length === 0 ? (
              <div className="flex flex-col items-center justify-center py-20 text-center">
                <div className="text-5xl mb-4">🔍</div>
                <h3 className="text-base font-bold text-gray-700 mb-1">No products found</h3>
                <p className="text-sm text-gray-400 mb-5">Try a different category or search term</p>
                <button onClick={() => { setSelectedCategory("All"); setSearchQuery(""); }}
                  className="px-5 py-2.5 rounded-xl text-white font-bold text-sm border-none cursor-pointer"
                  style={{ background:`linear-gradient(135deg,${BRAND},${ACCENT})` }}>
                  View All
                </button>
              </div>
            ) : (
              <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3 gap-3 sm:gap-4">
                {filtered.map((product, idx) => (
                  <ProductCard key={product.id} product={product} animDelay={idx * 0.04} />
                ))}
              </div>
            )}
          </main>
        </div>
      </div>
    </>
  );
}