import { useState ,useEffect} from "react";
import {
  Star, ShoppingCart, Heart, Share2, Shield, Truck, RefreshCw,
  ChevronDown, ChevronUp, Plus, Minus, Check, Leaf, Award, Zap
} from "lucide-react";
import bottle from '../../assets/images/prod/pro5.jpeg'
import bottle1 from '../../assets/images/prod/pro1.jpeg'
import bottle3 from '../../assets/images/prod/pro2.jpeg'
import bottle2 from '../../assets/images/prod/pro3.jpeg'
import bottle5 from '../../assets/images/prod/pro4.jpeg'
import { axiosInstance } from "../../utils/axiosInstance";
import {useParams} from "react-router-dom"

// ─── Constants ────────────────────────────────────────────────
const BRAND = "#820c0c";
const ACCENT = "#c9643a";

// ─── Data ─────────────────────────────────────────────────────
const productx = {
  name: "Quista Active Milk Masala",
  subtitle: "Premium Ayurvedic Wellness Blend",
  sku: "QMM-200G-001",
  rating: 4.7,
  reviews: 1248,
  stock: 14,
  images: [
    bottle,
    bottle5,
    bottle1,
    bottle3,
    bottle2,
    
  ],
  // badges: ["100% Natural", "No Preservatives", "GMP Certified"],
  shortDesc:
    "A time-tested blend of 18 Ayurvedic herbs and spices, crafted to energize your body and calm your mind — one cup at a time.",
  variants: [
    { label: "10", price: 299, originalPrice: 599 },
    { label: "30", price: 549, originalPrice: 999 },
    { label: "60", price: 999, originalPrice: 1799 },
  ],
  highlights: [
    { icon: Leaf,   text: "18 Ayurvedic Herbs" },
    { icon: Zap,    text: "Boosts Immunity & Energy" },
    { icon: Award,  text: "GMP Certified Facility" },
    { icon: Shield, text: "No Artificial Additives" },
  ],
  ingredients:
    "Ashwagandha, Shatavari, Brahmi, Cardamom, Cinnamon, Ginger, Turmeric, Black Pepper, Saffron, Nutmeg, Clove, Long Pepper, Mulethi, Vidarikand, Gokhuru, Safed Musli, Kaunch Beej, Shilajit Extract.",
  howToUse:
    "Mix 1–2 teaspoons in a glass of warm milk (200 ml). Stir well and consume once or twice daily. Best taken in the morning or before bedtime for optimal results.",
  benefits: [
    "Enhances physical stamina and reduces fatigue",
    "Supports healthy immune function",
    "Promotes restful sleep and reduces stress",
    "Aids digestion and gut health",
    "Rich in antioxidants for cell protection",
  ],
  reviews_data: [
    { name: "Amit S.",  rating: 5, date: "12 Jan 2025", text: "Absolutely love this product. Noticed a huge difference in my energy levels within 2 weeks!", verified: true },
    { name: "Priya V.", rating: 4, date: "3 Feb 2025",  text: "Great taste and quality. My family drinks it every morning. Will definitely reorder.",        verified: true },
    { name: "Rahul M.", rating: 5, date: "20 Feb 2025", text: "Best milk masala I've tried. The Ayurvedic ingredients make a real difference.",              verified: true },
  ],
};

// ─── Sub-components ────────────────────────────────────────────

/** Star rating row */
const StarRow = ({ rating, size = 14 }) => (
  <div className="flex gap-0.5">
    {Array.from({ length: 5 }).map((_, i) => (
      <Star
        key={i}
        size={size}
        style={{
          fill:   i < Math.round(rating) ? "#f59e0b" : "none",
          stroke: i < Math.round(rating) ? "#f59e0b" : "#d1d5db",
        }}
      />
    ))}
  </div>
);

/** Collapsible accordion */
const AccordionItem = ({ title, children }) => {
  const [open, setOpen] = useState(false);
  return (
    <div className="border-b border-[#f0ece8]">
      <button
        onClick={() => setOpen(!open)}
        className="w-full flex items-center justify-between py-4 bg-transparent border-none cursor-pointer text-sm font-bold text-gray-900 text-left"
      >
        {title}
        {open
          ? <ChevronUp size={16} style={{ color: BRAND }} />
          : <ChevronDown size={16} className="text-gray-400" />}
      </button>
      {open && (
        <div className="pb-4 text-[13.5px] text-gray-600 leading-7">
          {children}
        </div>
      )}
    </div>
  );
};

// ─── Main Component ────────────────────────────────────────────
export default function SingleProduct() {
  const [activeImg,    setActiveImg]    = useState(0);
  const [variant,      setVariant]      = useState(0);
  const [qty,          setQty]          = useState(1);
  const [wishlisted,   setWishlisted]   = useState(false);
  const [addedToCart,  setAddedToCart]  = useState(false);
  const [activeTab,    setActiveTab]    = useState("description");
  const [zoomOrigin,   setZoomOrigin]   = useState("center center");
const [product,setProduct] = useState(null)
  // const v    = product.variants[variant];
  const disc = Math.round(((product?.originalPrice - product?.price) / product?.originalPrice) * 100);

  const handleAddToCart = () => {
    setAddedToCart(true);
    setTimeout(() => setAddedToCart(false), 2000);
  };

  const handleMouseMove = (e) => {
    const { left, top, width, height } = e.currentTarget.getBoundingClientRect();
    const x = ((e.clientX - left) / width)  * 100;
    const y = ((e.clientY - top)  / height) * 100;
    setZoomOrigin(`${x}% ${y}%`);
  };
useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
  // ── Render ──────────────────────────────────────────────────

const productId = useParams().id; // Assuming route is defined as /product/:id
  const fetchData = async()=>{
    try {
      const res= await axiosInstance.get(`/product/getProductById/${productId}`)
      console.log(res.data)
      setProduct(res?.data?.data)
    } catch (error) {
      
    }
  }

  useEffect(()=>{
    fetchData()
  },[])
  return (
    <div className="bg-[#fff] min-h-screen text-gray-900 ">

      {/* ── Breadcrumb ── */}
      <nav className="bg-white border-b border-[#f0ece8] px-5 md:px-10 py-3 flex items-center gap-1.5 text-xs text-gray-400 flex-wrap">
        {["Home", "Wellness", "Milk Masala"].map((crumb) => (
          <span key={crumb} className="flex items-center gap-1.5">
            <a href="#" className="hover:text-[#820c0c] transition-colors">{crumb}</a>
            <span>›</span>
          </span>
        ))}
        <span className="font-bold text-[#820c0c]">Quista Active Milk Masala</span>
      </nav>

      {/* ── Main Grid ── */}
      <div className="max-w-[1200px] mx-auto px-5 md:px-10 py-9 grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-14 items-start">

        {/* ════════════════════════════════
            LEFT — Product Gallery
            ════════════════════════════════ */}
        <div className="flex flex-col gap-3.5 md:sticky md:top-6">

          {/* Main image with zoom */}
          <div
            className="relative rounded-2xl overflow-hidden bg-white border border-[#f0ece8] aspect-square shadow-md cursor-zoom-in"
            onMouseMove={handleMouseMove}
          >
        <img
  src={
    product?.productImages?.[activeImg]
      ? `https://aayubakwath-backend.onrender.com/${product.productImages[activeImg]}`
      // ? `http://localhost:8080/${product.productImages[activeImg]}`
      : "/fallback.png"
  }
  alt="product"
  className="w-full h-full object-cover"
/>

            {/* Badge strip */}
            {/* <div className="absolute top-4 left-4 flex flex-col gap-1.5 z-10">
              {product.badges.slice(0, 2).map((b) => (
                <span
                  key={b}
                  className="text-[10px] px-3 py-0.5 rounded-full bg-white font-bold shadow"
                  style={{ color: BRAND }}
                >
                  ✓ {b}
                </span>
              ))}
            </div> */}

            {/* Discount badge */}
            

            <div style={{ position:"absolute", top:0, right:0, zIndex:5, background:'#FFB800', color:"#fff", padding:"10px 10px", fontWeight:800, textAlign:"center", lineHeight:1.7, clipPath:"polygon(0 0,100% 0,100% 75%,85% 100%,70% 75%,55% 100%,40% 75%,25% 100%,10% 75%,0 100%)", boxShadow:"0 4px 10px rgba(0,0,0,0.25)" }}>
          <div className="-mt-1.5">
            <div style={{ fontSize:16 }}>{disc}%</div>
            <div style={{ fontSize:10 }}>OFF</div>
          </div>
        </div>
          </div>

       <div className="flex gap-2.5">
  {product?.productImages?.map((img, i) => (
    <button
      key={i}
      onClick={() => setActiveImg(i)}
      className={[
        "w-[72px] h-[72px] rounded-xl overflow-hidden border-2 bg-white transition-all duration-200 flex-shrink-0",
        activeImg === i
          ? "border-[#820c0c] shadow-[0_0_0_3px_rgba(130,12,12,0.12)]"
          : "border-transparent hover:border-[#c9643a66]",
      ].join(" ")}
    >
      <img
  src={
    img?.startsWith("http")
      ? img
      : `https://aayubakwath-backend.onrender.com/${img.replace(/^\/+/, "")}`
      // : `http://localhost:8080/${img.replace(/^\/+/, "")}`
  }
  alt=""
  className="w-full h-full object-cover"
/>
    </button>
  ))}
</div>
        </div>

        {/* ════════════════════════════════
            RIGHT — Product Info
            ════════════════════════════════ */}
        <div className="flex flex-col gap-0">

          {/* Title */}
          <h1 className="text-[28px] md:text-[30px] font-bold text-gray-900 leading-tight mb-1.5">
            {product?.productName || "Product Name"}
          </h1>
          {/* <p className="text-lg font-semibold text-gray-500 mb-3.5">{product.subtitle}</p> */}

          {/* Rating row */}
          {/* <div className="flex items-center gap-2.5 mb-4 pb-4 border-b border-[#f0ece8] flex-wrap">
            <span className="font-extrabold text-[15px] text-gray-900">{product.rating}</span>
            <StarRow rating={product.rating} size={15} />
            <span className="text-[12.5px] text-gray-400">{product.reviews.toLocaleString()} reviews</span>
            <span className="ml-auto px-2.5 py-0.5 rounded-full bg-amber-50 text-amber-800 text-[11px] font-bold border border-amber-200">
              ⚡ Only {product.stock} left
            </span>
          </div> */}

          {/* Price block */}
          <div className="flex items-baseline gap-2.5 mb-4">
            <span className="text-[32px] font-bold" style={{ color: BRAND }}>₹{product?.finalPrice}</span>
            <span className="text-base text-gray-400 line-through">₹{product?.price}</span>
            <span className="px-2.5 py-1 rounded-full bg-emerald-50 text-emerald-600 text-xs font-extrabold border border-emerald-200">
              Save ₹{product?.price && product?.finalPrice ? product.price - product.finalPrice : 0}
            </span>
          </div>

          {/* Badge chips */}
          {/* <div className="flex flex-wrap gap-2 mb-4">
            {product.badges.map((b) => (
              <span
                key={b}
                className="flex items-center gap-1 text-[11px] font-bold px-2.5 py-1 rounded-full border"
                style={{ background: "#fdf4e7", color: BRAND, borderColor: "rgba(130,12,12,0.12)" }}
              >
                ✓ {b}
              </span>
            ))}
          </div> */}

          {/* Short description */}
          <p className="text-lg font-bold text-gray-500 leading-7 mb-4">{product?.productDescription}</p>

          {/* Highlights grid */}
          <div className="grid grid-cols-2 gap-2.5 mb-5">
            {productx.highlights.map(({ icon: Icon, text }) => (
              <div
                key={text}
                className="flex items-center gap-2.5 px-3 py-2.5 rounded-xl bg-white border border-[#f0ece8] text-[12.5px] font-bold text-gray-700 transition-colors hover:border-[#c9643a55]"
              >
                <Icon size={16} style={{ color: BRAND }} className="flex-shrink-0" />
                <span>{text}</span>
              </div>
            ))}
          </div>

          {/* Variant selector */}
          <p className="text-xs font-extrabold text-gray-700 tracking-widest uppercase mb-2">
            Capsule Quantity
          </p>
          {/* <div className="flex gap-2 mb-5">
            {product.variants.map((vv, i) => (
              <button
                key={i}
                onClick={() => setVariant(i)}
                className={[
                  "px-4 py-2 rounded-[10px] border text-[13px] font-bold transition-all duration-200",
                  variant === i
                    ? "border-[#820c0c] text-[#820c0c] bg-[rgba(130,12,12,0.05)]"
                    : "border-gray-200 bg-white text-gray-700 hover:border-[#c9643a55]",
                ].join(" ")}
              >
                {vv.label}
              </button>
            ))}
          </div> */}

          {/* Qty + Add to Cart */}
          <div className="flex gap-3 mb-3.5 items-stretch">
            {/* Quantity control */}
            <div className="flex items-center border border-gray-200 rounded-xl overflow-hidden bg-white">
              <button
                onClick={() => setQty((q) => Math.max(1, q - 1))}
                className="w-10 h-12 flex items-center justify-center text-gray-700 hover:bg-[#f9f5f2] transition-colors"
              >
                <Minus size={15} />
              </button>
              <div className="w-11 h-12 flex items-center justify-center font-extrabold text-[15px] text-gray-900 border-x border-[#f0ece8]">
                {qty}
              </div>
              <button
                onClick={() => setQty((q) => q + 1)}
                className="w-10 h-12 flex items-center justify-center text-gray-700 hover:bg-[#f9f5f2] transition-colors"
              >
                <Plus size={15} />
              </button>
            </div>

            {/* Add to Cart */}
            <button
              onClick={handleAddToCart}
              className={[
                "flex-1 h-12 rounded-xl border-none text-sm font-extrabold uppercase tracking-wide text-white flex items-center justify-center gap-2 transition-all duration-200 active:scale-[0.98]",
                addedToCart
                  ? "bg-emerald-600"
                  : "hover:opacity-90 hover:shadow-lg",
              ].join(" ")}
              style={{ background: addedToCart ? undefined : BRAND }}
            >
              {addedToCart
                ? <><Check size={16} /> Added!</>
                : <><ShoppingCart size={16} /> Add to Cart</>}
            </button>
          </div>

          {/* Buy Now */}
          <button
            className="w-full py-3 rounded-xl text-sm font-extrabold uppercase tracking-wide border-2 bg-white transition-all duration-200 mb-4 hover:text-white"
            style={{
              borderColor: BRAND,
              color: BRAND,
            }}
            onMouseEnter={(e) => { e.currentTarget.style.background = BRAND; e.currentTarget.style.color = "#fff"; }}
            onMouseLeave={(e) => { e.currentTarget.style.background = "#fff"; e.currentTarget.style.color = BRAND; }}
          >
            Buy Now — ₹{product?.finalPrice * qty}
          </button>

          {/* Wishlist + Share + SKU */}
          <div className="flex items-center gap-2.5 mb-5 flex-wrap">
            <button
              onClick={() => setWishlisted((w) => !w)}
              className={[
                "flex items-center gap-1.5 px-3.5 py-2 rounded-[10px] border text-[15px] font-bold transition-all duration-200",
                wishlisted
                  ? "border-red-400 text-red-500 bg-red-50"
                  : "border-gray-200 bg-white text-gray-700 hover:border-[#820c0c] hover:text-[#820c0c]",
              ].join(" ")}
            >
              <Heart size={15} style={{ fill: wishlisted ? "#ef4444" : "none" }} />
              {wishlisted ? "Wishlisted" : "Wishlist"}
            </button>

            <button className="flex items-center gap-1.5 px-3.5 py-2 rounded-[10px] border border-gray-200 bg-white text-[15px] font-bold text-gray-700 hover:border-[#820c0c] hover:text-[#820c0c] transition-all duration-200">
              <Share2 size={15} /> Share
            </button>

            {/* <span className="ml-auto text-[11.5px] text-gray-400 font-semibold">
              SKU: {product.sku}
            </span> */}
          </div>

          {/* Trust bar */}
          <div className="flex rounded-2xl border border-[#f0ece8] overflow-hidden bg-white flex-wrap">
            {[
              { icon: Truck,     label: "Free Delivery",  sub: "Above ₹499"           },
              { icon: RefreshCw, label: "60-Day Returns",  sub: "No questions asked"   },
              { icon: Shield,    label: "Secure Payment",  sub: "100% protected"       },
            ].map(({ icon: Icon, label, sub }, idx, arr) => (
              <div
                key={label}
                className={[
                  "flex-1 min-w-[100px] py-3 px-2.5 flex flex-col items-center gap-1.5 text-center",
                  idx < arr.length - 1 ? "border-r border-[#f0ece8]" : "",
                ].join(" ")}
              >
                <Icon size={18} style={{ color: BRAND }} />
                <span className="text-[15px] font-extrabold text-gray-700">{label}</span>
                <span className="text-[15px] text-gray-400 font-medium">{sub}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* ════════════════════════════════
          BOTTOM — Tabs Section
          ════════════════════════════════ */}
      <div className="max-w-[1200px] mx-auto px-5 md:px-10 pb-16">

        {/* Tab bar */}
        <div className="flex border-b-2 border-[#f0ece8] mb-7 overflow-x-auto">
          {["description", "ingredients", "reviews"].map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={[
                "px-5 md:px-6 py-3 border-none text-[13.5px] font-bold whitespace-nowrap transition-all duration-200 border-b-2 -mb-0.5",
                activeTab === tab
                  ? "text-[#820c0c] border-b-[#820c0c]"
                  : "text-gray-400 border-b-transparent hover:text-gray-700",
              ].join(" ")}
              style={activeTab === tab ? { borderBottomColor: BRAND } : {}}
            >
              {tab.charAt(0).toUpperCase() + tab.slice(1)}
              {/* {tab === "reviews" && ` (${product.reviews_data.length})`} */}
            </button>
          ))}
        </div>

        {/* ── Description Tab ── */}
        {activeTab === "description" && (
          <div className="max-w-[700px]">
            <p className="text-[19px] text-gray-700  text-lg leading-7 mb-5">
              Enriched with a carefully curated selection of traditional Ayurvedic herbs,
              this blend has been trusted by generations for its ability to naturally enhance vitality.
            </p>

            <AccordionItem title="Key Benefits " >
              <ul className="flex flex-col gap-2 list-none p-0 m-0">
                {productx.benefits.map((b) => (
                  <li key={b} className="flex gap-2 items-start  text-lg">
                    <Check size={14} style={{ color: BRAND }} className="mt-0.5  flex-shrink-0" />
                    {b}
                  </li>
                ))}
              </ul>
            </AccordionItem>

            <AccordionItem title="How to Use">
              <p className="text-lg" >{productx.howToUse}</p>
            </AccordionItem>

            <AccordionItem title="Storage Instructions">
              <p className="text-lg" >Store in a cool, dry place away from direct sunlight. Keep the lid tightly closed after every use. Best consumed within 12 months of manufacture date.</p>
            </AccordionItem>

            <AccordionItem title="Shipping & Returns">
              <p className="text-lg" >We offer free shipping on orders above ₹499. Orders are dispatched within 24 hours. You can return this product within 60 days for a full refund — no questions asked.</p>
            </AccordionItem>
          </div>
        )}

        {/* ── Ingredients Tab ── */}
        {activeTab === "ingredients" && (
          <div className="max-w-[700px]">
            <p className="text-md text-gray-700 leading-7 mb-4">
              <strong className="text-gray-900 text-lg">Full Ingredient List:</strong>
              <br />
              {productx.ingredients}
            </p>
            <div
              className="rounded-xl p-4 mt-4"
              style={{ background: "#fdf4e7", border: "1px solid rgba(130,12,12,.12)" }}
            >
              <p className="text-[12.5px] font-bold mb-1" style={{ color: BRAND }}>⚠ Allergen Notice</p>
              <p className="text-[12.5px] text-gray-600">
                Contains traces of nuts. Consult a healthcare professional if pregnant, nursing, or on medication.
              </p>
            </div>
          </div>
        )}

        {/* ── Reviews Tab ── */}
        {activeTab === "reviews" && (
          <div>
            {/* Rating summary */}
            <div className="flex items-center gap-6 mb-7 bg-white border border-[#f0ece8] rounded-2xl p-5 flex-wrap gap-y-4">
              <div className="text-center">
                <div className="text-5xl font-bold leading-none mb-1" style={{ color: BRAND }}>
                  {productx.rating}
                </div>
                <StarRow rating={productx.xrating} size={16} />
                <p className="text-xs text-gray-400 mt-1 font-semibold">
                  {productx.reviews.toLocaleString()} reviews
                </p>
              </div>

              <div className="flex-1 min-w-[160px] flex flex-col gap-1.5">
                {[5, 4, 3, 2, 1].map((s) => {
                  const pct = s === 5 ? 72 : s === 4 ? 18 : s === 3 ? 6 : s === 2 ? 2 : 2;
                  return (
                    <div key={s} className="flex items-center gap-2.5">
                      <span className="text-xs font-bold text-gray-700 w-1.5">{s}</span>
                      <Star size={11} style={{ fill: "#f59e0b", stroke: "#f59e0b", flexShrink: 0 }} />
                      <div className="flex-1 h-1.5 bg-[#f0ece8] rounded-full overflow-hidden">
                        <div
                          className="h-full rounded-full"
                          style={{
                            width: `${pct}%`,
                            background: `linear-gradient(to right, ${ACCENT}, ${BRAND})`,
                          }}
                        />
                      </div>
                      <span className="text-[11.5px] text-gray-400 w-7 text-right">{pct}%</span>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Review cards */}
            <div className="flex flex-col gap-4">
              {productx.reviews_data.map((r, i) => (
                <div
                  key={i}
                  className="bg-white border border-[#f0ece8] rounded-2xl p-5"
                >
                  {/* Reviewer header */}
                  <div className="flex items-center gap-3 mb-2.5">
                    <div
                      className="w-[38px] h-[38px] rounded-full flex items-center justify-center text-white text-sm font-extrabold flex-shrink-0"
                      style={{ background: BRAND }}
                    >
                      {r.name[0]}
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center gap-2 flex-wrap">
                        <span className="font-extrabold text-sm text-gray-900">{r.name}</span>
                        {r.verified && (
                          <span className="text-[10px] px-2 py-0.5 rounded-full bg-emerald-50 text-emerald-600 font-bold border border-emerald-200">
                            ✓ Verified
                          </span>
                        )}
                      </div>
                      <div className="flex items-center gap-2 mt-0.5">
                        <StarRow rating={r.rating} size={12} />
                        <span className="text-[11.5px] text-gray-400">{r.date}</span>
                      </div>
                    </div>
                  </div>
                  <p className="text-[13.5px] text-gray-600 leading-7">{r.text}</p>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}