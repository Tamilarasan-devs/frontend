import { useState } from "react";

const BRAND = "#820c0c";
const ACCENT = "#c9643a";

const initialCart = [
  { id: 1, name: "Cherry Iron Supplement", category: "Supplements", price: 299, originalPrice: 499, qty: 2, image: "https://www.amway.in/_next/image?url=https://media.amway.in/sys-master/images/h86/h9c/9201499865118/EIA.w560.h560.316167ID_Cherry-iron2.png&w=1440&q=75", badge: "Best Seller", tags: ["Iron-Rich", "Energy"] },
  { id: 2, name: "Daily Multivitamin Tablets", category: "Vitamins", price: 449, originalPrice: 699, qty: 1, image: "https://originnutrition.in/cdn/shop/files/supergreens_5.webp?v=1740766116&width=533", badge: "Top Rated", tags: ["Immunity", "Daily Use"] },
  { id: 3, name: "Omega-3 Fish Oil Capsules", category: "Supplements", price: 399, originalPrice: 599, qty: 1, image: "https://originnutrition.in/cdn/shop/files/supergreens_5.webp?v=1740766116&width=533", badge: "Best Seller", tags: ["Heart", "Brain"] },
];

const badgeMap = {
  "Best Seller": "bg-amber-100 text-amber-800 border-amber-300",
  "New":         "bg-blue-100 text-blue-800 border-blue-300",
  "Top Rated":   "bg-emerald-100 text-emerald-800 border-emerald-300",
  "Popular":     "bg-violet-100 text-violet-800 border-violet-300",
};

const SUGGESTED = [
  { id: 7, name: "Vitamin C Boost", price: 279, originalPrice: 449, image: "https://originnutrition.in/cdn/shop/files/supergreens_5.webp?v=1740766116&width=533", badge: "New" },
  { id: 9, name: "Digestive Enzymes", price: 519, originalPrice: 749, image: "https://originnutrition.in/cdn/shop/files/supergreens_5.webp?v=1740766116&width=533", badge: "Top Rated" },
  { id: 6, name: "Calcium Magnesium", price: 479, originalPrice: 699, image: "https://originnutrition.in/cdn/shop/files/supergreens_5.webp?v=1740766116&width=533", badge: "Popular" },
];

const COUPONS = { GRAB: 10, HEALTH20: 20, FIRST15: 15 };

export default function CartPage() {
  const [cart, setCart]                   = useState(initialCart);
  const [coupon, setCoupon]               = useState("");
  const [appliedCoupon, setAppliedCoupon] = useState(null);
  const [couponError, setCouponError]     = useState("");
  const [couponSuccess, setCouponSuccess] = useState("");
  const [removingId, setRemovingId]       = useState(null);
  const [addedId, setAddedId]             = useState(null);

  const subtotal   = cart.reduce((s, i) => s + i.price * i.qty, 0);
  const mrpTotal   = cart.reduce((s, i) => s + i.originalPrice * i.qty, 0);
  const savings    = mrpTotal - subtotal;
  const discount   = appliedCoupon ? Math.round(subtotal * (COUPONS[appliedCoupon] / 100)) : 0;
  const delivery   = subtotal >= 999 ? 0 : 79;
  const total      = subtotal - discount + delivery;
  const totalItems = cart.reduce((s, i) => s + i.qty, 0);

  const updateQty = (id, delta) =>
    setCart((c) => c.map((i) => i.id === id ? { ...i, qty: Math.max(1, i.qty + delta) } : i));

  const removeItem = (id) => {
    setRemovingId(id);
    setTimeout(() => { setCart((c) => c.filter((i) => i.id !== id)); setRemovingId(null); }, 350);
  };

  const applyCoupon = () => {
    const code = coupon.trim().toUpperCase();
    if (COUPONS[code]) {
      setAppliedCoupon(code); setCouponSuccess(`🎉 ${COUPONS[code]}% discount applied!`); setCouponError("");
    } else {
      setCouponError("Invalid code. Try GRAB, HEALTH20 or FIRST15."); setCouponSuccess(""); setAppliedCoupon(null);
    }
  };

  const addSuggested = (item) => {
    setAddedId(item.id);
    setCart((c) => {
      const exists = c.find((i) => i.id === item.id);
      if (exists) return c.map((i) => i.id === item.id ? { ...i, qty: i.qty + 1 } : i);
      return [...c, { ...item, qty: 1, category: "Vitamins", tags: [] }];
    });
    setTimeout(() => setAddedId(null), 1500);
  };

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Libre+Baskerville:wght@400;700&family=DM+Sans:wght@400;500;600;700;800&display=swap');
        * { font-family: 'DM Sans', sans-serif; box-sizing: border-box; }
        @keyframes slideIn { from { opacity:0; transform:translateY(16px); } to { opacity:1; transform:translateY(0); } }
        @keyframes fadeOut { from { opacity:1; transform:scale(1); } to { opacity:0; transform:scale(.95); } }
        @keyframes popIn   { 0%{transform:scale(.8);opacity:0} 70%{transform:scale(1.08)} 100%{transform:scale(1);opacity:1} }
        .card-in  { animation: slideIn .4s ease both; }
        .card-out { animation: fadeOut .35s ease forwards; }
        .pop-in   { animation: popIn .4s cubic-bezier(.22,.68,0,1.3) both; }
        ::-webkit-scrollbar { width:4px; }
        ::-webkit-scrollbar-thumb { background:#e0d6d6; border-radius:99px; }
      `}</style>

      <div className="min-h-screen bg-gradient-to-br from-orange-50 via-white to-rose-50">

        {/* ── Navbar ── */}
        <nav className="sticky top-0 z-30 bg-white/95 backdrop-blur border-b border-gray-100 shadow-sm">
          <div className="max-w-screen-xl mx-auto px-4 sm:px-6 py-3 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-xl flex items-center justify-center text-white font-black text-sm shadow"
                style={{ background: BRAND }}>W</div>
              <span className="font-extrabold text-gray-900 text-base" style={{ fontFamily: "'Libre Baskerville',serif" }}>
                Wellness
              </span>
            </div>
            <div className="flex items-center gap-3">
              <button className="hidden sm:block text-sm font-semibold text-gray-500 hover:text-gray-800 transition">
                ← Continue Shopping
              </button>
              <div className="relative">
                <div className="w-9 h-9 rounded-xl bg-gray-100 flex items-center justify-center cursor-pointer hover:bg-gray-200 transition">
                  <svg className="w-4 h-4 text-gray-600" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2.2}>
                    <path d="M6 2L3 6v14a2 2 0 002 2h14a2 2 0 002-2V6l-3-4z"/>
                    <line x1="3" y1="6" x2="21" y2="6"/>
                    <path d="M16 10a4 4 0 01-8 0"/>
                  </svg>
                </div>
                {totalItems > 0 && (
                  <span className="absolute -top-1.5 -right-1.5 w-4 h-4 rounded-full text-white text-[10px] font-black flex items-center justify-center pop-in"
                    style={{ background: BRAND }}>{totalItems}</span>
                )}
              </div>
            </div>
          </div>
        </nav>

        <div className="max-w-screen-xl mx-auto px-4 sm:px-6 py-6 sm:py-8">

          {/* ── Page Title ── */}
          <div className="mb-6">
            <div className="flex items-center gap-3 mb-1">
              <h1 className="text-2xl sm:text-3xl font-bold text-gray-900"
                style={{ fontFamily: "'Libre Baskerville',serif" }}>Your Cart</h1>
              {totalItems > 0 && (
                <span className="text-xs font-bold px-3 py-1 rounded-full text-white pop-in"
                  style={{ background: BRAND }}>{totalItems} item{totalItems !== 1 ? "s" : ""}</span>
              )}
            </div>
            <p className="text-sm text-gray-400">Review your items before checkout</p>
          </div>

          {/* ── Empty State ── */}
          {cart.length === 0 ? (
            <div className="flex flex-col items-center justify-center py-24 text-center card-in">
              <div className="w-24 h-24 rounded-full bg-red-50 flex items-center justify-center mb-5">
                <svg className="w-10 h-10 text-red-200" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5}>
                  <path d="M6 2L3 6v14a2 2 0 002 2h14a2 2 0 002-2V6l-3-4z"/>
                  <line x1="3" y1="6" x2="21" y2="6"/>
                  <path d="M16 10a4 4 0 01-8 0"/>
                </svg>
              </div>
              <h2 className="text-xl font-bold text-gray-700 mb-2">Your cart is empty</h2>
              <p className="text-sm text-gray-400 mb-6 max-w-xs">Looks like you haven't added anything yet. Explore our wellness products!</p>
              <button className="px-8 py-3 rounded-2xl text-white font-bold text-sm border-none cursor-pointer shadow-lg"
                style={{ background: `linear-gradient(135deg, ${BRAND}, ${ACCENT})` }}>
                Shop Now
              </button>
            </div>

          ) : (
            /* ── Main Layout: stacks on mobile, side-by-side on lg ── */
            <div className="flex flex-col lg:flex-row gap-5 lg:gap-8 items-start">

              {/* ════ LEFT COLUMN ════ */}
              <div className="w-full lg:flex-1 min-w-0 space-y-4">

                {/* Free Delivery Banner */}
                {delivery > 0 ? (
                  <div className="bg-white rounded-2xl p-4 border border-orange-100 shadow-sm card-in">
                    <div className="flex items-center gap-2 mb-2 flex-wrap">
                      <svg className="w-4 h-4 text-orange-500 shrink-0" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2.2}>
                        <rect x="1" y="3" width="15" height="13" rx="1"/>
                        <path d="M16 8h4l3 5v4h-7V8z"/>
                        <circle cx="5.5" cy="18.5" r="2.5"/>
                        <circle cx="18.5" cy="18.5" r="2.5"/>
                      </svg>
                      <span className="text-sm font-semibold text-gray-700">
                        Add <strong style={{ color: BRAND }}>₹{999 - subtotal}</strong> more for{" "}
                        <strong className="text-emerald-600">FREE delivery</strong>
                      </span>
                    </div>
                    <div className="h-2 bg-gray-100 rounded-full overflow-hidden">
                      <div className="h-full rounded-full transition-all duration-700"
                        style={{ width: `${Math.min((subtotal / 999) * 100, 100)}%`, background: `linear-gradient(90deg, ${BRAND}, ${ACCENT})` }} />
                    </div>
                  </div>
                ) : (
                  <div className="bg-emerald-50 border border-emerald-200 rounded-2xl px-4 py-3 flex items-center gap-2 card-in">
                    <span className="text-lg">🎉</span>
                    <span className="text-sm font-bold text-emerald-700">You've unlocked FREE delivery!</span>
                  </div>
                )}

                {/* ── Cart Items ── */}
                {cart.map((item, idx) => (
                  <div key={item.id}
                    className={`bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden
                      ${removingId === item.id ? "card-out" : "card-in"}`}
                    style={{ animationDelay: `${idx * 0.07}s` }}>

                    {/* Card row — always horizontal, image left / content right */}
                    <div className="flex">

                      {/* Product Image */}
                      <div className="w-24 sm:w-32 shrink-0 bg-gradient-to-br from-orange-50 to-rose-50 flex items-center justify-center p-2 sm:p-3">
                        <img src={item.image} alt={item.name}
                          className="w-full h-20 sm:h-24 object-contain" />
                      </div>

                      {/* Content */}
                      <div className="flex-1 p-3 sm:p-4 flex flex-col justify-between min-w-0">

                        {/* Top row: info + remove btn */}
                        <div className="flex items-start justify-between gap-2">
                          <div className="min-w-0 flex-1">
                            {item.badge && (
                              <span className={`inline-block text-[9px] font-bold uppercase tracking-widest px-2 py-0.5 rounded-full border mb-1 ${badgeMap[item.badge]}`}>
                                {item.badge}
                              </span>
                            )}
                            {/* FIX: use break-words + pr-2 so long names never overflow */}
                            <h3 className="font-bold text-gray-900 text-sm leading-snug break-words pr-1"
                              style={{ fontFamily: "'Libre Baskerville',serif" }}>
                              {item.name}
                            </h3>
                            <p className="text-xs text-gray-400 mt-0.5">{item.category}</p>
                          </div>
                          <button onClick={() => removeItem(item.id)}
                            className="shrink-0 w-7 h-7 sm:w-8 sm:h-8 rounded-xl bg-red-50 hover:bg-red-100 flex items-center justify-center transition cursor-pointer border-none">
                            <svg className="w-3 h-3 sm:w-3.5 sm:h-3.5 text-red-400" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2.5}>
                              <polyline points="3 6 5 6 21 6"/>
                              <path d="M19 6l-1 14a2 2 0 01-2 2H8a2 2 0 01-2-2L5 6"/>
                              <path d="M10 11v6M14 11v6M9 6V4h6v2"/>
                            </svg>
                          </button>
                        </div>

                        {/* Tags */}
                        {item.tags?.length > 0 && (
                          <div className="flex gap-1 flex-wrap mt-1">
                            {item.tags.map((t) => (
                              <span key={t} className="text-[9px] font-bold uppercase tracking-wide px-2 py-0.5 rounded-full text-white"
                                style={{ background: ACCENT }}>{t}</span>
                            ))}
                          </div>
                        )}

                        {/* Bottom row: price + qty stepper */}
                        {/* FIX: flex-col on xs, flex-row from sm upwards */}
                        <div className="flex flex-col xs:flex-row sm:flex-row items-start sm:items-center justify-between mt-2 gap-2">

                          {/* Price block */}
                          <div className="flex items-baseline gap-1 flex-wrap">
                            <span className="text-base sm:text-lg font-extrabold leading-none"
                              style={{ color: BRAND, fontFamily: "'Libre Baskerville',serif" }}>
                              ₹{(item.price * item.qty).toLocaleString()}
                            </span>
                            <span className="text-xs text-gray-400 line-through">
                              ₹{(item.originalPrice * item.qty).toLocaleString()}
                            </span>
                            <span className="text-[10px] font-bold text-emerald-600 bg-emerald-50 px-1.5 py-0.5 rounded-full">
                              {Math.round(((item.originalPrice - item.price) / item.originalPrice) * 100)}% off
                            </span>
                          </div>

                          {/* Qty stepper — fixed width so it never stretches */}
                          <div className="flex items-center rounded-xl overflow-hidden border border-gray-200 shadow-sm shrink-0">
                            <button onClick={() => updateQty(item.id, -1)}
                              className="w-8 h-8 flex items-center justify-center font-bold text-gray-600 hover:bg-red-50 hover:text-red-700 transition cursor-pointer border-none bg-white text-base">
                              −
                            </button>
                            <span className="w-8 h-8 flex items-center justify-center text-sm font-bold text-gray-900 bg-gray-50 border-x border-gray-200">
                              {item.qty}
                            </span>
                            <button onClick={() => updateQty(item.id, +1)}
                              className="w-8 h-8 flex items-center justify-center font-bold text-gray-600 hover:bg-red-800 hover:text-white transition cursor-pointer border-none bg-white text-base">
                              +
                            </button>
                          </div>
                        </div>

                      </div>
                    </div>
                  </div>
                ))}

                {/* ── Coupon ── */}
                <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-4 sm:p-5 card-in"
                  style={{ animationDelay: `${cart.length * 0.07 + 0.1}s` }}>
                  <p className="text-sm font-bold text-gray-700 mb-3 flex items-center gap-2">
                    <svg className="w-4 h-4 shrink-0" style={{ color: BRAND }} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}>
                      <path d="M20.59 13.41l-7.17 7.17a2 2 0 01-2.83 0L2 12V2h10l8.59 8.59a2 2 0 010 2.82z"/>
                      <line x1="7" y1="7" x2="7.01" y2="7"/>
                    </svg>
                    Have a coupon code?
                  </p>
                  {/* FIX: stack on mobile, row on sm+ */}
                  <div className="flex flex-col sm:flex-row gap-2">
                    <input
                      type="text" placeholder="Enter code (e.g. GRAB)" value={coupon}
                      onChange={(e) => { setCoupon(e.target.value.toUpperCase()); setCouponError(""); setCouponSuccess(""); }}
                      onKeyDown={(e) => e.key === "Enter" && applyCoupon()}
                      className="flex-1 px-4 py-2.5 border border-gray-200 rounded-xl text-sm text-gray-800 bg-gray-50 outline-none focus:border-red-300 focus:ring-2 focus:ring-red-100 transition font-semibold tracking-widest uppercase w-full"
                    />
                    <button onClick={applyCoupon}
                      className="px-5 py-2.5 rounded-xl text-white text-sm font-bold border-none cursor-pointer hover:opacity-90 transition whitespace-nowrap w-full sm:w-auto"
                      style={{ background: BRAND }}>
                      Apply
                    </button>
                  </div>
                  {couponError   && <p className="text-xs text-red-500 font-medium mt-2">{couponError}</p>}
                  {couponSuccess && <p className="text-xs text-emerald-600 font-bold mt-2">{couponSuccess}</p>}
                  <p className="text-[11px] text-gray-400 mt-2">
                    Try: <span className="font-bold text-gray-500">GRAB</span>,{" "}
                    <span className="font-bold text-gray-500">HEALTH20</span>,{" "}
                    <span className="font-bold text-gray-500">FIRST15</span>
                  </p>
                </div>

                {/* ── You Might Also Like ── */}
                <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-4 sm:p-5 card-in"
                  style={{ animationDelay: `${cart.length * 0.07 + 0.2}s` }}>
                  <p className="text-sm font-bold text-gray-800 mb-4">You might also like</p>
                  {/* FIX: grid-cols-1 on xs, grid-cols-3 from sm */}
                  <div className="grid grid-cols-3 gap-2 sm:gap-3">
                    {SUGGESTED.map((s) => {
                      const isAdded = addedId === s.id;
                      return (
                        <div key={s.id} className="group flex flex-col items-center text-center bg-orange-50 rounded-xl p-2 sm:p-3 hover:bg-orange-100 transition cursor-pointer">
                          <img src={s.image} alt={s.name}
                            className="w-12 h-12 sm:w-14 sm:h-14 object-contain mb-2 group-hover:scale-105 transition-transform duration-300" />
                          <p className="text-[10px] sm:text-[11px] font-bold text-gray-800 leading-snug mb-1 line-clamp-2">{s.name}</p>
                          <p className="text-xs font-extrabold mb-2" style={{ color: BRAND }}>₹{s.price}</p>
                          <button
                            onClick={() => addSuggested(s)}
                            className={`w-full py-1.5 rounded-lg text-[10px] sm:text-[11px] font-bold border-none cursor-pointer transition-all duration-300
                              ${isAdded ? "bg-emerald-500 text-white" : "text-white hover:opacity-90"}`}
                            style={!isAdded ? { background: BRAND } : {}}>
                            {isAdded ? "✓ Added" : "+ Add"}
                          </button>
                        </div>
                      );
                    })}
                  </div>
                </div>

              </div>{/* end LEFT */}

              {/* ════ RIGHT COLUMN: Order Summary ════ */}
              {/* FIX: full width on mobile, fixed width on lg, sticky only on lg */}
              <div className="w-full lg:w-80 xl:w-96 shrink-0">
                <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden lg:sticky lg:top-20 card-in"
                  style={{ animationDelay: "0.15s" }}>

                  {/* Summary Header */}
                  <div className="px-5 sm:px-6 py-4 border-b border-gray-100"
                    style={{ background: `linear-gradient(130deg, #3d0404, ${BRAND})` }}>
                    <h2 className="text-base font-bold text-white" style={{ fontFamily: "'Libre Baskerville',serif" }}>
                      Order Summary
                    </h2>
                    <p className="text-xs text-red-200 mt-0.5">
                      {totalItems} item{totalItems !== 1 ? "s" : ""} in your cart
                    </p>
                  </div>

                  <div className="p-4 sm:p-5 space-y-3">
                    <div className="flex justify-between text-sm">
                      <span className="text-gray-500">MRP Total</span>
                      <span className="font-semibold text-gray-700">₹{mrpTotal.toLocaleString()}</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="text-gray-500">Product Discount</span>
                      <span className="font-bold text-emerald-600">− ₹{savings.toLocaleString()}</span>
                    </div>
                    {appliedCoupon && (
                      <div className="flex justify-between text-sm">
                        <span className="text-gray-500 flex items-center gap-1 flex-wrap">
                          Coupon ({appliedCoupon})
                          <button onClick={() => { setAppliedCoupon(null); setCouponSuccess(""); setCoupon(""); }}
                            className="text-red-400 hover:text-red-600 cursor-pointer border-none bg-transparent text-xs ml-1">✕</button>
                        </span>
                        <span className="font-bold text-emerald-600">− ₹{discount.toLocaleString()}</span>
                      </div>
                    )}
                    <div className="flex justify-between text-sm">
                      <span className="text-gray-500">Delivery</span>
                      <span className={`font-bold ${delivery === 0 ? "text-emerald-600" : "text-gray-700"}`}>
                        {delivery === 0 ? "FREE" : `₹${delivery}`}
                      </span>
                    </div>

                    <div className="border-t border-dashed border-gray-200 pt-3">
                      <div className="flex justify-between items-center">
                        <span className="font-extrabold text-gray-900">Total</span>
                        <span className="text-xl font-extrabold"
                          style={{ color: BRAND, fontFamily: "'Libre Baskerville',serif" }}>
                          ₹{total.toLocaleString()}
                        </span>
                      </div>
                      <p className="text-[11px] text-emerald-600 font-bold mt-1 text-right">
                        You save ₹{(savings + discount).toLocaleString()} on this order 🎉
                      </p>
                    </div>

                    {/* Checkout */}
                    <button className="w-full py-3.5 rounded-2xl text-white font-bold text-sm border-none cursor-pointer shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-0.5 mt-1"
                      style={{ background: `linear-gradient(135deg, #3d0404, ${BRAND} 50%, ${ACCENT})` }}>
                      Proceed to Checkout →
                    </button>

                    {/* Trust Badges */}
                    <div className="grid grid-cols-3 gap-2 pt-1">
                      {[
                        { icon: "🔒", label: "Secure Payment" },
                        { icon: "↩️", label: "Easy Returns" },
                        { icon: "✅", label: "100% Genuine" },
                      ].map((b) => (
                        <div key={b.label} className="flex flex-col items-center text-center bg-gray-50 rounded-xl py-2.5 px-1">
                          <span className="text-base mb-1">{b.icon}</span>
                          <span className="text-[9px] font-bold text-gray-500 leading-tight">{b.label}</span>
                        </div>
                      ))}
                    </div>

                    {/* Payment chips */}
                    <div className="flex items-center justify-center gap-2 pt-1 flex-wrap">
                      {["VISA", "MC", "UPI", "EMI"].map((p) => (
                        <div key={p} className="px-2 py-1 rounded-md bg-gray-100 text-[9px] font-extrabold text-gray-500 tracking-wider">
                          {p}
                        </div>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Help box */}
                <div className="mt-4 bg-white rounded-2xl border border-gray-100 shadow-sm p-4 flex items-center gap-3 card-in"
                  style={{ animationDelay: "0.25s" }}>
                  <div className="w-9 h-9 rounded-xl flex items-center justify-center shrink-0" style={{ background: "#fff4f4" }}>
                    <svg className="w-4 h-4" style={{ color: BRAND }} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}>
                      <path d="M21 15a2 2 0 01-2 2H7l-4 4V5a2 2 0 012-2h14a2 2 0 012 2z"/>
                    </svg>
                  </div>
                  <div className="min-w-0">
                    <p className="text-xs font-bold text-gray-800">Need help?</p>
                    <p className="text-[11px] text-gray-400">
                      Chat with us or call{" "}
                      <span className="font-bold" style={{ color: BRAND }}>1800-000-1234</span>
                    </p>
                  </div>
                </div>

              </div>{/* end RIGHT */}
            </div>
          )}
        </div>
      </div>
    </>
  );
}