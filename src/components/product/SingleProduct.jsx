import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { axiosInstance } from "../../utils/axiosInstance";
import RelatedProduct from "../product/ReleatedProduct";
import ReviewSection from "../clientReview/ReviewSection";
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

const BENEFITS_LIST = [
  { key: "Energy & Stamina", val: "Ashwagandha and Shilajit work together to reduce fatigue and increase physical endurance — noticeable within 2–3 weeks of daily use." },
  { key: "Immune Support", val: "Turmeric, Ginger, and Long Pepper provide potent anti-inflammatory and immunomodulatory support." },
  { key: "Stress & Sleep", val: "Brahmi and Ashwagandha are clinically studied adaptogens that lower cortisol and improve sleep quality." },
  { key: "Digestion & Gut", val: "Cardamom, Mulethi, and Ginger aid in soothing the digestive tract and reducing bloating." },
  { key: "Antioxidant Protection", val: "Saffron and Clove are among the highest ORAC-rated herbs, fighting free radicals and promoting cellular longevity." },
  { key: "Hormonal Balance", val: "Shatavari and Kaunch Beej support healthy hormone levels in both men and women." },
  { key: "Bone & Joint Health", val: "Gokhuru and Vidarikand support joint flexibility, bone density, and reduce discomfort from physical exertion." },
];

const USAGE_LIST = [
  { key: "Dosage", val: "2 capsules per day (1 in the morning, 1 before bedtime)" },
  { key: "With", val: "Warm milk or water — milk enhances absorption of fat-soluble herbs" },
  { key: "Best time", val: "Morning dose: 30 min before breakfast · Evening dose: 30 min before bed" },
  { key: "Duration", val: "Minimum 30 days for noticeable results — 60–90 day cycles recommended" },
  { key: "Who can use", val: "Adults above 18 years. Suitable for men and women. Consult a physician if on medication." },
  { key: "Storage", val: "Store in a cool, dry place below 30°C away from direct sunlight. Keep lid tightly closed." },
  { key: "Shelf life", val: "24 months from date of manufacture" },
];

const BEFORE_ITEMS = [
  "Persistent fatigue & low energy",
  "Frequent colds and infections",
  "Poor, restless sleep",
  "Digestive discomfort & bloating",
  "Brain fog & poor concentration",
  "Low mood & high stress",
];

const AFTER_ITEMS = [
  "Sustained energy throughout the day",
  "Stronger immunity, fewer sick days",
  "Deep, restful sleep within 2 weeks",
  "Smoother digestion & less bloating",
  "Improved focus and mental clarity",
  "Calmer, more balanced mood",
];

const TIMELINE = [
  { week: "Week 1–2", text: "Better sleep quality, reduced stress response" },
  { week: "Week 3–4", text: "Noticeable energy increase, improved digestion" },
  { week: "Month 2–3", text: "Full immune and hormonal benefits established" },
];

const LEGAL_LIST = [
  { key: "Product type", val: "Ayurvedic Proprietary Medicine" },
  { key: "License no.", val: "AYU/2024/TN/00421" },
  { key: "FSSAI no.", val: "13424999001421" },
  { key: "Manufacturer", val: "Veda Naturals Pvt. Ltd., Coimbatore — 641 004, Tamil Nadu, India" },
  { key: "Country of origin", val: "India" },
  { key: "Net weight", val: "60 capsules × 500 mg = 30 g net (per 60-cap pack)" },
  { key: "MRP", val: "₹1,899.00 (inclusive of all taxes) per 60-cap pack" },
  { key: "Batch / Lot no.", val: "Printed on pack base" },
  { key: "Best before", val: "24 months from date of manufacture" },
  { key: "Legal metrology", val: "Complies with Legal Metrology (Packaged Commodities) Rules, 2011" },
  { key: "Regulatory status", val: "Licensed under the Drugs and Cosmetics Act, 1940" },
];

const OTHER_LIST = [
  { key: "Certifications", val: "GMP Certified · AYUSH Compliant · ISO 9001:2015 · Halal Certified" },
  { key: "Testing", val: "Third-party lab tested for heavy metals, pesticides, and microbial contamination" },
  { key: "Capsule type", val: "100% Vegetarian HPMC capsule — no gelatin" },
  { key: "Packaging", val: "Recyclable HDPE bottle with tamper-evident seal & silica gel desiccant" },
  { key: "Sustainability", val: "Sustainably sourced herbs — supports farmer cooperatives in Himachal Pradesh & Kerala" },
  { key: "Customer care", val: "support@vedanaturals.in · 1800-XXX-XXXX (Mon–Sat, 9 AM – 6 PM IST)" },
  { key: "Return policy", val: "60-day hassle-free returns. Refund in 5–7 business days." },
];

const WARNING_LIST = [
  { key: "Pregnancy / Nursing", val: "Consult your gynaecologist before use if pregnant or breastfeeding." },
  { key: "Drug interactions", val: "May interact with blood thinners, thyroid medication, or immunosuppressants. Disclose use to your physician." },
  { key: "Overdose", val: "Do not exceed the recommended dose. Excess Ashwagandha may cause drowsiness or mild gastric upset." },
  { key: "Allergies", val: "Discontinue immediately if you experience rash, itching, or swelling and consult a doctor." },
  { key: "Children", val: "Not recommended for children under 18 years without medical supervision." },
  { key: "Chronic conditions", val: "Consult a healthcare provider if you have diabetes, hypertension, or autoimmune disorders before starting." },
  { key: "Keep out of reach", val: "Store out of reach of children and pets." },
  { key: "Tamper evidence", val: "Do not use if seal is broken or bottle appears tampered." },
];

const ACCESSIBILITY_LIST = [
  { key: "Capsule size", val: "Size 00 capsule — easy to swallow. Available in powder form on request." },
  { key: "Vegetarian / Vegan", val: "100% vegetarian. Suitable for vegans — no animal-derived ingredients." },
  { key: "Gluten-free", val: "Yes — no wheat, barley, or rye derivatives used" },
  { key: "Dairy-free", val: "Yes — no milk solids, lactose, or casein" },
  { key: "Soy-free", val: "Yes" },
  { key: "Colour / dye free", val: "No artificial colours — natural herb pigments only" },
  { key: "Preservative free", val: "No synthetic preservatives or parabens" },
  { key: "Label language", val: "English, Hindi, Tamil — Braille label available on request" },
  { key: "Large print", val: "Large-print label insert available for visually impaired customers — email support@vedanaturals.in" },
  { key: "Easy-open cap", val: "Standard screw cap. Child-resistant cap option available on request." },
];

const REVIEWS = [
  { name: "Amit S.", initial: "A", rating: 5, date: "12 Jan 2025", text: "Absolutely love this product. Noticed a huge difference in my energy levels within 2 weeks! My sleep improved noticeably and the digestion has been great.", verified: true },
  { name: "Priya V.", initial: "P", rating: 4, date: "3 Feb 2025", text: "Great taste and quality. My whole family drinks it every morning. Will definitely reorder. The immunity boost is real — no one got sick this winter!", verified: true },
  { name: "Rahul M.", initial: "R", rating: 5, date: "20 Feb 2025", text: "Best Ayurvedic supplement I have ever tried. The difference in my stamina after the gym is night and day.", verified: true },
];

const RATING_BARS = [
  { star: 5, pct: 72 },
  { star: 4, pct: 18 },
  { star: 3, pct: 6 },
  { star: 2, pct: 2 },
  { star: 1, pct: 2 },
];

const INGREDIENTS_LIST = [
  { key: "Primary herbs", val: "Ashwagandha, Shatavari, Brahmi, Shilajit Extract, Safed Musli" },
  { key: "Spices & adaptogens", val: "Cardamom, Cinnamon, Ginger, Turmeric, Black Pepper, Saffron, Nutmeg, Clove, Long Pepper" },
  { key: "Supportive herbs", val: "Mulethi, Vidarikand, Gokhuru, Kaunch Beej" },
  { key: "Base / excipient", val: "Microcrystalline Cellulose (plant-based), Vegetarian HPMC Capsule" },
  { key: "Allergen info", val: "May contain traces of tree nuts. Gluten-free. Dairy-free." },
  { key: "Non-GMO", val: "Yes — all herbs are non-GMO sourced" },
];

const INGREDIENT_PILLS = [
  "Ashwagandha","Shatavari","Brahmi","Shilajit","Safed Musli","Cardamom",
  "Cinnamon","Ginger","Turmeric","Black Pepper","Saffron","Nutmeg","Clove",
  "Long Pepper","Mulethi","Vidarikand","Gokhuru","Kaunch Beej",
];

const TAG_COLORS = {
  "fatigue support":  "bg-blue-50 text-blue-900 border-blue-300",
  "active lifestyle": "bg-blue-50 text-blue-900 border-blue-300",
  "stamina booster":  "bg-amber-50 text-amber-900 border-amber-300",
  "immunity support": "bg-green-50 text-green-900 border-green-300",
  default:            "bg-blue-50 text-blue-900 border-blue-300",
};

const buildPacks = (finalPrice, origPrice) => {
  const fp = parseFloat(finalPrice);
  const op = parseFloat(origPrice);
  return [
    { qty: 30, price: Math.round(fp * 0.75), orig: Math.round(op * 0.75), perUnit: (fp * 0.75) / 30, tag: null },
    { qty: 60, price: Math.round(fp * 1.35), orig: Math.round(op * 1.35), perUnit: (fp * 1.35) / 60, tag: "Best Value" },
    { qty: 90, price: Math.round(fp * 1.9),  orig: Math.round(op * 1.9),  perUnit: (fp * 1.9) / 90,  tag: "Most Popular" },
  ];
};

// ─── Sub-components ───────────────────────────────────────────────────────────

const StarRow = ({ rating, size = "text-base" }) => (
  <div className="flex gap-0.5">
    {[1,2,3,4,5].map((i) => (
      <span key={i} className={`${size} leading-none ${i <= Math.round(rating) ? "text-amber-400" : "text-stone-300"}`}>★</span>
    ))}
  </div>
);

const Badge = ({ children, className = "" }) => (
  <span className={`inline-flex items-center gap-1 text-xs font-semibold px-3 py-1 rounded-full border ${className}`}>
    {children}
  </span>
);

const InfoRow = ({ label, value }) => (
  <div className="flex gap-4 py-3 border-b border-stone-100 last:border-0">
    <div className="text-[15px] font-semibold text-stone-500 min-w-[180px] flex-shrink-0">{label}</div>
    <div className="text-[15px] text-stone-800 leading-relaxed">{value}</div>
  </div>
);

const SectionTitle = ({ children }) => (
  <h3 className="text-[19px] font-bold text-stone-900 mb-4 pb-3 border-b border-stone-200">{children}</h3>
);

const Accordion = ({ title, children, defaultOpen = false }) => {
  const [open, setOpen] = useState(defaultOpen);
  return (
    <div className="border-b border-stone-200">
      <button
        onClick={() => setOpen((o) => !o)}
        className="w-full flex items-center justify-between py-4 text-left text-[16px] font-bold text-stone-900 hover:text-blue-900 transition-colors"
      >
        {title}
        <span className={`text-stone-400 text-sm transition-transform duration-200 flex-shrink-0 ml-4 ${open ? "rotate-180" : ""}`}>▾</span>
      </button>
      <div className={`overflow-hidden transition-all duration-300 ease-in-out ${open ? "max-h-[600px]" : "max-h-0"}`}>
        <div className="pb-5 text-[15px] text-stone-700 leading-relaxed">{children}</div>
      </div>
    </div>
  );
};

// ─── Main Component ───────────────────────────────────────────────────────────

const TABS = [
  { id: "description",  label: "Description" },
  { id: "ingredients",  label: "Ingredients" },
  { id: "benefits",     label: "Benefits" },
  { id: "usage",        label: "Usage" },
  { id: "beforeafter",  label: "Before / After" },
  { id: "legal",        label: "Legal & Metrology" },
  { id: "other",        label: "Other Info" },
  { id: "warning",      label: "Warnings & Caution" },
  { id: "accessibility",label: "Accessibility" },
  { id: "reviews",      label: "Reviews (3)" },
];


export default function SingleProduct() {
  const [activeImg, setActiveImg]   = useState(0);
  const [imgFade,   setImgFade]     = useState(false);
  const [packIdx,   setPackIdx]     = useState(1);
  const [qty,       setQty]         = useState(1);
  const [wishlisted,setWishlisted]  = useState(false);
  const [activeTab, setActiveTab]   = useState("description");
  const [product,   setProduct]     = useState(null);
  const [loading,   setLoading]     = useState(true);
  const [zoomStyle, setZoomStyle] = useState({});

  const productId = useParams().id;
const [openTab, setOpenTab] = useState("description");

  const toggleTab = (id) => {
    setOpenTab(openTab === id ? null : id);
  };
  useEffect(() => { window.scrollTo(0, 0); }, []);

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

  const IMAGES = product?.productImages || [];
  const PACKS  = product ? buildPacks(product.finalPrice, product.price) : [];
  const pack   = PACKS[packIdx] ?? {};
  const discPct = pack.orig ? Math.round(((pack.orig - pack.price) / pack.orig) * 100) : 0;
  const saving  = pack.orig ? pack.orig - pack.price : 0;
  const total   = pack.price ? (pack.price * qty).toLocaleString("en-IN") : "0";
  const productTags = product?.productTags ?? [];
  const offerTags   = product?.offerTags ?? [];

  const swapImg = (i) => {
    setImgFade(true);
    setTimeout(() => { setActiveImg(i); setImgFade(false); }, 200);
  };

  // ── Loading ──────────────────────────────────────────────────────────────
  if (loading) {
    return (
      <div className="min-h-screen bg-stone-50 flex items-center justify-center">
        <div className="flex flex-col items-center gap-4">
          <div className="w-12 h-12 rounded-full border-4 border-blue-900 border-t-transparent animate-spin" />
          <p className="text-[15px] font-semibold text-stone-400">Loading product…</p>
        </div>
      </div>
    );
  }

  if (!product) {
    return (
      <div className="min-h-screen bg-stone-50 flex items-center justify-center">
        <p className="text-[16px] font-semibold text-stone-400">Product not found.</p>
      </div>
    );
  }


  const handleMouseMove = (e) => {
  const { left, top, width, height } = e.target.getBoundingClientRect();

  const x = ((e.clientX - left) / width) * 100;
  const y = ((e.clientY - top) / height) * 100;

  setZoomStyle({
    transformOrigin: `${x}% ${y}%`,
    transform: "scale(2)",
  });
};

const resetZoom = () => {
  setZoomStyle({
    transform: "scale(1)",
    transformOrigin: "center",
  });
};

  return (
    <div className="min-h-screen bg-[#FDFAF6] text-stone-900">

      {/* ── Breadcrumb ── */}
      <nav className="bg-white border-b border-stone-200 px-4 sm:px-6 lg:px-10 py-3 flex items-center flex-wrap gap-1.5 text-[14px]">
        {["Home", product.forWhom ?? "Products"].map((c) => (
          <span key={c} className="flex items-center gap-1.5">
            <a href="#" className="text-stone-400 hover:text-blue-900 transition-colors font-medium">{c}</a>
            <span className="text-stone-300">›</span>
          </span>
        ))}
        <span className="font-bold text-blue-900">{product.productName}</span>
      </nav>

      <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-10 pt-8 pb-4">
        <div className="grid grid-cols-1 lg:grid-cols-[500px_1fr] gap-8 lg:gap-14 items-start">

          {/* ════ LEFT — Gallery ════ */}
          <div className="lg:sticky lg:top-6 flex flex-col gap-5">
            <div className="flex gap-3 items-start bg-stone-100 p-4 rounded-2xl">

              {/* Vertical thumbnails */}
              <div className="hidden sm:flex flex-col gap-2.5 flex-shrink-0 max-h-[420px] overflow-y-auto pr-1">
                {IMAGES.map((src, i) => (
                  <button
                    key={i}
                    onClick={() => swapImg(i)}
                    className={`w-[120px] h-[120px] rounded-xl overflow-hidden border-2 flex-shrink-0 transition-all duration-150
                      ${activeImg === i
                        ? "border-blue-800 shadow-[0_0_0_3px_rgba(3,52,154,0.15)]"
                        : "border-stone-200 bg-white hover:border-blue-400"}`}
                  >
                    <img src={src?.url} alt={`view ${i + 1}`} className="w-full h-full object-cover" />
                  </button>
                ))}
              </div>

              {/* Main image */}
              <div className="flex-1 relative rounded-2xl overflow-hidden aspect-square min-h-[380px] border border-stone-200 bg-white">
               <div
  className="flex-1 relative rounded-2xl overflow-hidden aspect-square min-h-[380px] border border-stone-200 bg-white"
  onMouseMove={handleMouseMove}
  onMouseLeave={resetZoom}
>
  {IMAGES.length > 0 ? (
    <img
      src={IMAGES[activeImg]?.url}
      alt={product.productName}
      style={zoomStyle}
      className={`w-full h-full object-cover transition-transform duration-200 ${imgFade ? "opacity-0" : "opacity-100"}`}
    />
  ) : (
    <div className="w-full h-full flex items-center justify-center text-stone-300 text-[15px] font-semibold">
      No image available
    </div>
  )}
</div>
                {discPct > 0 && (
                  <div className="absolute top-3.5 left-3.5 bg-blue-900 text-white text-[12px] font-bold px-3 py-1 rounded-full tracking-wide">
                    {discPct}% OFF
                  </div>
                )}
                {offerTags.length > 0 && (
                  <div className="absolute top-3.5 right-3.5 bg-amber-500 text-white text-[12px] font-bold px-3 py-1 rounded-full tracking-wide">
                    {offerTags[0]}
                  </div>
                )}
                <div className="absolute bottom-3.5 left-3.5 bg-white border border-stone-200 rounded-full px-3 py-1.5 text-[12px] font-bold text-orange-700 flex items-center gap-1.5">
                  <span className="w-2 h-2 rounded-full bg-orange-400 flex-shrink-0" />
                  Only 14 left in stock
                </div>
              </div>
            </div>

            {/* Mobile thumbnails */}
            <div className="flex sm:hidden gap-2 overflow-x-auto pb-1">
              {IMAGES.map((src, i) => (
                <button
                  key={i}
                  onClick={() => swapImg(i)}
                  className={`w-16 h-16 rounded-xl overflow-hidden border-2 flex-shrink-0 transition-all duration-150
                    ${activeImg === i ? "border-blue-800 shadow-[0_0_0_2px_rgba(3,52,154,0.12)]" : "border-stone-200 hover:border-blue-400"}`}
                >
                  <img src={src?.url} alt={`view ${i + 1}`} className="w-full h-full object-cover" />
                </button>
              ))}
            </div>

            {/* Offers strip */}
            <div className="bg-stone-100 rounded-xl p-4">
              <p className="text-[11px] font-bold text-stone-500 uppercase tracking-widest mb-3">Available Offers</p>
              <div className="flex gap-2.5 overflow-x-auto pb-1">
                {OFFERS.map(({ icon, bg, title, body }) => (
                  <div key={title} className="min-w-[148px] flex-shrink-0 bg-white border border-stone-200 rounded-xl p-3 hover:border-stone-300 transition-colors">
                    <div className={`w-9 h-9 ${bg} rounded-full flex items-center justify-center text-base mb-2`}>{icon}</div>
                    <p className="text-[14px] font-bold text-stone-900 mb-0.5">{title}</p>
                    <p className="text-[13px] text-stone-500 leading-snug">{body}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* ════ RIGHT — Info ════ */}
          <div className="flex flex-col">

            {/* Product tag badges */}
            {productTags.length > 0 && (
              <div className="flex flex-wrap gap-2 mb-4">
                {productTags.map((tag) => (
                  <Badge key={tag} className={TAG_COLORS[tag] ?? TAG_COLORS.default}>
                    ✓ {tag.charAt(0).toUpperCase() + tag.slice(1)}
                  </Badge>
                ))}
              </div>
            )}

            {/* Product Name */}
            <h1 className="text-[32px] sm:text-[38px] lg:text-[42px] font-bold leading-tight text-stone-900 mb-2">
              {product.productName}
            </h1>

            <p className="text-[16px] font-semibold text-stone-600 mb-1">{product.forWhom}</p>
            {product.withWhom && (
              <p className="text-[15px] font-semibold text-stone-600 mb-4">Key ingredients: {product.withWhom}</p>
            )}

            {/* Ratings */}
            <div className="flex items-center flex-wrap gap-3 mb-5">
              <span className="text-[18px] font-bold text-stone-900">4.7</span>
              <StarRow rating={4.7} />
              <span className="text-[14px] text-stone-400">1,248 reviews</span>
              <button
                onClick={() => setActiveTab("reviews")}
                className="text-[14px] font-bold text-blue-900 underline underline-offset-2 hover:text-blue-700 transition-colors"
              >
                Read all
              </button>
            </div>

            <div className="h-px bg-stone-200 mb-5" />

            {/* Price */}
            <div className="flex items-baseline flex-wrap gap-3 mb-2">
              <span className="text-[48px] sm:text-[54px] font-bold text-blue-900 leading-none">
                ₹{pack.price?.toLocaleString("en-IN") ?? parseFloat(product.finalPrice).toLocaleString("en-IN")}
              </span>
              <span className="text-[18px] text-stone-400 line-through">
                ₹{pack.orig?.toLocaleString("en-IN") ?? parseFloat(product.price).toLocaleString("en-IN")}
              </span>
              {saving > 0 && (
                <Badge className="bg-green-50 text-green-900 border-green-300">
                  Save ₹{saving.toLocaleString("en-IN")}
                </Badge>
              )}
            </div>
            <p className="text-[16px]  mb-1">Inclusive of all taxes · Free delivery above ₹499</p>
            <p className="text-[16px] text-stone-600 mb-6 leading-relaxed">
              {product.productDescription
                ? product.productDescription.slice(0, 120) + "…"
                : "GMP Certified · 60-cap supply for 2 months — ideal for a complete wellness cycle. 100% vegetarian, no artificial additives."}
            </p>

            {/* Pack Selector */}
            <div className="mb-6">
              <p className="text-[11px] font-bold text-stone-500 uppercase tracking-widest mb-3">Choose Pack Size</p>
              <div className="grid grid-cols-3 gap-3">
                {PACKS.map((p, i) => {
                  const pct = Math.round(((p.orig - p.price) / p.orig) * 100);
                  const sel = packIdx === i;
                  return (
                    <button
                      key={i}
                      onClick={() => setPackIdx(i)}
                      className={`relative pt-6 pb-4 px-2 rounded-2xl border-2 text-center transition-all duration-150
                        ${sel
                          ? "border-blue-800 bg-blue-50/60 shadow-[0_0_0_3px_rgba(3,52,154,0.10)]"
                          : "border-stone-200 bg-white hover:border-blue-400"}`}
                    >
                      {p.tag && (
                        <span className={`absolute -top-3 left-1/2 -translate-x-1/2 text-[10px] font-bold px-2.5 py-0.5 rounded-full text-white whitespace-nowrap
                          ${p.tag === "Most Popular" ? "bg-amber-500" : "bg-blue-900"}`}>
                          {p.tag === "Best Value" ? "★ " : ""}{p.tag}
                        </span>
                      )}
                      <p className={`text-[30px] font-bold leading-none mb-1 ${sel ? "text-blue-900" : "text-stone-900"}`}>{p.qty} <span className="text-[16px] ">capsules</span></p>
                      
                      <p className="text-[17px] font-bold text-stone-900">₹{p.price.toLocaleString("en-IN")} <span className="text-[12px] text-stone-400 line-through">₹{p.orig.toLocaleString("en-IN")}</span> </p>
                      <span className="inline-block mt-1.5 text-[10px] font-bold px-2 py-0.5 rounded-full bg-green-50 text-green-800 border border-green-200">
                        {pct}% off
                      </span>
                      
                    </button>
                  );
                })}
              </div>
            </div>

            <div className="h-px bg-stone-200 mb-5" />

            {/* Qty + Add to Cart */}
            <div className="flex gap-3 items-stretch mb-3">
              <div className="flex items-center border-2 border-stone-200 rounded-xl overflow-hidden bg-white flex-shrink-0">
                <button
                  onClick={() => setQty((q) => Math.max(1, q - 1))}
                  className="w-12 h-14 flex items-center justify-center text-stone-700 hover:bg-blue-50 hover:text-blue-900 transition-colors text-2xl font-light"
                >−</button>
                <span className="w-12 h-14 flex items-center justify-center text-[17px] font-bold text-stone-900 border-x-2 border-stone-200">{qty}</span>
                <button
                  onClick={() => setQty((q) => q + 1)}
                  className="w-12 h-14 flex items-center justify-center text-stone-700 hover:bg-blue-50 hover:text-blue-900 transition-colors text-2xl font-light"
                >+</button>
              </div>
              <button
                type="button"
                                className="flex shim-btn items-center justify-center gap-2 w-full text-white text-sm font-semibold uppercase tracking-wide px-6 py-3 rounded-xl transition-all duration-300 hover:-translate-y-0.5 active:translate-y-0"

                style={{ boxShadow: "0 10px 24px rgba(3,52,154,0.30)" }}
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
                  <circle cx="9" cy="21" r="1" /><circle cx="20" cy="21" r="1" />
                  <path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6" />
                </svg>
                Add to Cart
              </button>



            </div>

            {/* Buy Now */}
            <button className="w-full h-14 mb-4 border-2 border-blue-900 rounded-xl text-blue-900 text-[14px] font-bold tracking-widest uppercase hover:bg-blue-900 hover:text-white transition-all duration-200">
              Buy Now — ₹{total}
            </button>

            {/* Wishlist + Share */}
            <div className="flex gap-2.5 items-center flex-wrap mb-5">
              <button
                onClick={() => setWishlisted((w) => !w)}
                className={`flex items-center gap-2 px-4 py-2.5 rounded-xl border-2 text-[14px] font-bold transition-all
                  ${wishlisted
                    ? "border-blue-300 bg-blue-50 text-blue-700"
                    : "border-stone-200 bg-white text-stone-700 hover:border-blue-900 hover:text-blue-900"}`}
              >
                <svg className="w-4 h-4" fill={wishlisted ? "currentColor" : "none"} stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
                  <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" />
                </svg>
                {wishlisted ? "Wishlisted" : "Wishlist"}
              </button>
              <button className="flex items-center gap-2 px-4 py-2.5 rounded-xl border-2 border-stone-200 bg-white text-stone-700 text-[14px] font-bold hover:border-blue-900 hover:text-blue-900 transition-all">
                <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
                  <circle cx="18" cy="5" r="3" /><circle cx="6" cy="12" r="3" /><circle cx="18" cy="19" r="3" />
                  <line x1="8.59" y1="13.51" x2="15.42" y2="17.49" />
                  <line x1="15.41" y1="6.51" x2="8.59" y2="10.49" />
                </svg>
                Share
              </button>
             
            </div>

            {/* Highlights */}
            <div className="grid grid-cols-2 gap-2.5 mb-5">
              {HIGHLIGHTS.map(({ icon, label }) => (
                <div key={label} className="flex items-center gap-2.5 px-4 py-3 rounded-xl border border-stone-200 bg-white text-[14px] font-bold text-stone-800 hover:border-stone-300 transition-colors">
                  <span className="text-lg flex-shrink-0">{icon}</span>
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
                  <span className="text-[14px] font-bold text-stone-900 leading-tight">{label}</span>
                  <span className="text-[12px] text-stone-500">{sub}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* ── Bottom Tabs ── */}
    

       <div className="max-w-7xl mx-auto px-4 py-10">

      {TABS.map(({ id, label }) => (
        <div key={id} className="mb-4 border border-stone-300 rounded-2xl overflow-hidden">

          {/* HEADER */}
          <button
            onClick={() => toggleTab(id)}
            className="w-full flex justify-between items-center px-5 py-4 bg-stone-100 hover:bg-stone-200 transition"
          >
            <span className="text-[20px] font-bold text-stone-900">
              {label}
            </span>

            <span className={`text-[22px] transition-transform duration-300 ${
              openTab === id ? "rotate-180" : ""
            }`}>
              ⌄
            </span>
          </button>

          {/* CONTENT */}
          {openTab === id && (
            <div className="px-5 py-5 bg-white text-stone-900 text-[17px] leading-relaxed">

              {/* DESCRIPTION */}
              {id === "description" && (
                <>
                  <p className="mb-4 text-[18px] font-medium">
                    {product.productDescription}
                  </p>

                  <ul className="space-y-3">
                    {BENEFITS_LIST.slice(0, 5).map((b) => (
                      <li key={b.key} className="flex gap-3">
                        <span className="text-green-600 font-bold">✓</span>
                        <span className="text-[17px]">{b.val}</span>
                      </li>
                    ))}
                  </ul>
                </>
              )}

              {/* INGREDIENTS */}
              {id === "ingredients" && (
                <>
                  {INGREDIENTS_LIST.map((row) => (
                    <p key={row.key} className="mb-2">
                      <strong>{row.key}:</strong> {row.val}
                    </p>
                  ))}

                  <div className="flex flex-wrap gap-2 mt-4">
                    {INGREDIENT_PILLS.map((ing) => (
                      <span key={ing} className="px-3 py-1 rounded-full bg-blue-100 text-blue-900 text-[15px] font-semibold">
                        {ing}
                      </span>
                    ))}
                  </div>
                </>
              )}

              {/* BENEFITS */}
              {id === "benefits" && (
                <>
                  {BENEFITS_LIST.map((row) => (
                    <p key={row.key} className="mb-2">
                      <strong>{row.key}:</strong> {row.val}
                    </p>
                  ))}
                </>
              )}

              {/* USAGE */}
              {id === "usage" && (
                <>
                  {USAGE_LIST.map((row) => (
                    <p key={row.key} className="mb-2">
                      <strong>{row.key}:</strong> {row.val}
                    </p>
                  ))}
                </>
              )}

              {/* BEFORE AFTER */}
              {id === "beforeafter" && (
                <>
                  <p className="font-bold mb-2 text-red-700">Before:</p>
                  <ul className="mb-4 space-y-2">
                    {BEFORE_ITEMS.map((item) => (
                      <li key={item}>• {item}</li>
                    ))}
                  </ul>

                  <p className="font-bold mb-2 text-green-700">After:</p>
                  <ul className="space-y-2">
                    {AFTER_ITEMS.map((item) => (
                      <li key={item}>• {item}</li>
                    ))}
                  </ul>
                </>
              )}

              {/* LEGAL */}
              {id === "legal" && (
                <>
                  {LEGAL_LIST.map((row) => (
                    <p key={row.key} className="mb-2">
                      <strong>{row.key}:</strong> {row.val}
                    </p>
                  ))}
                </>
              )}

              {/* OTHER */}
              {id === "other" && (
                <>
                  {OTHER_LIST.map((row) => (
                    <p key={row.key} className="mb-2">
                      <strong>{row.key}:</strong> {row.val}
                    </p>
                  ))}
                </>
              )}

              {/* WARNING */}
              {id === "warning" && (
                <>
                  {WARNING_LIST.map((row) => (
                    <p key={row.key} className="mb-2">
                      <strong>{row.key}:</strong> {row.val}
                    </p>
                  ))}

                  <p className="mt-4 text-amber-700 font-semibold">
                    ⚠ Consult a doctor before use. Not intended to diagnose or treat diseases.
                  </p>
                </>
              )}

              {/* ACCESSIBILITY */}
              {id === "accessibility" && (
                <>
                  {ACCESSIBILITY_LIST.map((row) => (
                    <p key={row.key} className="mb-2">
                      <strong>{row.key}:</strong> {row.val}
                    </p>
                  ))}
                </>
              )}

              {/* REVIEWS */}
              {id === "reviews" && (
                <>
                  {REVIEWS.map((r, i) => (
                    <div key={i} className="mb-4 border-b pb-3">
                      <p className="font-bold text-[17px]">{r.name}</p>
                      <p className="text-yellow-500">⭐ {r.rating}</p>
                      <p>{r.text}</p>
                    </div>
                  ))}
                </>
              )}

            </div>
          )}
        </div>
      ))}

    </div>

    <ReviewSection/>
 <RelatedProduct/>
    </div>
  );
}