import React, { useRef, useEffect, useState } from "react";

/* ─── Google Fonts ─── */
const FontLoader = () => (
  <style>{`
  
    @keyframes float-slow {
      0%, 100% { transform: translateY(0px) rotate(0deg); }
      50% { transform: translateY(-18px) rotate(4deg); }
    }
    @keyframes float-med {
      0%, 100% { transform: translateY(0px) rotate(-3deg); }
      50% { transform: translateY(-12px) rotate(3deg); }
    }
    @keyframes pulse-dot {
      0%, 100% { box-shadow: 0 0 0 0 #c9643a66; }
      50% { box-shadow: 0 0 0 6px transparent; }
    }
  `}</style>
);

/* ─── Reveal on scroll ─── */
function Reveal({ children, delay = 0, className = "" }) {
  const ref = useRef(null);
  const [visible, setVisible] = useState(false);
  useEffect(() => {
    const obs = new IntersectionObserver(
      ([e]) => { if (e.isIntersecting) setVisible(true); },
      { threshold: 0.1 }
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
        transform: visible ? "translateY(0)" : "translateY(36px)",
        transition: `opacity 0.85s cubic-bezier(.22,1,.36,1) ${delay}s, transform 0.85s cubic-bezier(.22,1,.36,1) ${delay}s`,
      }}
    >
      {children}
    </div>
  );
}

/* ─── Decorative botanical SVG ─── */
const BotanicalCircle = ({ style }) => (
  <svg viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg" style={{ position: "absolute", pointerEvents: "none", ...style }}>
    <circle cx="100" cy="100" r="90" stroke="#c9643a" strokeWidth="0.6" fill="none" strokeDasharray="6 8" opacity="0.3" />
    <circle cx="100" cy="100" r="68" stroke="#03349a" strokeWidth="0.4" fill="none" opacity="0.15" />
    <path d="M100 10 C100 10 130 50 100 100 C70 50 100 10 100 10Z" fill="#c9643a" opacity="0.08" />
    <path d="M100 190 C100 190 70 150 100 100 C130 150 100 190 100 190Z" fill="#03349a" opacity="0.06" />
    <path d="M10 100 C10 100 50 70 100 100 C50 130 10 100 10 100Z" fill="#c9643a" opacity="0.06" />
    <path d="M190 100 C190 100 150 130 100 100 C150 70 190 100 190 100Z" fill="#03349a" opacity="0.05" />
  </svg>
);

/* ─── Premium Card ─── */
function Card({ num, icon, label, heading, body, delay }) {
  const [hovered, setHovered] = useState(false);

  return (
    <Reveal delay={delay}>
      <div
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={() => setHovered(false)}
        style={{
          position: "relative",
          background: hovered
            ? "linear-gradient(160deg, #ffffff 0%, #fff8f3 100%)"
            : "linear-gradient(160deg, #fefaf7 0%, #fdf4ed 100%)",
          border: `1.5px solid ${hovered ? "#c9643a55" : "#e8d4c4"}`,
          borderRadius: "24px",
          padding: "40px 36px 44px",
          overflow: "hidden",
          cursor: "default",
          transition: "all 0.5s cubic-bezier(.22,1,.36,1)",
          transform: hovered ? "translateY(-8px)" : "translateY(0)",
          boxShadow: hovered
            ? "0 32px 64px -16px #c9643a28, 0 8px 24px -8px #03349a14, 0 0 0 1px #c9643a18"
            : "0 4px 24px -6px #b8906840, 0 1px 4px #e8cbb820",
        }}
      >
        {/* Top shimmer bar */}
        <div style={{
          position: "absolute", top: 0, left: "24px", right: "24px", height: "2px",
          background: "linear-gradient(to right, transparent, #c9643a, #f09060, transparent)",
          borderRadius: "0 0 4px 4px",
          opacity: hovered ? 1 : 0,
          transform: hovered ? "scaleX(1)" : "scaleX(0.3)",
          transformOrigin: "center",
          transition: "all 0.6s cubic-bezier(.22,1,.36,1)",
        }} />

        {/* Watermark number */}
        <span style={{
          position: "absolute", top: "18px", right: "26px",
          fontSize: "5.5rem", fontWeight: 700,
          color: hovered ? "#c9643a16" : "#82200c09",
          lineHeight: 1, userSelect: "none",
          transition: "color 0.5s ease",
          letterSpacing: "-0.04em",
        }}>
          {num}
        </span>

        {/* Icon badge */}
        <div style={{
          width: "64px", height: "64px", borderRadius: "20px",
          background: hovered
            ? "linear-gradient(135deg, #03349a, #d9643a)"
            : "linear-gradient(135deg, #9a1a0e, #c9643a)",
          display: "flex", alignItems: "center", justifyContent: "center",
          fontSize: "28px",
          boxShadow: hovered ? "0 16px 36px #03349a50" : "0 8px 20px #03349a2a",
          marginBottom: "28px",
          transition: "all 0.5s ease",
          transform: hovered ? "scale(1.06) rotate(-2deg)" : "scale(1) rotate(0deg)",
        }}>
          {icon}
        </div>

        {/* Label pill */}
        <div style={{
          display: "inline-flex", alignItems: "center", gap: "7px",
          padding: "5px 14px", borderRadius: "100px",
          background: hovered ? "#c9643a18" : "#c9643a0e",
          border: `1px solid ${hovered ? "#c9643a50" : "#c9643a28"}`,
          marginBottom: "16px",
          transition: "all 0.4s ease",
        }}>
          <span style={{
            width: "5px", height: "5px", borderRadius: "50%",
            background: "#c9643a", display: "inline-block",
            animation: "pulse-dot 2.4s ease infinite",
          }} />
          <span style={{
            
            fontSize: "0.65rem", fontWeight: 500,
            letterSpacing: "0.18em", textTransform: "uppercase",
            color: "#c9643a",
          }}>
            {label}
          </span>
        </div>

        {/* Heading */}
        <h3 style={{
          fontSize: "clamp(1.35rem, 2.5vw, 1.75rem)",
          fontWeight: 700, color: "#3a0e06",
          lineHeight: 1.28, letterSpacing: "-0.01em",
          marginBottom: "18px",
        }}>
          {heading}
        </h3>

        {/* Animated divider */}
        <div style={{
          // height: "1.5px",
          background: "linear-gradient(to right, #c9643a, #f0a080, transparent)",
          marginBottom: "18px", borderRadius: "2px",
          width: hovered ? "65%" : "32%",
          transition: "width 0.65s cubic-bezier(.22,1,.36,1)",
        }} />

        {/* Body */}
        <p style={{
          
          fontSize: "0.96rem", fontWeight: 800,
          color: "#7a4530", lineHeight: 1.9,
        }}>
          {body}
        </p>

        {/* Corner glow */}
        <div style={{
          position: "absolute", bottom: "-24px", right: "-24px",
          width: "100px", height: "100px",
          background: `radial-gradient(circle, ${hovered ? "#c9643a18" : "#c9643a0a"} 0%, transparent 70%)`,
          transition: "all 0.5s ease",
          pointerEvents: "none",
        }} />
      </div>
    </Reveal>
  );
}

/* ─── Stat badge ─── */
function StatBadge({ value, label, delay }) {
  return (
    <Reveal delay={delay}>
      <div style={{
        textAlign: "center", padding: "28px 20px", borderRadius: "20px",
        background: "linear-gradient(160deg, #ffffff, #fdf0e6)",
        border: "1.5px solid #e8d0be",
        boxShadow: "0 4px 20px #c9643a12",
      }}>
        <div style={{
          fontSize: "clamp(2rem, 4vw, 2.8rem)",
          fontWeight: 700, color: "#03349a",
          lineHeight: 1, marginBottom: "8px",
          letterSpacing: "-0.02em",
        }}>
          {value}
        </div>
        <div style={{
          
          fontSize: "0.75rem", fontWeight: 500,
          color: "#a06040", letterSpacing: "0.12em",
          textTransform: "uppercase",
        }}>
          {label}
        </div>
      </div>
    </Reveal>
  );
}

/* ─── Main Section ─── */
export default function AboutAayubakwath() {
  const blocks = [
    {
      num: "01", icon: "🌿", label: "Our Roots",
      heading: "Founded on a simple, powerful vision",
      body: "Aayubakwath was founded to support healthier lives through natural wellness solutions. In today's fast-paced world, people face increasing health challenges — unstable blood sugar, high cholesterol, mental fatigue, poor concentration in children, and general lifestyle-related issues.",
    },
    {
      num: "02", icon: "⚗️", label: "Our Belief",
      heading: "Nature, nutrition & science in harmony",
      body: "We believe the right combination of nutrition, natural ingredients, and scientifically formulated supplements can help people regain balance and improve their overall well-being.",
    },
    {
      num: "03", icon: "🎯", label: "Our Mission",
      heading: "Safe, effective & high-quality supplements",
      body: "Our mission is to provide health supplements that support everyday needs for individuals and families — products that complement modern lifestyles while staying rooted in holistic wellness and nutritional balance.",
    },
  ];

  const stats = [
    { value: "100%", label: "Natural Ingredients" },
    { value: "10K+", label: "Families Supported" },
    { value: "15+", label: "Product Variants" },
    { value: "5★",  label: "Avg. Rating" },
  ];

  return (
    <>
      <FontLoader />
      <section style={{
        position: "relative", overflow: "hidden",
        padding: "100px 24px 120px",
        background: "linear-gradient(160deg, #fffaf5 0%, #fef6ee 40%, #fdf0e6 100%)",
        minHeight: "100vh",
      }}>

        {/* Background blobs */}
        <div style={{
          position: "absolute", top: "-80px", right: "-60px",
          width: "480px", height: "480px", borderRadius: "50%",
          background: "radial-gradient(circle, #f0c8a020 0%, transparent 70%)",
          pointerEvents: "none",
        }} />
        <div style={{
          position: "absolute", bottom: "40px", left: "-80px",
          width: "360px", height: "360px", borderRadius: "50%",
          background: "radial-gradient(circle, #c9643a14 0%, transparent 70%)",
          pointerEvents: "none",
        }} />

        {/* Floating botanicals */}
        <BotanicalCircle style={{
          top: "60px", right: "40px", width: "220px", height: "220px",
          opacity: 0.7, animation: "float-slow 7s ease-in-out infinite",
        }} />
        <BotanicalCircle style={{
          bottom: "100px", left: "20px", width: "160px", height: "160px",
          opacity: 0.45, animation: "float-med 9s ease-in-out infinite",
          transform: "rotate(45deg)",
        }} />

        {/* Subtle grid */}
        <div style={{
          position: "absolute", inset: 0, pointerEvents: "none",
          backgroundImage: "linear-gradient(#c9643a08 1px, transparent 1px), linear-gradient(90deg, #c9643a08 1px, transparent 1px)",
          backgroundSize: "60px 60px",
        }} />

        <div style={{ position: "relative", zIndex: 1, maxWidth: "1100px", margin: "0 auto" }}>

          {/* ── HEADER ── */}
          <Reveal>
            <div style={{ textAlign: "center", marginBottom: "72px" }}>

              {/* Badge */}
              <div style={{
                display: "inline-flex", alignItems: "center", gap: "10px",
                padding: "7px 22px", borderRadius: "100px",
                background: "linear-gradient(135deg, #fff5ee, #ffeedd)",
                border: "1.5px solid #e8b89040",
                marginBottom: "28px",
                boxShadow: "0 4px 16px #c9643a14",
              }}>
                <span style={{
                  width: "6px", height: "6px", borderRadius: "50%",
                  background: "linear-gradient(135deg, #03349a, #c9643a)",
                  display: "inline-block",
                  animation: "pulse-dot 2s ease infinite",
                }} />
                <span style={{
                  
                  fontSize: "0.7rem", fontWeight: 500,
                  letterSpacing: "0.2em", textTransform: "uppercase",
                  color: "#9a3818",
                }}>
                  Who We Are
                </span>
              </div>

              {/* Title */}
              <h2 style={{
    
                fontSize: "clamp(2.4rem, 6vw, 4rem)",
                fontWeight: 700, color: "#3a0e06",
                lineHeight: 1.1, letterSpacing: "-0.025em",
                marginBottom: "14px",
              }}>
                About{" "}
                <span style={{
                  background: "linear-gradient(135deg, #03349a 0%, #c9643a 60%, #e8845a 100%)",
                  WebkitBackgroundClip: "text",
                  WebkitTextFillColor: "transparent",
                }}>
                  Aayubakwath
                </span>
              </h2>

              <p style={{
    
                fontStyle: "italic",
                fontSize: "clamp(0.95rem, 2vw, 1.15rem)",
                color: "#b07050", letterSpacing: "0.05em",
                marginBottom: "32px",
              }}>
                Rooted in nature · Guided by science
              </p>

              {/* Decorative rule */}
              <div style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: "14px" }}>
                <div style={{ height: "1px", width: "60px", background: "linear-gradient(to right, transparent, #c9643a)" }} />
                <div style={{
                  width: "8px", height: "8px", borderRadius: "50%",
                  background: "linear-gradient(135deg, #03349a, #c9643a)",
                  boxShadow: "0 0 10px #c9643a60",
                }} />
                <div style={{ height: "1px", width: "60px", background: "linear-gradient(to left, transparent, #c9643a)" }} />
              </div>
            </div>
          </Reveal>

          {/* ── STATS ── */}
          <div style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(160px, 1fr))",
            gap: "16px", marginBottom: "56px",
          }}>
            {stats.map((s, i) => (
              <StatBadge key={i} {...s} delay={0.08 * i} />
            ))}
          </div>

          {/* ── CARDS ── */}
          <div style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))",
            gap: "22px", marginBottom: "56px",
          }}>
            {blocks.map((b, i) => (
              <Card key={i} {...b} delay={0.1 + i * 0.13} />
            ))}
          </div>

          {/* ── TAGLINE CARD ── */}
          <Reveal delay={0.55}>
            <div style={{
              position: "relative",
              padding: "52px 60px", borderRadius: "28px",
              background: "linear-gradient(135deg, #ffffff 0%, #fdf4ea 100%)",
              border: "1.5px solid #e0c0a8", overflow: "hidden",
              display: "flex", alignItems: "center",
              gap: "28px", flexWrap: "wrap",
              boxShadow: "0 16px 48px #c9643a1a, 0 4px 12px #82200c0e",
            }}>
              {/* Left gradient bar */}
              <div style={{
                position: "absolute", left: 0, top: "15%", bottom: "15%",
                width: "4px", borderRadius: "0 4px 4px 0",
                background: "linear-gradient(to bottom, #03349a, #c9643a, #f0a070)",
              }} />

              {/* Top shimmer */}
              <div style={{
                position: "absolute", top: 0, left: "20%", right: "20%", height: "1.5px",
                background: "linear-gradient(to right, transparent, #c9643a55, transparent)",
                borderRadius: "0 0 2px 2px",
              }} />

              {/* Watermark */}
              <div style={{
                position: "absolute", right: "28px", bottom: "0px",
    
                fontSize: "9rem", fontWeight: 700,
                color: "#c9643a08", lineHeight: 1,
                userSelect: "none", letterSpacing: "-0.04em",
              }}>
                ❝
              </div>

              <span style={{ fontSize: "2.8rem", flexShrink: 0 }}>🌱</span>

              <p style={{
    
                fontStyle: "italic",
                fontSize: "clamp(1.1rem, 2.4vw, 1.5rem)",
                fontWeight: 500, color: "#5c2010",
                lineHeight: 1.7, flex: 1, minWidth: "240px",
              }}>
                "Wellness isn't a product — it's a practice.
                <br />We're here to support yours, every day."
              </p>
            </div>
          </Reveal>

        </div>
      </section>
    </>
  );
}