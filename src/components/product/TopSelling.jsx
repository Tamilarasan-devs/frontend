import { useRef, useState, useEffect, useCallback } from "react";
import ProductCard from "./ProductCard";
import { axiosInstance } from "../../utils/axiosInstance";

const CARD_W = 300;
const CARD_GAP = 20;

function ArrowBtn({ dir, onClick }) {
  return (
    <button
      onClick={onClick}
      className="w-10 h-10 rounded-full border border-gray-200 bg-white text-gray-600 text-xl
        flex items-center justify-center cursor-pointer flex-shrink-0
        hover:bg-[#03349a] hover:text-white hover:border-[#03349a]
        shadow-sm hover:shadow-md transition-all duration-200"
    >
      {dir === "prev" ? "‹" : "›"}
    </button>
  );
}

export default function TopSelling() {
  const trackRef    = useRef(null);
  const barRef      = useRef(null);
  const sectionRef  = useRef(null);
  const dragX       = useRef(0);
  const dragSL      = useRef(0);
  const isThumb     = useRef(false);

  const [prog, setProg]               = useState(0);
  const [active, setActive]           = useState(0);
  const [dragging, setDragging]       = useState(false);
  const [thumbW, setThumbW]           = useState(30);
  const [thumbL, setThumbL]           = useState(0);
  const [sectionVisible, setSectionVisible] = useState(false);
  const [headerVisible, setHeaderVisible]   = useState(false);
  const [controlsVisible, setControlsVisible] = useState(false);
  const [products, setProducts]       = useState([]);
  const [loading, setLoading]         = useState(true);

  /* ── Fetch ── */
  useEffect(() => {
    axiosInstance.get("/product/getAllProduct")
      .then((r) => setProducts(r.data.products || []))
      .catch(console.error)
      .finally(() => setLoading(false));
  }, []);

  /* ── Intersection observer ── */
  useEffect(() => {
    const obs = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setSectionVisible(true);
          setHeaderVisible(true);
          setTimeout(() => setControlsVisible(true), 600);
          obs.disconnect();
        }
      },
      { threshold: 0.1 }
    );
    if (sectionRef.current) obs.observe(sectionRef.current);
    return () => obs.disconnect();
  }, []);

  /* ── Thumb recalc ── */
  const recalcThumb = useCallback(() => {
    const el = trackRef.current;
    if (!el) return;
    const scrollable = el.scrollWidth - el.clientWidth;
    if (scrollable <= 0) { setThumbW(100); setThumbL(0); return; }
    const w = Math.max((el.clientWidth / el.scrollWidth) * 100, 6);
    const p = el.scrollLeft / scrollable;
    setThumbW(w);
    setThumbL(p * (100 - w));
  }, []);

  const onScroll = useCallback(() => {
    const el = trackRef.current;
    if (!el) return;
    const scrollable = el.scrollWidth - el.clientWidth;
    const p = scrollable > 0 ? el.scrollLeft / scrollable : 0;
    setProg(p);
    setActive(Math.min(Math.round(el.scrollLeft / (CARD_W + CARD_GAP)), products.length - 1));
    recalcThumb();
  }, [recalcThumb, products.length]);

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

  /* ── Scroll helpers ── */
  const toCard = (i) =>
    trackRef.current?.scrollTo({ left: i * (CARD_W + CARD_GAP), behavior: "smooth" });

  const byCard = (d) => {
    const el = trackRef.current;
    if (!el) return;
    el.scrollBy({ left: d * (CARD_W + CARD_GAP), behavior: "smooth" });
    requestAnimationFrame(recalcThumb);
  };

  /* ── Drag ── */
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
        const bar    = barRef.current;
        if (!bar) return;
        const thumbPx = (el.clientWidth / el.scrollWidth) * bar.clientWidth;
        const scale   = (el.scrollWidth - el.clientWidth) / (bar.clientWidth - thumbPx);
        el.scrollLeft = dragSL.current + (e.clientX - dragX.current) * scale;
      } else {
        el.scrollLeft = dragSL.current - (e.clientX - dragX.current);
      }
    };
    const up = () => setDragging(false);
    window.addEventListener("mousemove", mv);
    window.addEventListener("mouseup", up);
    return () => { window.removeEventListener("mousemove", mv); window.removeEventListener("mouseup", up); };
  }, [dragging]);

  const onBarClick = (e) => {
    const bar = barRef.current;
    const el  = trackRef.current;
    if (!bar || !el) return;
    const rect  = bar.getBoundingClientRect();
    const ratio = (e.clientX - rect.left) / rect.width;
    el.scrollLeft = ratio * (el.scrollWidth - el.clientWidth);
  };

  /* ── Skeleton ── */
  const SkeletonCard = () => (
    <div
      className="flex-shrink-0 bg-white rounded-2xl overflow-hidden border border-gray-100 animate-pulse"
      style={{ width: CARD_W }}
    >
      <div className="w-full bg-gray-100" style={{ height: 280 }} />
      <div className="p-4 space-y-3">
        <div className="h-4 bg-gray-100 rounded-lg w-3/4" />
        <div className="h-3 bg-gray-100 rounded w-full" />
        <div className="h-3 bg-gray-100 rounded w-2/3" />
        <div className="flex gap-2">
          <div className="h-5 bg-gray-100 rounded-full w-20" />
          <div className="h-5 bg-gray-100 rounded-full w-16" />
        </div>
        <div className="h-px bg-gray-100" />
        <div className="h-11 bg-gray-100 rounded-xl" />
      </div>
    </div>
  );

  return (
    <>
      <style>{`
        #ts-track {
          display: flex;
          gap: ${CARD_GAP}px;
          overflow-x: auto;
          overflow-y: visible;
          padding: 10px 40px 24px;
          scrollbar-width: none;
          -ms-overflow-style: none;
          scroll-behavior: smooth;
        }
        #ts-track::-webkit-scrollbar { display: none; }
        .ts-fade-l { position:absolute;top:0;bottom:0;left:0;width:50px;z-index:20;pointer-events:none;background:linear-gradient(to right,#fff,transparent); }
        .ts-fade-r { position:absolute;top:0;bottom:0;right:0;width:50px;z-index:20;pointer-events:none;background:linear-gradient(to left,#fff,transparent); }
      `}</style>

      <section
        ref={sectionRef}
        className="bg-white py-16 sm:py-20 relative"
      >
        {/* ── Section Header ── */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 mb-8">
          <div
            style={{
              opacity: headerVisible ? 1 : 0,
              transform: headerVisible ? "translateY(0)" : "translateY(-20px)",
              transition: "opacity 0.6s ease, transform 0.6s ease",
            }}
          >
            <h2
              className="font-extrabold leading-tight text-[#0f296a]"
              style={{ fontSize: "clamp(24px, 4vw, 34px)" }}
            >
              Best Sellers
            </h2>
            <p className="text-black text-lg mt-1">
              Our most loved products — trusted by thousands
            </p>
          </div>

          {/* Decorative line */}
          <div
            className="flex items-center gap-2 mt-4"
            style={{ opacity: headerVisible ? 1 : 0, transition: "opacity 0.6s ease 0.2s" }}
          >
            <div
              className="h-[3px] rounded-full"
              style={{
                width: headerVisible ? 72 : 0,
                background: "linear-gradient(90deg,#03349a,#c9643a)",
                transition: "width 0.7s ease 0.3s",
              }}
            />
            <div className="w-2 h-2 rounded-full bg-[#c9643a]" />
          </div>
        </div>

        {/* ── Scroll Track ── */}
        <div className="relative overflow-hidden">
          <div className="ts-fade-l" />
          <div className="ts-fade-r" />
          <div
            id="ts-track"
            ref={trackRef}
            style={{ cursor: dragging && !isThumb.current ? "grabbing" : "grab" }}
            onMouseDown={(e) => { if (e.button !== 0) return; startDrag(e, false); }}
          >
            {loading
              ? [...Array(4)].map((_, i) => <SkeletonCard key={i} />)
              : products.map((product, idx) => (
                  <div key={product.id} className="flex-shrink-0" style={{ width: CARD_W }}>
                    <ProductCard
                      product={product}
                      animDelay={idx * 0.08}
                      sectionVisible={sectionVisible}
                    />
                  </div>
                ))
            }
          </div>
        </div>

        {/* ── Controls ── */}
        {!loading && (
          <div
            className="max-w-7xl mx-auto px-4 sm:px-6 mt-4"
            style={{
              opacity: controlsVisible ? 1 : 0,
              transform: controlsVisible ? "translateY(0)" : "translateY(14px)",
              transition: "opacity 0.5s ease, transform 0.5s ease",
            }}
          >
            {/* Scrollbar */}
            <div
              ref={barRef}
              onClick={onBarClick}
              className="relative h-1 rounded-full cursor-pointer bg-gray-100"
            >
              <div
                className="absolute top-0 left-0 h-full rounded-full pointer-events-none"
                style={{
                  width: `${prog * 100}%`,
                  background: "rgba(201,100,58,0.2)",
                }}
              />
              <div
                onMouseDown={(e) => { e.stopPropagation(); startDrag(e, true); }}
                className="absolute top-0 h-full rounded-full"
                style={{
                  width: `${thumbW}%`,
                  left: `${thumbL}%`,
                  background: "linear-gradient(to right,#c9643a,#03349a)",
                  boxShadow: "0 0 8px rgba(201,100,58,0.45)",
                  cursor: dragging && isThumb.current ? "grabbing" : "grab",
                  transition: dragging ? "none" : "left .08s linear, width .15s ease",
                }}
              />
            </div>

            {/* Dots + Counter + Arrows */}
            <div className="flex items-center justify-between mt-4">
              {/* Dots */}
              <div className="flex items-center gap-1.5">
                {products.map((_, i) => (
                  <div
                    key={i}
                    onClick={() => toCard(i)}
                    className="h-[3px] rounded-full cursor-pointer transition-all duration-300"
                    style={{
                      width: i === active ? 24 : 7,
                      background: i === active
                        ? "linear-gradient(to right,#c9643a,#03349a)"
                        : "#e5e7eb",
                    }}
                  />
                ))}
              </div>

              {/* Counter + Arrows */}
              <div className="flex items-center gap-3">
                <span className="text-xs text-gray-400 font-semibold tracking-widest hidden sm:block">
                  {String(active + 1).padStart(2, "0")} / {String(products.length).padStart(2, "0")}
                </span>
                <ArrowBtn dir="prev" onClick={() => byCard(-1)} />
                <ArrowBtn dir="next" onClick={() => byCard(1)} />
              </div>
            </div>
          </div>
        )}
      </section>
    </>
  );
}