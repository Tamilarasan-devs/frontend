import { useState } from "react";
import {
  Star, ShoppingCart, Heart, Share2, Shield, Truck, RefreshCw,
  ChevronDown, ChevronUp, Plus, Minus, Check, Leaf, Award, Zap
} from "lucide-react";
import RelatedProduct from "./ReleatedProduct";

const BRAND = "#820c0c";
const ACCENT = "#c9643a";

const product = {
  name: "Quista Active Milk Masala",
  subtitle: "Premium Ayurvedic Wellness Blend",
  sku: "QMM-200G-001",
  price: 299,
  originalPrice: 599,
  rating: 4.7,
  reviews: 1248,
  stock: 14,
  images: [
    "https://himalayawellness.in/cdn/shop/products/QUISTAACTIVEMILKMASALA200G.jpg?v=1629879986",
    "https://himalayawellness.in/cdn/shop/products/QUISTAACTIVEMILKMASALA200G.jpg?v=1629879986",
    "https://himalayawellness.in/cdn/shop/products/QUISTAACTIVEMILKMASALA200G.jpg?v=1629879986",
    "https://himalayawellness.in/cdn/shop/products/QUISTAACTIVEMILKMASALA200G.jpg?v=1629879986",
  ],
  badges: ["100% Natural", "No Preservatives", "GMP Certified"],
  shortDesc: "A time-tested blend of 18 Ayurvedic herbs and spices, crafted to energize your body and calm your mind — one cup at a time.",
  variants: [
    { label: "200g", price: 299, originalPrice: 599 },
    { label: "400g", price: 549, originalPrice: 999 },
    { label: "800g", price: 999, originalPrice: 1799 },
  ],
  highlights: [
    { icon: Leaf,  text: "18 Ayurvedic Herbs" },
    { icon: Zap,   text: "Boosts Immunity & Energy" },
    { icon: Award, text: "GMP Certified Facility" },
    { icon: Shield,text: "No Artificial Additives" },
  ],
  ingredients: "Ashwagandha, Shatavari, Brahmi, Cardamom, Cinnamon, Ginger, Turmeric, Black Pepper, Saffron, Nutmeg, Clove, Long Pepper, Mulethi, Vidarikand, Gokhuru, Safed Musli, Kaunch Beej, Shilajit Extract.",
  howToUse: "Mix 1–2 teaspoons in a glass of warm milk (200 ml). Stir well and consume once or twice daily. Best taken in the morning or before bedtime for optimal results.",
  benefits: [
    "Enhances physical stamina and reduces fatigue",
    "Supports healthy immune function",
    "Promotes restful sleep and reduces stress",
    "Aids digestion and gut health",
    "Rich in antioxidants for cell protection",
  ],
  reviews_data: [
    { name: "Amit S.", rating: 5, date: "12 Jan 2025", text: "Absolutely love this product. Noticed a huge difference in my energy levels within 2 weeks!", verified: true },
    { name: "Priya V.", rating: 4, date: "3 Feb 2025", text: "Great taste and quality. My family drinks it every morning. Will definitely reorder.", verified: true },
    { name: "Rahul M.", rating: 5, date: "20 Feb 2025", text: "Best milk masala I've tried. The Ayurvedic ingredients make a real difference.", verified: true },
  ],
};

const StarRow = ({ rating, size = 14, showEmpty = true }) => (
  <div style={{ display:"flex", gap:2 }}>
    {Array.from({ length: 5 }).map((_, i) => (
      <Star key={i} size={size}
        style={{ fill: i < Math.round(rating) ? "#f59e0b" : (showEmpty ? "none" : "none"),
                 stroke: i < Math.round(rating) ? "#f59e0b" : "#d1d5db" }} />
    ))}
  </div>
);

const AccordionItem = ({ title, children }) => {
  const [open, setOpen] = useState(false);
  return (
    <div style={{ borderBottom:"1px solid #f0ece8" }}>
      <button
        onClick={() => setOpen(!open)}
        style={{ width:"100%", display:"flex", alignItems:"center", justifyContent:"space-between",
                 padding:"16px 0", background:"none", border:"none", cursor:"pointer",
                 fontFamily:"'Nunito',sans-serif", fontSize:14, fontWeight:700, color:"#111827" }}
      >
        {title}
        {open ? <ChevronUp size={16} color={BRAND}/> : <ChevronDown size={16} color="#6b7280"/>}
      </button>
      {open && (
        <div style={{ paddingBottom:16, fontSize:13.5, color:"#4b5563", lineHeight:1.75,
                      fontFamily:"'Nunito',sans-serif" }}>
          {children}
        </div>
      )}
    </div>
  );
};

export default function SingleProduct() {
  const [activeImg, setActiveImg] = useState(0);
  const [variant, setVariant] = useState(0);
  const [qty, setQty] = useState(1);
  const [wishlisted, setWishlisted] = useState(false);
  const [addedToCart, setAddedToCart] = useState(false);
  const [activeTab, setActiveTab] = useState("description");

  const v = product.variants[variant];
  const disc = Math.round(((v.originalPrice - v.price) / v.originalPrice) * 100);

  const handleAddToCart = () => {
    setAddedToCart(true);
    setTimeout(() => setAddedToCart(false), 2000);
  };
  const [zoomStyle, setZoomStyle] = useState({
    transformOrigin: "center center",
  });

  const handleMouseMove = (e) => {
    const { left, top, width, height } =
      e.currentTarget.getBoundingClientRect();

    const x = ((e.clientX - left) / width) * 100;
    const y = ((e.clientY - top) / height) * 100;

    setZoomStyle({
      transformOrigin: `${x}% ${y}%`,
    });
  };

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Libre+Baskerville:ital,wght@0,400;0,700;1,400&family=Nunito:wght@400;500;600;700;800&display=swap');
        .sp-page {
          box-sizing: border-box;
          font-family: 'Nunito', sans-serif;
          background: #faf8f6;
          min-height: 100vh;
          color: #111827;
        }

        .sp-page *, .sp-page *::before, .sp-page *::after { box-sizing: border-box; }

        /* ── Breadcrumb ── */
        .sp-page .sp-breadcrumb {
          background: #fff; border-bottom: 1px solid #f0ece8;
          padding: 12px 40px; font-size:12.5px; color:#9ca3af;
          display:flex; align-items:center; gap:6px;
        }
        .sp-page .sp-breadcrumb a { color:#9ca3af; text-decoration:none; }
        .sp-page .sp-breadcrumb a:hover { color:${BRAND}; }
        .sp-page .sp-breadcrumb .cur { color:${BRAND}; font-weight:700; }

        /* ── Main grid ── */
        .sp-page .sp-main {
          max-width: 1200px; margin: 0 auto;
          padding: 36px 40px 60px;
          display: grid; grid-template-columns: 1fr 1fr; gap: 56px; align-items: start;
        }

        /* ── Image panel ── */
        .sp-page .sp-gallery { display:flex; flex-direction:column; gap:14px; position:sticky; top:24px; }
        .sp-page .sp-main-img {
          border-radius: 20px; overflow:hidden; background:#fff;
          border:1.5px solid #f0ece8; aspect-ratio:1/1; position:relative;
          box-shadow: 0 4px 24px rgba(0,0,0,.06);
        }
        .sp-page .sp-main-img img { width:100%; height:100%; object-fit:cover; transition:transform .4s ease; }
        .sp-page .sp-main-img:hover img { transform:scale(1.04); }

        .sp-page .sp-badge-strip {
          position:absolute; top:16px; left:16px; display:flex; flex-direction:column; gap:6px; z-index:5;
        }
        .sp-page .sp-disc-badge {
          position:absolute; top:16px; right:16px;
          width:52px; height:52px; border-radius:50%;
          background:${BRAND}; color:#fff;
          display:flex; flex-direction:column; align-items:center; justify-content:center;
          font-size:10px; font-weight:800; line-height:1.1;
          box-shadow: 0 3px 12px rgba(130,12,12,.35);
        }

        .sp-page .sp-thumbs { display:flex; gap:10px; }
        .sp-page .sp-thumb {
          width:72px; height:72px; border-radius:12px; overflow:hidden;
          border:2px solid transparent; cursor:pointer; background:#fff;
          transition:border-color .2s, box-shadow .2s;
          flex-shrink:0;
        }
        .sp-page .sp-thumb.active { border-color:${BRAND}; box-shadow:0 0 0 3px rgba(130,12,12,.12); }
        .sp-page .sp-thumb:hover:not(.active) { border-color:${ACCENT}55; }
        .sp-page .sp-thumb img { width:100%; height:100%; object-fit:cover; }

        /* ── Info panel ── */
        .sp-page .sp-info { display:flex; flex-direction:column; gap:0; }

        .sp-page .sp-eyebrow { font-size:11px; font-weight:800; letter-spacing:.2em; text-transform:uppercase; color:${ACCENT}; margin-bottom:8px; }
        .sp-page .sp-name {
          font-family:'Libre Baskerville',serif;
          font-size:30px; font-weight:700; color:#111827; line-height:1.2; margin-bottom:6px;
        }
        .sp-page .sp-subtitle { font-size:14px; color:#6b7280; margin-bottom:14px; }

        .sp-page .sp-rating-row {
          display:flex; align-items:center; gap:10px; margin-bottom:16px;
          padding-bottom:16px; border-bottom:1px solid #f0ece8;
        }
        .sp-page .sp-rating-num { font-weight:800; font-size:15px; color:#111827; }
        .sp-page .sp-review-count { font-size:12.5px; color:#9ca3af; }
        .sp-page .sp-stock-chip {
          margin-left:auto; padding:3px 10px; border-radius:99px;
          background:#fef3c7; color:#92400e; font-size:11px; font-weight:700;
          border:1px solid #fde68a;
        }

        /* Price */
        .sp-page .sp-price-block { display:flex; align-items:baseline; gap:10px; margin-bottom:18px; }
        .sp-page .sp-price { font-family:'Libre Baskerville',serif; font-size:32px; font-weight:700; color:${BRAND}; }
        .sp-page .sp-orig { font-size:16px; color:#9ca3af; text-decoration:line-through; }
        .sp-page .sp-save-tag {
          padding:4px 10px; border-radius:99px;
          background:rgba(5,150,105,.1); color:#059669;
          font-size:12px; font-weight:800; border:1px solid rgba(5,150,105,.2);
        }

        /* Badges */
        .sp-page .sp-badges { display:flex; flex-wrap:wrap; gap:7px; margin-bottom:18px; }
        .sp-page .sp-badge {
          display:flex; align-items:center; gap:5px;
          font-size:11px; font-weight:700; padding:4px 10px; border-radius:99px;
          background:#fdf4e7; color:${BRAND}; border:1px solid rgba(130,12,12,.12);
        }
        .sp-page .sp-badge::before { content:"✓"; font-size:10px; }

        /* Highlights */
        .sp-page .sp-highlights {
          display:grid; grid-template-columns:1fr 1fr; gap:10px; margin-bottom:20px;
        }
        .sp-page .sp-hl {
          display:flex; align-items:center; gap:9px;
          padding:10px 12px; border-radius:12px;
          background:#fff; border:1.5px solid #f0ece8;
          font-size:12.5px; font-weight:700; color:#374151;
          transition:border-color .2s;
        }
        .sp-page .sp-hl:hover { border-color:${ACCENT}55; }
        .sp-page .sp-hl-icon { color:${BRAND}; flex-shrink:0; }

        /* Variants */
        .sp-page .sp-label { font-size:12px; font-weight:800; color:#374151; letter-spacing:.06em; text-transform:uppercase; margin-bottom:8px; }
        .sp-page .sp-variants { display:flex; gap:8px; margin-bottom:20px; }
        .sp-page .sp-variant {
          padding:8px 18px; border-radius:10px; cursor:pointer;
          border:1.5px solid #e5e7eb; background:#fff;
          font-family:'Nunito',sans-serif; font-size:13px; font-weight:700; color:#374151;
          transition:all .2s;
        }
        .sp-page .sp-variant.active { border-color:${BRAND}; background:rgba(130,12,12,.05); color:${BRAND}; }
        .sp-page .sp-variant:hover:not(.active) { border-color:${ACCENT}55; }

        /* Qty + CTA */
        .sp-page .sp-qty-row { display:flex; gap:12px; margin-bottom:14px; align-items:stretch; }
        .sp-page .sp-qty {
          display:flex; align-items:center; gap:0;
          border:1.5px solid #e5e7eb; border-radius:12px; overflow:hidden; background:#fff;
        }
        .sp-page .sp-qty button {
          width:40px; height:48px; border:none; background:none; cursor:pointer;
          display:flex; align-items:center; justify-content:center; color:#374151;
          transition:background .15s;
        }
        .sp-page .sp-qty button:hover { background:#f9f5f2; }
        .sp-page .sp-qty-num {
          width:44px; text-align:center; font-weight:800; font-size:15px; color:#111827;
          border-left:1px solid #f0ece8; border-right:1px solid #f0ece8;
          display:flex; align-items:center; justify-content:center;
        }

        .sp-page .sp-cart-btn {
          flex:1; padding:0 24px; border-radius:12px; border:none; cursor:pointer;
          font-family:'Nunito',sans-serif; font-size:14px; font-weight:800;
          letter-spacing:.05em; text-transform:uppercase;
          background:${BRAND}; color:#fff; height:48px;
          display:flex; align-items:center; justify-content:center; gap:8px;
          transition:background .25s, box-shadow .25s, transform .12s;
          position:relative; overflow:hidden;
        }
        .sp-page .sp-cart-btn::after {
          content:''; position:absolute; inset:0;
          background:linear-gradient(120deg,transparent 30%,rgba(255,255,255,.12) 50%,transparent 70%);
          transform:translateX(-100%); transition:transform .4s ease;
        }
        .sp-page .sp-cart-btn:hover { background:${ACCENT}; box-shadow:0 6px 20px rgba(201,100,58,.35); }
        .sp-page .sp-cart-btn:hover::after { transform:translateX(100%); }
        .sp-page .sp-cart-btn:active { transform:scale(.98); }
        .sp-page .sp-cart-btn.added { background:#059669; }

        .sp-page .sp-buy-btn {
          width:100%; padding:13px 0; border-radius:12px; border:2px solid ${BRAND};
          font-family:'Nunito',sans-serif; font-size:14px; font-weight:800;
          letter-spacing:.05em; text-transform:uppercase;
          background:#fff; color:${BRAND}; cursor:pointer; margin-bottom:18px;
          transition:background .2s, color .2s;
        }
        .sp-page .sp-buy-btn:hover { background:${BRAND}; color:#fff; }

        .sp-page .sp-wish-share { display:flex; gap:10px; margin-bottom:22px; }
        .sp-page .sp-icon-btn {
          display:flex; align-items:center; gap:6px;
          padding:8px 14px; border-radius:10px;
          border:1.5px solid #e5e7eb; background:#fff; cursor:pointer;
          font-family:'Nunito',sans-serif; font-size:12.5px; font-weight:700; color:#374151;
          transition:all .2s;
        }
        .sp-page .sp-icon-btn:hover { border-color:${BRAND}; color:${BRAND}; }
        .sp-page .sp-icon-btn.active { border-color:#ef4444; color:#ef4444; background:#fef2f2; }

        /* Trust bar */
        .sp-page .sp-trust {
          display:flex; gap:0; border:1.5px solid #f0ece8; border-radius:14px;
          overflow:hidden; background:#fff; margin-bottom:0;
        }
        .sp-page .sp-trust-item {
          flex:1; padding:12px 10px; display:flex; flex-direction:column; align-items:center;
          gap:5px; font-size:11px; font-weight:700; color:#374151; text-align:center;
          border-right:1px solid #f0ece8;
        }
        .sp-page .sp-trust-item:last-child { border-right:none; }
        .sp-page .sp-trust-item svg { color:${BRAND}; }

        /* ── Tabs section ── */
        .sp-page .sp-bottom { max-width:1200px; margin:0 auto; padding:0 40px 60px; }
        .sp-page .sp-tabs { display:flex; gap:0; border-bottom:2px solid #f0ece8; margin-bottom:28px; }
        .sp-page .sp-tab {
          padding:12px 24px; border:none; background:none; cursor:pointer;
          font-family:'Nunito',sans-serif; font-size:13.5px; font-weight:700; color:#9ca3af;
          border-bottom:2.5px solid transparent; margin-bottom:-2px;
          transition:color .2s, border-color .2s;
        }
        .sp-page .sp-tab.active { color:${BRAND}; border-bottom-color:${BRAND}; }
        .sp-page .sp-tab:hover:not(.active) { color:#374151; }

        .sp-page .sp-tab-body { font-size:14px; color:#4b5563; line-height:1.8; }

        /* Review cards */
        .sp-page .sp-review-grid { display:flex; flex-direction:column; gap:16px; }
        .sp-page .sp-review-card {
          background:#fff; border:1.5px solid #f0ece8; border-radius:14px;
          padding:18px 20px;
        }
        .sp-page .sp-review-header { display:flex; align-items:center; gap:12px; margin-bottom:10px; }
        .sp-page .sp-reviewer-avatar {
          width:38px; height:38px; border-radius:50%; background:${BRAND};
          display:flex; align-items:center; justify-content:center;
          color:#fff; font-size:14px; font-weight:800; flex-shrink:0;
        }

        /* Accordions */
        .sp-page .sp-accordions { max-width:700px; }

        @media (max-width:768px) {
          .sp-page .sp-main { grid-template-columns:1fr; gap:32px; padding:24px 20px 40px; }
          .sp-page .sp-gallery { position:static; }
          .sp-page .sp-highlights { grid-template-columns:1fr 1fr; }
          .sp-page .sp-trust { flex-wrap:wrap; }
          .sp-page .sp-bottom { padding:0 20px 40px; }
          .sp-page .sp-breadcrumb { padding:12px 20px; }
        }
      `}</style>

      <div className="sp-page">
        {/* Breadcrumb */}
        <nav className="sp-breadcrumb">
          <a href="#">Home</a> <span>›</span>
          <a href="#">Wellness</a> <span>›</span>
          <a href="#">Milk Masala</a> <span>›</span>
          <span className="cur">Quista Active Milk Masala</span>
        </nav>

        {/* Main grid */}
        <div className="sp-main">

          {/* ── LEFT: Gallery ── */}
          <div className="sp-gallery">
            <div
      onMouseMove={handleMouseMove}
      className="relative overflow-hidden rounded-xl cursor-zoom-in"
    >
      <img
        src={product.images[activeImg]}
        alt={product.name}
        style={zoomStyle}
        className="w-full transition-transform duration-200 hover:scale-150"
      />

      {/* Badge strip */}
      <div className="absolute top-3 left-3 flex gap-2">
        {product.badges.slice(0, 2).map((b, i) => (
          <span
            key={i}
            className="text-[10px] px-3 py-[3px] rounded-full bg-white font-bold shadow"
            style={{ color: BRAND }}
          >
            ✓ {b}
          </span>
        ))}
      </div>

      {/* Discount circle */}
      <div className="absolute top-3 right-3 bg-red-500 text-white rounded-full w-12 h-12 flex flex-col items-center justify-center text-xs font-bold shadow">
        <span>OFF</span>
        <span className="text-sm">{disc}%</span>
      </div>
    </div>
            {/* Thumbnails */}
            <div className="sp-thumbs">
              {product.images.map((img, i) => (
                <div key={i} className={`sp-thumb${activeImg === i ? " active" : ""}`}
                  onClick={() => setActiveImg(i)}>
                  <img src={img} alt="" />
                </div>
              ))}
            </div>
          </div>

          {/* ── RIGHT: Info ── */}
          <div className="sp-info">
            <p className="sp-eyebrow">Ayurvedic Wellness</p>
            <h1 className="sp-name">{product.name}</h1>
            <p className="sp-subtitle">{product.subtitle}</p>

            {/* Rating row */}
            <div className="sp-rating-row">
              <span className="sp-rating-num">{product.rating}</span>
              <StarRow rating={product.rating} size={15} />
              <span className="sp-review-count">{product.reviews.toLocaleString()} reviews</span>
              <span className="sp-stock-chip">⚡ Only {product.stock} left</span>
            </div>

            {/* Price */}
            <div className="sp-price-block">
              <span className="sp-price">₹{v.price}</span>
              <span className="sp-orig">₹{v.originalPrice}</span>
              <span className="sp-save-tag">Save ₹{v.originalPrice - v.price}</span>
            </div>

            {/* Badges */}
            <div className="sp-badges">
              {product.badges.map((b) => (
                <span key={b} className="sp-badge">{b}</span>
              ))}
            </div>

            {/* Short description */}
            <p style={{ fontSize:14, color:"#4b5563", lineHeight:1.75, marginBottom:18 }}>
              {product.shortDesc}
            </p>

            {/* Highlights */}
            <div className="sp-highlights">
              {product.highlights.map(({ icon: Icon, text }) => (
                <div key={text} className="sp-hl">
                  <Icon size={16} className="sp-hl-icon" style={{ color:BRAND }} />
                  <span>{text}</span>
                </div>
              ))}
            </div>

            {/* Variants */}
            <p className="sp-label">Pack Size</p>
            <div className="sp-variants">
              {product.variants.map((vv, i) => (
                <button key={i} className={`sp-variant${variant === i ? " active" : ""}`}
                  onClick={() => setVariant(i)}>
                  {vv.label}
                </button>
              ))}
            </div>

            {/* Qty + Add to cart */}
            <div className="sp-qty-row">
              <div className="sp-qty">
                <button onClick={() => setQty(q => Math.max(1, q - 1))}><Minus size={15}/></button>
                <div className="sp-qty-num">{qty}</div>
                <button onClick={() => setQty(q => q + 1)}><Plus size={15}/></button>
              </div>
              <button className={`sp-cart-btn${addedToCart ? " added" : ""}`} onClick={handleAddToCart}>
                {addedToCart
                  ? <><Check size={16}/> Added!</>
                  : <><ShoppingCart size={16}/> Add to Cart</>
                }
              </button>
            </div>

            {/* Buy now */}
            <button className="sp-buy-btn">Buy Now — ₹{v.price * qty}</button>

            {/* Wishlist + Share */}
            <div className="sp-wish-share">
              <button className={`sp-icon-btn${wishlisted ? " active" : ""}`}
                onClick={() => setWishlisted(w => !w)}>
                <Heart size={15} style={{ fill: wishlisted ? "#ef4444" : "none" }} />
                {wishlisted ? "Wishlisted" : "Wishlist"}
              </button>
              <button className="sp-icon-btn">
                <Share2 size={15}/> Share
              </button>
              <span style={{ marginLeft:"auto", fontSize:11.5, color:"#9ca3af", fontWeight:600, alignSelf:"center" }}>
                SKU: {product.sku}
              </span>
            </div>

            {/* Trust bar */}
            <div className="sp-trust">
              {[
                { icon: Truck,     label: "Free Delivery", sub: "Above ₹499" },
                { icon: RefreshCw, label: "60-Day Returns", sub: "No questions asked" },
                { icon: Shield,    label: "Secure Payment", sub: "100% protected" },
              ].map(({ icon: Icon, label, sub }) => (
                <div key={label} className="sp-trust-item">
                  <Icon size={18} />
                  <span style={{ fontWeight:800, fontSize:11.5 }}>{label}</span>
                  <span style={{ fontSize:10, color:"#9ca3af", fontWeight:500 }}>{sub}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* ── Bottom Tabs ── */}
        <div className="sp-bottom">
          <div className="sp-tabs">
            {["description", "ingredients", "reviews"].map((tab) => (
              <button key={tab} className={`sp-tab${activeTab === tab ? " active" : ""}`}
                onClick={() => setActiveTab(tab)}>
                {tab.charAt(0).toUpperCase() + tab.slice(1)}
                {tab === "reviews" && ` (${product.reviews_data.length})`}
              </button>
            ))}
          </div>

          <div className="sp-tab-body">
            {activeTab === "description" && (
              <div className="sp-accordions">
                <p style={{ marginBottom:20, fontSize:14.5, color:"#374151", lineHeight:1.8 }}>
                  {product.shortDesc} Enriched with a carefully curated selection of
                  traditional Ayurvedic herbs, this blend has been trusted by generations
                  for its ability to naturally enhance vitality.
                </p>
                <AccordionItem title="Key Benefits">
                  <ul style={{ listStyle:"none", display:"flex", flexDirection:"column", gap:8 }}>
                    {product.benefits.map((b) => (
                      <li key={b} style={{ display:"flex", gap:8, alignItems:"flex-start" }}>
                        <Check size={14} style={{ color:BRAND, marginTop:3, flexShrink:0 }} />
                        {b}
                      </li>
                    ))}
                  </ul>
                </AccordionItem>
                <AccordionItem title="How to Use">
                  <p>{product.howToUse}</p>
                </AccordionItem>
                <AccordionItem title="Storage Instructions">
                  <p>Store in a cool, dry place away from direct sunlight. Keep the lid tightly closed after every use. Best consumed within 12 months of manufacture date.</p>
                </AccordionItem>
                <AccordionItem title="Shipping & Returns">
                  <p>We offer free shipping on orders above ₹499. Orders are dispatched within 24 hours. You can return this product within 60 days for a full refund — no questions asked.</p>
                </AccordionItem>
              </div>
            )}

            {activeTab === "ingredients" && (
              <div style={{ maxWidth:700 }}>
                <p style={{ marginBottom:16, fontSize:14, color:"#374151", lineHeight:1.8 }}>
                  <strong style={{ fontFamily:"'Libre Baskerville',serif", color:"#111827" }}>Full Ingredient List:</strong>
                  <br/>{product.ingredients}
                </p>
                <div style={{ background:"#fdf4e7", border:"1px solid rgba(130,12,12,.12)",
                  borderRadius:12, padding:"14px 18px", marginTop:16 }}>
                  <p style={{ fontSize:12.5, color:BRAND, fontWeight:700, marginBottom:4 }}>⚠ Allergen Notice</p>
                  <p style={{ fontSize:12.5, color:"#4b5563" }}>Contains traces of nuts. Consult a healthcare professional if pregnant, nursing, or on medication.</p>
                </div>
              </div>
            )}

            {activeTab === "reviews" && (
              <div>
                {/* Summary */}
                <div style={{ display:"flex", alignItems:"center", gap:24, marginBottom:28,
                  background:"#fff", border:"1.5px solid #f0ece8", borderRadius:16, padding:"20px 24px" }}>
                  <div style={{ textAlign:"center" }}>
                    <div style={{ fontFamily:"'Libre Baskerville',serif", fontSize:48, fontWeight:700, color:BRAND, lineHeight:1 }}>
                      {product.rating}
                    </div>
                    <StarRow rating={product.rating} size={16} />
                    <p style={{ fontSize:12, color:"#9ca3af", marginTop:4, fontWeight:600 }}>
                      {product.reviews.toLocaleString()} reviews
                    </p>
                  </div>
                  <div style={{ flex:1, display:"flex", flexDirection:"column", gap:6 }}>
                    {[5,4,3,2,1].map((s) => {
                      const pct = s === 5 ? 72 : s === 4 ? 18 : s === 3 ? 6 : s === 2 ? 2 : 2;
                      return (
                        <div key={s} style={{ display:"flex", alignItems:"center", gap:10 }}>
                          <span style={{ fontSize:12, fontWeight:700, color:"#374151", width:6 }}>{s}</span>
                          <Star size={11} style={{ fill:"#f59e0b", stroke:"#f59e0b", flexShrink:0 }}/>
                          <div style={{ flex:1, height:6, background:"#f0ece8", borderRadius:99, overflow:"hidden" }}>
                            <div style={{ width:`${pct}%`, height:"100%", background:`linear-gradient(to right,${ACCENT},${BRAND})`, borderRadius:99 }}/>
                          </div>
                          <span style={{ fontSize:11.5, color:"#9ca3af", width:28, textAlign:"right" }}>{pct}%</span>
                        </div>
                      );
                    })}
                  </div>
                </div>

                {/* Individual reviews */}
                <div className="sp-review-grid">
                  {product.reviews_data.map((r, i) => (
                    <div key={i} className="sp-review-card">
                      <div className="sp-review-header">
                        <div className="sp-reviewer-avatar">{r.name[0]}</div>
                        <div style={{ flex:1 }}>
                          <div style={{ display:"flex", alignItems:"center", gap:8 }}>
                            <span style={{ fontWeight:800, fontSize:14, color:"#111827" }}>{r.name}</span>
                            {r.verified && (
                              <span style={{ fontSize:10, padding:"2px 7px", borderRadius:99,
                                background:"#ecfdf5", color:"#059669", fontWeight:700,
                                border:"1px solid #a7f3d0" }}>✓ Verified</span>
                            )}
                          </div>
                          <div style={{ display:"flex", alignItems:"center", gap:8, marginTop:2 }}>
                            <StarRow rating={r.rating} size={12}/>
                            <span style={{ fontSize:11.5, color:"#9ca3af" }}>{r.date}</span>
                          </div>
                        </div>
                      </div>
                      <p style={{ fontSize:13.5, color:"#4b5563", lineHeight:1.7 }}>{r.text}</p>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
      <RelatedProduct/>
    </>
  );
}