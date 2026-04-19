import { useState, useEffect, useRef } from "react";
import pincodeData from "../../data/pincodeData.json";
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
// ─── Static Data ──────────────────────────────────────────────────────────────

const OFFERS = [
  { icon: "💳", bg: "bg-indigo-50", title: "Bank Offer", body: "10% off HDFC Cards. Min ₹500" },
  { icon: "🏷️", bg: "bg-emerald-50", title: "No-cost EMI", body: "₹167/mo on orders above ₹999" },
  { icon: "🎁", bg: "bg-amber-50", title: "Buy 2 Get 1", body: "Free on all 60-cap packs" },
  { icon: "🚚", bg: "bg-sky-50", title: "Free Delivery", body: "On orders above ₹499" },
  { icon: "📦", bg: "bg-rose-50", title: "Combo Offer", body: "Buy 3 packs, get 12% off" },
];

const BENEFITS_LIST = [
  { key: "Energy & Stamina", val: "Ashwagandha and Shilajit work together to reduce fatigue and increase physical endurance — noticeable within 2–3 weeks of daily use." },
  { key: "Immune Support", val: "Turmeric, Ginger, and Long Pepper provide potent anti-inflammatory and immunomodulatory support." },
  { key: "Stress & Sleep", val: "Brahmi and Ashwagandha are clinically studied adaptogens that lower cortisol and improve sleep quality." },
  { key: "Digestion & Gut", val: "Cardamom, Mulethi, and Ginger aid in soothing the digestive tract and reducing bloating." },
  { key: "Antioxidant Protection", val: "Saffron and Clove are among the highest ORAC-rated herbs, fighting free radicals and promoting cellular longevity." },
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


const INGREDIENT_PILLS = [
  "Ashwagandha", "Shatavari", "Brahmi", "Shilajit", "Safed Musli", "Cardamom",
  "Cinnamon", "Ginger", "Turmeric", "Black Pepper", "Saffron", "Nutmeg", "Clove",
  "Long Pepper", "Mulethi", "Vidarikand", "Gokhuru", "Kaunch Beej",
];

const TAG_COLORS = {
  "fatigue support": "bg-blue-50 text-blue-800 border-blue-200",
  "active lifestyle": "bg-violet-50 text-violet-800 border-violet-200",
  "stamina booster": "bg-amber-50 text-amber-800 border-amber-200",
  "immunity support": "bg-emerald-50 text-emerald-800 border-emerald-200",
  default: "bg-slate-50 text-slate-800 border-slate-200",
};

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
  { id: "reviews", label: "Reviews (3)", icon: "⭐" },
];

// ─── Sub-components ───────────────────────────────────────────────────────────

const StarRow = ({ rating, size = "text-sm" }) => (
  <div className="flex gap-0.5">
    {[1, 2, 3, 4, 5].map((i) => (
      <span key={i} className={`${size} leading-none ${i <= Math.round(rating) ? "text-amber-400" : "text-stone-200"}`}>★</span>
    ))}
  </div>
);

// ─── Main Component ───────────────────────────────────────────────────────────

export default function SingleProduct() {
  const [activeImg, setActiveImg] = useState(0);
  const [imgFade, setImgFade] = useState(false);
  const [packIdx, setPackIdx] = useState(1);
  const [qty, setQty] = useState(1);
  const [wishlisted, setWishlisted] = useState(false);
  const [product, setProduct] = useState(null);
  console.log('product :', product)
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
      }
      else toast.error("Failed to add to cart.");
    }
  });

  const handleAddToCart = () => {
    const token = localStorage.getItem("token");
    if (!token) {
      toast.error("Please login first.");
      navigate('/login');
      return;
    }
    addMut.mutate({ productId, quantity: qty });
  };

  const handleBuyNow = () => {
    const token = localStorage.getItem("token");
    if (!token) {
      toast.error("Please login first to buy.");
      navigate("/login");
      return;
    }

    addMut.mutate(
      { productId, quantity: qty },
      {
        onSuccess: () => {
          qc.invalidateQueries({ queryKey: ["cart"] });
          // Redirect to checkout after adding to cart
          navigate("/checkout");
        },
      }
    );
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
    if (pincode.length !== 6) {
      setPincodeMsg({ type: "error", msg: "Enter a valid 6-digit pincode." });
      return;
    }

    const state = pincodeData[pincode];

    if (!state) {
      setPincodeMsg({
        type: "error",
        msg: "❌ Sorry, we couldn't find this pincode. Please check and try again.",
      });
      return;
    }

    // Delivery days based on state
    const FAST_STATES = ["TAMIL NADU"];
    const MEDIUM_STATES = ["KERALA", "KARNATAKA", "ANDHRA PRADESH", "TELANGANA"];

    let days;
    let label;

    if (FAST_STATES.includes(state)) {
      days = 4;
      label = "Express";
    } else if (MEDIUM_STATES.includes(state)) {
      days = 5;
      label = "Standard";
    } else {
      days = 7;
      label = "Standard";
    }

    // Calculate estimated delivery date
    const deliveryDate = new Date();
    deliveryDate.setDate(deliveryDate.getDate() + days);
    const options = { weekday: "short", month: "short", day: "numeric" };
    const formattedDate = deliveryDate.toLocaleDateString("en-IN", options);

    // Format state name nicely
    const stateName = state
      .split(" ")
      .map((w) => w.charAt(0) + w.slice(1).toLowerCase())
      .join(" ");

    setPincodeMsg({
      type: "success",
      msg: `✓ ${label} Delivery to ${stateName} — Estimated by ${formattedDate} (${days} working days)`,
      days,
      stateName,
    });
  };

  if (loading) return (
    <div className="min-h-screen bg-stone-50 flex items-center justify-center">
      <div className="flex flex-col items-center gap-3">
        <div className="w-10 h-10 rounded-full border-[3px] border-emerald-600 border-t-transparent animate-spin" />
        <p className="text-sm font-medium text-stone-400 tracking-wide">Loading product…</p>
      </div>
    </div>
  );

  if (!product) return (
    <div className="min-h-screen bg-stone-50 flex items-center justify-center">
      <p className="text-sm font-semibold text-stone-400">Product not found.</p>
    </div>
  );

  return (
    <div className="min-h-screen bg-[#F8F7F4] text-stone-900" >

      {/* Google Fonts */}
      <style>{`
            @keyframes shim{0%{background-position:200% center}100%{background-position:-200% center}}
        .shim-btn{background:linear-gradient(90deg,var(--red),var(--amber),#c2410c,var(--red));background-size:200% auto;animation:shim 3s linear infinite;}
        .shim-btn:hover { background: linear-gradient(135deg, #03349a 0%, #c9643a 100%); }
        .pack-card { transition: all 0.2s ease; }
        .pack-card:hover { transform: translateY(-2px); }
        .tab-content { animation: fadeIn 0.2s ease; }
        @keyframes fadeIn { from { opacity: 0; transform: translateY(6px); } to { opacity: 1; transform: translateY(0); } }
        .thumb-btn { transition: all 0.15s ease; }
        .stock-pulse { animation: pulse 2s infinite; }
        @keyframes pulse { 0%, 100% { opacity: 1; } 50% { opacity: 0.5; } }
      `}</style>

      {/* ── Breadcrumb ── */}
      <nav className="bg-white border-b border-stone-100 px-4 sm:px-8 lg:px-12 py-3.5">
        <div className="max-w-[1440px] mx-auto flex items-center gap-2 text-sm">
          {["Home", product.forWhom ?? "Products"].map((c, idx) => (
            <span key={c} className="flex items-center gap-2">
              <a href="#" className="text-stone-400 hover:text-stone-700 transition-colors font-medium">{c}</a>
              <span className="text-stone-300 text-xs">›</span>
            </span>
          ))}
          <span className="font-semibold text-stone-700 truncate max-w-[200px]">{product.productName}</span>
        </div>
      </nav>

      <div className="max-w-[1440px] mx-auto px-4 sm:px-8 lg:px-12 pt-8 pb-6">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-16 items-start">

          {/* ════ LEFT — Gallery (Half Page) ════ */}
          <div className="lg:sticky lg:top-6 flex flex-col gap-4">

            {/* Main image container */}
            <div className="relative rounded-3xl overflow-hidden bg-white border border-stone-100 shadow-sm"
            // style={{ aspectRatio: "4/5" }}
            >
              {/* Top action row: Wishlist + Share */}
              <div className="absolute top-4 right-4 z-20 flex flex-col gap-2">
                <button
                  onClick={() => setWishlisted(w => !w)}
                  title="Wishlist"
                  className={`w-10 h-10 rounded-full flex items-center justify-center shadow-md backdrop-blur-sm transition-all duration-200
                    ${wishlisted ? "bg-rose-500 text-white" : "bg-white/90 text-stone-500 hover:text-rose-500"}`}
                >
                  <svg className="w-4.5 h-4.5" fill={wishlisted ? "currentColor" : "none"} stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
                    <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" />
                  </svg>
                </button>
                <button
                  title="Share"
                  className="w-10 h-10 rounded-full bg-white/90 backdrop-blur-sm flex items-center justify-center shadow-md text-stone-500 hover:text-blue-600 transition-all duration-200"
                >
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
                    <circle cx="18" cy="5" r="3" /><circle cx="6" cy="12" r="3" /><circle cx="18" cy="19" r="3" />
                    <line x1="8.59" y1="13.51" x2="15.42" y2="17.49" /><line x1="15.41" y1="6.51" x2="8.59" y2="10.49" />
                  </svg>
                </button>
              </div>
              <div className=" flex justify-between">
                {/* Discount badge */}
                {discPct > 0 && (
                  <div className="absolute top-4 left-4 z-20 bg-emerald-600 text-white text-xs font-bold px-3 py-1.5 rounded-full tracking-wide shadow">
                    {discPct}% OFF
                  </div>
                )}

                {/* Offer tag */}
                {offerTags.length > 0 && (
                  <div className="absolute top-14 left-4 z-20 bg-amber-500 text-white text-xs font-bold px-3 py-1.5 rounded-full shadow">
                    {offerTags[0]}
                  </div>
                )}
              </div>


              {/* Zoom image */}
              <div
                className="w-full h-full overflow-hidden cursor-zoom-in"
                onMouseMove={handleMouseMove}
                onMouseLeave={resetZoom}
              >
                {IMAGES.length > 0 ? (
                  <img
                    src={IMAGES[activeImg]?.url}
                    alt={product.productName}
                    style={zoomStyle}
                    className={`w-full h-full object-cover transition-opacity duration-200 ${imgFade ? "opacity-0" : "opacity-100"}`}
                  />
                ) : (
                  <div className="w-full h-full flex items-center justify-center text-stone-300 text-sm font-medium">
                    No image available
                  </div>
                )}
              </div>

              {/* Stock badge */}
              <div className="absolute bottom-4 left-4 z-20 flex items-center gap-2 bg-white/95 backdrop-blur-sm border border-stone-100 rounded-full px-4 py-2 shadow-sm">
                <span className="w-2 h-2 rounded-full bg-orange-400 stock-pulse flex-shrink-0" />
                <span className="text-xs font-semibold text-stone-700">Only 14 left in stock</span>
              </div>
            </div>

            {/* Thumbnails */}
            {IMAGES.length > 1 && (
              <div className="flex gap-2.5 overflow-x-auto pb-0.5">
                {IMAGES.map((src, i) => (
                  <button
                    key={i}
                    onClick={() => swapImg(i)}
                    className={`thumb-btn flex-shrink-0 w-[72px] h-[72px] sm:w-20 sm:h-20 rounded-2xl overflow-hidden border-2
                      ${activeImg === i
                        ? "border-emerald-600 shadow-[0_0_0_3px_rgba(5,150,105,0.15)]"
                        : "border-stone-200 hover:border-stone-400"}`}
                  >
                    <img src={src?.url} alt={`view ${i + 1}`} className="w-full h-full object-cover" />
                  </button>
                ))}
              </div>
            )}

            {/* Offers strip */}
            <div className="bg-white rounded-2xl border border-stone-100 p-4 shadow-sm">
              <p className="text-[15px] font-bold text-[#03349a] uppercase tracking-widest mb-3">Available Offers</p>
              <div className="flex gap-2.5 overflow-x-auto pb-1">
                {OFFERS.map(({ icon, bg, title, body }) => (
                  <div key={title} className="min-w-[136px] flex-shrink-0 border border-stone-100 rounded-xl p-3 hover:border-stone-200 transition-colors bg-stone-50">
                    <div className={`w-8 h-8 ${bg} rounded-xl flex items-center justify-center text-sm mb-2`}>{icon}</div>
                    <p className="text-md font-bold text-stone-900 mb-0.5">{title}</p>
                    <p className="text-[13px] text-stone-800 leading-snug">{body}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* ════ RIGHT — Product Info ════ */}
          <div className="flex flex-col">

            {/* Product Name */}
            <h1 className="font-display text-[28px] sm:text-[34px] lg:text-[38px] font-bold leading-tight text-stone-900 mb-3" >
              {product.productName}
            </h1>

            {/* Ratings row */}
            <div className="flex items-center flex-wrap gap-3 mb-4">
              <div className="flex items-center gap-2 bg-amber-50 border border-amber-200 rounded-full px-3 py-1.5">
                <StarRow rating={4.7} size="text-sm" />
                <span className="text-sm font-bold text-amber-800">4.7</span>
                <span className="text-xs text-amber-600">(1,248)</span>
              </div>
              <button className="text-xs font-semibold text-blue-700 underline underline-offset-2 hover:text-blue-900 transition-colors">
                Read all reviews
              </button>
            </div>
            {/* Description & Benefits Above Price Card */}
            {product.productDescription && (
              <div className="mb-6">
                <div 
                  className={`text-[17px] text-stone-600 leading-relaxed transition-all duration-300 ${!isExpanded ? "line-clamp-2 overflow-hidden" : ""}`}
                  style={!isExpanded ? { display: '-webkit-box', WebkitLineClamp: '2', WebkitBoxOrient: 'vertical' } : {}}
                >
                  {product.productDescription}
                </div>
                
                {isExpanded && (
                  <div className="mt-4 space-y-4 animate-fadeIn">
                    <div className="h-px bg-stone-100" />
                    <p className="text-[11px] font-black uppercase tracking-[0.2em] text-stone-400">Key Benefits</p>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                      {BENEFITS_LIST.map((b) => (
                        <div key={b.key} className="flex gap-3 p-3 rounded-xl bg-stone-50/50 border border-stone-100 items-start">
                          <span className="text-emerald-600 mt-0.5 font-bold">✓</span>
                          <div className="text-stone-700 text-[14px] leading-relaxed">
                            <span className="font-bold text-stone-900">{b.key}: </span>
                            <span>{b.val}</span>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                <button
                  onClick={() => setIsExpanded(!isExpanded)}
                  className="mt-3 text-[12px] font-black uppercase tracking-[0.15em] text-[#c9643a] hover:text-[#03349a] transition-all duration-300 flex items-center gap-2 group"
                >
                  <span className="border-b-2 border-transparent group-hover:border-[#03349a]">
                    {isExpanded ? "Show Less" : "Read More"}
                  </span>
                  <span className={`text-lg transition-transform duration-300 ${isExpanded ? "rotate-180" : ""}`}>⌄</span>
                </button>
              </div>
            )}
            {/* ── IN STOCK + SALES BADGE ── */}
            <div className="flex items-center justify-between gap-3 mb-5 flex-wrap">
              <span className="inline-flex items-center gap-1.5 text-xs font-semibold text-emerald-700 bg-emerald-50 border border-emerald-200 rounded-full px-3 py-1.5">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 stock-pulse" />
                In Stock
              </span>
              <span className="inline-flex items-center gap-1.5 text-xs font-semibold text-orange-700 bg-orange-50 border border-orange-200 rounded-full px-3 py-1.5">
                <HiOutlineTrendingUp size={20} /> 300+ sold in 30 days
              </span>

            </div>
            <div>
              {productTags.slice(0, 2).map((tag) => (
                <span key={tag} className={`inline-flex items-center text-xs font-semibold px-3 py-1.5 rounded-full border ${TAG_COLORS[tag] ?? TAG_COLORS.default}`}>
                  ✓ {tag.charAt(0).toUpperCase() + tag.slice(1)}
                </span>
              ))}
            </div>

            <div className="h-px bg-stone-100 mb-5" />

            {/* Price Card */}
            <div className="mb-4">
              <div className="bg-white border border-stone-200 rounded-2xl p-4 sm:p-5 shadow-sm">

                {/* Top Row */}
                <div className="flex items-center justify-between mb-2">
                  <p className="text-sm font-semibold text-stone-500 uppercase tracking-wide">
                    Price
                  </p>

                  {saving > 0 && (
                    <span className="text-[11px] font-bold px-2.5 py-1 rounded-full bg-emerald-50 text-emerald-700 border border-emerald-200">
                      Save ₹{saving.toLocaleString("en-IN")}
                    </span>
                  )}
                </div>

                {/* Main Price */}
                <div className="flex items-end gap-3 flex-wrap">
                  <span className="text-[40px] sm:text-[48px] font-bold text-stone-900 leading-none">
                    ₹{pack.price?.toLocaleString("en-IN") ?? parseFloat(product.finalPrice).toLocaleString("en-IN")}
                  </span>

                  <span className="text-base text-stone-400 line-through font-medium">
                    ₹{pack.orig?.toLocaleString("en-IN") ?? parseFloat(product.price).toLocaleString("en-IN")}
                  </span>
                </div>

                {/* Extra Info */}
                <p className="text-xs text-stone-500 mt-1">
                  Inclusive of all taxes
                </p>

              </div>
            </div>


            {/* Pack Selector */}
            <div className="mb-6">
              <p className="text-[15px] font-bold uppercase tracking-widest mb-3">
                Choose Pack Size
              </p>

              <div className="flex flex-col gap-3">
                {PACKS.map((p, i) => {
                  const pct = Math.round(((p.orig - p.price) / p.orig) * 100);
                  const sel = packIdx === i;

                  return (
                    <button
                      key={i}
                      onClick={() => setPackIdx(i)}
                      className={`flex items-center justify-between w-full p-4 rounded-xl border transition-all
          ${sel
                          ? "border-emerald-600 bg-emerald-50 shadow-sm"
                          : "border-stone-200 bg-white hover:border-stone-300"
                        }`}
                    >
                      {/* LEFT SIDE */}
                      <div className="flex items-center gap-4">
                        {/* 🔘 Circle Radio */}
                        <div
                          className={`w-5 h-5 rounded-full border-2 flex items-center justify-center
              ${sel ? "border-emerald-600" : "border-stone-400"}`}
                        >
                          {sel && (
                            <div className="w-2.5 h-2.5 bg-emerald-600 rounded-full"></div>
                          )}
                        </div>

                        {/* TEXT */}
                        <div className="text-left">
                          <p className="text-sm font-semibold text-stone-900">
                            {p.qty} caps ({p.duration})
                          </p>
                          <p className="text-xs text-stone-400 line-through">
                            ₹{p.orig.toLocaleString("en-IN")}
                          </p>
                        </div>
                      </div>

                      {/* RIGHT SIDE */}
                      <div className="text-right">
                        <p className="text-base font-bold text-stone-900">
                          ₹{p.price.toLocaleString("en-IN")}
                        </p>
                        <span className="text-[11px] font-semibold text-emerald-700">
                          {pct}% OFF
                        </span>
                      </div>

                      {/* TAG */}
                      {p.tag && (
                        <span
                          className={`absolute top-[-8px] right-3 text-[10px] px-2 py-0.5 rounded-full text-white
              ${p.tag === "Most Popular"
                              ? "bg-amber-500"
                              : "bg-emerald-700"
                            }`}
                        >
                          {p.tag}
                        </span>
                      )}
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Pincode check */}
            <div className="bg-white border border-stone-200 rounded-2xl p-4 mb-6 shadow-sm">
              <p className="text-lg font-bold uppercase tracking-widest mb-3">Check Delivery Availability</p>
              <div className="flex gap-2">
                <input
                  type="text"
                  maxLength={6}
                  placeholder="Enter pincode"
                  value={pincode}
                  onChange={(e) => { setPincode(e.target.value.replace(/\D/g, "")); setPincodeMsg(null); }}
                  className="flex-1 border-2 border-stone-200 rounded-xl px-4 py-2.5 text-sm font-medium focus:outline-none focus:border-emerald-500 transition-colors"
                />
                <button
                  onClick={checkPincode}
                  className="px-5 py-2.5 bg-stone-900 text-white text-sm font-semibold rounded-xl hover:bg-stone-800 transition-colors"
                >
                  Check
                </button>
              </div>
              {pincodeMsg && (
                <div className={`mt-3 rounded-xl p-3 ${pincodeMsg.type === "success" ? "bg-emerald-50 border border-emerald-200" : "bg-red-50 border border-red-200"}`}>
                  {pincodeMsg.type === "success" ? (
                    <div className="flex items-start gap-3">
                      <span className="text-2xl flex-shrink-0">🚚</span>
                      <div className="flex-1">
                        <p className="text-sm font-bold text-emerald-800 mb-0.5">{pincodeMsg.msg}</p>
                        <div className="flex items-center gap-2 mt-1.5">
                          <span className={`text-[11px] font-bold px-2.5 py-0.5 rounded-full ${pincodeMsg.days === 4
                            ? "bg-emerald-600 text-white"
                            : pincodeMsg.days === 5
                              ? "bg-blue-600 text-white"
                              : "bg-amber-500 text-white"
                            }`}>
                            {pincodeMsg.days === 4 ? "⚡ Express" : pincodeMsg.days === 5 ? "📦 Standard" : "📦 Standard"}
                          </span>
                          <span className="text-[11px] text-emerald-600 font-medium">Free delivery on orders ₹499+</span>
                        </div>
                      </div>
                    </div>
                  ) : (
                    <div className="flex items-center gap-2">
                      <span className="text-lg">⚠️</span>
                      <p className="text-sm font-semibold text-red-700">{pincodeMsg.msg}</p>
                    </div>
                  )}
                </div>
              )}
            </div>

            {/* Qty + CTA */}
            <div className="flex gap-3 mb-6 w-full">

              {/* Qty Stepper */}
              <div className="flex-1 flex items-center border-2 border-stone-200 rounded-xl overflow-hidden bg-white">
                <button
                  onClick={() => setQty(q => Math.max(1, q - 1))}
                  className="w-11 h-12 flex items-center justify-center text-stone-600 hover:bg-stone-50 transition-colors text-xl font-light"
                >
                  −
                </button>
                <span className="w-11 h-12 flex items-center justify-center text-sm font-bold text-stone-900 border-x-2 border-stone-200">
                  {qty}
                </span>
                <button
                  onClick={() => setQty(q => q + 1)}
                  className="w-11 h-12 flex items-center justify-center text-stone-600 hover:bg-stone-50 transition-colors text-xl font-light"
                >
                  +
                </button>
              </div>

              {/* Add to Cart */}
              <button
                type="button"
                onClick={handleAddToCart}
                disabled={addMut.isPending}
                className="flex-[1.5] h-12 flex items-stretch rounded-xl overflow-hidden transition-all duration-300 shadow-lg hover:shadow-xl hover:-translate-y-0.5 active:translate-y-0 disabled:opacity-70 group"
              >
                {/* Left side: Icon */}
                <div className="w-14 flex items-center justify-center bg-[#022a7a] text-white transition-colors duration-300">
                  <svg className={`w-5 h-5 ${addMut.isPending ? 'animate-bounce' : 'group-hover:scale-110 transition-transform'}`} fill="none" stroke="currentColor" strokeWidth={2.5} viewBox="0 0 24 24">
                    <circle cx="9" cy="21" r="1" />
                    <circle cx="20" cy="21" r="1" />
                    <path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6" />
                  </svg>
                </div>

                {/* Right side: Text */}
                <div className="flex-1 flex items-center justify-center bg-[#03349a] text-white font-bold uppercase tracking-widest text-xs sm:text-sm transition-colors duration-300">
                  {addMut.isPending ? "Adding..." : "Add to Cart"}
                </div>
              </button>

              {/* Buy Now */}
              <button
                onClick={handleBuyNow}
                disabled={addMut.isPending}
                className="flex-1 h-12 border-2 border-stone-900 rounded-xl text-stone-900 text-sm font-bold tracking-widest uppercase hover:bg-stone-900 hover:text-white transition-all duration-200 disabled:opacity-50"
              >
                Buy Now — ₹{total}
              </button>

            </div>

            {/* Trust bar */}
            <div className="grid grid-cols-3 border border-stone-200 rounded-2xl overflow-hidden bg-white shadow-sm mb-2">
              {[
                { icon: "🚚", label: "Free Delivery", sub: "Orders ₹499+" },
                { icon: "↩️", label: "60-Day Returns", sub: "No questions asked" },
                { icon: "🔒", label: "Secure Payment", sub: "100% protected" },
              ].map(({ icon, label, sub }, i) => (
                <div key={label} className={`flex flex-col items-center gap-1 py-4 px-2 text-center ${i < 2 ? "border-r border-stone-200" : ""}`}>
                  <span className="text-xl">{icon}</span>
                  <span className="text-[15px] font-bold text-stone-900 leading-tight">{label}</span>
                  <span className="text-[14px] text-stone-800">{sub}</span>
                </div>
              ))}
            </div>

          </div>
        </div>
      </div>

      {/* ── Tabs Section ── */}
      <div className="max-w-[1440px] mx-auto px-4 sm:px-8 lg:px-12 py-10">
        <div className="space-y-3">
          {TABS.map(({ id, label, icon }) => (
            <div key={id} className="bg-white border border-stone-200 rounded-2xl overflow-hidden shadow-sm">
              <button
                onClick={() => toggleTab(id)}
                className="w-full flex justify-between items-center px-6 py-4 hover:bg-stone-50 transition-colors"
              >
                <span className="flex items-center gap-3">
                  <span className="text-lg">{icon}</span>
                  <span className="text-base font-bold text-stone-900">{label}</span>
                </span>
                <span className={`text-stone-400 transition-transform duration-300 text-lg ${openTab === id ? "rotate-180" : ""}`}>
                  ⌄
                </span>
              </button>

              {openTab === id && (
                <div className="tab-content px-6 pb-6 pt-2 text-stone-700 text-[18px] leading-relaxed border-t border-stone-100">

                  {/* {id === "description" && (
                    <div className="py-2 opacity-60">
                      <p className="text-sm italic">Product details and benefits are listed above the price card for easy viewing.</p>
                    </div>
                  )} */}

                  {id === "ingredients" && currentIngredients && (
                    <div className="space-y-12 py-4">
                      {/* Top Summary Info */}
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        {currentIngredients.list.map((row) => (
                          <div
                            key={row.key}
                            className="flex flex-col gap-1 p-4 rounded-2xl bg-white border border-stone-100 shadow-sm"
                          >
                            <span className="font-extrabold text-[#03349a] text-[11px] uppercase tracking-wider">
                              {row.key}
                            </span>
                            <span className="text-[15px] text-stone-600 font-medium leading-relaxed">{row.val}</span>
                          </div>
                        ))}
                      </div>

                      {/* Ingredient Pills */}
                      <div className="flex flex-wrap gap-2.5">
                        {currentIngredients.pills.map((ing) => (
                          <span
                            key={ing}
                            className="px-4 py-2 rounded-full bg-stone-100 text-stone-800 border border-stone-200 text-xs font-bold uppercase tracking-wide hover:bg-[#03349a] hover:text-white transition-colors cursor-default"
                          >
                            {ing}
                          </span>
                        ))}
                      </div>

                      {/* Zig-Zag Ingredient Details */}
                      <div className="space-y-16">
                        {currentIngredients.details.map((item, index) => {
                          const [name, desc] = item.split(": ");
                          const isEven = index % 2 === 0;
                          const img = INGREDIENT_IMAGES[index % INGREDIENT_IMAGES.length];
                          
                          return (
                            <div 
                              key={index} 
                              className={`flex flex-col ${isEven ? 'md:flex-row' : 'md:flex-row-reverse'} items-center gap-8 lg:gap-16 group`}
                            >
                              {/* Image Section */}
                              <div className="w-full md:w-1/2 overflow-hidden rounded-[2rem] shadow-xl aspect-[4/3]">
                                <img 
                                  src={img} 
                                  alt={name} 
                                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" 
                                />
                              </div>

                              {/* Text Section */}
                              <div className="w-full md:w-1/2 space-y-4">
                                <div className="space-y-1">
                                  <p className="text-[#c9643a] font-black text-xs uppercase tracking-[0.2em]">Key Ingredient</p>
                                  <h3 className="text-3xl font-bold text-stone-900">{name}</h3>
                                </div>
                                <div className="w-12 h-1 bg-gradient-to-r from-[#03349a] to-[#c9643a] rounded-full" />
                                <p className="text-[17px] text-stone-600 leading-relaxed font-medium">
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
                    <>
                      <div className="space-y-2.5 mb-4">
                        {WARNING_LIST.map((row) => (
                          <div key={row.key} className="flex gap-2 p-3 rounded-xl bg-amber-50 border border-amber-100">
                            <span className="font-semibold text-amber-800 text-sm flex-shrink-0">⚠ {row.key}:</span>
                            <span className="text-sm text-stone-600">{row.val}</span>
                          </div>
                        ))}
                      </div>
                      <p className="text-sm font-semibold text-amber-700 bg-amber-50 border border-amber-200 rounded-xl p-4">
                        ⚠ Consult a doctor before use. Not intended to diagnose or treat diseases.
                      </p>
                    </>
                  )}

                  {id === "howToUse" && (
                    <div className="space-y-3">
                      {[
                        { step: "1", title: "Morning Routine", desc: "Take 2 capsules with warm water or milk every morning after breakfast." },
                        { step: "2", title: "Consistency is Key", desc: "Use daily for a minimum of 8 weeks to see optimal benefits." },
                        { step: "3", title: "Stay Hydrated", desc: "Drink at least 2–3 litres of water daily while taking this supplement." },
                        { step: "4", title: "Storage", desc: "Store in a cool, dry place away from direct sunlight. Keep lid tightly closed." },
                      ].map((item) => (
                        <div key={item.step} className="flex gap-4 p-4 rounded-xl bg-stone-50 border border-stone-100">
                          <span className="w-8 h-8 rounded-full bg-emerald-700 text-white text-sm font-bold flex items-center justify-center flex-shrink-0">{item.step}</span>
                          <div>
                            <p className="font-semibold text-stone-900 text-sm mb-0.5">{item.title}</p>
                            <p className="text-sm text-stone-600">{item.desc}</p>
                          </div>
                        </div>
                      ))}
                    </div>
                  )}

                  {id === "reviews" && (
                    <div className="space-y-4">
                      {REVIEWS.map((r, i) => (
                        <div key={i} className="p-4 rounded-xl bg-stone-50 border border-stone-100">
                          <div className="flex items-center gap-3 mb-2">
                            <div className="w-9 h-9 rounded-full bg-emerald-700 text-white text-sm font-bold flex items-center justify-center flex-shrink-0">
                              {r.initial}
                            </div>
                            <div>
                              <p className="font-bold text-stone-900 text-sm">{r.name}</p>
                              <div className="flex items-center gap-2">
                                <StarRow rating={r.rating} size="text-xs" />
                                <span className="text-xs text-stone-400">{r.date}</span>
                              </div>
                            </div>
                            {r.verified && (
                              <span className="ml-auto text-[10px] font-bold text-emerald-700 bg-emerald-50 border border-emerald-200 px-2 py-0.5 rounded-full">✓ Verified</span>
                            )}
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