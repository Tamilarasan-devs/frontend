import React, { useState, useEffect, useRef } from "react";
import img from "../assets/images/banner1.jpg";
import mission from '../assets/images/mission.jpg';
import vision from '../assets/images/vission.jpg';
import FeaturesSection from "./AboutCard";
import bnr from '../assets/images/bn.png';
import img0 from '../assets/images/emp.png';
import img1 from '../assets/images/cont.png';
import img2 from '../assets/images/the.png';
import img3 from '../assets/images/ com.png';

/* ── useInView hook for scroll-triggered animations ── */
function useInView(threshold = 0.15) {
  const ref = useRef(null);
  const [visible, setVisible] = useState(false);
  useEffect(() => {
    const obs = new IntersectionObserver(
      ([e]) => { if (e.isIntersecting) { setVisible(true); obs.disconnect(); } },
      { threshold }
    );
    if (ref.current) obs.observe(ref.current);
    return () => obs.disconnect();
  }, [threshold]);
  return [ref, visible];
}

/* ── Reveal wrapper ── */
function Reveal({ children, delay = 0, className = "" }) {
  const [ref, visible] = useInView();
  return (
    <div
      ref={ref}
      className={className}
      style={{
        opacity: visible ? 1 : 0,
        transform: visible ? "translateY(0)" : "translateY(32px)",
        transition: `opacity 0.7s ease ${delay}s, transform 0.7s ease ${delay}s`,
      }}
    >
      {children}
    </div>
  );
}

/* ── Section Label ── */
function Label({ text }) {
  return (
    <p className="text-xs font-black tracking-[0.3em] uppercase text-[#c9643a] mb-3 flex items-center gap-3">
      <span className="w-6 h-px bg-[#c9643a] inline-block" />
      {text}
      <span className="w-6 h-px bg-[#c9643a] inline-block" />
    </p>
  );
}

/* ── Decorative divider ── */
function Divider() {
  return (
    <div className="flex items-center justify-center gap-2 my-6">
      <div className="w-12 h-px bg-[#820c0c] opacity-30" />
      <div className="w-2 h-2 rounded-full bg-[#c9643a] opacity-60" />
      <div className="w-2 h-2 rounded-full bg-[#820c0c]" />
      <div className="w-2 h-2 rounded-full bg-[#c9643a] opacity-60" />
      <div className="w-12 h-px bg-[#820c0c] opacity-30" />
    </div>
  );
}

/* ── Products data ── */
const products = [
  { icon: "🩸", name: "Blood Sugar Balance",       desc: "Supports healthy glucose metabolism and insulin function with powerful herbal extracts." },
  { icon: "💚", name: "Blood Cholesterol Balance",  desc: "Supports lipid metabolism and cardiovascular wellness with botanical ingredients." },
  { icon: "🧠", name: "Brain Tonic & Vitality Plus", desc: "Enhances memory, focus, and cognitive clarity using natural nootropic herbs." },
  { icon: "⚡", name: "Vitality Power Plus",         desc: "Boosts stamina, energy levels, and overall vitality with adaptogenic herbs." },
  { icon: "🌿", name: "General Health",              desc: "Supports overall well-being with essential daily herbal nutrients." },
];

/* ── Story items ── */
const storyItems = [
  { img: img0, title: "Centrum India Vision",    sub: "TAILORED NUTRITION FOR EVERY LIFE STAGE",   p1: "It all started with a vision to develop a comprehensive multivitamin that meets the unique nutritional needs of individuals across different stages of life.", p2: "Backed by extensive research and collaboration with top experts, we created Centrum — a brand trusted by millions worldwide." },
  { img: img1, title: "Continuous Evolution",    sub: "ADVANCING SCIENCE FOR YOUR WELL-BEING",     p1: "Our journey has been one of continuous evolution and refinement. We strive to stay at the forefront of scientific advancements, incorporating the latest discoveries.", p2: "Each product is carefully crafted to deliver vital vitamins, minerals, and nutrients your body needs to thrive." },
  { img: img2, title: "Empowering Your Wellness", sub: "KNOWLEDGE & SUPPORT FOR YOUR JOURNEY",    p1: "Our mission goes beyond just providing high-quality supplements — we empower you with knowledge and support to make informed choices for your health.", p2: "Through educational resources, expert advice, and a strong community, we inspire and guide your wellness journey." },
  { img: img3, title: "Commitment To Quality",   sub: "TRUSTWORTHY FORMULATIONS FOR YOU",          p1: "Centrum is more than just a brand — it's a trusted partner. We are committed to your well-being, ensuring products are safe, effective, and quality-backed.", p2: "With Centrum, you can feel confident nourishing your body and unlocking your full potential." },
];

/* ── Why choose us items ── */
const whyItems = [
  "Premium quality herbal ingredients",
  "Scientifically designed formulations",
  "Manufactured under quality-controlled environment",
  "Safe & convenient capsule format",
  "Made in India",
];

/* ── Commitment disclaimers ── */
const commitItems = [
  "Not intended to replace a balanced diet",
  "Not for medicinal use",
  "Recommended to be taken as per suggested usage",
];

/* ═══════════════════════════════════════════════════════════ */
export default function About() {
  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,400;0,500;0,600;0,700;1,400;1,600&family=Jost:wght@300;400;500;600;700;800&display=swap');

   

        @keyframes heroFade {
          from { opacity: 0; transform: scale(1.04); }
          to   { opacity: 1; transform: scale(1); }
        }
        @keyframes slideUp {
          from { opacity: 0; transform: translateY(40px); }
          to   { opacity: 1; transform: translateY(0); }
        }
        @keyframes shimmer {
          0%   { background-position: -200% center; }
          100% { background-position: 200% center; }
        }

        .hero-img { animation: heroFade 1.2s ease forwards; }
        .hero-text { animation: slideUp 0.9s ease 0.4s both; }

        .gradient-text {
          background: linear-gradient(135deg, #820c0c 0%, #c9643a 50%, #820c0c 100%);
          background-size: 200% auto;
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
          animation: shimmer 4s linear infinite;
        }

        .leaf-bg {
          background-image: radial-gradient(circle at 20% 50%, rgba(130,12,12,0.04) 0%, transparent 50%),
                            radial-gradient(circle at 80% 20%, rgba(201,100,58,0.05) 0%, transparent 50%);
        }

        .card-hover {
          transition: transform 0.4s cubic-bezier(.22,.68,0,1.2), box-shadow 0.4s ease;
        }
        .card-hover:hover {
          transform: translateY(-8px);
          box-shadow: 0 32px 64px rgba(130,12,12,0.12);
        }

        .story-img {
          transition: transform 0.6s cubic-bezier(.22,.68,0,1.2);
        }
        .story-img:hover { transform: scale(1.03); }

        .accent-bar {
          display: inline-block;
          width: 48px; height: 3px;
          background: linear-gradient(to right, #820c0c, #c9643a);
          border-radius: 99px;
        }
      `}</style>

      <div className="about-page bg-[#fefbf6] text-gray-800 overflow-x-hidden">

        {/* ══════════ HERO ══════════ */}
        <section className="relative h-[65vh] min-h-[420px] overflow-hidden">
          <img src={bnr} alt="About Banner" className="hero-img w-full h-full object-cover" />
          {/* Gradient overlay */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent" />
          {/* Hero text */}
          <div className="hero-text absolute bottom-0 left-0 right-0 px-8 pb-14 text-center">
            <Label text="Our Story" />
            <h1 className="display-font text-5xl md:text-7xl font-bold text-white leading-tight drop-shadow-xl">
              Aayubakawath
            </h1>
            <p className="text-white/80 text-lg mt-3 font-light tracking-widest uppercase">
              Rooted in Nature · Backed by Science
            </p>
          </div>
        </section>

        {/* Features */}
        <FeaturesSection />

        {/* ══════════ ABOUT INTRO ══════════ */}
        <section className="leaf-bg py-28 px-6">
          <div className="max-w-5xl mx-auto">
            <Reveal className="text-center mb-16">
              <Label text="Who We Are" />
              <h2 className="display-font text-5xl md:text-6xl font-bold leading-tight">
                <span className="gradient-text">About Aayubakawath</span>
              </h2>
              <Divider />
            </Reveal>

            <div className="grid md:grid-cols-2 gap-10">
              <Reveal delay={0.1}>
                <div className="bg-white rounded-3xl p-10 shadow-[0_4px_32px_rgba(130,12,12,0.07)] border border-[#f0e4d4] h-full card-hover">
                  <div className="w-10 h-10 rounded-2xl bg-gradient-to-br from-[#820c0c]/10 to-[#c9643a]/15 flex items-center justify-center text-xl mb-6">🌿</div>
                  <p className="text-gray-700 leading-relaxed text-lg">
                    <span className="font-bold text-[#820c0c]">Aayubakawath</span> was created with a simple mission — to provide high-quality, science-backed, and herbal-based nutritional supplements that help people maintain a healthy and balanced lifestyle.
                  </p>
                </div>
              </Reveal>

              <Reveal delay={0.2}>
                <div className="bg-white rounded-3xl p-10 shadow-[0_4px_32px_rgba(130,12,12,0.07)] border border-[#f0e4d4] h-full card-hover">
                  <div className="w-10 h-10 rounded-2xl bg-gradient-to-br from-[#820c0c]/10 to-[#c9643a]/15 flex items-center justify-center text-xl mb-6">⚗️</div>
                  <p className="text-gray-700 leading-relaxed text-lg">
                    All products are manufactured by <span className="font-bold text-[#820c0c]">Sri Bhakawath Life Science</span>, ensuring quality production standards and safe ingredient sourcing. Our supplements are designed to bridge the nutritional gap of modern lifestyles.
                  </p>
                </div>
              </Reveal>
            </div>
          </div>
        </section>

        {/* ══════════ STORY SECTIONS (alternating) ══════════ */}
        <section className="py-24 bg-white">
          <div className="max-w-6xl mx-auto px-6 space-y-28">
            {storyItems.map((item, i) => (
              <Reveal key={i} delay={0.05}>
                <div className={`flex flex-col ${i % 2 === 1 ? "md:flex-row-reverse" : "md:flex-row"} items-center gap-14`}>
                  {/* Image */}
                  <div className="w-full md:w-1/2 flex-shrink-0">
                    <div className="relative overflow-hidden rounded-[32px] ">
                      <img
                        src={item.img}
                        alt={item.title}
                        className=" w-full  h-full"
                      />
                      {/* Corner accent */}
                      {/* <div className={`absolute top-0 ${i % 2 === 1 ? "left-0 rounded-tl-[32px]" : "right-0 rounded-tr-[32px]"} w-20 h-20 bg-gradient-to-br from-[#820c0c]/20 to-transparent`} /> */}
                    </div>
                  </div>
                  {/* Text */}
                  <div className="md:w-1/2 space-y-5">
                    <p className="text-[25px] font-black tracking-[0.35em] text-[#c9643a] uppercase">{item.sub}</p>
                    <h2 className="display-font text-4xl md:text-5xl font-bold leading-tight gradient-text">
                      {item.title}
                    </h2>
                    <span className="accent-bar" />
                    <p className="text-gray-700 text-lg leading-relaxed">{item.p1}</p>
                    <p className="text-gray-500 text-base leading-relaxed">{item.p2}</p>
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
        </section>

        {/* ══════════ MISSION & VISION ══════════ */}
        <section className="bg-[#f5ede0] py-28 px-6">
          <div className="max-w-6xl mx-auto space-y-24">

            {/* MISSION */}
            <Reveal>
              <div className="grid md:grid-cols-2 gap-14 items-center">
                <div className="relative overflow-hidden rounded-[28px] shadow-xl">
                  <img src={mission} alt="Mission" className="story-img w-full h-[380px] object-cover" />
                  <div className="absolute inset-0 bg-gradient-to-tr from-[#820c0c]/20 to-transparent pointer-events-none" />
                </div>
                <div>
                  <Label text="Our Purpose" />
                  <h2 className="display-font text-4xl md:text-5xl font-bold text-[#820c0c] mb-2">Our Mission</h2>
                  <span className="accent-bar mb-6 block" />
                  <p className="text-lg leading-relaxed mb-5 text-gray-800">
                    Aayubakawath was created to provide science-backed, herbal-based nutritional supplements that help individuals maintain a healthy and balanced lifestyle.
                  </p>
                  <p className="text-gray-600 leading-relaxed">
                    Manufactured by Sri Bhakawath Life Science, our products follow strict quality standards and safe ingredient sourcing to ensure reliability and trust.
                  </p>
                </div>
              </div>
            </Reveal>

            {/* VISION */}
            <Reveal>
              <div className="grid md:grid-cols-2 gap-14 items-center">
                <div className="order-2 md:order-1">
                  <Label text="Our Future" />
                  <h2 className="display-font text-4xl md:text-5xl font-bold text-[#820c0c] mb-2">Our Vision</h2>
                  <span className="accent-bar mb-6 block" />
                  <p className="text-lg leading-relaxed mb-5 text-gray-800">
                    Our vision is to become a trusted leader in herbal wellness by delivering innovative, safe, and effective nutritional solutions for modern lifestyles.
                  </p>
                  <p className="text-gray-600 leading-relaxed">
                    We aim to empower individuals to take control of their well-being through thoughtfully designed supplements rooted in tradition and backed by science.
                  </p>
                </div>
                <div className="order-1 md:order-2 relative overflow-hidden rounded-[28px] shadow-xl">
                  <img src={vision} alt="Vision" className="story-img w-full h-[380px] object-cover" />
                  <div className="absolute inset-0 bg-gradient-to-tl from-[#820c0c]/20 to-transparent pointer-events-none" />
                </div>
              </div>
            </Reveal>
          </div>
        </section>

        {/* ══════════ PRODUCT RANGE ══════════ */}
        <section className="py-28 px-6 bg-white leaf-bg">
          <div className="max-w-6xl mx-auto">
            <Reveal className="text-center mb-16">
              <Label text="What We Offer" />
              <h2 className="display-font text-5xl font-bold gradient-text">Our Product Range</h2>
              <Divider />
              <p className="text-gray-500 text-lg mt-2">Specialized formulations supporting key health areas</p>
            </Reveal>

            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {products.map((p, i) => (
                <Reveal key={i} delay={i * 0.07}>
                  <ProductCard {...p} />
                </Reveal>
              ))}
            </div>
          </div>
        </section>

        {/* ══════════ WHY CHOOSE US ══════════ */}
        <section className="py-28 px-6 bg-[#fefbf6]">
          <div className="max-w-6xl mx-auto grid md:grid-cols-2 gap-16 items-center">
            <Reveal>
              <div>
                <Label text="Our Advantage" />
                <h2 className="display-font text-4xl md:text-5xl font-bold text-[#820c0c] mb-2">
                  Why Choose Aayubakawath?
                </h2>
                <span className="accent-bar mb-8 block" />
                <ul className="space-y-4">
                  {whyItems.map((item, i) => (
                    <li key={i} className="flex items-center gap-4 group">
                      <span className="flex-shrink-0 w-7 h-7 rounded-full bg-gradient-to-br from-[#820c0c] to-[#c9643a] flex items-center justify-center text-white text-xs font-bold shadow-md group-hover:scale-110 transition-transform">✓</span>
                      <span className="text-gray-700 text-lg group-hover:text-[#820c0c] transition-colors">{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </Reveal>

            <Reveal delay={0.15}>
              <div className="relative overflow-hidden rounded-[32px] shadow-[0_20px_60px_rgba(130,12,12,0.12)]">
                <img
                  src="https://media.istockphoto.com/id/858309414/photo/why-choose-us.jpg?s=612x612&w=0&k=20&c=eagefEzm_QPMo3WFaDwlxqSA3qnfDTxN2PFuKhxuSac="
                  alt="Wellness"
                  className="story-img w-full h-[420px] object-cover"
                />
                {/* Floating badge */}
                <div className="absolute bottom-6 left-6 bg-white/90 backdrop-blur-sm rounded-2xl px-5 py-3 shadow-lg border border-[#f0e4d4]">
                  <p className="text-[#820c0c] font-bold text-sm">🌿 Made in India</p>
                  <p className="text-gray-500 text-xs mt-0.5">Herbal · Natural · Trusted</p>
                </div>
              </div>
            </Reveal>
          </div>
        </section>

        {/* ══════════ COMMITMENT ══════════ */}
        <section className="py-28 px-6 bg-gradient-to-br from-[#f5ede0] to-[#fef9f3]">
          <div className="max-w-6xl mx-auto grid md:grid-cols-2 gap-16 items-start">

            <Reveal>
              <div>
                <Label text="Quality Assurance" />
                <h2 className="display-font text-4xl md:text-5xl font-bold text-[#820c0c] mb-2">
                  Our Commitment<br />to Quality
                </h2>
                <span className="accent-bar mb-8 block" />
                <p className="text-gray-700 leading-relaxed text-lg mb-6">
                  We follow strict quality guidelines during sourcing, formulation, and manufacturing. Every batch is produced with hygiene, consistency, and care to ensure premium standards.
                </p>
                {/* Stats */}
                <div className="grid grid-cols-3 gap-4 mt-8">
                  {[["100%", "Natural"], ["GMP", "Certified"], ["0", "Compromise"]].map(([num, lbl]) => (
                    <div key={lbl} className="bg-white rounded-2xl p-5 text-center shadow-sm border border-[#f0e4d4] card-hover">
                      <p className="display-font text-3xl font-bold text-[#820c0c]">{num}</p>
                      <p className="text-gray-500 text-xs mt-1 uppercase tracking-widest">{lbl}</p>
                    </div>
                  ))}
                </div>
              </div>
            </Reveal>

            <Reveal delay={0.15}>
              <div>
                <h3 className="display-font text-3xl font-semibold text-[#820c0c] mb-2">Our Products Are:</h3>
                <span className="accent-bar mb-8 block" />
                <div className="space-y-4">
                  {commitItems.map((item, i) => (
                    <div
                      key={i}
                      className="bg-white rounded-2xl p-6 border border-[#f0e4d4] shadow-sm card-hover flex items-start gap-4"
                    >
                      <span className="flex-shrink-0 w-8 h-8 rounded-xl bg-gradient-to-br from-[#820c0c]/10 to-[#c9643a]/15 flex items-center justify-center text-[#820c0c] font-bold text-sm">
                        {String(i + 1).padStart(2, "0")}
                      </span>
                      <p className="text-gray-700 leading-relaxed pt-0.5">{item}</p>
                    </div>
                  ))}
                </div>
              </div>
            </Reveal>
          </div>
        </section>

      </div>
    </>
  );
}

/* ── Product Card ── */
function ProductCard({ icon, name, desc }) {
  const [hov, setHov] = useState(false);
  return (
    <div
      onMouseEnter={() => setHov(true)}
      onMouseLeave={() => setHov(false)}
      className="bg-white rounded-3xl p-8 border border-[#f0e4d4] relative overflow-hidden cursor-default card-hover"
      style={{ boxShadow: hov ? "0 24px 56px rgba(130,12,12,0.1)" : "0 2px 16px rgba(0,0,0,0.04)" }}
    >
      {/* Animated left accent bar */}
      <div
        className="absolute top-0 left-0 w-[3px] rounded-r-full bg-gradient-to-b from-[#820c0c] to-[#c9643a]"
        style={{ height: hov ? "100%" : "0%", transition: "height 0.4s ease" }}
      />
      {/* Icon */}
      <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-[#820c0c]/08 to-[#c9643a]/12 flex items-center justify-center text-2xl mb-5 border border-[#f0e4d4]">
        {icon}
      </div>
      {/* Name */}
      <h3
        className="font-['Cormorant_Garamond'] text-xl font-bold mb-3 leading-snug"
        style={{ color: "#820c0c" }}
      >
        {name}
      </h3>
      {/* Desc */}
      <p className="text-gray-500 text-sm leading-relaxed">{desc}</p>
      {/* Bottom hover line */}
      <div
        className="absolute bottom-0 left-6 h-[2px] rounded-full bg-gradient-to-r from-[#820c0c] to-[#c9643a]"
        style={{ width: hov ? "calc(100% - 48px)" : "0%", transition: "width 0.4s ease" }}
      />
    </div>
  );
}