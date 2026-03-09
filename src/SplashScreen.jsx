import { useState, useEffect } from "react";

const LogoSVG = ({ animated }) => (
  <svg viewBox="0 0 200 160" fill="none" xmlns="http://www.w3.org/2000/svg" style={{ width: "100%", height: "100%" }}>
    <path
      d="M100 155 C60 155 10 120 10 80 C10 60 30 45 55 50 C70 52 85 65 100 85 C115 65 130 52 145 50 C170 45 190 60 190 80 C190 120 140 155 100 155Z"
      fill="#8B1010"
      style={{
        opacity: animated ? 1 : 0,
        transform: animated ? "scale(1)" : "scale(0.5)",
        transformOrigin: "center bottom",
        transition: "all 0.8s cubic-bezier(0.34,1.56,0.64,1) 0.1s",
      }}
    />
    <path
      d="M100 130 C75 130 45 108 45 80 C45 65 58 55 72 58 C83 60 93 72 100 90 C107 72 117 60 128 58 C142 55 155 65 155 80 C155 108 125 130 100 130Z"
      fill="#D4845A"
      style={{
        opacity: animated ? 1 : 0,
        transform: animated ? "scale(1)" : "scale(0.4)",
        transformOrigin: "center bottom",
        transition: "all 0.8s cubic-bezier(0.34,1.56,0.64,1) 0.25s",
      }}
    />
    <path
      d="M100 58 C93 58 86 52 86 44 C86 38 91 34 96 36 C98 37 99 39 100 41 C101 39 102 37 104 36 C109 34 114 38 114 44 C114 52 107 58 100 58Z"
      fill="#6B8C1A"
      style={{
        opacity: animated ? 1 : 0,
        transform: animated ? "translateY(0)" : "translateY(20px)",
        transition: "all 0.6s cubic-bezier(0.34,1.56,0.64,1) 0.5s",
      }}
    />
  </svg>
);

const LETTERS = "AAYUBAKAWATH".split("");

export default function SplashScreen({ onFinish } = {}) {
  const [logoAnim, setLogoAnim] = useState(false);
  const [letterVisible, setLetterVisible] = useState([]);
  const [taglineVisible, setTaglineVisible] = useState(false);
  const [particlesVisible, setParticlesVisible] = useState(false);
  const [fadeOut, setFadeOut] = useState(false);
  const [done, setDone] = useState(false);

  useEffect(() => {
    const t1 = setTimeout(() => setParticlesVisible(true), 200);
    const t2 = setTimeout(() => setLogoAnim(true), 500);
    const t3 = setTimeout(() => {
      LETTERS.forEach((_, i) => {
        setTimeout(() => setLetterVisible(prev => [...prev, i]), i * 75);
      });
    }, 1300);
    const t4 = setTimeout(() => setTaglineVisible(true), 3000);
    const t5 = setTimeout(() => setFadeOut(true), 4600);
    const t6 = setTimeout(() => setDone(true), 5400);
    return () => [t1,t2,t3,t4,t5,t6].forEach(clearTimeout);
  }, []);

  useEffect(() => {
    if (done && typeof onFinish === 'function') {
      // give React a tick to unmount gracefully
      setTimeout(() => onFinish(), 10);
    }
  }, [done, onFinish]);

  if (done) {
    if (typeof onFinish === 'function') return null;
    return (
      <div style={{
        display: "flex", alignItems: "center", justifyContent: "center",
        height: "100vh", background: "#FAFAF5",
        fontFamily: "Cormorant Garamond, Georgia, serif",
        fontSize: 22, color: "#8B5E3C", letterSpacing: "0.2em"
      }}>
        ✦ Welcome to Aayubakawath ✦
      </div>
    );
  }

  const particles = Array.from({ length: 20 }, (_, i) => ({
    id: i,
    size: 3 + (i % 4) * 2,
    left: `${6 + (i * 4.7) % 88}%`,
    top: `${8 + (i * 7.1) % 82}%`,
    delay: `${(i * 0.2) % 2.2}s`,
    duration: `${3 + (i % 4)}s`,
    color: i % 3 === 0 ? "#8B1010" : i % 3 === 1 ? "#D4845A" : "#6B8C1A",
    opacity: 0.1 + (i % 5) * 0.04,
  }));

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,300;0,400;0,600;1,300;1,400&display=swap');
        @keyframes floatDot {
          0% { transform: translateY(0px) rotate(0deg); }
          100% { transform: translateY(-18px) rotate(15deg); }
        }
        @keyframes loadFill {
          from { width: 0% }
          to { width: 100% }
        }
        @keyframes spinOrbit {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }
        @keyframes breathe {
          0%, 100% { opacity: 0.5; transform: scale(1); }
          50% { opacity: 0.9; transform: scale(1.04); }
        }
      `}</style>
      <div style={{
        position: "fixed", inset: 0,
        display: "flex", flexDirection: "column",
        alignItems: "center", justifyContent: "center",
        background: "linear-gradient(150deg, #FAFAF5 0%, #F3EBDB 50%, #EAE0CC 100%)",
        overflow: "hidden",
        opacity: fadeOut ? 0 : 1,
        transition: "opacity 0.8s ease",
        zIndex: 9999,
      }}>

        {/* Ambient glow */}
        <div style={{
          position: "absolute",
          width: 500, height: 500, borderRadius: "50%",
          background: "radial-gradient(ellipse, rgba(212,132,90,0.15) 0%, rgba(139,16,16,0.07) 50%, transparent 72%)",
          transform: `scale(${logoAnim ? 1 : 0.2})`,
          transition: "transform 1.4s cubic-bezier(0.34,1.56,0.64,1)",
          pointerEvents: "none",
        }} />

        {/* Concentric rings */}
        <svg style={{
          position: "absolute", width: "100%", height: "100%",
          pointerEvents: "none",
          opacity: logoAnim ? 0.06 : 0,
          transition: "opacity 1.5s ease 0.8s",
        }} viewBox="0 0 800 600" preserveAspectRatio="xMidYMid slice">
          <circle cx="400" cy="300" r="220" stroke="#8B1010" strokeWidth="1.5" fill="none"/>
          <circle cx="400" cy="300" r="175" stroke="#D4845A" strokeWidth="1" fill="none"/>
          <circle cx="400" cy="300" r="290" stroke="#6B8C1A" strokeWidth="0.8" fill="none"/>
          <circle cx="400" cy="300" r="340" stroke="#8B1010" strokeWidth="0.5" fill="none"/>
        </svg>

        {/* Orbiting ring */}
        <div style={{
          position: "absolute",
          width: 300, height: 300,
          borderRadius: "50%",
          border: "1px dashed rgba(139,16,16,0.12)",
          animation: logoAnim ? "spinOrbit 18s linear infinite" : "none",
          opacity: logoAnim ? 1 : 0,
          transition: "opacity 1s ease 1s",
        }}>
          <div style={{
            position: "absolute", top: -4, left: "50%", marginLeft: -4,
            width: 8, height: 8, borderRadius: "50%",
            background: "#D4845A", opacity: 0.7,
          }}/>
          <div style={{
            position: "absolute", bottom: -4, left: "50%", marginLeft: -4,
            width: 6, height: 6, borderRadius: "50%",
            background: "#6B8C1A", opacity: 0.7,
          }}/>
        </div>

        {/* Floating particles */}
        {particles.map(p => (
          <div key={p.id} style={{
            position: "absolute",
            left: p.left, top: p.top,
            width: p.size, height: p.size,
            borderRadius: "50%",
            background: p.color,
            opacity: particlesVisible ? p.opacity : 0,
            transition: `opacity 1.2s ease ${p.delay}`,
            animation: particlesVisible ? `floatDot ${p.duration} ease-in-out ${p.delay} infinite alternate` : "none",
          }}/>
        ))}

        {/* Corner decorations */}
        {["top-left","top-right","bottom-left","bottom-right"].map((pos, i) => (
          <div key={pos} style={{
            position: "absolute",
            top: pos.includes("top") ? 28 : "auto",
            bottom: pos.includes("bottom") ? 28 : "auto",
            left: pos.includes("left") ? 28 : "auto",
            right: pos.includes("right") ? 28 : "auto",
            width: 40, height: 40,
            opacity: taglineVisible ? 0.3 : 0,
            transition: `opacity 0.8s ease ${0.1 * i}s`,
          }}>
            <svg viewBox="0 0 40 40" fill="none">
              <path d={pos.includes("top-left") ? "M0 20 L0 0 L20 0" :
                       pos.includes("top-right") ? "M40 20 L40 0 L20 0" :
                       pos.includes("bottom-left") ? "M0 20 L0 40 L20 40" :
                       "M40 20 L40 40 L20 40"
              } stroke="#8B1010" strokeWidth="1.5" fill="none"/>
            </svg>
          </div>
        ))}

        {/* Main content */}
        <div style={{ position: "relative", display: "flex", flexDirection: "column", alignItems: "center" }}>

          {/* Logo */}
          <div style={{
            width: 155, height: 125,
            marginBottom: 28,
            filter: "drop-shadow(0 16px 40px rgba(139,16,16,0.20))",
            opacity: logoAnim ? 1 : 0,
            transform: logoAnim ? "scale(1) translateY(0)" : "scale(0.2) translateY(30px)",
            transition: "opacity 0.8s ease, transform 1s cubic-bezier(0.34,1.56,0.64,1)",
            animation: logoAnim ? "breathe 4s ease-in-out 2s infinite" : "none",
          }}>
            <LogoSVG animated={logoAnim} />
          </div>

          {/* Brand name */}
          <div style={{ display: "flex", gap: 1, marginBottom: 20 }}>
            {LETTERS.map((letter, i) => (
              <span key={i} style={{
                fontFamily: "'Cormorant Garamond', Georgia, serif",
                fontWeight: 600,
                fontSize: "clamp(24px, 4.5vw, 42px)",
                letterSpacing: "0.22em",
                color: "#3D1A0A",
                display: "inline-block",
                opacity: letterVisible.includes(i) ? 1 : 0,
                transform: letterVisible.includes(i) ? "translateY(0) scale(1)" : "translateY(22px) scale(0.7)",
                transition: "opacity 0.5s ease, transform 0.5s cubic-bezier(0.34,1.56,0.64,1)",
                textShadow: "0 2px 14px rgba(139,16,16,0.12)",
              }}>
                {letter}
              </span>
            ))}
          </div>

          {/* Ornamental divider */}
          <div style={{
            display: "flex", alignItems: "center", gap: 12,
            marginBottom: 16,
            opacity: taglineVisible ? 1 : 0,
            transform: taglineVisible ? "scaleX(1)" : "scaleX(0)",
            transition: "opacity 0.7s ease, transform 0.7s cubic-bezier(0.34,1.56,0.64,1)",
          }}>
            <div style={{ width: 56, height: 1, background: "linear-gradient(to right, transparent, #8B1010, rgba(139,16,16,0.4))" }}/>
            <svg width="18" height="18" viewBox="0 0 18 18">
              <circle cx="9" cy="9" r="3" fill="#6B8C1A"/>
              <circle cx="9" cy="9" r="6.5" stroke="#D4845A" strokeWidth="0.8" fill="none"/>
              <circle cx="9" cy="9" r="8.5" stroke="#8B1010" strokeWidth="0.4" fill="none" strokeDasharray="2,3"/>
            </svg>
            <div style={{ width: 56, height: 1, background: "linear-gradient(to left, transparent, #8B1010, rgba(139,16,16,0.4))" }}/>
          </div>

          {/* Tagline */}
          <p style={{
            fontFamily: "'Cormorant Garamond', Georgia, serif",
            fontStyle: "italic",
            fontWeight: 300,
            fontSize: "clamp(12px, 2.2vw, 16px)",
            letterSpacing: "0.32em",
            color: "#8B5E3C",
            opacity: taglineVisible ? 1 : 0,
            transform: taglineVisible ? "translateY(0)" : "translateY(12px)",
            transition: "opacity 0.9s ease 0.3s, transform 0.9s ease 0.3s",
            textTransform: "uppercase",
            margin: 0,
          }}>
            Nature · Wellness · Harmony
          </p>
        </div>

        {/* Progress bar */}
        <div style={{
          position: "absolute", bottom: 52,
          left: "50%", transform: "translateX(-50%)",
          width: 100, height: 2,
          background: "rgba(139,16,16,0.10)",
          borderRadius: 2, overflow: "hidden",
          opacity: taglineVisible ? 1 : 0,
          transition: "opacity 0.4s ease",
        }}>
          <div style={{
            height: "100%",
            background: "linear-gradient(to right, #8B1010, #D4845A, #6B8C1A)",
            borderRadius: 2,
            animation: taglineVisible ? "loadFill 1.8s ease forwards" : "none",
          }}/>
        </div>

        {/* Byline */}
        <div style={{
          position: "absolute", bottom: 30,
          fontFamily: "'Cormorant Garamond', Georgia, serif",
          fontSize: 10, letterSpacing: "0.35em",
          color: "#A07550", textTransform: "uppercase",
          opacity: taglineVisible ? 0.55 : 0,
          transition: "opacity 0.9s ease 0.5s",
        }}>
          Crafted with Care
        </div>

      </div>
    </>
  );
}