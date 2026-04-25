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
import { FaTruck, FaShieldAlt, FaLeaf, FaStar, FaCheck, FaChevronDown, FaHeart, FaShare, FaFire } from "react-icons/fa";
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

const buildPacks = (product) => {
  if (Array.isArray(product?.priceTiers) && product.priceTiers.length > 0) {
    return product.priceTiers.map(tier => ({
      qty: parseInt(tier.quantity),
      price: Math.round(parseFloat(tier.finalPrice || tier.price)),
      orig: Math.round(parseFloat(tier.price)),
      perUnit: parseFloat(tier.finalPrice || tier.price) / parseInt(tier.quantity),
      tag: tier.label,
      duration: tier.label || `${tier.quantity} Capsules`,
      desc: tier.label ? `${tier.quantity} Capsules pack` : "Quality supplement"
    }));
  }

  const fp = parseFloat(product?.finalPrice || 0);
  const op = parseFloat(product?.price || 0);
  return [
    { qty: 30, price: Math.round(fp * 0.75), orig: Math.round(op * 0.75), perUnit: (fp * 0.75) / 30, tag: null, duration: "1 Month", desc: "Starter pack" },
    { qty: 60, price: Math.round(fp * 1.35), orig: Math.round(op * 1.35), perUnit: (fp * 1.35) / 60, tag: "Best Value", duration: "2 Months", desc: "Most savings" },
    { qty: 90, price: Math.round(fp * 1.9), orig: Math.round(op * 1.9), perUnit: (fp * 1.9) / 90, tag: "Most Popular", duration: "3 Months", desc: "Best results" },
  ];
};

const TABS = [
  { id: "description", label: "Description", icon: "📋" },
  { id: "ingredients", label: "Ingredients", icon: "🌿" },
  { id: "warning", label: "Warnings", icon: "⚠️" },
  { id: "howToUse", label: "How to Use", icon: "📖" },
  { id: "beforeAfter", label: "Before & After", icon: "📸" },
  { id: "reviews", label: "Reviews", icon: "⭐" },
];

const StarRow = ({ rating, size = "text-sm" }) => (
  <div className="flex gap-0.5">
    {[1, 2, 3, 4, 5].map((i) => (
      <span key={i} className={`${size} leading-none ${i <= Math.round(rating) ? "text-amber-400" : "text-stone-200"}`}>★</span>
    ))}
  </div>
);

const RatingBar = ({ label, value }) => (
  <div className="flex items-center gap-3 text-sm">
    <span className="text-stone-500 w-12 shrink-0">{label}</span>
    <div className="flex-1 h-2 bg-stone-100 rounded-full overflow-hidden">
      <div className="h-full rounded-full bg-gradient-to-r from-[#0337a4] to-[#c9643a]" style={{ width: `${value}%` }} />
    </div>
    <span className="text-stone-600 font-semibold w-8 text-right">{Math.round(value)}%</span>
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
  const [zoomPos, setZoomPos] = useState(null);
  const [openTab, setOpenTab] = useState("description");
  const [pincode, setPincode] = useState("");
  const [pincodeMsg, setPincodeMsg] = useState(null);
  const [isExpanded, setIsExpanded] = useState(false);

  const productId = useParams().id;
  const navigate = useNavigate();
  const qc = useQueryClient();

  // ── Dynamic Content ──────────────────────────────────────────────────────────
  const productContent = product?.content;
  const benefits = productContent?.benefits?.length > 0 ? productContent.benefits : BENEFITS_LIST;
  const warnings = productContent?.warnings?.length > 0 ? productContent.warnings : WARNING_LIST;
  const howToUse = productContent?.howToUse?.length > 0 ? productContent.howToUse : [
    { step: "01", title: "Morning Routine", desc: "Take 2 capsules with warm water or milk every morning after breakfast.", icon: "☀️" },
    { step: "02", title: "Stay Consistent", desc: "Use daily for a minimum of 8 weeks for optimal benefits.", icon: "📅" },
    { step: "03", title: "Stay Hydrated", desc: "Drink at least 2–3 litres of water daily while taking this supplement.", icon: "💧" },
    { step: "04", title: "Proper Storage", desc: "Store in a cool, dry place away from direct sunlight.", icon: "🏠" },
  ];
  
  const ingredients = productContent?.ingredients?.list?.length > 0 ? productContent.ingredients : PRODUCT_INGREDIENTS[product?.productName] || { list: [], pills: [], details: [] };
  const beforeAfter = productContent?.beforeAfter || [];

  const addMut = useMutation({
    mutationFn: addToCart,
    onSuccess: () => { qc.invalidateQueries({ queryKey: ["cart"] }); toast.success("Added to cart!"); },
    onError: (err) => {
      if (err.response?.status === 401) { toast.error("Please login first."); navigate('/login'); }
      else toast.error("Failed to add to cart.");
    }
  });

  const handleAddToCart = () => {
    if (!localStorage.getItem("token")) { toast.error("Please login first."); navigate('/login'); return; }
    addMut.mutate({ productId, quantity: qty });
  };

  const handleBuyNow = () => {
    if (!localStorage.getItem("token")) { toast.error("Please login first."); navigate("/login"); return; }
    addMut.mutate({ productId, quantity: qty }, {
      onSuccess: () => { qc.invalidateQueries({ queryKey: ["cart"] }); navigate("/checkout"); }
    });
  };

  const toggleTab = (id) => setOpenTab(openTab === id ? null : id);

  useEffect(() => { window.scrollTo(0, 0); }, []);

  useEffect(() => {
    (async () => {
      try {
        setLoading(true);
        const res = await axiosInstance.get(`/product/getProductById/${productId}`);
        setProduct(res?.data?.data);
      } catch (e) { console.error(e); } finally { setLoading(false); }
    })();
  }, [productId]);

  const IMAGES = product?.productImages || [];
  const PACKS = product ? buildPacks(product) : [];
  const pack = PACKS[packIdx] ?? {};
  const discPct = pack.orig ? Math.round(((pack.orig - pack.price) / pack.orig) * 100) : 0;
  const saving = pack.orig ? pack.orig - pack.price : 0;
  const total = pack.price ? (pack.price * qty).toLocaleString("en-IN") : "0";
  const productTags = product?.productTags ?? [];
  const offerTags = product?.offerTags ?? [];

  const swapImg = (i) => { setImgFade(true); setTimeout(() => { setActiveImg(i); setImgFade(false); }, 150); };

  const handleMouseMove = (e) => {
    const { left, top, width, height } = e.currentTarget.getBoundingClientRect();
    setZoomPos({ x: ((e.clientX - left) / width) * 100, y: ((e.clientY - top) / height) * 100 });
  };

  const checkPincode = () => {
    if (pincode.length !== 6) { setPincodeMsg({ type: "error", msg: "Enter a valid 6-digit pincode." }); return; }
    const state = pincodeData[pincode];
    if (!state) { setPincodeMsg({ type: "error", msg: "Sorry, delivery is not available to this pincode." }); return; }
    const FAST_STATES = ["TAMIL NADU"];
    const MEDIUM_STATES = ["KERALA", "KARNATAKA", "ANDHRA PRADESH", "TELANGANA"];
    const days = FAST_STATES.includes(state) ? 4 : MEDIUM_STATES.includes(state) ? 5 : 7;
    const deliveryDate = new Date();
    deliveryDate.setDate(deliveryDate.getDate() + days);
    const formattedDate = deliveryDate.toLocaleDateString("en-IN", { weekday: "short", month: "short", day: "numeric" });
    const stateName = state.split(" ").map((w) => w.charAt(0) + w.slice(1).toLowerCase()).join(" ");
    setPincodeMsg({ type: "success", msg: `Delivery to ${stateName} by ${formattedDate}`, days, stateName });
  };

  if (loading) return (
    <div className="min-h-screen flex items-center justify-center bg-[#f8f7f4]">
      <div className="flex flex-col items-center gap-5">
        <div className="relative w-16 h-16">
          <div className="absolute inset-0 rounded-full border-[3px] border-[#0337a4]/20" />
          <div className="absolute inset-0 rounded-full border-[3px] border-transparent border-t-[#0337a4] animate-spin" />
          <div className="absolute inset-3 rounded-full border-[2px] border-transparent border-t-[#c9643a] animate-spin" style={{ animationDirection: "reverse", animationDuration: "0.7s" }} />
        </div>
        <p className="text-sm font-semibold text-[#0337a4] tracking-[0.3em] uppercase">Loading…</p>
      </div>
    </div>
  );

  if (!product) return (
    <div className="min-h-screen flex items-center justify-center bg-[#f8f7f4]">
      <p className="text-stone-500 font-medium">Product not found.</p>
    </div>
  );

  return (
    <div className="min-h-screen text-stone-900" style={{ backgroundColor: "#f8f7f4",}}>

      <style>{`


        * { box-sizing: border-box; }

        :root {
          --blue: #0337a4;
          --orange: #c9643a;
          --blue-light: #e8edf8;
          --orange-light: #faf0eb;
          --dark: #0d1219;
          --surface: #ffffff;
          --surface2: #f8f7f4;
          --border: #e8e5e0;
          --text-muted: #7a7570;
        }

        @keyframes fadeSlideUp {
          from { opacity: 0; transform: translateY(20px); }
          to { opacity: 1; transform: translateY(0); }
        }
        @keyframes fadeIn { from { opacity: 0; } to { opacity: 1; } }
        @keyframes pulseDot { 0%,100%{opacity:1;transform:scale(1)} 50%{opacity:.5;transform:scale(1.4)} }
        @keyframes shimmerBtn {
          0% { background-position: 200% center; }
          100% { background-position: -200% center; }
        }
        @keyframes ticker { 0% { transform: translateX(0); } 100% { transform: translateX(-50%); } }
        @keyframes scaleIn { from{transform:scale(.95);opacity:0} to{transform:scale(1);opacity:1} }

        .animate-fadeSlideUp { animation: fadeSlideUp 0.5s ease forwards; }
        .animate-fadeIn { animation: fadeIn 0.3s ease; }
        .pulse-dot { animation: pulseDot 2s ease-in-out infinite; }

        .btn-primary {
          background: linear-gradient(135deg, #0337a4 0%, #0549d4 50%, #0337a4 100%);
          background-size: 200% auto;
          animation: shimmerBtn 4s linear infinite;
          box-shadow: 0 4px 20px rgba(3,55,164,0.35);
          color: white;
          font-weight: 700;
          letter-spacing: 0.05em;
          transition: box-shadow 0.2s, transform 0.2s;
        }
        .btn-primary:hover { box-shadow: 0 8px 32px rgba(3,55,164,0.5); transform: translateY(-2px); }
        .btn-primary:active { transform: translateY(0); }

        .btn-accent {
          background: linear-gradient(135deg, #c9643a 0%, #e07a4d 50%, #c9643a 100%);
          background-size: 200% auto;
          animation: shimmerBtn 4s linear infinite;
          box-shadow: 0 4px 20px rgba(201,100,58,0.35);
          color: white;
          font-weight: 700;
          letter-spacing: 0.05em;
          transition: box-shadow 0.2s, transform 0.2s;
        }
        .btn-accent:hover { box-shadow: 0 8px 32px rgba(201,100,58,0.5); transform: translateY(-2px); }
        .btn-accent:active { transform: translateY(0); }

        .pack-card { transition: all 0.25s cubic-bezier(0.4,0,0.2,1); }
        .pack-card:hover { transform: translateY(-2px); box-shadow: 0 8px 24px rgba(3,55,164,0.12); }

        .scrollbar-hide::-webkit-scrollbar { display: none; }
        .scrollbar-hide { -ms-overflow-style: none; scrollbar-width: none; }

        .ticker-wrap { overflow: hidden; }
        .ticker-content { display: flex; animation: ticker 20s linear infinite; white-space: nowrap; }

        .tab-open { animation: scaleIn 0.25s ease; }

        .zoom-container { position: relative; overflow: hidden; }

        .glass-card {
          background: rgba(255,255,255,0.85);
          backdrop-filter: blur(12px);
          -webkit-backdrop-filter: blur(12px);
          border: 1px solid rgba(255,255,255,0.6);
        }

        .product-image {
          transition: opacity 0.15s ease, transform 0.1s ease;
        }

        .offer-gradient {
          background: linear-gradient(135deg, #0337a4 0%, #1a4fc4 40%, #c9643a 100%);
        }

        .trust-icon {
          width: 44px; height: 44px; border-radius: 12px; display: flex; align-items: center; justify-content: center;
        }
      `}</style>

      {/* ── Top Ticker Banner ── */}
      <div className="bg-[#0337a4] text-white py-2.5 overflow-hidden">
        <div className="ticker-wrap">
          <div className="ticker-content text-xs font-semibold tracking-widest uppercase gap-16">
            {[...Array(6)].map((_, i) => (
              <span key={i} className="flex items-center gap-16 shrink-0">
                <span className="flex items-center gap-2"><span className="text-[#c9643a]">✦</span> Free Delivery on ₹499+</span>
                <span className="flex items-center gap-2"><span className="text-[#c9643a]">✦</span> 100% Natural Ingredients</span>
                <span className="flex items-center gap-2"><span className="text-[#c9643a]">✦</span> Clinically Tested Formula</span>
                <span className="flex items-center gap-2"><span className="text-[#c9643a]">✦</span> Trusted by 1 Lakh+ Customers</span>
                <span className="flex items-center gap-2"><span className="text-[#c9643a]">✦</span> 60-Day Money Back Guarantee</span>
              </span>
            ))}
          </div>
        </div>
      </div>

      {/* ── Breadcrumb ── */}
      <nav className="bg-white border-b border-stone-100 px-4 sm:px-8 lg:px-16">
        <div className="max-w-[1440px] mx-auto flex items-center gap-2 py-3.5">
          {["Home", product.forWhom ?? "Products"].map((c, i) => (
            <span key={c} className="flex items-center gap-2">
              <a href="#" className="text-sm text-stone-400 hover:text-[#0337a4] transition-colors font-medium">{c}</a>
              <span className="text-stone-300 text-xs">›</span>
            </span>
          ))}
          <span className="text-sm font-semibold text-[#0337a4] truncate max-w-[200px]">{product.productName}</span>
        </div>
      </nav>

      <div className="max-w-[1440px] mx-auto px-4 sm:px-8 lg:px-16 pt-10 pb-12">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-16 items-start">

          {/* ════ LEFT — Gallery ════ */}
          <div className="lg:sticky lg:top-6 flex flex-col gap-4">

            {/* Main Image Card */}
            <div className="relative rounded-3xl overflow-hidden bg-white shadow-[0_4px_40px_rgba(0,0,0,0.08)] border border-stone-100/80">

              {/* Action buttons */}
              <div className="absolute top-4 right-4 z-20 flex flex-col gap-2">
                <button
                  onClick={() => setWishlisted(w => !w)}
                  className={`w-10 h-10 rounded-full flex items-center justify-center shadow-md transition-all duration-300 border
                    ${wishlisted
                      ? "bg-rose-500 border-rose-500 text-white scale-110"
                      : "bg-white border-stone-200 text-stone-400 hover:border-rose-400 hover:text-rose-500"}`}
                >
                  <FaHeart className="w-4 h-4" />
                </button>
                <button className="w-10 h-10 rounded-full bg-white border border-stone-200 flex items-center justify-center shadow-md text-stone-400 hover:border-[#0337a4] hover:text-[#0337a4] transition-all duration-200">
                  <FaShare className="w-3.5 h-3.5" />
                </button>
              </div>

              {/* Discount badge */}
              {discPct > 0 && (
                <div className="absolute top-4 left-4 z-20">
                  <div className="bg-[#c9643a] text-white text-[13px] font-bold px-3.5 py-1.5 rounded-full shadow-lg tracking-wide">
                    {discPct}% OFF
                  </div>
                </div>
              )}
              {offerTags.length > 0 && (
                <div className="absolute top-12 left-4 z-20 mt-1">
                  <div className="bg-[#0337a4] text-white text-[11px] font-bold px-3 py-1.5 rounded-full shadow tracking-wider uppercase">
                    {offerTags[0]}
                  </div>
                </div>
              )}

              {/* Image with zoom */}
              <div
                className="zoom-container cursor-crosshair"
                onMouseMove={handleMouseMove}
                onMouseLeave={() => setZoomPos(null)}
              >
                {IMAGES.length > 0 ? (
                  <img
                    src={IMAGES[activeImg]?.url}
                    alt={product.productName}
                    style={zoomPos ? {
                      transformOrigin: `${zoomPos.x}% ${zoomPos.y}%`,
                      transform: "scale(2.2)",
                      transition: "transform 0.1s ease"
                    } : { transform: "scale(1)", transition: "transform 0.3s ease" }}
                    className={`product-image w-full h-[520px] sm:h-[580px] object-cover ${imgFade ? "opacity-0" : "opacity-100"}`}
                  />
                ) : (
                  <div className="w-full h-[520px] flex items-center justify-center text-stone-300 bg-stone-50">No image</div>
                )}
              </div>

              {/* Stock indicator */}
              <div className="absolute bottom-4 left-4 z-20">
                <div className="flex items-center gap-2.5 bg-white/95 backdrop-blur-md rounded-full px-4 py-2 shadow-md border border-stone-100">
                  <span className="w-2 h-2 rounded-full bg-emerald-400 pulse-dot shrink-0" />
                  <span className="text-xs font-bold text-stone-700 tracking-wide">Only 14 left</span>
                </div>
              </div>

              {/* Trending badge */}
              <div className="absolute bottom-4 right-4 z-20">
                <div className="flex items-center gap-1.5 bg-[#0337a4]/10 backdrop-blur-sm rounded-full px-3 py-2 border border-[#0337a4]/20">
                  <FaFire className="text-[#c9643a] w-3 h-3" />
                  <span className="text-xs font-bold text-[#0337a4]">Trending</span>
                </div>
              </div>
            </div>

            {/* Thumbnails */}
            {IMAGES.length > 1 && (
              <div className="flex gap-2.5 overflow-x-auto pb-0.5 scrollbar-hide">
                {IMAGES.map((src, i) => (
                  <button
                    key={i}
                    onClick={() => swapImg(i)}
                    className={`shrink-0 w-[72px] h-[72px] rounded-2xl overflow-hidden border-2 transition-all duration-200
                      ${activeImg === i
                        ? "border-[#0337a4] shadow-[0_0_0_3px_rgba(3,55,164,0.15)] opacity-100"
                        : "border-stone-200 opacity-60 hover:opacity-90 hover:border-stone-300"}`}
                  >
                    <img src={src?.url} alt={`view ${i + 1}`} className="w-full h-full object-cover" />
                  </button>
                ))}
              </div>
            )}

            {/* Clinically Tested strip */}
            <div className="grid grid-cols-4 gap-2">
              {[
                { val: "100%", label: "Natural" },
                { val: "1L+", label: "Happy Customers" },
                { val: "8+", label: "Herbs" },
                { val: "GMP", label: "Certified" },
              ].map(({ val, label }) => (
                <div key={label} className="bg-white border border-stone-100 rounded-2xl p-3 text-center shadow-sm hover:shadow-md transition-shadow">
                  <p className="text-lg font-extrabold text-[#0337a4] leading-tight">{val}</p>
                  <p className="text-[10px] text-stone-500 font-semibold uppercase tracking-wider mt-0.5 leading-tight">{label}</p>
                </div>
              ))}
            </div>

            {/* Offers */}
            <div className="bg-white rounded-2xl border border-stone-100 p-4 shadow-sm">
              <p className="text-[15px] font-extrabold uppercase tracking-[0.25em] text-[#0337a4] mb-3 flex items-center gap-2">
                <span className="w-5 h-px bg-[#0337a4]" /> Available Offers
              </p>
              <div className="flex gap-2.5 overflow-x-auto pb-0.5 scrollbar-hide">
                {OFFERS.map(({ icon, title, body }) => (
                  <div key={title} className="shrink-0 min-w-[130px] border border-stone-100 rounded-xl p-3 hover:border-[#0337a4]/20 hover:bg-blue-50/30 transition-all group cursor-default">
                    <div className="w-8 h-8 bg-gradient-to-br from-[#0337a4] to-[#1a4fc4] rounded-lg flex items-center justify-center text-sm mb-2 shadow-sm group-hover:scale-110 transition-transform">
                      {icon}
                    </div>
                    <p className="text-[15px] font-bold text-stone-900 mb-0.5">{title}</p>
                    <p className="text-[13px] text-stone-700 leading-tight">{body}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* ════ RIGHT — Product Info ════ */}
          <div className="flex flex-col animate-fadeSlideUp">

            {/* Category */}
            {product.forWhom && (
              <div className="flex items-center gap-2 mb-3">
                <span className="h-px w-6 bg-[#c9643a]" />
                <span className="text-[11px] font-extrabold uppercase tracking-[0.25em] text-[#c9643a]">{product.forWhom}</span>
              </div>
            )}

            {/* Product Name */}
            <h1
              className="text-[36px] sm:text-[44px] lg:text-[52px] font-bold leading-[1.1] text-stone-900 mb-3">
              {product.productName}
            </h1>

            {/* Ratings Row */}
            <div className="flex items-center flex-wrap gap-3 mb-4">
              <div className="flex items-center gap-2 bg-amber-50 border border-amber-200/80 rounded-xl px-3.5 py-2">
                <StarRow rating={4.7} size="text-base" />
                <span className="text-sm font-extrabold text-amber-800">4.7</span>
                <span className="text-xs text-amber-500 font-semibold">(1,248)</span>
              </div>
              <div className="flex items-center gap-1.5 text-xs font-semibold text-emerald-700 bg-emerald-50 border border-emerald-200/80 rounded-xl px-3 py-2">
                <FaCheck className="w-3 h-3" /> 98% Recommend
              </div>
              <button className="text-xs font-bold text-[#0337a4] underline underline-offset-2 hover:text-[#c9643a] transition-colors">
                Read reviews →
              </button>
            </div>

            {/* Tags */}
            {productTags.length > 0 && (
              <div className="flex flex-wrap gap-1.5 mb-4">
                {productTags.slice(0, 4).map((tag) => (
                  <span key={tag} className="text-[11px] font-bold px-3 py-1.5 rounded-full border border-[#0337a4]/20 bg-[#0337a4]/5 text-[#0337a4] uppercase tracking-wide">
                    {tag}
                  </span>
                ))}
              </div>
            )}

            {/* Description */}
            {product.productDescription && (
              <div className="mb-5 pl-4 border-l-2 border-[#c9643a]/30">
                <div className={`text-[16px] text-stone-600 leading-relaxed ${!isExpanded ? "line-clamp-2" : ""}`}>
                  {product.productDescription}
                </div>
                {isExpanded && (
                  <div className="mt-4 space-y-2.5 animate-fadeIn">
                    <p className="text-[16px] font-extrabold uppercase tracking-[0.25em] text-[#c9643a] mb-2">Key Benefits</p>
                    {benefits.map((b, idx) => (
                      <div key={idx} className="flex gap-3 p-3.5 rounded-xl bg-stone-50 border border-stone-100 hover:border-[#0337a4]/20 transition-colors">
                        <span className="text-base shrink-0">{b.icon}</span>
                        <div className="text-[16px] leading-relaxed text-stone-600">
                          <span className="font-bold text-stone-900">{b.key}: </span>{b.val}
                        </div>
                      </div>
                    ))}
                  </div>
                )}
                <button
                  onClick={() => setIsExpanded(!isExpanded)}
                  className="mt-2.5 text-[11px] font-extrabold uppercase tracking-[0.2em] text-[#0337a4] hover:text-[#c9643a] transition-colors flex items-center gap-1.5"
                >
                  {isExpanded ? "Show Less" : "Read More"}
                  <FaChevronDown className={`w-2.5 h-2.5 transition-transform duration-300 ${isExpanded ? "rotate-180" : ""}`} />
                </button>
              </div>
            )}

            {/* Divider */}
            <div className="flex items-center gap-3 my-1">
              <div className="flex-1 h-px bg-gradient-to-r from-transparent via-stone-200 to-stone-200" />
              <span className="text-stone-300 text-xs">◆</span>
              <div className="flex-1 h-px bg-gradient-to-l from-transparent via-stone-200 to-stone-200" />
            </div>

            {/* Stock + Social Proof */}
            <div className="flex items-center gap-2.5 flex-wrap my-3">
              <div className="flex items-center gap-2 text-xs font-bold text-emerald-700 bg-emerald-50 border border-emerald-200 rounded-full px-3.5 py-2">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 pulse-dot" /> In Stock
              </div>
              <div className="flex items-center gap-2 text-xs font-bold text-[#c9643a] bg-orange-50 border border-orange-200 rounded-full px-3.5 py-2">
                <HiOutlineTrendingUp className="w-3.5 h-3.5" /> 300+ sold this month
              </div>
            </div>

            {/* ── Price Card ── */}
            <div className="bg-[#0d1219] rounded-2xl p-5 mb-5 shadow-[0_8px_32px_rgba(3,55,164,0.25)]">
              <div className="flex items-start justify-between mb-2">
                <span className="text-[15px] font-extrabold uppercase  text-white">Your Price</span>
                {saving > 0 && (
                  <span className="text-[15px] font-bold px-3 py-1 rounded-full bg-[#c9643a]/20 text-[#c9643a] border border-[#c9643a]/30">
                    Save ₹{saving.toLocaleString("en-IN")} 🎉
                  </span>
                )}
              </div>
              <div className="flex items-end gap-3 flex-wrap mb-1">
                <span className="text-[42px] sm:text-[52px] font-extrabold text-white leading-none tracking-tight">
                  ₹{pack.price?.toLocaleString("en-IN") ?? parseFloat(product.finalPrice).toLocaleString("en-IN")}
                </span>
                <div className="mb-2">
                  <span className="text-[15px] text-white line-through font-medium block">
                    ₹{pack.orig?.toLocaleString("en-IN") ?? parseFloat(product.price).toLocaleString("en-IN")}
                  </span>
                  {discPct > 0 && (
                    <span className="text-[15px] font-bold text-[#c9643a] uppercase tracking-wide">{discPct}% off</span>
                  )}
                </div>
              </div>
              <p className="text-[15px] text-white font-medium">Inclusive of all taxes · Free delivery on ₹999+</p>
            </div>

            {/* ── Pack Selector ── */}
            <div className="mb-5">
              <p className="text-[15px] font-extrabold uppercase tracking-[0.25em] text-[#0337a4] mb-3">Choose Your Pack</p>
              <div className="flex flex-col gap-2">
                {PACKS.map((p, i) => {
                  const pct = Math.round(((p.orig - p.price) / p.orig) * 100);
                  const sel = packIdx === i;
                  return (
                    <button
                      key={i}
                      onClick={() => setPackIdx(i)}
                      className={`pack-card relative w-full flex items-center justify-between p-4 rounded-2xl border-2 text-left transition-all
                        ${sel
                          ? "border-[#0337a4] bg-[#0337a4]/[0.04] shadow-[0_4px_16px_rgba(3,55,164,0.12)]"
                          : "border-stone-200 bg-white hover:border-stone-300"}`}
                    >
                      {p.tag && (
                        <span className={`absolute -top-2.5 right-4 text-[10px] font-extrabold px-3 py-0.5 rounded-full text-white uppercase tracking-wider shadow
                          ${p.tag === "Most Popular" ? "bg-[#c9643a]" : "bg-[#0337a4]"}`}>
                          {p.tag}
                        </span>
                      )}
                      <div className="flex items-center gap-3.5">
                        <div className={`w-4.5 h-4.5 rounded-full border-2 flex items-center justify-center shrink-0 transition-all
                          ${sel ? "border-[#0337a4]" : "border-stone-300"}`}>
                          {sel && <div className="w-2 h-2 bg-[#0337a4] rounded-full" />}
                        </div>
                        <div>
                          <p className={`text-[14px] font-extrabold tracking-tight ${sel ? "text-[#0337a4]" : "text-stone-800"}`}>
                            {p.qty} Capsules · {p.duration}
                          </p>
                          <p className="text-[11px] text-stone-400 font-semibold mt-0.5">{p.desc}</p>
                        </div>
                      </div>
                      <div className="text-right">
                        <p className={`text-[24px] font-extrabold tracking-tight leading-none ${sel ? "text-[#0337a4]" : "text-stone-800"}`}>
                          ₹{p.price.toLocaleString("en-IN")}
                        </p>
                        <div className="flex items-center gap-1.5 justify-end mt-1">
                          <span className="text-[11px] text-stone-400 line-through">₹{p.orig.toLocaleString("en-IN")}</span>
                          <span className={`text-[11px] font-bold ${sel ? "text-[#c9643a]" : "text-stone-400"}`}>{pct}% off</span>
                        </div>
                      </div>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* ── Pincode Checker ── */}
            <div className="bg-white border border-stone-200 rounded-2xl p-4 mb-5 shadow-sm">
              <div className="flex items-center justify-between mb-3.5">
                <p className="text-[15px] font-extrabold uppercase tracking-[0.25em] text-[#0337a4] flex items-center gap-2">
                  <FaTruck className="text-[#0337a4]" /> Check Delivery
                </p>
                <button
                  onClick={() => navigate("/shipping-policy")}
                  className="text-[10px] font-bold text-[#c9643a] border border-[#c9643a]/30 px-2.5 py-1.5 rounded-lg hover:bg-orange-50 transition-colors uppercase tracking-wider"
                >
                  Shipping Policy
                </button>
              </div>
              <div className="flex gap-2.5">
                <input
                  type="text"
                  maxLength={6}
                  placeholder="Enter 6-digit pincode"
                  value={pincode}
                  onChange={(e) => { setPincode(e.target.value.replace(/\D/g, "")); setPincodeMsg(null); }}
                  className="flex-1 border-2 border-stone-200 rounded-xl px-4 py-3 text-[14px] font-semibold focus:outline-none focus:border-[#0337a4] focus:ring-3 focus:ring-[#0337a4]/10 transition-all bg-stone-50/50 placeholder:text-stone-300 placeholder:font-normal"
                />
                <button
                  onClick={checkPincode}
                  className="px-5 py-3 bg-[#0337a4] text-white text-[13px] font-bold rounded-xl hover:bg-[#0228a4] transition-all tracking-wide shadow-sm hover:shadow-md active:scale-95"
                >
                  Check
                </button>
              </div>
              {pincodeMsg && (
                <div className={`mt-3 rounded-xl p-3.5 animate-fadeIn ${pincodeMsg.type === "success" ? "bg-emerald-50 border border-emerald-200" : "bg-red-50 border border-red-200"}`}>
                  {pincodeMsg.type === "success" ? (
                    <div className="flex items-start gap-2.5">
                      <span className="text-lg">🚚</span>
                      <div>
                        <p className="text-[13px] font-bold text-emerald-800">{pincodeMsg.msg}</p>
                        <div className="flex items-center gap-2 mt-1.5">
                          <span className={`text-[10px] font-extrabold px-2.5 py-1 rounded-full text-white tracking-wide
                            ${pincodeMsg.days <= 4 ? "bg-emerald-600" : pincodeMsg.days <= 5 ? "bg-[#0337a4]" : "bg-[#c9643a]"}`}>
                            {pincodeMsg.days <= 4 ? "⚡ Express" : "📦 Standard"}
                          </span>
                          <span className="text-[11px] text-emerald-600 font-semibold">Free on ₹499+</span>
                        </div>
                      </div>
                    </div>
                  ) : (
                    <p className="text-[13px] font-semibold text-red-700 flex items-center gap-2">⚠️ {pincodeMsg.msg}</p>
                  )}
                </div>
              )}
            </div>

            {/* ── Qty + CTA ── */}
            <div className="flex flex-col sm:flex-row gap-3 mb-5">
              {/* Qty */}
              <div className="flex items-center border-2 border-stone-200 rounded-xl overflow-hidden bg-white shadow-sm h-14 w-fit">
                <button onClick={() => setQty(q => Math.max(1, q - 1))} className="w-12 h-full flex items-center justify-center text-stone-500 hover:bg-stone-50 transition-colors text-xl font-light border-r border-stone-200">
                  −
                </button>
                <span className="w-12 h-full flex items-center justify-center text-[15px] font-extrabold text-stone-900">
                  {qty}
                </span>
                <button onClick={() => setQty(q => q + 1)} className="w-12 h-full flex items-center justify-center text-stone-500 hover:bg-stone-50 transition-colors text-xl font-light border-l border-stone-200">
                  +
                </button>
              </div>

              {/* Add to Cart */}
              <button
                onClick={handleAddToCart}
                disabled={addMut.isPending}
                className="btn-primary flex-1 h-14 rounded-xl text-[14px] flex items-center justify-center gap-2.5 disabled:opacity-60"
              >
                <svg className={`w-4 h-4 ${addMut.isPending ? "animate-bounce" : ""}`} fill="none" stroke="currentColor" strokeWidth={2.5} viewBox="0 0 24 24">
                  <circle cx="9" cy="21" r="1" /><circle cx="20" cy="21" r="1" />
                  <path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6" />
                </svg>
                {addMut.isPending ? "Adding…" : "Add to Cart"}
              </button>

              {/* Buy Now */}
              <button
                onClick={handleBuyNow}
                disabled={addMut.isPending}
                className="bg-black text-white flex-1 h-14 rounded-xl text-[14px] disabled:opacity-60"
              >
                Buy Now — ₹{total}
              </button>
            </div>

            {product.grabCode && product.grabPrice && (
              <div className="rounded-xl border-2 border-[#c9643a] bg-orange-50/20 p-4 mb-5 shadow-sm">
                <div className="flex items-center justify-between mb-3 bg-[#c9643a] rounded-lg p-3">
                  <p className="text-[14px] font-extrabold text-white uppercase tracking-wider flex items-center gap-2">
                    <span className="text-lg">🔥</span> Limited Time Grab Deal
                  </p>
                  <span className="text-[11px] font-bold text-white bg-white/20 px-2 py-0.5 rounded uppercase">Special Price</span>
                </div>

                <div className="flex items-center gap-4">
                  <div className="flex-1">
                    <p className="text-[12px] font-bold text-[#c9643a] mb-1 uppercase tracking-tight">
                      Special Grab Price
                    </p>
                    <div className="flex items-baseline gap-2">
                      <p className="text-[28px] font-black text-stone-900 leading-none">
                        ₹{Number(product.grabPrice).toLocaleString("en-IN")}
                      </p>
                      <span className="text-sm text-stone-400 line-through">₹{Number(product.finalPrice).toLocaleString("en-IN")}</span>
                    </div>
                    <p className="text-[13px] text-stone-500 mt-2 font-medium">
                      Get additional discount using the code below
                    </p>
                  </div>

                  <div className="flex flex-col items-center gap-2 border-l border-stone-200 pl-4">
                    <div className="bg-white border-2 border-dashed border-[#c9643a] px-4 py-2 rounded-xl text-center">
                      <p className="text-[10px] font-bold text-stone-400 uppercase tracking-widest mb-0.5">Code</p>
                      <p className="text-[18px] font-black text-[#c9643a] tracking-tighter">{product.grabCode}</p>
                    </div>
                    <button 
                      onClick={() => {
                        navigator.clipboard.writeText(product.grabCode);
                        toast.success("Code copied!");
                      }}
                      className="text-[11px] font-bold text-[#0337a4] hover:underline uppercase tracking-wider"
                    >
                      Copy Code
                    </button>
                  </div>
                </div>
              </div>
            )}

            <div className="rounded-xl border border-stone-200 bg-white p-4 mb-5 shadow-sm">
              <div className="flex items-center justify-between mb-4 bg-[#0d1219] rounded-lg p-3.5">
                <p className="text-[14px] font-extrabold text-white uppercase tracking-wider">
                  Available Offers
                </p>
                <div className="flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                  <span className="text-[11px] font-bold text-white/60 tracking-widest uppercase">2 Active</span>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {/* Offer 1 */}
                <div className="border border-stone-100 rounded-xl p-4 bg-emerald-50/30 hover:border-emerald-200 transition-colors">
                  <p className="text-[11px] font-extrabold text-emerald-700 mb-1 uppercase tracking-widest">
                    Prepaid Offer
                  </p>
                  <p className="text-[20px] font-black text-stone-900 mb-1">
                    Extra 5% OFF
                  </p>
                  <p className="text-[13px] text-stone-600 mb-3 leading-relaxed">
                    Pay online & enjoy extra savings on your order
                  </p>
                  <div className="flex items-center justify-between border-t border-emerald-100 pt-3">
                    <span className="text-[12px] font-bold text-emerald-800 bg-white px-2.5 py-1 rounded-lg border border-emerald-100">
                      Auto Applied
                    </span>
                  </div>
                </div>

                {/* Offer 2 */}
                <div className="border border-stone-100 rounded-xl p-4 bg-blue-50/30 hover:border-blue-200 transition-colors">
                  <p className="text-[11px] font-extrabold text-[#0337a4] mb-1 uppercase tracking-widest">
                    First Order
                  </p>
                  <p className="text-[20px] font-black text-stone-900 mb-1">
                    ₹50 Discount
                  </p>
                  <p className="text-[13px] text-stone-600 mb-3 leading-relaxed">
                    On orders above ₹999 for new customers
                  </p>
                  <div className="flex items-center justify-between border-t border-blue-100 pt-3">
                    <span className="text-[12px] font-bold text-[#0337a4] bg-white px-2.5 py-1 rounded-lg border border-blue-100">
                      Code: NEW50
                    </span>
                    <button 
                      onClick={() => {
                        navigator.clipboard.writeText("NEW50");
                        toast.success("Code copied!");
                      }}
                      className="text-[11px] font-bold text-[#0337a4] hover:underline"
                    >
                      Copy
                    </button>
                  </div>
                </div>
              </div>
            </div>

            {/* ── Trust Bar ── */}
            <div className="grid grid-cols-3 bg-white border border-stone-200 rounded-2xl overflow-hidden shadow-sm">
              {[
                { icon: "🚚", label: "Free Delivery", sub: "Orders ₹499+" },
                { icon: "↩️", label: "60-Day Returns", sub: "Hassle-free" },
                { icon: "🔒", label: "Secure Payment", sub: "100% protected" },
              ].map(({ icon, label, sub }, i) => (
                <div key={label} className={`flex flex-col items-center gap-1 py-5 px-3 text-center hover:bg-stone-50 transition-colors ${i < 2 ? "border-r border-stone-200" : ""}`}>
                  <span className="text-2xl mb-0.5">{icon}</span>
                  <span className="text-[15px] font-extrabold text-stone-900 leading-tight">{label}</span>
                  <span className="text-[13px] text-stone-700 font-semibold">{sub}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* ── Product Tabs ── */}
      <div className="max-w-[1440px] mx-auto px-4 sm:px-8 lg:px-16 py-12">
        <div className="flex items-center gap-4 mb-8">
          <span className="h-px flex-1 bg-stone-200" />
          <h2 className="text-[20px] font-extrabold uppercase tracking-[0.3em] text-[#0337a4] px-4 whitespace-nowrap">Product Details</h2>
          <span className="h-px flex-1 bg-stone-200" />
        </div>

        <div className="flex flex-col gap-6">
          {/* Tabs Navigation */}
          <div className="flex overflow-x-auto gap-2 pb-2 border-b border-stone-200 scrollbar-hide">
            {TABS.map(({ id, label, icon }) => (
              <button
                key={id}
                onClick={() => toggleTab(id)}
                className={`flex items-center gap-2 px-6 py-3.5 rounded-t-2xl transition-all whitespace-nowrap border-b-2 -mb-[9px] ${
                  openTab === id
                    ? "border-[#0337a4] text-[#0337a4] bg-white font-extrabold shadow-[0_-4px_10px_rgba(0,0,0,0.02)]"
                    : "border-transparent text-stone-600 hover:text-stone-900 hover:bg-white/50 font-semibold"
                }`}
              >
                <span className="text-lg">{icon}</span>
                <span className="text-[16px]">{label}</span>
              </button>
            ))}
          </div>

          {/* Tab Content */}
          <div className="bg-white rounded-2xl border border-stone-200 p-6 md:p-8 shadow-sm min-h-[400px]">
            {TABS.map(({ id }) => (
              openTab === id && (
                <div key={id} className="animate-fadeIn">
                  {id === "description" && (
                    <div className="space-y-6">
                      <p className="text-[16px] text-stone-900 leading-relaxed">
                        {product.content?.description || product.productDescription}
                      </p>
                      
                      {product.content?.descriptionImages?.length > 0 && (
                        <div className="flex gap-4 overflow-x-auto pb-4 scrollbar-hide">
                          {product.content.descriptionImages.map((img, idx) => (
                            <img key={idx} src={img} alt={`Product ${idx}`} className="h-48 rounded-2xl border border-stone-200 shadow-sm" />
                          ))}
                        </div>
                      )}

                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-6">
                        {benefits.map((b, idx) => (
                          <div key={idx} className="flex gap-3 p-4 rounded-xl bg-stone-50 border border-stone-100 items-start hover:border-[#0337a4]/20 transition-colors">
                            {b.image ? (
                              <img src={b.image} alt={b.key} className="w-12 h-12 rounded-lg object-cover shrink-0" />
                            ) : (
                              <span className="text-base shrink-0">{b.icon}</span>
                            )}
                            <div className="text-[16px] leading-relaxed text-stone-600">
                              <span className="font-extrabold text-stone-900">{b.key}: </span>{b.val}
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}

                  {id === "ingredients" && ingredients && (
                    <div className="space-y-8">
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        {ingredients.list?.map((row, idx) => (
                          <div key={idx} className="p-5 rounded-2xl bg-[#0d1219] border border-stone-800">
                            <span className="font-extrabold text-[#c9643a] text-[10px] uppercase tracking-[0.25em] block mb-2">{row.key}</span>
                            <span className="text-[14px] text-white/70 font-medium leading-relaxed">{row.val}</span>
                          </div>
                        ))}
                      </div>
                      <div className="flex flex-wrap gap-2.5">
                        {ingredients.pills?.map((ing, idx) => (
                          <span key={idx} className="px-4 py-2 rounded-full bg-stone-100 text-stone-700 border border-stone-200 text-[12px] font-extrabold uppercase tracking-wide hover:bg-[#0337a4] hover:text-white hover:border-[#0337a4] transition-all cursor-default">
                            {ing}
                          </span>
                        ))}
                      </div>
                      <div className="flex gap-6 overflow-x-auto pb-4 scrollbar-hide">
                        {ingredients.details?.map((item, index) => {
                          const name = item.name || item.split?.(": ")?.[0];
                          const desc = item.desc || item.split?.(": ")?.[1];
                          const img = item.image || INGREDIENT_IMAGES[index % INGREDIENT_IMAGES.length];

                          return (
                            <div
                              key={index}
                              className="w-[280px] flex-shrink-0 bg-white rounded-3xl shadow-lg overflow-hidden border border-stone-200"
                            >
                              <div className="w-full h-[180px] overflow-hidden">
                                <img
                                  src={img}
                                  alt={name}
                                  className="w-full h-full object-cover hover:scale-105 transition-transform duration-700"
                                />
                              </div>

                              <div className="p-5 space-y-2.5">
                                <p className="text-[18px] font-extrabold text-[#c9643a] uppercase tracking-[0.3em]">
                                  Key Ingredient
                                </p>

                                <h3
                                  style={{ fontFamily: "'Playfair Display', serif" }}
                                  className="text-[32px] font-bold text-stone-900 leading-tight"
                                >
                                  {name}
                                </h3>

                                <div className="w-10 h-0.5 bg-gradient-to-r from-[#0337a4] to-[#c9643a] rounded-full" />

                                <p className="text-[16px] text-stone-600 leading-relaxed">
                                  {desc}
                                </p>
                              </div>
                            </div>
                          );
                        })}
                      </div>
                    </div>
                  )}

                  {id === "warning" && (
                    <div className="space-y-4">
                      {warnings.map((row, idx) => (
                        <div key={idx} className="flex gap-4 p-4 rounded-xl bg-amber-50/60 border border-amber-100 hover:border-amber-200 transition-colors items-start">
                          {row.image ? (
                            <img src={row.image} alt="Warning" className="w-16 h-16 rounded-xl object-cover shrink-0" />
                          ) : (
                            <span className="text-amber-500 shrink-0 text-lg mt-0.5">⚠</span>
                          )}
                          <div className="text-[16px]">
                            <span className="font-extrabold text-stone-800">{row.key}: </span>
                            <span className="text-stone-600">{row.val}</span>
                          </div>
                        </div>
                      ))}
                      <div className="mt-6 p-5 rounded-xl bg-amber-50 border border-amber-200 flex items-start gap-3">
                        <span className="text-lg shrink-0">⚠️</span>
                        <p className="text-[16px] font-semibold text-amber-800 leading-relaxed">
                          Always consult a qualified healthcare provider before use. Not intended to diagnose or treat any disease.
                        </p>
                      </div>
                    </div>
                  )}

                  {id === "howToUse" && (
                    <div className="space-y-4">
                      {howToUse.map((item, idx) => (
                        <div key={idx} className="flex gap-5 p-5 rounded-2xl bg-stone-50 border border-stone-100 hover:border-[#0337a4]/20 transition-colors items-start">
                          {item.image ? (
                            <img src={item.image} alt={item.title} className="w-20 h-20 rounded-2xl object-cover shrink-0" />
                          ) : (
                            <div className="flex flex-col items-center gap-1.5 shrink-0">
                              <span className="text-2xl">{item.icon}</span>
                              <span className="text-[16px] font-extrabold text-[#c9643a] tracking-widest">{item.step}</span>
                            </div>
                          )}
                          <div>
                            <p className="font-extrabold text-stone-900 text-[18px] mb-1.5 tracking-tight">{item.title}</p>
                            <p className="text-[16px] text-stone-700 leading-relaxed">{item.desc}</p>
                          </div>
                        </div>
                      ))}
                    </div>
                  )}

                  {id === "beforeAfter" && (
                    <div className="space-y-8">
                      {beforeAfter.length > 0 ? (
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                          {beforeAfter.map((item, idx) => (
                            <div key={idx} className="rounded-3xl overflow-hidden border border-stone-200 shadow-lg bg-white">
                              <img src={item.image} alt="Before and After" className="w-full h-auto" />
                              {item.title && <p className="p-4 text-center font-bold text-stone-800">{item.title}</p>}
                            </div>
                          ))}
                        </div>
                      ) : (
                        <div className="text-center py-12 text-stone-400">
                          <p>Before & After gallery coming soon.</p>
                        </div>
                      )}
                    </div>
                  )}

                  {id === "reviews" && (
                    <div className="space-y-6">
                      {/* Rating summary */}
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 p-6 bg-stone-50 rounded-2xl border border-stone-100">
                        <div className="flex flex-col items-center justify-center gap-2">
                          <span style={{ fontFamily: "'Playfair Display', serif" }} className="text-[72px] font-bold text-stone-900 leading-none">4.7</span>
                          <StarRow rating={4.7} size="text-2xl" />
                          <span className="text-[15px] text-stone-700 font-semibold mt-1">Based on 1,248 reviews</span>
                        </div>
                        <div className="flex flex-col gap-2.5 justify-center">
                          <RatingBar label="5 ★" value={82} />
                          <RatingBar label="4 ★" value={11} />
                          <RatingBar label="3 ★" value={4} />
                          <RatingBar label="2 ★" value={2} />
                          <RatingBar label="1 ★" value={1} />
                        </div>
                      </div>
                      {/* Review Cards */}
                      <div className="space-y-4">
                        {REVIEWS.map((r, i) => (
                          <div key={i} className="p-5 rounded-2xl bg-stone-50 border border-stone-100 hover:border-[#0337a4]/20 transition-colors">
                            <div className="flex items-start gap-4 mb-3">
                              <div className="w-12 h-12 rounded-full bg-gradient-to-br from-[#0337a4] to-[#c9643a] text-white text-base font-extrabold flex items-center justify-center shrink-0 shadow-sm">
                                {r.initial}
                              </div>
                              <div className="flex-1">
                                <div className="flex items-center gap-2.5 flex-wrap">
                                  <p className="font-extrabold text-stone-900 text-[18px]">{r.name}</p>
                                  {r.verified && (
                                    <span className="text-[13px] font-extrabold text-[#0337a4] bg-blue-50 border border-blue-200 px-2.5 py-0.5 rounded-full flex items-center gap-1.5">
                                      <FaCheck className="w-2.5 h-2.5" /> Verified
                                    </span>
                                  )}
                                </div>
                                <div className="flex items-center gap-2.5 mt-1">
                                  <StarRow rating={r.rating} size="text-sm" />
                                  <span className="text-[14px] text-stone-400 font-medium">{r.date}</span>
                                </div>
                              </div>
                            </div>
                            <p className="text-[16px] text-stone-700 leading-relaxed">{r.text}</p>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              )
            ))}
          </div>
        </div>
      </div>

      <ReviewSection />
      <FAQ productName={product.productName} />
      <RelatedProduct />
    </div>
  );
}