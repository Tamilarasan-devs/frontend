import React, { useRef, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import img from '../../assets/images/q3.jpg'
import { FaLeaf, FaHeart, FaBolt } from "react-icons/fa";

/* ─── Scroll-Reveal Component ─── */
function Reveal({ children, delay = 0 }) {
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
      style={{
        opacity: visible ? 1 : 0,
        transform: visible ? "translateY(0)" : "translateY(24px)",
        transition: `opacity 0.8s cubic-bezier(.22,1,.36,1) ${delay}s, transform 0.8s cubic-bezier(.22,1,.36,1) ${delay}s`,
      }}
    >
      {children}
    </div>
  );
}

/* ─── Premium Highlight Card ─── */
function HighlightCard({ icon, title, desc, delay }) {
  return (
    <Reveal delay={delay}>
      <div className="group relative bg-white p-8 rounded-[32px] border border-stone-100 shadow-sm transition-all duration-500 hover:shadow-2xl hover:shadow-[#03349a15] hover:-translate-y-2">
        {/* Animated Badge */}
        <div className="w-14 h-14 rounded-2xl mb-6 flex items-center justify-center text-xl transition-all duration-500 group-hover:scale-110 group-hover:rotate-3"
             style={{ background: "linear-gradient(135deg, #03349a, #0145cc)", color: "white", boxShadow: "0 8px 20px rgba(3,52,154,0.2)" }}>
          {icon}
        </div>
        
        <h3 className="text-xl font-bold mb-3 transition-all duration-300 bg-gradient-to-r from-[#1a0a0a] via-[#03349a] to-[#c9643a] bg-clip-text text-transparent group-hover:scale-105">
          {title}
        </h3>
        <p className="text-stone-600 text-[15px] leading-relaxed font-medium">
          {desc}
        </p>

        {/* Decorative corner accent */}
        <div className="absolute top-0 right-0 w-24 h-24 bg-gradient-to-br from-[#c9643a08] to-transparent opacity-0 transition-opacity duration-500 group-hover:opacity-100 rounded-tr-[32px]" />
      </div>
    </Reveal>
  );
}

export default function OurStory() {
  const navigate = useNavigate();

  return (
    
    <div className="w-full bg-white text-stone-800">
      <style>
      {`        .shim-btn{background:linear-gradient(90deg,var(--red),var(--amber),#c2410c,var(--red));background-size:200% auto;animation:shim 3s linear infinite;}`}
    </style>
      {/* Hero Section */}
      <div className="max-w-7xl mx-auto px-6 py-16 grid md:grid-cols-2 gap-10 items-center">
        
        {/* Left Content */}
        <div className="space-y-6">
          <h1 className="text-4xl md:text-5xl font-bold leading-tight flex flex-col items-start gap-2">
            <div>
              <span className="bg-gradient-to-r from-[#1a0a0a] via-[#03349a] to-[#c9643a] bg-clip-text text-transparent">Our Roots</span>
            </div>
            <div className="w-20 h-1 rounded-full bg-gradient-to-r from-[#03349a] to-[#c9643a]" />
          </h1>

          <p className="text-lg text-stone-600">
            Founded on a simple, powerful vision.
          </p>

          <p className="text-stone-600 text-[18px] leading-relaxed">
            Aayubakwath was founded to support healthier lives through natural
            wellness solutions. In today's fast-paced world, people face
            increasing health challenges — unstable blood sugar, high
            cholesterol, mental fatigue, poor concentration in children, and
            general lifestyle-related issues.
          </p>

          <p className="text-stone-600 leading-relaxed">
            Our mission is to bring balance back to everyday life using trusted,
            natural ingredients and time-tested practices.
          </p>

          {/* CTA Button */}
          <button
            onClick={() => navigate("/aboutpage")}
             className="flex-1 shim-btn flex items-center justify-center gap-2 px-6 py-3 text-sm rounded-full font-bold uppercase tracking-widest text-white transition-colors duration-300"
              style={{ boxShadow: "0 12px 28px rgba(3,52,154,0.3)" }}
          >
            Learn More About Us →
          </button>
        </div>

        {/* Right Image */}
        <div className="relative">
          <img
            src={img}
            alt="natural wellness"
            className="w-full h-[400px] object-cover rounded-2xl shadow-sm"
          />

          {/* Decorative Badge */}
          <div className="absolute bottom-4 left-4 bg-white/90 backdrop-blur px-4 py-2 rounded-full text-sm font-semibold shadow">
            Natural • Trusted • Effective
          </div>
        </div>
      </div>

      {/* Highlight Section */}
      <div className="bg-stone-50 py-20">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid md:grid-cols-3 gap-8">
            <HighlightCard 
              icon={<FaLeaf />} 
              title="Natural Ingredients" 
              desc="Carefully selected for purity and effectiveness, ensuring you get only what nature intended."
              delay={0}
            />
            <HighlightCard 
              icon={<FaHeart />} 
              title="Holistic Wellness" 
              desc="Our formulations support both body and mind, bringing balance back to your everyday life."
              delay={0.15}
            />
            <HighlightCard 
              icon={<FaBolt />} 
              title="Modern Lifestyle Fit" 
              desc="Convenient solutions designed to thrive in today’s fast-paced, high-pressure world."
              delay={0.3}
            />
          </div>
        </div>
      </div>

    </div>
  );
}