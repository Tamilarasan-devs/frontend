import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { axiosInstance } from "../../utils/axiosInstance";

// ─── Static Fallback Data ─────────────────────────────────────────────────────

const OFFERS = [
  { icon: "💳", bg: "bg-blue-50", title: "Bank Offer", body: "10% off HDFC Cards. Min ₹500" },
  { icon: "🏷️", bg: "bg-green-50", title: "No-cost EMI", body: "₹167/mo on orders above ₹999" },
  { icon: "🎁", bg: "bg-amber-50", title: "Buy 2 Get 1", body: "Free on all 60-cap packs" },
  { icon: "🚚", bg: "bg-blue-50", title: "Free Delivery", body: "On orders above ₹499" },
  { icon: "📦", bg: "bg-red-50", title: "Combo Offer", body: "Buy 3 packs, get 12% off" },
];

const HIGHLIGHTS = [
  { icon: "🌿", label: "18 Ayurvedic Herbs" },
  { icon: "⚡", label: "Boosts Immunity & Energy" },
  { icon: "🏆", label: "GMP Certified Facility" },
  { icon: "🛡️", label: "No Artificial Additives" },
];

const BENEFITS = [
  "Enhances physical stamina and reduces fatigue",
  "Supports healthy immune function",
  "Promotes restful sleep and reduces stress",
  "Aids digestion and gut health",
  "Rich in antioxidants for cellular protection",
];

const INGREDIENTS =
  "Ashwagandha, Shatavari, Brahmi, Cardamom, Cinnamon, Ginger, Turmeric, Black Pepper, Saffron, Nutmeg, Clove, Long Pepper, Mulethi, Vidarikand, Gokhuru, Safed Musli, Kaunch Beej, Shilajit Extract";

const REVIEWS = [
  { name: "Amit S.", initial: "A", rating: 5, date: "12 Jan 2025", text: "Absolutely love this product. Noticed a huge difference in my energy levels within 2 weeks!", verified: true },
  { name: "Priya V.", initial: "P", rating: 4, date: "3 Feb 2025", text: "Great taste and quality. My whole family drinks it every morning. Will definitely reorder.", verified: true },
  { name: "Rahul M.", initial: "R", rating: 5, date: "20 Feb 2025", text: "Best milk masala I've ever tried. The Ayurvedic ingredients really do make a difference.", verified: true },
];

const RATING_BARS = [
  { star: 5, pct: 72 },
  { star: 4, pct: 18 },
  { star: 3, pct: 6 },
  { star: 2, pct: 2 },
  { star: 1, pct: 2 },
];



/**
 * Given base finalPrice + price from the API, generate 3 pack options
 * (30 / 60 / 90 units) with proportional pricing.
 */
const buildPacks = (finalPrice, origPrice) => {
  const fp = parseFloat(finalPrice);
  const op = parseFloat(origPrice);
  return [
    {
      qty: 30,
      price: Math.round(fp * 0.75),
      orig: Math.round(op * 0.75),
      perUnit: (fp * 0.75) / 30,
      tag: null,
    },
    {
      qty: 60,
      price: Math.round(fp * 1.35),
      orig: Math.round(op * 1.35),
      perUnit: (fp * 1.35) / 60,
      tag: "Best Value",
    },
    {
      qty: 90,
      price: Math.round(fp * 1.9),
      orig: Math.round(op * 1.9),
      perUnit: (fp * 1.9) / 90,
      tag: "Most Popular",
    },
  ];
};

// ─── Tag → badge color map ────────────────────────────────────────────────────
const TAG_COLORS = {
  "fatigue support":   "bg-purple-50 text-purple-900 border-purple-300",
  "active lifestyle":  "bg-blue-50 text-blue-900 border-blue-300",
  "stamina booster":   "bg-amber-50 text-amber-900 border-amber-300",
  "immunity support":  "bg-green-50 text-green-900 border-green-300",
  default:             "bg-stone-50 text-stone-900 border-stone-300",
};

// ─── Sub-components ───────────────────────────────────────────────────────────

const StarRow = ({ rating, size = "text-sm" }) => (
  <div className="flex gap-0.5">
    {[1, 2, 3, 4, 5].map((i) => (
      <span
        key={i}
        className={`${size} leading-none ${i <= Math.round(rating) ? "text-amber-400" : "text-stone-300"}`}
      >
        ★
      </span>
    ))}
  </div>
);

const Pill = ({ children, className = "" }) => (
  <span className={`inline-flex items-center gap-1 text-[12px] font-semibold px-3 py-1 rounded-full border ${className}`}>
    {children}
  </span>
);

const Accordion = ({ title, children, defaultOpen = false }) => {
  const [open, setOpen] = useState(defaultOpen);
  return (
    <div className="border-b border-stone-200">
      <button
        onClick={() => setOpen((o) => !o)}
        className="w-full flex items-center justify-between py-4 text-left text-[15px] font-bold text-black hover:text-red-900 transition-colors"
      >
        {title}
        <span className={`text-black/50 text-sm transition-transform duration-200 flex-shrink-0 ml-4 ${open ? "rotate-180" : ""}`}>
          ▾
        </span>
      </button>
      <div className={`overflow-hidden transition-all duration-300 ease-in-out ${open ? "max-h-[500px]" : "max-h-0"}`}>
        <div className="pb-5 text-[14px] font-medium text-black leading-relaxed">{children}</div>
      </div>
    </div>
  );
};

// ─── Main Component ───────────────────────────────────────────────────────────

export default function SingleProduct() {
  const [activeImg, setActiveImg] = useState(0);
  const [imgFade, setImgFade] = useState(false);
  const [packIdx, setPackIdx] = useState(1);
  const [qty, setQty] = useState(1);
  const [wishlisted, setWishlisted] = useState(false);
  const [activeTab, setActiveTab] = useState("description");
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);

  const productId = useParams().id;

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const res = await axiosInstance.get(`/product/getProductById/${productId}`);
        setProduct(res?.data?.data);
      } catch (error) {
        console.error("Failed to fetch product:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, [productId]);

  // ── Derived values from API data ──────────────────────────────────────────
const IMAGES = product?.productImages || [];
    console.log('IMAGES',IMAGES)
  const PACKS = product
    ? buildPacks(product.finalPrice, product.price)
    : [];

  const pack = PACKS[packIdx] ?? {};
  const discPct = pack.orig ? Math.round(((pack.orig - pack.price) / pack.orig) * 100) : 0;
  const saving = pack.orig ? pack.orig - pack.price : 0;
  const total = pack.price ? (pack.price * qty).toLocaleString("en-IN") : "0";
  const ingredientList = INGREDIENTS.split(", ");

  const productTags = product?.productTags ?? [];
  const offerTags   = product?.offerTags ?? [];

  const swapImg = (i) => {
    setImgFade(true);
    setTimeout(() => {
      setActiveImg(i);
      setImgFade(false);
    }, 200);
  };

  // ── Loading skeleton ──────────────────────────────────────────────────────
  if (loading) {
    return (
      <div className="min-h-screen bg-[#FDFAF6] flex items-center justify-center">
        <div className="flex flex-col items-center gap-4">
          <div className="w-12 h-12 rounded-full border-4 border-red-900 border-t-transparent animate-spin" />
          <p className="text-[14px] font-semibold text-black/50">Loading product…</p>
        </div>
      </div>
    );
  }

  if (!product) {
    return (
      <div className="min-h-screen bg-[#FDFAF6] flex items-center justify-center">
        <p className="text-[16px] font-semibold text-black/50">Product not found.</p>
      </div>
    );
  }

  return (
    <>
      <style>{`
        :root { --red:#03349a; --amber:#c9643a; --cream:#fdf8f4; }
        @keyframes shim{0%{background-position:200% center}100%{background-position:-200% center}}
        .shim-btn{background:linear-gradient(90deg,var(--red),var(--amber),#c2410c,var(--red));background-size:200% auto;animation:shim 3s linear infinite;}
      `}</style>

      <div className="min-h-screen bg-[#FDFAF6] text-black">

        {/* ── Breadcrumb ── */}
        <nav className="bg-white border-b border-stone-200 px-4 sm:px-6 lg:px-10 py-3 flex items-center flex-wrap gap-1.5 text-[13px] font-semibold text-black">
          {["Home", "Wellness", product.forWhom ?? "Products"].map((c) => (
            <span key={c} className="flex items-center gap-1.5">
              <a href="#" className="text-black/50 hover:text-red-900 transition-colors font-medium">{c}</a>
              <span className="text-black/30">›</span>
            </span>
          ))}
          <span className="font-bold text-red-900">{product.productName}</span>
        </nav>

        {/* ── Main 2-col grid ── */}
        <div className="max-w-[1280px] mx-auto px-4 sm:px-6 lg:px-10 pt-8 pb-4">
          <div className="grid grid-cols-1 lg:grid-cols-[500px_1fr] gap-8 lg:gap-14 items-start">

            {/* ════ LEFT — Gallery ════ */}
            <div className="lg:sticky lg:top-6 flex flex-col gap-5">
              <div className="flex gap-3 items-start">

                {/* Vertical thumbnails — desktop */}
                <div className="hidden sm:flex flex-col gap-2.5 flex-shrink-0 max-h-[400px] overflow-y-auto pr-1">
                  {IMAGES.map((src, i) => (
                    <button
                      key={i}
                      onClick={() => swapImg(i)}
                      className={`w-[76px] h-[76px] rounded-xl overflow-hidden border-2 flex-shrink-0 transition-all duration-150
                        ${activeImg === i
                          ? "border-red-900 shadow-[0_0_0_3px_rgba(124,29,29,0.15)]"
                          : "border-stone-200 bg-white hover:border-red-400"
                        }`}
                    >
                      <img src={src?.url} alt={`view ${i + 1}`} className="w-full h-full object-cover" />
                    </button>
                  ))}
                </div>

                {/* Main image */}
                <div className="flex-1 relative rounded-2xl overflow-hidden aspect-square bg-[#faf7f3] border border-stone-200">
                  {IMAGES.length > 0 ? (
                    <img
                     src={IMAGES[activeImg]?.url}
                      alt={product.productName}
                      className={`w-full h-full object-cover transition-opacity duration-200 ${imgFade ? "opacity-0" : "opacity-100"}`}
                    />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center text-black/20 text-[14px] font-semibold">
                      No image available
                    </div>
                  )}
                  {/* Discount badge */}
                  {discPct > 0 && (
                    <div className="absolute top-3.5 left-3.5 bg-red-900 text-white text-[11px] font-bold px-3 py-1 rounded-full tracking-wide">
                      {discPct}% OFF
                    </div>
                  )}
                  {/* Offer tag badge (e.g. "50% Off") */}
                  {offerTags.length > 0 && (
                    <div className="absolute top-3.5 right-3.5 bg-amber-500 text-white text-[11px] font-bold px-3 py-1 rounded-full tracking-wide">
                      {offerTags[0]}
                    </div>
                  )}
                  {/* Stock chip */}
                  <div className="absolute bottom-3.5 left-3.5 bg-white border border-stone-200 rounded-full px-3 py-1.5 text-[11px] font-bold text-orange-700 flex items-center gap-1.5">
                    <span className="w-2 h-2 rounded-full bg-orange-400 flex-shrink-0" />
                    Only 14 left in stock
                  </div>
                </div>
              </div>

              {/* Mobile thumbnails — horizontal */}
              <div className="flex sm:hidden gap-2 overflow-x-auto pb-1">
                {IMAGES.map((src, i) => (
                  <button
                    key={i}
                    onClick={() => swapImg(i)}
                    className={`w-16 h-16 rounded-xl overflow-hidden border-2 flex-shrink-0 transition-all duration-150
                      ${activeImg === i
                        ? "border-red-900 shadow-[0_0_0_2px_rgba(124,29,29,0.12)]"
                        : "border-stone-200 hover:border-red-400"
                      }`}
                  >
                    <img src={src?.url} alt={`view ${i + 1}`} className="w-full h-full object-cover" />
                  </button>
                ))}
              </div>

              {/* Offers strip */}
              <div className="bg-gray-100 rounded-lg p-4">
                <p className="text-md font-bold text-black uppercase tracking-widest mb-2.5">Available Offers</p>
                <div className="flex gap-2.5 overflow-x-auto pb-1">
                  {OFFERS.map(({ icon, bg, title, body }) => (
                    <div
                      key={title}
                      className="min-w-[148px] flex-shrink-0 bg-white border border-stone-200 rounded-xl p-3 hover:border-stone-300 transition-colors"
                    >
                      <div className={`w-10 h-10 ${bg} rounded-full flex items-center justify-center text-sm mb-2`}>{icon}</div>
                      <p className="text-[15px] font-bold text-black mb-0.5">{title}</p>
                      <p className="text-[13px] font-medium text-black/60 leading-snug">{body}</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* ════ RIGHT — Info ════ */}
            <div className="flex flex-col">

              {/* ── Product tag badges (from API) ── */}
              {productTags.length > 0 && (
                <div className="flex flex-wrap gap-2 mb-4">
                  {productTags.map((tag) => (
                    <Pill key={tag} className={TAG_COLORS[tag] ?? TAG_COLORS.default}>
                      ✓ {tag.charAt(0).toUpperCase() + tag.slice(1)}
                    </Pill>
                  ))}
                </div>
              )}

              {/* ── Product Name (API) ── */}
              <h1 className="text-[30px] sm:text-[36px] lg:text-[40px] font-bold leading-tight text-black mb-2">
                {product.productName}
              </h1>

              {/* ── forWhom + withWhom subtitle (API) ── */}
              <p className="text-[15px] font-semibold text-black mb-1">
                {product.forWhom}
              </p>
              {product.withWhom && (
                <p className="text-[13px] font-semibold text-black/50 mb-4">
                  Key ingredients: {product.withWhom}
                </p>
              )}

              {/* Ratings (static — no API data) */}
              <div className="flex items-center flex-wrap gap-3 mb-5">
                <span className="text-[17px] font-bold text-black">4.7</span>
                <StarRow rating={4.7} size="text-base" />
                <span className="text-[13px] font-semibold text-black/50">1,248 reviews</span>
                <button
                  onClick={() => setActiveTab("reviews")}
                  className="text-[13px] font-bold text-red-900 underline underline-offset-2 hover:text-red-700 transition-colors"
                >
                  Read all
                </button>
              </div>

              <div className="h-px bg-stone-200 mb-5" />

              {/* ── Price (API: finalPrice = selling, price = original MRP) ── */}
              <div className="flex items-baseline flex-wrap gap-3 mb-2">
                <span className="text-[44px] sm:text-[50px] font-bold text-red-900 leading-none">
                  ₹{pack.price?.toLocaleString("en-IN") ?? parseFloat(product.finalPrice).toLocaleString("en-IN")}
                </span>
                <span className="text-[17px] font-semibold text-black/40 line-through">
                  ₹{pack.orig?.toLocaleString("en-IN") ?? parseFloat(product.price).toLocaleString("en-IN")}
                </span>
                {saving > 0 && (
                  <Pill className="bg-green-50 text-green-900 border-green-300">
                    Save ₹{saving.toLocaleString("en-IN")}
                  </Pill>
                )}
              </div>
              <p className="text-[13px] font-semibold text-black/50 mb-6">
                Inclusive of all taxes · Free delivery above ₹499
              </p>

              {/* ── Pack Selector ── */}
              <div className="mb-6">
                <p className="text-[12px] font-bold text-black uppercase tracking-widest mb-3">Choose Pack Size</p>
                <div className="grid grid-cols-3 gap-3">
                  {PACKS.map((p, i) => {
                    const pct = Math.round(((p.orig - p.price) / p.orig) * 100);
                    const sel = packIdx === i;
                    return (
                      <button
                        key={i}
                        onClick={() => setPackIdx(i)}
                        className={`relative pt-5 pb-3.5 px-2 rounded-2xl border-2 text-center transition-all duration-150
                          ${sel
                            ? "border-red-900 bg-red-50/40 shadow-[0_0_0_3px_rgba(124,29,29,0.10)]"
                            : "border-stone-200 bg-white hover:border-red-400"
                          }`}
                      >
                        {p.tag && (
                          <span className={`absolute -top-3 left-1/2 -translate-x-1/2 text-[10px] font-bold px-2.5 py-0.5 rounded-full text-white whitespace-nowrap
                            ${p.tag === "Most Popular" ? "bg-amber-500" : "bg-red-900"}`}>
                            {p.tag === "Best Value" ? "★ " : ""}{p.tag}
                          </span>
                        )}
                        <p className={`text-[28px] font-bold leading-none mb-1 ${sel ? "text-red-900" : "text-black"}`}>
                          {p.qty}
                        </p>
                        <p className="text-[11px] font-semibold text-black/50 mb-2">capsules</p>
                        <p className="text-[16px] font-bold text-black">₹{p.price.toLocaleString("en-IN")}</p>
                        <p className="text-[11px] font-semibold text-black/40 line-through">₹{p.orig.toLocaleString("en-IN")}</p>
                        <span className="inline-block mt-1.5 text-[10px] font-bold px-2 py-0.5 rounded-full bg-green-50 text-green-800 border border-green-200">
                          {pct}% off
                        </span>
                        <p className="text-[10px] font-semibold text-black/40 mt-1">
                          ₹{p.perUnit.toFixed(1)}/cap
                        </p>
                      </button>
                    );
                  })}
                </div>
              </div>

              <div className="h-px bg-stone-200 mb-5" />

              {/* ── Qty + Add to Cart ── */}
              <div className="flex gap-3 items-stretch mb-3">
                <div className="flex items-center border-2 border-stone-200 rounded-xl overflow-hidden bg-white flex-shrink-0">
                  <button
                    onClick={() => setQty((q) => Math.max(1, q - 1))}
                    className="w-12 h-14 flex items-center justify-center text-black hover:bg-red-50 hover:text-red-900 transition-colors text-2xl font-light"
                  >−</button>
                  <span className="w-12 h-14 flex items-center justify-center text-[16px] font-bold text-black border-x-2 border-stone-200">
                    {qty}
                  </span>
                  <button
                    onClick={() => setQty((q) => q + 1)}
                    className="w-12 h-14 flex items-center justify-center text-black hover:bg-red-50 hover:text-red-900 transition-colors text-2xl font-light"
                  >+</button>
                </div>

                <button
                  type="button"
                  className="flex shim-btn items-center justify-center gap-2 w-full text-white text-sm font-semibold uppercase tracking-wide px-6 py-3 rounded-xl transition-all duration-300 hover:-translate-y-0.5 active:translate-y-0"
                  style={{ boxShadow: "0 10px 24px rgba(130,12,12,.35)" }}
                >
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
                    <circle cx="9" cy="21" r="1" /><circle cx="20" cy="21" r="1" />
                    <path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6" />
                  </svg>
                  <span>Add to Cart</span>
                </button>
              </div>

              {/* ── Buy Now ── */}
              <button className="w-full h-14 mb-4 border-2 border-red-900 rounded-xl text-red-900 text-[13px] font-bold tracking-widest uppercase hover:bg-red-900 hover:text-white transition-all duration-200">
                Buy Now — ₹{total}
              </button>

              {/* ── Wishlist + Share ── */}
              <div className="flex gap-2.5 items-center flex-wrap mb-5">
                <button
                  onClick={() => setWishlisted((w) => !w)}
                  className={`flex items-center gap-2 px-4 py-2.5 rounded-xl border-2 text-[13px] font-bold transition-all
                    ${wishlisted
                      ? "border-red-300 bg-red-50 text-red-600"
                      : "border-stone-200 bg-white text-black hover:border-red-900 hover:text-red-900"
                    }`}
                >
                  <svg className="w-4 h-4" fill={wishlisted ? "currentColor" : "none"} stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
                    <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" />
                  </svg>
                  {wishlisted ? "Wishlisted" : "Wishlist"}
                </button>
                <button className="flex items-center gap-2 px-4 py-2.5 rounded-xl border-2 border-stone-200 bg-white text-black text-[13px] font-bold hover:border-red-900 hover:text-red-900 transition-all">
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
                    <circle cx="18" cy="5" r="3" /><circle cx="6" cy="12" r="3" /><circle cx="18" cy="19" r="3" />
                    <line x1="8.59" y1="13.51" x2="15.42" y2="17.49" />
                    <line x1="15.41" y1="6.51" x2="8.59" y2="10.49" />
                  </svg>
                  Share
                </button>
                <span className="ml-auto text-[12px] font-semibold text-black/40">
                  SKU: {product.id?.slice(0, 8).toUpperCase()}
                </span>
              </div>

              {/* Highlights */}
              <div className="grid grid-cols-2 gap-2.5 mb-5">
                {HIGHLIGHTS.map(({ icon, label }) => (
                  <div key={label} className="flex items-center gap-2.5 px-4 py-3 rounded-xl border border-stone-200 bg-white text-[13px] font-bold text-black hover:border-stone-300 transition-colors">
                    <span className="text-base flex-shrink-0">{icon}</span>
                    {label}
                  </div>
                ))}
              </div>

              {/* Trust bar */}
              <div className="grid grid-cols-3 border-2 border-stone-200 rounded-2xl overflow-hidden bg-white">
                {[
                  { icon: "🚚", label: "Free Delivery", sub: "Orders above ₹499" },
                  { icon: "↩️", label: "60-Day Returns", sub: "No questions asked" },
                  { icon: "🔒", label: "Secure Payment", sub: "100% protected" },
                ].map(({ icon, label, sub }, i) => (
                  <div key={label} className={`flex flex-col items-center gap-1 py-4 px-2 text-center ${i < 2 ? "border-r-2 border-stone-200" : ""}`}>
                    <span className="text-2xl">{icon}</span>
                    <span className="text-[15px] font-bold text-black leading-tight">{label}</span>
                    <span className="text-[13px] font-semibold text-black">{sub}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* ── Bottom Tabs ── */}
        <div className="max-w-[1280px] mx-auto px-4 sm:px-6 lg:px-10 pt-12 pb-20">

          {/* Tab Nav */}
          <div className="flex border-b-2 border-stone-200 mb-8 overflow-x-auto">
            {["description", "ingredients", "reviews"].map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`px-6 py-4 text-[16px] font-bold whitespace-nowrap border-b-[3px] -mb-0.5 transition-colors
                  ${activeTab === tab ? "border-red-900 text-red-900" : "border-transparent text-black hover:text-black"}`}
              >
                {tab.charAt(0).toUpperCase() + tab.slice(1)}
                {tab === "reviews" && " (3)"}
              </button>
            ))}
          </div>

          {/* ── Description Tab ── */}
          {activeTab === "description" && (
            <div className="max-w-2xl">
              {/* ── Product description from API ── */}
              <p className="text-[18px] font-medium text-black leading-relaxed mb-6">
                {product.productDescription}
              </p>
              <Accordion title="Key Benefits" defaultOpen>
                <ul className="space-y-3 text-lg">
                  {BENEFITS.map((b) => (
                    <li key={b} className="flex gap-3 items-start">
                      <span className="w-5 h-5 rounded-full bg-red-900 flex items-center justify-center flex-shrink-0 mt-0.5 text-[9px] text-white font-bold">✓</span>
                      <span>{b}</span>
                    </li>
                  ))}
                </ul>
              </Accordion>
              <Accordion title="How to Use">
                <p className="text-lg">
                  Mix 1–2 teaspoons in 200 ml warm milk. Stir well and consume once or twice daily. Best taken
                  in the morning or before bedtime for optimal results.
                </p>
              </Accordion>
              <Accordion title="Storage Instructions">
                <p className="text-lg">
                  Store in a cool, dry place away from direct sunlight. Keep the lid tightly closed. Best
                  consumed within 12 months of manufacture date.
                </p>
              </Accordion>
              <Accordion title="Shipping & Returns">
                <p className="text-lg">
                  Free shipping on orders above ₹499. Orders dispatched within 24 hours. Return within 60 days
                  for a full refund — no questions asked.
                </p>
              </Accordion>
            </div>
          )}

          {/* ── Ingredients Tab ── */}
          {activeTab === "ingredients" && (
            <div className="max-w-2xl">
              <h3 className="text-[22px] font-bold text-black mb-3">Full Ingredient List</h3>
              <p className="text-[15px] font-medium text-black leading-relaxed mb-4">{INGREDIENTS}.</p>
              <div className="flex flex-wrap gap-2 mb-6">
                {ingredientList.map((ing) => (
                  <span key={ing} className="text-[12px] font-bold px-3.5 py-1.5 rounded-full bg-amber-50 text-amber-900 border border-amber-300">
                    {ing}
                  </span>
                ))}
              </div>
              <div className="rounded-2xl p-5 bg-red-50 border border-red-200">
                <p className="text-[13px] font-bold text-red-900 mb-1.5">⚠ Allergen Notice</p>
                <p className="text-[14px] font-medium text-black leading-relaxed">
                  May contain traces of nuts. Consult a healthcare professional if pregnant, nursing, or on medication.
                </p>
              </div>
            </div>
          )}

          {/* ── Reviews Tab ── */}
          {activeTab === "reviews" && (
            <div>
              <div className="flex flex-wrap gap-6 bg-white border-2 border-stone-200 rounded-2xl p-6 mb-6 max-w-2xl">
                <div className="text-center min-w-[80px]">
                  <p className="text-[54px] font-bold text-red-900 leading-none">4.7</p>
                  <StarRow rating={4.7} size="text-lg" />
                  <p className="text-[13px] font-semibold text-black/50 mt-2">1,248 reviews</p>
                </div>
                <div className="flex-1 min-w-[140px] flex flex-col gap-2.5">
                  {RATING_BARS.map(({ star, pct }) => (
                    <div key={star} className="flex items-center gap-2.5">
                      <span className="text-[13px] font-bold text-black w-3">{star}</span>
                      <span className="text-sm text-amber-400">★</span>
                      <div className="flex-1 h-2 bg-stone-100 rounded-full overflow-hidden">
                        <div className="h-full bg-red-900 rounded-full" style={{ width: `${pct}%` }} />
                      </div>
                      <span className="text-[12px] font-bold text-black w-7 text-right">{pct}%</span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="max-w-2xl space-y-4">
                {REVIEWS.map((r, i) => (
                  <div key={i} className="bg-white border-2 border-stone-200 rounded-2xl p-5">
                    <div className="flex items-start gap-4 mb-3">
                      <div className="w-11 h-11 rounded-full bg-red-900 text-white flex items-center justify-center text-[16px] font-bold flex-shrink-0">
                        {r.initial}
                      </div>
                      <div className="flex-1">
                        <div className="flex items-center flex-wrap gap-2 mb-1.5">
                          <span className="text-[15px] font-bold text-black">{r.name}</span>
                          {r.verified && (
                            <span className="text-[10px] font-bold px-2.5 py-0.5 rounded-full bg-green-50 text-green-800 border border-green-200">
                              ✓ Verified Purchase
                            </span>
                          )}
                        </div>
                        <div className="flex items-center gap-2.5">
                          <StarRow rating={r.rating} size="text-sm" />
                          <span className="text-[12px] font-semibold text-black/40">{r.date}</span>
                        </div>
                      </div>
                    </div>
                    <p className="text-[14px] font-medium text-black leading-relaxed">{r.text}</p>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </>
  );
}