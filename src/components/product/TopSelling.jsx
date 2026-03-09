import { useRef, useState, useEffect, useCallback } from "react";
import bottle from '../../assets/images/btl.jpg'
import bottle1 from '../../assets/images/btl1.jpg'
import { useNavigate } from "react-router-dom";
const products = [
  { id: 1, name: "Quista Active Milk Masala", price: 99.99, originalPrice: 199.99, description: "A nutritious blend of traditional Indian spices mixed with milk for a healthy and refreshing drink.", rating: 4.5, reviews: 248, badge: "Best Seller", image: [bottle], hoverImage: [bottle1], tags: ["Spicy", "Healthy", "Indian"] },
  { id: 2, name: "Herbal Face Wash", price: 149.99, originalPrice: 249.99, description: "Gentle herbal formulation that deeply cleanses and refreshes your skin naturally.", rating: 4, reviews: 184, badge: "New", image: [bottle], hoverImage: [bottle1], tags: ["Skin Care", "Herbal", "Refresh"] },
  { id: 3, name: "Protein Powder", price: 299.99, originalPrice: 499.99, description: "High-quality protein supplement to support muscle growth and daily nutrition.", rating: 5, reviews: 512, badge: "Top Rated", image: [bottle], hoverImage: [bottle1], tags: ["Fitness", "Protein", "Muscle"] },
  { id: 4, name: "Ayurvedic Tablets", price: 199.99, originalPrice: 329.99, description: "Traditional Ayurvedic formulation designed to boost immunity and overall wellness.", rating: 3.5, reviews: 97, badge: "New", image: [bottle], hoverImage: [bottle1], tags: ["Immunity", "Ayurvedic", "Wellness"] },
  { id: 5, name: "Vitamin C Boost", price: 179.99, originalPrice: 289.99, description: "Effervescent Vitamin C tablets to strengthen your immune system every single day.", rating: 4.2, reviews: 321, badge: "Sale", image: [bottle], hoverImage: [bottle1], tags: ["Vitamin", "Immunity", "Daily"] },
  { id: 6, name: "Hair Growth Serum", price: 349.99, originalPrice: 549.99, description: "Advanced botanical serum that nourishes scalp and promotes thick, healthy hair growth.", rating: 4.7, reviews: 430, badge: "Premium", image: [bottle], hoverImage: [bottle1], tags: ["Hair Care", "Botanical", "Serum"] },
  { id: 7, name: "Digestive Churna", price: 89.99, originalPrice: 149.99, description: "Classic Ayurvedic churna blend to support healthy digestion and gut comfort daily.", rating: 4.0, reviews: 156, badge: "Top Rated", image: [bottle], hoverImage: [bottle1], tags: ["Digestive", "Ayurvedic", "Gut"] },
];

const BRAND = "#820c0c";
const ACCENT = "#c9643a";
const CARD_W = 272;
const CARD_GAP = 20;
const CRIMSON = "#820c0c";
const AMBER = "#c9643a"
const badgeClass = {
  "Best Seller": { bg: "#fff7ed", color: "#c2410c", border: "#fed7aa" },
  "New":         { bg: "#f0fdf4", color: "#15803d", border: "#bbf7d0" },
  "Top Rated":   { bg: "#eff6ff", color: "#1d4ed8", border: "#bfdbfe" },
  "Sale":        { bg: "#fff1f2", color: "#be123c", border: "#fecdd3" },
  "Premium":     { bg: "#fdf4e7", color: "#820c0c", border: "#f5cba7" },
};

/* ─── Star Rating ─────────────────────────────────────────── */
function StarRating({ rating, reviews }) {
  return (
    <div style={{ display: "flex", alignItems: "center", gap: 5 }}>
      <div style={{ display: "flex", gap: 2 }}>
        {[1, 2, 3, 4, 5].map((v) => {
          const filled = v <= Math.floor(rating);
          const half   = !filled && v - rating < 1;
          const color  = filled || half ? "#f59e0b" : "#e5e7eb";
          return (
            <svg key={v} width="13" height="13" viewBox="0 0 24 24">
              <polygon
                points="12,2 15.09,8.26 22,9.27 17,14.14 18.18,21.02 12,17.77 5.82,21.02 7,14.14 2,9.27 8.91,8.26"
                fill={color} stroke={color} strokeWidth="1"
              />
            </svg>
          );
        })}
      </div>
      <span style={{ fontSize: 11, color: "#9ca3af", fontWeight: 500 }}>({reviews})</span>
    </div>
  );
}

/* ─── Arrow Button ────────────────────────────────────────── */
function ArrowBtn({ dir, onClick }) {
  const [hov, setHov] = useState(false);
  return (
    <button
      onClick={onClick}
      onMouseEnter={() => setHov(true)}
      onMouseLeave={() => setHov(false)}
      style={{
        width: 40, height: 40, borderRadius: "50%",
        border: `1.5px solid ${hov ? BRAND : "#e5e7eb"}`,
        background: hov ? BRAND : "#fff",
        color: hov ? "#fff" : "#374151",
        fontSize: 18, display: "flex", alignItems: "center", justifyContent: "center",
        cursor: "pointer",
        boxShadow: hov ? `0 4px 14px rgba(130,12,12,.25)` : "0 1px 4px rgba(0,0,0,.07)",
        transition: "all .22s ease",
        flexShrink: 0,
      }}
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
  const bm   = badgeClass[product.badge];
const navigate =useNavigate()
  return (
    <div
      onMouseEnter={() => setHov(true)}
      onMouseLeave={() => setHov(false)}
      onMouseDown={(e) => e.stopPropagation()}
      style={{
        flexShrink: 0,
        width: CARD_W,
        background: "#fff",
        border: `1.5px solid ${hov ? "rgba(201,100,58,.33)" : "#f0ece8"}`,
        borderRadius: 16,
        overflow: "hidden",
        position: "relative",
        zIndex: hov ? 40 : 10,
        transform: hov ? "translateY(-12px) scale(1.015)" : "translateY(0) scale(1)",
        boxShadow: hov
          ? "0 20px 48px rgba(130,12,12,.10), 0 4px 16px rgba(0,0,0,.06)"
          : "0 1px 4px rgba(0,0,0,.04)",
        transition: "transform .35s cubic-bezier(.22,.68,0,1.15), box-shadow .35s ease, border-color .3s ease",
        cursor: "pointer",
        userSelect: "none",
        animation: `cardIn .45s ease ${animDelay}s both`,
      }}

      
    >
      {/* Image */}
      <div style={{ position: "relative", height: 220, overflow: "hidden", background: "#f9f5f2" }} className="mt-3" onClick={
        ()=>navigate('/product')
      }>
        {/* Primary image */}
        <img
          src={product.image}
          alt={product.name}
          draggable={false}
          style={{
            position: "absolute", inset: 0, width: "100%", height: "100%", objectFit: "cover",
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
          style={{
            position: "absolute", inset: 0, width: "100%", height: "100%", objectFit: "cover",
            opacity: hov ? 1 : 0,
            transform: hov ? "scale(1)" : "scale(1.06)",
            transition: "opacity .4s ease, transform .6s ease",
          }}
        />

        {/* Tags */}
        <div style={{
          position: "absolute", top: 150, left: 10,
          display: "flex", flexDirection: "column", gap: 4, zIndex: 5,
          opacity: hov ? 1 : 0,
          transform: hov ? "translateY(0)" : "translateY(-6px)",
          transition: "opacity .25s ease, transform .25s ease",
        }}>
          {product.tags.map((t, i) => (
            <span key={i} style={{
              fontSize: 9.5, padding: "3px 9px", borderRadius: 99,
              background: BRAND, color: '#fff',
              fontWeight: 700, letterSpacing: ".05em", textTransform: "uppercase",
              boxShadow: "0 1px 4px rgba(0,0,0,.12)",
            }}>{t}</span>
          ))}
        </div>

        {/* Discount ribbon */}
        <div style={{
          position: "absolute", top: 10, right: 10, zIndex: 5,
          width: 40, height: 40, borderRadius: "50%",
          background: BRAND, color: "#fff",
          display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center",
          boxShadow: "0 2px 8px rgba(130,12,12,.3)",
        }}>
          <span style={{ fontSize: 9, fontWeight: 700, lineHeight: 1.1 }}>OFF</span>
          <span style={{ fontSize: 11, fontWeight: 700, lineHeight: 1.1 }}>{disc}%</span>
        </div>
      </div>

      {/* Body */}
      <div style={{ padding: "16px 18px 20px" }}>
        {/* Badge */}
        {bm && (
          <span style={{
            fontSize: 10, padding: "2px 9px", borderRadius: 99,
            border: `1px solid ${bm.border}`,
            background: bm.bg, color: bm.color,
            fontWeight: 700, letterSpacing: ".06em", textTransform: "uppercase",
            display: "inline-block", marginBottom: 8,
          }}>
            {product.badge}
          </span>
        )}

        <h3 style={{
          fontFamily: "'Libre Baskerville', serif",
          fontSize: 15.5, fontWeight: 700, color: "#1a1a1a",
          margin: "0 0 5px", whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis",
        }}>
          {product.name}
        </h3>

        <p style={{
          fontSize: 14, color: 'black', lineHeight: 1.65, margin: "0 0 12px",
          display: "-webkit-box", WebkitLineClamp: 2, WebkitBoxOrient: "vertical", overflow: "hidden",
        }}>
          {product.description}
        </p>

        {/* Numeric Rating */}
        {product.rating && (
          <span style={{
            fontSize: 12,
            fontWeight: 600,
            color: "#f59e0b",
            marginBottom: 10,
            display: "inline-flex",
            alignItems: "center",
            gap: 4,
          }}>
            <span>⭐</span>
            <span>{product.rating.toFixed(1)} Ratings</span>
          </span>
        )}

        {/* Price */}
        <div style={{ display: "flex", alignItems: "baseline", gap: 7, margin: "10px 0 6px" }}>
          <span style={{ fontFamily: "'Libre Baskerville', serif", fontSize: 20, fontWeight: 700, color: BRAND }}>
            ₹{product.price}
          </span>
          <span style={{ fontSize: 13, color: "#9ca3af", textDecoration: "line-through" }}>
            ₹{product.originalPrice}
          </span>
          <span style={{
            marginLeft: "auto", fontSize: 11, color: "#059669", fontWeight: 700,
            background: "#ecfdf5", padding: "2px 7px", borderRadius: 99,
          }}>
            Save ₹{(product.originalPrice - product.price).toFixed(0)}
          </span>
        </div>

        {/* Special Offer Feature */}
        <div style={{
          fontSize: 13, fontWeight: 700, color: BRAND,
          background: "#fff4f4", padding: "5px 10px", borderRadius: 8, marginBottom: 12,
          textAlign: "center",
          boxShadow: "0 2px 6px rgba(201,100,58,0.2)",
        }}>
          Get @ ₹{product.price} | Code: GRAB
        </div>

        <div style={{ height: 1, background: "#f3f4f6", margin: "12px 0" }} />

        {/* Add to Cart */}
        <button
          onMouseEnter={() => setBtnHov(true)}
          onMouseLeave={() => setBtnHov(false)}
          className={`w-full py-3 text-sm font-semibold tracking-wide uppercase 
            rounded-tl-[50px] rounded-br-[50px] rounded-tr-[0] rounded-bl-[0] 
            ${btnHov ? `bg-[${AMBER}] shadow-[0_6px_20px_rgba(201,100,58,.35)]` : `bg-[${BRAND}]`} 
            text-white cursor-pointer transition-all duration-300 ease-in-out`}
        >
          Add to Cart
        </button>
      </div>
    </div>
  );
}

/* ─── Main Component ──────────────────────────────────────── */
export default function TopSelling() {
  const trackRef  = useRef(null);
  const [prog, setProg]     = useState(0);
  const [active, setActive] = useState(0);
  const [dragging, setDragging] = useState(false);
  const dragX   = useRef(0);
  const dragSL  = useRef(0);
  const isThumb = useRef(false);
  const [thumbW, setThumbW] = useState(100);
  const [thumbL, setThumbL] = useState(0);

  const recalcThumb = useCallback(() => {
    const el = trackRef.current;
    if (!el || el.scrollWidth <= el.clientWidth) {
      setThumbW(100); setThumbL(0); return;
    }
    const ratio = el.clientWidth / el.scrollWidth;
    const w = Math.max(ratio * 100, 8);
    const p = el.scrollLeft / (el.scrollWidth - el.clientWidth);
    setThumbW(w);
    setThumbL(p * (100 - w));
  }, []);

  const onScroll = useCallback(() => {
    const el = trackRef.current;
    if (!el) return;
    const max = el.scrollWidth - el.clientWidth;
    const p   = max > 0 ? el.scrollLeft / max : 0;
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
  const byCard = (d) => trackRef.current?.scrollBy({ left: d * (CARD_W + CARD_GAP), behavior: "smooth" });

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
        const bar = document.getElementById("ts-scrollbar");
        if (!bar) return;
        const bw = bar.clientWidth;
        const tw = (el.clientWidth / el.scrollWidth) * bw;
        const dx = (e.clientX - dragX.current) / (bw - tw);
        el.scrollLeft = dragSL.current + dx * (el.scrollWidth - el.clientWidth);
      } else {
        el.scrollLeft = dragSL.current - (e.clientX - dragX.current);
      }
    };
    const up = () => setDragging(false);
    window.addEventListener("mousemove", mv);
    window.addEventListener("mouseup", up);
    return () => { window.removeEventListener("mousemove", mv); window.removeEventListener("mouseup", up); };
  }, [dragging]);

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Libre+Baskerville:ital,wght@0,400;0,700;1,400&family=Nunito:wght@400;500;600;700&display=swap');

        * { box-sizing: border-box; }

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

        .ts-fade-left,
        .ts-fade-right {
          position: absolute;
          top: 0; bottom: 0;
          width: 50px;
          z-index: 20;
          pointer-events: none;
        }
        .ts-fade-left  { left: 0;  background: linear-gradient(to right, #ffffff, transparent); }
        .ts-fade-right { right: 0; background: linear-gradient(to left, #ffffff, transparent); }

        #ts-section::before {
          content: '';
          position: absolute;
          top: 0; left: 0; right: 0;
          height: 4px;
          background: linear-gradient(to right, ${BRAND}, ${ACCENT}, ${BRAND});
        }
      `}</style>

      <section
        id="ts-section"
        style={{
          // fontFamily: "'Nunito', sans-serif",
          background: "#ffffff",
          padding: "72px 0 60px",
          position: "relative",
        }}
      >
        {/* ── Header ── */}
        <div style={{ maxWidth: 1200, margin: "0 auto", padding: "0 24px" }}>
          <div style={{
            display: "flex", alignItems: "flex-end", justifyContent: "space-between",
            flexWrap: "wrap", gap: 16, marginBottom: 28,
          }}>
            {/* Left: Title */}
            <div>
              <p style={{
                fontSize: 18, letterSpacing: ".2em", textTransform: "uppercase",
                fontWeight: 700, color: ACCENT, marginBottom: 10,
                display: "flex", alignItems: "center", gap: 10,
              }}>
                Our collection
                <span style={{ width: 32, height: 1.5, background: ACCENT, borderRadius: 99, opacity: .5, display: "inline-block" }} />
              </p>
              <h2 style={{
                fontFamily: "'Libre Baskerville', serif",
                fontSize: "clamp(26px, 4vw, 36px)",
                fontWeight: 700, color: "#111827", margin: 0, lineHeight: 1.15,
              }}>
                Top Selling <span style={{ color: BRAND }}>Products</span>
              </h2>
              <div style={{ marginTop: 12, display: "flex", alignItems: "center", gap: 6 }}>
                <div style={{ width: 36, height: 2.5, background: BRAND, borderRadius: 99 }} />
                <div style={{ width: 8, height: 8, borderRadius: "50%", background: ACCENT, opacity: .6 }} />
                <div style={{ width: 16, height: 2.5, background: "#f0ece8", borderRadius: 99 }} />
              </div>
            </div>

            {/* Right: Arrows */}
            <div style={{ display: "flex", gap: 8 }}>
              <ArrowBtn dir="prev" onClick={() => byCard(-1)} />
              <ArrowBtn dir="next" onClick={() => byCard(1)} />
            </div>
          </div>
        </div>

        {/* ── Scroll Track ── */}
        <div style={{ position: "relative", overflow: "hidden", padding: "12px 0 4px" }}>
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

        {/* ── Controls: Scrollbar + Dots ── */}
        <div style={{ maxWidth: 1200, margin: "10px auto 0", padding: "0 24px" }}>
          {/* Scrollbar track */}
          <div
            id="ts-scrollbar"
            onClick={(e) => {
              const r = e.currentTarget.getBoundingClientRect();
              const ratio = (e.clientX - r.left) / r.width;
              const el = trackRef.current;
              if (el) el.scrollLeft = ratio * (el.scrollWidth - el.clientWidth);
            }}
            style={{
              height: 3, background: "#f0ede9", borderRadius: 99,
              cursor: "pointer", position: "relative",
            }}
          >
            {/* Fill */}
            <div style={{
              position: "absolute", top: 0, left: 0, height: "100%",
              width: `${prog * 100}%`,
              background: `linear-gradient(to right, ${ACCENT}66, ${BRAND}4D)`,
              borderRadius: 99, pointerEvents: "none",
            }} />
            {/* Thumb */}
            <div
              onMouseDown={(e) => { e.stopPropagation(); startDrag(e, true); }}
              style={{
                position: "absolute", top: "50%", transform: "translateY(-50%)",
                height: 3, borderRadius: 99, cursor: "grab",
                width: `${thumbW}%`, left: `${thumbL}%`,
                background: `linear-gradient(to right, ${ACCENT}, ${BRAND})`,
                boxShadow: `0 0 8px ${ACCENT}55`,
                transition: "height .18s ease",
              }}
            />
          </div>

          {/* Dots + Counter */}
          <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginTop: 14 }}>
            <div style={{ display: "flex", gap: 6, alignItems: "center" }}>
              {products.map((_, i) => (
                <div
                  key={i}
                  onClick={() => toCard(i)}
                  style={{
                    height: 3, borderRadius: 99, cursor: "pointer",
                    width: i === active ? 26 : 8,
                    background: i === active
                      ? `linear-gradient(to right, ${ACCENT}, ${BRAND})`
                      : "#e5e7eb",
                    boxShadow: i === active ? `0 0 6px ${ACCENT}55` : "none",
                    transition: "all .28s cubic-bezier(.22,.68,0,1.2)",
                  }}
                />
              ))}
            </div>
            <span style={{ fontSize: 12, color: "#9ca3af", fontWeight: 600, letterSpacing: ".1em" }}>
              {String(active + 1).padStart(2, "0")} / {String(products.length).padStart(2, "0")}
            </span>
          </div>
        </div>
      </section>
    </>
  );
}