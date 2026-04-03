import { useState, useEffect } from "react";
import img1 from '../../assets/images/produt/1.png'
import img2 from '../../assets/images/produt/2.jpg'
import img3 from '../../assets/images/produt/3.jpg'
import img4 from '../../assets/images/produt/4.jpg'
import img5 from '../../assets/images/produt/5.jpg'
// ─── Static Data ──────────────────────────────────────────────────────────────
const PACKS = [
  { qty: 30, price: 299, orig: 599, perUnit: 9.97, tag: null },
  { qty: 60, price: 549, orig: 999, perUnit: 9.15, tag: "Best Value" },
  { qty: 90, price: 899, orig: 1799, perUnit: 9.99, tag: "Most Popular" },
];

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

const IMAGES = [
img1,img2,img3,img4,img5
];

const RATING_BARS = [
  { star: 5, pct: 72 },
  { star: 4, pct: 18 },
  { star: 3, pct: 6 },
  { star: 2, pct: 2 },
  { star: 1, pct: 2 },
];

// ─── Sub-components ───────────────────────────────────────────────────────────

const StarRow = ({ rating, size = "text-xs" }) => (
  <div className="flex gap-0.5">
    {[1, 2, 3, 4, 5].map((i) => (
      <span key={i} className={`${size} ${i <= Math.round(rating) ? "text-amber-400" : "text-gray-300"}`}>★</span>
    ))}
  </div>
);

const Pill = ({ children, className = "" }) => (
  <span className={`inline-flex items-center gap-1 text-[10px] font-semibold px-2.5 py-0.5 rounded-full border ${className}`}>
    {children}
  </span>
);

const Accordion = ({ title, children, defaultOpen = false }) => {
  const [open, setOpen] = useState(defaultOpen);
  return (
    <div className="border-b border-stone-200">
      <button
        onClick={() => setOpen((o) => !o)}
        className="w-full flex items-center justify-between py-3.5 text-left text-sm font-semibold text-stone-800 hover:text-red-900 transition-colors"
      >
        {title}
        <span className={`text-black text-xs transition-transform duration-200 ${open ? "rotate-180" : ""}`}>▾</span>
      </button>
      <div className={`overflow-hidden transition-all duration-300 ${open ? "max-h-96" : "max-h-0"}`}>
        <div className="pb-3.5 text-sm text-black leading-relaxed">{children}</div>
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
  const [cartAdded, setCartAdded] = useState(false);
  const [activeTab, setActiveTab] = useState("description");

  useEffect(() => { window.scrollTo(0, 0); }, []);

  const pack = PACKS[packIdx];
  const discPct = Math.round(((pack.orig - pack.price) / pack.orig) * 100);
  const saving = pack.orig - pack.price;
  const total = (pack.price * qty).toLocaleString("en-IN");

  const swapImg = (i) => {
    setImgFade(true);
    setTimeout(() => { setActiveImg(i); setImgFade(false); }, 200);
  };

  const addToCart = () => {
    setCartAdded(true);
    setTimeout(() => setCartAdded(false), 2200);
  };

  const ingredientList = INGREDIENTS.split(", ");

  return (
    <div className=" bg-[#FDFAF6] text-stone-900">

      {/* Breadcrumb */}
      <nav className="bg-white border-b border-stone-200 px-4 sm:px-6 py-2.5 flex items-center flex-wrap gap-1.5 text-[11px] text-black">
        {["Home", "Wellness", "Milk Masala"].map((c) => (
          <span key={c} className="flex items-center gap-1.5">
            <a href="#" className="hover:text-red-900 transition-colors">{c}</a>
            <span>›</span>
          </span>
        ))}
        <span className="font-semibold text-red-900">Vitality Power Plus</span>
      </nav>

      {/* ── Main 2-col grid ── */}
      <div className="max-w-[1200px] mx-auto px-4 sm:px-5 pt-6 pb-0 grid grid-cols-1 lg:grid-cols-[380px_1fr] gap-6 lg:gap-9 items-start">

        {/* ══ LEFT — Gallery Card ══ */}
        <div className="lg:sticky lg:top-4">
          <div className="bg-white border border-stone-200 rounded-2xl overflow-hidden">

            {/* Main Image */}
            <div className="relative w-full aspect-square overflow-hidden bg-[#faf7f3]">
              <img
                src={IMAGES[activeImg]}
                alt="product"
                className={`w-full h-full object-cover transition-opacity duration-200 ${imgFade ? "opacity-0" : "opacity-100"}`}
              />
              {/* Discount badge */}
              <div className="absolute top-2.5 left-2.5 bg-red-900 text-white text-[10px] font-bold px-2.5 py-1 rounded-full tracking-wide">
                {discPct}% OFF
              </div>
              {/* Stock chip */}
              <div className="absolute bottom-2.5 left-2.5 bg-white/95 border border-stone-200 rounded-full px-3 py-1 text-[10.5px] font-semibold text-orange-600 flex items-center gap-1.5">
                <span className="w-1.5 h-1.5 rounded-full bg-orange-400 inline-block" />
                Only 14 left in stock
              </div>
            </div>

            {/* Thumbnails */}
            <div className="flex gap-1.5 px-3 py-2.5 border-t border-stone-100 overflow-x-auto scrollbar-hide">
              {IMAGES.map((src, i) => (
                <button
                  key={i}
                  onClick={() => swapImg(i)}
                  className={`w-12 h-12 flex-shrink-0 rounded-lg overflow-hidden border-2 transition-all duration-150
                    ${activeImg === i
                      ? "border-red-900 shadow-[0_0_0_2px_rgba(124,29,29,0.12)]"
                      : "border-transparent hover:border-red-400"
                    }`}
                >
                  <img src={src} alt={`view ${i + 1}`} className="w-full h-full object-cover" />
                </button>
              ))}
            </div>

            {/* Offers */}
            <div className="px-3 pb-3 border-t border-stone-100">
              <p className="text-[10px] font-semibold text-black uppercase tracking-widest mt-2.5 mb-2">
                Available Offers
              </p>
              <div className="flex gap-2 overflow-x-auto scrollbar-hide pb-1">
                {OFFERS.map(({ icon, bg, title, body }) => (
                  <div key={title} className="min-w-[138px] flex-shrink-0 border border-stone-200 rounded-xl p-2.5 hover:border-stone-300 transition-colors">
                    <div className={`w-6 h-6 ${bg} rounded-full flex items-center justify-center text-xs mb-1.5`}>
                      {icon}
                    </div>
                    <p className="text-[11px] font-semibold text-stone-800 mb-0.5">{title}</p>
                    <p className="text-[10.5px] text-black leading-snug">{body}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* ══ RIGHT — Info ══ */}
        <div className="flex flex-col gap-0">

          {/* Badges */}
          <div className="flex flex-wrap gap-1.5 mb-3">
            <Pill className="bg-green-50 text-green-800 border-green-200">✓ 100% Natural</Pill>
            <Pill className="bg-blue-50 text-blue-800 border-blue-200">✓ GMP Certified</Pill>
            <Pill className="bg-amber-50 text-amber-800 border-amber-200">✓ No Preservatives</Pill>
          </div>

          {/* Name */}
          <h1 className="font-serif text-[26px] sm:text-[30px] font-bold leading-tight text-stone-900 mb-1">
            Vitality Powe Plus
          </h1>
          <p className="text-md text-black mb-3">
            Premium Ayurvedic Wellness Blend · 18 Herbs &amp; Spices
          </p>

          {/* Ratings */}
          <div className="flex items-center flex-wrap gap-2 mb-4">
            <span className="text-sm font-bold">4.7</span>
            <StarRow rating={4.7} size="text-sm" />
            <span className="text-xs text-stone-900">1,248 reviews</span>
            <button
              onClick={() => setActiveTab("reviews")}
              className="text-[11px] text-red-900 underline underline-offset-2 hover:text-red-700 transition-colors"
            >
              Read all
            </button>
          </div>

          <div className="h-px bg-stone-200 mb-4" />

          {/* Price */}
          <div className="flex items-baseline flex-wrap gap-2 mb-1">
            <span className="font-serif text-[32px] font-bold text-red-900 leading-none">
              ₹{pack.price}
            </span>
            <span className="text-sm text-black line-through">₹{pack.orig}</span>
            <Pill className="bg-green-50 text-green-800 border-green-200">Save ₹{saving}</Pill>
          </div>
          <p className="text-[15px] text-black mb-5">
            Inclusive of all taxes · Free delivery above ₹499
          </p>

          {/* Pack Selector */}
          <div className="mb-5">
            <p className="text-[15px] font-semibold text-black uppercase tracking-widest mb-2">
              Choose Pack Size
            </p>
            <div className="grid grid-cols-3 gap-2">
              {PACKS.map((p, i) => {
                const pct = Math.round(((p.orig - p.price) / p.orig) * 100);
                const sel = packIdx === i;
                return (
                  <button
                    key={i}
                    onClick={() => setPackIdx(i)}
                    className={`relative pt-4 pb-2.5 px-2 rounded-xl border-2 text-center transition-all duration-150
                      ${sel
                        ? "border-red-900 bg-red-50/30 shadow-[0_0_0_2px_rgba(124,29,29,0.08)]"
                        : "border-stone-200 bg-white hover:border-red-400"
                      }`}
                  >
                    {p.tag && (
                      <span className={`absolute -top-2.5 left-1/2 -translate-x-1/2 text-[9px] font-bold px-2 py-0.5 rounded-full text-white whitespace-nowrap
                        ${p.tag === "Most Popular" ? "bg-amber-500" : "bg-red-900"}`}>
                        {p.tag === "Best Value" ? "★ " : ""}{p.tag}
                      </span>
                    )}
                    <p className={`font-serif text-[22px] font-bold leading-none mb-0.5 ${sel ? "text-red-900" : "text-stone-800"}`}>
                      {p.qty}
                    </p>
                    <p className="text-[10px] text-black mb-1.5">capsules</p>
                    <p className="text-[13.5px] font-semibold text-stone-800">₹{p.price}</p>
                    <p className="text-[10.5px] text-black line-through">₹{p.orig}</p>
                    <span className="inline-block mt-1 text-[9px] font-semibold px-1.5 py-0.5 rounded-full bg-green-50 text-green-700 border border-green-200">
                      {pct}% off
                    </span>
                    <p className="text-[9.5px] text-black mt-0.5">₹{p.perUnit.toFixed(1)}/cap</p>
                  </button>
                );
              })}
            </div>
          </div>

          <div className="h-px bg-stone-200 mb-4" />

          {/* Qty + Add to Cart */}
          <div className="flex gap-2 items-stretch mb-2">
            {/* Qty control */}
            <div className="flex items-center border-[1.5px] border-stone-200 rounded-xl overflow-hidden bg-white flex-shrink-0">
              <button
                onClick={() => setQty((q) => Math.max(1, q - 1))}
                className="w-9 h-12 flex items-center justify-center text-black hover:bg-red-50 hover:text-red-900 transition-colors text-lg font-light"
              >
                −
              </button>
              <span className="w-9 h-12 flex items-center justify-center text-sm font-semibold border-x border-stone-200">
                {qty}
              </span>
              <button
                onClick={() => setQty((q) => q + 1)}
                className="w-9 h-12 flex items-center justify-center text-black hover:bg-red-50 hover:text-red-900 transition-colors text-lg font-light"
              >
                +
              </button>
            </div>

            {/* Add to Cart */}
            <button
              onClick={addToCart}
              className={`flex-1 h-12 rounded-xl text-white text-[15px] font-semibold tracking-widest uppercase transition-all duration-200 flex items-center justify-center gap-2 active:scale-[0.98]
                ${cartAdded ? "bg-green-700" : "bg-red-900 hover:bg-red-950"}`}
            >
              {cartAdded ? (
                <>
                  <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" strokeWidth={2.5} viewBox="0 0 24 24">
                    <polyline points="20 6 9 17 4 12" />
                  </svg>
                  Added to Cart
                </>
              ) : (
                <>
                  <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
                    <circle cx="9" cy="21" r="1" /><circle cx="20" cy="21" r="1" />
                    <path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6" />
                  </svg>
                  Add to Cart
                </>
              )}
            </button>
          </div>

          {/* Buy Now */}
          <button className="w-full h-12 mb-3 border-[1.5px] border-red-900 rounded-xl text-red-900 text-[15px] font-semibold tracking-widest uppercase hover:bg-red-900 hover:text-white transition-all duration-200">
            Buy Now — ₹{total}
          </button>

          {/* Wishlist + Share */}
          <div className="flex gap-2 items-center flex-wrap mb-4">
            <button
              onClick={() => setWishlisted((w) => !w)}
              className={`flex items-center gap-1.5 px-3.5 py-2 rounded-lg border-[1.5px] text-[14px] font-medium transition-all
                ${wishlisted
                  ? "border-red-300 bg-red-50 text-red-500"
                  : "border-stone-200 bg-white text-black hover:border-red-900 hover:text-red-900"
                }`}
            >
              <svg className="w-3.5 h-3.5" fill={wishlisted ? "currentColor" : "none"} stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
                <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" />
              </svg>
              {wishlisted ? "Wishlisted" : "Wishlist"}
            </button>
            <button className="flex items-center gap-1.5 px-3.5 py-2 rounded-lg border-[1.5px] border-stone-200 bg-white text-black text-[14px] font-medium hover:border-red-900 hover:text-red-900 transition-all">
              <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
                <circle cx="18" cy="5" r="3" /><circle cx="6" cy="12" r="3" /><circle cx="18" cy="19" r="3" />
                <line x1="8.59" y1="13.51" x2="15.42" y2="17.49" /><line x1="15.41" y1="6.51" x2="8.59" y2="10.49" />
              </svg>
              Share
            </button>
            <span className="ml-auto text-[11px] text-black">
              SKU: QMM-{pack.qty}G
            </span>
          </div>

          {/* Highlights */}
          <div className="grid grid-cols-2 gap-1.5 mb-4">
            {HIGHLIGHTS.map(({ icon, label }) => (
              <div key={label} className="flex items-center gap-2 px-2.5 py-2 rounded-xl border border-stone-200 bg-white text-[13px] font-medium text-black hover:border-stone-300 transition-colors">
                <span className="text-sm flex-shrink-0">{icon}</span>
                {label}
              </div>
            ))}
          </div>

          {/* Trust bar */}
          <div className="grid grid-cols-3 border border-stone-200 rounded-xl overflow-hidden bg-white">
            {[
              { icon: "🚚", label: "Free Delivery", sub: "Above ₹499" },
              { icon: "↩️", label: "60-Day Returns", sub: "No questions" },
              { icon: "🔒", label: "Secure Payment", sub: "100% protected" },
            ].map(({ icon, label, sub }, i) => (
              <div key={label} className={`flex flex-col items-center gap-0.5 py-3 px-2 text-center ${i < 2 ? "border-r border-stone-200" : ""}`}>
                <span className="text-base">{icon}</span>
                <span className="text-[14px] font-semibold text-stone-800 leading-snug">{label}</span>
                <span className="text-[13px] text-black">{sub}</span>
              </div>
            ))}
          </div>

        </div>
      </div>

      {/* ── Bottom Tabs ── */}
      <div className="max-w-[1200px] mx-auto px-4 sm:px-5 pt-8 pb-16">
        {/* Tab Nav */}
        <div className="flex border-b border-stone-200 mb-6 overflow-x-auto">
          {["description", "ingredients", "reviews"].map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`px-5 py-3 text-[13px] font-medium whitespace-nowrap border-b-2 -mb-px transition-colors
                ${activeTab === tab
                  ? "border-red-900 text-red-900 font-semibold"
                  : "border-transparent text-black hover:text-stone-700"
                }`}
            >
              {tab.charAt(0).toUpperCase() + tab.slice(1)}
              {tab === "reviews" && " (3)"}
            </button>
          ))}
        </div>

        {/* ── Description Tab ── */}
        {activeTab === "description" && (
          <div className="max-w-2xl">
            <p className="text-md text-black leading-relaxed mb-5">
              Enriched with a carefully curated selection of traditional Ayurvedic herbs, Quista Active Milk Masala
              has been crafted to naturally enhance vitality — delivering the wisdom of ancient wellness in every sip.
            </p>
            <Accordion title="Key Benefits" defaultOpen>
              <ul className="space-y-2.5">
                {BENEFITS.map((b) => (
                  <li key={b} className="flex gap-2.5 items-start text-md">
                    <span className="w-4 h-4 rounded-full bg-red-50 flex items-center justify-center flex-shrink-0 mt-0.5 text-[8.5px] text-red-900 font-bold">✓</span>
                    {b}
                  </li>
                ))}
              </ul>
            </Accordion>
            <Accordion title="How to Use">
              <p>Mix 1–2 teaspoons in 200 ml warm milk. Stir well and consume once or twice daily. Best taken in the morning or before bedtime for optimal results.</p>
            </Accordion>
            <Accordion title="Storage Instructions">
              <p>Store in a cool, dry place away from direct sunlight. Keep the lid tightly closed. Best consumed within 12 months of manufacture date.</p>
            </Accordion>
            <Accordion title="Shipping & Returns">
              <p>Free shipping on orders above ₹499. Orders dispatched within 24 hours. Return within 60 days for a full refund — no questions asked.</p>
            </Accordion>
          </div>
        )}

        {/* ── Ingredients Tab ── */}
        {activeTab === "ingredients" && (
          <div className="max-w-2xl">
            <h3 className="font-serif text-base font-semibold mb-2 text-stone-800">Full Ingredient List</h3>
            <p className="text-md text-black leading-relaxed mb-3">{INGREDIENTS}.</p>
            <div className="flex flex-wrap gap-1.5 mb-6">
              {ingredientList.map((ing) => (
                <span key={ing} className="text-[14px] px-3 py-1 rounded-full bg-amber-50 text-amber-800 border border-amber-200 font-medium">
                  {ing}
                </span>
              ))}
            </div>
            <div className="rounded-xl p-3.5 bg-red-50 border border-red-100">
              <p className="text-[11.5px] font-bold text-red-900 mb-1">⚠ Allergen Notice</p>
              <p className="text-[12.5px] text-black leading-relaxed">
                May contain traces of nuts. Consult a healthcare professional if pregnant, nursing, or on medication.
              </p>
            </div>
          </div>
        )}

        {/* ── Reviews Tab ── */}
        {activeTab === "reviews" && (
          <div>
            {/* Rating Summary */}
            <div className="flex flex-wrap gap-5 bg-white border border-stone-200 rounded-2xl p-5 mb-5 max-w-2xl">
              <div className="text-center min-w-[72px]">
                <p className="font-serif text-[46px] font-bold text-red-900 leading-none">4.7</p>
                <StarRow rating={4.7} size="text-sm" />
                <p className="text-[11px] text-black mt-1.5">1,248 reviews</p>
              </div>
              <div className="flex-1 min-w-[130px] flex flex-col gap-1.5">
                {RATING_BARS.map(({ star, pct }) => (
                  <div key={star} className="flex items-center gap-2">
                    <span className="text-[11px] font-medium text-black w-2">{star}</span>
                    <span className="text-[11px] text-amber-400">★</span>
                    <div className="flex-1 h-1.5 bg-stone-100 rounded-full overflow-hidden">
                      <div
                        className="h-full bg-red-900 rounded-full transition-all duration-500"
                        style={{ width: `${pct}%` }}
                      />
                    </div>
                    <span className="text-[10.5px] text-black w-6 text-right">{pct}%</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Review Cards */}
            <div className="max-w-2xl space-y-3">
              {REVIEWS.map((r, i) => (
                <div key={i} className="bg-white border border-stone-200 rounded-2xl p-4">
                  <div className="flex items-start gap-3 mb-3">
                    <div className="w-9 h-9 rounded-full bg-red-900 text-white flex items-center justify-center text-sm font-bold font-serif flex-shrink-0">
                      {r.initial}
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center flex-wrap gap-2 mb-1">
                        <span className="text-[13px] font-semibold">{r.name}</span>
                        {r.verified && (
                          <span className="text-[9px] font-semibold px-2 py-0.5 rounded-full bg-green-50 text-green-700 border border-green-200">
                            ✓ Verified Purchase
                          </span>
                        )}
                      </div>
                      <div className="flex items-center gap-2">
                        <StarRow rating={r.rating} size="text-xs" />
                        <span className="text-[10.5px] text-black">{r.date}</span>
                      </div>
                    </div>
                  </div>
                  <p className="text-[12.5px] text-black leading-relaxed">{r.text}</p>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}