import { useState, useEffect, useRef } from "react";
import { Star, Quote, ChevronLeft, ChevronRight } from "lucide-react";

const testimonials = [
  {
    id: 1,
    name: "Amit Sharma",
    title: "Health Enthusiast",
    image: "https://media.gettyimages.com/id/1311655328/photo/im-the-best-asset-in-my-business.jpg?s=612x612&w=0&k=20&c=ebkVt_iY6rRjXvyx2CESPC8EtcWrv0nYt_y4IdKmN3M=",
    quote: "These products changed my daily routine! Pure, effective, and sustainable. I feel healthier and more energetic every single day.",
    rating: 5,
    tag: "Verified Buyer",
  },
  {
    id: 2,
    name: "Priya Verma",
    title: "Wellness Blogger",
    image: "https://media.istockphoto.com/id/1598828828/photo/portrait-of-successful-mature-boss-senior-businessman-in-business-suit-looking-at-camera-and.jpg?s=612x612&w=0&k=20&c=rDFntGhTIr4qIp4aasGq0fMgKszA23kAsWHmnJ7m1AU=",
    quote: "I love the natural ingredients and herbal formulations. My skin has never looked better. Truly an honest brand!",
    rating: 4,
    tag: "Verified Buyer",
  },
  {
    id: 3,
    name: "Rahul Singh",
    title: "Fitness Coach",
    image: "https://media.istockphoto.com/id/1398994132/photo/happy-businesswoman-using-a-digital-tablet-young-leading-businesswoman-using-a-wireless.jpg?s=612x612&w=0&k=20&c=BM3E3osJBZSukhs98G6vn7HXe8QQTExGaymi2a61T3E=",
    quote: "Excellent quality and authentic products. As a fitness coach I'm very selective — this brand truly delivers on its promises.",
    rating: 5,
    tag: "Verified Buyer",
  },
  {
    id: 4,
    name: "Sneha Patel",
    title: "Nutritionist",
    image: "https://media.gettyimages.com/id/1311655328/photo/im-the-best-asset-in-my-business.jpg?s=612x612&w=0&k=20&c=ebkVt_iY6rRjXvyx2CESPC8EtcWrv0nYt_y4IdKmN3M=",
    quote: "Finally a wellness brand I can recommend to my clients with complete confidence. No hidden ingredients, just pure goodness.",
    rating: 5,
    tag: "Verified Buyer",
  },
];

const BRAND = "#820c0c";
const ACCENT = "#c9643a";

const StarRow = ({ rating, size = 16 }) => (
  <div style={{ display: "flex", gap: 3 }}>
    {Array.from({ length: 5 }).map((_, i) => (
      <Star
        key={i}
        size={size}
        style={{
          fill: i < rating ? "#f59e0b" : "none",
          stroke: i < rating ? "#f59e0b" : "#d1d5db",
        }}
      />
    ))}
  </div>
);

export default function Testimonial() {
  const [current, setCurrent] = useState(0);
  const [animating, setAnimating] = useState(false);
  const [direction, setDirection] = useState("next");
  const [displayed, setDisplayed] = useState(0);
  const autoRef = useRef(null);

  const go = (dir) => {
    if (animating) return;
    setDirection(dir);
    setAnimating(true);
    setTimeout(() => {
      setCurrent((prev) =>
        dir === "next"
          ? (prev + 1) % testimonials.length
          : (prev - 1 + testimonials.length) % testimonials.length
      );
      setAnimating(false);
    }, 320);
  };

  // Keep displayed in sync after transition
  useEffect(() => {
    if (!animating) setDisplayed(current);
  }, [animating, current]);

  // Auto-advance
  useEffect(() => {
    autoRef.current = setInterval(() => go("next"), 4500);
    return () => clearInterval(autoRef.current);
  }, [current, animating]);

  const t = testimonials[displayed];

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Libre+Baskerville:ital,wght@0,400;0,700;1,400&family=Nunito:wght@400;500;600;700;800&display=swap');

        .testi-root {
          font-family: 'Nunito', sans-serif;
          background: #fff;
          padding: 80px 40px;
          position: relative;
          overflow: hidden;
        }

        /* Background accent shape */
        .testi-root::before {
          content: '';
          position: absolute;
          top: -60px; right: -80px;
          width: 420px; height: 420px;
          border-radius: 50%;
          background: radial-gradient(circle, rgba(201,100,58,0.07) 0%, transparent 70%);
          pointer-events: none;
        }
        .testi-root::after {
          content: '';
          position: absolute;
          bottom: -80px; left: -60px;
          width: 320px; height: 320px;
          border-radius: 50%;
          background: radial-gradient(circle, rgba(130,12,12,0.05) 0%, transparent 70%);
          pointer-events: none;
        }

        .testi-layout {
          max-width: 1100px;
          margin: 0 auto;
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 72px;
          align-items: center;
          position: relative;
          z-index: 2;
        }

        /* ── Left panel ── */
        .testi-left { display: flex; flex-direction: column; }
        .testi-eyebrow {
          font-size: 11px; font-weight: 800; letter-spacing: .22em;
          text-transform: uppercase; color: ${ACCENT};
          display: flex; align-items: center; gap: 10px; margin-bottom: 14px;
        }
        .testi-eyebrow::before {
          content: ''; width: 28px; height: 2px;
          background: ${ACCENT}; border-radius: 99px; flex-shrink: 0;
        }
        .testi-h2 {
          font-family: 'Libre Baskerville', serif;
          font-size: 38px; font-weight: 700; color: #111827;
          line-height: 1.15; margin: 0 0 20px;
        }
        .testi-h2 span { color: ${BRAND}; }
        .testi-sub-line {
          width: 48px; height: 3px; border-radius: 99px; margin-bottom: 22px;
          background: linear-gradient(to right, ${BRAND}, ${ACCENT});
        }
        .testi-desc {
          font-size: 15px; color: #4b5563; line-height: 1.75;
          margin: 0 0 28px; max-width: 400px;
        }
        .testi-hashtag {
          display: inline-block;
          font-size: 13.5px; font-weight: 800; color: ${BRAND};
          background: rgba(130,12,12,.06); padding: 6px 14px;
          border-radius: 99px; border: 1px solid rgba(130,12,12,.12);
          margin-bottom: 36px; width: fit-content;
        }

        /* Stats */
        .testi-stats {
          display: flex; gap: 28px;
        }
        .testi-stat-box {
          padding: 14px 20px;
          border: 1.5px solid #f0ece8; border-radius: 14px; background: #fdfaf8;
          text-align: center; min-width: 80px;
          transition: border-color .25s, box-shadow .25s;
        }
        .testi-stat-box:hover {
          border-color: ${ACCENT}55;
          box-shadow: 0 4px 16px rgba(201,100,58,.12);
        }
        .testi-stat-num {
          font-family: 'Libre Baskerville', serif;
          font-size: 24px; font-weight: 700; color: ${BRAND};
          line-height: 1;
        }
        .testi-stat-label { font-size: 11px; color: #9ca3af; margin-top: 4px; font-weight: 600; }

        /* ── Right panel — slide card ── */
        .testi-right { position: relative; }

        .testi-card-wrap {
          position: relative;
          perspective: 800px;
        }

        .testi-card {
          background: #fff;
          border: 1.5px solid #f0ece8;
          border-radius: 24px;
          padding: 36px 32px 32px;
          box-shadow: 0 8px 32px rgba(0,0,0,.07), 0 2px 8px rgba(0,0,0,.04);
          position: relative;
          transition: opacity .32s ease, transform .32s ease;
        }
        .testi-card.slide-out-next  { opacity: 0; transform: translateX(-40px) scale(.97); }
        .testi-card.slide-out-prev  { opacity: 0; transform: translateX(40px)  scale(.97); }
        .testi-card.slide-in        { opacity: 1; transform: translateX(0)       scale(1); }

        /* Big quote mark */
        .testi-quote-icon {
          position: absolute; top: -18px; left: 28px;
          width: 44px; height: 44px; border-radius: 50%;
          background: linear-gradient(135deg, ${BRAND}, ${ACCENT});
          display: flex; align-items: center; justify-content: center;
          box-shadow: 0 4px 14px rgba(130,12,12,.3);
        }

        .testi-tag {
          display: inline-flex; align-items: center; gap: 5px;
          font-size: 10.5px; font-weight: 700; text-transform: uppercase; letter-spacing: .08em;
          color: #059669; background: #ecfdf5;
          border: 1px solid #a7f3d0; padding: 3px 10px; border-radius: 99px;
          margin-bottom: 18px;
        }
        .testi-tag::before { content: '✓'; font-size: 10px; }

        .testi-quote-text {
          font-family: 'Libre Baskerville', serif;
          font-size: 16px; color: #1f2937; line-height: 1.75;
          font-style: italic; margin: 0 0 24px;
        }

        .testi-divider { height: 1px; background: #f3f4f6; margin-bottom: 22px; }

        .testi-user { display: flex; align-items: center; gap: 14px; }
        .testi-avatar {
          width: 52px; height: 52px; border-radius: 50%; object-fit: cover; flex-shrink: 0;
          border: 2.5px solid #fff;
          box-shadow: 0 0 0 2px ${ACCENT}55;
        }
        .testi-user-name { font-weight: 800; font-size: 15px; color: #111827; margin-bottom: 2px; }
        .testi-user-title { font-size: 12px; color: #9ca3af; font-weight: 500; }
        .testi-stars { margin-left: auto; }

        /* Nav + dots */
        .testi-nav {
          display: flex; align-items: center; justify-content: space-between;
          margin-top: 24px;
        }
        .testi-dots { display: flex; gap: 7px; align-items: center; }
        .testi-dot {
          width: 8px; height: 8px; border-radius: 99px; cursor: pointer;
          background: #e5e7eb;
          transition: all .28s cubic-bezier(.22,.68,0,1.2);
          border: none; padding: 0;
        }
        .testi-dot.active {
          width: 26px;
          background: linear-gradient(to right, ${ACCENT}, ${BRAND});
          box-shadow: 0 0 6px ${ACCENT}55;
        }
        .testi-arrows { display: flex; gap: 8px; }
        .testi-arrow {
          width: 38px; height: 38px; border-radius: 50%;
          border: 1.5px solid #e5e7eb; background: #fff;
          display: flex; align-items: center; justify-content: center;
          cursor: pointer; color: #374151;
          transition: all .22s ease;
          box-shadow: 0 1px 4px rgba(0,0,0,.06);
        }
        .testi-arrow:hover {
          border-color: ${BRAND}; background: ${BRAND}; color: #fff;
          box-shadow: 0 4px 14px rgba(130,12,12,.25);
        }

        /* Progress bar */
        .testi-progress-bar {
          margin-top: 14px;
          height: 2.5px; background: #f0ede9; border-radius: 99px; overflow: hidden;
        }
        .testi-progress-fill {
          height: 100%;
          background: linear-gradient(to right, ${ACCENT}, ${BRAND});
          border-radius: 99px;
          transition: width .32s ease;
        }

        @media (max-width: 768px) {
          .testi-layout { grid-template-columns: 1fr; gap: 40px; }
          .testi-root { padding: 56px 24px; }
        }
      `}</style>

      <section className="testi-root">
        <div className="testi-layout">

          {/* ── LEFT ── */}
          <div className="testi-left">
            <p className="testi-eyebrow">Customer Reviews</p>
            <h2 className="testi-h2">
              What Our<br />
              <span>Customers Say</span>
            </h2>
            <div className="testi-sub-line" />
            <p className="testi-desc">
              We value your trust & feedback. Our results and reviews are
              100% honest — no filters, no retouch, just real stories from
              real people who chose wellness.
            </p>
            <span className="testi-hashtag">#VilvahTribe</span>

            {/* Stats */}
            <div className="testi-stats">
              {[
                { num: "10K+", label: "Happy Customers" },
                { num: "4.8★", label: "Avg. Rating" },
                { num: "100%", label: "Honest Reviews" },
              ].map((s) => (
                <div key={s.label} className="testi-stat-box">
                  <div className="testi-stat-num">{s.num}</div>
                  <div className="testi-stat-label">{s.label}</div>
                </div>
              ))}
            </div>
          </div>

          {/* ── RIGHT ── */}
          <div className="testi-right">
            <div className="testi-card-wrap">
              <div
                className={`testi-card ${
                  animating
                    ? direction === "next"
                      ? "slide-out-next"
                      : "slide-out-prev"
                    : "slide-in"
                }`}
              >
                {/* Quote icon */}
                <div className="testi-quote-icon">
                  <Quote size={20} color="#fff" strokeWidth={2.5} />
                </div>

                <span className="testi-tag">{t.tag}</span>

                <p className="testi-quote-text">"{t.quote}"</p>

                <div className="testi-divider" />

                <div className="testi-user">
                  <img className="testi-avatar" src={t.image} alt={t.name} />
                  <div>
                    <div className="testi-user-name">{t.name}</div>
                    <div className="testi-user-title">{t.title}</div>
                  </div>
                  <div className="testi-stars">
                    <StarRow rating={t.rating} />
                  </div>
                </div>
              </div>
            </div>

            {/* Nav */}
            <div className="testi-nav">
              <div className="testi-dots">
                {testimonials.map((_, i) => (
                  <button
                    key={i}
                    className={`testi-dot${i === current ? " active" : ""}`}
                    onClick={() => {
                      if (animating || i === current) return;
                      setDirection(i > current ? "next" : "prev");
                      setAnimating(true);
                      setTimeout(() => { setCurrent(i); setAnimating(false); }, 320);
                    }}
                  />
                ))}
              </div>
              <div className="testi-arrows">
                <button className="testi-arrow" onClick={() => go("prev")}>
                  <ChevronLeft size={17} />
                </button>
                <button className="testi-arrow" onClick={() => go("next")}>
                  <ChevronRight size={17} />
                </button>
              </div>
            </div>

            {/* Progress */}
            <div className="testi-progress-bar">
              <div
                className="testi-progress-fill"
                style={{ width: `${((current + 1) / testimonials.length) * 100}%` }}
              />
            </div>
          </div>

        </div>
      </section>
    </>
  );
}