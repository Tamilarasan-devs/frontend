import React, { useState, useEffect, useRef } from "react";
import img from "../assets/images/banner1.jpg";
import mission from '../assets/images/fam.jpeg';
import vision from '../assets/images/oldpa.jpeg';
import FeaturesSection from "./AboutCard";
// import bnr from '../assets/images/bn.png';
import img0 from '../assets/images/bo.jpg';
import img1 from '../assets/images/nat.jpeg';
import img2 from '../assets/images/resr.jpeg';
import img3 from '../assets/images/resar.jpeg';
import {  useNavigate} from 'react-router-dom'
import OurBusiness from "./AboutPage";
import AboutAayubakwath from "./AboutAaya";
import bnr from '../assets/images/abtUs.jpg'
import { Helmet } from "react-helmet-async";

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
      <div className="w-12 h-px bg-[#03349a] opacity-30" />
      <div className="w-2 h-2 rounded-full bg-[#c9643a] opacity-60" />
      <div className="w-2 h-2 rounded-full bg-[#03349a]" />
      <div className="w-2 h-2 rounded-full bg-[#c9643a] opacity-60" />
      <div className="w-12 h-px bg-[#03349a] opacity-30" />
    </div>
  );
}

/* ── Products data ── */
const products = [
  {
    icon: "🩸",
    name: "Blood Sugar Balance",
    desc: "Supports healthy blood glucose levels and metabolic balance for sustained energy.",
  },
  {
    icon: "💚",
    name: "Blood Cholesterol Balance",
    desc: "Promotes heart health and supports maintaining healthy cholesterol levels.",
  },
  {
    icon: "🧠",
    name: "Vitality Power Plus",
    desc: "Enhances focus, memory, and cognitive performance in adults.",
  },
  {
    icon: "👶",
    name: "Brain Tonic",
    desc: "Supports memory, concentration, and cognitive development in children.",
  },
  {
    icon: "🌿",
    name: "General Health",
    desc: "Supports immunity, vitality, and overall body balance for daily wellness.",
  },
];

/* ── Story items ── */
const storyItems = [
  {
    img: img0,
    title: "Our Beginning",
    sub: "A VISION FOR BETTER HEALTH",
    p1: "Aayubakwath was founded with a simple yet powerful vision: to support healthier lives through natural wellness solutions in today’s fast-paced world.",
    p2: "We focus on addressing common health concerns like blood sugar imbalance, cholesterol issues, and mental fatigue through carefully developed supplements.",
  },
  {
    img: img1,
    title: "Our Philosophy",
    sub: "NATURAL & SCIENCE-BACKED",
    p1: "We believe the right combination of nutrition, natural ingredients, and scientific formulation can restore balance and improve overall well-being.",
    p2: "Our approach combines traditional wellness knowledge with modern nutritional science.",
  },
  {
    img: img2,
    title: "Empowering Wellness",
    sub: "SUPPORTING HEALTHIER LIFESTYLES",
    p1: "Our mission is to empower individuals and families to take control of their health through safe and effective supplements.",
    p2: "We aim to support daily energy, mental clarity, and long-term wellness.",
  },
  {
    img: img3,
    title: "Our Promise of purity",
    sub: "Trustworthy standards",
    p1: "We are committed to providing high-quality supplements made with carefully selected ingredients.",
    p2: "Every product is developed to meet high standards of safety, effectiveness, and reliability.",
  },
];

/* ── Why choose us items ── */
const whyItems = [
  "High-quality health supplements",
  "Thoughtfully developed wellness formulas",
  "Reliable and trustworthy products",
  "Support for modern lifestyle health needs",
  "Customer-focused health solutions",
];

/* ── Commitment disclaimers ── */
const commitItems = [
  "Made with high-quality ingredients",
  "Developed with scientific formulation standards",
  "Focused on safety, quality, and effectiveness",
];
const cards = [
  {
    title: "High-Quality Supplements",
    desc: "We use carefully selected ingredients to ensure premium quality and effectiveness.",
  },
  {
    title: "Scientifically Formulated",
    desc: "Our products are developed using research-backed formulations for better results.",
  },
  {
    title: "Trusted & Reliable",
    desc: "We focus on transparency and consistency to build long-term customer trust.",
  },
  {
    title: "Lifestyle Support",
    desc: "Designed to support modern health challenges like stress, fatigue, and imbalance.",
  },
];

/* ═══════════════════════════════════════════════════════════ */
export default function About() {
  const navigate = useNavigate()
    const [visible, setVisible] = useState(false);
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
          background: linear-gradient(135deg, #03349a 0%, #c9643a 50%, #03349a 100%);
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
          background: linear-gradient(to right, #03349a, #c9643a);
          border-radius: 99px;
        }
      `}</style>

      <div className="about-page bg-[#fefbf6] text-gray-800 overflow-x-hidden">

<Helmet>
          <title>About Us - Aayubakwath</title>
</Helmet>
        {/* ══════════ HERO ══════════ */}
      <section className="relative w-full overflow-hidden">
  {/* Background image */}
  <div className="relative">
    <img
      src={bnr}
      alt="About Banner"
      loading="lazy"
      className="w-full h-full  object-cover"
/>

  </div>
</section>

        {/* Features */}
        <FeaturesSection />
<OurBusiness/>
        {/* ══════════ ABOUT INTRO ══════════ */}
<AboutAayubakwath/>

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
                      {/* <div className={`absolute top-0 ${i % 2 === 1 ? "left-0 rounded-tl-[32px]" : "right-0 rounded-tr-[32px]"} w-20 h-20 bg-gradient-to-br from-[#03349a]/20 to-transparent`} /> */}
                    </div>
                  </div>
                  {/* Text */}
                  <div className="md:w-1/2 space-y-5">
                    <p className="text-[25px] font-black tracking-[0.35em] text-[#c9643a] uppercase">{item.sub}</p>
                    <h2 className="display-font text-4xl md:text-5xl font-bold leading-tight gradient-text">
                      {item.title}
                    </h2>
                    <span className="accent-bar" />
                    <p className="text-gray-800 text-lg font-semibold leading-relaxed">{item.p1}</p>
                    <p className="text-gray-800 text-md font-semibold leading-relaxed">{item.p2}</p>
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
        </section>

       {/* ══════════ MISSION & VISION - DIAGONAL PREMIUM STYLE ══════════ */}
<section className="relative py-32 bg-[#f5ede0] overflow-hidden">

  {/* Background Decoration */}
  <div className="absolute top-0 left-0 w-full h-1/2 bg-white -skew-y-3 origin-top-left"></div>

  <div className="relative max-w-7xl mx-auto px-6 space-y-32">

    {/* MISSION */}
    <div className="grid md:grid-cols-2 gap-16 items-center">

      {/* Image */}
      <div className="relative">
        <img
          src={mission}
          alt="Mission"
          className="rounded-[30px] shadow-2xl h-[420px] w-full object-cover"
        />

        <div className="absolute -bottom-10 -right-10 bg-white p-8 rounded-2xl shadow-xl max-w-sm">
          <span className="text-sm text-[#03349a] font-semibold tracking-wider">
            OUR PURPOSE
          </span>

          <h2 className="text-3xl font-bold text-[#03349a] mt-2 display-font">
            Our Mission
          </h2>

          <p className="text-gray-800 font-semibold  mt-4 leading-relaxed">
         At Aayubakwath, our mission is centered around three core values:
          </p>
        </div>
      </div>

      {/* Text */}
      <div>
        <h3 className="text-4xl font-bold text-[#03349a] mb-6 display-font">
        At Aayubakwath, our mission is centered around three core values:
        </h3>

        <p className="text-gray-800 text-lg font-semibold leading-relaxed mb-6">
        Quality – Deliver premium health supplements made with carefully selected ingredients.
        </p>

        <p className="text-gray-800 font-semibold  leading-relaxed mb-6">
 Trust – Build long-term trust with customers through transparency and reliability.
        </p>
        <p className="text-gray-800 font-semibold  leading-relaxed">
Wellness – Support healthier lifestyles through effective nutritional support.

        </p>
      </div>

    </div>


    {/* VISION */}
    <div className="grid md:grid-cols-2 gap-16 items-center">

      {/* Text */}
      <div className="order-2 md:order-1">
        <h3 className="text-4xl font-bold text-[#03349a] mb-6 display-font">
          Shaping the Future of Herbal Wellness
        </h3>

        <p className="text-gray-800  text-lg font-semibold leading-relaxed mb-6">
         Our vision is to become a trusted wellness brand in India and globally, known for providing reliable and high-quality nutritional supplements that support long-term health.
        </p>

        <p className="text-gray-800 font-semibold  leading-relaxed">
         We strive to empower people with natural health solutions that help maintain energy, improve mental clarity, and support vital body functions.
        </p>
      </div>

      {/* Image */}
      <div className="relative order-1 md:order-2">
        <img
          src={vision}
          alt="Vision"
          className="rounded-[30px] shadow-2xl h-[420px] w-full object-cover"
        />

        <div className="absolute -bottom-10 -left-10 bg-white p-8 rounded-2xl shadow-xl max-w-sm">
          <span className="text-sm text-[#03349a] font-semibold tracking-wider">
            OUR FUTURE
          </span>

          <h2 className="text-3xl font-bold text-[#03349a] mt-2 display-font">
            Our Vision
          </h2>

          <p className="text-gray-800 font-semibold  mt-4 leading-relaxed">
            Providing safe, effective, and high-quality health supplements that support everyday health needs for individuals and families.
          </p>
        </div>
      </div>

    </div>

  </div>
</section>

        {/* ══════════ PRODUCT RANGE ══════════ */}
        <section className="py-28 px-6 bg-white leaf-bg">
          <div className="max-w-6xl mx-auto">
            <Reveal className="text-center mb-16">
              {/* <Label text="What We Offer" /> */}
              <h2 className=" text-2xl sm:text-3xl font-bold text-center gradient-text mb-2">What We Offer</h2>
              <h2 className=" text-2xl sm:text-3xl font-semibold text-center  text-black">Our Product Range</h2>
              <Divider />
              <p className="text-gray-800 text-lg mt-2 font-semibold">Specialized formulations supporting key health areas</p>
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




      <style>
        {`
        @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:wght@700&family=DM+Sans:wght@400;500;600&display=swap');

        .ob-section {
          background: #f0f4f8;
          padding: 72px 24px 80px;
          font-family: 'DM Sans', sans-serif;
        }

        .ob-heading {
          font-family: 'Playfair Display', serif;
          font-size: 2.4rem;
          font-weight: 700;
          text-align: center;
          color: #111;
          margin-bottom: 8px;
          letter-spacing: -0.01em;
        }

        .ob-underline {
          width: 56px;
          height: 4px;
          background: linear-gradient(90deg, #1565C0, #42a5f5);
          border-radius: 4px;
          margin: 0 auto 56px;
        }

        .ob-grid {
          display: flex;
          gap: 28px;
          justify-content: center;
          flex-wrap: wrap;
          max-width: 1100px;
          margin: 0 auto;
        }

        /* === CARD === */
        .ob-card {
          width: 220px;
          cursor: pointer;
          transform: translateY(0px);
          transition: transform 0.4s cubic-bezier(0.34, 1.56, 0.64, 1);
          position: relative;
        }

        .ob-card:hover {
          transform: translateY(-14px);
        }

        /* The pill shape */
        .ob-pill {
          width: 220px;
          border-radius: 50% 50% 50% 50% / 38% 38% 62% 62%;
          overflow: visible;
          position: relative;
        }

        /* Circular image */
        .ob-img-wrap {
          width: 200px;
          height: 200px;
          border-radius: 50%;
          overflow: hidden;
          margin: 0 auto;
          border: 6px solid white;
          box-shadow: 0 8px 32px rgba(21,101,192,0.18);
          position: relative;
          z-index: 2;
          transition: box-shadow 0.3s ease;
        }

        .ob-card:hover .ob-img-wrap {
          box-shadow: 0 16px 48px rgba(21,101,192,0.32);
        }

        .ob-img-wrap img {
          width: 100%;
          height: 100%;
          object-fit: cover;
          transition: transform 0.5s ease;
        }

        .ob-card:hover .ob-img-wrap img {
          transform: scale(1.08);
        }

        /* Yellow accent arc on top of some cards */
        .ob-arc {
          position: absolute;
          top: 10px;
          left: 0;
          right: 0;
          display: flex;
          justify-content: space-between;
          padding: 0 4px;
          z-index: 3;
          pointer-events: none;
        }

        .ob-arc-dot {
          width: 10px;
          height: 30px;
          background: #f5a623;
          border-radius: 8px;
          opacity: 0.9;
        }

        /* Blue bottom body */
        .ob-body {
          background: linear-gradient(175deg, #1e88e5 0%, #1565C0 55%, #0d47a1 100%);
          border-radius: 0 0 120px 120px;
          margin-top: -90px;
          padding-top: 104px;
          padding-bottom: 36px;
          text-align: center;
          position: relative;
          z-index: 1;
          box-shadow: 0 10px 40px rgba(21,101,192,0.25);
          transition: background 0.3s ease, box-shadow 0.3s ease;
        }

        .ob-card:hover .ob-body {
          background: linear-gradient(175deg, #2196f3 0%, #1565C0 55%, #0a3880 100%);
          box-shadow: 0 20px 56px rgba(21,101,192,0.38);
        }

        .ob-title {
          font-family: 'Playfair Display', serif;
          font-size: 1.08rem;
          font-weight: 700;
          color: white;
          padding: 0 16px;
          line-height: 1.35;
          min-height: 48px;
          display: flex;
          align-items: center;
          justify-content: center;
        }

        /* Arrow button */
        .ob-arrow {
          width: 44px;
          height: 44px;
          border-radius: 50%;
          border: 2.5px solid rgba(255,255,255,0.35);
          background: rgba(255,255,255,0.1);
          color: white;
          font-size: 1.1rem;
          display: flex;
          align-items: center;
          justify-content: center;
          margin: 14px auto 0;
          cursor: pointer;
          transition: background 0.25s ease, border-color 0.25s ease, transform 0.25s ease;
          backdrop-filter: blur(4px);
        }

        .ob-card:hover .ob-arrow {
          background: rgba(255,255,255,0.22);
          border-color: rgba(255,255,255,0.7);
          transform: scale(1.1);
        }

        /* Tooltip desc on hover */
        .ob-desc-tooltip {
          position: absolute;
          bottom: calc(100% + 14px);
          left: 50%;
          transform: translateX(-50%) translateY(6px);
          width: 210px;
          background: white;
          border-radius: 12px;
          padding: 12px 14px;
          font-size: 0.78rem;
          color: #334155;
          line-height: 1.55;
          box-shadow: 0 8px 32px rgba(0,0,0,0.14);
          opacity: 0;
          pointer-events: none;
          transition: opacity 0.25s ease, transform 0.25s ease;
          z-index: 10;
          text-align: center;
          border: 1px solid #e2e8f0;
        }

        .ob-desc-tooltip::after {
          content: '';
          position: absolute;
          top: 100%;
          left: 50%;
          transform: translateX(-50%);
          border: 7px solid transparent;
          border-top-color: white;
        }

        .ob-card:hover .ob-desc-tooltip {
          opacity: 1;
          transform: translateX(-50%) translateY(0);
        }

        /* Entrance animation */
        @keyframes ob-fade-up {
          from { opacity: 0; transform: translateY(36px); }
          to   { opacity: 1; transform: translateY(0); }
        }

        .ob-card {
          animation: ob-fade-up 0.55s ease both;
        }
        .ob-card:nth-child(1) { animation-delay: 0.05s; }
        .ob-card:nth-child(2) { animation-delay: 0.15s; }
        .ob-card:nth-child(3) { animation-delay: 0.25s; }
        .ob-card:nth-child(4) { animation-delay: 0.35s; }

        @media (max-width: 600px) {
          .ob-grid { gap: 36px; }
          .ob-heading { font-size: 1.8rem; }
        }
      `}</style>

    


        
        {/* ══════════ WHY CHOOSE US ══════════ */}
       
        {/* ══════════ COMMITMENT ══════════ */}
        <section className="py-28 px-6 bg-gradient-to-br from-[#f5ede0] to-[#fef9f3]">
          <div className="max-w-6xl mx-auto grid md:grid-cols-2 gap-16 items-start">

            <Reveal>
              <div>
                <Label text="Quality Assurance" />
                <h2 className="display-font text-4xl md:text-5xl font-bold text-[#03349a] mb-2">
                  Our Commitment<br />to Quality
                </h2>
                <span className="accent-bar mb-8 block" />
                <p className="text-gray-800 leading-relaxed text-md font-semibold mb-6">
                  We follow strict quality guidelines during sourcing, formulation, and manufacturing. Every batch is produced with hygiene, consistency, and care to ensure premium standards.
                </p>
                <p className="text-gray-800 mt-4 leading-relaxed font-semibold">
  Providing safe, effective, and high-quality health supplements that support everyday health needs for individuals and families.
</p>
                
              </div>
            </Reveal>

            <Reveal delay={0.15}>
              <div>
                <h3 className="display-font text-3xl font-semibold text-[#03349a] mb-2">Our Products Are:</h3>
                <span className="accent-bar mb-8 block" />
                <div className="space-y-4">
                  {commitItems.map((item, i) => (
                    <div
                      key={i}
                      className="bg-white rounded-2xl p-6 border border-[#f0e4d4] shadow-sm card-hover flex items-start gap-4"
                    >
                      <span className="flex-shrink-0 w-8 h-8 rounded-xl bg-gradient-to-br from-[#03349a]/10 to-[#c9643a]/15 flex items-center justify-center text-[#03349a] font-bold text-sm">
                        {String(i + 1).padStart(2, "0")}
                      </span>
                      <p className="text-gray-800 leading-relaxed pt-0.5 font-semibold">{item}</p>
                    </div>
                  ))}
                </div>
              </div>
            </Reveal>
          </div>
        </section>

      </div>
      <section className="relative py-20 px-6 overflow-hidden">

  {/* Background Gradient */}
  <div className="absolute inset-0 bg-gradient-to-br from-[#03349a] via-[#a63a1f] to-[#c9643a]" />

  {/* Soft Glow Effects */}
  <div className="absolute top-[-80px] left-[-80px] w-72 h-72 bg-white/10 rounded-full blur-3xl" />
  <div className="absolute bottom-[-80px] right-[-80px] w-72 h-72 bg-white/10 rounded-full blur-3xl" />

  {/* Content */}
  <div className="relative max-w-4xl mx-auto text-center text-white">

    <h2 className="text-4xl md:text-5xl font-bold mb-6 leading-tight">
      Join Our Wellness Journey
    </h2>

    <p className="text-white/90 text-lg leading-relaxed max-w-2xl mx-auto mb-10">
      Aayubakwath invites you to be part of a growing community focused on
      health, balance, and well-being. With our range of specialized
      supplements and our commitment to quality, we aim to support your journey
      toward a healthier future.
    </p>

    {/* CTA Buttons */}
    <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
      

      <button className="border border-white/70 px-8 py-3 rounded-full font-semibold hover:bg-[#03349a] transition" onClick={()=>navigate('/contact')}>
        Contact Us
      </button>
    </div>

  </div>
</section>
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
        className="absolute top-0 left-0 w-[3px] rounded-r-full bg-gradient-to-b from-[#03349a] to-[#c9643a]"
        style={{ height: hov ? "100%" : "0%", transition: "height 0.4s ease" }}
      />
      {/* Icon */}
      <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-[#03349a]/08 to-[#c9643a]/12 flex items-center justify-center text-2xl mb-5 border border-[#f0e4d4]">
        {icon}
      </div>
      {/* Name */}
      <h3
        className="font-['Cormorant_Garamond'] text-xl font-bold mb-3 leading-snug"
        style={{ color: "#03349a" }}
      >
        {name}
      </h3>
      {/* Desc */}
      <p className="text-gray-800 font-semibold text-md leading-relaxed">{desc}</p>
      {/* Bottom hover line */}
      <div
        className="absolute bottom-0 left-6 h-[2px] rounded-full bg-gradient-to-r from-[#03349a] to-[#c9643a]"
        style={{ width: hov ? "calc(100% - 48px)" : "0%", transition: "width 0.4s ease" }}
      />
    </div>
  );
}