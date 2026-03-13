import React, { useState } from 'react'
import bane from '../assets/images/bnr-1.webp'
import Banner from '../components/layout/Banner'
import bnr from '../assets/images/bn.png';

const inputFields = [
  { name: "name",            label: "Full Name",          type: "text",  icon: "👤", col: "full" },
  { name: "email",           label: "Email Address",      type: "email", icon: "✉️", col: "half" },
  { name: "mobile",          label: "Mobile Number",      type: "tel",   icon: "📱", col: "half" },
  { name: "state",           label: "State / Region",     type: "text",  icon: "📍", col: "half" },
  { name: "productQuantity", label: "Product / Quantity", type: "text",  icon: "📦", col: "half" },
  { name: "totalQuantity",   label: "Total Quantity",     type: "text",  icon: "🔢", col: "full" },
]

const pills = [
  { icon: "🚀", text: "Fast Onboarding" },
  { icon: "💼", text: "Dedicated Support" },
  { icon: "📈", text: "High Margins" },
  { icon: "🌍", text: "Pan-India Network" },
]

export default function Dealership() {
  const [form, setForm] = useState({
    name: "", email: "", mobile: "", state: "",
    productQuantity: "", totalQuantity: "", details: "",
  })
  const [submitted, setSubmitted] = useState(false)

  const handleChange = (e) =>
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }))

  const handleSubmit = (e) => {
    e.preventDefault()
    setSubmitted(true)
    setTimeout(() => setSubmitted(false), 3500)
  }
  const BRAND = "#820c0c";
const ACCENT = "#c9643a";

  return (
    <>
      <style>{`
       

        @keyframes bannerZoom {
          from { transform: scale(1); }
          to   { transform: scale(1.06); }
        }
        .banner-img { animation: bannerZoom 12s ease-in-out infinite alternate; }

        @keyframes fadeUp {
          from { opacity: 0; transform: translateY(14px); }
          to   { opacity: 1; transform: translateY(0); }
        }
        .fade-up { animation: fadeUp 0.5s ease both; }

        @keyframes toastIn {
          from { opacity: 0; transform: translateY(16px) scale(0.95); }
          to   { opacity: 1; transform: translateY(0) scale(1); }
        }
        .toast-anim { animation: toastIn 0.4s cubic-bezier(0.22,0.68,0,1.2); }

        .deal-input:focus { box-shadow: 0 0 0 4px rgba(201,100,58,0.15); }

        .shine-btn::after {
          content: '';
          position: absolute; inset: 0;
          background: linear-gradient(120deg, transparent 30%, rgba(255,255,255,0.2) 50%, transparent 70%);
          transform: translateX(-100%);
          transition: transform 0.5s ease;
        }
        .shine-btn:hover::after { transform: translateX(100%); }
      `}</style>

      <div className="deal-root min-h-screen bg-stone-100">

      
{/* ══════════ HERO ══════════ */}
        <section className="relative h-[65vh] min-h-[420px] overflow-hidden">
          <img src={bnr} alt="About Banner" className="hero-img w-full h-full object-cover" />
          {/* Gradient overlay */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent" />
          
        </section>
        {/* ── Form Area ── */}
        <div className="max-w-3xl mx-auto px-4 pb-16" style={{ marginTop: "-36px" }}>

          {/* Card */}
          <div
            className="fade-up bg-white rounded-3xl overflow-hidden relative"
            style={{ boxShadow: "0 32px 80px rgba(130,12,12,0.12), 0 4px 24px rgba(0,0,0,0.06)" }}
          >
            {/* Top accent stripe */}
            <div
              className="h-1 w-full"
              style={{ background: "linear-gradient(to right, #820c0c, #c9643a, #820c0c)" }}
            />

            {/* Decorative blobs */}
            <div
              className="absolute -top-16 -right-16 w-48 h-48 rounded-full pointer-events-none opacity-20"
              style={{ background: "radial-gradient(circle, #c9643a 0%, transparent 70%)" }}
            />
            <div
              className="absolute -bottom-12 -left-12 w-36 h-36 rounded-full pointer-events-none opacity-10"
              style={{ background: "radial-gradient(circle, #820c0c 0%, transparent 70%)" }}
            />

            <div className="px-6 sm:px-10 py-8 sm:py-10">

              {/* Heading */}
              <div className="mb-8">
                <p
                  className="text-xs uppercase tracking-widest font-bold mb-1.5 m-0"
                  style={{ color: "#c9643a" }}
                >
                  Fill in your details
                </p>
                <h2
                  className="deal-serif font-bold text-gray-900 m-0"
                  style={{ fontSize: "clamp(20px, 3vw, 30px)" }}
                >
                  Get in Touch With Us
                </h2>
                <div className="flex items-center gap-1.5 mt-3">
                  <div className="w-7 h-0.5 rounded-full" style={{ background: "#820c0c" }} />
                  <div className="w-1.5 h-1.5 rounded-full opacity-60" style={{ background: "#c9643a" }} />
                  <div className="w-3 h-0.5 rounded-full bg-stone-200" />
                </div>
              </div>

              {/* Form */}
              <form onSubmit={handleSubmit}>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">

                  {inputFields.map((field) => (
                    <div
                      key={field.name}
                      className={field.col === "full" ? "sm:col-span-2" : "col-span-1"}
                    >
                      <label
                        htmlFor={field.name}
                        className="block text-md font-bold uppercase tracking-widest mb-1.5"
                        style={{ color: "#820c0c" }}
                      >
                        {field.label}
                      </label>
                      <div className="relative">
                        <span className="absolute left-3.5 top-1/2 -translate-y-1/2 text-base pointer-events-none select-none">
                          {field.icon}
                        </span>
                        <input
                          id={field.name}
                          name={field.name}
                          type={field.type}
                          placeholder={field.label}
                          value={form[field.name]}
                          onChange={handleChange}
                          required
                          className="deal-input w-full pl-11 pr-4 py-3.5 rounded-xl text-sm text-gray-800 placeholder-stone-400 outline-none transition-all duration-200 border border-stone-200 bg-stone-50 focus:border-orange-400 focus:bg-white"
                        />
                      </div>
                    </div>
                  ))}

                  {/* Textarea */}
                  <div className="sm:col-span-2">
                    <label
                      htmlFor="details"
                      className="block text-md font-bold uppercase tracking-widest mb-1.5"
                      style={{ color: "#820c0c" }}
                    >
                      Additional Details
                    </label>
                    <div className="relative">
                      <span className="absolute left-3.5 top-4 text-base pointer-events-none select-none">
                        💬
                      </span>
                      <textarea
                        id="details"
                        name="details"
                        placeholder="Tell us about your requirements, location, and business..."
                        value={form.details}
                        onChange={handleChange}
                        rows={4}
                        className="deal-input w-full pl-11 pr-4 py-3.5 rounded-xl text-sm text-gray-800 placeholder-stone-400 outline-none transition-all duration-200 border border-stone-200 bg-stone-50 focus:border-orange-400 focus:bg-white resize-y"
                      />
                    </div>
                  </div>
                </div>

                {/* Divider */}
                <div className="h-px bg-stone-100 my-7" />

                {/* Footer row */}
                <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                  <p className="text-xs text-stone-400 leading-relaxed max-w-xs m-0">
                    By submitting, you agree to our terms. Our team will reach out within{" "}
                    <span className="font-semibold" style={{ color: "#820c0c" }}>24–48 hours</span>.
                  </p>

                  <button
                    type="submit"
                    className="shine-btn relative overflow-hidden flex-shrink-0 text-white text-sm font-semibold uppercase tracking-widest px-8 py-4 rounded-full transition-all duration-200 hover:-translate-y-0.5 active:translate-y-0 cursor-pointer border-none"
                    style={{
                      background: "#820c0c",
                      boxShadow: "0 8px 24px rgba(130,12,12,0.35)",
                    }}
                  >
                    Send Enquiry →
                  </button>
                </div>
              </form>
            </div>
          </div>

          {/* Info Pills */}
          {/* Info Pills */}
<div className="flex flex-wrap justify-center gap-4 mt-7">
  {pills.map((pill) => (
    <div
      key={pill.text}
      className="flex items-center gap-2 rounded-full px-5 py-3 text-sm font-semibold text-white transition-transform transform hover:scale-105 hover:shadow-lg cursor-pointer"
      style={{
        background: `linear-gradient(135deg, ${BRAND}, ${ACCENT})`,
        boxShadow: "0 6px 15px rgba(130, 12, 12, 0.3)",
      }}
    >
      <span className="text-xl">{pill.icon}</span>
      <span>{pill.text}</span>
    </div>
  ))}
</div>
        </div>

        {/* ── Success Toast ── */}
        {submitted && (
          <div
            className="toast-anim fixed bottom-8 right-6 z-50 bg-white flex items-center gap-3 px-5 py-4 rounded-2xl border-l-4 border-emerald-500"
            style={{ boxShadow: "0 16px 40px rgba(0,0,0,0.15)" }}
          >
            <span className="text-2xl">✅</span>
            <div>
              <p className="m-0 text-sm font-semibold text-gray-900">Enquiry Sent!</p>
              <p className="m-0 text-xs text-gray-500">We'll get back to you within 24–48 hours.</p>
            </div>
          </div>
        )}
      </div>
    </>
  )
}