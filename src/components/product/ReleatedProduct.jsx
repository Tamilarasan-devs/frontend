
import { useState, useRef, useEffect, useCallback } from "react";
import { Star, ShoppingCart, Heart, Eye, ArrowRight } from "lucide-react";
import { useNavigate } from "react-router-dom";
const BRAND = "#03349a";
const ACCENT = "#c9643a";

const related = [
  {
    id: 1,
    name: "Ashwagandha Gold Capsules",
    category: "Stress & Immunity",
    price: 349,
    originalPrice: 599,
    rating: 4.8,
    reviews: 2341,
    badge: "Best Seller",
    isNew: false,
    image: "https://himalayawellness.in/cdn/shop/products/QUISTAACTIVEMILKMASALA200G.jpg?v=1629879986",
    hoverImage: "https://himalayawellness.in/cdn/shop/products/QUISTAACTIVEMILKMASALA200G.jpg?v=1629879986",
  },
  {
    id: 2,
    name: "Brahmi Memory Booster",
    category: "Brain & Focus",
    price: 249,
    originalPrice: 449,
    rating: 4.6,
    reviews: 1187,
    badge: "New",
    isNew: true,
    image: "https://himalayawellness.in/cdn/shop/products/QUISTAACTIVEMILKMASALA200G.jpg?v=1629879986",
    hoverImage: "https://himalayawellness.in/cdn/shop/products/QUISTAACTIVEMILKMASALA200G.jpg?v=1629879986",
  },
  {
    id: 3,
    name: "Turmeric Glow Face Pack",
    category: "Skin Care",
    price: 199,
    originalPrice: 349,
    rating: 4.5,
    reviews: 876,
    badge: null,
    isNew: false,
    image: "https://himalayawellness.in/cdn/shop/products/QUISTAACTIVEMILKMASALA200G.jpg?v=1629879986",
    hoverImage: "https://himalayawellness.in/cdn/shop/products/QUISTAACTIVEMILKMASALA200G.jpg?v=1629879986",
  },
  {
    id: 4,
    name: "Triphala Digestive Churna",
    category: "Gut Health",
    price: 159,
    originalPrice: 299,
    rating: 4.7,
    reviews: 3102,
    badge: "Top Rated",
    isNew: false,
    image: "https://himalayawellness.in/cdn/shop/products/QUISTAACTIVEMILKMASALA200G.jpg?v=1629879986",
    hoverImage: "https://himalayawellness.in/cdn/shop/products/QUISTAACTIVEMILKMASALA200G.jpg?v=1629879986",
  },
  {
    id: 5,
    name: "Shatavari Women's Wellness",
    category: "Women's Health",
    price: 399,
    originalPrice: 699,
    rating: 4.9,
    reviews: 954,
    badge: "Premium",
    isNew: false,
    image: "https://himalayawellness.in/cdn/shop/products/QUISTAACTIVEMILKMASALA200G.jpg?v=1629879986",
    hoverImage: "https://himalayawellness.in/cdn/shop/products/QUISTAACTIVEMILKMASALA200G.jpg?v=1629879986",
  },
  {
    id: 6,
    name: "Neem Tulsi Face Wash",
    category: "Skin Care",
    price: 179,
    originalPrice: 299,
    rating: 4.4,
    reviews: 1423,
    badge: "Sale",
    isNew: false,
    image: "https://himalayawellness.in/cdn/shop/products/QUISTAACTIVEMILKMASALA200G.jpg?v=1629879986",
    hoverImage: "https://himalayawellness.in/cdn/shop/products/QUISTAACTIVEMILKMASALA200G.jpg?v=1629879986",
  },
];

const badgeMeta = {
  "Best Seller": { bg: "#fff7ed", color: "#c2410c", border: "#fed7aa" },
  "New":         { bg: "#f0fdf4", color: "#15803d", border: "#bbf7d0" },
  "Top Rated":   { bg: "#eff6ff", color: "#1d4ed8", border: "#bfdbfe" },
  "Sale":        { bg: "#fff1f2", color: "#be123c", border: "#fecdd3" },
  "Premium":     { bg: "#fdf4e7", color: BRAND,     border: "#f5cba7" },
};

const disc = (p) => Math.round(((p.originalPrice - p.price) / p.originalPrice) * 100);

const StarRow = ({ rating, size = 12 }) => (
  <div style={{ display: "flex", gap: 2 }}>
    {Array.from({ length: 5 }).map((_, i) => (
      <Star key={i} size={size} style={{
        fill: i < Math.round(rating) ? "#f59e0b" : "none",
        stroke: i < Math.round(rating) ? "#f59e0b" : "#d1d5db",
      }} />
    ))}
  </div>
);

const ProductCard = ({ p }) => {
  const [wishlisted, setWishlisted] = useState(false);
  const [added, setAdded] = useState(false);
  const [hovered, setHovered] = useState(false);

  const handleCart = (e) => {
    e.stopPropagation();
    setAdded(true);
    setTimeout(() => setAdded(false), 1800);
  };

  const bm = p.badge ? badgeMeta[p.badge] : null;
  return (
    <div
      className="rp-card"
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      {/* Image */}
      <div className="rp-imgbox">
        <img className="rp-img-a" src={p.image} alt={p.name} draggable={false} />
        <img className="rp-img-b" src={p.hoverImage} alt={p.name} draggable={false} />

        {/* Discount pill */}
        <div className="rp-disc">-{disc(p)}%</div>

        {/* Badge */}
        {bm && (
          <span className="rp-badge" style={{ background: bm.bg, color: bm.color, border: `1px solid ${bm.border}` }}>
            {p.badge}
          </span>
        )}

        {/* Hover action buttons */}
        <div className="rp-actions">
          <button
            className={`rp-action-btn${wishlisted ? " rp-wish-active" : ""}`}
            onClick={(e) => { e.stopPropagation(); setWishlisted(w => !w); }}
            title="Wishlist"
          >
            <Heart size={15} style={{ fill: wishlisted ? "#ef4444" : "none", stroke: wishlisted ? "#ef4444" : "currentColor" }} />
          </button>
          <button className="rp-action-btn" title="Quick View">
            <Eye size={15} />
          </button>
        </div>
      </div>

      {/* Body */}
      <div className="rp-body">
        <span className="rp-category">{p.category}</span>
        <h3 className="rp-name">{p.name}</h3>

        <div className="rp-meta">
          <StarRow rating={p.rating} />
          <span className="rp-reviews">({p.reviews.toLocaleString()})</span>
        </div>

        <div className="rp-price-row">
          <span className="rp-price">₹{p.price}</span>
          <span className="rp-orig">₹{p.originalPrice}</span>
          <span className="rp-save">Save ₹{p.originalPrice - p.price}</span>
        </div>

        <button
          className={`rp-cart-btn${added ? " rp-added" : ""}`}
          onClick={handleCart}
        >
          {added ? (
            <>✓ Added to Cart</>
          ) : (
            <><ShoppingCart size={14} /> Add to Cart</>
          )}
        </button>
      </div>
    </div>
  );
};

export default function RelatedProduct() {
const navigate = useNavigate();

  const trackRef = useRef(null);
  const [prog, setProg] = useState(0);
  const [active, setActive] = useState(0);
  const [dragging, setDragging] = useState(false);
  const dragX = useRef(0);
  const dragSL = useRef(0);
  const isThumb = useRef(false);
  const CW = 260, GAP = 20;

  const onScroll = useCallback(() => {
    const el = trackRef.current;
    if (!el) return;
    const max = el.scrollWidth - el.clientWidth;
    setProg(max > 0 ? el.scrollLeft / max : 0);
    setActive(Math.min(Math.round(el.scrollLeft / (CW + GAP)), related.length - 1));
  }, []);

  useEffect(() => {
    const el = trackRef.current;
    if (!el) return;
    el.addEventListener("scroll", onScroll, { passive: true });
    return () => el.removeEventListener("scroll", onScroll);
  }, [onScroll]);

  const byCard = (d) => trackRef.current?.scrollBy({ left: d * (CW + GAP), behavior: "smooth" });
  const toCard = (i) => trackRef.current?.scrollTo({ left: i * (CW + GAP), behavior: "smooth" });

  const startDrag = (e, thumb) => {
    e.preventDefault();
    isThumb.current = thumb;
    setDragging(true);
    dragX.current = e.clientX;
    dragSL.current = trackRef.current?.scrollLeft ?? 0;
  };

  useEffect(() => {
    if (!dragging) return;
    const mv = (e) => {
      const el = trackRef.current;
      if (!el) return;
      if (isThumb.current) {
        const bar = document.getElementById("rp-bar");
        if (!bar) return;
        const bw = bar.clientWidth;
        const tw = (el.clientWidth / el.scrollWidth) * bw;
        const dx = (e.clientX - dragX.current) / Math.max(bw - tw, 1);
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

  const thumb = (() => {
    const el = trackRef.current;
    if (!el || el.scrollWidth <= el.clientWidth) return { w: 100, l: 0 };
    const w = Math.max((el.clientWidth / el.scrollWidth) * 100, 8);
    return { w, l: prog * (100 - w) };
  })();

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Libre+Baskerville:wght@400;700&family=Nunito:wght@400;500;600;700;800&display=swap');

        .rp-root {
          font-family: 'Nunito', sans-serif;
          background: #fff;
          padding: 64px 0 52px;
          position: relative;
          border-top: 1px solid #f0ece8;
        }

        /* Subtle top accent */
        .rp-root::before {
          content: '';
          position: absolute; top: 0; left: 0; right: 0; height: 3px;
          background: linear-gradient(to right, transparent 0%, ${BRAND} 30%, ${ACCENT} 70%, transparent 100%);
        }

        .rp-root *, .rp-root *::before, .rp-root *::after { box-sizing: border-box; }

        .rp-inner { max-width: 1200px; margin: 0 auto; padding: 0 40px; }

        /* Header */
        .rp-header {
          display: flex; align-items: flex-end; justify-content: space-between;
          margin-bottom: 28px;
        }
        .rp-eyebrow {
          font-size: 11px; font-weight: 800; letter-spacing: .2em;
          text-transform: uppercase; color: ${ACCENT};
          display: flex; align-items: center; gap: 8px; margin-bottom: 8px;
        }
        .rp-eyebrow::before {
          content: ''; width: 24px; height: 2px;
          background: ${ACCENT}; border-radius: 99px;
        }
        .rp-h2 {
          font-family: 'Libre Baskerville', serif;
          font-size: 32px; font-weight: 700; color: #111827;
          line-height: 1.15; margin: 0;
        }
        .rp-h2 span { color: ${BRAND}; }
        .rp-underline {
          display: flex; align-items: center; gap: 6px; margin-top: 10px;
        }
        .rp-ul-bar { width: 36px; height: 2.5px; background: ${BRAND}; border-radius: 99px; }
        .rp-ul-dot { width: 6px; height: 6px; border-radius: 50%; background: ${ACCENT}; opacity: .6; }
        .rp-ul-bar2 { width: 16px; height: 2.5px; background: #f0ece8; border-radius: 99px; }

        /* View All */
        .rp-view-all {
          display: flex; align-items: center; gap: 6px;
          font-size: 13px; font-weight: 800; color: ${BRAND};
          text-decoration: none; padding: 8px 16px; border-radius: 10px;
          border: 1.5px solid rgba(130,12,12,.15); background: rgba(130,12,12,.04);
          transition: all .22s ease; cursor: pointer; border: none;
          font-family: 'Nunito', sans-serif;
        }
        .rp-view-all:hover { background: ${BRAND}; color: #fff; }

        /* Scroll outer */
        .rp-outer {
          position: relative;
          overflow-x: hidden;
          overflow-y: visible;
          margin: 0 -40px;
          padding: 16px 0 8px;
        }
        .rp-outer::before, .rp-outer::after {
          content: ''; position: absolute; top: 0; bottom: 0;
          width: 56px; z-index: 20; pointer-events: none;
        }
        .rp-outer::before { left: 0;  background: linear-gradient(to right, #fff, transparent); }
        .rp-outer::after  { right: 0; background: linear-gradient(to left,  #fff, transparent); }

        .rp-track {
          display: flex; gap: ${GAP}px;
          overflow-x: auto; overflow-y: visible;
          padding: 8px 56px 20px;
          scrollbar-width: none; -ms-overflow-style: none;
          scroll-behavior: smooth;
          cursor: grab;
        }
        .rp-track::-webkit-scrollbar { display: none; }
        .rp-track.grabbing { cursor: grabbing; }

        /* Card */
        .rp-card {
          flex: none; width: ${CW}px;
          background: #fff;
          border: 1.5px solid #f0ece8;
          border-radius: 18px;
          overflow: hidden;
          position: relative; z-index: 10;
          transition: transform .36s cubic-bezier(.22,.68,0,1.15), box-shadow .36s ease, border-color .25s;
          cursor: pointer;
          animation: rpCardIn .45s ease both;
        }
        .rp-card:hover {
          transform: translateY(-10px) scale(1.018);
          border-color: ${ACCENT}55;
          box-shadow: 0 20px 48px rgba(130,12,12,.1), 0 4px 14px rgba(0,0,0,.06);
          z-index: 40;
        }
        @keyframes rpCardIn {
          from { opacity: 0; transform: translateY(16px); }
          to   { opacity: 1; transform: translateY(0); }
        }

        /* Image */
        .rp-imgbox {
          position: relative; height: 200px; overflow: hidden; background: #faf6f3;
        }
        .rp-imgbox img {
          position: absolute; inset: 0; width: 100%; height: 100%; object-fit: cover;
          transition: opacity .4s ease, transform .55s ease;
        }
        .rp-img-a { opacity: 1; transform: scale(1); }
        .rp-img-b { opacity: 0; transform: scale(1.07); }
        .rp-card:hover .rp-img-a { opacity: 0; transform: scale(1.07); }
        .rp-card:hover .rp-img-b { opacity: 1; transform: scale(1); }

        /* Discount pill */
        .rp-disc {
          position: absolute; top: 11px; left: 11px; z-index: 5;
          padding: 3px 9px; border-radius: 99px;
          background: ${BRAND}; color: #fff;
          font-size: 10px; font-weight: 800; letter-spacing: .04em;
          box-shadow: 0 2px 8px rgba(130,12,12,.3);
        }

        /* Badge */
        .rp-badge {
          position: absolute; top: 11px; right: 11px; z-index: 5;
          padding: 3px 9px; border-radius: 99px;
          font-size: 10px; font-weight: 800; letter-spacing: .04em;
        }

        /* Action buttons */
        .rp-actions {
          position: absolute; bottom: 12px; right: 10px; z-index: 6;
          display: flex; flex-direction: column; gap: 6px;
          opacity: 0; transform: translateX(10px);
          transition: opacity .25s ease, transform .25s ease;
        }
        .rp-card:hover .rp-actions { opacity: 1; transform: translateX(0); }
        .rp-action-btn {
          width: 32px; height: 32px; border-radius: 50%;
          background: rgba(255,255,255,.92); backdrop-filter: blur(6px);
          border: 1px solid rgba(0,0,0,.08);
          display: flex; align-items: center; justify-content: center;
          cursor: pointer; color: #374151;
          transition: all .2s; box-shadow: 0 2px 8px rgba(0,0,0,.1);
        }
        .rp-action-btn:hover { background: ${BRAND}; color: #fff; border-color: ${BRAND}; }
        .rp-action-btn.rp-wish-active { color: #ef4444; }

        /* Body */
        .rp-body { padding: 14px 16px 16px; }
        .rp-category {
          font-size: 10.5px; font-weight: 800; text-transform: uppercase;
          letter-spacing: .1em; color: ${ACCENT}; display: block; margin-bottom: 5px;
        }
        .rp-name {
          font-family: 'Libre Baskerville', serif;
          font-size: 14.5px; font-weight: 700; color: #111827;
          margin: 0 0 8px; line-height: 1.3;
          display: -webkit-box; -webkit-line-clamp: 2; -webkit-box-orient: vertical; overflow: hidden;
        }
        .rp-meta { display: flex; align-items: center; gap: 5px; margin-bottom: 10px; }
        .rp-reviews { font-size: 11px; color: #9ca3af; font-weight: 600; }

        .rp-price-row { display: flex; align-items: baseline; gap: 7px; margin-bottom: 12px; }
        .rp-price { font-family: 'Libre Baskerville', serif; font-size: 18px; font-weight: 700; color: ${BRAND}; }
        .rp-orig  { font-size: 12.5px; color: #9ca3af; text-decoration: line-through; }
        .rp-save  { font-size: 10.5px; color: #059669; font-weight: 800;
                    background: #ecfdf5; padding: 2px 6px; border-radius: 99px; margin-left: auto; }

        /* Cart btn */
        .rp-cart-btn {
          width: 100%; padding: 9px 0; border: none; border-top-left-radius: 50px;
  border-bottom-right-radius: 50px;
  border-top-right-radius: 0;
  border-bottom-left-radius: 0;
          font-family: 'Nunito', sans-serif; font-size: 12.5px; font-weight: 800;
          letter-spacing: .04em; text-transform: uppercase;
          background:  ${BRAND};color: #fff;
          border: 1.5px solid ${BRAND};
          display: flex; align-items: center; justify-content: center; gap: 6px;
          cursor: pointer;
          transition: background .22s, color .22s, box-shadow .22s, transform .12s;
        }
        
        .rp-cart-btn:hover { background:${ACCENT}; box-shadow:0 6px 20px rgba(201,100,58,.35); }
        .rp-cart-btn:hover::after { transform:translateX(100%); }
        .rp-cart-btn:active { transform:scale(.97); }
        /* Scrollbar */
        .rp-sb-wrap { margin-top: 8px; }
        .rp-sb {
          position: relative; height: 3px; background: #f0ede9;
          border-radius: 99px; cursor: pointer; overflow: visible;
        }
        .rp-sb-fill {
          position: absolute; top: 0; left: 0; height: 100%;
          background: linear-gradient(to right, ${ACCENT}33, ${BRAND}28);
          border-radius: 99px; pointer-events: none;
        }
        .rp-sb-thumb {
          position: absolute; top: 50%; transform: translateY(-50%);
          height: 3px; background: linear-gradient(to right, ${ACCENT}, ${BRAND});
          border-radius: 99px; cursor: grab;
          box-shadow: 0 0 8px ${ACCENT}55;
          transition: height .18s ease;
        }
        .rp-sb-thumb:hover, .rp-sb-thumb:active { height: 5px; cursor: grabbing; }

        /* Dots + counter */
        .rp-bottom-bar { display: flex; align-items: center; justify-content: space-between; margin-top: 14px; }
        .rp-dots { display: flex; gap: 6px; align-items: center; }
        .rp-dot {
          height: 3px; border-radius: 99px; cursor: pointer; border: none; padding: 0;
          background: #e5e7eb; transition: all .28s cubic-bezier(.22,.68,0,1.2);
        }
        .rp-dot:hover { background: ${ACCENT}66; }
        .rp-dot-on { background: linear-gradient(to right, ${ACCENT}, ${BRAND}); box-shadow: 0 0 6px ${ACCENT}55; }
        .rp-counter { font-size: 11.5px; color: #9ca3af; font-weight: 700; letter-spacing: .1em; }

        /* Arrow btns */
        .rp-arrows { display: flex; gap: 8px; }
        .rp-arrow {
          width: 38px; height: 38px; border-radius: 50%;
          border: 1.5px solid #e5e7eb; background: #fff;
          display: flex; align-items: center; justify-content: center;
          cursor: pointer; color: #374151; font-size: 18px;
          transition: all .22s; box-shadow: 0 1px 4px rgba(0,0,0,.06);
          font-family: sans-serif;
        }
        .rp-arrow:hover { border-color: ${BRAND}; background: ${BRAND}; color: #fff; box-shadow: 0 4px 14px rgba(130,12,12,.25); }

        @media (max-width: 768px) {
          .rp-inner { padding: 0 20px; }
          .rp-outer { margin: 0 -20px; }
          .rp-h2 { font-size: 26px; }
          .rp-track { padding: 8px 40px 20px; }
        }
      `}</style>

      <section className="rp-root">
        <div className="rp-inner">
          {/* Header */}
          <div className="rp-header">
            <div>
              <p className="rp-eyebrow">You May Also Like</p>
              <h2 className="rp-h2">Related <span>Products</span></h2>
              <div className="rp-underline">
                <div className="rp-ul-bar" />
                <div className="rp-ul-dot" />
                <div className="rp-ul-bar2" />
              </div>
            </div>
            <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
              <div className="rp-arrows">
                <button className="rp-arrow" onClick={() => byCard(-1)}>‹</button>
                <button className="rp-arrow" onClick={() => byCard(1)}>›</button>
              </div>
              <button className="rp-view-all" onhapiplaClick={() => navigate("/productListing")}>
                View All <ArrowRight size={13} />
              </button>
            </div>
          </div>
        </div>

        {/* Cards */}
        <div className="rp-inner" style={{ padding: 0 }} onClick={() => navigate("/product")}>
          <div className="rp-outer">
            <div
              ref={trackRef}
              className={`rp-track${dragging && !isThumb.current ? " grabbing" : ""}`}
              onMouseDown={(e) => { if (e.button !== 0) return; startDrag(e, false); }}
            >
              {related.map((p, idx) => (
                <div key={p.id} style={{ animationDelay: `${idx * 0.06}s` }}
                  onMouseDown={(e) => e.stopPropagation()}>
                  <ProductCard p={p} />
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Scrollbar + dots */}
        <div className="rp-inner">
          <div className="rp-sb-wrap">
            <div
              id="rp-bar"
              className="rp-sb"
              onClick={(e) => {
                const r = e.currentTarget.getBoundingClientRect();
                const ratio = (e.clientX - r.left) / r.width;
                const el = trackRef.current;
                if (el) el.scrollLeft = ratio * (el.scrollWidth - el.clientWidth);
              }}
            >
              <div className="rp-sb-fill" style={{ width: `${prog * 100}%` }} />
              <div
                className="rp-sb-thumb"
                style={{ width: `${thumb.w}%`, left: `${thumb.l}%` }}
                onMouseDown={(e) => { e.stopPropagation(); startDrag(e, true); }}
              />
            </div>

            <div className="rp-bottom-bar">
              <div className="rp-dots">
                {related.map((_, i) => (
                  <button
                    key={i}
                    className={`rp-dot${i === active ? " rp-dot-on" : ""}`}
                    style={{ width: i === active ? 24 : 8 }}
                    onClick={() => toCard(i)}
                  />
                ))}
              </div>
              <span className="rp-counter">
                {String(active + 1).padStart(2, "0")} / {String(related.length).padStart(2, "0")}
              </span>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}