import React, { useState, useEffect } from 'react'
import bnr from '../assets/images/bulk.jpg'
import { Helmet } from "react-helmet-async";

/* ─── DATA ─────────────────────────────────────── */
const inputFields = [
  { name: "name",            label: "Full Name",          type: "text",  icon: "👤", col: "full"  },
  { name: "email",           label: "Email Address",      type: "email", icon: "✉️", col: "half"  },
  { name: "mobile",          label: "Mobile Number",      type: "tel",   icon: "📱", col: "half"  },
  { name: "state",           label: "State / Region",     type: "text",  icon: "📍", col: "half"  },
  { name: "productQuantity", label: "Product / Quantity", type: "text",  icon: "📦", col: "half"  },
  { name: "totalQuantity",   label: "Total Quantity",     type: "text",  icon: "🔢", col: "full"  },
]

const features = [
  { img: "🤝", title: "Reach Out To Us",        desc: "Write to us at info.sblsmarketing@gmail.com or call +91 94431 57282" },
  { img: "🛡️", title: "Warranty",               desc: "Up to 1 year warranty on select products." },
  { img: "🌿", title: "Eco-Friendly Packaging",  desc: "Sustainable packaging for a greener world." },
  { img: "🕐", title: "24/7 Support",            desc: "We're here to help anytime you need us." },
]

const stats = [
  { val: "500+",   label: "Active Dealers"  },
  { val: "28",     label: "States Covered"  },
  { val: "99%",    label: "Satisfaction"    },
  { val: "₹10Cr+", label: "Partner Revenue" },
]

/* ─── COMPONENT ─────────────────────────────────── */
export default function Dealership() {
  const [form, setForm] = useState({
    name:"", email:"", mobile:"", state:"", productQuantity:"", totalQuantity:"", details:"",
  })
  const [submitted, setSubmitted] = useState(false)

  const handleChange = e => setForm(p => ({ ...p, [e.target.name]: e.target.value }))
  const handleSubmit = e => {
  e.preventDefault()

  const phoneNumber = "919443157282" // include country code (91 for India)

  const message = `Hello, I am interested in bulk purchase.

Name: ${form.name}
Email: ${form.email}
Mobile: ${form.mobile}
State: ${form.state}
Product / Quantity: ${form.productQuantity}
Total Quantity: ${form.totalQuantity}
Details: ${form.details}`

  const encodedMessage = encodeURIComponent(message)

  const whatsappURL = `https://wa.me/${phoneNumber}?text=${encodedMessage}`

  // Redirect to WhatsApp
  window.open(whatsappURL, "_blank")

  // Optional: show toast
  setSubmitted(true)
  setTimeout(() => setSubmitted(false), 3800)
}

  /* scroll-reveal */
  useEffect(() => {
    const els = document.querySelectorAll('.reveal')
    const io = new IntersectionObserver(entries => {
      entries.forEach(en => { if (en.isIntersecting) en.target.classList.add('revealed') })
    }, { threshold: 0.12 })
    els.forEach(el => io.observe(el))
    return () => io.disconnect()
  }, [])

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Syne:wght@700;800&family=Manrope:wght@300;400;500;600;700&display=swap');

        *, *::before, *::after { box-sizing: border-box; }
        :root { --red:#03349a; --amber:#c9643a; --cream:#fdf8f4; }

        

        @keyframes hzoom { from{transform:scale(1)} to{transform:scale(1.07)} }
        .hero-img { animation:hzoom 14s ease-in-out infinite alternate; }
        .hero-clip { clip-path:polygon(0 0,100% 0,100% 92%,0 100%); }

        @keyframes bob { 0%,100%{transform:translateY(0)} 50%{transform:translateY(-6px)} }
        .bob { animation:bob 3s ease-in-out infinite; }

        .reveal { opacity:0; transform:translateY(28px); transition:opacity .55s ease,transform .55s ease; }
        .reveal.revealed { opacity:1; transform:translateY(0); }
        .d1{transition-delay:.1s} .d2{transition-delay:.2s} .d3{transition-delay:.3s} .d4{transition-delay:.4s}

        .inp {
          width:100%; padding:14px 14px 14px 44px; border-radius:14px;
          border:1.5px solid #e5e0da; background:#faf7f4;
          font-family:'Manrope',sans-serif; font-size:.875rem; color:#1a1a1a;
          outline:none; transition:border .2s,background .2s,box-shadow .2s;
        }
        .inp::placeholder{color:#b5a89e;}
        .inp:focus{border-color:var(--amber);background:#fff;box-shadow:0 0 0 4px rgba(201,100,58,.14);}

        @keyframes shim{0%{background-position:200% center}100%{background-position:-200% center}}
        .shim-btn{background:linear-gradient(90deg,var(--red),var(--amber),#c2410c,var(--red));background-size:200% auto;animation:shim 3s linear infinite;}

        .feat-card{transition:transform .2s,box-shadow .2s;}
        .feat-card:hover{transform:translateY(-4px);box-shadow:0 20px 40px rgba(130,12,12,.12)!important;}

        @keyframes toastIn{0%{opacity:0;transform:translateY(20px) scale(.93)}65%{transform:translateY(-3px) scale(1.02)}100%{opacity:1;transform:translateY(0) scale(1)}}
        .toast{animation:toastIn .45s cubic-bezier(.34,1.56,.64,1) both;}

        @keyframes marquee{from{transform:translateX(0)}to{transform:translateX(-50%)}}
        .marquee-inner{animation:marquee 18s linear infinite;display:flex;gap:48px;white-space:nowrap;}

        .pill{transition:transform .2s;}
        .pill:hover{transform:scale(1.05);}
      `}</style>

      <div className="f-manrope min-h-screen" style={{background:"white"}}>
<Helmet>
  <title>Bulk Dealership - Aayubakwath</title>
</Helmet>
        {/* ══ HERO ══ */}
     <section className="relative w-full overflow-hidden">
                      {/* Background image */}
                      <div className="relative">
                        <img
                          src={bnr}
                          alt="About Banner"
                          loading="lazy"
                          className="w-full h-full object-cover"
                        />
                      </div>
                    </section>

        {/* ══ MARQUEE ══ */}
        <div className="overflow-hidden py-3" style={{background:"var(--red)"}}>
          <div className="marquee-inner">
            {Array(8).fill(null).map((_,i)=>(
              <span key={i} className="text-white/90 text-xs font-semibold uppercase tracking-widest">
                🎁 Bulk Discounts &nbsp;•&nbsp; 🚀 Fast Delivery &nbsp;•&nbsp; 🛡️ 1 Year Warranty &nbsp;•&nbsp; 🌿 Eco Packaging &nbsp;•&nbsp; 📦 Pan-India Network &nbsp;•&nbsp;
              </span>
            ))}
          </div>
        </div>

        {/* ══ STATS ══ */}
        <div className="max-w-5xl mx-auto px-4 pt-12">
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
            {stats.map((s,i)=>(
              <div key={s.label} className={`reveal d${i+1} rounded-2xl text-center py-6 px-4`}
                   style={{background:"#fff",boxShadow:"0 6px 24px rgba(130,12,12,.08)",border:"1px solid #f0ece8"}}>
                <p className="f-syne font-extrabold text-3xl m-0" style={{color:"var(--red)"}}>{s.val}</p>
                <p className="text-xs font-semibold uppercase tracking-widest mt-1 m-0" style={{color:"#9a8a80"}}>{s.label}</p>
              </div>
            ))}
          </div>
        </div>

        {/* ══ FORM SECTION ══ */}
        <div id="form" className="max-w-5xl mx-auto px-4 py-16">
          <div className="reveal text-center mb-10">
            <h2 className="f-syne font-extrabold text-gray-900 m-0" style={{fontSize:"clamp(1.5rem,4vw,2.5rem)"}}>
              Drop Your Details &amp; Grab
            </h2>
            <h2 className="f-syne font-extrabold m-0" style={{fontSize:"clamp(1.5rem,4vw,2.5rem)",color:"var(--red)"}}>
              Exclusive Bulk Discounts!
            </h2>
            <div className="flex justify-center items-center gap-2 mt-4">
              <div className="h-px w-10 rounded-full" style={{background:"var(--red)"}} />
              <div className="w-2 h-2 rounded-full" style={{background:"var(--amber)"}} />
              <div className="h-px w-6 rounded-full bg-stone-200" />
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-5 gap-6">

            {/* Left panel */}
            <div className="reveal lg:col-span-2 flex flex-col gap-4">
              <div className="rounded-3xl p-7 text-white relative overflow-hidden"
                   style={{background:"linear-gradient(145deg,var(--red) 0%,#6b0d0d 100%)",boxShadow:"0 20px 50px rgba(130,12,12,.25)"}}>
                <div className="absolute -top-8 -right-8 w-32 h-32 rounded-full opacity-10"
                     style={{background:"radial-gradient(circle,#fff,transparent)"}} />
                <div className="absolute bottom-0 left-0 right-0 h-1 rounded-b-3xl"
                     style={{background:"linear-gradient(90deg,var(--amber),transparent)"}} />
                <span className="text-4xl">🎁</span>
                <h3 className="f-syne font-bold text-xl mt-3 mb-1">Why Order in Bulk?</h3>
                <div className="w-8 h-0.5 rounded-full mb-4" style={{background:"#fbbf24"}} />
                <ul className="space-y-2.5 m-0 p-0 list-none">
                  {["Flat discounts on every order","Dedicated account manager","Branded / custom packaging","Priority shipping pan-India","Flexible payment terms"].map(t=>(
                    <li key={t} className="flex items-start gap-2.5 text-sm text-white/85">
                      <span className="text-yellow-400 mt-0.5 text-[17px] font-bold">✓</span> {t}
                    </li>
                  ))}
                </ul>
              </div>

              <div className="rounded-3xl p-6" style={{background:"#fff",border:"1.5px solid #f0ece8",boxShadow:"0 8px 24px rgba(0,0,0,.05)"}}>
                <p className="text-[15px] font-bold uppercase tracking-widest mb-3" style={{color:"var(--amber)"}}>Quick Contact</p>
                <div className="space-y-3">
                  <a href="mailto:info.sblsmarketing@gmail.com" className="flex items-center gap-3 text-[16px] font-semibold text-gray-900 no-underline hover:text-red-800 transition-colors">
                    <span className="w-9 h-9 rounded-xl flex items-center justify-center text-base flex-shrink-0" style={{background:"#fdf4f4"}}>✉️</span>
                    info.sblsmarketing@gmail.com
                  </a>
                  <a href="tel:+919344398462" className="flex items-center gap-3 text-[16px] font-semibold text-gray-900 no-underline hover:text-red-800 transition-colors">
                    <span className="w-9 h-9 rounded-xl flex items-center justify-center text-base flex-shrink-0" style={{background:"#fdf4f4"}}>📞</span>
                    +91 94431 57282
                  </a>
                </div>
                <div className="mt-4 pt-4 border-t border-stone-100">
                  <p className="font-semibold text-gray-900 m-0">Response within</p>
                  <p className="f-syne font-bold text-lg m-0" style={{color:"var(--red)"}}>24 – 48 hrs</p>
                </div>
              </div>
            </div>

            {/* Form card */}
            <div className="reveal lg:col-span-3 rounded-3xl overflow-hidden"
                 style={{background:"#fff",boxShadow:"0 24px 60px rgba(130,12,12,.1),0 4px 20px rgba(0,0,0,.05)",border:"1px solid #f0ece8"}}>
              <div className="h-1.5" style={{background:"linear-gradient(90deg,var(--red),var(--amber),var(--red))"}} />
              <div className="p-7 sm:p-9">
                <p className="text-xs font-bold uppercase tracking-widest mb-1" style={{color:"var(--amber)"}}>Fill in your details</p>
                <h3 className="f-syne font-bold text-2xl text-gray-900 m-0 mb-6">Get in Touch With Us</h3>
                <form onSubmit={handleSubmit}>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    {inputFields.map(field=>(
                      <div key={field.name} className={field.col==="full"?"sm:col-span-2":""}>
                        <label htmlFor={field.name}
                               className="block text-[13px] font-bold uppercase tracking-widest mb-1.5"
                               style={{color:"var(--red)"}}>
                          {field.label}
                        </label>
                        <div className="relative">
                          <span className="absolute left-3.5 top-1/2 -translate-y-1/2 text-sm pointer-events-none select-none">{field.icon}</span>
                          <input id={field.name} name={field.name} type={field.type}
                                 placeholder={field.label} value={form[field.name]}
                                 onChange={handleChange} required className="inp" />
                        </div>
                      </div>
                    ))}
                    <div className="sm:col-span-2">
                      <label htmlFor="details"
                             className="block text-[13px] font-bold uppercase tracking-widest mb-1.5"
                             style={{color:"var(--red)"}}>
                        Additional Details
                      </label>
                      <div className="relative">
                        <span className="absolute left-3.5 top-4 text-sm pointer-events-none select-none">💬</span>
                        <textarea id="details" name="details" rows={4}
                                  placeholder="Tell us about your requirements, location, and business..."
                                  value={form.details} onChange={handleChange}
                                  className="inp resize-none" style={{paddingTop:14}} />
                      </div>
                    </div>
                  </div>
                  <div className="h-px my-6" style={{background:"#f0ece8"}} />
                  <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                    <p className="text-md font-semibold text-gray-900 leading-relaxed max-w-xs m-0">
                      Our team will reach out within{" "}
                      <span className="font-semibold" style={{color:"var(--red)"}}>24–48 hours</span>.
                    </p>
                    <button type="submit"
                            className="shim-btn flex-shrink-0 text-white text-sm font-bold uppercase tracking-widest px-9 py-4 rounded-full border-none cursor-pointer transition-transform hover:-translate-y-0.5 active:translate-y-0"
                            style={{boxShadow:"0 12px 28px rgba(130,12,12,.38)"}}>
                      Send Enquiry →
                    </button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>

        {/* ══ FEATURE ICONS ══ */}
        <div className="max-w-5xl mx-auto px-4 pb-20">
          <div className="reveal text-center mb-8">
            <p className="text-[18px] font-bold uppercase tracking-widest" style={{color:"var(--amber)"}}>Why Choose Us</p>
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
            {features.map((f,i)=>(
              <div
  key={f.title}
  className={`feat-card reveal d${i+1} rounded-2xl p-6 text-center h-full flex flex-col min-h-[180px]`}
  style={{
    background: "#fff",
    border: "1px solid #f0ece8",
    boxShadow: "0 6px 20px rgba(0,0,0,.05)"
  }}
>
  <div className="text-4xl mb-3 flex justify-center items-center">
    {f.img}
  </div>

  <h4 className="f-syne font-bold text-md text-gray-900 mb-1.5 leading-snug break-words">
    {f.title}
  </h4>

  <p className="text-gray-900 leading-relaxed m-0 break-words line-clamp-3">
    {f.desc}
  </p>
</div>
            ))}
          </div>
        </div>

        {/* ══ BOTTOM PILLS ══ */}
        <div className="py-8" style={{background:"var(--red)"}}>
          <div className="max-w-5xl mx-auto px-4 flex flex-wrap justify-center gap-3">
            {[
              {icon:"🚀",text:"Fast Onboarding"},
              {icon:"💼",text:"Dedicated Support"},
              {icon:"📈",text:"High Margins"},
              {icon:"🌍",text:"Pan-India Network"},
              {icon:"🎁",text:"Custom Packaging"},
              {icon:"✅",text:"Verified Products"},
            ].map(p=>(
              <div key={p.text} className="pill flex items-center gap-2 rounded-full px-5 py-2.5 text-sm font-semibold text-white"
                   style={{background:"rgba(255,255,255,.12)",border:"1px solid rgba(255,255,255,.2)",backdropFilter:"blur(4px)"}}>
                <span>{p.icon}</span> {p.text}
              </div>
            ))}
          </div>
        </div>

        {/* ══ TOAST ══ */}
        {submitted && (
          <div className="toast fixed bottom-8 right-6 z-50 flex items-center gap-3 px-5 py-4 rounded-2xl border-l-4 border-emerald-500 bg-white"
               style={{boxShadow:"0 20px 50px rgba(0,0,0,.15)"}}>
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