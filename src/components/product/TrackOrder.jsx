import React, { useState, useRef, useEffect } from "react";
import {
  FaSearch, FaBoxOpen, FaCheckCircle, FaTruck,
  FaWarehouse, FaMapMarkerAlt, FaPhoneAlt, FaEnvelope,
  FaCopy, FaShieldAlt,
} from "react-icons/fa";
import { MdOutlineInventory2 } from "react-icons/md";

const BRAND  = "#820c0c";
const ACCENT = "#c9643a";

// ─── Demo Data ────────────────────────────────────────────────
const demoOrders = {
  "AYU-2025-001": {
    id: "AYU-2025-001",
    product: "Under Eye Cream + Herbal Glow Serum",
    placed: "March 10, 2025",
    estimatedDelivery: "March 20, 2025",
    amount: "₹1,280",
    customer: "Riya Nair",
    phone: "+91 98765 43210",
    address: "42, Anna Salai, Chennai, Tamil Nadu - 600002",
    courier: "BlueDart",
    awb: "BD9284710023",
    currentStep: 3,
    steps: [
      { label: "Order Confirmed",  desc: "Your order has been received & confirmed.",       date: "Mar 10, 10:32 AM", icon: "confirm"   },
      { label: "Processing",       desc: "Items packed & quality checked at our facility.", date: "Mar 11, 02:14 PM", icon: "process"   },
      { label: "Shipped",          desc: "Handed over to BlueDart. AWB: BD9284710023",     date: "Mar 12, 09:00 AM", icon: "truck"     },
      { label: "Out for Delivery", desc: "Your package is with the delivery executive.",   date: "Mar 19, 08:45 AM", icon: "warehouse" },
      { label: "Delivered",        desc: "Package delivered successfully.",                 date: null,               icon: "box"       },
    ],
  },
  "AYU-2025-002": {
    id: "AYU-2025-002",
    product: "Vitamin C Brightener + Hair Growth Serum",
    placed: "March 14, 2025",
    estimatedDelivery: "March 23, 2025",
    amount: "₹990",
    customer: "Karthik S",
    phone: "+91 91234 56789",
    address: "7, Nehru Street, Coimbatore, Tamil Nadu - 641001",
    courier: "Delhivery",
    awb: "DEL7731094882",
    currentStep: 2,
    steps: [
      { label: "Order Confirmed",  desc: "Your order has been received & confirmed.",          date: "Mar 14, 11:00 AM", icon: "confirm"   },
      { label: "Processing",       desc: "Items packed & quality checked at our facility.",    date: "Mar 15, 01:30 PM", icon: "process"   },
      { label: "Shipped",          desc: "Handed over to Delhivery. AWB: DEL7731094882",      date: "Mar 16, 10:00 AM", icon: "truck"     },
      { label: "Out for Delivery", desc: "Your package is with the delivery executive.",      date: null,               icon: "warehouse" },
      { label: "Delivered",        desc: "Package delivered successfully.",                    date: null,               icon: "box"       },
    ],
  },
};

const statusConfig = {
  0: { bg:"#eff6ff", border:"#bfdbfe", text:"#1d4ed8", dot:"#60a5fa" },
  1: { bg:"#fff7ed", border:"#fed7aa", text:"#c2410c", dot:"#fb923c" },
  2: { bg:"#faf5ff", border:"#e9d5ff", text:"#7e22ce", dot:"#c084fc" },
  3: { bg:"#fefce8", border:"#fde68a", text:"#92400e", dot:"#f59e0b" },
  4: { bg:"#f0fdf4", border:"#bbf7d0", text:"#15803d", dot:"#4ade80" },
};

// ─── Icon renderer (avoids react-icons crash in some setups) ──
function StepIcon({ type, color }) {
  const s = { width:16, height:16, display:"block" };
  if (type === "confirm")   return <FaCheckCircle   style={s} color={color} />;
  if (type === "process")   return <MdOutlineInventory2 style={s} color={color} />;
  if (type === "truck")     return <FaTruck         style={s} color={color} />;
  if (type === "warehouse") return <FaWarehouse     style={s} color={color} />;
  if (type === "box")       return <FaBoxOpen       style={s} color={color} />;
  return null;
}

// ─── Scroll reveal hook ───────────────────────────────────────
function useReveal(delay = 0) {
  const ref = useRef(null);
  const [vis, setVis] = useState(false);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setTimeout(() => setVis(true), delay);
          obs.disconnect();
        }
      },
      { threshold: 0.05 }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, [delay]);
  return [ref, vis];
}

// ─── Main Component ───────────────────────────────────────────
export default function TrackOrder() {
  const [query,      setQuery]      = useState("");
  const [order,      setOrder]      = useState(null);
  const [error,      setError]      = useState("");
  const [searched,   setSearched]   = useState(false);
  const [copied,     setCopied]     = useState(false);
  const [focused,    setFocused]    = useState(false);
  const [loading,    setLoading]    = useState(false);

  const [heroRef,  heroVis]  = useReveal(0);
  const [srchRef,  srchVis]  = useReveal(120);
  const [cardRef,  cardVis]  = useReveal(0);
  const [tlRef,    tlVis]    = useReveal(80);
  const [infoRef,  infoVis]  = useReveal(160);

  const handleSearch = () => {
    const id = (query || "").trim().toUpperCase();
    if (!id) { setError("Please enter an Order ID."); return; }
    setLoading(true);
    setError("");
    setOrder(null);
    setSearched(false);

    // Simulated async lookup
    setTimeout(() => {
      try {
        const found = demoOrders[id] || null;
        setOrder(found);
        setSearched(true);
        if (!found) setError("Order not found. Try: AYU-2025-001 or AYU-2025-002");
      } catch (e) {
        setError("Something went wrong. Please try again.");
      } finally {
        setLoading(false);
      }
    }, 900);
  };

  const handleCopy = () => {
    if (!order) return;
    navigator.clipboard.writeText(order.id).catch(() => {});
    setCopied(true);
    setTimeout(() => setCopied(false), 1800);
  };

  const progress = order
    ? Math.round(((order.currentStep + 1) / order.steps.length) * 100)
    : 0;

  const sc = order ? (statusConfig[order.currentStep] || statusConfig[0]) : null;

  return (
    <div style={{
      minHeight: "100vh",
      background: "#fdf6f0",
      fontFamily: "'DM Sans', 'Nunito', sans-serif",
      position: "relative",
      overflowX: "hidden",
    }}>

      {/* ── STYLES ── */}
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=DM+Sans:wght@400;500;600;700&family=Playfair+Display:wght@700;900&display=swap');
        *, *::before, *::after { box-sizing: border-box; }
        .to-input::placeholder { color: #c4a99a; }
        .to-input:focus { outline: none; }
        @keyframes to-pulse { 0%,100%{box-shadow:0 0 0 0 rgba(201,100,58,.45)} 60%{box-shadow:0 0 0 9px rgba(201,100,58,0)} }
        @keyframes to-spin { to{transform:rotate(360deg)} }
        @keyframes to-fadeup { from{opacity:0;transform:translateY(28px)} to{opacity:1;transform:translateY(0)} }
        @keyframes to-slidein { from{opacity:0;transform:translateX(-22px)} to{opacity:1;transform:translateX(0)} }
        @keyframes to-popin { from{opacity:0;transform:scale(0.93)} to{opacity:1;transform:scale(1)} }
        @keyframes to-shimmer { 0%{background-position:200% center} 100%{background-position:-200% center} }
        .to-sbtn { transition: all .25s ease; }
        .to-sbtn:hover:not(:disabled) { transform:translateY(-2px); box-shadow:0 10px 28px rgba(130,12,12,.3) !important; }
        .to-sbtn:active { transform:scale(.97) !important; }
        .to-dtag { transition:all .2s ease; cursor:pointer; user-select:none; }
        .to-dtag:hover { background:rgba(130,12,12,.08) !important; border-color:rgba(130,12,12,.25) !important; color:#820c0c !important; }
        .to-srow { transition:background .2s, border-color .2s; }
        .to-srow:hover { background:#fff8f4 !important; }
        .to-icard { transition:all .3s ease; }
        .to-icard:hover { border-color:rgba(201,100,58,.4) !important; transform:translateY(-3px); box-shadow:0 16px 48px rgba(130,12,12,.1) !important; }
        .to-clink { transition:background .2s; }
        .to-clink:hover { background:#fef0e8 !important; }
        .to-cpill { transition:background .2s; }
        .to-cpill:hover { background:#f5e6e0 !important; }
        .to-spinner { width:18px;height:18px;border:2px solid rgba(255,255,255,.35);border-top-color:#fff;border-radius:50%;animation:to-spin .7s linear infinite;display:inline-block;vertical-align:middle; }
      `}</style>

      {/* ── SOFT BG ORBS ── */}
      <div style={{ position:"fixed", top:"-12%", left:"-10%", width:480, height:480, borderRadius:"50%", background:"radial-gradient(circle, rgba(130,12,12,.07) 0%, transparent 68%)", pointerEvents:"none", zIndex:0 }} />
      <div style={{ position:"fixed", top:"40%", right:"-8%",  width:380, height:380, borderRadius:"50%", background:"radial-gradient(circle, rgba(201,100,58,.08) 0%, transparent 68%)", pointerEvents:"none", zIndex:0 }} />
      <div style={{ position:"fixed", bottom:"-8%", left:"30%", width:560, height:560, borderRadius:"50%", background:"radial-gradient(circle, rgba(201,100,58,.05) 0%, transparent 68%)", pointerEvents:"none", zIndex:0 }} />

      {/* ── PAGE CONTENT ── */}
      <div style={{ position:"relative", zIndex:1 }}>

        {/* ── HERO ── */}
        <div
          ref={heroRef}
          style={{
            padding:"80px 24px 48px", textAlign:"center",
            opacity: heroVis ? 1 : 0,
            transform: heroVis ? "translateY(0)" : "translateY(-32px)",
            transition:"opacity .85s ease, transform .85s ease",
          }}
        >
          <div style={{ display:"inline-flex", alignItems:"center", gap:8, background:"#fff5f0", border:"1px solid rgba(201,100,58,.25)", borderRadius:99, padding:"6px 18px", marginBottom:28, boxShadow:"0 2px 10px rgba(201,100,58,.1)" }}>
            <span style={{ width:7, height:7, borderRadius:"50%", background:ACCENT, display:"inline-block", animation:"to-pulse 2s infinite" }} />
            <span style={{ color:ACCENT, fontSize:11, fontWeight:700, letterSpacing:".14em", textTransform:"uppercase" }}>Live Order Tracking</span>
          </div>

          <h1 style={{ fontFamily:"'Playfair Display',serif", color:BRAND, fontSize:"clamp(36px,6vw,68px)", fontWeight:900, margin:"0 0 16px", lineHeight:1.08, letterSpacing:"-.02em" }}>
            Where's My<br />
            <span style={{ background:`linear-gradient(100deg, ${BRAND} 0%, ${ACCENT} 60%, #e8904a 100%)`, backgroundSize:"200% 100%", WebkitBackgroundClip:"text", WebkitTextFillColor:"transparent", animation:"to-shimmer 4s linear infinite" }}>
              Package?
            </span>
          </h1>
          <p style={{ color:"#a07060", fontSize:16, maxWidth:400, margin:"0 auto", lineHeight:1.85 }}>
            Enter your Order ID below for real-time delivery updates on your Aayubakawath order.
          </p>
        </div>

        {/* ── SEARCH BOX ── */}
        <div
          ref={srchRef}
          style={{
            maxWidth:580, margin:"0 auto 52px", padding:"0 20px",
            opacity: srchVis ? 1 : 0,
            transform: srchVis ? "translateY(0)" : "translateY(28px)",
            transition:"opacity .7s ease, transform .7s ease",
          }}
        >
          <div style={{
            background:"#fff",
            border:`1.5px solid ${focused ? ACCENT : "rgba(201,100,58,.18)"}`,
            borderRadius:18, padding:"5px 5px 5px 20px",
            display:"flex", alignItems:"center", gap:14,
            boxShadow: focused
              ? "0 0 0 4px rgba(201,100,58,.1), 0 16px 48px rgba(130,12,12,.1)"
              : "0 8px 40px rgba(130,12,12,.08)",
            transition:"border-color .3s, box-shadow .3s",
          }}>
            <FaSearch size={14} color="#c4a99a" style={{ flexShrink:0 }} />
            <input
              className="to-input"
              value={query}
              onChange={e => setQuery(e.target.value)}
              onKeyDown={e => e.key === "Enter" && handleSearch()}
              onFocus={() => setFocused(true)}
              onBlur={() => setFocused(false)}
              placeholder="e.g. AYU-2025-001"
              style={{
                flex:1, background:"transparent", border:"none",
                color:"#1a1a1a", fontSize:15, fontFamily:"inherit",
                fontWeight:500, height:50, letterSpacing:".02em",
              }}
            />
            <button
              className="to-sbtn"
              onClick={handleSearch}
              disabled={loading}
              style={{
                height:50, padding:"0 26px", borderRadius:13, border:"none",
                background:`linear-gradient(135deg, ${BRAND} 0%, #6b0a0a 100%)`,
                color:"#fff", fontWeight:700, fontSize:14, cursor: loading ? "not-allowed" : "pointer",
                display:"flex", alignItems:"center", justifyContent:"center", gap:10,
                fontFamily:"inherit", letterSpacing:".04em", flexShrink:0,
                boxShadow:"0 4px 18px rgba(130,12,12,.28)",
                opacity: loading ? 0.8 : 1,
              }}
            >
              {loading
                ? <span className="to-spinner" />
                : <><FaSearch size={12} /> Track</>
              }
            </button>
          </div>

          {/* Error */}
          {error && (
            <div style={{ marginTop:12, padding:"10px 16px", background:"#fef2f2", border:"1px solid #fecaca", borderRadius:10, color:"#b91c1c", fontSize:13, fontWeight:500 }}>
              ⚠ {error}
            </div>
          )}

          {/* Demo chips */}
          <div style={{ display:"flex", alignItems:"center", gap:8, marginTop:14, justifyContent:"center", flexWrap:"wrap" }}>
            <span style={{ color:"#c4a99a", fontSize:12 }}>Try demo:</span>
            {["AYU-2025-001","AYU-2025-002"].map(id => (
              <span
                key={id}
                className="to-dtag"
                onClick={() => setQuery(id)}
                style={{ background:"#fff", border:"1px solid rgba(201,100,58,.2)", borderRadius:99, padding:"4px 14px", color:"#a07060", fontSize:12, fontWeight:600, letterSpacing:".04em", boxShadow:"0 1px 4px rgba(130,12,12,.06)" }}
              >
                {id}
              </span>
            ))}
          </div>
        </div>

        {/* ── ORDER RESULTS ── */}
        {order && (
          <div style={{ maxWidth:880, margin:"0 auto 80px", padding:"0 20px" }}>

            {/* ── SUMMARY CARD ── */}
            <div
              ref={cardRef}
              style={{
                borderRadius:24, overflow:"hidden", marginBottom:18,
                background:`linear-gradient(145deg, ${BRAND} 0%, #6b0a0a 100%)`,
                border:"1px solid rgba(130,12,12,.15)",
                boxShadow:"0 24px 80px rgba(130,12,12,.22), 0 4px 20px rgba(0,0,0,.06)",
                opacity: cardVis ? 1 : 0,
                animation: cardVis ? "to-popin .65s ease both" : "none",
              }}
            >
              <div style={{ height:3, background:"linear-gradient(90deg, transparent, rgba(255,255,255,.3), #e8904a, rgba(255,255,255,.3), transparent)", backgroundSize:"300% 100%", animation:"to-shimmer 3s linear infinite" }} />

              <div style={{ padding:"30px 32px" }}>
                {/* ID + Status row */}
                <div style={{ display:"flex", alignItems:"flex-start", justifyContent:"space-between", flexWrap:"wrap", gap:16, marginBottom:26 }}>
                  <div>
                    <p style={{ color:"rgba(255,255,255,.4)", fontSize:10, fontWeight:700, letterSpacing:".18em", textTransform:"uppercase", margin:"0 0 7px" }}>Order ID</p>
                    <div style={{ display:"flex", alignItems:"center", gap:12 }}>
                      <span style={{ color:"#fff", fontFamily:"'Playfair Display',serif", fontSize:28, fontWeight:700 }}>{order.id}</span>
                      <button
                        className="to-cpill"
                        onClick={handleCopy}
                        style={{ background:"rgba(255,255,255,.12)", border:"1px solid rgba(255,255,255,.18)", borderRadius:8, padding:"5px 12px", cursor:"pointer", color:"rgba(255,255,255,.65)", fontSize:11, display:"flex", alignItems:"center", gap:5, fontWeight:600, fontFamily:"inherit" }}
                      >
                        <FaCopy size={9} /> {copied ? "✓ Copied" : "Copy"}
                      </button>
                    </div>
                  </div>
                  {sc && (
                    <div style={{ background:sc.bg, border:`1px solid ${sc.border}`, borderRadius:99, padding:"8px 20px", display:"flex", alignItems:"center", gap:9 }}>
                      <span style={{ width:8, height:8, borderRadius:"50%", background:sc.dot, animation:"to-pulse 2s infinite", display:"inline-block" }} />
                      <span style={{ color:sc.text, fontWeight:700, fontSize:13 }}>{order.steps[order.currentStep]?.label}</span>
                    </div>
                  )}
                </div>

                {/* Progress */}
                <div style={{ marginBottom:26 }}>
                  <div style={{ display:"flex", justifyContent:"space-between", marginBottom:10 }}>
                    <span style={{ color:"rgba(255,255,255,.4)", fontSize:12, fontWeight:600 }}>Delivery Progress</span>
                    <span style={{ color:"#f0b07a", fontWeight:700, fontSize:13 }}>{progress}%</span>
                  </div>
                  <div style={{ height:5, background:"rgba(255,255,255,.12)", borderRadius:99, overflow:"hidden" }}>
                    <div style={{ height:"100%", borderRadius:99, background:"linear-gradient(90deg, #e8904a, #f0b07a)", width: cardVis ? `${progress}%` : "0%", transition:"width 1.4s cubic-bezier(.4,0,.2,1) .5s", boxShadow:"0 0 12px rgba(240,176,122,.6)" }} />
                  </div>
                  <div style={{ display:"flex", justifyContent:"space-between", marginTop:8 }}>
                    {order.steps.map((_, i) => (
                      <div key={i} style={{ width:8, height:8, borderRadius:"50%", background: i <= order.currentStep ? "#f0b07a" : "rgba(255,255,255,.15)", transition:`background .4s ease ${i*.15}s`, boxShadow: i <= order.currentStep ? "0 0 7px rgba(240,176,122,.55)" : "none" }} />
                    ))}
                  </div>
                </div>

                {/* Meta grid */}
                <div style={{ display:"grid", gridTemplateColumns:"repeat(auto-fit, minmax(148px,1fr))", gap:12 }}>
                  {[
                    { label:"Product",       value: order.product },
                    { label:"Order Placed",  value: order.placed },
                    { label:"Est. Delivery", value: order.estimatedDelivery },
                    { label:"Amount Paid",   value: order.amount },
                  ].map((item, i) => (
                    <div key={i} style={{ background:"rgba(0,0,0,.18)", borderRadius:14, padding:"14px 16px", border:"1px solid rgba(255,255,255,.07)", opacity: cardVis ? 1 : 0, transform: cardVis ? "translateY(0)" : "translateY(14px)", transition:`opacity .5s ease ${.3+i*.08}s, transform .5s ease ${.3+i*.08}s` }}>
                      <p style={{ color:"rgba(255,255,255,.35)", fontSize:9, fontWeight:700, letterSpacing:".16em", textTransform:"uppercase", margin:"0 0 5px" }}>{item.label}</p>
                      <p style={{ color:"rgba(255,255,255,.88)", fontSize:13, fontWeight:600, margin:0, lineHeight:1.55 }}>{item.value}</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* ── TIMELINE ── */}
            <div
              ref={tlRef}
              style={{
                background:"#fff", borderRadius:24,
                border:"1px solid rgba(201,100,58,.14)", padding:"28px 30px", marginBottom:18,
                boxShadow:"0 8px 40px rgba(130,12,12,.07)",
                opacity: tlVis ? 1 : 0,
                transform: tlVis ? "translateY(0)" : "translateY(28px)",
                transition:"opacity .65s ease, transform .65s ease",
              }}
            >
              <div style={{ display:"flex", alignItems:"center", justifyContent:"space-between", flexWrap:"wrap", gap:12, marginBottom:26 }}>
                <h3 style={{ fontFamily:"'Playfair Display',serif", color:BRAND, fontSize:19, fontWeight:700, margin:0, display:"flex", alignItems:"center", gap:10 }}>
                  <FaTruck size={15} color={ACCENT} /> Shipment Timeline
                </h3>
                <div style={{ display:"flex", alignItems:"center", gap:8, background:"#f9f4f0", borderRadius:10, padding:"6px 14px", border:"1px solid rgba(201,100,58,.12)" }}>
                  <FaShieldAlt size={11} color="#22c55e" />
                  <span style={{ color:"#a07060", fontSize:12, fontWeight:600 }}>{order.courier} · {order.awb}</span>
                </div>
              </div>

              {order.steps.map((step, i) => {
                const done    = i <= order.currentStep;
                const current = i === order.currentStep;
                return (
                  <div
                    key={i}
                    className="to-srow"
                    style={{
                      display:"flex", gap:18,
                      padding:"12px 14px", borderRadius:14, marginBottom:4,
                      background: current ? "#fff8f4" : "transparent",
                      border: current ? "1px solid rgba(201,100,58,.22)" : "1px solid transparent",
                      animation: tlVis ? `to-slidein .55s ease ${i*.1}s both` : "none",
                    }}
                  >
                    {/* Icon column */}
                    <div style={{ display:"flex", flexDirection:"column", alignItems:"center", flexShrink:0, width:44 }}>
                      <div style={{
                        width:44, height:44, borderRadius:"50%", flexShrink:0,
                        display:"flex", alignItems:"center", justifyContent:"center",
                        background: done
                          ? current
                            ? `linear-gradient(135deg, ${ACCENT}, ${BRAND})`
                            : "rgba(130,12,12,.1)"
                          : "#f5f0ed",
                        border: done ? "none" : "1px solid #e8ddd8",
                        boxShadow: current ? "0 0 18px rgba(201,100,58,.28)" : "none",
                        animation: current ? "to-pulse 2.5s infinite" : "none",
                        transition:"all .4s ease", zIndex:2,
                      }}>
                        <StepIcon
                          type={step.icon}
                          color={done ? (current ? "#fff" : BRAND) : "#c4a99a"}
                        />
                      </div>
                      {i < order.steps.length - 1 && (
                        <div style={{ width:2, flex:1, minHeight:24, margin:"5px 0", borderRadius:2, background: done ? "linear-gradient(180deg, rgba(130,12,12,.45), rgba(201,100,58,.2))" : "#f0e8e2", transition:"background .5s ease" }} />
                      )}
                    </div>

                    {/* Text */}
                    <div style={{ flex:1, paddingTop:10, paddingBottom: i < order.steps.length - 1 ? 8 : 0 }}>
                      <div style={{ display:"flex", alignItems:"center", justifyContent:"space-between", flexWrap:"wrap", gap:8, marginBottom:4 }}>
                        <span style={{ fontSize:14, fontWeight:600, color: done ? "#1a1a1a" : "#c4a99a" }}>
                          {step.label}
                        </span>
                        <div style={{ display:"flex", alignItems:"center", gap:8 }}>
                          {current && (
                            <span style={{ background:"#fff5ed", border:"1px solid rgba(201,100,58,.3)", color:ACCENT, fontSize:10, fontWeight:700, padding:"3px 12px", borderRadius:99, letterSpacing:".1em", textTransform:"uppercase" }}>
                              Live
                            </span>
                          )}
                          {step.date && (
                            <span style={{ color:"#bba99a", fontSize:12, fontWeight:500 }}>{step.date}</span>
                          )}
                        </div>
                      </div>
                      <p style={{ color: done ? "#a07060" : "#d4c4bc", fontSize:13, margin:0, lineHeight:1.7 }}>
                        {step.desc}
                      </p>
                    </div>
                  </div>
                );
              })}
            </div>

            {/* ── INFO CARDS ── */}
            <div
              ref={infoRef}
              style={{
                display:"grid", gridTemplateColumns:"repeat(auto-fit, minmax(260px,1fr))", gap:16,
                opacity: infoVis ? 1 : 0,
                transform: infoVis ? "translateY(0)" : "translateY(24px)",
                transition:"opacity .6s ease, transform .6s ease",
              }}
            >
              {/* Address */}
              <div className="to-icard" style={{ background:"#fff", borderRadius:20, border:"1px solid rgba(201,100,58,.14)", padding:"22px 24px", boxShadow:"0 4px 20px rgba(130,12,12,.06)" }}>
                <div style={{ display:"flex", alignItems:"center", gap:10, marginBottom:18 }}>
                  <div style={{ width:38, height:38, borderRadius:11, background:"#fff5f0", border:"1px solid rgba(201,100,58,.2)", display:"flex", alignItems:"center", justifyContent:"center" }}>
                    <FaMapMarkerAlt size={15} color={ACCENT} />
                  </div>
                  <span style={{ color:"#a07060", fontSize:10, fontWeight:700, letterSpacing:".16em", textTransform:"uppercase" }}>Delivery Address</span>
                </div>
                <p style={{ color:"#1a1a1a", fontSize:15, fontWeight:700, margin:"0 0 6px" }}>{order.customer}</p>
                <p style={{ color:"#9a7060", fontSize:13, lineHeight:1.8, margin:0 }}>{order.address}</p>
              </div>

              {/* Help */}
              <div className="to-icard" style={{ background:"#fff", borderRadius:20, border:"1px solid rgba(201,100,58,.14)", padding:"22px 24px", boxShadow:"0 4px 20px rgba(130,12,12,.06)" }}>
                <div style={{ display:"flex", alignItems:"center", gap:10, marginBottom:18 }}>
                  <div style={{ width:38, height:38, borderRadius:11, background:"#fff5f0", border:"1px solid rgba(201,100,58,.2)", display:"flex", alignItems:"center", justifyContent:"center" }}>
                    <FaPhoneAlt size={13} color={ACCENT} />
                  </div>
                  <span style={{ color:"#a07060", fontSize:10, fontWeight:700, letterSpacing:".16em", textTransform:"uppercase" }}>Need Help?</span>
                </div>
                <div style={{ display:"flex", flexDirection:"column", gap:10 }}>
                  <a href={`tel:${order.phone}`} className="to-clink" style={{ display:"flex", alignItems:"center", gap:12, textDecoration:"none", padding:"11px 14px", background:"#fdf8f5", borderRadius:12, border:"1px solid rgba(201,100,58,.1)" }}>
                    <FaPhoneAlt size={12} color={BRAND} />
                    <span style={{ color:"#4a2010", fontSize:13, fontWeight:600 }}>{order.phone}</span>
                  </a>
                  <a href="mailto:support@aayubakawath.com" className="to-clink" style={{ display:"flex", alignItems:"center", gap:12, textDecoration:"none", padding:"11px 14px", background:"#fdf8f5", borderRadius:12, border:"1px solid rgba(201,100,58,.1)" }}>
                    <FaEnvelope size={12} color={BRAND} />
                    <span style={{ color:"#4a2010", fontSize:13, fontWeight:600 }}>support@aayubakawath.com</span>
                  </a>
                </div>
              </div>
            </div>

          </div>
        )}

        {/* ── NOT FOUND STATE ── */}
        {searched && !order && !loading && (
          <div style={{ textAlign:"center", padding:"80px 24px", animation:"to-fadeup .6s ease both" }}>
            <div style={{ fontSize:60, marginBottom:18 }}>📦</div>
            <h3 style={{ fontFamily:"'Playfair Display',serif", color:BRAND, fontSize:24, fontWeight:700, margin:"0 0 10px" }}>Order Not Found</h3>
            <p style={{ color:"#a07060", fontSize:14, maxWidth:320, margin:"0 auto", lineHeight:1.8 }}>
              Double-check your Order ID or contact our support team.<br />
              <strong style={{ color:BRAND }}>Try: AYU-2025-001 or AYU-2025-002</strong>
            </p>
          </div>
        )}

      </div>
    </div>
  );
}