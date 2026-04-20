import { useState } from "react";
import pure from '../assets/images/pure.jpeg'
import health from '../assets/images/health.jpeg'
import safe from '../assets/images/safe.jpeg'
import ht from '../assets/images/ht.jpeg'

// ─── Add this to your global CSS / index.css ───────────────────────────────
// @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:wght@700;800&family=DM+Sans:wght@400;500;600&display=swap');

// ─── Card data ─────────────────────────────────────────────────────────────
const cards = [
  {
    title: "Pure Herbal Formulation",
    desc: "Made with carefully selected natural ingredients, inspired by traditional herbal knowledge.",
    image: pure,
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="#c9643a" strokeWidth="1.8"
           strokeLinecap="round" strokeLinejoin="round" className="w-6 h-6">
        <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
        <path d="M9 12l2 2 4-4" />
      </svg>
    ),
  },
  {
    title: "Daily Health Support",
    desc: "Designed for everyday wellness needs and helps maintain overall body balance.",
    image: health,
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="#c9643a" strokeWidth="1.8"
           strokeLinecap="round" strokeLinejoin="round" className="w-6 h-6">
        <rect x="2" y="7" width="20" height="14" rx="2" />
        <path d="M16 7V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v2" />
        <line x1="12" y1="12" x2="12" y2="16" />
        <line x1="10" y1="14" x2="14" y2="14" />
      </svg>
    ),
  },
  {
    title: "Safe & Balanced Nutrition",
    desc: "Gentle on the body for regular use and supports a healthy lifestyle naturally.",
    image: safe,
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="#c9643a" strokeWidth="1.8"
           strokeLinecap="round" strokeLinejoin="round" className="w-6 h-6">
        <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" />
        <circle cx="9" cy="7" r="4" />
        <path d="M23 21v-2a4 4 0 0 0-3-3.87" />
        <path d="M16 3.13a4 4 0 0 1 0 7.75" />
      </svg>
    ),
  },
  {
    title: "Trusted Quality",
    desc: "Manufactured under strict quality standards ensuring purity, safety, and consistency.",
    image: ht,
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="#c9643a" strokeWidth="1.8"
           strokeLinecap="round" strokeLinejoin="round" className="w-6 h-6">
        <circle cx="12" cy="12" r="10" />
        <line x1="2" y1="12" x2="22" y2="12" />
        <path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z" />
      </svg>
    ),
  },
];

// Animation delays for staggered entrance (inline style — Tailwind can't purge dynamic values)
const DELAYS = ["0.05s", "0.18s", "0.31s", "0.44s"];

// ─── Component ─────────────────────────────────────────────────────────────
export default function OurBusiness() {
  const [hovered, setHovered] = useState(null);

  return (
    <>
      {/* ─── Keyframes & custom transitions (Tailwind can't express these) ─── */}
      <style>{`

        /* ── Entrance animation ── */
        @keyframes slideUp {
          from { opacity: 0; transform: translateY(44px) scale(0.92); }
          to   { opacity: 1; transform: translateY(0)    scale(1);    }
        }
        .anim-slide-up {
          animation: slideUp 0.6s cubic-bezier(0.34, 1.4, 0.64, 1) both;
        }

        /* ── Body shimmer on hover ── */
        @keyframes shimmer {
          from { left: -110%; }
          to   { left:  160%; }
        }
        .group:hover .shimmer-sweep {
          animation: shimmer 0.6s ease forwards;
        }

        /* ── Floating particles ── */
        @keyframes floatUp {
          0%   { opacity: 0;    transform: translateY(0)     scale(0);   }
          25%  { opacity: 0.55; transform: translateY(-20px) scale(1);   }
          80%  { opacity: 0.2;  transform: translateY(-62px) scale(0.6); }
          100% { opacity: 0;    transform: translateY(-82px) scale(0);   }
        }
        .particle {
          position: absolute;
          border-radius: 9999px;
          pointer-events: none;
          animation: floatUp 4s ease-in-out infinite;
          animation-play-state: paused;
        }
        .group:hover .particle {
          animation-play-state: running;
        }

        /* ── Desc text slide-in ── */
        .desc-text {
          max-height: 0;
          overflow: hidden;
          opacity: 0;
          transition: max-height 0.42s ease, opacity 0.35s ease 0.06s;
        }
        .group:hover .desc-text {
          max-height: 72px;
          opacity: 1;
        }

        /* ── Image zoom on circle hover ── */
        .circle-img {
          transition: transform 0.55s ease;
        }
        .circle-group:hover .circle-img {
          transform: scale(1.1);
        }

        /* ── Blue tint fade ── */
        .img-tint {
          opacity: 0;
          transition: opacity 0.4s ease;
        }
        .circle-group:hover .img-tint {
          opacity: 1;
        }

        /* ── Icon badge pop ── */
        .icon-badge {
          transition: transform 0.4s cubic-bezier(0.34,1.6,0.64,1),
                      box-shadow 0.3s ease;
        }
        .circle-group:hover .icon-badge {
          transform: scale(1.22) rotate(-6deg);
          box-shadow: 0 8px 28px #c9643a,
                      0 0 0 3px #c9643a !important;
        }

        /* ── Ring glow ── */
        .img-ring {
          transition: box-shadow 0.4s ease;
        }
        .circle-group:hover .img-ring {
          box-shadow: 0 16px 44px #3c9643a,
                      0 0 0 3px rgba(255,255,255,.95) !important;
        }

        /* ── Arrow button ── */
        .arrow-btn {
          transition: background 0.3s ease, border-color 0.3s ease,
                      transform 0.35s cubic-bezier(0.34,1.6,0.64,1);
        }
        .group:hover .arrow-btn {
          background: rgba(255,255,255,.26) !important;
          border-color: rgba(255,255,255,.82) !important;
          transform: scale(1.16);
        }

        /* ── Card lift ── */
        .card-lift {
          transition: transform 0.45s cubic-bezier(0.34,1.56,0.64,1);
        }
        .card-lift:hover {
          transform: translateY(-16px) scale(1.025);
        }
      `}</style>


      {/* ─── Section ─────────────────────────────────────────────────────── */}
      <section
        className="relative overflow-hidden py-16 px-6 "
        style={{
          // background:
          //   "linear-gradient(158deg, #f0f5fb 0%, #e8f0fa 48%, #f4f0fc 100%)",
          // fontFamily: "'DM Sans', sans-serif",
        }}
      >

        
        {/* Ambient glows */}
        <div
          className="pointer-events-none absolute -top-24 -left-24 w-96 h-96 rounded-full"
          style={{
            background:
              "radial-gradient(circle, rgba(21,101,192,.07) 0%, transparent 70%)",
          }}
        />
        <div
          className="pointer-events-none absolute -bottom-20 -right-20 w-72 h-72 rounded-full"
          style={{
            background:
              "radial-gradient(circle, rgba(99,38,200,.05) 0%, transparent 70%)",
          }}
        />

        {/* ── Heading ── */}
        <h2 className="text-2xl sm:text-3xl font-bold text-center mb-2">
          <span style={{ color: "#1a0a0a" }}>What </span>
          <span style={{ color: "#03349a" }}>We </span>
          <span style={{ color: "#c9643a" }}>Do</span>
        </h2>
        <p className="text-center text-[black] text-xl mb-3 font-semibold">
          Use scientifically backed and traditional ingredients. Develop herbal supplements for daily health support. 
        </p>
        <p className="text-center text-[black] text-xl mb-3 font-semibold">
          Maintain strict quality standards in production
Provide safe and effective wellness solutions
        </p>

        {/* ── Divider ── */}
        <div className="flex items-center justify-center gap-3 mb-12">
          <span
            className="block h-[3px] w-12 rounded-full"
            style={{
              background: "linear-gradient(90deg, #03349a, #d85454)",
            }}
          />
          <span className="block w-2 h-2 rounded-full bg-[#03349a]" />
          <span
            className="block h-[3px] w-12 rounded-full"
            style={{
              background: "linear-gradient(90deg, #03349a, #d85454)",
            }}
          />
        </div>

        {/* ── Cards ── */}
        <div className="flex flex-wrap justify-center gap-40 relative z-10">
          {cards.map((card, i) => (
            <div
              key={card.title}
              className="group anim-slide-up card-lift relative w-48 cursor-pointer"
              style={{ animationDelay: DELAYS[i] }}
              onMouseEnter={() => setHovered(i)}
              onMouseLeave={() => setHovered(null)}
            >
             

              

              {/* ── Circle image area ── */}
              <div className="circle-group relative w-56 h-56 mx-auto z-[3]">
                {/* White ring (overflows card edges) */}
                <div
                  className="img-ring absolute inset-[-6px] rounded-full bg-white overflow-hidden"
                  style={{
                    boxShadow:
                      "0 6px 24px rgba(21,101,192,.2), 0 0 0 1.5px rgba(255,255,255,.5)",
                  }}
                >
                  {/* ── Photo ── */}
                  <img
                    src={card.image}
                    alt={card.title}
                    className="circle-img w-full h-full object-cover rounded-full"
                  />

                  {/* ── Hover tint overlay ── */}
                  <div
                    className="img-tint absolute inset-0 rounded-full"
                    style={{
                      background:
                        "linear-gradient(180deg, transparent 38%, rgba(21,101,192,.36) 100%)",
                    }}
                  />
                </div>

                {/* ── Icon badge ── */}
                <div
                  className="icon-badge absolute bottom-[-2px] right-[-2px] w-12 h-12 rounded-full bg-white flex items-center justify-center z-[4]"
                  style={{
                    boxShadow:
                      "0 4px 16px rgba(21,101,192,.22), 0 0 0 2.5px rgba(21,101,192,.12)",
                  }}
                >
                  {card.icon}
                </div>
              </div>

              {/* ── Blue pill body ── */}
              <div
                className="group relative z-[2] overflow-hidden text-center w-56"
                style={{
                  background:"#03349a",
                  borderRadius: "0 0 100px 100px",
                  marginTop: "-72px",
                  paddingTop: "88px",
                  paddingBottom: "28px",
                  boxShadow:
                    "0 12px 40px rgba(21,101,192,.28), inset 0 1px 0 rgba(255,255,255,.12)",
                }}
              >
                {/* Shimmer sweep */}
                <div
                  className="shimmer-sweep absolute top-0 w-[55%] h-full pointer-events-none"
                  style={{
                    background:
                      "linear-gradient(90deg, transparent, rgba(255,255,255,.08), transparent)",
                  }}
                />

                {/* Title */}
                <p
                  className="text-white font-bold px-3 leading-snug flex items-center justify-center"
                  style={{
                    fontFamily: "'Playfair Display', serif",
                    fontSize: "1.02rem",
                    minHeight: "46px",
                    textShadow: "0 1px 4px rgba(0,0,0,.2)",
                  }}
                >
                  {card.title}
                </p>

                {/* Description — slides in on hover */}
                <p className="desc-text text-white text-md px-4 leading-relaxed mt-1">
                  {card.desc}
                </p>

                {/* Arrow button */}
                <button
                  className="arrow-btn mt-3 mx-auto flex items-center justify-center w-11 h-11 rounded-full text-white text-base"
                  style={{
                    border: "2px solid rgba(255,255,255,.3)",
                    background: "rgba(255,255,255,.1)",
                    backdropFilter: "blur(4px)",
                  }}
                  aria-label={`Learn more about ${card.title}`}
                >
                  →
                </button>

                {/* Floating particles */}
                <span className="particle w-[5px] h-[5px] bg-white/60 bottom-14 left-[28%]" style={{ animationDelay: "0s" }} />
                <span className="particle w-1 h-1 bg-blue-200/50 bottom-10 left-[55%]" style={{ animationDelay: "0.65s" }} />
                <span className="particle w-[3px] h-[3px] bg-white/40 bottom-16 left-[72%]" style={{ animationDelay: "1.15s" }} />
              </div>
            </div>
          ))}
        </div>
      </section>
    </>
  );
}