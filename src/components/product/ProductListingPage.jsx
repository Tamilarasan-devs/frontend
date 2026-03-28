import React, { useState, useMemo } from "react";
import { useNavigate } from "react-router-dom";
import { FaShoppingCart } from "react-icons/fa";
import Banner from "../layout/Banner";
// import bottle from '../../assets/images/btl.jpg';
// import bottle1 from '../../assets/images/btl1.jpg';
// import bottle from '../../assets/images/aaya.png'
// import bottle1 from '../../assets/images/aaya-pro.png'
// import bottle from '../../assets/images/bt.jpeg'
// import bottle1 from '../../assets/images/bt.jpeg'

import bottle from '../../assets/images/prod/pro5.jpeg'
import bottle1 from '../../assets/images/prod/pro1.jpeg'
import VideoCarousel from '../layout/ReelSection'
import FirstBanner from "../layout/banner/FirstBanner";




import cate1 from '../../assets/images/allCate/cate1.jpeg'
import cate2 from '../../assets/images/allCate/cate2.jpeg'
import cate3 from '../../assets/images/allCate/cate3.jpeg'
import cate4 from '../../assets/images/allCate/cate4.jpeg'
import cate5 from '../../assets/images/allCate/cate5.jpeg'

const BRAND = "#820c0c";
const ACCENT = "#c9643a";

const badgeMap = {
  "New Launches":   "bg-yellow-400 border-yellow-500 text-black",
  "Must Try!":      "bg-sky-500 border-sky-600 text-white",
  "Top Rated":      "bg-green-500 border-green-600 text-white",
  "Fast Moving":    "bg-lime-500 border-lime-600 text-black",
  "Hot Seller":     "bg-pink-500 border-pink-600 text-white",
  "Limited Stock":  "bg-red-500 border-red-600 text-white",
};

const categoryMeta = {
  "All":         { image: [cate1], icon: "🛍️", color: "#820c0c" },
  "Supplements": { image: [cate2], icon: "💊", color: "#7c3aed" },
  "Vitamins":    { image: [cate3], icon: "🧬", color: "#0369a1" },
  "Protein":     { image: [cate4], icon: "💪", color: "#b45309" },
  "Skincare":    { image: [cate5], icon: "✨", color: "#be185d" },
};

const products = [
  { id: 1,  name: "Cherry Iron Supplement",    category: "Supplements", description: "Iron-rich supplement to support .", price: 299, originalPrice: 499, rating: 4.5, reviews: 128, badge: "New Launches", tags: ["Iron-Rich","Energy"],   images: [bottle,bottle1] },
  { id: 2,  name: "Daily Multivitamin Tablets", category: "Vitamins",    description: "Complete multivitamin for immunity",   price: 449, originalPrice: 699, rating: 5,   reviews: 210, badge: "Top Rated",  tags: ["Immunity","Daily Use"], images: [bottle,bottle1] },
  { id: 3,  name: "Protein Nutrition Powder",  category: "Protein",     description: "High-quality protein blend for ",          price: 599, originalPrice: 899, rating: 4.2, reviews: 96,  badge: "Hot Seller",    tags: ["Muscle","Recovery"],   images: [bottle,bottle1] },
  { id: 4,  name: "Omega-3 Fish Oil Capsules", category: "Supplements", description: "Supports heart health and brain",     price: 399, originalPrice: 599, rating: 4.8, reviews: 180, badge: "Must Try!", tags: ["Heart","Brain"],       images: [bottle,bottle1] },
  { id: 5,  name: "Herbal Skin Cleanser",      category: "Skincare",    description: "Gentle herbal cleanser that refreshes skin .", price: 349, originalPrice: 499, rating: 4.1, reviews: 74,  badge: "Limited Stock",        tags: ["Herbal","Gentle"],     images: [bottle,bottle1] },

];

const categories = ["All", ...Array.from(new Set(products.map(p => p.category)))];



/* ── Product Card ── */
const ProductCard = ({ product, animDelay = 0 }) => {
  const [hov, setHov] = useState(false);
  const [added, setAdded] = useState(false);
  const navigate = useNavigate();
  const disc = Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100);
const bm = badgeMap[product.badge] || "bg-gray-400 text-white";


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
        {/* {bm && <span className={`self-start text-[9px] font-bold uppercase tracking-widest px-2 py-0.5 rounded-full border mb-1.5 `}>{product.badge}</span>} */}
        <span
  className={`absolute top-3 left-3 text-xs px-2 py-1 rounded z-10 font-semibold border ${bm}`}
>
  {product.badge}
</span>
      <div className="relative h-44 sm:h-48 overflow-hidden bg-orange-50 shrink-0">

        <div className="relative h-44 sm:h-48 overflow-hidden bg-white flex items-center justify-center">

  <img
    src={product.images[0]}
    alt={product.name}
    draggable={false}
    className={`absolute inset-0 w-full h-full object-contain transition-all duration-500 
    ${hov ? "opacity-0 scale-105" : "opacity-100 scale-100"}`}
  />

  <img
    src={product.images[1]}
    alt={product.name}
    draggable={false}
    className={`absolute inset-0 w-full h-full object-contain transition-all duration-500 
    ${hov ? "opacity-100 scale-100" : "opacity-0 scale-105"}`}
  />

</div>

        {/* Tags */}
        <div className={`absolute bottom-2 left-2 flex flex-col gap-1 z-10 transition-all duration-300 ${hov ? "opacity-100 translate-y-0" : "opacity-0 translate-y-2"}`}>
          {product.tags.map((t, i) => (
            <span key={i} className="text-[9px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-full text-white shadow-sm" style={{ background: BRAND }}>{t}</span>
          ))}
        </div>

        {/* Discount badge */}
        <div style={{ position:"absolute", top:0, right:0, zIndex:5, background:'#FFB800', color:"#fff", padding:"10px 10px", fontWeight:800, textAlign:"center", lineHeight:1.4, clipPath:"polygon(0 0,100% 0,100% 75%,85% 100%,70% 75%,55% 100%,40% 75%,25% 100%,10% 75%,0 100%)", boxShadow:"0 4px 10px rgba(0,0,0,0.25)" }}>
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

        <div className="inline-block group">
          <h3 className="text-[14px] sm:text-[15px] font-bold text-[#1a1a1a] mb-[3px] whitespace-nowrap overflow-hidden text-ellipsis">
            {product.name}
          </h3>
          <div className="h-[2px] w-0 transition-all duration-300 group-hover:w-50" style={{ backgroundColor: BRAND }} />
        </div>
<p
          className="text-sm font-bold text-gray-600"
          style={{
            lineHeight: 1.65,
            display: "-webkit-box",
            WebkitLineClamp: 2,
            WebkitBoxOrient: "vertical",
            overflow: "hidden",
          }}
        >
   <span className="text-[#829b1c] font-extrabold">FOR :</span> {product.benefit}


          {product.description}
        </p>
        <p
          className="text-sm font-bold text-gray-600 mb-3"
          style={{
            lineHeight: 1.65,
            display: "-webkit-box",
            WebkitLineClamp: 2,
            WebkitBoxOrient: "vertical",
            overflow: "hidden",
          }}
        >
  <span className="text-[#c9643a] font-extrabold">WITH :</span> {product.benefit}

          {product.description}
        </p>
        {/* <p className="text-md font-bold text-gray-500 leading-relaxed line-clamp-2 mb-2 flex-grow mt-1 ">{product.description}</p> */}

{product.rating && (
  <div style={{
    display: "inline-flex",
    alignItems: "center",
    gap: 12, // Space between the two elements
  }}>
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
      <span>{product.rating.toFixed(1)} Ratings</span>
    </span>
    
    {/* Reviews */}
    <span style={{
      fontSize: 12,
      fontWeight: 600,
      color: "#6b7280", // A soft gray for reviews text
      marginBottom: 10,
    }}>
      ({product.reviews}) Reviews
    </span>
  </div>
)}
        

        <div className="flex items-baseline gap-1.5 mt-1 mb-2 flex-wrap">
          <span className="text-lg font-extrabold" style={{ color: BRAND }}>₹{product.price}</span>
          <span className="text-xs text-gray-400 line-through">₹{product.originalPrice}</span>
          <span className="ml-auto text-[10px] font-bold text-emerald-600 bg-emerald-50 px-1.5 py-0.5 rounded-full">Save ₹{product.originalPrice - product.price}</span>
        </div>

        <div className="text-[10px] sm:text-xs font-bold text-center py-1 px-2 rounded-lg mb-2.5 border border-dashed" style={{ color:BRAND, background:"#fff4f4", borderColor:"rgba(130,12,12,.25)" }}>
          Use code <strong>GRAB</strong> → Get @ ₹{product.price - 20}
        </div>

        <div className="h-px bg-gray-100 mb-2.5" />

        <button
          onClick={e => { e.stopPropagation(); setAdded(true); setTimeout(() => setAdded(false), 1800); }}
          className="w-full py-3 text-sm font-semibold tracking-wide uppercase flex items-center justify-center gap-2 text-white cursor-pointer transition-all duration-300 ease-in-out"
          style={{
            borderRadius: "50px 0 50px 0",
            background: added ? "#16a34a" : BRAND,
            border: "none",
          }}
          onMouseEnter={e => { if (!added) e.currentTarget.style.background = ACCENT; }}
          onMouseLeave={e => { if (!added) e.currentTarget.style.background = BRAND; }}
        >
          <FaShoppingCart size={12} />
          {added ? "✓ Added!" : "Add to Cart"}
        </button>
      </div>
    </div>
  );
};

/* ── Desktop Category Sidebar ── */
const DesktopSidebar = ({ selectedCategory, setSelectedCategory }) => {
  const totalProducts = products.length;

  return (
    <div style={{ display: "flex", flexDirection: "column", height: "100%", padding: "0" }}>
      
      {/* Sidebar Header */}
      <div style={{
        padding: "20px 16px 14px",
        borderBottom: "1px solid #fde8e8",
        background: "linear-gradient(160deg, #fff4f4 0%, #fff 100%)",
      }}>
        <p style={{ fontSize: 9, fontWeight: 800, letterSpacing: "0.2em", color: "#9ca3af", textTransform: "uppercase", marginBottom: 4 }}>Shop By</p>
        <h3 style={{ fontSize: 15, fontWeight: 800, color: "#1a1a1a",   margin: 0 }}>Categories</h3>
      </div>

      {/* Category List */}
      <div style={{ flex: 1, overflowY: "auto", padding: "12px 10px" }}>
        {categories.map(cat => {
          const meta = categoryMeta[cat];
          const isActive = selectedCategory === cat;
          const count = cat === "All" ? totalProducts : products.filter(p => p.category === cat).length;
          
          return (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              style={{
                width: "100%",
                border: "none",
                padding: 0,
                marginBottom: 8,
                cursor: "pointer",
                background: "transparent",
                textAlign: "left",
              }}
            >
              {/* Card */}
              <div style={{
                position: "relative",
                borderRadius: 14,
                overflow: "hidden",
                height: 100,
                transition: "all 0.25s ease",
                outline: isActive ? `2.5px solid ${BRAND}` : "2.5px solid transparent",
                outlineOffset: 2,
                boxShadow: isActive ? `0 4px 16px rgba(130,12,12,0.18)` : "0 1px 4px rgba(0,0,0,0.06)",
                transform: isActive ? "scale(1.02)" : "scale(1)",
              }}>
                {/* Background image */}
                <img
                  src={meta?.image}
                  alt={cat}
                  style={{
                    position: "absolute", inset: 0,
                    width: "100%", height: "100%",
                    objectFit: "cover",
                    transition: "transform 0.4s ease",
                    transform: isActive ? "scale(1.08)" : "scale(1)",
                  }}
                />
                {/* Overlay */}
                <div style={{
                  position: "absolute", inset: 0,
                  background: isActive
                    ? `linear-gradient(120deg, ${BRAND}e0 0%, ${ACCENT}bb 100%)`
                    : "linear-gradient(120deg, rgba(0,0,0,0.62) 0%, rgba(0,0,0,0.22) 100%)",
                  transition: "background 0.3s ease",
                }} />

                {/* Content */}
                <div style={{
                  position: "absolute", inset: 0,
                  display: "flex", alignItems: "center",
                  padding: "0 14px",
                  gap: 10,
                }}>
                  {/* Icon bubble */}
                  <div style={{
                    width: 36, height: 36,
                    borderRadius: "50%",
                    background: isActive ? "rgba(255,255,255,0.22)" : "rgba(255,255,255,0.15)",
                    display: "flex", alignItems: "center", justifyContent: "center",
                    fontSize: 17,
                    flexShrink: 0,
                    backdropFilter: "blur(4px)",
                    border: "1px solid rgba(255,255,255,0.25)",
                    transition: "all 0.3s ease",
                  }}>
                    {meta?.icon}
                  </div>

                  {/* Text */}
                  <div style={{ flex: 1, minWidth: 0 }}>
                    <div style={{ fontSize: 13, fontWeight: 800, color: "#fff", lineHeight: 1.2, whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>
                      {cat}
                    </div>
                    <div style={{ fontSize: 10, color: "rgba(255,255,255,0.72)", marginTop: 2 }}>
                      {count} product{count !== 1 ? "s" : ""}
                    </div>
                  </div>

                  {/* Active check */}
                  {isActive && (
                    <div style={{
                      width: 20, height: 20, borderRadius: "50%",
                      background: "#fff",
                      display: "flex", alignItems: "center", justifyContent: "center",
                      flexShrink: 0,
                    }}>
                      <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke={BRAND} strokeWidth={3.5}>
                        <path d="M5 13l4 4L19 7"/>
                      </svg>
                    </div>
                  )}
                </div>
              </div>
            </button>
          );
        })}
      </div> 
    </div>
  );
};

/* ── Mobile Category Drawer ── */
const MobileCategoryDrawer = ({ selectedCategory, setSelectedCategory, onClose }) => (
  <div className="fixed inset-0 z-50">
    <div className="absolute inset-0 bg-black/50 backdrop-blur-sm" onClick={onClose} />
    <div className="absolute bottom-0 left-0 right-0 bg-white rounded-t-3xl max-h-[80vh] overflow-y-auto shadow-2xl">
      <div className="flex justify-center pt-3 pb-1">
        <div className="w-10 h-1 rounded-full bg-gray-200" />
      </div>
      <div className="px-5 pt-2 pb-6">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-base font-extrabold text-gray-900">Browse Categories</h3>
          <button onClick={onClose} className="w-8 h-8 rounded-full bg-gray-100 flex items-center justify-center border-none cursor-pointer">
            <svg className="w-4 h-4 text-gray-500" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2.5}><path d="M18 6L6 18M6 6l12 12"/></svg>
          </button>
        </div>
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
                  <span className="text-xs font-extrabold text-white text-center leading-tight">{cat}</span>
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
        @keyframes cardIn {
          from { opacity:0; transform:translateY(18px) scale(.97); }
          to   { opacity:1; transform:translateY(0) scale(1); }
        }
        ::-webkit-scrollbar { width: 4px; }
        ::-webkit-scrollbar-track { background: transparent; }
        ::-webkit-scrollbar-thumb { background: #e2b8b8; border-radius: 99px; }
      `}</style>

      <div className="min-h-screen bg-gradient-to-br from-orange-50 via-white to-rose-50">

        <Banner/>

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
<FirstBanner/>

        {/* ── Mobile Category Drawer ── */}
        {drawerOpen && (
          <MobileCategoryDrawer
            selectedCategory={selectedCategory}
            setSelectedCategory={setSelectedCategory}
            onClose={() => setDrawerOpen(false)}
          />
        )}

        {/* ── Body Layout ── */}
        <div className="max-w-full-xl mx-auto flex p-4">

          {/* Desktop Sidebar — fully utilized */}
          <aside className="hidden sm:flex flex-col w-56 md:w-64 shrink-0">
            <div style={{
              position: "sticky",
              top: 53,
              height: "calc(100vh - 53px)",
              overflowY: "auto",
              background: "#fff",
              borderRight: "1px solid #fde8e8",
              display: "flex",
              flexDirection: "column",
            }}>
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
              <div className="grid grid-cols-1 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3 gap-3 sm:gap-4">
                {filtered.map((product, idx) => (
                  <ProductCard key={product.id} product={product} animDelay={idx * 0.04} />
                ))}
              </div>
            )}
          </main>
        </div>
      </div>
      <VideoCarousel/>
    </>
  );
}