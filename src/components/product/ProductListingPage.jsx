import { useState, useEffect, useMemo } from "react";
import axios from "axios";
import { axiosInstance } from "../../utils/axiosInstance";
import ProductCard from './ProductCard'
// ─── Config ────────────────────────────────────────────────────────────────────
import cate1 from '../../assets/images/allCate/cate1.jpeg'
import cate2 from '../../assets/images/allCate/cate2.jpeg'
import cate3 from '../../assets/images/allCate/cate3.jpeg'
import cate4 from '../../assets/images/allCate/cate4.jpeg'
import Banner from '../layout/Banner'
import OfferScrollBar from '../layout/OfferScrollBar'
import FirstBanner from "../layout/banner/FirstBanner";
// import {products} from '../../services/productData'

// ─── Static Categories (replace with your real categories API) ─────────────────
const CATEGORIES = [
  { id: "all",                                      name: "All Products",      emoji: "🌿", count: 8, img: cate1 },
  { id: "02c6d619-8544-4372-8fd8-0bc1540ad44a",    name: "Heart Health",      emoji: "❤️", count: 3, img: cate2 },
  { id: "cat-immunity",                             name: "Immunity",          emoji: "🛡️", count: 2, img: cate3 },
  { id: "cat-digestion",                            name: "Digestion",         emoji: "🌱", count: 2, img: cate4 },
  { id: "cat-skin",                                 name: "Skin Care",         emoji: "✨", count: 1, img: cate1 },
];
// console.log('products :',products)
// ─── Helpers ───────────────────────────────────────────────────────────────────
const calcDiscount = (price, final) =>
  Math.round(((parseFloat(price) - parseFloat(final)) / parseFloat(price)) * 100);



// ─── SVG Icons ─────────────────────────────────────────────────────────────────
const Icons = {
  Search: () => (
    <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
      <circle cx="11" cy="11" r="8" />
      <path d="m21 21-4.35-4.35" />
    </svg>
  ),
  Cart: () => (
    <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
      <path d="M6 2 3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4z" />
      <line x1="3" y1="6" x2="21" y2="6" />
      <path d="M16 10a4 4 0 0 1-8 0" />
    </svg>
  ),
  Filter: () => (
    <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
      <line x1="4" y1="6" x2="20" y2="6" />
      <line x1="8" y1="12" x2="16" y2="12" />
      <line x1="11" y1="18" x2="13" y2="18" />
    </svg>
  ),
  Close: () => (
    <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
      <path d="M18 6 6 18M6 6l12 12" />
    </svg>
  ),
  Chevron: () => (
    <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" strokeWidth={2.5} viewBox="0 0 24 24">
      <path d="m9 18 6-6-6-6" />
    </svg>
  ),
  Star: ({ filled = true }) => (
    <svg
      className={`w-3 h-3 ${filled ? "fill-amber-400 text-amber-400" : "fill-gray-200 text-gray-200"}`}
      viewBox="0 0 24 24"
    >
      <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
    </svg>
  ),
};

// ─── Header Component ──────────────────────────────────────────────────────────
function Header({  search, setSearch }) {
  return (
    <header className="sticky top-0 z-50 bg-white/95 backdrop-blur-sm border-b border-gray-100 shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 h-14 sm:h-16 flex items-center justify-center gap-3 sm:gap-6">

        

        {/* Search */}
        <div className="flex-1 max-w-md">
          <label className="flex items-center gap-2 bg-gray-50 border border-gray-200 rounded-xl px-3 py-2 sm:py-2.5 cursor-text transition-all focus-within:bg-white focus-within:border-emerald-400 focus-within:ring-2 focus-within:ring-emerald-100">
            <span className="text-gray-400 shrink-0"><Icons.Search /></span>
            <input
              type="text"
              placeholder="Search products..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="flex-1 text-sm bg-transparent outline-none text-gray-700 placeholder-gray-400 min-w-0"
            />
            {search && (
              <button
                onClick={() => setSearch("")}
                className="shrink-0 text-gray-400 hover:text-gray-600 p-0.5 rounded-md hover:bg-gray-100 transition-colors"
              >
                <Icons.Close />
              </button>
            )}
          </label>
        </div>

      </div>
    </header>
  );
}

// ─── Desktop Sidebar ───────────────────────────────────────────────────────────
function Sidebar({ categories, selected, onSelect }) {
  return (
    <aside className="w-64 hidden md:block sticky top-20 h-fit">
      <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
        
        <div className="px-4 py-3 border-b border-gray-100 bg-gray-50/60">
          <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">
            Categories
          </p>
        </div>

        <nav className="p-2 space-y-2">
          {categories.map((cat) => {
            const active = selected === cat.id;

            return (
              <button
                key={cat.id}
                onClick={() => onSelect(cat.id)}
                className="relative w-full h-26 flex items-center px-4 rounded-xl overflow-hidden"
              >
                {/* Background */}
                <div className="absolute inset-0">
                  <img src={cat.img} className="w-full h-full object-cover" />
                  <div className="absolute inset-0 bg-black/40" />
                </div>

                {/* Content */}
                <div className="relative z-10 text-white">
                  {cat.name}
                </div>
              </button>
            );
          })}
        </nav>
      </div>
    </aside>
  );
}

// ─── Mobile Category Drawer ────────────────────────────────────────────────────
function MobileDrawer({ categories, selected, onSelect, open, onClose }) {
  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [open]);

  if (!open) return null;

  return (
    <div className="fixed inset-0 z-50 md:hidden">
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-black/40 backdrop-blur-sm"
        onClick={onClose}
      />
      {/* Drawer */}
      <div className="absolute bottom-0 left-0 right-0 bg-white rounded-t-3xl max-h-[75vh] overflow-y-auto">
        <div className="sticky top-0 bg-white flex items-center justify-between px-5 py-4 border-b border-gray-100">
          <p className="font-bold text-gray-800">Browse Categories</p>
          <button
            onClick={onClose}
            className="w-8 h-8 rounded-full bg-gray-100 hover:bg-gray-200 grid place-items-center text-gray-500 transition-colors"
          >
            <Icons.Close />
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
                  ${active ? "bg-emerald-50 border-emerald-200" : "bg-gray-50 border-transparent hover:bg-gray-100"}`}
              >
                <span className={`w-9 h-9 rounded-xl text-xl grid place-items-center shrink-0
                  ${active ? "bg-emerald-100" : "bg-white"}`}>
                  {cat.emoji}
                </span>
                <div className="min-w-0">
                  <p className={`text-sm font-medium truncate ${active ? "text-emerald-700" : "text-gray-700"}`}>
                    {cat.name}
                  </p>
                  <p className="text-xs text-gray-400">{cat.count} items</p>
                </div>
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
}





// ─── Empty State ───────────────────────────────────────────────────────────────


// ─── Main Page Component ───────────────────────────────────────────────────────
export default function ProductListingPage() {

  const [products, setProducts]     = useState([]);
  const [loading, setLoading]       = useState(true);
  const [category, setCategory]     = useState("all");
  const [search, setSearch]         = useState("");
  const [sortBy, setSortBy]         = useState("default");
  const [offerTag, setOfferTag]     = useState("All");
  const [cartCount, setCartCount]   = useState(0);
  const [drawerOpen, setDrawerOpen] = useState(false);

  // ── Fetch products ──
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await axiosInstance.get("/product/getAllProduct");
        const raw = response.data.products;
        // Handle both single object and array response
        setProducts(Array.isArray(raw) ? raw : [raw]);
      } catch (error) {
        console.error("Failed to fetch products:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchProducts();
  }, []);

  // ── Derive offer tags from products ──
const offerTags = useMemo(() => {
  const set = new Set(["All"]);

  products
    ?.filter(Boolean) // removes undefined/null items
    .forEach((p) => {
      p.offerTags?.forEach((t) => t && set.add(t));
    });

  return [...set];
}, [products]);
console.log(products)

  // ── Filter + sort products ──
  const filteredProducts = useMemo(() => {
    let list = products.filter((p) => {
      const matchCat  = category === "all" || p.categoryId === category;
      const matchQ    = !search
        || p.productName.toLowerCase().includes(search.toLowerCase())
        || p.productTags?.some((t) => t.toLowerCase().includes(search.toLowerCase()));
      const matchTag  = offerTag === "All" || p.offerTags?.includes(offerTag);
      return matchCat && matchQ && matchTag;
    });

    if (sortBy === "price-asc")  list = [...list].sort((a, b) => parseFloat(a.finalPrice) - parseFloat(b.finalPrice));
    if (sortBy === "price-desc") list = [...list].sort((a, b) => parseFloat(b.finalPrice) - parseFloat(a.finalPrice));
    if (sortBy === "discount")   list = [...list].sort((a, b) =>
      calcDiscount(b.price, b.finalPrice) - calcDiscount(a.price, a.finalPrice));

    return list;
  }, [products, category, search, offerTag, sortBy]);

  const handleAddToCart = (product) => {
    setCartCount((c) => c + 1);
    console.log("Added to cart:", product.productName);
  };

  const activeCategoryName = CATEGORIES.find((c) => c.id === category)?.name ?? "All Products";

  return (
    <div className=" bg-gray-50 ">

      {/* ── Header ── */}
      <Banner/>
      {/* <TopScroll/> */}
      <OfferScrollBar/>
      <Header cartCount={cartCount} search={search} setSearch={setSearch} />
<FirstBanner/>
      {/* ── Mobile Drawer ── */}
      <MobileDrawer
        categories={CATEGORIES}
        selected={category}
        onSelect={setCategory}
        open={drawerOpen}
        onClose={() => setDrawerOpen(false)}
      />

      <div className=" mx-auto px-4 sm:px-6 py-6 sm:py-8">
        <div className="flex gap-6 lg:gap-8 items-start ">

          {/* ── Sidebar (desktop only) ── */}
          <Sidebar categories={CATEGORIES} selected={category} onSelect={setCategory} />

          {/* ── Main Content ── */}
          <main className="flex-1 min-w-0">

            {/* Breadcrumb */}
            <nav className="flex items-center gap-1.5 text-xs text-gray-400 mb-5">
              <span className="hover:text-gray-600 cursor-pointer transition-colors">Home</span>
              <Icons.Chevron />
              <span className="text-gray-700 font-semibold">{activeCategoryName}</span>
            </nav>

            {/* ── Controls Bar ── */}
            <div className="flex flex-wrap items-center gap-3 justify-between mb-5">

              {/* Left: mobile filter + offer pills */}
              <div className="flex items-center gap-2 flex-wrap">
                {/* Mobile category filter button */}
                <button
                  onClick={() => setDrawerOpen(true)}
                  className="flex md:hidden items-center gap-1.5 px-3 py-1.5 rounded-full border border-gray-200 bg-white text-xs font-semibold text-gray-600 hover:border-emerald-400 hover:text-emerald-700 transition-all shadow-sm"
                >
                  <Icons.Filter />
                  {activeCategoryName}
                </button>

                {/* Offer tag pills */}
                {offerTags.length > 1 && offerTags.map((tag) => (
                  <button
                    key={tag}
                    onClick={() => setOfferTag(tag)}
                    className={`px-3.5 py-1.5 rounded-full text-[15px] font-bold border transition-all
                      ${offerTag === tag
                        ? "bg-[#c9643a] text-white border-[#c9643a] shadow-sm shadow-[#c9643a]/50"
                        : "bg-white text-gray-600 border-gray-200 hover:border-[#c9643a] hover:text-[#c9643a]"}`}
                  >
                    {tag}
                  </button>
                ))}
              </div>

              {/* Right: count + sort */}
              <div className="flex items-center gap-3">
                <span className="text-xs text-gray-400 hidden sm:block whitespace-nowrap">
                  <span className="font-bold text-gray-700">{filteredProducts.length}</span> products
                </span>
                <select
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value)}
                  className="text-xs border border-gray-200 bg-white rounded-xl px-3 py-2 outline-none text-gray-700 cursor-pointer hover:border-emerald-400 focus:border-emerald-400 focus:ring-2 focus:ring-emerald-100 transition-all shadow-sm"
                >
                  <option value="default">Featured</option>
                  <option value="price-asc">Price: Low → High</option>
                  <option value="price-desc">Price: High → Low</option>
                  <option value="discount">Best Discount</option>
                </select>
              </div>
            </div>

            {/* ── Section Heading ── */}
            <div className="flex items-center justify-between mb-4">
              <h1 className="text-base sm:text-lg font-bold text-yellow-700  tracking-tight">
                {activeCategoryName}
              </h1>
              <span className="text-xs text-gray-400 sm:hidden">{filteredProducts.length} items</span>
            </div>

            {/* ── Product Grid ── */}
            {/* <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-3 sm:gap-4">
              {loading
                ? Array.from({ length: 8 }).map((_, i) => <SkeletonCard key={i} />)
                : filteredProducts.length === 0
                  ? <EmptyState search={search} />
                  : filteredProducts.map((product) => (
                      <ProductCard
                        key={product.id}
                        product={product}
                        onAdd={handleAddToCart}
                      />
                    ))}
            </div> */}
   <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-2">
  {filteredProducts
    ?.filter(Boolean) // removes undefined/null
    .map((product, idx) => (
      <div key={product.id || idx} className="flex">
        <ProductCard
          product={product}
          animDelay={idx * 0.08}
          sectionVisible={true}
          onClick={(item) => console.log("Go to product", item)}
          onAddToCart={(item) => console.log("Add to cart", item)}
        />
      </div>
    ))}
</div>
          </main>
        </div>
      </div>
    </div>
  );
}