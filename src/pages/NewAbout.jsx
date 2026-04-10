import { useEffect, useRef } from "react";

const sections = [
  {
    tag: "Who We Are",
    title: "Founded on a Vision of Healthier Lives",
    body: "Aayubakwath was founded to support healthier lives through natural wellness solutions. In today's fast-paced world, individuals face increasing health challenges — unstable blood sugar, high cholesterol, mental fatigue, and reduced concentration in children.\n\nWe address these issues through carefully developed, scientifically formulated supplements that combine nutrition, natural ingredients, and evidence-based formulations.",
    tagColor: "bg-emerald-100 text-emerald-800",
    accent: "bg-emerald-500",
    imageBg: "bg-emerald-50",
    borderColor: "border-emerald-200",
    icon: (
      <svg viewBox="0 0 200 200" className="w-40 h-40" xmlns="http://www.w3.org/2000/svg">
        <ellipse cx="100" cy="155" rx="65" ry="22" fill="#6ee7b7" opacity="0.3" />
        <rect x="88" y="60" width="24" height="90" rx="4" fill="#10b981" />
        <ellipse cx="100" cy="58" rx="32" ry="32" fill="#34d399" />
        <ellipse cx="66" cy="90" rx="22" ry="22" fill="#6ee7b7" />
        <ellipse cx="134" cy="84" rx="26" ry="26" fill="#6ee7b7" />
        <ellipse cx="55" cy="112" rx="15" ry="15" fill="#34d399" opacity="0.6" />
        <ellipse cx="147" cy="108" rx="17" ry="17" fill="#34d399" opacity="0.6" />
        <circle cx="100" cy="58" r="9" fill="#065f46" />
      </svg>
    ),
    reverse: false,
  },
  {
    tag: "What We Do",
    title: "Herbal & Nutraceutical Supplements for Modern Life",
    body: "We develop supplements that integrate scientifically backed ingredients with traditional knowledge to create effective solutions for modern lifestyles.\n\nWe are committed to maintaining strict quality standards throughout our production processes, ensuring every product is safe, reliable, and beneficial for individuals and families alike.",
    tagColor: "bg-violet-100 text-violet-800",
    accent: "bg-violet-500",
    imageBg: "bg-violet-50",
    borderColor: "border-violet-200",
    icon: (
      <svg viewBox="0 0 200 200" className="w-40 h-40" xmlns="http://www.w3.org/2000/svg">
        <rect x="28" y="100" width="38" height="70" rx="4" fill="#c4b5fd" />
        <rect x="80" y="72" width="38" height="98" rx="4" fill="#8b5cf6" />
        <rect x="132" y="46" width="38" height="124" rx="4" fill="#6d28d9" />
        <path d="M47 100 L99 72 L151 46" stroke="#4c1d95" stroke-width="2" fill="none" stroke-dasharray="4 3" />
        <circle cx="47" cy="100" r="5" fill="#4c1d95" />
        <circle cx="99" cy="72" r="5" fill="#4c1d95" />
        <circle cx="151" cy="46" r="5" fill="#4c1d95" />
      </svg>
    ),
    reverse: true,
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
    tagColor: "bg-amber-100 text-amber-800",
    accent: "bg-amber-500",
    imageBg: "bg-amber-50",
    borderColor: "border-amber-200",
    icon: (
      <svg viewBox="0 0 200 200" className="w-40 h-40" xmlns="http://www.w3.org/2000/svg">
        <circle cx="100" cy="100" r="62" fill="none" stroke="#fcd34d" stroke-width="2" />
        <circle cx="100" cy="100" r="46" fill="none" stroke="#f59e0b" stroke-width="1.5" />
        <circle cx="100" cy="100" r="30" fill="#f59e0b" opacity="0.15" />
        <circle cx="100" cy="100" r="15" fill="#d97706" />
        <line x1="100" y1="38" x2="100" y2="55" stroke="#f59e0b" stroke-width="2" />
        <line x1="100" y1="145" x2="100" y2="162" stroke="#f59e0b" stroke-width="2" />
        <line x1="38" y1="100" x2="55" y2="100" stroke="#f59e0b" stroke-width="2" />
        <line x1="145" y1="100" x2="162" y2="100" stroke="#f59e0b" stroke-width="2" />
        <line x1="56" y1="56" x2="69" y2="69" stroke="#fcd34d" stroke-width="1.5" />
        <line x1="131" y1="56" x2="118" y2="69" stroke="#fcd34d" stroke-width="1.5" />
        <line x1="56" y1="144" x2="69" y2="131" stroke="#fcd34d" stroke-width="1.5" />
        <line x1="131" y1="144" x2="118" y2="131" stroke="#fcd34d" stroke-width="1.5" />
      </svg>
    ),
    reverse: false,
  },
  {
    tag: "Our Vision",
    title: "Shaping the Future of Herbal Wellness",
    body: "Our vision is to become a trusted wellness brand in India and globally, known for providing reliable and high-quality nutritional supplements that support long-term health.\n\nWe strive to empower people with natural health solutions that help maintain energy, improve mental clarity, and support vital body functions.",
    tagColor: "bg-sky-100 text-sky-800",
    accent: "bg-sky-500",
    imageBg: "bg-sky-50",
    borderColor: "border-sky-200",
    icon: (
      <svg viewBox="0 0 200 200" className="w-40 h-40" xmlns="http://www.w3.org/2000/svg">
        <ellipse cx="100" cy="162" rx="58" ry="12" fill="#bae6fd" opacity="0.5" />
        <polygon points="100,36 142,140 58,140" fill="#0ea5e9" opacity="0.18" />
        <polygon points="100,56 134,128 66,128" fill="#0ea5e9" opacity="0.4" />
        <polygon points="100,74 124,118 76,118" fill="#0369a1" />
        <circle cx="100" cy="36" r="11" fill="#f59e0b" />
        <line x1="100" y1="47" x2="100" y2="74" stroke="#f59e0b" stroke-width="1.5" stroke-dasharray="3 2" />
        <rect x="68" y="140" width="64" height="14" rx="3" fill="#bae6fd" />
      </svg>
    ),
    reverse: true,
  },
  {
    tag: "Quality Commitment",
    title: "Strict Standards, Every Batch",
    body: "We follow strict quality guidelines during sourcing, formulation, and manufacturing. Every batch is produced with hygiene, consistency, and care to ensure premium standards.\n\nOur goal is to provide safe, effective, and high-quality health supplements that support everyday health needs for individuals and families.",
    tagColor: "bg-rose-100 text-rose-800",
    accent: "bg-rose-500",
    imageBg: "bg-rose-50",
    borderColor: "border-rose-200",
    icon: (
      <svg viewBox="0 0 200 200" className="w-40 h-40" xmlns="http://www.w3.org/2000/svg">
        <rect x="50" y="60" width="100" height="100" rx="8" fill="none" stroke="#fca5a5" stroke-width="2" />
        <rect x="66" y="44" width="68" height="32" rx="4" fill="#f87171" />
        <rect x="80" y="36" width="40" height="16" rx="3" fill="#e11d48" />
        <line x1="74" y1="112" x2="94" y2="132" stroke="#dc2626" stroke-width="2.5" stroke-linecap="round" />
        <line x1="94" y1="132" x2="134" y2="88" stroke="#dc2626" stroke-width="2.5" stroke-linecap="round" />
        <circle cx="152" cy="72" r="20" fill="#fecdd3" />
        <path d="M144 72 l6 6 l10-12" stroke="#be123c" stroke-width="2" fill="none" stroke-linecap="round" stroke-linejoin="round" />
      </svg>
    ),
    reverse: false,
  },
];

function useScrollReveal() {
  const ref = useRef(null);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          el.classList.add("opacity-100", "translate-y-0");
          el.classList.remove("opacity-0", "translate-y-8");
          observer.unobserve(el);
        }
      },
      { threshold: 0.15 }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);
  return ref;
}

function Section({ section, index }) {
  const ref = useScrollReveal();
  const { tag, title, body, values, tagColor, accent, imageBg, borderColor, icon, reverse } = section;

  return (
    <div
      ref={ref}
      className="opacity-0 translate-y-8 transition-all duration-700 ease-out"
      style={{ transitionDelay: `${index * 60}ms` }}
    >
      <div
        className={`flex flex-col ${
          reverse ? "md:flex-row-reverse" : "md:flex-row"
        } items-center gap-10 md:gap-16 py-14 border-b border-gray-100 last:border-b-0`}
      >
        {/* Image Block */}
        <div
          className={`flex-shrink-0 w-full md:w-[340px] h-64 rounded-2xl ${imageBg} border ${borderColor} flex items-center justify-center`}
        >
          {icon}
        </div>

        {/* Content Block */}
        <div className="flex-1 min-w-0">
          <span
            className={`inline-block text-xs font-semibold tracking-widest uppercase px-4 py-1.5 rounded-full mb-4 ${tagColor}`}
          >
            {tag}
          </span>
          <h2 className="text-2xl md:text-3xl font-semibold text-gray-900 leading-snug mb-4">
            {title}
          </h2>

          {body && (
            <div className="space-y-3">
              {body.split("\n\n").map((para, i) => (
                <p key={i} className="text-gray-500 text-base leading-relaxed">
                  {para}
                </p>
              ))}
            </div>
          )}

          {values && (
            <ul className="mt-4 space-y-4">
              {values.map((v, i) => (
                <li key={i} className="flex items-start gap-3">
                  <span className={`mt-2 w-2 h-2 rounded-full flex-shrink-0 ${accent}`} />
                  <p className="text-gray-500 text-base leading-relaxed">
                    <span className="font-semibold text-gray-800">{v.label} — </span>
                    {v.desc}
                  </p>
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>
    </div>
  );
}

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-white ">
      {/* Hero Header */}
      <div className="text-center pt-20 pb-12 px-6">
        <p className="text-xs font-bold tracking-widest uppercase text-emerald-600 mb-3">
          About Us
        </p>
        <h1 className="text-4xl md:text-5xl font-bold text-gray-900 leading-tight max-w-2xl mx-auto">
          Natural Wellness,{" "}
          <span className="text-emerald-600">Backed by Science</span>
        </h1>
        <p className="mt-5 text-gray-400 text-lg max-w-xl mx-auto leading-relaxed">
          Supporting healthier lives through carefully formulated, natural
          health supplements.
        </p>
        <div className="mt-8 flex justify-center gap-2">
          <span className="w-2 h-2 rounded-full bg-emerald-400 inline-block" />
          <span className="w-8 h-2 rounded-full bg-emerald-600 inline-block" />
          <span className="w-2 h-2 rounded-full bg-emerald-400 inline-block" />
        </div>
      </div>

      {/* Zig-Zag Sections */}
      <div className="max-w-5xl mx-auto px-6 pb-24">
        {sections.map((section, index) => (
          <Section key={index} section={section} index={index} />
        ))}
      </div>
    </div>
  );
}