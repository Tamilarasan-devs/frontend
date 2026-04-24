import React from "react";
import {
  FaFacebookF, FaInstagram, FaTwitter, FaYoutube,
  FaLinkedinIn, FaPhoneAlt, FaEnvelope, FaMapMarkerAlt,
} from "react-icons/fa";
import logo from '../../assets/images/logo.jpg';

const quickLinks = [
  { label: "Home", path: "/" },
  { label: "About", path: "/aboutpage" },
  { label: "Shop", path: "/productListing" },
  { label: "Dealership", path: "/dealership" },
  { label: "Blog", path: "/blog" },
  { label: "Contact", path: "/contact" },
];

const helpLinks = [
  { label: "FAQ'S", path: "/faq" },
  { label: "Shipping Policy", path: "/shipping-policy" },
  { label: "Return & Cancellation", path: "/returns" },
  { label: "Terms of Use", path: "/terms" },
  { label: "Privacy Policy", path: "/privacy" },
];

const socials = [
  { icon: <FaFacebookF size={13} />, link: "https://www.facebook.com/", label: "Facebook" },
  { icon: <FaInstagram size={13} />, link: "https://www.instagram.com/Aayubakwath/", label: "Instagram" },
  { icon: <FaTwitter size={13} />, link: "https://x.com/Aayubakwath", label: "Twitter" },
  { icon: <FaYoutube size={13} />, link: "https://studio.youtube.com/channel/UCx9SZTz-XdtUMtKz5pZsJcg/editing/profile", label: "YouTube" },
  { icon: <FaLinkedinIn size={13} />, link: "https://www.linkedin.com/in/sri-bakawathi-life-science-932a143b2/", label: "LinkedIn" },
];

const badges = [
  { label: "100% Pure & Natural", icon: "✨" },
  { label: "ISO Certified Excellence", icon: "🛡️" },
  { label: "Traditional Wisdom", icon: "🌿" },
];

export default function Footer() {
  return (
    <>
      <style>{`
        :root {
          --blue: #03349a;
          --gold: #c9a84c;
          --cream: #fdf8f0;
        }

        .footer-root {
          background: var(--cream);
          border-top: 1px solid rgba(201,168,76,0.2);
          position: relative;
          overflow: hidden;

        }

        .footer-root::before {
          content: '';
          position: absolute;
          inset: 0;
          background-image:
            radial-gradient(circle at 15% 15%, rgba(201,168,76,0.07) 0%, transparent 45%),
            radial-gradient(circle at 85% 85%, rgba(3,52,154,0.04) 0%, transparent 45%);
          pointer-events: none;
        }

        .footer-top-bar {
          height: 2px;
          background: linear-gradient(to right, transparent, var(--gold) 20%, #ffe08a 45%, var(--blue) 60%, var(--gold) 80%, transparent);
          opacity: 0.55;
        }

        .nav-link {
          color: #3d2c2c;
          font-size: 15px;
          font-weight: 500;
          transition: color 0.2s, transform 0.2s;
          display: inline-flex;
          align-items: center;
          gap: 5px;
          position: relative;
        }
        .nav-link::after {
          content: '';
          position: absolute;
          bottom: -1px; left: 0;
          width: 0; height: 1px;
          background: var(--gold);
          transition: width 0.25s ease;
        }
        .nav-link:hover { color: var(--blue); transform: translateX(3px); }
        .nav-link:hover::after { width: 100%; }

        .social-pill {
          width: 34px; height: 34px;
          border-radius: 50%;
          display: flex; align-items: center; justify-content: center;
          background: white;
          border: 1px solid rgba(201,168,76,0.3);
          color: var(--blue);
          transition: all 0.25s;
          box-shadow: 0 1px 5px rgba(0,0,0,0.05);
        }
        .social-pill:hover {
          background: var(--blue);
          color: white;
          border-color: var(--blue);
          transform: translateY(-2px);
          box-shadow: 0 6px 14px rgba(3,52,154,0.22);
        }

        .col-heading {
          font-size: 14px;
          font-weight: 800;
          letter-spacing: 0.12em;
          text-transform: uppercase;
          color: var(--blue);
          padding-bottom: 10px;
          margin-bottom: 14px;
          border-bottom: 1.5px solid rgba(201,168,76,0.3);
          position: relative;
        }
        .col-heading::after {
          content: '';
          position: absolute;
          bottom: -1.5px; left: 0;
          width: 24px; height: 1.5px;
          background: var(--gold);
        }

        .contact-icon-box {
          width: 30px; height: 30px;
          border-radius: 8px;
          background: rgba(201,168,76,0.1);
          border: 1px solid rgba(201,168,76,0.2);
          display: flex; align-items: center; justify-content: center;
          flex-shrink: 0;
          color: var(--blue);
        }

        .badge-chip {
          display: inline-flex;
          align-items: center;
          gap: 6px;
          background: rgba(255,255,255,0.6);
          border: 1px solid rgba(201,168,76,0.18);
          border-radius: 100px;
          padding: 4px 12px;
          backdrop-filter: blur(4px);
        }

        .divider {
          border: none;
          height: 1px;
          background: linear-gradient(to right, transparent, rgba(201,168,76,0.2) 20%, rgba(201,168,76,0.2) 80%, transparent);
        }
      `}</style>

      <footer className="footer-root">
        <div className="footer-top-bar" />

        {/* ── Main Grid ── */}
        <div className="max-w-7xl mx-auto px-6 pt-12 pb-8 relative">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">

            {/* Brand Column */}
            <div className="lg:col-span-1">
              {/* Logo */}
              <div className="flex items-center gap-3 mb-4">
                <a href="/">
                  <img
                    src={logo}
                    alt="Aayubakwath Logo"
                    className="w-9 h-9 rounded-lg object-cover transition-transform hover:rotate-6 duration-300"
                  />
                </a>
                <div style={{ borderLeft: "1.5px solid rgba(201,168,76,0.35)", paddingLeft: 12 }}>
                  <p className="font-extrabold leading-tight" style={{ fontSize: 20, color: "var(--blue)", letterSpacing: "0.02em" }}>
                    Aayubakwath
                  </p>
                  <span style={{ fontSize: 12, fontWeight: 700, color: "var(--gold)", textTransform: "uppercase", letterSpacing: "0.14em" }}>
                    Ayurvedic Wellness
                  </span>
                </div>
              </div>

              {/* Tagline */}
              <p className="mb-4 leading-relaxed" style={{ fontSize: 15, color: "#4a3030", fontWeight: 500 }}>
                Nature's wisdom, crafted for your well-being. Rooted in tradition, refined for today.
              </p>

              {/* Contact */}
              <div className="flex flex-col gap-3 mb-4">
                <div className="flex items-start gap-2.5">
                  <div className="contact-icon-box mt-0.5">
                    <FaMapMarkerAlt size={12} />
                  </div>
                  <p style={{ fontSize: 14.5, color: "#4a3030", lineHeight: 1.65, fontWeight: 500 }}>
                    Sri Bakawathi Life Science<br />
                    No: 1/770, K. Ayyampalayam, K.S.N Puram<br />
                    Palladam, Tiruppur – 641662, TN
                  </p>
                </div>

                <div className="flex items-center gap-2.5">
                  <div className="contact-icon-box">
                    <FaPhoneAlt size={11} />
                  </div>
                  <a href="tel:9443157282" className="nav-link" style={{ fontSize: 15, fontWeight: 600 }}>
                    +91 94431 57282
                  </a>
                </div>

                <div className="flex items-center gap-2.5">
                  <div className="contact-icon-box">
                    <FaEnvelope size={11} />
                  </div>
                  <a href="mailto:info.sblsmarketing@gmail.com" className="nav-link" style={{ fontSize: 14.5 }}>
                    info.sblsmarketing@gmail.com
                  </a>
                </div>
              </div>

              {/* Socials */}
              <div className="flex gap-2">
                {socials.map((s, i) => (
                  <a key={i} href={s.link} target="_blank" rel="noopener noreferrer" className="social-pill" aria-label={s.label}>
                    {s.icon}
                  </a>
                ))}
              </div>
            </div>

            {/* Quick Links */}
            <div>
              <h4 className="col-heading">Explore</h4>
              <ul className="flex flex-col gap-2.5 p-0 m-0 list-none">
                {quickLinks.map((link, i) => (
                  <li key={i} className="flex items-center gap-2">
                    <span className="w-1 h-1 rounded-full flex-shrink-0" style={{ background: "var(--gold)" }} />
                    <a href={link.path} className="nav-link">{link.label}</a>
                  </li>
                ))}
              </ul>
            </div>

            {/* Help Links */}
            <div>
              <h4 className="col-heading">Support</h4>
              <ul className="flex flex-col gap-2.5 p-0 m-0 list-none">
                {helpLinks.map((link, i) => (
                  <li key={i} className="flex items-center gap-2">
                    <span className="w-1 h-1 rounded-full flex-shrink-0" style={{ background: "var(--gold)" }} />
                    <a href={link.path} className="nav-link">{link.label}</a>
                  </li>
                ))}
              </ul>
            </div>

            {/* Newsletter + Badges */}
            <div>
              <h4 className="col-heading">Stay Updated</h4>
              <p className="mb-4 leading-relaxed" style={{ fontSize: 15, color: "#4a3030", fontWeight: 500 }}>
                Join our wellness community for Ayurvedic insights and exclusive offers.
              </p>

              {/* Newsletter Input */}
              <div className="flex mb-5 rounded-xl overflow-hidden" style={{ border: "1.5px solid rgba(201,168,76,0.28)", background: "white" }}>
                <input
                  type="email"
                  placeholder="Your email address"
                  className="flex-1 px-3 py-2 outline-none text-xs bg-transparent"
                  style={{ color: "#1a0a0a", fontSize: 15 }}
                />
                <button
                  className="px-4 py-2 text-white font-semibold text-xs transition-all"
                  style={{ background: "var(--blue)", fontSize: 14, letterSpacing: "0.03em" }}
                  onMouseEnter={e => e.target.style.background = "#0145cc"}
                  onMouseLeave={e => e.target.style.background = "var(--blue)"}
                >
                  Subscribe
                </button>
              </div>

              {/* Trust Badges */}
              <div className="flex flex-col gap-2">
                {badges.map((b, i) => (
                  <div key={i} className="badge-chip">
                    <span style={{ fontSize: 15 }}>{b.icon}</span>
                    <span style={{ fontSize: 14, color: "#3d2c2c", fontWeight: 600 }}>{b.label}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        <hr className="divider mx-6" />

        {/* Bottom Bar */}
        <div className="max-w-7xl mx-auto px-6 py-4 flex flex-wrap justify-between items-center gap-3">
          <p className="m-0" style={{ fontSize: 15, color: "#6a5050", fontWeight: 500 }}>
            © 2026 <span style={{ color: "var(--blue)", fontWeight: 700 }}>Aayubakwath</span>. All Rights Reserved.
          </p>
          <p className="m-0 text-right" style={{ fontSize: 14, color: "#8a7070", maxWidth: 480, lineHeight: 1.5 }}>
            *Ancient wisdom meets modern science. Our products derived from tradition.
          </p>
        </div>
      </footer>
    </>
  );
}