import { useState } from "react";

const contactInfo = [
  {
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" className="w-5 h-5">
        <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" />
        <circle cx="12" cy="10" r="3" />
      </svg>
    ),
    label: "Address",
    value: "No:1/770, K.Ayyampalayam(PO)",
    sub: "Palladam, Tiruppur, Tamil Nadu 641662",
    color: "from-rose-900 to-red-800",
  },
  {
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" className="w-5 h-5">
        <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" />
        <polyline points="22,6 12,13 2,6" />
      </svg>
    ),
    label: "Email",
    value: "info.sblsmarketing@gmail.com",
    sub: "We reply within 24hrs",
    color: "from-amber-700 to-orange-600",
  },
  {
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" className="w-5 h-5">
        <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07A19.5 19.5 0 0 1 4.69 12 19.79 19.79 0 0 1 1.61 3.4 2 2 0 0 1 3.6 1.22h3a2 2 0 0 1 2 1.72c.127.96.361 1.903.7 2.81a2 2 0 0 1-.45 2.11L7.91 8.9a16 16 0 0 0 6 6l.95-.95a2 2 0 0 1 2.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0 1 21.73 16.92z" />
      </svg>
    ),
    label: "Phone",
    value: "+91 94431 57282",
    sub: "Mon–Sat, 9am – 6pm",
    color: "from-red-900 to-rose-700",
  },
];

function InfoCard({ icon, label, value, sub, color, index }) {
  const [hovered, setHovered] = useState(false);
  return (
    <div
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      className="relative flex flex-col gap-4 p-6 rounded-2xl border border-red-100 bg-white cursor-default group overflow-hidden transition-all duration-300"
      style={{
        boxShadow: hovered ? "0 20px 60px rgba(130,12,12,0.12)" : "0 4px 24px rgba(130,12,12,0.05)",
        transform: hovered ? "translateY(-4px)" : "translateY(0)",
        animation: `fadeUp 0.6s ${0.1 + index * 0.12}s ease both`,
        opacity: 0,
      }}
    >
      <div className={`absolute -top-8 -right-8 w-28 h-28 rounded-full bg-gradient-to-br ${color} opacity-5 group-hover:opacity-10 transition-opacity duration-300`} />
      <div className={`w-12 h-12 rounded-xl flex items-center justify-center bg-gradient-to-br ${color} text-white shadow-lg`}>
        {icon}
      </div>
      <div>
        <p className="text-xs font-semibold tracking-widest uppercase text-amber-600 mb-1">{label}</p>
        <p className="font-bold text-red-900 text-base mb-0.5">{value}</p>
        <p className="font-bold text-red-900 text-base">{sub}</p>
      </div>
    </div>
  );
}

export default function ContactPage() {
  const [form, setForm] = useState({ name: "", email: "", phone: "", message: "" });
  const [submitted, setSubmitted] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm({ ...form, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setSubmitted(true);
    setForm({ name: "", email: "", phone: "", message: "" });
    setTimeout(() => setSubmitted(false), 5000);
  };

  return (
    <div className="min-h-screen bg-[#fefbf6]">
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,400;0,700;0,900;1,400&family=Cormorant+Garamond:ital,wght@0,300;0,400;1,300&family=Jost:wght@300;400;500;600&display=swap');
        @keyframes fadeUp { from { opacity:0; transform:translateY(28px); } to { opacity:1; transform:translateY(0); } }
        @keyframes checkAnim { from { stroke-dashoffset:20; } to { stroke-dashoffset:0; } }
        .inp::placeholder { color: rgba(122,64,64,0.35); }
        .inp:focus { outline: none; border-color: #c9643a; box-shadow: 0 0 0 3px rgba(201,100,58,0.12); }
      `}</style>

      {/* ── HERO HEADER ── */}
      <div className="relative bg-[#820c0c] overflow-hidden">
        <div className="absolute -top-24 -right-24 w-96 h-96 rounded-full bg-white opacity-[0.03]" />
        <div className="absolute -bottom-20 -left-20 w-72 h-72 rounded-full bg-amber-500 opacity-10" />
        <div className="absolute inset-0" style={{ backgroundImage: "repeating-linear-gradient(45deg,transparent,transparent 24px,rgba(255,255,255,0.015) 24px,rgba(255,255,255,0.015) 25px)" }} />

        <div className="relative max-w-6xl mx-auto px-6 py-20 text-center" style={{ animation: "fadeUp 0.8s ease both" }}>
          <div className="flex items-center justify-center gap-3 mb-5">
            <div className="w-8 h-px bg-[#829b1c] opacity-60" />
            <span className="text-xl font-semibold tracking-[5px] uppercase text-[#829b1c]">Reach Out</span>
            <div className="w-8 h-px bg-[#829b1c] opacity-60" />
          </div>
          <h1 className="text-6xl font-black text-white leading-tight mb-4" style={{ fontFamily: "'Playfair Display', serif" }}>
            Get in <em className="not-italic text-[#829b1c] font-light italic">Touch</em>
          </h1>
          <p className="text-lg text-white/70 max-w-md mx-auto leading-relaxed">
            We'd love to hear from you. Fill out the form or reach us directly — we're here to help.
          </p>
        </div>

        <div className="h-10 relative">
          <svg viewBox="0 0 1440 40" preserveAspectRatio="none" className="absolute bottom-0 left-0 w-full h-full">
            <path d="M0,0 Q720,40 1440,0 L1440,40 L0,40 Z" fill="#fefbf6" />
          </svg>
        </div>
      </div>

      

      {/* ── TWO-COLUMN CONTACT SECTION ── */}
      <section className="max-w-6xl mx-auto px-6 mb-16">
        <div className="rounded-3xl overflow-hidden shadow-2xl flex flex-col lg:flex-row" style={{ animation: "fadeUp 0.7s 0.3s ease both", opacity: 0 }}>

          {/* LEFT — Details Panel */}
          <div
            className="relative lg:w-[42%] flex flex-col justify-between px-10 py-12 overflow-hidden"
            style={{ background: "linear-gradient(155deg, #820c0c 0%, #5a0808 60%, #3a0404 100%)" }}
          >
            <div className="absolute -top-16 -right-16 w-56 h-56 rounded-full bg-white opacity-[0.04]" />
            <div className="absolute bottom-0 -left-10 w-48 h-48 rounded-full bg-amber-400 opacity-[0.07]" />
            <div className="absolute inset-0" style={{ backgroundImage: "repeating-linear-gradient(45deg,transparent,transparent 28px,rgba(255,255,255,0.012) 28px,rgba(255,255,255,0.012) 29px)" }} />

            <div className="relative z-10">
              <div className="flex items-center gap-2 mb-8">
                <div className="w-6 h-px bg-[#aab820] opacity-70" />
                <span className="text-[10px] tracking-[4px] uppercase text-[#aab820] font-semibold">Contact Details</span>
                <div className="w-6 h-px bg-[#aab820] opacity-70" />
              </div>

              <h2 className="text-4xl font-black text-white leading-tight mb-3" style={{ fontFamily: "'Playfair Display', serif" }}>
                Let's Start a<br />
                <em className="not-italic text-[#aab820] font-light italic">Conversation</em>
              </h2>
              <p className="text-white/55 text-sm leading-relaxed mt-3 mb-10 font-light">
                Reach out for inquiries, partnerships, or just to say hello — we'd love to hear from you.
              </p>

              <div className="space-y-7">
                {contactInfo.map((item, i) => (
                  <div key={i} className="flex items-start gap-4">
                    <div
                      className="mt-0.5 w-10 h-10 rounded-xl flex items-center justify-center text-white shrink-0"
                      style={{ background: "rgba(255,255,255,0.1)", border: "1px solid rgba(255,255,255,0.15)" }}
                    >
                      {item.icon}
                    </div>
                    <div>
                      <p className="text-[10px] tracking-[3px] uppercase text-[#aab820] font-semibold mb-0.5">{item.label}</p>
                      <p className="text-white font-medium text-sm leading-snug">{item.value}</p>
                      <p className="text-white/50 text-xs mt-0.5">{item.sub}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="relative z-10 mt-12 pt-8 border-t border-white/10">
              <p className="text-white/30 text-xs tracking-widest uppercase mb-3">Business Hours</p>
              <p className="text-white/70 text-sm">Monday – Saturday</p>
              <p className="text-[#aab820] text-sm font-semibold">9:00 AM – 6:00 PM IST</p>
            </div>
          </div>

          {/* RIGHT — Form Panel */}
          <div className="flex-1 bg-white px-10 py-12">
            <div className="mb-8">
              <h2 className="text-3xl font-bold text-[#820c0c] mb-1" style={{ fontFamily: "'Playfair Display', serif" }}>
                Send Us a Message
              </h2>
              <p className="text-gray-400 text-sm">We will get back to you within 24 hours.</p>
            </div>

            {submitted && (
              <div className="mb-6 flex items-center gap-3 bg-green-50 border border-green-200 text-green-700 px-4 py-3 rounded-xl text-sm" style={{ animation: "fadeUp 0.4s ease both" }}>
                <svg className="w-4 h-4 shrink-0" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                  <polyline points="20 6 9 17 4 12" />
                </svg>
                Message sent successfully! We'll be in touch soon.
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-5">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                <div>
                  <label className="block text-xs font-semibold tracking-widest uppercase text-[#820c0c]/70 mb-2">Full Name</label>
                  <input
                    type="text"
                    name="name"
                    value={form.name}
                    onChange={handleChange}
                    required
                    placeholder="Your name"
                    className="inp w-full px-4 py-3 rounded-xl border border-gray-200 bg-[#fefbf6] text-gray-800 text-sm transition-all"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold tracking-widest uppercase text-[#820c0c]/70 mb-2">Phone</label>
                  <input
                    type="tel"
                    name="phone"
                    value={form.phone}
                    onChange={handleChange}
                    placeholder="+91 98765 43210"
                    className="inp w-full px-4 py-3 rounded-xl border border-gray-200 bg-[#fefbf6] text-gray-800 text-sm transition-all"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold tracking-widest uppercase text-[#820c0c]/70 mb-2">Email Address</label>
                <input
                  type="email"
                  name="email"
                  value={form.email}
                  onChange={handleChange}
                  required
                  placeholder="you@example.com"
                  className="inp w-full px-4 py-3 rounded-xl border border-gray-200 bg-[#fefbf6] text-gray-800 text-sm transition-all"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold tracking-widest uppercase text-[#820c0c]/70 mb-2">Message</label>
                <textarea
                  name="message"
                  value={form.message}
                  onChange={handleChange}
                  required
                  rows={6}
                  placeholder="Write your message here..."
                  className="inp w-full px-4 py-3 rounded-xl border border-gray-200 bg-[#fefbf6] text-gray-800 text-sm transition-all resize-none"
                />
              </div>

              <button
                type="submit"
                className="w-full py-4 rounded-xl text-white text-sm font-semibold tracking-widest uppercase transition-all hover:opacity-90 active:scale-[0.98]"
                style={{ background: "linear-gradient(135deg, #820c0c 0%, #a81010 100%)", boxShadow: "0 8px 24px rgba(130,12,12,0.25)" }}
              >
                Send Message →
              </button>
            </form>
          </div>
        </div>
      </section>

      {/* ── FULL WIDTH MAP ── */}
      <section className="w-full">
        <div className="w-full h-[500px]">
          <iframe
            src="https://www.google.com/maps/embed?pb=!1m23!1m12!1m3!1d250564.89793483046!2d77.3439278!3d11.1076742!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!4m8!3e6!4m0!4m5!1s0x3ba9ababa3eecfcf%3A0xd5408d394061bcb5!2sSri%20Bakawathi%20Life%20Science%2C%20No%3A1%2F770%2C%20K.Ayyampalayam(PO)%2C%20K.S.N%20Puram(Via)%2C%20Palladam%2C%20Tamil%20Nadu%20641662!3m2!1d10.982724!2d77.2239895!5e0!3m2!1sen!2sin!4v1772442468303!5m2!1sen!2sin"
            width="100%"
            height="100%"
            style={{ border: 0 }}
            allowFullScreen=""
            loading="lazy"
          />
        </div>
      </section>
    </div>
  );
}