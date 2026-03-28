import React from 'react'
// import img from '../assets/images/your-product-image.webp' // replace with your actual image path
import btl from '../assets/images/btl.jpeg'
const leftFeatures = [
  {
    icon: (
      <svg className="w-6 h-6" fill="none" stroke="currentColor" strokeWidth={1.8} viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" d="M20 7H4a2 2 0 00-2 2v6a2 2 0 002 2h16a2 2 0 002-2V9a2 2 0 00-2-2z" />
        <path strokeLinecap="round" strokeLinejoin="round" d="M16 7V5a2 2 0 00-2-2h-4a2 2 0 00-2 2v2" />
      </svg>
    ),
    title: "Best Packaging",
  },
  {
    icon: (
      <svg className="w-6 h-6" fill="none" stroke="currentColor" strokeWidth={1.8} viewBox="0 0 24 24">
        <rect x="1" y="3" width="15" height="13" rx="2" strokeLinecap="round" strokeLinejoin="round" />
        <path strokeLinecap="round" strokeLinejoin="round" d="M16 8h4l3 5v3h-7V8z" />
        <circle cx="5.5" cy="18.5" r="2.5" />
        <circle cx="18.5" cy="18.5" r="2.5" />
      </svg>
    ),
    title: "Free Shipping & COD Available",
  },
]

const rightFeatures = [
  {
    icon: (
      <svg className="w-6 h-6" fill="none" stroke="currentColor" strokeWidth={1.8} viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
      </svg>
    ),
    title: "Safety Standards",
  },
  {
    icon: (
      <svg className="w-6 h-6" fill="none" stroke="currentColor" strokeWidth={1.8} viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 10h16M4 14h10M4 18h6" />
      </svg>
    ),
    title: "Product Variety",
  },
]

export default function FeaturesSection() {
  return (
    <>
      <style>{`
        @keyframes spinRing {
          from { transform: rotate(0deg); }
          to   { transform: rotate(360deg); }
        }
        .feat-ring { animation: spinRing 18s linear infinite; }

        .feat-card {
          background: linear-gradient(135deg, #ffffff 0%, #fff5f0 100%);
          border: 1.5px solid rgba(201,100,58,0.2);
          transition: transform 0.25s ease, box-shadow 0.25s ease, border-color 0.25s ease;
        }
        .feat-card:hover {
          transform: translateY(-3px);
          border-color: rgba(130,12,12,0.4);
          box-shadow: 0 8px 28px rgba(130,12,12,0.13);
        }
      `}</style>

      <section
        className="py-20 px-4"
        style={{ background: "linear-gradient(135deg, #fff5f0 0%, #fef0e6 50%, #fff5f0 100%)" }}
      >
        <div className="max-w-6xl mx-auto">

          {/* ── Section Heading ── */}
          <div className="text-center mb-12">
            <p
              className="text-3xl font-bold uppercase tracking-widest font-bold mb-2"
              style={{ color: "#c9643a" }}
            >
              Why Choose Us
            </p>
            <h2
              className="text-3xl font-bold"
              style={{ color: "#820c0c", fontFamily: "'Georgia', serif" }}
            >
              Our <span style={{ color: "#c9643a" }}>Promises</span> to You
            </h2>
            <div className="flex items-center justify-center gap-2 mt-3">
              <div className="w-8 h-0.5 rounded-full" style={{ background: "#820c0c" }} />
              <div className="w-2 h-2 rounded-full opacity-60" style={{ background: "#c9643a" }} />
              <div className="w-4 h-0.5 rounded-full" style={{ background: "#f0ece8" }} />
            </div>
          </div>

          {/* ── Main Row ── */}
          <div className="flex flex-col lg:flex-row items-center justify-center gap-6 lg:gap-3">

            {/* Left Cards */}
            <div className="flex flex-col gap-4 w-full lg:w-72 flex-shrink-0">
              {leftFeatures.map((f) => (
                <div
                  key={f.title}
                  className="feat-card flex items-center gap-4 rounded-2xl px-5 py-4 shadow-sm cursor-default"
                >
                  <span
                    className="flex-shrink-0 p-2.5 rounded-xl"
                    style={{
                      background: "linear-gradient(135deg, rgba(201,100,58,0.15), rgba(130,12,12,0.1))",
                      color: "#820c0c",
                    }}
                  >
                    {f.icon}
                  </span>
                  <span
                    className="font-semibold text-sm leading-snug"
                    style={{ color: "#3d0a0a" }}
                  >
                    {f.title}
                  </span>
                </div>
              ))}
            </div>

            {/* Left Arrow */}
            <div className="hidden lg:flex items-center flex-shrink-0">
              <svg width="36" height="36" viewBox="0 0 36 36" fill="none">
                <path
                  d="M22 18H8M8 18l7-7M8 18l7 7"
                  stroke="rgba(130,12,12,0.3)"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </div>

            {/* Center Image */}
            <div className="relative flex-shrink-0 w-full max-w-xs sm:max-w-sm lg:w-80">
              {/* Spinning dashed ring */}
              <div
                className="feat-ring absolute inset-0 rounded-3xl pointer-events-none"
                style={{
                  border: "1.5px dashed rgba(201,100,58,0.35)",
                  borderRadius: 28,
                  inset: "-10px",
                  position: "absolute",
                }}
              />
              <div
                className="relative z-10 rounded-3xl overflow-hidden"
                style={{
                  border: "4px solid #ffffff",
                  boxShadow: "0 20px 60px rgba(130,12,12,0.18), 0 4px 16px rgba(0,0,0,0.08)",
                }}
              >
                <img
                  src={btl}
                  alt="Our Products"
                  className="w-full h-full object-cover"
                />
              </div>
            </div>

            {/* Right Arrow */}
            <div className="hidden lg:flex items-center flex-shrink-0">
              <svg width="36" height="36" viewBox="0 0 36 36" fill="none">
                <path
                  d="M14 18h14M28 18l-7-7M28 18l-7 7"
                  stroke="rgba(130,12,12,0.3)"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </div>

            {/* Right Cards */}
            <div className="flex flex-col gap-4 w-full lg:w-72 flex-shrink-0">
              {rightFeatures.map((f) => (
                <div
                  key={f.title}
                  className="feat-card flex items-center gap-4 rounded-2xl px-5 py-4 shadow-sm cursor-default"
                >
                  <span
                    className="flex-shrink-0 p-2.5 rounded-xl"
                    style={{
                      background: "linear-gradient(135deg, rgba(201,100,58,0.15), rgba(130,12,12,0.1))",
                      color: "#820c0c",
                    }}
                  >
                    {f.icon}
                  </span>
                  <span
                    className="font-semibold text-sm leading-snug"
                    style={{ color: "#3d0a0a" }}
                  >
                    {f.title}
                  </span>
                </div>
              ))}
            </div>

          </div>
        </div>
      </section>
    </>
  )
}