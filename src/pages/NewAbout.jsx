import { useEffect, useRef } from "react";
import img0 from '../assets/images/about/53.jpg';
import img1 from '../assets/images/about/54.jpg';
import img2 from '../assets/images/about/55.jpg';
import img3 from '../assets/images/resar.jpeg';
import img4 from '../assets/images/about/img.jpg';
import bnr from '../assets/images/about/about.jpg'
import OurBusiness from "./AboutPage";
import { useNavigate } from "react-router-dom";

const sections = [
  {
    tag: "Who We Are",
    title: "Founded on a Vision of Healthier Lives",
    body: "Aayubakwath was founded to support healthier lives through natural wellness solutions. In today's fast-paced world, individuals face increasing health challenges — unstable blood sugar, high cholesterol, mental fatigue, and reduced concentration in children.\n\nWe address these issues through carefully developed, scientifically formulated supplements that combine nutrition, natural ingredients, and evidence-based formulations.",
    reverse: false,
    image: img0,
    icon: (
      <svg viewBox="0 0 200 200" className="w-36 h-36" xmlns="http://www.w3.org/2000/svg">
        <ellipse cx="100" cy="178" rx="60" ry="12" fill="#03349a" opacity="0.08" />
        <rect x="95" y="95" width="10" height="78" rx="4" fill="#03349a" opacity="0.4" />
        <path d="M100 138 Q68 118 50 90" stroke="#03349a" strokeWidth="5" fill="none" strokeLinecap="round" opacity="0.4" />
        <path d="M100 122 Q136 104 152 76" stroke="#03349a" strokeWidth="4" fill="none" strokeLinecap="round" opacity="0.4" />
        <ellipse cx="100" cy="60" rx="38" ry="38" fill="#03349a" />
        <ellipse cx="100" cy="60" rx="22" ry="22" fill="#0a4bc4" opacity="0.55" />
        <ellipse cx="44" cy="86" rx="25" ry="25" fill="#2f6fd8" />
        <ellipse cx="158" cy="72" rx="28" ry="28" fill="#2f6fd8" />
        <ellipse cx="58" cy="128" rx="16" ry="16" fill="#6b9ef0" opacity="0.7" />
        <circle cx="100" cy="57" r="7" fill="#c8922a" />
        <circle cx="44" cy="83" r="4" fill="#c8922a" opacity="0.8" />
        <circle cx="158" cy="69" r="4" fill="#c8922a" opacity="0.8" />
      </svg>
    ),
  },
  {
    tag: "What We Do",
    title: "Herbal & Nutraceutical Supplements for Modern Life",
    body: "We develop supplements that integrate scientifically backed ingredients with traditional knowledge to create effective solutions for modern lifestyles.\n\nWe are committed to maintaining strict quality standards throughout our production processes, ensuring every product is safe, reliable, and beneficial for individuals and families alike.",
    reverse: true,
    image: img1,
    icon: (
      <svg viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg" className="w-36 h-36">
        <path d="M72 68 L72 112 L46 164 Q43 172 53 172 L147 172 Q157 172 154 164 L128 112 L128 68 Z" fill="#eef3ff" stroke="#03349a" strokeWidth="2.5" />
        <rect x="72" y="48" width="56" height="22" rx="4" fill="#dce8ff" stroke="#03349a" strokeWidth="2" />
        <rect x="68" y="44" width="64" height="9" rx="3" fill="#03349a" />
        <path d="M62 152 Q100 140 138 152 L145 164 Q142 170 134 170 L66 170 Q58 170 55 164 Z" fill="#03349a" opacity="0.9" />
        <circle cx="87" cy="146" r="5" fill="#6b9ef0" opacity="0.7" />
        <circle cx="105" cy="140" r="4" fill="#6b9ef0" opacity="0.5" />
        <circle cx="121" cy="150" r="3" fill="#dce8ff" opacity="0.8" />
        <line x1="133" y1="100" x2="140" y2="100" stroke="#c8922a" strokeWidth="2" strokeLinecap="round" />
        <line x1="133" y1="113" x2="142" y2="113" stroke="#c8922a" strokeWidth="2" strokeLinecap="round" />
        <line x1="133" y1="126" x2="140" y2="126" stroke="#c8922a" strokeWidth="2" strokeLinecap="round" />
        <circle cx="154" cy="54" r="6" fill="#c8922a" opacity="0.8" />
      </svg>
    ),
  },
  {
    tag: "Our Mission",
    title: "Three Values at Our Core",
    body: null,
    values: [
      { label: "Quality", desc: "Premium health supplements made with carefully selected ingredients." },
      { label: "Trust", desc: "Long-term relationships built on transparency and reliability." },
      { label: "Wellness", desc: "Supporting healthier lifestyles through effective nutritional support." },
    ],
    reverse: false,
    image: img2,
    icon: (
      <svg viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg" className="w-36 h-36">
        <circle cx="100" cy="100" r="74" fill="none" stroke="#dce8ff" strokeWidth="1.5" strokeDasharray="6 4" />
        <circle cx="100" cy="100" r="58" fill="none" stroke="#03349a" strokeWidth="1" opacity="0.2" />
        <path d="M100 32 L146 54 L146 104 Q146 142 100 162 Q54 142 54 104 L54 54 Z" fill="#eef3ff" stroke="#03349a" strokeWidth="2.5" />
        <path d="M100 46 L136 64 L136 104 Q136 134 100 150 Q64 134 64 104 L64 64 Z" fill="#03349a" opacity="0.08" />
        <path d="M82 100 L96 116 L124 84" stroke="#03349a" strokeWidth="5" fill="none" strokeLinecap="round" strokeLinejoin="round" />
        <circle cx="100" cy="32" r="6" fill="#c8922a" />
        <circle cx="146" cy="54" r="4" fill="#c8922a" opacity="0.7" />
        <circle cx="54" cy="54" r="4" fill="#c8922a" opacity="0.7" />
        <circle cx="100" cy="162" r="4" fill="#c8922a" opacity="0.7" />
      </svg>
    ),
  },
  {
    tag: "Our Vision",
    title: "Shaping the Future of Herbal Wellness",
    body: "Our vision is to become a trusted wellness brand in India and globally, known for providing reliable and high-quality nutritional supplements that support long-term health.\n\nWe strive to empower people with natural health solutions that help maintain energy, improve mental clarity, and support vital body functions.",
    reverse: true,
    image: img3,
    icon: (
      <svg viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg" className="w-36 h-36">
        <circle cx="100" cy="108" r="66" fill="#eef3ff" stroke="#03349a" strokeWidth="2" />
        <ellipse cx="100" cy="108" rx="66" ry="26" fill="none" stroke="#03349a" strokeWidth="1" opacity="0.3" />
        <ellipse cx="100" cy="108" rx="66" ry="46" fill="none" stroke="#03349a" strokeWidth="1" opacity="0.2" />
        <line x1="100" y1="42" x2="100" y2="174" stroke="#03349a" strokeWidth="1" opacity="0.2" />
        <ellipse cx="116" cy="110" rx="16" ry="20" fill="#2f6fd8" opacity="0.4" />
        <polygon points="100,40 108,62 100,55 92,62" fill="#c8922a" />
        <line x1="100" y1="28" x2="100" y2="39" stroke="#c8922a" strokeWidth="2.5" />
        <line x1="90" y1="32" x2="95" y2="41" stroke="#c8922a" strokeWidth="1.5" opacity="0.6" />
        <line x1="110" y1="32" x2="105" y2="41" stroke="#c8922a" strokeWidth="1.5" opacity="0.6" />
        <circle cx="116" cy="101" r="5" fill="#c8922a" />
        <circle cx="116" cy="101" r="10" fill="none" stroke="#c8922a" strokeWidth="1.5" opacity="0.4" />
      </svg>
    ),
  },
  {
    tag: "Quality Commitment",
    title: "Strict Standards, Every Batch",
    body: "We follow strict quality guidelines during sourcing, formulation, and manufacturing. Every batch is produced with hygiene, consistency, and care to ensure premium standards.\n\nOur goal is to provide safe, effective, and high-quality health supplements that support everyday health needs for individuals and families.",
    reverse: false,
    image: img4,
    icon: (
      <svg viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg" className="w-36 h-36">
        <rect x="48" y="62" width="104" height="118" rx="8" fill="#fdf8f4" stroke="#03349a" strokeWidth="2" />
        <rect x="66" y="50" width="68" height="26" rx="4" fill="#03349a" />
        <rect x="82" y="43" width="36" height="15" rx="3" fill="#0a4bc4" />
        <line x1="70" y1="112" x2="86" y2="128" stroke="#03349a" strokeWidth="3" strokeLinecap="round" />
        <line x1="86" y1="128" x2="116" y2="98" stroke="#03349a" strokeWidth="3" strokeLinecap="round" />
        <line x1="66" y1="148" x2="134" y2="148" stroke="#03349a" strokeWidth="0.8" opacity="0.25" />
        <line x1="66" y1="162" x2="134" y2="162" stroke="#03349a" strokeWidth="0.8" opacity="0.25" />
        <circle cx="74" cy="155" r="3" fill="#2f6fd8" />
        <circle cx="74" cy="169" r="3" fill="#2f6fd8" />
        <rect x="84" y="152" width="44" height="5" rx="2" fill="#dce8ff" />
        <rect x="84" y="166" width="30" height="5" rx="2" fill="#dce8ff" />
        <circle cx="150" cy="76" r="21" fill="#fff8f0" stroke="#c8922a" strokeWidth="2" />
        <path d="M142 76 l6 6 l12-13" stroke="#c8922a" strokeWidth="2.5" fill="none" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    ),
  },
];



function useScrollReveal() {
  const ref = useRef(null);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([e]) => {
        if (e.isIntersecting) {
          el.style.opacity = "1";
          el.style.transform = "translateY(0)";
          obs.unobserve(el);
        }
      },
      { threshold: 0.1 }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, []);
  return ref;
}

function Section({ section, index }) {
  const ref = useScrollReveal();
  const { tag, title, body, values, icon, reverse, image } = section;

  return (
    <div
      ref={ref}
      style={{
        opacity: 0,
        transform: "translateY(36px)",
        transition: `opacity 0.65s ease ${index * 80}ms, transform 0.65s ease ${index * 80}ms`,
      }}
    >
      
      {/* Zig-zag row */}
      <div
        className={`flex flex-col ${
          reverse ? "lg:flex-row-reverse" : "lg:flex-row"
        } items-center gap-12 lg:gap-20 py-16 lg:py-20`}
      >
        
        <div className="w-full lg:w-1/2 flex-shrink-0">
          <div className="relative overflow-hidden rounded-[32px] shadow-2xl">
            <img
              src={image}
              className="w-full h-auto object-cover transform hover:scale-105 transition-transform duration-700"
              alt={title}
            />
          </div>
        </div>

        {/* ── Content side ── */}
        <div className="lg:w-1/2 min-w-0">
          {/* Accent bar */}
          <div
            className="w-14 h-1 rounded-full mb-6"
            style={{ background: index % 2 === 0 ? "#03349a" : "#c8922a" }}
          />

          <h2 className="text-3xl lg:text-4xl font-bold leading-snug mb-6 bg-gradient-to-r from-[#1a0a0a] via-[#03349a] to-[#c9643a] bg-clip-text text-transparent">
            {title}
          </h2>

          {body && (
            <div className="space-y-5">
              {body.split("\n\n").map((para, i) => (
                <p
                  key={i}
                  className="text-lg lg:text-xl leading-relaxed"
                  style={{ color: "#4a5880" }}
                >
                  {para}
                </p>
              ))}
            </div>
          )}

          {values && (
            <ul className="space-y-6 mt-2">
              {values.map((v, i) => (
                <li key={i} className="flex items-start gap-5">
                  {/* Number circle */}
                  <span
                    className="flex-shrink-0 w-10 h-10 rounded-full flex items-center justify-center text-sm font-bold mt-1"
                    style={{ background: "#eef3ff", color: "#03349a" }}
                  >
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <p className="text-lg lg:text-xl leading-relaxed" style={{ color: "#4a5880" }}>
                    <span className="font-bold" style={{ color: "#03349a" }}>
                      {v.label} —{" "}
                    </span>
                    {v.desc}
                  </p>
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>

      {/* Divider between sections (skip last) */}
      {index < sections.length - 1 && (
        <div
          className="w-full h-px"
          style={{ background: "linear-gradient(90deg, transparent, #dce4f5 30%, #dce4f5 70%, transparent)" }}
        />
      )}
    </div>
  );
}

export default function AboutPage() {

  const navigate= useNavigate()

  return (
    <div style={{ background: "#fdf8f4" }}>
      
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
      {/* ── Hero ── */}
      <OurBusiness/>
      <div
        className="relative overflow-hidden text-center px-6 pt-20 pb-0"
        style={{ background: "#03349a" }}
      >
        {/* Decorative blobs */}
        <div
          className="absolute -top-10 -right-10 w-64 h-64 rounded-full opacity-30"
          style={{ background: "#0a4bc4" }}
        />
        <div
          className="absolute bottom-10 -left-8 w-48 h-48 rounded-full opacity-10"
          style={{ background: "#c8922a" }}
        />

        <div className="relative max-w-4xl mx-auto">

          <h1
            className="text-4xl md:text-5xl lg:text-6xl font-bold leading-tight text-white mb-6"
          >
            Natural Wellness,{" "}
            <span style={{ color: "#f0c26a" }}>Backed by Science</span>
          </h1>

          <p
            className="text-xl lg:text-2xl leading-relaxed max-w-2xl mx-auto"
            style={{ color: "#a8c0ef" }}
          >
            Supporting healthier lives through carefully formulated, natural health supplements.
          </p>

   
          <div
  className="overflow-hidden mt-14"
  style={{ borderTop: "1px solid rgba(255,255,255,0.1)" }}
>
  <style>{`
    @keyframes scrollX {
      0% { transform: translateX(0); }
      100% { transform: translateX(-50%); }
    }
    .scroll-track {
      display: flex;
      width: max-content;
      animation: scrollX 15s linear infinite;
    }
  `}</style>

  <div className="scroll-track">
    {[...Array(2)].flatMap(() => [
      { v: "100%", l: "Natural Ingredients" },
      { v: "GMP", l: "Certified Process" },
      { v: "5+", l: "Health Categories" },
    ]).map((s, i) => (
      <div
        key={i}
        className="flex-shrink-0 w-[180px] py-6 px-4 text-center"
        style={{
          borderRight: "1px solid rgba(255,255,255,0.1)",
        }}
      >
        <div className="text-3xl font-bold text-[#f0c26a]">
          {s.v}
        </div>
        <div className="text-sm mt-1 text-[#a8c0ef]">
          {s.l}
        </div>
      </div>
    ))}
  </div>
</div>
        </div>

        {/* Wave transition */}
        <svg
          viewBox="0 0 1440 64"
          className="w-full block mt-0"
          style={{ fill: "#fdf8f4", marginBottom: -2 }}
          xmlns="http://www.w3.org/2000/svg"
          preserveAspectRatio="none"
        >

          
          <path d="M0,32 C360,80 1080,0 1440,40 L1440,64 L0,64 Z" />
        </svg>
      </div>
    
    

      {/* ── Zig-Zag Sections ── */}
      <div className="max-w-7xl mx-auto px-6 lg:px-12 pb-24">
        {sections.map((section, index) => (
          <Section key={index} section={section} index={index} />
        ))}
      </div>

      {/* ── Footer CTA ── */}
      <div
        className="relative overflow-hidden py-20 px-6 text-center"
        style={{ background: "#03349a" }}
      >
        <div
          className="absolute -top-16 -right-16 w-56 h-56 rounded-full opacity-10"
          style={{ background: "#c8922a" }}
        />
        <div
          className="absolute -bottom-10 -left-10 w-44 h-44 rounded-full opacity-30"
          style={{ background: "#0a4bc4" }}
        />
        <div className="relative max-w-2xl mx-auto">
          <p
            className="text-sm font-bold tracking-widest uppercase mb-4"
            style={{ color: "#a8c0ef", letterSpacing: "0.2em" }}
          >
            Start Your Wellness Journey
          </p>
          <h3
            className="text-4xl lg:text-5xl font-bold text-white leading-tight mb-5"
          >
            Rooted in Nature.{" "}
            <span style={{ color: "#f0c26a" }}>Driven by Science.</span>
          </h3>
          <p
            className="text-xl leading-relaxed mb-10"
            style={{ color: "#a8c0ef" }}
          >
            Explore our range of herbal supplements crafted to support your energy, clarity, and long-term vitality.
          </p>
          <button
            className="inline-block px-10 py-4 rounded-full text-base font-bold tracking-wide uppercase transition-all duration-200 hover:-translate-y-1 active:scale-95"
            style={{
              background: "#c8922a",
              color: "#ffffff",
              letterSpacing: "0.08em",
              boxShadow: "0 6px 24px rgba(200,146,42,0.4)",
            }}
            onClick={()=>{navigate("/productListing")}}
          >
            Explore Products
          </button>
        </div>
      </div>
    </div>
  );
}