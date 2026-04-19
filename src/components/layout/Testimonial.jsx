import { useState, useEffect, useRef } from "react";
import { Star, ChevronLeft, ChevronRight, ShieldCheck, Users, Award, TrendingUp, ThumbsUp } from "lucide-react";

const testimonials = [
  {
    id: 1,
    name: "Amit Sharma",
    title: "Health Enthusiast",
    image: "https://media.gettyimages.com/id/1311655328/photo/im-the-best-asset-in-my-business.jpg?s=612x612&w=0&k=20&c=ebkVt_iY6rRjXvyx2CESPC8EtcWrv0nYt_y4IdKmN3M=",
    quote: "I’ve been using this supplement for a month now and noticed better control in my sugar levels.It really supports my daily routine along with proper diet.Feeling more stable and energetic throughout the day.",
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
    quote: "I was struggling with fatigue, but Aayubakwad really helped me.It gives a natural boost without any side effects.Very satisfied with the results.",
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
    quote: "I often felt mentally tired and distracted during the day.After using this brain tonic, my focus and alertness improved noticeably.Now I feel more sharp, productive, and confident in my work.",
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
    quote: "This product really helped me stay consistent with my health routine.I feel lighter, and my overall heart health has improved.Very satisfied with the results so far.",
    rating: 5,
    product: "Clean Nutrition Bundle",
    date: "April 2025",
    helpful: 61,
  },
];

const stats = [
  { icon: Users,       value: "10K+", label: "Happy Customers",  bg: "bg-blue-50",   icon_color: "text-blue-600"  },
  { icon: TrendingUp,  value: "4.8★", label: "Average Rating",   bg: "bg-indigo-50", icon_color: "text-indigo-500"},
  { icon: ShieldCheck, value: "100%", label: "Verified Reviews", bg: "bg-sky-50",    icon_color: "text-sky-500"   },
  { icon: Award,       value: "50+",  label: "Awards Won",       bg: "bg-blue-50",   icon_color: "text-blue-700"  },
];

const ratingRows = [
  { stars: 5, pct: 82 },
  { stars: 4, pct: 12 },
  { stars: 3, pct: 4  },
  { stars: 2, pct: 1  },
  { stars: 1, pct: 1  },
];

const trustItems = [
  { emoji: "🌿", text: "100% Natural"  },
  { emoji: "🧪", text: "Lab Certified" },
  { emoji: "♻️", text: "Eco Sourced"   },
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
  const [current, setCurrent]     = useState(0);
  const [visible, setVisible]     = useState(true);
  const [animating, setAnimating] = useState(false);
  const timerRef = useRef(null);

  const sectionRef      = useRef(null);
  const [headerVis,  setHeaderVis]  = useState(false);
  const [statsVis,   setStatsVis]   = useState(false);
  const [leftVis,    setLeftVis]    = useState(false);
  const [rightVis,   setRightVis]   = useState(false);
  const [trustVis,   setTrustVis]   = useState(false);
  const [ratingBars, setRatingBars] = useState(false);

  useEffect(() => {
    const obs = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setHeaderVis(true);
          setTimeout(() => setStatsVis(true),   200);
          setTimeout(() => setLeftVis(true),    400);
          setTimeout(() => setRightVis(true),   550);
          setTimeout(() => setTrustVis(true),   700);
          setTimeout(() => setRatingBars(true), 800);
          obs.disconnect();
        }
      },
      { threshold: 0.08 }
    );
    if (sectionRef.current) obs.observe(sectionRef.current);
    return () => obs.disconnect();
  }, []);

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
    <div
      ref={sectionRef}
      className="min-h-screen flex items-center justify-center"
      style={{
        background: "linear-gradient(160deg, #f0f5ff 0%, #e8eeff 60%, #dce8ff 100%)",
        padding: "clamp(1.5rem, 5vw, 3.5rem) clamp(1rem, 4vw, 2.5rem)",
      }}
    >
      <style>{`
        .card-anim { transition: opacity 0.28s ease, transform 0.28s ease; }
        .card-visible { opacity: 1; transform: translateY(0) scale(1); }
        .card-hidden  { opacity: 0; transform: translateY(10px) scale(0.99); }
        .reviewer-item { transition: all 0.18s ease; }
        .reviewer-item:hover { background: #eef3ff; }
        .stat-tile { transition: all 0.2s ease; }
        .stat-tile:hover { transform: translateY(-3px); box-shadow: 0 8px 24px rgba(3,52,154,0.13); }
        .nav-btn { transition: all 0.2s ease; }
        .nav-btn:hover { background: #03349a !important; border-color: #03349a !important; color: white !important; }
        .helpful-btn { transition: all 0.18s ease; }
        .helpful-btn:hover { background: #dce8ff !important; border-color: #03349a !important; color: #03349a !important; }
        .dot-btn { transition: all 0.35s cubic-bezier(0.22, 0.68, 0, 1.2); }
        .progress-bar { transition: width 0.45s cubic-bezier(0.4,0,0.2,1); }
      `}</style>

      <div className="w-full" style={{ maxWidth: 1200 }}>

        {/* ── HEADER ── */}
        <div
          className="mb-8"
          style={{
            opacity: headerVis ? 1 : 0,
            transform: headerVis ? "translateY(0)" : "translateY(-28px)",
            transition: "opacity 0.65s ease, transform 0.65s ease",
          }}
        >
          <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-4 mb-6">
            <div>
              {/* Badge */}
              <div
                className="inline-flex items-center gap-2 rounded-full px-4 py-1.5 mb-4 shadow-sm"
                style={{ background: "#fff", border: "1px solid #c7d8f8" }}
              >
                <span
                  className="w-5 h-5 rounded-full flex items-center justify-center flex-shrink-0"
                  style={{ background: "linear-gradient(135deg, #6095ff, #03349a)" }}
                >
                  <Star className="w-2.5 h-2.5 fill-white stroke-white" />
                </span>
                <span className="text-xs font-semibold tracking-wide" style={{ color: "#03349a" }}>
                  Customer Reviews
                </span>
              </div>

              <h2
                className="font-bold leading-tight"
                style={{
                  fontSize: "clamp(1.7rem, 5vw, 3.5rem)",
                  lineHeight: 1.15,
                }}
              >
                <span className="text-black">Loved</span>{" "}
                <span className="text-[#03349a]">by</span>{" "}
                <span className="italic text-[#c9643a]">10,000+</span>
                <br />
                <span className="text-[#03349a]">Aayubakwath Champions</span>
              </h2>
            </div>

            <div className="md:text-right" style={{ maxWidth: 280 }}>
              <p className="text-sm leading-relaxed" style={{ color: "#4a6fa5" }}>
                Every review is 100% genuine — no edits, no incentives. Real results from real people.
              </p>
            </div>
          </div>

          {/* Divider */}
          <div
            className="h-1 w-full rounded-full"
            style={{ background: "linear-gradient(90deg, #03349a, #c9643a, transparent)" }}
          />
        </div>

        {/* ── STATS ROW ── */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mb-6">
          {stats.map((s, i) => (
            <div
              key={s.label}
              className="stat-tile rounded-2xl p-4 shadow-sm"
              style={{
                background: "#fff",
                border: "1px solid #c7d8f8",
                opacity: statsVis ? 1 : 0,
                transform: statsVis ? "translateY(0) scale(1)" : "translateY(24px) scale(0.96)",
                transition: `opacity 0.5s ease ${i * 0.1}s, transform 0.5s cubic-bezier(.22,.68,0,1.15) ${i * 0.1}s`,
              }}
            >
              <div className="flex items-center gap-3 mb-2">
                <div className={`w-9 h-9 rounded-xl ${s.bg} flex items-center justify-center flex-shrink-0`}>
                  <s.icon className={`w-4 h-4 ${s.icon_color}`} />
                </div>
                <span className="text-2xl font-bold" style={{ color: "#03349a" }}>{s.value}</span>
              </div>
              <p className="text-xs font-medium" style={{ color: "#7a9cc8" }}>{s.label}</p>
            </div>
          ))}
        </div>

        {/* ── MAIN GRID ── */}
        <div className="grid grid-cols-1 lg:grid-cols-[280px_1fr] gap-5">

          {/* ── LEFT COLUMN ── */}
          <div
            className="flex flex-col gap-4"
            style={{
              opacity: leftVis ? 1 : 0,
              transform: leftVis ? "translateX(0)" : "translateX(-32px)",
              transition: "opacity 0.6s ease, transform 0.6s cubic-bezier(.22,.68,0,1.15)",
            }}
          >
            {/* Reviewer List */}
            <div
              className="rounded-2xl p-4 shadow-sm"
              style={{ background: "#fff", border: "1px solid #c7d8f8" }}
            >
              <p
                className="text-xs font-bold uppercase tracking-widest mb-3 px-1"
                style={{ color: "#6095ff" }}
              >
                All Reviewers
              </p>
              <div className="flex flex-col gap-1">
                {testimonials.map((r, i) => (
                  <button
                    key={r.id}
                    onClick={() => { if (!animating && i !== current) go(i > current ? "next" : "prev"); }}
                    className="reviewer-item w-full flex items-center gap-3 p-2.5 rounded-xl text-left"
                    style={{
                      border: i === current ? "1px solid #b3caee" : "1px solid transparent",
                      background: i === current ? "#eef3ff" : "transparent",
                    }}
                  >
                    <div
                      className="rounded-full p-0.5 flex-shrink-0"
                      style={{
                        background: i === current
                          ? "linear-gradient(135deg, #6095ff, #03349a)"
                          : "transparent",
                      }}
                    >
                      <img src={r.image} alt={r.name} className="w-9 h-9 rounded-full object-cover block" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <p
                        className="text-sm truncate"
                        style={{
                          color: i === current ? "#03349a" : "#374151",
                          fontWeight: i === current ? 700 : 600,
                        }}
                      >
                        {r.name}
                      </p>
                      <p className="text-xs truncate" style={{ color: "#7a9cc8" }}>{r.title}</p>
                    </div>
                    <Stars rating={r.rating} size="w-2.5 h-2.5" />
                  </button>
                ))}
              </div>
            </div>

            {/* Rating Breakdown */}
            <div
              className="rounded-2xl p-5 shadow-sm"
              style={{ background: "#fff", border: "1px solid #c7d8f8" }}
            >
              <p
                className="text-xs font-bold uppercase tracking-widest mb-4"
                style={{ color: "#6095ff" }}
              >
                Rating Breakdown
              </p>
              <div className="flex items-start gap-4 mb-4">
                <div className="text-center flex-shrink-0">
                  <p className="text-5xl font-bold leading-none" style={{ color: "#03349a" }}>4.8</p>
                  <Stars rating={5} size="w-3 h-3" />
                  <p className="text-xs mt-1" style={{ color: "#7a9cc8" }}>out of 5</p>
                </div>
                <div className="flex-1 flex flex-col gap-2">
                  {ratingRows.map((row, i) => (
                    <div key={row.stars} className="flex items-center gap-2">
                      <span className="text-xs w-3 text-right" style={{ color: "#7a9cc8" }}>{row.stars}</span>
                      <Star className="w-2.5 h-2.5 fill-amber-400 stroke-amber-400 flex-shrink-0" />
                      <div
                        className="flex-1 h-1.5 rounded-full overflow-hidden"
                        style={{ background: "#dce8ff" }}
                      >
                        <div
                          className="h-full rounded-full progress-bar"
                          style={{
                            background: "linear-gradient(90deg, #6095ff, #03349a)",
                            width: ratingBars ? `${row.pct}%` : "0%",
                            transition: `width 0.7s cubic-bezier(.4,0,.2,1) ${i * 0.1}s`,
                          }}
                        />
                      </div>
                      <span className="text-xs w-7 text-right" style={{ color: "#7a9cc8" }}>{row.pct}%</span>
                    </div>
                  ))}
                </div>
              </div>
              <div
                className="flex items-center gap-2 rounded-xl px-3 py-2"
                style={{ background: "#eef8f3" }}
              >
                <ShieldCheck className="w-3.5 h-3.5 text-emerald-500 flex-shrink-0" />
                <span className="text-xs font-medium text-emerald-700">Verified purchasers only</span>
              </div>
            </div>
          </div>

          {/* ── RIGHT COLUMN ── */}
          <div
            className="flex flex-col gap-4"
            style={{
              opacity: rightVis ? 1 : 0,
              transform: rightVis ? "translateX(0)" : "translateX(32px)",
              transition: "opacity 0.6s ease, transform 0.6s cubic-bezier(.22,.68,0,1.15)",
            }}
          >
            {/* Main Quote Card */}
            <div
              className={`card-anim rounded-2xl overflow-hidden flex-1 shadow-md ${visible ? "card-visible" : "card-hidden"}`}
              style={{ background: "#fff", border: "1px solid #c7d8f8" }}
            >
              {/* Card Top Bar */}
              <div
                className="border-b px-6 py-4 flex items-center justify-between gap-4 flex-wrap"
                style={{
                  background: "linear-gradient(90deg, #eef3ff, #f5f8ff)",
                  borderColor: "#c7d8f8",
                }}
              >
                <div
                  className="flex items-center gap-2 rounded-full px-3 py-1.5 shadow-sm"
                  style={{ background: "#fff", border: "1px solid #c7d8f8" }}
                >
                  <span
                    className="w-1.5 h-1.5 rounded-full flex-shrink-0"
                    style={{ background: "#03349a" }}
                  />
                  <span className="text-xs font-semibold" style={{ color: "#03349a" }}>{t.product}</span>
                </div>
                <div className="flex items-center gap-3 flex-wrap">
                  <span className="text-xs" style={{ color: "#7a9cc8" }}>{t.date}</span>
                  <div className="flex items-center gap-1.5">
                    <ShieldCheck className="w-3.5 h-3.5 text-emerald-500" />
                    <span className="text-xs font-semibold uppercase tracking-wider text-emerald-600">
                      Verified Purchase
                    </span>
                  </div>
                </div>
              </div>

              {/* Quote Body */}
              <div className="px-7 pt-8 pb-6 relative">
                <span
                  className="absolute top-3 left-5 text-8xl font-bold leading-none select-none pointer-events-none"
                  style={{ color: "#dce8ff" }}
                >
                  "
                </span>
                <div className="relative z-10">
                  <Stars rating={t.rating} size="w-4 h-4" />
                  <p
                    className="leading-relaxed mt-4 font-semibold"
                    style={{
                      color: "#1e3a6e",
                      fontSize: "clamp(1rem, 2.5vw, 1.35rem)",
                    }}
                  >
                    {t.quote}
                  </p>
                </div>
              </div>

              {/* Card Footer */}
              <div
                className="border-t px-7 py-5 flex items-center justify-between gap-4 flex-wrap"
                style={{ borderColor: "#c7d8f8" }}
              >
                <div className="flex items-center gap-3">
                  <div
                    className="p-0.5 rounded-full flex-shrink-0"
                    style={{ background: "linear-gradient(135deg, #6095ff, #03349a)" }}
                  >
                    <img src={t.image} alt={t.name} className="w-12 h-12 rounded-full object-cover block" />
                  </div>
                  <div>
                    <p className="text-sm font-bold" style={{ color: "#03349a" }}>{t.name}</p>
                    <p className="text-xs font-medium mt-0.5" style={{ color: "#7a9cc8" }}>{t.title}</p>
                  </div>
                </div>
                <button
                  className="helpful-btn flex items-center gap-2 rounded-full px-4 py-2 text-xs font-semibold cursor-pointer"
                  style={{
                    background: "#eef3ff",
                    border: "1px solid #b3caee",
                    color: "#03349a",
                  }}
                >
                  <ThumbsUp className="w-3.5 h-3.5" />
                  Helpful ({t.helpful})
                </button>
              </div>
            </div>

            {/* Navigation Controls */}
            <div className="flex items-center justify-between px-1">
              {/* Dots */}
              <div className="flex items-center gap-2">
                {testimonials.map((_, i) => (
                  <button
                    key={i}
                    onClick={() => !animating && go(i > current ? "next" : "prev")}
                    className="dot-btn h-2 rounded-full border-none cursor-pointer p-0"
                    style={{
                      width: i === current ? 28 : 8,
                      background: i === current
                        ? "linear-gradient(90deg, #6095ff, #03349a)"
                        : "#b3caee",
                      boxShadow: i === current ? "0 2px 8px rgba(3,52,154,0.35)" : "none",
                    }}
                  />
                ))}
              </div>

              {/* Counter */}
              <span className="text-xs font-bold tracking-widest" style={{ color: "#7a9cc8" }}>
                {String(current + 1).padStart(2, "0")} / {String(testimonials.length).padStart(2, "0")}
              </span>

              {/* Arrows */}
              <div className="flex gap-2">
                <button
                  onClick={() => go("prev")}
                  className="nav-btn w-10 h-10 rounded-full flex items-center justify-center shadow-sm cursor-pointer"
                  style={{ background: "#fff", border: "1px solid #b3caee", color: "#03349a" }}
                >
                  <ChevronLeft className="w-4 h-4" />
                </button>
                <button
                  onClick={() => go("next")}
                  className="nav-btn w-10 h-10 rounded-full flex items-center justify-center shadow-sm cursor-pointer"
                  style={{ background: "#fff", border: "1px solid #b3caee", color: "#03349a" }}
                >
                  <ChevronRight className="w-4 h-4" />
                </button>
              </div>
            </div>

            {/* Progress bar */}
            <div className="h-1 rounded-full overflow-hidden" style={{ background: "#dce8ff" }}>
              <div
                className="progress-bar h-full rounded-full"
                style={{
                  background: "linear-gradient(90deg, #6095ff, #03349a)",
                  width: `${((current + 1) / testimonials.length) * 100}%`,
                }}
              />
            </div>

            {/* Trust Strip */}
            <div
              className="rounded-2xl px-6 py-4 flex items-center justify-between gap-3 flex-wrap shadow-sm"
              style={{
                background: "#fff",
                border: "1px solid #c7d8f8",
                opacity: trustVis ? 1 : 0,
                transform: trustVis ? "translateY(0)" : "translateY(20px)",
                transition: "opacity 0.55s ease, transform 0.55s ease",
              }}
            >
              {trustItems.map((item, i) => (
                <div
                  key={item.text}
                  className="flex items-center gap-2"
                  style={{
                    opacity: trustVis ? 1 : 0,
                    transform: trustVis ? "translateY(0)" : "translateY(10px)",
                    transition: `opacity 0.4s ease ${0.1 + i * 0.08}s, transform 0.4s ease ${0.1 + i * 0.08}s`,
                  }}
                >
                  <span className="text-lg leading-none">{item.emoji}</span>
                  <span className="text-xs font-semibold" style={{ color: "#1e3a6e" }}>{item.text}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}