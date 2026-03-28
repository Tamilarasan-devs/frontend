import React, { useRef, useEffect, useState } from "react";

/* ─── Reveal animation ─── */
function Reveal({ children, delay = 0, className = "" }) {
  const ref = useRef(null);
  const [visible, setVisible] = useState(false);
  useEffect(() => {
    const obs = new IntersectionObserver(
      ([e]) => { if (e.isIntersecting) setVisible(true); },
      { threshold: 0.15 }
    );
    if (ref.current) obs.observe(ref.current);
    return () => obs.disconnect();
  }, []);
  return (
    <div
      ref={ref}
      className={className}
      style={{
        opacity: visible ? 1 : 0,
        transform: visible ? "translateY(0)" : "translateY(32px)",
        transition: `opacity 0.8s ease ${delay}s, transform 0.8s ease ${delay}s`,
      }}
    >
      {children}
    </div>
  );
}

/* ─── Pill label ─── */
function Pill({ children }) {
  return (
    <span className="inline-block px-4 py-1 rounded-full border border-[#c9643a55] text-[#c9643a] text-xs font-semibold tracking-widest uppercase">
      {children}
    </span>
  );
}

/* ─── Decorative Leaf SVG ─── */
const LeafSVG = ({ className, style }) => (
  <svg
    viewBox="0 0 80 120"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    className={className}
    style={style}
  >
    <path
      d="M40 115 C40 115 8 80 8 45 C8 20 22 5 40 5 C58 5 72 20 72 45 C72 80 40 115 40 115Z"
      fill="url(#leafGrad)"
      opacity="0.18"
    />
    <line x1="40" y1="110" x2="40" y2="15" stroke="#820c0c" strokeWidth="0.8" strokeDasharray="3 4" opacity="0.35" />
    <defs>
      <linearGradient id="leafGrad" x1="40" y1="5" x2="40" y2="115" gradientUnits="userSpaceOnUse">
        <stop stopColor="#820c0c" />
        <stop offset="1" stopColor="#c9643a" />
      </linearGradient>
    </defs>
  </svg>
);

/* ─── Main Section ─── */
export default function AboutAayubakwath() {
  const blocks = [
    {
      num: "01",
      icon: "🌿",
      label: "Our Roots",
      heading: "Founded on a simple, powerful vision",
      body: "Aayubakwath was founded to support healthier lives through natural wellness solutions. In today's fast-paced world, people face increasing health challenges — unstable blood sugar, high cholesterol, mental fatigue, poor concentration in children, and general lifestyle-related issues.",
    },
    {
      num: "02",
      icon: "⚗️",
      label: "Our Belief",
      heading: "Nature, nutrition & science in harmony",
      body: "We believe the right combination of nutrition, natural ingredients, and scientifically formulated supplements can help people regain balance and improve their overall well-being.",
    },
    {
      num: "03",
      icon: "🎯",
      label: "Our Mission",
      heading: "Safe, effective & high-quality supplements",
      body: "Our mission is to provide health supplements that support everyday needs for individuals and families — products that complement modern lifestyles while staying rooted in holistic wellness and nutritional balance.",
    },
  ];

  return (
    <section
      className="relative overflow-hidden px-6 py-24 md:py-32"
      style={{
        background: "linear-gradient(160deg, #fdf8f3 0%, #fef4eb 60%, #fdf0e6 100%)",
      }}
    >
      {/* ── Background Leaf Decorations ── */}
      <LeafSVG
        className="absolute pointer-events-none"
        style={{ top: "-30px", right: "-10px", width: "240px", opacity: 0.55 }}
      />
      <LeafSVG
        className="absolute pointer-events-none"
        style={{
          bottom: "0px",
          left: "-20px",
          width: "180px",
          opacity: 0.35,
          transform: "scaleX(-1) rotate(15deg)",
        }}
      />

      <div className="relative max-w-5xl mx-auto">

        {/* ── HEADER ── */}
        <Reveal>
          <div className="text-center mb-20">
            {/* Decorative top line */}
            <div className="flex items-center justify-center gap-4 mb-6">
              <div className="h-px w-12 bg-gradient-to-r from-transparent to-[#c9643a]" />
              <span className="text-[#c9643a] text-sm font-semibold tracking-[0.2em] uppercase">
                Who We Are
              </span>
              <div className="h-px w-12 bg-gradient-to-l from-transparent to-[#c9643a]" />
            </div>

            <h2
              className="font-bold text-[#820c0c] leading-tight"
              style={{ fontSize: "clamp(2rem, 5vw, 3.2rem)", letterSpacing: "-0.02em" }}
            >
              About Aayubakwath
            </h2>

            <p
              className="mt-4 text-[#a07060] font-light tracking-widest"
              style={{ fontSize: "clamp(0.9rem, 2vw, 1.05rem)" }}
            >
              Rooted in nature · Guided by science
            </p>
          </div>
        </Reveal>

        {/* ── BLOCKS ── */}
        <div className="flex flex-col">
          {blocks.map((b, i) => (
            <Reveal key={i} delay={0.12 * i}>
              <div
                className={`grid gap-8 md:gap-12 py-12 md:py-16 ${
                  i < blocks.length - 1 ? "border-b border-[#e8d5c4]" : ""
                }`}
                style={{ gridTemplateColumns: "88px 1fr", alignItems: "start" }}
              >
                {/* ── Left Column ── */}
                <div className="flex flex-col items-center gap-3">
                  <span
                    className="italic text-[#c9643a] font-medium tracking-widest"
                    style={{ fontSize: "0.8rem", opacity: 0.75 }}
                  >
                    {b.num}
                  </span>

                  <div
                    className="w-14 h-14 rounded-2xl flex items-center justify-center text-2xl"
                    style={{
                      background: "linear-gradient(135deg, #820c0c, #c9643a)",
                      boxShadow: "0 10px 28px #820c0c30",
                    }}
                  >
                    {b.icon}
                  </div>

                  {i < blocks.length - 1 && (
                    <div
                      className="w-px"
                      style={{
                        height: "64px",
                        background: "linear-gradient(to bottom, #c9643a55, transparent)",
                      }}
                    />
                  )}
                </div>

                {/* ── Right Column ── */}
                <div className="pt-1">
                  <Pill>{b.label}</Pill>

                  <h3
                    className="font-bold text-[#3a1a10] mt-4 mb-4 leading-snug"
                    style={{
                      fontSize: "clamp(1.5rem, 3.2vw, 2.1rem)",
                      letterSpacing: "-0.015em",
                    }}
                  >
                    {b.heading}
                  </h3>

                  <p
                    className="text-[#5c3828] font-semibold  leading-relaxed max-w-2xl"
                    style={{ fontSize: "clamp(1rem, 1.8vw, 1.1rem)", lineHeight: "1.9" }}
                  >
                    {b.body}
                  </p>
                </div>
              </div>
            </Reveal>
          ))}
        </div>

        {/* ── BOTTOM TAGLINE ── */}
        <Reveal delay={0.5}>
          <div
            className="mt-16 px-8 py-10 md:px-12 md:py-12 rounded-3xl border border-[#c9643a28] flex flex-wrap items-center gap-5"
            style={{
              background: "linear-gradient(135deg, #820c0c08, #c9643a14)",
            }}
          >
            <span className="text-4xl">🌱</span>
            <p
              className="italic text-[#820c0c] font-medium leading-relaxed flex-1"
              style={{ fontSize: "clamp(1.1rem, 2.4vw, 1.5rem)", minWidth: "240px" }}
            >
              "Wellness isn't a product — it's a practice. We're here to support yours, every day."
            </p>
          </div>
        </Reveal>

      </div>
    </section>
  );
}