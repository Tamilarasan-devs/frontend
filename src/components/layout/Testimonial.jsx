import { useState, useEffect, useRef } from "react";
import { Star, ChevronLeft, ChevronRight, ShieldCheck, Users, Award, TrendingUp, ThumbsUp } from "lucide-react";

const testimonials = [
  {
    id: 1,
    name: "Amit Sharma",
    title: "Health Enthusiast",
    image: "https://media.gettyimages.com/id/1311655328/photo/im-the-best-asset-in-my-business.jpg?s=612x612&w=0&k=20&c=ebkVt_iY6rRjXvyx2CESPC8EtcWrv0nYt_y4IdKmN3M=",
    quote: "These products completely transformed my daily wellness routine. Pure, effective, and sustainably made — I feel more energetic and healthier every single day.",
    rating: 5,
    product: "Daily Wellness Kit",
    date: "March 2025",
    helpful: 42,
  },
  {
    id: 2,
    name: "Priya Verma",
    title: "Wellness Blogger",
    image: "https://media.istockphoto.com/id/1598828828/photo/portrait-of-successful-mature-boss-senior-businessman-in-business-suit-looking-at-camera-and.jpg?s=612x612&w=0&k=20&c=rDFntGhTIr4qIp4aasGq0fMgKszA23kAsWHmnJ7m1AU=",
    quote: "I love the natural herbal formulations — my skin has never looked better. An honest brand that genuinely stands behind everything it makes.",
    rating: 5,
    product: "Herbal Glow Serum",
    date: "February 2025",
    helpful: 38,
  },
  {
    id: 3,
    name: "Rahul Singh",
    title: "Certified Fitness Coach",
    image: "https://media.istockphoto.com/id/1398994132/photo/happy-businesswoman-using-a-digital-tablet-young-leading-businesswoman-using-a-wireless.jpg?s=612x612&w=0&k=20&c=BM3E3osJBZSukhs98G6vn7HXe8QQTExGaymi2a61T3E=",
    quote: "As a coach I'm extremely selective about recommendations. This brand consistently delivers on quality and transparency. My clients absolutely love the results.",
    rating: 5,
    product: "Performance Nutrition Pack",
    date: "January 2025",
    helpful: 57,
  },
  {
    id: 4,
    name: "Sneha Patel",
    title: "Registered Nutritionist",
    image: "https://media.gettyimages.com/id/1311655328/photo/im-the-best-asset-in-my-business.jpg?s=612x612&w=0&k=20&c=ebkVt_iY6rRjXvyx2CESPC8EtcWrv0nYt_y4IdKmN3M=",
    quote: "Finally a wellness brand I can confidently recommend to clients. No hidden ingredients, clean labels, pure formulations — it's exactly what we ask for.",
    rating: 5,
    product: "Clean Nutrition Bundle",
    date: "April 2025",
    helpful: 61,
  },
];

const stats = [
  { icon: Users,     value: "10K+", label: "Happy Customers",   bg: "bg-orange-50",  icon_color: "text-orange-500" },
  { icon: TrendingUp,value: "4.8★", label: "Average Rating",    bg: "bg-amber-50",   icon_color: "text-amber-500"  },
  { icon: ShieldCheck,value:"100%", label: "Verified Reviews",  bg: "bg-emerald-50", icon_color: "text-emerald-500"},
  { icon: Award,     value: "50+",  label: "Awards Won",        bg: "bg-blue-50",    icon_color: "text-blue-500"   },
];

const ratingRows = [
  { stars: 5, pct: 82 },
  { stars: 4, pct: 12 },
  { stars: 3, pct: 4  },
  { stars: 2, pct: 1  },
  { stars: 1, pct: 1  },
];

const trustItems = [
  { emoji: "🌿", text: "100% Natural" },
  { emoji: "🧪", text: "Lab Certified" },
  { emoji: "♻️", text: "Eco Sourced"  },
  { emoji: "🚫", text: "No Additives"  },
];

function Stars({ rating, size = "w-3.5 h-3.5" }) {
  return (
    <div className="flex items-center gap-0.5">
      {Array.from({ length: 5 }).map((_, i) => (
        <Star
          key={i}
          className={`${size} ${i < rating ? "fill-amber-400 stroke-amber-400" : "fill-gray-200 stroke-gray-200"}`}
        />
      ))}
    </div>
  );
}

export default function Testimonial() {
  const [current, setCurrent]   = useState(0);
  const [visible, setVisible]   = useState(true);
  const [animating, setAnimating] = useState(false);
  const timerRef = useRef(null);

  const go = (dir) => {
    if (animating) return;
    clearInterval(timerRef.current);
    setAnimating(true);
    setVisible(false);
    setTimeout(() => {
      setCurrent((c) =>
        dir === "next"
          ? (c + 1) % testimonials.length
          : (c - 1 + testimonials.length) % testimonials.length
      );
      setVisible(true);
      setAnimating(false);
      startAuto();
    }, 280);
  };

  const startAuto = () => {
    clearInterval(timerRef.current);
    timerRef.current = setInterval(() => go("next"), 5000);
  };

  useEffect(() => { startAuto(); return () => clearInterval(timerRef.current); }, []);

  const t = testimonials[current];

  return (
    <div className="min-h-screen bg-orange-50/40 flex items-center justify-center p-5 md:p-10">

      <style>{`
        .card-anim { transition: opacity 0.28s ease, transform 0.28s ease; }
        .card-visible  { opacity: 1; transform: translateY(0)    scale(1); }
        .card-hidden   { opacity: 0; transform: translateY(10px) scale(0.99); }
        .reviewer-item { transition: all 0.18s ease; }
        .reviewer-item:hover { background: #fff7f3; }
        .stat-tile { transition: all 0.2s ease; }
        .stat-tile:hover { transform: translateY(-3px); box-shadow: 0 8px 24px rgba(234,88,12,0.12); }
        .nav-btn { transition: all 0.2s ease; }
        .nav-btn:hover { background: #ea580c !important; border-color: #ea580c !important; color: white !important; }
        .helpful-btn { transition: all 0.18s ease; }
        .helpful-btn:hover { background: #fff1eb !important; border-color: #f97316 !important; color: #c2410c !important; }
        .dot-btn { transition: all 0.35s cubic-bezier(0.22, 0.68, 0, 1.2); }
        .progress-bar { transition: width 0.45s cubic-bezier(0.4,0,0.2,1); }
      `}</style>

      <div className="w-full max-w-6xl mx-auto">

        {/* ── HEADER ── */}
        <div className="mb-8">
          <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-4 mb-6">
            <div>
              {/* Badge */}
              <div className="inline-flex items-center gap-2 bg-white border border-orange-100 rounded-full px-4 py-1.5 mb-4 shadow-sm">
                <span className="w-5 h-5 rounded-full bg-gradient-to-br from-orange-500 to-red-700 flex items-center justify-center flex-shrink-0">
                  <Star className="w-2.5 h-2.5 fill-white stroke-white" />
                </span>
                <span className="text-xs font-semibold text-orange-700 tracking-wide">Customer Reviews</span>
              </div>
              <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold text-stone-900 leading-tight">
                Loved by <span className="italic text-orange-600">10,000+</span><br />
                Aayubakwath Champions
              </h2>
            </div>
            <div className="md:text-right max-w-xs">
              <p className="text-sm text-stone-500 leading-relaxed">
                Every review is 100% genuine — no edits, no incentives. Real results from real people.
              </p>
              
            </div>
          </div>
          {/* Divider */}
          <div className="h-px w-full rounded-full" style={{ background: 'linear-gradient(90deg, #f9731622, #f9731688, #b91c1c44, transparent)' }} />
        </div>

        {/* ── STATS ROW ── */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mb-6">
          {stats.map((s) => (
            <div key={s.label} className={`stat-tile bg-white rounded-2xl border border-orange-100 p-4 shadow-sm`}>
              <div className="flex items-center gap-3 mb-2">
                <div className={`w-9 h-9 rounded-xl ${s.bg} flex items-center justify-center flex-shrink-0`}>
                  <s.icon className={`w-4 h-4 ${s.icon_color}`} />
                </div>
                <span className=" text-2xl font-bold text-stone-900">{s.value}</span>
              </div>
              <p className="text-xs text-stone-400 font-medium">{s.label}</p>
            </div>
          ))}
        </div>

        {/* ── MAIN GRID ── */}
        <div className="grid grid-cols-1 lg:grid-cols-[280px_1fr] gap-5">

          {/* ── LEFT COLUMN ── */}
          <div className="flex flex-col gap-4">

            {/* Reviewer List */}
            <div className="bg-white rounded-2xl border border-orange-100 shadow-sm p-4">
              <p className="text-xs font-bold text-orange-400 uppercase tracking-widest mb-3 px-1">All Reviewers</p>
              <div className="flex flex-col gap-1">
                {testimonials.map((r, i) => (
                  <button
                    key={r.id}
                    onClick={() => { if (!animating && i !== current) go(i > current ? "next" : "prev"); }}
                    className={`reviewer-item w-full flex items-center gap-3 p-2.5 rounded-xl text-left border
                      ${i === current
                        ? "bg-orange-50 border-orange-200 shadow-sm"
                        : "border-transparent bg-transparent"
                      }`}
                  >
                    <div className={`rounded-full p-0.5 flex-shrink-0 ${i === current ? "bg-gradient-to-br from-orange-400 to-red-700" : "bg-transparent"}`}>
                      <img src={r.image} alt={r.name} className="w-9 h-9 rounded-full object-cover block" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className={`text-sm font-700 truncate ${i === current ? "text-orange-700 font-bold" : "text-stone-700 font-semibold"}`}>
                        {r.name}
                      </p>
                      <p className="text-xs text-stone-400 truncate">{r.title}</p>
                    </div>
                    <Stars rating={r.rating} size="w-2.5 h-2.5" />
                  </button>
                ))}
              </div>
            </div>

            {/* Rating Breakdown */}
            <div className="bg-white rounded-2xl border border-orange-100 shadow-sm p-5">
              <p className="text-xs font-bold text-orange-400 uppercase tracking-widest mb-4">Rating Breakdown</p>
              <div className="flex items-start gap-4 mb-4">
                <div className="text-center flex-shrink-0">
                  <p className=" text-5xl font-bold text-stone-900 leading-none">4.8</p>
                  <Stars rating={5} size="w-3 h-3" />
                  <p className="text-xs text-stone-400 mt-1">out of 5</p>
                </div>
                <div className="flex-1 flex flex-col gap-2">
                  {ratingRows.map((row) => (
                    <div key={row.stars} className="flex items-center gap-2">
                      <span className="text-xs text-stone-400 w-3 text-right">{row.stars}</span>
                      <Star className="w-2.5 h-2.5 fill-amber-400 stroke-amber-400 flex-shrink-0" />
                      <div className="flex-1 h-1.5 bg-orange-100 rounded-full overflow-hidden">
                        <div
                          className="h-full rounded-full bg-gradient-to-r from-orange-400 to-red-600"
                          style={{ width: `${row.pct}%` }}
                        />
                      </div>
                      <span className="text-xs text-stone-400 w-7 text-right">{row.pct}%</span>
                    </div>
                  ))}
                </div>
              </div>
              <div className="flex items-center gap-2 bg-emerald-50 rounded-xl px-3 py-2">
                <ShieldCheck className="w-3.5 h-3.5 text-emerald-500 flex-shrink-0" />
                <span className="text-xs text-emerald-700 font-medium">Verified purchasers only</span>
              </div>
            </div>
          </div>

          {/* ── RIGHT COLUMN ── */}
          <div className="flex flex-col gap-4">

            {/* Main Quote Card */}
            <div className={`card-anim bg-white rounded-2xl border border-orange-100 shadow-md overflow-hidden flex-1 ${visible ? "card-visible" : "card-hidden"}`}>

              {/* Card Top Bar */}
              <div className="bg-gradient-to-r from-orange-50 to-red-50/40 border-b border-orange-100 px-6 py-4 flex items-center justify-between gap-4 flex-wrap">
                <div className="flex items-center gap-2 bg-white border border-orange-100 rounded-full px-3 py-1.5 shadow-sm">
                  <span className="w-1.5 h-1.5 rounded-full bg-orange-500 flex-shrink-0" />
                  <span className="text-xs font-semibold text-orange-700">{t.product}</span>
                </div>
                <div className="flex items-center gap-3 flex-wrap">
                  <span className="text-xs text-stone-400">{t.date}</span>
                  <div className="flex items-center gap-1.5">
                    <ShieldCheck className="w-3.5 h-3.5 text-emerald-500" />
                    <span className="text-xs font-semibold text-emerald-600 uppercase tracking-wider">Verified Purchase</span>
                  </div>
                </div>
              </div>

              {/* Quote Body */}
              <div className="px-7 pt-8 pb-6 relative">
                {/* Decorative quote mark */}
                <span className="absolute top-3 left-5 text-8xl font-bold text-orange-100 leading-none select-none pointer-events-none">
                  "
                </span>
                <div className="relative z-10">
                  <Stars rating={t.rating} size="w-4 h-4" />
                  <p className="text-xl md:text-2xl text-stone-800 leading-relaxed mt-4 font-semibold">
                    {t.quote}
                  </p>
                </div>
              </div>

              {/* Card Footer */}
              <div className="border-t border-orange-100 px-7 py-5 flex items-center justify-between gap-4 flex-wrap">
                <div className="flex items-center gap-3">
                  <div className="p-0.5 rounded-full bg-gradient-to-br from-orange-400 to-red-700 flex-shrink-0">
                    <img src={t.image} alt={t.name} className="w-12 h-12 rounded-full object-cover block" />
                  </div>
                  <div>
                    <p className="text-sm font-bold text-stone-900">{t.name}</p>
                    <p className="text-xs text-stone-400 font-medium mt-0.5">{t.title}</p>
                  </div>
                </div>
                <button className="helpful-btn flex items-center gap-2 bg-orange-50 border border-orange-200 rounded-full px-4 py-2 text-xs font-semibold text-orange-700 cursor-pointer">
                  <ThumbsUp className="w-3.5 h-3.5" />
                  Helpful ({t.helpful})
                </button>
              </div>
            </div>

            {/* Navigation Controls */}
            <div className="flex items-center justify-between px-1">
              {/* Animated dots */}
              <div className="flex items-center gap-2">
                {testimonials.map((_, i) => (
                  <button
                    key={i}
                    onClick={() => !animating && go(i > current ? "next" : "prev")}
                    className="dot-btn h-2 rounded-full border-none cursor-pointer p-0"
                    style={{
                      width: i === current ? 28 : 8,
                      background: i === current
                        ? "linear-gradient(90deg, #f97316, #b91c1c)"
                        : "#fed7aa",
                      boxShadow: i === current ? "0 2px 8px rgba(234,88,12,0.4)" : "none",
                    }}
                  />
                ))}
              </div>

              {/* Counter */}
              <span className="text-xs font-bold text-stone-400 tracking-widest">
                {String(current + 1).padStart(2, "0")} / {String(testimonials.length).padStart(2, "0")}
              </span>

              {/* Arrow buttons */}
              <div className="flex gap-2">
                <button
                  onClick={() => go("prev")}
                  className="nav-btn w-10 h-10 rounded-full bg-white border border-orange-200 flex items-center justify-center text-stone-500 shadow-sm cursor-pointer"
                >
                  <ChevronLeft className="w-4 h-4" />
                </button>
                <button
                  onClick={() => go("next")}
                  className="nav-btn w-10 h-10 rounded-full bg-white border border-orange-200 flex items-center justify-center text-stone-500 shadow-sm cursor-pointer"
                >
                  <ChevronRight className="w-4 h-4" />
                </button>
              </div>
            </div>

            {/* Progress bar */}
            <div className="h-1 bg-orange-100 rounded-full overflow-hidden">
              <div
                className="progress-bar h-full rounded-full bg-gradient-to-r from-orange-400 to-red-700"
                style={{ width: `${((current + 1) / testimonials.length) * 100}%` }}
              />
            </div>

            {/* Trust Strip */}
            <div className="bg-white rounded-2xl border border-orange-100 shadow-sm px-6 py-4 flex items-center justify-between gap-3 flex-wrap">
              {trustItems.map((item) => (
                <div key={item.text} className="flex items-center gap-2">
                  <span className="text-lg leading-none">{item.emoji}</span>
                  <span className="text-xs font-semibold text-stone-600">{item.text}</span>
                </div>
              ))}
            </div>

          </div>
        </div>
      </div>
    </div>
  );
}