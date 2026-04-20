import { useState, useEffect, useRef } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { addToCart } from "../../services/cartService";
import { axiosInstance } from "../../utils/axiosInstance";
import { toast } from "react-toastify";
import RelatedProduct from "../product/ReleatedProduct";
import ReviewSection from "../clientReview/ReviewSection";
import FAQ from "./FAQ";
import { HiOutlineTrendingUp } from "react-icons/hi";
import ashwagandhaImg from "../../assets/images/ingredients/ashwagandha.png";
import brahmiImg from "../../assets/images/ingredients/brahmi.png";
import amlaImg from "../../assets/images/ingredients/amla.png";
import pincodeData from "../../data/pincodeData.json";

// ─── Static Data ──────────────────────────────────────────────────────────────

const OFFERS = [
  { icon: "💳", title: "Bank Offer", body: "10% off HDFC Cards. Min ₹500" },
  { icon: "🏷️", title: "No-cost EMI", body: "₹167/mo on orders above ₹999" },
  { icon: "🎁", title: "Buy 2 Get 1", body: "Free on all 60-cap packs" },
  { icon: "🚚", title: "Free Delivery", body: "On orders above ₹499" },
  { icon: "📦", title: "Combo Offer", body: "Buy 3 packs, get 12% off" },
];

const BENEFITS_LIST = [
  { key: "Energy & Stamina", val: "Ashwagandha and Shilajit work together to reduce fatigue and increase physical endurance — noticeable within 2–3 weeks of daily use.", icon: "⚡" },
  { key: "Immune Support", val: "Turmeric, Ginger, and Long Pepper provide potent anti-inflammatory and immunomodulatory support.", icon: "🛡️" },
  { key: "Stress & Sleep", val: "Brahmi and Ashwagandha are clinically studied adaptogens that lower cortisol and improve sleep quality.", icon: "🌙" },
  { key: "Digestion & Gut", val: "Cardamom, Mulethi, and Ginger aid in soothing the digestive tract and reducing bloating.", icon: "🌿" },
  { key: "Antioxidant Protection", val: "Saffron and Clove are among the highest ORAC-rated herbs, fighting free radicals and promoting cellular longevity.", icon: "✨" },
];

const WARNING_LIST = [
  { key: "Pregnancy / Nursing", val: "Consult your gynaecologist before use if pregnant or breastfeeding." },
  { key: "Drug interactions", val: "May interact with blood thinners, thyroid medication, or immunosuppressants." },
  { key: "Overdose", val: "Do not exceed the recommended dose. Excess Ashwagandha may cause drowsiness." },
  { key: "Allergies", val: "Discontinue immediately if you experience rash, itching, or swelling." },
  { key: "Children", val: "Not recommended for children under 18 years without medical supervision." },
  { key: "Chronic conditions", val: "Consult a healthcare provider if you have diabetes, hypertension, or autoimmune disorders." },
  { key: "Keep out of reach", val: "Store out of reach of children and pets." },
];

const REVIEWS = [
  { name: "Amit S.", initial: "A", rating: 5, date: "12 Jan 2025", text: "Absolutely love this product. Noticed a huge difference in my energy levels within 2 weeks! My sleep improved noticeably and the digestion has been great.", verified: true },
  { name: "Priya V.", initial: "P", rating: 4, date: "3 Feb 2025", text: "Great taste and quality. My whole family drinks it every morning. Will definitely reorder. The immunity boost is real — no one got sick this winter!", verified: true },
  { name: "Rahul M.", initial: "R", rating: 5, date: "20 Feb 2025", text: "Best Ayurvedic supplement I have ever tried. The difference in my stamina after the gym is night and day.", verified: true },
];

const PRODUCT_INGREDIENTS = {
  "Blood Cholesterol Balance": {
    list: [
      { key: "Main Ingredients", val: "Guggul, Arjuna, Garlic, Amla, Turmeric, Ashwagandha" },
      { key: "Other Ingredients", val: "Hydroxypropyl Methylcellulose (HPMC), Microcrystalline Cellulose capsule" },
    ],
    pills: ["Guggul", "Arjuna", "Garlic", "Amla", "Turmeric", "Ashwagandha"],
    details: [
      "Guggul: Traditionally used to support healthy cholesterol levels and lipid metabolism.",
      "Arjuna: Renowned heart tonic that supports cardiovascular strength and circulation.",
      "Garlic: Helps maintain healthy cholesterol and supports heart health.",
      "Amla: Rich in antioxidants that support lipid balance and vascular protection.",
      "Turmeric: Anti-inflammatory herb that supports overall cardiovascular health.",
      "Ashwagandha: Adaptogen that helps manage stress and supports heart wellness.",
    ],
  },
  "Blood Sugar": {
    list: [
      { key: "Main Ingredients", val: "Gurmar, Bitter Gourd, Jamun Seed, Fenugreek, Jackfruit Leaf, Garcinia" },
      { key: "Other Ingredients", val: "Hydroxypropyl Methylcellulose (HPMC), Microcrystalline Cellulose capsule" },
    ],
    pills: ["Gurmar", "Bitter Gourd", "Jamun Seed", "Fenugreek", "Jackfruit Leaf", "Garcinia"],
    details: [
      "Gurmar: Known as the 'sugar destroyer,' helps reduce sugar absorption and cravings.",
      "Bitter Gourd: Supports healthy glucose metabolism and insulin activity.",
      "Jamun Seed: Traditionally used to maintain healthy blood sugar levels.",
      "Fenugreek: Helps regulate glucose levels and improve metabolic function.",
      "Jackfruit Leaf: Supports glycaemic control and slows carbohydrate absorption.",
      "Garcinia: Supports metabolic balance and helps manage weight-related factors.",
    ],
  },
  "Brain Tonic": {
    list: [
      { key: "Main Ingredients", val: "Brahmi, Gotu Kola, Ashwagandha, Shankhpushpi, Jatamansi, Mulethi" },
      { key: "Other Ingredients", val: "Hydroxypropyl Methylcellulose (HPMC), Microcrystalline Cellulose capsule" },
    ],
    pills: ["Brahmi", "Gotu Kola", "Ashwagandha", "Shankhpushpi", "Jatamansi", "Mulethi"],
    details: [
      "Brahmi: Powerful nootropic that enhances memory and cognitive function.",
      "Gotu Kola: Supports brain circulation and mental clarity.",
      "Ashwagandha: Helps reduce stress and improve cognitive performance.",
      "Shankhpushpi: Traditional herb for enhancing memory and focus.",
      "Jatamansi: Supports mental calmness and reduces stress-related fatigue.",
      "Mulethi: Supports nervous system health and cognitive balance.",
    ],
  },
  "General Health": {
    list: [
      { key: "Main Ingredients", val: "Ashwagandha, Amla, Giloy, Tulsi, Turmeric, Shatavari" },
      { key: "Other Ingredients", val: "Hydroxypropyl Methylcellulose (HPMC), Microcrystalline Cellulose capsule" },
    ],
    pills: ["Ashwagandha", "Amla", "Giloy", "Tulsi", "Turmeric", "Shatavari"],
    details: [
      "Ashwagandha: Supports energy, stress management, and vitality.",
      "Amla: Rich in Vitamin C, supports immunity and overall health.",
      "Giloy: Known for immune-boosting and detoxifying properties.",
      "Tulsi: Supports respiratory health and immune balance.",
      "Turmeric: Provides anti-inflammatory and antioxidant support.",
      "Shatavari: Supports hormonal balance and overall vitality.",
    ],
  },
  "Vitality Power Plus": {
    list: [
      { key: "Main Ingredients", val: "Ashwagandha, Safed Musli, Shilajit, Kaunch Beej, Gokshura" },
      { key: "Other Ingredients", val: "Hydroxypropyl Methylcellulose (HPMC), Microcrystalline Cellulose capsule" },
    ],
    pills: ["Ashwagandha", "Safed Musli", "Shilajit", "Kaunch Beej", "Gokshura"],
    details: [
      "Ashwagandha: Enhances strength, stamina, and stress resilience.",
      "Safed Musli: Supports energy, stamina, and physical performance.",
      "Shilajit: Boosts vitality, endurance, and overall energy levels.",
      "Kaunch Beej: Supports strength, performance, and vitality.",
      "Gokshura: Promotes stamina, strength, and overall wellness.",
    ],
  },
};

const INGREDIENT_IMAGES = [ashwagandhaImg, brahmiImg, amlaImg];

const buildPacks = (finalPrice, origPrice) => {
  const fp = parseFloat(finalPrice);
  const op = parseFloat(origPrice);
  return [
    { qty: 30, price: Math.round(fp * 0.75), orig: Math.round(op * 0.75), perUnit: (fp * 0.75) / 30, tag: null, duration: "1 Month" },
    { qty: 60, price: Math.round(fp * 1.35), orig: Math.round(op * 1.35), perUnit: (fp * 1.35) / 60, tag: "Best Value", duration: "2 Months" },
    { qty: 90, price: Math.round(fp * 1.9), orig: Math.round(op * 1.9), perUnit: (fp * 1.9) / 90, tag: "Most Popular", duration: "3 Months" },
  ];
};

const TABS = [
  { id: "description", label: "Description", icon: "📋" },
  { id: "ingredients", label: "Ingredients", icon: "🌿" },
  { id: "warning", label: "Warnings", icon: "⚠️" },
  { id: "howToUse", label: "How to Use", icon: "📖" },
  { id: "reviews", label: "Reviews", icon: "⭐" },
];

// ─── Sub-components ────────────────────────────────────────────────────────────

const StarRow = ({ rating, size = "text-sm" }) => (
  <div className="flex gap-0.5">
    {[1, 2, 3, 4, 5].map((i) => (
      <span key={i} className={`${size} leading-none ${i <= Math.round(rating) ? "text-amber-400" : "text-stone-300"}`}>★</span>
    ))}
  </div>
);

// ─── Main Component ────────────────────────────────────────────────────────────

export default function SingleProduct() {
  const [activeImg, setActiveImg] = useState(0);
  const [imgFade, setImgFade] = useState(false);
  const [packIdx, setPackIdx] = useState(1);
  const [qty, setQty] = useState(1);
  const [wishlisted, setWishlisted] = useState(false);
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [zoomStyle, setZoomStyle] = useState({});
  const [openTab, setOpenTab] = useState("description");
  const [pincode, setPincode] = useState("");
  const [pincodeMsg, setPincodeMsg] = useState(null);
  const [isExpanded, setIsExpanded] = useState(false);

  const currentIngredients = product ? PRODUCT_INGREDIENTS[product.productName] : null;

  const productId = useParams().id;
  const navigate = useNavigate();
  const qc = useQueryClient();

  const addMut = useMutation({
    mutationFn: addToCart,
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: ["cart"] });
      toast.success("Item added to cart!");
    },
    onError: (err) => {
      if (err.response?.status === 401) {
        toast.error("Please login first.");
        navigate('/login');
      } else toast.error("Failed to add to cart.");
    }
  });

  const handleAddToCart = () => {
    const token = localStorage.getItem("token");
    if (!token) { toast.error("Please login first."); navigate('/login'); return; }
    addMut.mutate({ productId, quantity: qty });
  };

  const handleBuyNow = () => {
    const token = localStorage.getItem("token");
    if (!token) { toast.error("Please login first to buy."); navigate("/login"); return; }
    addMut.mutate({ productId, quantity: qty }, {
      onSuccess: () => { qc.invalidateQueries({ queryKey: ["cart"] }); navigate("/checkout"); }
    });
  };

  const toggleTab = (id) => setOpenTab(openTab === id ? null : id);

  useEffect(() => { window.scrollTo(0, 0); }, []);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const res = await axiosInstance.get(`/product/getProductById/${productId}`);
        setProduct(res?.data?.data);
      } catch (e) { console.error(e); } finally { setLoading(false); }
    };
    fetchData();
  }, [productId]);

  const IMAGES = product?.productImages || [];
  const PACKS = product ? buildPacks(product.finalPrice, product.price) : [];
  const pack = PACKS[packIdx] ?? {};
  const discPct = pack.orig ? Math.round(((pack.orig - pack.price) / pack.orig) * 100) : 0;
  const saving = pack.orig ? pack.orig - pack.price : 0;
  const total = pack.price ? (pack.price * qty).toLocaleString("en-IN") : "0";
  const productTags = product?.productTags ?? [];
  const offerTags = product?.offerTags ?? [];

  const swapImg = (i) => {
    setImgFade(true);
    setTimeout(() => { setActiveImg(i); setImgFade(false); }, 180);
  };

  const handleMouseMove = (e) => {
    const { left, top, width, height } = e.currentTarget.getBoundingClientRect();
    const x = ((e.clientX - left) / width) * 100;
    const y = ((e.clientY - top) / height) * 100;
    setZoomStyle({ transformOrigin: `${x}% ${y}%`, transform: "scale(2.2)", transition: "transform 0.1s ease" });
  };
  const resetZoom = () => setZoomStyle({ transform: "scale(1)", transition: "transform 0.25s ease", transformOrigin: "center" });

  const checkPincode = () => {
    if (pincode.length !== 6) { setPincodeMsg({ type: "error", msg: "Enter a valid 6-digit pincode." }); return; }
    const state = pincodeData[pincode];
    if (!state) { setPincodeMsg({ type: "error", msg: "❌ Sorry, we couldn't find this pincode." }); return; }
    const FAST_STATES = ["TAMIL NADU"];
    const MEDIUM_STATES = ["KERALA", "KARNATAKA", "ANDHRA PRADESH", "TELANGANA"];
    let days = FAST_STATES.includes(state) ? 4 : MEDIUM_STATES.includes(state) ? 5 : 7;
    let label = days === 4 ? "Express" : "Standard";
    const deliveryDate = new Date();
    deliveryDate.setDate(deliveryDate.getDate() + days);
    const formattedDate = deliveryDate.toLocaleDateString("en-IN", { weekday: "short", month: "short", day: "numeric" });
    const stateName = state.split(" ").map((w) => w.charAt(0) + w.slice(1).toLowerCase()).join(" ");
    setPincodeMsg({ type: "success", msg: `${label} Delivery to ${stateName} — Est. by ${formattedDate} (${days} working days)`, days, stateName });
  };

  if (loading) return (
    <div className="min-h-screen bg-[#0D1F17] flex items-center justify-center">
      <div className="flex flex-col items-center gap-4">
        <div className="w-12 h-12 rounded-full border-2 border-[#C9A84C] border-t-transparent animate-spin" />
        <p className="text-sm font-medium text-[#C9A84C] tracking-[0.3em] uppercase">Preparing your experience…</p>
      </div>
    </div>
  );

  if (!product) return (
    <div className="min-h-screen bg-[#0D1F17] flex items-center justify-center">
      <p className="text-sm font-semibold text-stone-400">Product not found.</p>
    </div>
  );

  return (
    <div className="min-h-screen text-stone-900" style={{ background: "#FAFAF7" }}>
      <style>{`
        

        @keyframes fadeUp { from { opacity:0; transform:translateY(16px); } to { opacity:1; transform:translateY(0); } }
        @keyframes shimmer { 0%{background-position:200% center} 100%{background-position:-200% center} }
        @keyframes pulse-dot { 0%,100%{opacity:1;transform:scale(1)} 50%{opacity:0.6;transform:scale(1.3)} }
        @keyframes float { 0%,100%{transform:translateY(0)} 50%{transform:translateY(-6px)} }

        .animate-fadeUp { animation: fadeUp 0.4s ease forwards; }
        .pulse-dot { animation: pulse-dot 2s ease-in-out infinite; }
        .tab-content { animation: fadeUp 0.3s ease; }

        .gold-btn {
          background: linear-gradient(135deg, #C9A84C 0%, #E8C96B 40%, #C9A84C 70%, #A8862A 100%);
          background-size: 200% auto;
          animation: shimmer 4s linear infinite;
          box-shadow: 0 4px 20px rgba(201,168,76,0.35);
        }
        .gold-btn:hover { box-shadow: 0 6px 28px rgba(201,168,76,0.55); transform: translateY(-1px); }

        .forest-btn {
          background: linear-gradient(135deg, #1A3D2B 0%, #2A5C40 100%);
          box-shadow: 0 4px 16px rgba(26,61,43,0.3);
        }
        .forest-btn:hover { box-shadow: 0 6px 24px rgba(26,61,43,0.45); transform: translateY(-1px); }

        .pack-card { transition: all 0.25s cubic-bezier(0.4,0,0.2,1); }
        .pack-card:hover { transform: translateY(-2px); }

        .thumb-btn { transition: all 0.2s ease; }

        .ingredient-card:hover img { transform: scale(1.08); }
        .ingredient-card img { transition: transform 0.7s cubic-bezier(0.4,0,0.2,1); }

        .divider-ornament::before,
        .divider-ornament::after {
          content: '';
          flex: 1;
          height: 1px;
          background: linear-gradient(to right, transparent, #C9A84C55);
        }
        .divider-ornament::after { background: linear-gradient(to left, transparent, #C9A84C55); }

        .luxury-input:focus { border-color: #C9A84C; box-shadow: 0 0 0 3px rgba(201,168,76,0.12); }

        .scrollbar-hide::-webkit-scrollbar { display: none; }
        .scrollbar-hide { -ms-overflow-style: none; scrollbar-width: none; }
      `}</style>

      {/* ── Breadcrumb ── */}
      <nav className="bg-white border-b border-stone-100 px-4 sm:px-8 lg:px-16 py-4 font-body">
        <div className="max-w-[1440px] mx-auto flex items-center gap-2 text-sm">
          {["Home", product.forWhom ?? "Products"].map((c) => (
            <span key={c} className="flex items-center gap-2">
              <a href="#" className="text-stone-400 hover:text-[#1A3D2B] transition-colors font-medium tracking-wide">{c}</a>
              <span className="text-[#C9A84C] text-xs">›</span>
            </span>
          ))}
          <span className="font-semibold text-[#1A3D2B] truncate max-w-[220px] tracking-wide">{product.productName}</span>
        </div>
      </nav>

      <div className="max-w-[1440px] mx-auto px-4 sm:px-8 lg:px-16 pt-10 pb-8 font-body">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-start">

          {/* ════ LEFT — Gallery ════ */}
          <div className="lg:sticky lg:top-6 flex flex-col gap-5">

            {/* Main image */}
            <div className="relative rounded-[2rem] overflow-hidden bg-white shadow-[0_8px_40px_rgba(26,61,43,0.1)] border border-stone-100">

              {/* Action buttons */}
              <div className="absolute top-5 right-5 z-20 flex flex-col gap-2.5">
                <button
                  onClick={() => setWishlisted(w => !w)}
                  className={`w-11 h-11 rounded-full flex items-center justify-center shadow-lg backdrop-blur-sm transition-all duration-300
                    ${wishlisted ? "bg-rose-500 text-white scale-110" : "bg-white/90 text-stone-400 hover:text-rose-500 hover:scale-105"}`}
                >
                  <svg className="w-5 h-5" fill={wishlisted ? "currentColor" : "none"} stroke="currentColor" strokeWidth={1.8} viewBox="0 0 24 24">
                    <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" />
                  </svg>
                </button>
                <button className="w-11 h-11 rounded-full bg-white/90 backdrop-blur-sm flex items-center justify-center shadow-lg text-stone-400 hover:text-[#1A3D2B] transition-all duration-200 hover:scale-105">
                  <svg className="w-4.5 h-4.5" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
                    <circle cx="18" cy="5" r="3" /><circle cx="6" cy="12" r="3" /><circle cx="18" cy="19" r="3" />
                    <line x1="8.59" y1="13.51" x2="15.42" y2="17.49" /><line x1="15.41" y1="6.51" x2="8.59" y2="10.49" />
                  </svg>
                </button>
              </div>

              {/* Badges */}
              {discPct > 0 && (
                <div className="absolute top-5 left-5 z-20 bg-[#1A3D2B] text-[#C9A84C] text-xs font-bold px-4 py-2 rounded-full tracking-[0.1em] shadow-lg">
                  {discPct}% OFF
                </div>
              )}
              {offerTags.length > 0 && (
                <div className="absolute top-16 left-5 z-20 bg-[#C9A84C] text-white text-[11px] font-bold px-3 py-1.5 rounded-full shadow tracking-wide">
                  {offerTags[0]}
                </div>
              )}

              {/* Image */}
              <div className="overflow-hidden cursor-zoom-in" onMouseMove={handleMouseMove} onMouseLeave={resetZoom}>
                {IMAGES.length > 0 ? (
                  <img
                    src={IMAGES[activeImg]?.url}
                    alt={product.productName}
                    style={zoomStyle}
                    className={`w-full h-[560px] object-cover transition-opacity duration-200 ${imgFade ? "opacity-0" : "opacity-100"}`}
                  />
                ) : (
                  <div className="w-full h-[560px] flex items-center justify-center text-stone-300 text-sm">No image available</div>
                )}
              </div>

              {/* Stock badge */}
              <div className="absolute bottom-5 left-5 z-20 flex items-center gap-2.5 bg-white/95 backdrop-blur-md border border-amber-100 rounded-full px-5 py-2.5 shadow-md">
                <span className="w-2 h-2 rounded-full bg-amber-400 pulse-dot flex-shrink-0" />
                <span className="text-xs font-semibold text-stone-700 tracking-wide">Only 14 left in stock</span>
              </div>
            </div>

            {/* Thumbnails */}
            {IMAGES.length > 1 && (
              <div className="flex gap-3 overflow-x-auto pb-1 scrollbar-hide">
                {IMAGES.map((src, i) => (
                  <button
                    key={i}
                    onClick={() => swapImg(i)}
                    className={`thumb-btn flex-shrink-0 w-20 h-20 rounded-2xl overflow-hidden border-2 transition-all
                      ${activeImg === i
                        ? "border-[#C9A84C] shadow-[0_0_0_3px_rgba(201,168,76,0.2)]"
                        : "border-stone-200 hover:border-[#1A3D2B] opacity-70 hover:opacity-100"}`}
                  >
                    <img src={src?.url} alt={`view ${i + 1}`} className="w-full h-full object-cover" />
                  </button>
                ))}
              </div>
            )}

            {/* Offers strip */}
            <div className="bg-white rounded-2xl border border-stone-100 p-5 shadow-sm">
              <div className="flex items-center gap-3 mb-4 divider-ornament">
                <span className="text-[11px] font-bold text-[#C9A84C] uppercase tracking-[0.25em] whitespace-nowrap px-2">Available Offers</span>
              </div>
              <div className="flex gap-3 overflow-x-auto pb-1 scrollbar-hide">
                {OFFERS.map(({ icon, title, body }) => (
                  <div key={title} className="min-w-[140px] flex-shrink-0 border border-stone-100 rounded-xl p-3.5 hover:border-[#C9A84C]/30 hover:bg-amber-50/30 transition-all duration-200 group">
                    <div className="w-9 h-9 bg-gradient-to-br from-[#1A3D2B] to-[#2A5C40] rounded-xl flex items-center justify-center text-base mb-2.5 shadow-sm group-hover:scale-110 transition-transform duration-200">{icon}</div>
                    <p className="text-sm font-bold text-stone-900 mb-1 tracking-tight">{title}</p>
                    <p className="text-[12px] text-stone-500 leading-snug">{body}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* ════ RIGHT — Product Info ════ */}
          <div className="flex flex-col animate-fadeUp">

            {/* Category tag */}
            {product.forWhom && (
              <span className="inline-flex items-center gap-1.5 text-[11px] font-bold uppercase tracking-[0.2em] text-[#C9A84C] mb-3">
                <span className="w-6 h-px bg-[#C9A84C]" />
                {product.forWhom}
              </span>
            )}

            {/* Product Name */}
            <h1 className="font-display text-[36px] sm:text-[44px] lg:text-[52px] font-bold leading-[1.1] mb-4 text-[#0D1F17]">
              {product.productName}
            </h1>

            {/* Ratings */}
            <div className="flex items-center flex-wrap gap-4 mb-5">
              <div className="flex items-center gap-2.5 bg-amber-50 border border-amber-200 rounded-full px-4 py-2">
                <StarRow rating={4.7} size="text-sm" />
                <span className="text-sm font-bold text-amber-800">4.7</span>
                <span className="text-xs text-amber-500 font-medium">(1,248 reviews)</span>
              </div>
              <button className="text-xs font-semibold text-[#1A3D2B] border-b border-[#1A3D2B]/30 hover:border-[#1A3D2B] pb-0.5 transition-all">
                Read all reviews →
              </button>
            </div>

            {/* Product tags */}
            {productTags.length > 0 && (
              <div className="flex flex-wrap gap-2 mb-5">
                {productTags.slice(0, 3).map((tag) => (
                  <span key={tag} className="inline-flex items-center gap-1.5 text-[11px] font-semibold px-3 py-1.5 rounded-full border border-[#1A3D2B]/20 bg-[#1A3D2B]/5 text-[#1A3D2B] uppercase tracking-wide">
                    <span className="text-[#C9A84C]">✦</span> {tag}
                  </span>
                ))}
              </div>
            )}

            {/* Description */}
            {product.productDescription && (
              <div className="mb-6 border-l-2 border-[#C9A84C]/40 pl-5">
                <div
                  className={`text-[16px] text-stone-600 leading-relaxed font-body transition-all duration-300 ${!isExpanded ? "line-clamp-2" : ""}`}
                >
                  {product.productDescription}
                </div>

                {isExpanded && (
                  <div className="mt-5 space-y-3 animate-fadeUp">
                    <p className="text-[11px] font-black uppercase tracking-[0.2em] text-[#C9A84C] mt-4 mb-3">Key Benefits</p>
                    {BENEFITS_LIST.map((b) => (
                      <div key={b.key} className="flex gap-3 p-4 rounded-xl bg-[#1A3D2B]/[0.03] border border-[#1A3D2B]/10 items-start hover:bg-[#1A3D2B]/[0.06] transition-colors">
                        <span className="text-lg flex-shrink-0 mt-0.5">{b.icon}</span>
                        <div className="text-[14px] leading-relaxed text-stone-600">
                          <span className="font-bold text-[#0D1F17]">{b.key}: </span>
                          <span>{b.val}</span>
                        </div>
                      </div>
                    ))}
                  </div>
                )}

                <button
                  onClick={() => setIsExpanded(!isExpanded)}
                  className="mt-3 text-[11px] font-black uppercase tracking-[0.18em] text-[#1A3D2B] hover:text-[#C9A84C] transition-colors flex items-center gap-2"
                >
                  {isExpanded ? "Show Less" : "Read More"}
                  <span className={`transition-transform duration-300 ${isExpanded ? "rotate-180" : ""}`}>↓</span>
                </button>
              </div>
            )}

            {/* Status bar */}
            <div className="flex items-center gap-3 mb-6 flex-wrap">
              <span className="inline-flex items-center gap-2 text-xs font-bold text-[#1A3D2B] bg-emerald-50 border border-emerald-200 rounded-full px-4 py-2 tracking-wide uppercase">
                <span className="w-2 h-2 rounded-full bg-emerald-500 pulse-dot" />
                In Stock
              </span>
              <span className="inline-flex items-center gap-2 text-xs font-bold text-amber-800 bg-amber-50 border border-amber-200 rounded-full px-4 py-2 tracking-wide">
                <HiOutlineTrendingUp size={14} /> 300+ sold this month
              </span>
            </div>

            <div className="h-px bg-gradient-to-r from-transparent via-[#C9A84C]/30 to-transparent mb-6" />

            {/* ── Price Card ── */}
            <div className="bg-[#0D1F17] rounded-2xl p-5 sm:p-6 mb-5 shadow-[0_8px_30px_rgba(13,31,23,0.2)]">
              <div className="flex items-center justify-between mb-3">
                <span className="text-[11px] font-bold uppercase tracking-[0.2em] text-[#C9A84C]/70">Price</span>
                {saving > 0 && (
                  <span className="text-[11px] font-bold px-3 py-1 rounded-full bg-[#C9A84C]/15 text-[#C9A84C] border border-[#C9A84C]/30">
                    You save ₹{saving.toLocaleString("en-IN")}
                  </span>
                )}
              </div>
              <div className="flex items-end gap-4 flex-wrap">
                <span className=" text-[52px] sm:text-[60px] font-bold text-white leading-none">
                  ₹{pack.price?.toLocaleString("en-IN") ?? parseFloat(product.finalPrice).toLocaleString("en-IN")}
                </span>
                <span className="text-lg text-white/30 line-through font-medium mb-2">
                  ₹{pack.orig?.toLocaleString("en-IN") ?? parseFloat(product.price).toLocaleString("en-IN")}
                </span>
              </div>
              <p className="text-[11px] text-white/40 mt-1 tracking-wide">Inclusive of all taxes · Free delivery on ₹499+</p>
            </div>

            {/* ── Pack Selector ── */}
            <div className="mb-6">
              <p className="text-[11px] font-black uppercase tracking-[0.22em] text-stone-500 mb-4">Choose Your Pack</p>
              <div className="flex flex-col gap-2.5">
                {PACKS.map((p, i) => {
                  const pct = Math.round(((p.orig - p.price) / p.orig) * 100);
                  const sel = packIdx === i;
                  return (
                    <button
                      key={i}
                      onClick={() => setPackIdx(i)}
                      className={`pack-card relative flex items-center justify-between w-full p-4 rounded-xl border-2 text-left
                        ${sel
                          ? "border-[#C9A84C] bg-amber-50/40 shadow-[0_2px_12px_rgba(201,168,76,0.15)]"
                          : "border-stone-200 bg-white hover:border-stone-300"}`}
                    >
                      {p.tag && (
                        <span className={`absolute -top-2.5 right-4 text-[10px] font-bold px-3 py-0.5 rounded-full text-white uppercase tracking-wide
                          ${p.tag === "Most Popular" ? "bg-amber-500" : "bg-[#1A3D2B]"}`}>
                          {p.tag}
                        </span>
                      )}

                      <div className="flex items-center gap-4">
                        <div className={`w-5 h-5 rounded-full border-2 flex items-center justify-center flex-shrink-0 transition-all duration-200
                          ${sel ? "border-[#C9A84C]" : "border-stone-300"}`}>
                          {sel && <div className="w-2.5 h-2.5 bg-[#C9A84C] rounded-full" />}
                        </div>
                        <div>
                          <p className={`text-sm font-bold tracking-tight ${sel ? "text-[#0D1F17]" : "text-stone-700"}`}>
                            {p.qty} Capsules · {p.duration}
                          </p>
                          <p className="text-xs text-stone-400 line-through mt-0.5">₹{p.orig.toLocaleString("en-IN")}</p>
                        </div>
                      </div>

                      <div className="text-right">
                        <p className={`text-base font-bold ${sel ? "text-[#0D1F17]" : "text-stone-800"}`}>
                          ₹{p.price.toLocaleString("en-IN")}
                        </p>
                        <span className={`text-[11px] font-bold ${sel ? "text-[#1A3D2B]" : "text-stone-400"}`}>
                          {pct}% off
                        </span>
                      </div>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* ── Pincode ── */}
            <div className="bg-white border border-stone-200 rounded-2xl p-5 mb-6 shadow-sm">
              <p className="text-[11px] font-black uppercase tracking-[0.22em] text-stone-500 mb-4">Check Delivery</p>
              <div className="flex gap-3">
                <input
                  type="text"
                  maxLength={6}
                  placeholder="Enter pincode"
                  value={pincode}
                  onChange={(e) => { setPincode(e.target.value.replace(/\D/g, "")); setPincodeMsg(null); }}
                  className="luxury-input flex-1 border-2 border-stone-200 rounded-xl px-4 py-3 text-sm font-medium focus:outline-none transition-all duration-200 bg-stone-50/50"
                />
                <button
                  onClick={checkPincode}
                  className="px-6 py-3 bg-[#1A3D2B] text-white text-sm font-bold rounded-xl hover:bg-[#0D1F17] transition-all duration-200 tracking-wide shadow-sm"
                >
                  Check
                </button>
              </div>
              {pincodeMsg && (
                <div className={`mt-3 rounded-xl p-4 ${pincodeMsg.type === "success" ? "bg-emerald-50 border border-emerald-200" : "bg-red-50 border border-red-200"}`}>
                  {pincodeMsg.type === "success" ? (
                    <div className="flex items-start gap-3">
                      <span className="text-xl">🚚</span>
                      <div>
                        <p className="text-sm font-bold text-emerald-800">{pincodeMsg.msg}</p>
                        <div className="flex items-center gap-2 mt-2">
                          <span className={`text-[10px] font-bold px-2.5 py-1 rounded-full text-white
                            ${pincodeMsg.days === 4 ? "bg-emerald-600" : pincodeMsg.days === 5 ? "bg-blue-600" : "bg-amber-500"}`}>
                            {pincodeMsg.days === 4 ? "⚡ Express" : "📦 Standard"}
                          </span>
                          <span className="text-[11px] text-emerald-600 font-medium">Free on orders ₹499+</span>
                        </div>
                      </div>
                    </div>
                  ) : (
                    <div className="flex items-center gap-2">
                      <span>⚠️</span>
                      <p className="text-sm font-semibold text-red-700">{pincodeMsg.msg}</p>
                    </div>
                  )}
                </div>
              )}
            </div>

            {/* ── Qty + CTA ── */}
           <div className="flex flex-col sm:flex-row gap-3 mb-6 w-full">

  {/* Qty Stepper */}
  <div className="flex items-center border-2 border-stone-200 rounded-xl overflow-hidden bg-white shadow-sm w-full sm:w-auto">
    <button
      onClick={() => setQty(q => Math.max(1, q - 1))}
      className="w-12 h-13 flex items-center justify-center text-stone-500 hover:bg-stone-50 transition-colors text-xl font-light px-3 py-3"
    >
      −
    </button>

    <span className="w-12 flex items-center justify-center text-sm font-bold text-stone-900 border-x-2 border-stone-200 py-3">
      {qty}
    </span>

    <button
      onClick={() => setQty(q => q + 1)}
      className="w-12 h-13 flex items-center justify-center text-stone-500 hover:bg-stone-50 transition-colors text-xl font-light px-3 py-3"
    >
      +
    </button>
  </div>

  {/* Add to Cart */}
  <button
    type="button"
    onClick={handleAddToCart}
    disabled={addMut.isPending}
    className="w-full sm:w-auto flex shim-btn items-center justify-center gap-2 px-6 py-3.5 text-white text-[13px] font-bold uppercase tracking-wider rounded-2xl transition-all duration-300 hover:-translate-y-1 active:translate-y-0"
    style={{ boxShadow: "0 12px 28px rgba(3,52,154,0.3)" }}
  >
    <svg
      className={`w-4.5 h-4.5 ${addMut.isPending ? 'animate-bounce' : ''}`}
      fill="none"
      stroke="currentColor"
      strokeWidth={2.5}
      viewBox="0 0 24 24"
    >
      <circle cx="9" cy="21" r="1" />
      <circle cx="20" cy="21" r="1" />
      <path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6" />
    </svg>
    {addMut.isPending ? "Adding…" : "Add to Cart"}
  </button>

  {/* Buy Now */}
  <button
    onClick={handleBuyNow}
    disabled={addMut.isPending}
    className="w-full sm:flex-1 gold-btn h-13 rounded-xl text-[#0D1F17] text-sm font-black tracking-[0.1em] uppercase transition-all duration-200 disabled:opacity-50 py-3"
  >
    Buy — ₹{total}
  </button>

</div>
{/* ── Offers For You — Horizontal ── */}
<div className="bg-white border border-stone-200 rounded-2xl overflow-hidden shadow-sm mb-6">

  {/* Header */}
  <div className="flex items-center justify-between px-5 py-3 bg-stone-50 border-b border-stone-100">
    <div className="flex items-center gap-2">
      <span className="w-2 h-2 rounded-full bg-[#C9A84C]" />
      <span className="text-[13px] font-bold tracking-wide text-stone-800">Offers For You</span>
    </div>
    <span className="text-[11px] font-semibold text-stone-500 bg-white border border-stone-200 px-3 py-1 rounded-full">
      2 available offers
    </span>
  </div>

  {/* Two cards side by side */}
  <div className="grid grid-cols-2 divide-x divide-stone-100">

    {/* Offer 1 — Online */}
    <div className="flex flex-col gap-3 p-5">
      <div className="flex flex-wrap gap-1.5">
        <span className="text-[10px] font-bold px-2.5 py-1 rounded-full bg-emerald-50 text-emerald-800 border border-emerald-200 tracking-wide">
          Extra ₹146 OFF
        </span>
        <span className="text-[10px] font-bold px-2.5 py-1 rounded-full bg-amber-50 text-amber-800 border border-amber-200 tracking-wide">
          BEST PRICE
        </span>
      </div>

      <div>
        <div className="flex items-baseline gap-2 mb-1">
          <span className="text-[26px] font-bold text-stone-900 leading-none">₹884</span>
          <span className="text-xs font-bold text-emerald-700">21% off</span>
        </div>
        <p className="text-[12px] text-stone-500 leading-snug">Pay Online, Enjoy 15% + Extra 5% Off!</p>
      </div>

      <div className="flex items-center gap-2">
        <span className="text-[11px] text-stone-400">Code</span>
        <code className="text-[11px] font-bold bg-stone-100 text-stone-700 px-2.5 py-1 rounded border border-dashed border-stone-300 tracking-widest">
          AAYU15
        </code>
      </div>

      <button className="mt-auto w-full py-2.5 bg-[#1A3D2B] text-white text-[12px] font-bold rounded-xl hover:bg-[#0D1F17] transition-all duration-200 tracking-wide">
        Use Now
      </button>
    </div>

    {/* Offer 2 — COD */}
    <div className="flex flex-col gap-3 p-5">
      <div className="flex flex-wrap gap-1.5">
        <span className="text-[10px] font-bold px-2.5 py-1 rounded-full bg-blue-50 text-blue-800 border border-blue-200 tracking-wide">
          Extra ₹100 OFF
        </span>
        <span className="text-[10px] font-bold px-2.5 py-1 rounded-full bg-amber-50 text-amber-800 border border-amber-200 tracking-wide">
          BEST PRICE
        </span>
      </div>

      <div>
        <div className="flex items-baseline gap-2 mb-1">
          <span className="text-[26px] font-bold text-stone-900 leading-none">₹930</span>
          <span className="text-xs font-bold text-emerald-700">17% off</span>
        </div>
        <p className="text-[12px] text-stone-500 leading-snug">On COD, Enjoy 15% Off!</p>
      </div>

      <div className="flex items-center gap-2">
        <span className="text-[11px] text-stone-400">Code</span>
        <code className="text-[11px] font-bold bg-stone-100 text-stone-700 px-2.5 py-1 rounded border border-dashed border-stone-300 tracking-widest">
          AAYU15
        </code>
      </div>

      <button className="mt-auto w-full py-2.5 bg-white border-2 border-stone-200 text-stone-700 text-[12px] font-bold rounded-xl hover:border-stone-400 hover:text-stone-900 transition-all duration-200 tracking-wide">
        Use Now
      </button>
    </div>

  </div>
</div>
            {/* Trust bar */}
            <div className="grid grid-cols-3 border border-stone-200 rounded-2xl overflow-hidden bg-white shadow-sm">
              {[
                { icon: "🚚", label: "Free Delivery", sub: "Orders ₹499+" },
                { icon: "↩️", label: "60-Day Returns", sub: "No questions asked" },
                { icon: "🔒", label: "Secure Payment", sub: "100% protected" },
              ].map(({ icon, label, sub }, i) => (
                <div key={label} className={`flex flex-col items-center gap-1.5 py-5 px-2 text-center ${i < 2 ? "border-r border-stone-200" : ""} hover:bg-stone-50 transition-colors`}>
                  <span className="text-2xl">{icon}</span>
                  <span className="text-xs font-bold text-stone-900 leading-tight tracking-tight">{label}</span>
                  <span className="text-[11px] text-stone-400 font-medium">{sub}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* ── Tabs Section ── */}
      <div className="max-w-[1440px] mx-auto px-4 sm:px-8 lg:px-16 py-12 font-body">
        {/* Section header */}
        <div className="flex items-center gap-4 mb-8 divider-ornament">
          <span className="text-[11px] font-black uppercase tracking-[0.25em] text-[#C9A84C] whitespace-nowrap px-3">Product Details</span>
        </div>

        <div className="space-y-3">
          {TABS.map(({ id, label, icon }) => (
            <div key={id} className="bg-white border border-stone-200 rounded-2xl overflow-hidden shadow-sm hover:shadow-md transition-shadow duration-200">
              <button
                onClick={() => toggleTab(id)}
                className="w-full flex justify-between items-center px-6 py-5 hover:bg-stone-50/50 transition-colors group"
              >
                <span className="flex items-center gap-3.5">
                  <span className="text-xl">{icon}</span>
                  <span className="text-[15px] font-bold text-[#0D1F17] tracking-tight group-hover:text-[#1A3D2B] transition-colors">{label}</span>
                </span>
                <span className={`w-7 h-7 rounded-full border-2 border-stone-200 flex items-center justify-center text-stone-400 transition-all duration-300 group-hover:border-[#C9A84C] group-hover:text-[#C9A84C] ${openTab === id ? "rotate-180 border-[#C9A84C] text-[#C9A84C] bg-amber-50" : ""}`}>
                  <svg className="w-3 h-3" fill="none" stroke="currentColor" strokeWidth={3} viewBox="0 0 24 24">
                    <path d="M19 9l-7 7-7-7" />
                  </svg>
                </span>
              </button>

              {openTab === id && (
                <div className="tab-content px-6 pb-7 pt-1 border-t border-stone-100">

                  {id === "description" && (
                    <div className="py-3 space-y-4">
                      <p className="text-[16px] text-stone-600 leading-relaxed">{product.productDescription}</p>
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mt-4">
                        {BENEFITS_LIST.map((b) => (
                          <div key={b.key} className="flex gap-3 p-4 rounded-xl bg-[#1A3D2B]/[0.04] border border-[#1A3D2B]/10 items-start">
                            <span className="text-lg flex-shrink-0">{b.icon}</span>
                            <div className="text-[14px] leading-relaxed text-stone-600">
                              <span className="font-bold text-[#0D1F17]">{b.key}: </span>
                              {b.val}
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}

                  {id === "ingredients" && currentIngredients && (
                    <div className="space-y-10 py-4">
                      {/* Summary */}
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        {currentIngredients.list.map((row) => (
                          <div key={row.key} className="p-5 rounded-2xl bg-[#0D1F17] border border-[#1A3D2B]">
                            <span className="font-black text-[#C9A84C] text-[10px] uppercase tracking-[0.2em] block mb-2">{row.key}</span>
                            <span className="text-[14px] text-white/70 font-medium leading-relaxed">{row.val}</span>
                          </div>
                        ))}
                      </div>

                      {/* Pills */}
                      <div className="flex flex-wrap gap-2.5">
                        {currentIngredients.pills.map((ing) => (
                          <span key={ing} className="px-4 py-2 rounded-full bg-stone-100 text-stone-700 border border-stone-200 text-[11px] font-bold uppercase tracking-wide hover:bg-[#1A3D2B] hover:text-white hover:border-[#1A3D2B] transition-all duration-200 cursor-default">
                            {ing}
                          </span>
                        ))}
                      </div>

                      {/* Zig-zag details */}
                      <div className="space-y-14">
                        {currentIngredients.details.map((item, index) => {
                          const [name, desc] = item.split(": ");
                          const isEven = index % 2 === 0;
                          const img = INGREDIENT_IMAGES[index % INGREDIENT_IMAGES.length];
                          return (
                            <div key={index} className={`ingredient-card flex flex-col ${isEven ? 'md:flex-row' : 'md:flex-row-reverse'} items-center gap-10 lg:gap-16`}>
                              <div className="w-full md:w-1/2 overflow-hidden rounded-[2rem] shadow-xl aspect-[4/3]">
                                <img src={img} alt={name} className="w-full h-full object-cover" />
                              </div>
                              <div className="w-full md:w-1/2 space-y-4">
                                <p className="text-[#C9A84C] font-black text-[10px] uppercase tracking-[0.25em]">Key Ingredient</p>
                                <h3 className="font-display text-4xl font-bold text-[#0D1F17]">{name}</h3>
                                <div className="w-16 h-0.5 bg-gradient-to-r from-[#C9A84C] to-[#1A3D2B] rounded-full" />
                                <p className="text-[16px] text-stone-600 leading-relaxed">{desc}</p>
                              </div>
                            </div>
                          );
                        })}
                      </div>
                    </div>
                  )}

                  {id === "warning" && (
                    <div className="space-y-3 py-3">
                      {WARNING_LIST.map((row) => (
                        <div key={row.key} className="flex gap-3 p-4 rounded-xl bg-amber-50/60 border border-amber-100">
                          <span className="text-amber-500 flex-shrink-0 text-sm mt-0.5">⚠</span>
                          <div className="text-sm">
                            <span className="font-bold text-stone-800">{row.key}: </span>
                            <span className="text-stone-600">{row.val}</span>
                          </div>
                        </div>
                      ))}
                      <p className="text-sm font-semibold text-amber-700 bg-amber-50 border border-amber-200 rounded-xl p-4 mt-4">
                        ⚠ Always consult a qualified healthcare provider before use. Not intended to diagnose or treat any disease.
                      </p>
                    </div>
                  )}

                  {id === "howToUse" && (
                    <div className="space-y-3 py-3">
                      {[
                        { step: "01", title: "Morning Routine", desc: "Take 2 capsules with warm water or milk every morning after breakfast.", icon: "☀️" },
                        { step: "02", title: "Consistency is Key", desc: "Use daily for a minimum of 8 weeks to see optimal benefits.", icon: "📅" },
                        { step: "03", title: "Stay Hydrated", desc: "Drink at least 2–3 litres of water daily while taking this supplement.", icon: "💧" },
                        { step: "04", title: "Proper Storage", desc: "Store in a cool, dry place away from direct sunlight. Keep lid tightly closed.", icon: "🏠" },
                      ].map((item) => (
                        <div key={item.step} className="flex gap-5 p-5 rounded-xl bg-stone-50 border border-stone-100 hover:border-[#C9A84C]/30 transition-colors group">
                          <div className="flex flex-col items-center gap-1">
                            <span className="text-2xl">{item.icon}</span>
                            <span className="font-display text-[11px] font-bold text-[#C9A84C] tracking-widest">{item.step}</span>
                          </div>
                          <div>
                            <p className="font-bold text-[#0D1F17] text-sm mb-1 tracking-tight">{item.title}</p>
                            <p className="text-sm text-stone-500 leading-relaxed">{item.desc}</p>
                          </div>
                        </div>
                      ))}
                    </div>
                  )}

                  {id === "reviews" && (
                    <div className="space-y-4 py-3">
                      {REVIEWS.map((r, i) => (
                        <div key={i} className="p-5 rounded-xl bg-stone-50 border border-stone-100 hover:border-[#C9A84C]/20 transition-colors">
                          <div className="flex items-start gap-4 mb-3">
                            <div className="w-10 h-10 rounded-full bg-gradient-to-br from-[#1A3D2B] to-[#2A5C40] text-white text-sm font-bold flex items-center justify-center flex-shrink-0 shadow-sm font-display">
                              {r.initial}
                            </div>
                            <div className="flex-1">
                              <div className="flex items-center gap-3 flex-wrap">
                                <p className="font-bold text-stone-900 text-sm tracking-tight">{r.name}</p>
                                {r.verified && (
                                  <span className="text-[10px] font-bold text-[#1A3D2B] bg-emerald-50 border border-emerald-200 px-2.5 py-0.5 rounded-full">✓ Verified Purchase</span>
                                )}
                              </div>
                              <div className="flex items-center gap-2 mt-1">
                                <StarRow rating={r.rating} size="text-xs" />
                                <span className="text-[11px] text-stone-400 font-medium">{r.date}</span>
                              </div>
                            </div>
                          </div>
                          <p className="text-sm text-stone-600 leading-relaxed">{r.text}</p>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              )}
            </div>
          ))}
        </div>
      </div>

      <ReviewSection />
      <FAQ productName={product.productName} />
      <RelatedProduct />
    </div>
  );
}