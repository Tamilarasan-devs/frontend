import { useState } from "react";

/* ── Brand tokens ─────────────────────────────────────── */
const B = "#820c0c";
const A = "#c9643a";
const G = "#829b1c";

/* ── Icons ────────────────────────────────────────────── */
const IconPin = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8"
    strokeLinecap="round" strokeLinejoin="round" style={{ width: 18, height: 18 }}>
    <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" />
    <circle cx="12" cy="10" r="3" />
  </svg>
);
const IconMail = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8"
    strokeLinecap="round" strokeLinejoin="round" style={{ width: 18, height: 18 }}>
    <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" />
    <polyline points="22,6 12,13 2,6" />
  </svg>
);
const IconPhone = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8"
    strokeLinecap="round" strokeLinejoin="round" style={{ width: 18, height: 18 }}>
    <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07A19.5 19.5 0 0 1 4.69 12 19.79 19.79 0 0 1 1.61 3.4 2 2 0 0 1 3.6 1.22h3a2 2 0 0 1 2 1.72c.127.96.361 1.903.7 2.81a2 2 0 0 1-.45 2.11L7.91 8.9a16 16 0 0 0 6 6l.95-.95a2 2 0 0 1 2.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0 1 21.73 16.92z" />
  </svg>
);
const IconCheck = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"
    strokeLinecap="round" strokeLinejoin="round" style={{ width: 16, height: 16, flexShrink: 0 }}>
    <polyline points="20 6 9 17 4 12" />
  </svg>
);
const IconClock = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8"
    strokeLinecap="round" strokeLinejoin="round" style={{ width: 16, height: 16 }}>
    <circle cx="12" cy="12" r="10" /><polyline points="12 6 12 12 16 14" />
  </svg>
);

/* ── Scoped CSS (cp- prefix, no root bleed) ───────────── */
const STYLES = `
  .cp-root *, .cp-root *::before, .cp-root *::after { box-sizing: border-box; }

  /* --- Keyframes --- */
  @keyframes cp-up   { from { opacity:0; transform:translateY(20px); } to { opacity:1; transform:translateY(0); } }
  @keyframes cp-in   { from { opacity:0; } to { opacity:1; } }
  @keyframes cp-bar  { from { width:0; } to { width:75%; } }
  @keyframes cp-shim { 0%{background-position:-200% center;} 100%{background-position:200% center;} }

  .cp-a0 { animation: cp-up .55s .05s ease both; }
  .cp-a1 { animation: cp-up .55s .15s ease both; }
  .cp-a2 { animation: cp-up .55s .25s ease both; }
  .cp-a3 { animation: cp-up .55s .35s ease both; }
  .cp-a4 { animation: cp-up .55s .45s ease both; }
  .cp-a5 { animation: cp-up .55s .55s ease both; }

  /* --- Hero: full-bleed gradient top section --- */
  .cp-hero {
    background: linear-gradient(150deg, #820c0c 0%, #9e1212 40%, #b93a1a 75%, #c9643a 100%);
    position: relative;
    overflow: hidden;
  }
  .cp-hero::before {
    content: '';
    position: absolute; inset: 0;
    background-image: repeating-linear-gradient(
      -45deg, transparent, transparent 20px,
      rgba(255,255,255,0.025) 20px, rgba(255,255,255,0.025) 21px
    );
    pointer-events: none;
  }
  .cp-hero::after {
    content: '';
    position: absolute; bottom: -1px; left: 0; right: 0;
    height: 60px;
    background: #fdf7f2;
    clip-path: ellipse(55% 100% at 50% 100%);
  }

  /* hero orbs */
  .cp-orb-1 {
    position: absolute; top: -80px; right: -80px;
    width: 320px; height: 320px; border-radius: 50%;
    background: radial-gradient(circle, rgba(255,255,255,0.08) 0%, transparent 70%);
    pointer-events: none;
  }
  .cp-orb-2 {
    position: absolute; bottom: 20px; left: -60px;
    width: 220px; height: 220px; border-radius: 50%;
    background: radial-gradient(circle, rgba(201,100,58,0.25) 0%, transparent 70%);
    pointer-events: none;
  }

  /* --- Inputs --- */
  .cp-inp {
    width: 100%;
    padding: 13px 16px;
    border-radius: 12px;
    border: 1.5px solid #e8d4cb;
    background: #fdf7f2;
    font-size: 14px;
    color: #1a0404;
    outline: none;
    transition: border-color .2s, box-shadow .2s, background .2s;
    -webkit-appearance: none;
  }
  .cp-inp::placeholder { color: rgba(130,12,12,0.25); }
  .cp-inp:focus {
    border-color: #820c0c;
    background: #fff;
    box-shadow: 0 0 0 4px rgba(130,12,12,0.09);
  }

  /* --- Submit button --- */
  .cp-btn {
    position: relative; overflow: hidden;
    cursor: pointer;
    transition: transform .22s, box-shadow .22s;
  }
  .cp-btn::before {
    content: '';
    position: absolute; top: 0; left: -100%;
    width: 100%; height: 100%;
    background: linear-gradient(90deg, transparent, rgba(255,255,255,0.16), transparent);
    transition: left .5s;
  }
  .cp-btn:hover::before { left: 100%; }
  .cp-btn:hover { transform: translateY(-2px); }
  .cp-btn:active { transform: translateY(0); }

  /* --- Info card hover --- */
  .cp-icard {
    position: relative; overflow: hidden;
    transition: transform .28s ease, box-shadow .28s ease;
  }
  .cp-icard:hover { transform: translateY(-4px); }
  .cp-icard .cp-icard-bar {
    position: absolute; bottom: 0; left: 0;
    height: 3px; width: 0;
    transition: width .38s ease;
    border-radius: 0 0 0 16px;
  }
  .cp-icard:hover .cp-icard-bar { width: 100%; }

  /* --- Panel info items --- */
  .cp-pitem {
    display: flex; gap: 14px; align-items: flex-start;
    padding: 14px 16px; border-radius: 14px;
    background: rgba(255,255,255,0.07);
    border: 1px solid rgba(255,255,255,0.1);
    transition: background .2s;
  }
  .cp-pitem:hover { background: rgba(255,255,255,0.12); }

  /* --- Success --- */
  .cp-ok { animation: cp-up .4s ease both; }

  /* --- Hours bar anim --- */
  .cp-hbar { animation: cp-bar 1.2s .8s ease both; width: 0; }

  /* --- Mobile safe --- */
  @media (max-width: 640px) {
    .cp-hero::after { height: 36px; }
  }
`;

export default function ContactPage() {
  const [form, setForm] = useState({ name: "", email: "", phone: "", message: "" });
  const [submitted, setSubmitted] = useState(false);

  const onChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });
  const onSubmit = (e) => {
    e.preventDefault();
    setSubmitted(true);
    setForm({ name: "", email: "", phone: "", message: "" });
    setTimeout(() => setSubmitted(false), 5000);
  };

  const contacts = [
    { Icon: IconPin,   label: "Address", value: "No:1/770, K.Ayyampalayam(PO)", sub: "Palladam, Tiruppur, Tamil Nadu 641662", color: B, bg: "rgba(130,12,12,0.1)" },
    { Icon: IconMail,  label: "Email",   value: "info.sblsmarketing@gmail.com",  sub: "We reply within 24 hours",              color: A, bg: "rgba(201,100,58,0.1)" },
    { Icon: IconPhone, label: "Phone",   value: "+91 94431 57282",               sub: "Mon – Sat, 9 AM – 6 PM",                color: G, bg: "rgba(130,155,28,0.1)" },
  ];

  return (
    <div className="cp-root min-h-screen" style={{ background: "#fdf7f2" }}>
      <style>{STYLES}</style>

      {/* ════════════════════════════════
          HERO — mobile-first full bleed
      ════════════════════════════════ */}
      <section className="cp-hero px-5 pt-14 pb-20 sm:px-8 sm:pt-20 sm:pb-28 md:px-12 md:pt-24 md:pb-32">
        <div className="cp-orb-1" />
        <div className="cp-orb-2" />

        <div className="relative z-10 max-w-4xl mx-auto text-center">

          {/* Eyebrow pill */}
          <span className="cp-a0 inline-flex items-center gap-2 px-4 py-1.5 rounded-full
                           text-xs font-bold tracking-widest uppercase mb-6 select-none"
            style={{ background: "rgba(255,255,255,0.15)", border: "1px solid rgba(255,255,255,0.25)", color: "rgba(255,255,255,0.9)" }}>
            <span className="w-1.5 h-1.5 rounded-full bg-white inline-block opacity-80" />
            Contact Us
          </span>

          {/* Headline */}
          <h1 className="cp-a1 text-white leading-none tracking-tight"
            style={{  fontSize: "clamp(42px, 8vw, 80px)", fontWeight: 700 }}>
            Let's Start a
            <br />
            <em style={{ fontStyle: "italic", color: "#fcd5a0", fontWeight: 500 }}>Conversation</em>
          </h1>

          <p className="cp-a2 mt-5 text-lg sm:text-base leading-relaxed font-bold max-w-lg mx-auto"
            style={{ color: "white" }}>
            We'd love to hear from you. Fill out the form or reach us directly — our team is here to help.
          </p>

          {/* Stat pills */}
          <div className="cp-a3 flex flex-wrap justify-center gap-3 mt-8">
            {[["24h", "Response"], ["6 Days / Week", "Available"], ["100%", "Dedicated"]].map(([n, l]) => (
              <div key={l} className="flex items-center gap-2 px-4 py-2 rounded-full"
                style={{ background: "rgba(255,255,255,0.12)", border: "1px solid rgba(255,255,255,0.2)" }}>
                <span className="font-bold text-white text-sm"
                  style={{  fontSize: 17 }}>{n}</span>
                <span className="text-xs font-medium" style={{ color: "rgba(255,255,255,0.6)" }}>{l}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ════════════════════════════════
          CONTACT INFO CARDS
      ════════════════════════════════ */}
      <section className="max-w-5xl mx-auto px-4 sm:px-6 md:px-10 -mt-6 sm:-mt-10 relative z-10">
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          {contacts.map(({ Icon, label, value, sub, color, bg }, i) => (
            <div key={i} className={`cp-icard bg-white rounded-2xl p-5 sm:p-6 cp-a${i}`}
              style={{ boxShadow: "0 4px 24px rgba(130,12,12,0.08), 0 1px 3px rgba(0,0,0,0.04)", border: "1px solid rgba(130,12,12,0.07)" }}>
              <div className="cp-icard-bar" style={{ background: color }} />

              <div className="flex items-start gap-4">
                <div className="w-11 h-11 rounded-xl flex items-center justify-center shrink-0"
                  style={{ background: bg, color }}>
                  <Icon />
                </div>
                <div className="max-w-full">
                  <p className="text-xs font-bold tracking-widest uppercase mb-1" style={{ color }}>{label}</p>
                  <p className="text-sm font-semibold leading-snug truncate" style={{ color: "#1a0404" }}>{value}</p>
                  <p className="text-xs font-semibold mt-0.5" style={{ color: "#9a6a5a" }}>{sub}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ════════════════════════════════
          FORM + PANEL
      ════════════════════════════════ */}
      <section className="max-w-5xl mx-auto px-4 sm:px-6 md:px-10 py-12 sm:py-16">
        <div className="grid grid-cols-1 lg:grid-cols-5 gap-6 lg:gap-8 items-start">

          {/* ── Left panel ── */}
          <aside className="cp-a2 lg:col-span-2 rounded-3xl p-7 sm:p-8 relative overflow-hidden text-white"
            style={{ background: "linear-gradient(158deg, #820c0c 0%, #6a0808 55%, #480505 100%)" }}>

            {/* Decorative orbs */}
            <div style={{ position:"absolute", top:-50, right:-50, width:180, height:180, borderRadius:"50%", background:"rgba(201,100,58,0.2)", pointerEvents:"none" }} />
            <div style={{ position:"absolute", bottom:-50, left:-50, width:150, height:150, borderRadius:"50%", background:"rgba(130,155,28,0.15)", pointerEvents:"none" }} />
            <div style={{ position:"absolute", top:0, left:0, right:0, bottom:0, backgroundImage:"repeating-linear-gradient(-45deg,transparent,transparent 18px,rgba(255,255,255,0.02) 18px,rgba(255,255,255,0.02) 19px)", pointerEvents:"none" }} />

            <div className="relative z-10">
              {/* Tag */}
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full
                               text-xs font-bold tracking-widest uppercase mb-5"
                style={{ background:"rgba(201,100,58,0.22)", border:"1px solid rgba(201,100,58,0.38)", color:"#f0b97a" }}>
                Get In Touch
              </span>

              {/* Title */}
              <h2 className="leading-tight mb-4"
                style={{  fontSize:"clamp(28px,3.5vw,38px)", fontWeight:700, color:"white" }}>
                We're Here<br />
                For <em style={{ fontStyle:"italic", color:"#f0b97a", fontWeight:400 }}>You</em>
              </h2>

              {/* Accent line */}
              <div className="w-10 h-0.5 rounded mb-5"
                style={{ background:`linear-gradient(90deg,${A},${G})` }} />

              <p className="text-md leading-relaxed font-medium mb-7"
                style={{ color:"white" }}>
                Reach out for inquiries, partnerships, or just to say hello. Our team responds within 24 hours.
              </p>

              {/* Contact items */}
              <div className="space-y-3">
                {contacts.map(({ Icon, label, value, sub }, i) => (
                  <div key={i} className="cp-pitem">
                    <div className="w-8 h-8 rounded-lg flex items-center justify-center shrink-0"
                      style={{ background:"rgba(255,255,255,0.12)", border:"1px solid rgba(255,255,255,0.16)", color:"#f0b97a" }}>
                      <Icon />
                    </div>
                    <div className="min-w-0">
                      <p className="text-xs font-bold tracking-widest uppercase mb-0.5" style={{ color:A }}>{label}</p>
                      <p className="text-sm font-medium leading-snug truncate" style={{ color:"rgba(255,255,255,0.88)" }}>{value}</p>
                      <p className="text-sm font-medium" style={{ color:"white" }}>{sub}</p>
                    </div>
                  </div>
                ))}
              </div>

              {/* Hours */}
              {/* <div className="mt-5 rounded-2xl p-4"
                style={{ background:"rgba(255,255,255,0.07)", border:"1px solid rgba(255,255,255,0.11)" }}>
                <div className="flex items-center gap-2 mb-3">
                  <span style={{ color: G }}><IconClock /></span>
                  <span className="text-xs font-bold tracking-widest uppercase" style={{ color:G }}>Business Hours</span>
                </div>
                <div className="flex justify-between items-center text-xs">
                  <span style={{ color:"rgba(255,255,255,0.6)" }}>Monday – Saturday</span>
                  <span className="font-semibold" style={{ color:"#f0b97a" }}>9 AM – 6 PM IST</span>
                </div>
                <div className="mt-2.5 h-1.5 rounded-full overflow-hidden" style={{ background:"rgba(255,255,255,0.1)" }}>
                  <div className="cp-hbar h-full rounded-full" style={{ background:`linear-gradient(90deg,${A},${G})` }} />
                </div>
              </div> */}
            </div>
          </aside>

          {/* ── Form card ── */}
          <div className="cp-a3 lg:col-span-3 bg-white rounded-3xl p-6 sm:p-8 md:p-10"
            style={{ boxShadow:"0 8px 40px rgba(130,12,12,0.07), 0 1px 4px rgba(0,0,0,0.04)", border:"1px solid rgba(130,12,12,0.07)" }}>

            {/* Tag */}
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full
                             text-xs font-bold tracking-widest uppercase mb-4"
              style={{ background:"rgba(130,12,12,0.07)", border:"1px solid rgba(130,12,12,0.17)", color:B }}>
              Send Message
            </span>

            <h2 className="leading-tight mb-1.5"
              style={{ fontFamily:"'Cormorant Garamond',serif", fontSize:"clamp(26px,3vw,34px)", fontWeight:700, color:"#1a0404" }}>
              Drop Us a{" "}
              <em style={{ fontStyle:"italic", color:B, fontWeight:600 }}>Line</em>
            </h2>
            <p className="text-xs font-light mb-7" style={{ color:"#9a6a5a" }}>
              We'll get back to you within 24 hours.
            </p>

            {/* Success */}
            {submitted && (
              <div className="cp-ok flex items-center gap-2.5 px-4 py-3 rounded-xl text-xs font-medium mb-6"
                style={{ background:"rgba(130,155,28,0.1)", border:"1px solid rgba(130,155,28,0.3)", color:"#3d4d08" }}>
                <IconCheck />
                Your message was sent successfully! We'll be in touch soon.
              </div>
            )}

            <form onSubmit={onSubmit} className="space-y-4">
              {/* Name + Phone */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold tracking-widest uppercase mb-2"
                    style={{ color:B, opacity:0.62 }}>Full Name *</label>
                  <input type="text" name="name" value={form.name} onChange={onChange}
                    required placeholder="Your name" className="cp-inp" />
                </div>
                <div>
                  <label className="block text-xs font-bold tracking-widest uppercase mb-2"
                    style={{ color:B, opacity:0.62 }}>Phone</label>
                  <input type="tel" name="phone" value={form.phone} onChange={onChange}
                    placeholder="+91 98765 43210" className="cp-inp" />
                </div>
              </div>

              {/* Email */}
              <div>
                <label className="block text-xs font-bold tracking-widest uppercase mb-2"
                  style={{ color:B, opacity:0.62 }}>Email Address *</label>
                <input type="email" name="email" value={form.email} onChange={onChange}
                  required placeholder="you@example.com" className="cp-inp" />
              </div>

              {/* Message */}
              <div>
                <label className="block text-xs font-bold tracking-widest uppercase mb-2"
                  style={{ color:B, opacity:0.62 }}>Message *</label>
                <textarea name="message" value={form.message} onChange={onChange}
                  required rows={5} placeholder="Write your message here..."
                  className="cp-inp" style={{ resize:"none" }} />
              </div>

              {/* Submit */}
              <button type="submit" className="cp-btn w-full py-4 rounded-2xl text-white
                                               text-xs font-bold tracking-widest uppercase border-0"
                style={{
                  background:`linear-gradient(135deg, ${B} 0%, #9e1010 55%, ${A} 100%)`,
                  boxShadow:"0 8px 26px rgba(130,12,12,0.28)",
                }}>
                Send Message →
              </button>
            </form>
          </div>

        </div>
      </section>

      {/* ════════════════════════════════
          MAP
      ════════════════════════════════ */}
      <section className="max-w-full mx-auto px-4 sm:px-6 md:px-10 pb-16">
        <div className="bg-white rounded-3xl overflow-hidden"
          style={{ boxShadow:"0 8px 36px rgba(130,12,12,0.08)", border:"1px solid rgba(130,12,12,0.08)" }}>

          {/* Map header */}
          <div className="px-6 sm:px-8 py-5 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2"
            style={{ borderBottom:"1px solid rgba(130,12,12,0.07)" }}>
            <div>
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full
                               text-xs font-bold tracking-widest uppercase mb-2"
                style={{ background:"rgba(130,12,12,0.07)", border:"1px solid rgba(130,12,12,0.17)", color:B }}>
                Our Location
              </span>
              <h3 style={{  fontSize:20, fontWeight:700, color:"#1a0404", lineHeight:1 }}>
                Find Us on the Map
              </h3>
            </div>
            <p className="text-lg font-semibold" style={{ color:"#9a6a5a" }}>
              K.Ayyampalayam, Palladam, Tamil Nadu 641662
            </p>
          </div>

          <iframe
            src="https://www.google.com/maps/embed?pb=!1m23!1m12!1m3!1d250564.89793483046!2d77.3439278!3d11.1076742!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!4m8!3e6!4m0!4m5!1s0x3ba9ababa3eecfcf%3A0xd5408d394061bcb5!2sSri%20Bakawathi%20Life%20Science%2C%20No%3A1%2F770%2C%20K.Ayyampalayam(PO)%2C%20K.S.N%20Puram(Via)%2C%20Palladam%2C%20Tamil%20Nadu%20641662!3m2!1d10.982724!2d77.2239895!5e0!3m2!1sen!2sin!4v1772442468303!5m2!1sen!2sin"
            width="100%"
            height="380"
            style={{ border:0, display:"block" }}
            allowFullScreen=""
            loading="lazy"
            title="Sri Bakawathi Life Science Location"
          />
        </div>
      </section>
    </div>
  );
}