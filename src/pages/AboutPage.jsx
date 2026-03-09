import { useEffect, useRef, useState } from "react";

const CRIMSON = "#820c0c";
const AMBER = "#c9643a";
const BG = "#fefbf6";
const CREAM = "#f5ede0";
const MUTED = "#7a4040";

const products = [
  {
    icon: "🩸",
    name: "Blood Sugar Balance",
    desc: "Supports healthy glucose metabolism and balanced insulin function.",
    tags: ["Berberine", "Fenugreek", "Cinnamon", "Neem Extract"],
  },
  {
    icon: "💚",
    name: "Blood Cholesterol Balance",
    desc: "Supports lipid metabolism and cardiovascular wellness naturally.",
    tags: ["Garlic", "Berberine", "Green Tea"],
  },
  {
    icon: "🧠",
    name: "Brain Tonic & Vitality Plus",
    desc: "Supports memory, focus, and sustained cognitive function.",
    tags: ["Bacopa", "Ginkgo", "Ashwagandha"],
  },
  {
    icon: "⚡",
    name: "Vitality Power Plus",
    desc: "Boosts stamina, energy levels, and overall physical vitality.",
    tags: ["Shilajit", "Ginseng", "Ashwagandha"],
  },
  {
    icon: "🌿",
    name: "General Health",
    desc: "Comprehensive herbal support for complete everyday well-being.",
    tags: ["Green Tea", "Alfalfa", "Ashwagandha"],
  },
];

const whyItems = [
  { icon: "🌱", title: "Premium Herbal Ingredients", text: "Carefully sourced botanicals of the highest purity and potency." },
  { icon: "🔬", title: "Science-Backed Formulas", text: "Traditional wisdom meets modern nutritional science." },
  { icon: "🏭", title: "Quality Manufacturing", text: "Strict standards in hygienic, regulated facilities." },
  { icon: "💊", title: "Convenient Capsule Format", text: "60 capsules per pack for easy daily supplementation." },
  { icon: "🇮🇳", title: "Proudly Made in India", text: "Rooted in Indian herbal heritage for global wellness." },
  { icon: "⚖️", title: "Safe & Affordable", text: "Wellness for every family — not just a luxury." },
];

function useFadeInUp() {
  useEffect(() => {
    const els = document.querySelectorAll("[data-fiu]");
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) {
            e.target.style.opacity = "1";
            e.target.style.transform = "translateY(0)";
          }
        });
      },
      { threshold: 0.1 }
    );
    els.forEach((el) => {
      el.style.opacity = "0";
      el.style.transform = "translateY(28px)";
      el.style.transition = "opacity 0.7s ease, transform 0.7s ease";
      observer.observe(el);
    });
    return () => observer.disconnect();
  }, []);
}

function ProductCard({ icon, name, desc, tags }) {
  const [hovered, setHovered] = useState(false);
  return (
    <div
      data-fiu
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        background: "white",
        borderRadius: 4,
        padding: "36px 32px",
        border: `1px solid rgba(130,12,12,0.08)`,
        position: "relative",
        overflow: "hidden",
        transform: hovered ? "translateY(-6px)" : "translateY(0)",
        boxShadow: hovered ? "0 24px 56px rgba(130,12,12,0.1)" : "none",
        transition: "transform 0.35s ease, box-shadow 0.35s ease",
        cursor: "default",
      }}
    >
      {/* Left accent bar */}
      <div
        style={{
          position: "absolute",
          top: 0, left: 0,
          width: 3,
          height: hovered ? "100%" : "0%",
          background: `linear-gradient(to bottom, ${CRIMSON}, ${AMBER})`,
          transition: "height 0.4s ease",
        }}
      />
      <div
        style={{
          width: 48, height: 48,
          borderRadius: 12,
          background: `linear-gradient(135deg, rgba(130,12,12,0.06), rgba(201,100,58,0.1))`,
          display: "flex", alignItems: "center", justifyContent: "center",
          fontSize: 22, marginBottom: 20,
        }}
      >
        {icon}
      </div>
      <div style={{ fontFamily: "'Playfair Display', serif", fontSize: 19, fontWeight: 700, color: CRIMSON, marginBottom: 10, lineHeight: 1.3 }}>
        {name}
      </div>
      <p style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: 16, fontWeight: 400, lineHeight: 1.75, color: MUTED }}>
        {desc}
      </p>
      <div style={{ marginTop: 16, display: "flex", flexWrap: "wrap", gap: 6 }}>
        {tags.map((t, i) => (
          <span key={i} style={{
            padding: "3px 10px",
            background: "rgba(201,100,58,0.08)",
            borderRadius: 50,
            fontSize: 11,
            fontWeight: 500,
            color: AMBER,
          }}>
            {t}
          </span>
        ))}
      </div>
    </div>
  );
}

function WhyCard({ icon, title, text }) {
  const [hovered, setHovered] = useState(false);
  return (
    <div
      data-fiu
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        background: "white",
        borderRadius: 4,
        padding: "24px 20px",
        borderLeft: `3px solid ${hovered ? AMBER : "transparent"}`,
        transform: hovered ? "translateX(4px)" : "translateX(0)",
        transition: "border-color 0.3s ease, transform 0.3s ease",
      }}
    >
      <div style={{ fontSize: 22, marginBottom: 10 }}>{icon}</div>
      <div style={{ fontFamily: "'Playfair Display', serif", fontSize: 15, fontWeight: 700, color: CRIMSON, marginBottom: 5 }}>{title}</div>
      <p style={{ fontSize: 13, color: MUTED, lineHeight: 1.6 }}>{text}</p>
    </div>
  );
}

export default function AayubakawathAbout() {
  useFadeInUp();

  return (
    <div style={{ background: BG, fontFamily: "'Jost', sans-serif", color: "#1c0808", overflowX: "hidden" }}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,400;0,700;0,900;1,400&family=Cormorant+Garamond:ital,wght@0,300;0,400;0,500;1,300&family=Jost:wght@300;400;500;600&display=swap');
        @keyframes scrollLine {
          0%   { transform: scaleY(0); transform-origin: top; }
          50%  { transform: scaleY(1); transform-origin: top; }
          51%  { transform: scaleY(1); transform-origin: bottom; }
          100% { transform: scaleY(0); transform-origin: bottom; }
        }
        @keyframes blink { 0%,100%{opacity:1;transform:scale(1)} 50%{opacity:.4;transform:scale(1.4)} }
        @keyframes heroFade { from{opacity:0;transform:translateY(24px)} to{opacity:1;transform:translateY(0)} }
        .hero-anim { animation: heroFade 1s ease both; }
        .hero-anim-delay { animation: heroFade 1s 0.3s ease both; }
        .hero-anim-delay2 { animation: heroFade 1s 0.55s ease both; }
        .scroll-line-anim { animation: scrollLine 2s infinite; }
        .blink-anim { animation: blink 2s infinite; }
      `}</style>

      {/* ── HERO ── */}
      <section style={{ position: "relative", minHeight: "92vh", display: "flex", alignItems: "center", justifyContent: "center", overflow: "hidden", background: BG }}>
        {/* Bg circles */}
        <div style={{ position: "absolute", width: 700, height: 700, top: -200, right: -180, borderRadius: "50%", opacity: 0.07, background: CRIMSON, pointerEvents: "none" }} />
        <div style={{ position: "absolute", width: 400, height: 400, bottom: -120, left: -100, borderRadius: "50%", opacity: 0.09, background: AMBER, pointerEvents: "none" }} />
        {/* Decorative rings */}
        <div style={{ position: "absolute", top: "50%", left: "50%", transform: "translate(-50%,-50%)", width: 520, height: 520, borderRadius: "50%", border: "1px solid rgba(130,12,12,0.07)", pointerEvents: "none" }}>
          <div style={{ position: "absolute", inset: 28, borderRadius: "50%", border: "1px dashed rgba(201,100,58,0.12)" }} />
        </div>

        <div className="hero-anim" style={{ position: "relative", textAlign: "center", padding: "0 24px", maxWidth: 820 }}>
          {/* Eyebrow */}
          <div className="hero-anim" style={{ display: "inline-flex", alignItems: "center", gap: 12, marginBottom: 28 }}>
            <div style={{ width: 32, height: 1, background: AMBER, opacity: 0.5 }} />
            <span style={{ fontSize: 11, fontWeight: 600, letterSpacing: 5, textTransform: "uppercase", color: AMBER }}>About Us</span>
            <div style={{ width: 32, height: 1, background: AMBER, opacity: 0.5 }} />
          </div>

          <h1 className="hero-anim" style={{ fontFamily: "'Playfair Display', serif", fontSize: "clamp(52px, 8vw, 92px)", fontWeight: 900, lineHeight: 1, color: CRIMSON, letterSpacing: -1, marginBottom: 4 }}>
            Aayuba
          </h1>
          <div className="hero-anim-delay" style={{ fontFamily: "'Playfair Display', serif", fontSize: "clamp(36px, 5.5vw, 64px)", fontStyle: "italic", fontWeight: 400, color: AMBER, marginBottom: 0 }}>
            kawath
          </div>

          {/* Divider */}
          <div style={{ width: 60, height: 2, background: `linear-gradient(to right, ${CRIMSON}, ${AMBER})`, margin: "28px auto", borderRadius: 2 }} />

          <p className="hero-anim-delay" style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: "clamp(17px, 2.2vw, 22px)", fontWeight: 300, lineHeight: 1.85, color: MUTED, maxWidth: 600, margin: "0 auto" }}>
            A trusted name in dietary food supplements — dedicated to supporting your everyday health and wellness journey through the timeless power of nature.
          </p>

          <div className="hero-anim-delay2" style={{ marginTop: 40, display: "inline-flex", alignItems: "center", gap: 10, padding: "10px 22px", border: "1px solid rgba(130,12,12,0.15)", borderRadius: 50, fontSize: 12, fontWeight: 500, letterSpacing: 1.5, color: CRIMSON, background: "rgba(130,12,12,0.03)" }}>
            <span className="blink-anim" style={{ width: 6, height: 6, background: AMBER, borderRadius: "50%", display: "inline-block" }} />
            Manufactured by Sri Bhakawath Life Science
          </div>
        </div>

        {/* Scroll indicator */}
        <div style={{ position: "absolute", bottom: 32, left: "50%", transform: "translateX(-50%)", display: "flex", flexDirection: "column", alignItems: "center", gap: 8 }}>
          <span style={{ fontSize: 9, letterSpacing: 4, textTransform: "uppercase", color: MUTED, opacity: 0.5 }}>Scroll</span>
          <div className="scroll-line-anim" style={{ width: 1, height: 56, background: `linear-gradient(to bottom, transparent, ${AMBER})` }} />
        </div>
      </section>

      {/* ── STORY ── */}
      <div style={{ maxWidth: 1180, margin: "0 auto", padding: "100px 24px 60px" }}>
        <div data-fiu style={{ maxWidth: 780 }}>
          <p style={{ fontSize: 10, fontWeight: 600, letterSpacing: 5, textTransform: "uppercase", color: AMBER, marginBottom: 16 }}>Our Story</p>
          <h2 style={{ fontFamily: "'Playfair Display', serif", fontSize: "clamp(30px, 4vw, 50px)", fontWeight: 800, color: CRIMSON, lineHeight: 1.15, marginBottom: 24 }}>
            Bridging the gap between<br />
            <em style={{ fontStyle: "italic", fontWeight: 400, color: AMBER }}>nature & nutrition</em>
          </h2>
          <p style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: 20, fontWeight: 300, lineHeight: 1.85, color: MUTED, maxWidth: 680 }}>
            Aayubakawath was created with a simple mission — to provide high-quality, science-backed, and herbal-based nutritional supplements that help people maintain a healthy and balanced lifestyle. In today's fast-paced world, maintaining proper nutrition through diet alone can be challenging. Our carefully formulated supplements are designed to bridge that gap.
          </p>
        </div>
      </div>

      {/* ornament rule */}
      <div data-fiu style={{ maxWidth: 1180, margin: "0 auto", padding: "0 24px 80px", display: "flex", alignItems: "center", gap: 16 }}>
        <div style={{ flex: 1, height: 1, background: `linear-gradient(to right, transparent, rgba(130,12,12,0.15))` }} />
        <div style={{ width: 8, height: 8, background: AMBER, transform: "rotate(45deg)", flexShrink: 0 }} />
        <div style={{ flex: 1, height: 1, background: `linear-gradient(to left, transparent, rgba(130,12,12,0.15))` }} />
      </div>

      {/* ── VISION & MISSION ── */}
      <div style={{ background: CRIMSON, color: "#fefbf6", padding: "90px 24px", position: "relative", overflow: "hidden" }}>
        <div style={{ position: "absolute", top: -80, right: -80, width: 360, height: 360, borderRadius: "50%", background: "rgba(255,255,255,0.03)", pointerEvents: "none" }} />
        <div style={{ position: "absolute", bottom: -60, left: -60, width: 250, height: 250, borderRadius: "50%", background: "rgba(201,100,58,0.12)", pointerEvents: "none" }} />
        <div style={{ maxWidth: 1180, margin: "0 auto", display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))", gap: "64px 80px", position: "relative", zIndex: 1 }}>
          <div data-fiu>
            <p style={{ fontSize: 10, letterSpacing: 5, textTransform: "uppercase", color: AMBER, marginBottom: 16, fontWeight: 600 }}>Our Vision</p>
            <h3 style={{ fontFamily: "'Playfair Display', serif", fontSize: "clamp(26px, 3vw, 40px)", fontWeight: 700, marginBottom: 18, lineHeight: 1.2 }}>
              A Healthier India,<br />A Healthier World
            </h3>
            <p style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: 19, fontWeight: 300, lineHeight: 1.8, opacity: 0.85 }}>
              To become a trusted and recognized wellness brand in India and globally, empowering people to lead healthier, more energetic, and balanced lives through high-quality dietary supplements.
            </p>
          </div>
          <div data-fiu>
            <p style={{ fontSize: 10, letterSpacing: 5, textTransform: "uppercase", color: AMBER, marginBottom: 16, fontWeight: 600 }}>Our Mission</p>
            <h3 style={{ fontFamily: "'Playfair Display', serif", fontSize: "clamp(26px, 3vw, 40px)", fontWeight: 700, marginBottom: 18, lineHeight: 1.2 }}>
              Five Pillars of<br />Our Purpose
            </h3>
            <ul style={{ listStyle: "none", display: "flex", flexDirection: "column", gap: 12 }}>
              {[
                "Provide safe, effective, and affordable dietary food supplements",
                "Combine traditional herbal wisdom with modern nutritional science",
                "Maintain strict quality standards in manufacturing",
                "Promote preventive health awareness",
                "Support long-term wellness for individuals and families",
              ].map((item, i) => (
                <li key={i} style={{ display: "flex", alignItems: "flex-start", gap: 12, fontFamily: "'Cormorant Garamond', serif", fontSize: 18, fontWeight: 300, lineHeight: 1.5, opacity: 0.85 }}>
                  <span style={{ color: AMBER, fontSize: 10, flexShrink: 0, marginTop: 6 }}>✦</span>
                  {item}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>

      {/* ── PRODUCTS ── */}
      <div style={{ padding: "110px 24px", background: BG }}>
        <div style={{ maxWidth: 1180, margin: "0 auto" }}>
          <div data-fiu style={{ display: "flex", alignItems: "flex-end", justifyContent: "space-between", gap: 32, flexWrap: "wrap", marginBottom: 56 }}>
            <div>
              <p style={{ fontSize: 10, fontWeight: 600, letterSpacing: 5, textTransform: "uppercase", color: AMBER, marginBottom: 12 }}>What We Offer</p>
              <h2 style={{ fontFamily: "'Playfair Display', serif", fontSize: "clamp(30px, 4vw, 50px)", fontWeight: 800, color: CRIMSON, lineHeight: 1.15 }}>
                Our <em style={{ fontStyle: "italic", fontWeight: 400, color: AMBER }}>Product</em><br />Range
              </h2>
            </div>
            <p style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: 18, color: MUTED, fontWeight: 300, maxWidth: 360, lineHeight: 1.75 }}>
              Each product comes in 60 capsules with carefully selected ingredients, manufactured in India.
            </p>
          </div>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(290px, 1fr))", gap: 24 }}>
            {products.map((p, i) => <ProductCard key={i} {...p} />)}
          </div>
        </div>
      </div>

      {/* ── WHY ── */}
      <div style={{ background: CREAM, padding: "110px 24px" }}>
        <div style={{ maxWidth: 1180, margin: "0 auto", display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))", gap: "60px 80px", alignItems: "center" }}>
          <div data-fiu>
            <p style={{ fontSize: 10, fontWeight: 600, letterSpacing: 5, textTransform: "uppercase", color: AMBER, marginBottom: 16 }}>Why Choose Us</p>
            <h2 style={{ fontFamily: "'Playfair Display', serif", fontSize: "clamp(30px, 4vw, 48px)", fontWeight: 800, color: CRIMSON, lineHeight: 1.2, marginBottom: 20 }}>
              Health is not<br />a luxury — it is<br /><em style={{ fontStyle: "italic", fontWeight: 400, color: AMBER }}>a necessity</em>
            </h2>
            <p style={{ fontFamily: "'Playfair Display', serif", fontSize: "clamp(14px, 1.8vw, 17px)", fontStyle: "italic", color: MUTED, lineHeight: 1.7, fontWeight: 300 }}>
              Committed to making premium wellness accessible to every Indian household.
            </p>
          </div>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(200px, 1fr))", gap: 16 }}>
            {whyItems.map((item, i) => <WhyCard key={i} {...item} />)}
          </div>
        </div>
      </div>

      {/* ── QUALITY ── */}
      <div style={{ padding: "110px 24px", background: BG }}>
        <div data-fiu style={{ maxWidth: 900, margin: "0 auto", textAlign: "center" }}>
          <p style={{ fontSize: 10, fontWeight: 600, letterSpacing: 5, textTransform: "uppercase", color: AMBER, marginBottom: 16 }}>Our Commitment</p>
          <h2 style={{ fontFamily: "'Playfair Display', serif", fontSize: "clamp(30px, 4vw, 50px)", fontWeight: 800, color: CRIMSON, lineHeight: 1.15, marginBottom: 20 }}>
            Quality at <em style={{ fontStyle: "italic", fontWeight: 400, color: AMBER }}>Every Step</em>
          </h2>
          <p style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: 19, fontWeight: 300, color: MUTED, lineHeight: 1.8, maxWidth: 560, margin: "0 auto" }}>
            We follow strict quality guidelines during sourcing, formulation, and manufacturing. Every batch is produced with consistency, hygiene, and care.
          </p>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))", gap: 20, marginTop: 52 }}>
            {[
              { icon: "🌿", title: "Sourcing", text: "Premium, safe herbal ingredients from verified and trusted sources." },
              { icon: "⚗️", title: "Formulation", text: "Expert-designed blends combining time-tested herbs with science." },
              { icon: "🏗️", title: "Manufacturing", text: "Consistent, hygienic production under quality-controlled environments." },
            ].map((c, i) => (
              <div data-fiu key={i} style={{ padding: "38px 26px", border: "1px solid rgba(130,12,12,0.1)", borderRadius: 4, position: "relative", overflow: "hidden", background: "white" }}>
                <div style={{ position: "absolute", top: 12, right: 16, fontFamily: "'Playfair Display', serif", fontSize: 64, fontWeight: 900, color: CRIMSON, opacity: 0.04, lineHeight: 1 }}>0{i + 1}</div>
                <div style={{ fontSize: 28, marginBottom: 16 }}>{c.icon}</div>
                <div style={{ fontFamily: "'Playfair Display', serif", fontSize: 18, fontWeight: 700, color: CRIMSON, marginBottom: 10 }}>{c.title}</div>
                <p style={{ fontSize: 14, color: MUTED, lineHeight: 1.7 }}>{c.text}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* ── MANUFACTURER BAR ── */}
      <div style={{ background: `linear-gradient(135deg, ${CRIMSON} 0%, #5a0808 100%)`, padding: "48px 24px", textAlign: "center", position: "relative", overflow: "hidden" }}>
        <div style={{ position: "absolute", inset: 0, backgroundImage: "repeating-linear-gradient(45deg, transparent, transparent 20px, rgba(255,255,255,0.015) 20px, rgba(255,255,255,0.015) 21px)", pointerEvents: "none" }} />
        <p style={{ position: "relative", fontFamily: "'Cormorant Garamond', serif", fontSize: "clamp(17px, 2.5vw, 24px)", color: "rgba(255,255,255,0.85)", fontWeight: 300, fontStyle: "italic" }}>
          All Aayubakawath products are manufactured by{" "}
          <strong style={{ color: "white", fontStyle: "normal", fontWeight: 600 }}>Sri Bhakawath Life Science</strong>
          {" "}— ensuring quality production standards and safe ingredient sourcing.
        </p>
      </div>

      {/* ── FOOTER CTA ── */}
      <div style={{ padding: "100px 24px", background: BG, textAlign: "center" }}>
        <div data-fiu style={{ display: "inline-block", padding: "12px 28px", background: "rgba(130,12,12,0.04)", border: "1px solid rgba(130,12,12,0.1)", borderRadius: 2, marginBottom: 52, fontSize: 11, letterSpacing: 1.5, color: MUTED, textTransform: "uppercase", fontWeight: 500 }}>
          ℹ️ &nbsp; Dietary supplement · Not intended to replace a balanced diet · Not for medicinal use
        </div>
        <div data-fiu style={{ fontFamily: "'Playfair Display', serif", fontSize: "clamp(30px, 4vw, 50px)", fontWeight: 800, color: CRIMSON, marginBottom: 14, lineHeight: 1.2 }}>
          Begin Your Wellness<br />Journey Today
        </div>
        <p data-fiu style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: 20, color: MUTED, fontWeight: 300, fontStyle: "italic", maxWidth: 460, margin: "0 auto 36px", lineHeight: 1.7 }}>
          Discover how Aayubakawath supplements can become part of your daily health routine.
        </p>
        <div data-fiu style={{ display: "flex", gap: 14, justifyContent: "center", flexWrap: "wrap" }}>

          <a  href="productListing">

          <button
            style={{ padding: "15px 38px", background: `linear-gradient(135deg, ${CRIMSON}, #a01010)`, color: "white", fontFamily: "'Jost', sans-serif", fontSize: 12, fontWeight: 600, letterSpacing: 3, textTransform: "uppercase", border: "none", borderRadius: 2, cursor: "pointer", boxShadow: "0 8px 28px rgba(130,12,12,0.25)" }}
            onMouseEnter={e => { e.target.style.transform = "translateY(-3px)"; e.target.style.boxShadow = "0 16px 40px rgba(130,12,12,0.35)"; }}
            onMouseLeave={e => { e.target.style.transform = "translateY(0)"; e.target.style.boxShadow = "0 8px 28px rgba(130,12,12,0.25)"; }}
          >
            Explore Products
          </button>
          </a>
          <a href="contact">

          <button
            style={{ padding: "14px 38px", background: "transparent", color: CRIMSON, fontFamily: "'Jost', sans-serif", fontSize: 12, fontWeight: 600, letterSpacing: 3, textTransform: "uppercase", border: `1.5px solid ${CRIMSON}`, borderRadius: 2, cursor: "pointer" }}
            onMouseEnter={e => { e.currentTarget.style.background = CRIMSON; e.currentTarget.style.color = "white"; e.currentTarget.style.transform = "translateY(-3px)"; }}
            onMouseLeave={e => { e.currentTarget.style.background = "transparent"; e.currentTarget.style.color = CRIMSON; e.currentTarget.style.transform = "translateY(0)"; }}
          >
            Contact Us
          </button>
          </a>
        </div>
      </div>
    </div>
  );
}

/// not in use