// About Aayubakwath — Editorial Organic Redesign
// Drop-in replacement; assumes Reveal & Divider are available globally.
// Google Fonts loaded via <link> in your index.html:
//   <link href="https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,400;0,600;1,400&family=DM+Sans:wght@300;400;500&display=swap" rel="stylesheet">

import React, { useRef, useEffect, useState } from "react";

/* ─── tiny inline Reveal (remove if you already have one) ─── */
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
        transform: visible ? "translateY(0)" : "translateY(28px)",
        transition: `opacity 0.75s ease ${delay}s, transform 0.75s ease ${delay}s`,
      }}
    >
      {children}
    </div>
  );
}

/* ─── pill label ─── */
function Pill({ children }) {
  return (
    <span style={{
      display: "inline-block",
      padding: "3px 14px",
      borderRadius: "999px",
      border: "1px solid #c9643a55",
      color: "#c9643a",
      fontSize: "0.72rem",
      letterSpacing: "0.14em",
      textTransform: "uppercase",
      fontWeight: 500,
    }}>
      {children}
    </span>
  );
}

/* ─── decorative leaf SVG ─── */
const LeafSVG = ({ style }) => (
  <svg viewBox="0 0 80 120" fill="none" xmlns="http://www.w3.org/2000/svg" style={style}>
    <path
      d="M40 115 C40 115 8 80 8 45 C8 20 22 5 40 5 C58 5 72 20 72 45 C72 80 40 115 40 115Z"
      fill="url(#leafGrad)" opacity="0.18"
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

/* ─── main section ─── */
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
      style={{
        background: "linear-gradient(160deg, #fdf8f3 0%, #fef4eb 60%, #fdf0e6 100%)",
        padding: "96px 24px",
        position: "relative",
        overflow: "hidden",
        
      }}
    >
      {/* ── background decoration ── */}
      <LeafSVG style={{
        position: "absolute", top: "-30px", right: "-10px",
        width: "220px", opacity: 0.6, pointerEvents: "none",
      }} />
      <LeafSVG style={{
        position: "absolute", bottom: "0px", left: "-20px",
        width: "160px", opacity: 0.4, transform: "scaleX(-1) rotate(15deg)",
        pointerEvents: "none",
      }} />

      <div style={{ maxWidth: "960px", margin: "0 auto", position: "relative" }}>

        {/* ── HEADER ── */}
        <Reveal className="about-header" style={{ textAlign: "center", marginBottom: "72px" }}>
          <div style={{ textAlign: "center", marginBottom: "72px" }}>
            <Pill>Who We Are</Pill>
            <h2 style={{
              
              fontSize: "clamp(2.8rem, 7vw, 5rem)",
              fontWeight: 600,
              lineHeight: 1.08,
              margin: "20px 0 0",
              background: "linear-gradient(135deg, #820c0c 0%, #c9643a 100%)",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
              backgroundClip: "text",
              letterSpacing: "-0.02em",
            }}>
              About Aayubakwath
            </h2>
            <p style={{
              color: "#a07060",
              fontSize: "1rem",
              fontWeight: 300,
              letterSpacing: "0.06em",
              marginTop: "10px",
            }}>
              Rooted in nature · Guided by science
            </p>
          </div>
        </Reveal>

        {/* ── BLOCKS ── */}
        <div style={{ display: "flex", flexDirection: "column", gap: "0" }}>
          {blocks.map((b, i) => (
            <Reveal key={i} delay={0.12 * i}>
              <div
                style={{
                  display: "grid",
                  gridTemplateColumns: "80px 1fr",
                  gap: "32px",
                  padding: "48px 0",
                  borderBottom: i < blocks.length - 1 ? "1px solid #e8d5c4" : "none",
                  alignItems: "start",
                }}
              >
                {/* left column */}
                <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: "12px" }}>
                  <span style={{
                    
                    fontStyle: "italic",
                    fontSize: "0.8rem",
                    color: "#c9643a",
                    letterSpacing: "0.1em",
                    opacity: 0.7,
                  }}>
                    {b.num}
                  </span>
                  <div style={{
                    width: "52px",
                    height: "52px",
                    borderRadius: "14px",
                    background: "linear-gradient(135deg, #820c0c, #c9643a)",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    fontSize: "1.4rem",
                    boxShadow: "0 8px 24px #820c0c28",
                  }}>
                    {b.icon}
                  </div>
                  {i < blocks.length - 1 && (
                    <div style={{
                      width: "1px",
                      height: "56px",
                      background: "linear-gradient(to bottom, #c9643a55, transparent)",
                    }} />
                  )}
                </div>

                {/* right column */}
                <div style={{ paddingTop: "4px" }}>
                  <Pill>{b.label}</Pill>
                  <h3 style={{
                    
                    fontSize: "clamp(1.4rem, 3vw, 1.9rem)",
                    fontWeight: 600,
                    color: "#3a1a10",
                    margin: "10px 0 14px",
                    lineHeight: 1.2,
                    letterSpacing: "-0.01em",
                  }}>
                    {b.heading}
                  </h3>
                  <p style={{
                    color: "#6b4c3b",
                    lineHeight: 1.85,
                    fontSize: "1rem",
                    fontWeight: 300,
                    maxWidth: "620px",
                  }}>
                    {b.body}
                  </p>
                </div>
              </div>
            </Reveal>
          ))}
        </div>

        {/* ── BOTTOM TAGLINE ── */}
        <Reveal delay={0.5}>
          <div style={{
            marginTop: "64px",
            padding: "36px 40px",
            borderRadius: "20px",
            background: "linear-gradient(135deg, #820c0c08, #c9643a12)",
            border: "1px solid #c9643a28",
            display: "flex",
            alignItems: "center",
            gap: "20px",
            flexWrap: "wrap",
          }}>
            <span style={{ fontSize: "2rem" }}>🌱</span>
            <p style={{
              
              fontSize: "clamp(1.1rem, 2.5vw, 1.45rem)",
              fontStyle: "italic",
              color: "#820c0c",
              fontWeight: 400,
              lineHeight: 1.5,
              margin: 0,
            }}>
              "Wellness isn't a product — it's a practice. We're here to support yours, every day."
            </p>
          </div>
        </Reveal>

      </div>
    </section>
  );
}