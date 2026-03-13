import { useRef, useState, useEffect, useCallback } from "react";
import bottle from '../../assets/images/btl.jpg';
import bottle1 from '../../assets/images/btl1.jpg';
import { useNavigate } from "react-router-dom";
import { FaShoppingCart } from "react-icons/fa";

const products = [
  { id: 1, name: "Quista Active Milk Masala", price: 99.99, originalPrice: 199.99, description: "A nutritious blend of Ayurvedic.", rating: 4.5, reviews: 248, badge: "New Launches", image: bottle, hoverImage: bottle1, tags: ["Spicy", "Healthy", "Indian"] },
  { id: 2, name: "Herbal Face Wash", price: 149.99, originalPrice: 249.99, description: "Gentle herbal formulation that.", rating: 4, reviews: 184, badge: "Must Try!", image: bottle, hoverImage: bottle1, tags: ["Skin Care", "Herbal", "Refresh"] },
  { id: 3, name: "Protein Powder", price: 299.99, originalPrice: 499.99, description: "High-quality protein supplement.", rating: 5, reviews: 512, badge: "Top Rated", image: bottle, hoverImage: bottle1, tags: ["Fitness", "Protein", "Muscle"] },
  { id: 4, name: "Ayurvedic Tablets", price: 199.99, originalPrice: 329.99, description: "Traditional Ayurvedic formulation.", rating: 3.5, reviews: 97, badge: "Must Try!", image: bottle, hoverImage: bottle1, tags: ["Immunity", "Ayurvedic", "Wellness"] },
  { id: 5, name: "Vitamin C Boost", price: 179.99, originalPrice: 289.99, description: "Effervescent Vitamin C tablets to.", rating: 4.2, reviews: 321, badge: "Fast Moving", image: bottle, hoverImage: bottle1, tags: ["Vitamin", "Immunity", "Daily"] },
  { id: 6, name: "Hair Growth Serum", price: 349.99, originalPrice: 549.99, description: "Advanced botanical serum that.", rating: 4.7, reviews: 430, badge: "Limited Stock", image: bottle, hoverImage: bottle1, tags: ["Hair Care", "Botanical", "Serum"] },
  { id: 7, name: "Digestive Churna", price: 89.99, originalPrice: 149.99, description: "Classic Ayurvedic churna blend to support.", rating: 4.0, reviews: 156, badge: "Top Rated", image: bottle, hoverImage: bottle1, tags: ["Digestive", "Ayurvedic", "Gut"] },
];

const CARD_W = 272;
const CARD_GAP = 20;

const badgeColors = {
  "New Launches":   { bg: "#FACC15", border: "#F59E0B", text: "#000000" }, // yellow-400 / yellow-500 / black
  "Must Try!":      { bg: "#0EA5E9", border: "#0284C7", text: "#FFFFFF" }, // sky-500 / sky-600 / white
  "Top Rated":      { bg: "#22C55E", border: "#16A34A", text: "#FFFFFF" }, // green-500 / green-600 / white
  "Fast Moving":    { bg: "#84CC16", border: "#65A30D", text: "#000000" }, // lime-500 / lime-600 / black
  "Hot Seller":     { bg: "#EC4899", border: "#DB2777", text: "#FFFFFF" }, // pink-500 / pink-600 / white
  "Limited Stock":  { bg: "#EF4444", border: "#B91C1C", text: "#FFFFFF" }, // red-500 / red-600 / white
};

/* ─── Arrow Button ────────────────────────────────────────── */
function ArrowBtn({ dir, onClick }) {
  return (
    <button
      onClick={onClick}
      className="w-10 h-10 rounded-full border border-gray-200 bg-white text-gray-700 text-lg
        flex items-center justify-center cursor-pointer flex-shrink-0
        hover:bg-[#820c0c] hover:text-white hover:border-[#820c0c]
        hover:shadow-[0_4px_14px_rgba(130,12,12,0.25)]
        shadow-[0_1px_4px_rgba(0,0,0,0.07)]
        transition-all duration-200 ease-in-out"
    >
      {dir === "prev" ? "‹" : "›"}
    </button>
  );
}

/* ─── Product Card ────────────────────────────────────────── */
function ProductCard({ product, animDelay }) {
  const [hov, setHov] = useState(false);
  const [btnHov, setBtnHov] = useState(false);
  const disc = Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100);
  const navigate = useNavigate();

  return (
    <div
      onMouseEnter={() => setHov(true)}
      onMouseLeave={() => setHov(false)}
      onMouseDown={(e) => e.stopPropagation()}
      className="flex-shrink-0 bg-whiterounded-lg overflow-hidden relative rounded-2xl cursor-pointer select-none"
      style={{
        width: CARD_W,
        border: `1.5px solid ${hov ? "rgba(201,100,58,.33)" : "#f0ece8"}`,
        zIndex: hov ? 40 : 10,
        transform: hov ? "translateY(-12px) scale(1.015)" : "translateY(0) scale(1)",
        boxShadow: hov
          ? "0 20px 48px rgba(130,12,12,.10), 0 4px 16px rgba(0,0,0,.06)"
          : "0 1px 4px rgba(0,0,0,.04)",
        transition: "transform .35s cubic-bezier(.22,.68,0,1.15), box-shadow .35s ease, border-color .3s ease",
        animation: `cardIn .45s ease ${animDelay}s both`,
      }}
    >
      {/* ── Image Area ── */}
      {/* rounded container with side margin so ribbon + tags sit inside cleanly */}
   {product.badge && (
  <span
    className="absolute top-3 left-3 text-xs px-2 py-1 rounded z-10 font-semibold"
    style={{
      backgroundColor: badgeColors[product.badge]?.bg || "#A1A1AA", // use .bg
      color: badgeColors[product.badge]?.text || "#FFFFFF",           // use .text
      border: `1px solid ${badgeColors[product.badge]?.border || "#888"}`, // optional border
    }}
  >
    {product.badge}
  </span>
)}
       
      <div
        className="relative overflow-hidden bg-[#f9f5f2]   rounded-xl"
        style={{ height: 250 }}
        onClick={() => navigate('/product')}
      >
        
        {/* Primary image */}
        <img
          src={product.image}
          alt={product.name}
          draggable={false}
          className="absolute inset-0 w-full h-full object-cover "
          style={{
            opacity: hov ? 0 : 1,
            transform: hov ? "scale(1.06)" : "scale(1)",
            transition: "opacity .4s ease, transform .6s ease",
          }}
        />
        {/* Hover image */}
        <img
          src={product.hoverImage}
          alt={product.name}
          draggable={false}
          className="absolute inset-0 w-full h-full object-cover"
          style={{
            opacity: hov ? 1 : 0,
            transform: hov ? "scale(1)" : "scale(1.06)",
            transition: "opacity .4s ease, transform .6s ease",
          }}
        />

        {/* Tags — bottom-left, revealed on hover */}
        <div
          className="absolute bottom-2 left-2 flex flex-col gap-1 z-10"
          style={{
            opacity: hov ? 1 : 0,
            transform: hov ? "translateY(0)" : "translateY(6px)",
            transition: "opacity .25s ease, transform .25s ease",
          }}
        >
          {product.tags.map((t, i) => (
            <span
              key={i}
              className="text-[9.5px] px-2.5 py-[3px] rounded-full bg-[#820c0c] text-white
                font-bold tracking-[.05em] uppercase shadow-sm w-fit"
            >
              {t}
            </span>
          ))}
        </div>

        {/* Discount ribbon — top-right corner */}
        {/* Discount ribbon — top-right corner */}
<div
  className="absolute top-0 right-0 z-10 text-white font-extrabold text-center"
  style={{
    background: "#FFB800",
    padding: "14px 10px 18px",
    lineHeight: 1.1,
    clipPath: "polygon(100% 0,0 0,0 75%,15% 100%,30% 75%,45% 100%,60% 75%,75% 100%,90% 75%,100% 100%)",
    boxShadow: "0 4px 10px rgba(0,0,0,0.2)",
    minWidth: 44,
  }}
>
  <div className="text-[17px] font-black">{disc}%</div>
  <div className="text-[10px] font-bold -mt-0.5">OFF</div>
</div>
      </div>

      {/* ── Card Body ── */}
      <div className="px-[18px] pt-4 pb-5">
        {/* Badge */}
        

        {/* Product Name */}
        <div className="inline-block group mb-1 max-w-full">
          <h3 className="text-[15.5px] font-bold text-[#1a1a1a] whitespace-nowrap overflow-hidden text-ellipsis max-w-[236px]">
            {product.name}
          </h3>
          <div className="h-0.5 w-0 group-hover:w-full transition-all duration-300 bg-[#820c0c]" />
        </div>

        {/* Description */}
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
        

        {/* Rating & Reviews */}
        {product.rating && (
          <div className="flex items-center gap-3 mb-1 justify-between">
            <span className="text-xs font-semibold text-amber-400 flex items-center gap-1 ">
              <span>⭐</span>
              <span>{product.rating.toFixed(1)} Ratings</span>
            </span>
            <span className="text-xs font-semibold text-gray-500">
              ({product.reviews}) Reviews
            </span>
          </div>
        )}

        {/* Price */}
        <div className="flex items-baseline gap-1.5 mt-2.5 mb-1.5">
          <span className="font-['Libre_Baskerville'] text-xl font-bold text-[#820c0c]">
            ₹{product.price}
          </span>
          <span className="text-[13px] text-gray-400 line-through">
            ₹{product.originalPrice}
          </span>
          <span className="ml-auto text-[11px] text-emerald-600 font-bold bg-emerald-50 px-2 py-0.5 rounded-full">
            Save ₹{(product.originalPrice - product.price).toFixed(0)}
          </span>
        </div>

        {/* Promo code */}
        <div
          className="text-[10px] sm:text-xs font-bold text-center py-1 px-2 rounded-lg mb-2.5 border border-dashed text-[#820c0c] bg-[#fff4f4]"
          style={{ borderColor: "rgba(130,12,12,.25)" }}
        >
          Use code <strong>GRAB</strong> → Get @ ₹{product.price - 20}
        </div>

        <div className="h-px bg-gray-100 my-3" />

        {/* Add to Cart */}
        <button
          onMouseEnter={() => setBtnHov(true)}
          onMouseLeave={() => setBtnHov(false)}
          className="w-full py-3 text-sm font-semibold tracking-wide uppercase
            flex items-center justify-center gap-2 text-white cursor-pointer
            rounded-tl-[50px] rounded-br-[50px] rounded-tr-none rounded-bl-none
            transition-all duration-300 ease-in-out"
          style={{
            background: btnHov ? "#c9643a" : "#820c0c",
            boxShadow: btnHov ? "0 6px 20px rgba(201,100,58,.35)" : "none",
          }}
        >
          <FaShoppingCart size={14} />
          Add to Cart
        </button>
      </div>
    </div>
  );
}

/* ─── Main Component ──────────────────────────────────────── */
export default function TopSelling() {
  const trackRef  = useRef(null);
  const barRef    = useRef(null);
  const [prog, setProg]         = useState(0);
  const [active, setActive]     = useState(0);
  const [dragging, setDragging] = useState(false);
  const [thumbW, setThumbW]     = useState(30);
  const [thumbL, setThumbL]     = useState(0);
  const dragX   = useRef(0);
  const dragSL  = useRef(0);
  const isThumb = useRef(false);

  /* ── recalculate thumb width + position from current scroll state ── */
  const recalcThumb = useCallback(() => {
    const el = trackRef.current;
    if (!el) return;
    const scrollable = el.scrollWidth - el.clientWidth;
    if (scrollable <= 0) { setThumbW(100); setThumbL(0); return; }

    // thumb width shrinks as more content exists relative to viewport
    const visibleRatio = el.clientWidth / el.scrollWidth;
    const w = Math.max(visibleRatio * 100, 6);          // min 6%

    // thumb position: how far scrolled → map to remaining bar space
    const scrollProgress = el.scrollLeft / scrollable;
    const maxLeft = 100 - w;
    setThumbW(w);
    setThumbL(scrollProgress * maxLeft);
  }, []);

  const onScroll = useCallback(() => {
    const el = trackRef.current;
    if (!el) return;
    const scrollable = el.scrollWidth - el.clientWidth;
    const p = scrollable > 0 ? el.scrollLeft / scrollable : 0;
    setProg(p);
    setActive(Math.min(Math.round(el.scrollLeft / (CARD_W + CARD_GAP)), products.length - 1));
    recalcThumb();
  }, [recalcThumb]);

  useEffect(() => {
    const el = trackRef.current;
    if (!el) return;
    recalcThumb();
    el.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", recalcThumb);
    return () => {
      el.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", recalcThumb);
    };
  }, [onScroll, recalcThumb]);

  const toCard = (i) => trackRef.current?.scrollTo({ left: i * (CARD_W + CARD_GAP), behavior: "smooth" });
  const byCard = (d) => {
  const el = trackRef.current;
  if (!el) return;

  const scrollAmount = d * (CARD_W + CARD_GAP);

  el.scrollBy({
    left: scrollAmount,
    behavior: "smooth",
  });

  requestAnimationFrame(() => {
    const scrollable = el.scrollWidth - el.clientWidth;
    const p = scrollable > 0 ? el.scrollLeft / scrollable : 0;
    setProg(p);
    recalcThumb();
  });
};
  const startDrag = (e, thumb) => {
    e.preventDefault();
    isThumb.current = thumb;
    setDragging(true);
    dragX.current  = e.clientX;
    dragSL.current = trackRef.current?.scrollLeft ?? 0;
  };

  useEffect(() => {
    if (!dragging) return;
    const mv = (e) => {
      const el = trackRef.current;
      if (!el) return;
      if (isThumb.current) {
        const bar = barRef.current;
        if (!bar) return;
        const barPx   = bar.clientWidth;
        const thumbPx = (el.clientWidth / el.scrollWidth) * barPx;
        const scale   = (el.scrollWidth - el.clientWidth) / (barPx - thumbPx);
        el.scrollLeft = dragSL.current + (e.clientX - dragX.current) * scale;
      } else {
        el.scrollLeft = dragSL.current - (e.clientX - dragX.current);
      }
    };
    const up = () => setDragging(false);
    window.addEventListener("mousemove", mv);
    window.addEventListener("mouseup",   up);
    return () => {
      window.removeEventListener("mousemove", mv);
      window.removeEventListener("mouseup",   up);
    };
  }, [dragging]);

  const onBarClick = (e) => {
    const bar = barRef.current;
    const el  = trackRef.current;
    if (!bar || !el) return;
    const rect  = bar.getBoundingClientRect();
    const ratio = (e.clientX - rect.left) / rect.width;
    el.scrollLeft = ratio * (el.scrollWidth - el.clientWidth);
  };

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Libre+Baskerville:ital,wght@0,400;0,700;1,400&family=Nunito:wght@400;500;600;700&display=swap');

        @keyframes cardIn {
          from { opacity: 0; transform: translateY(18px); }
          to   { opacity: 1; transform: translateY(0); }
        }

        #ts-track {
          display: flex;
          gap: ${CARD_GAP}px;
          overflow-x: auto;
          overflow-y: visible;
          padding: 8px 40px 20px;
          scrollbar-width: none;
          -ms-overflow-style: none;
          scroll-behavior: smooth;
        }
        #ts-track::-webkit-scrollbar { display: none; }

        .ts-fade-left, .ts-fade-right {
          position: absolute; top: 0; bottom: 0;
          width: 50px; z-index: 20; pointer-events: none;
        }
        .ts-fade-left  { left:  0; background: linear-gradient(to right, #fff, transparent); }
        .ts-fade-right { right: 0; background: linear-gradient(to left,  #fff, transparent); }
      `}</style>

      <section className="bg-white relative" style={{ padding: "72px 0 60px" }}>

        {/* ── Header ── */}
        <div className="flex justify-center  mb-7">
          
          <h2
            className=" font-bold text-[#111827]  leading-tight"
            style={{ fontSize: "clamp(26px, 4vw, 36px)" }}
          >
            Shop by <span className="text-[#820c0c]">Category</span>
          </h2>
          
        </div>
        <div className="mt-3 flex items-center gap-1.5 flex justify-center">
            <div className="w-9 h-[2.5px] bg-[#820c0c] rounded-full" />
            <div className="w-2 h-2 rounded-full bg-[#c9643a] opacity-60" />
            <div className="w-4 h-[2.5px] bg-[#f0ece8] rounded-full" />
          </div>

        {/* ── Scroll Track ── */}
        <div className="relative overflow-hidden py-3">
          <div className="ts-fade-left" />
          <div className="ts-fade-right" />
          <div
            id="ts-track"
            ref={trackRef}
            style={{ cursor: dragging && !isThumb.current ? "grabbing" : "grab" }}
            onMouseDown={(e) => { if (e.button !== 0) return; startDrag(e, false); }}
          >
            {products.map((p, idx) => (
              <ProductCard key={p.id} product={p} animDelay={idx * 0.06} />
            ))}
          </div>
        </div>

        {/* ── Bottom Controls ── */}
        <div className="max-w-[1200px] mx-auto px-6 mt-3">

          {/* ── Scrollbar track ── */}
          <div
            ref={barRef}
            onClick={onBarClick}
            className="relative h-[4px] rounded-full cursor-pointer"
            style={{ background: "#f0ede9" }}
          >
            {/* Background fill (progress) */}
            <div
              className="absolute top-0 left-0 h-full rounded-full pointer-events-none"
              style={{
                width: `${prog * 100}%`,
                background: "linear-gradient(to right, rgba(201,100,58,.3), rgba(130,12,12,.2))",
              }}
            />
            {/* Draggable thumb — moves & resizes dynamically */}
            <div
              onMouseDown={(e) => { e.stopPropagation(); startDrag(e, true); }}
              className="absolute top-0 h-full rounded-full"
              style={{
                width:      `${thumbW}%`,
                left:       `${thumbL}%`,
                background: "linear-gradient(to right, #c9643a, #820c0c)",
                boxShadow:  "0 0 8px rgba(201,100,58,.5)",
                cursor:     dragging && isThumb.current ? "grabbing" : "grab",
                transition: dragging ? "none" : "left .08s linear, width .15s ease",
              }}
            />
          </div>

          {/* ── Dots + Counter + Arrows ── */}
          <div className="flex items-center justify-between mt-4">

            {/* Dots */}
            <div className="flex items-center gap-1.5">
              {products.map((_, i) => (
                <div
                  key={i}
                  onClick={() => toCard(i)}
                  className="h-[3px] rounded-full cursor-pointer"
                  style={{
                    width: i === active ? 26 : 8,
                    background: i === active
                      ? "linear-gradient(to right, #c9643a, #820c0c)"
                      : "#e5e7eb",
                    boxShadow: i === active ? "0 0 6px rgba(201,100,58,.4)" : "none",
                    transition: "all .28s cubic-bezier(.22,.68,0,1.2)",
                  }}
                />
              ))}
            </div>

            {/* Counter + Arrows */}
            <div className="flex items-center gap-3">
              <span className="text-xs text-gray-400 font-semibold tracking-[.1em]">
                {String(active + 1).padStart(2, "0")} / {String(products.length).padStart(2, "0")}
              </span>
              <ArrowBtn dir="prev" onClick={() => byCard(-1)} />
              <ArrowBtn dir="next" onClick={() => byCard(1)} />
            </div>
          </div>
        </div>
      </section>
    </>
  );
}