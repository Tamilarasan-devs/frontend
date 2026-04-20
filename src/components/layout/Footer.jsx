import React from "react";
import {
  FaFacebookF, FaInstagram, FaTwitter, FaYoutube,
  FaLinkedinIn, FaPhoneAlt, FaEnvelope, FaMapMarkerAlt,
  FaLeaf, FaArrowRight
} from "react-icons/fa";
import logo from '../../assets/images/logo.jpg'

const quickLinks = [
  { label: "Home", path: "/" },
  { label: "About", path: "/aboutpage" },
  { label: "Shop", path: "/productListing" },
  { label: "Dealership", path: "/dealership" },
  // { label: "Download", path: "/download" },
  { label: "Blog", path: "/blog" },
  { label: "Contact", path: "/contact" }
];
const helpLinks = [
  { label: "FAQ'S", path: "/faq" },
  { label: "Shipping Policy", path: "/shipping-policy" },
  { label: "Return & Cancellation", path: "/returns" },
  { label: "Terms of Use", path: "/terms" },
  { label: "Privacy Policy", path: "/privacy" }
];

const socials = [
  { icon: <FaFacebookF size={16} />, link: "https://www.facebook.com/", label: "Facebook" },
  { icon: <FaInstagram size={16} />, link: "https://www.instagram.com/aayubakawath/", label: "Instagram" },
  { icon: <FaTwitter size={16} />, link: "https://x.com/Aayubakwath", label: "Twitter" },
  { icon: <FaYoutube size={16} />, link: "https://studio.youtube.com/channel/UCx9SZTz-XdtUMtKz5pZsJcg/editing/profile", label: "YouTube" },
  { icon: <FaLinkedinIn size={16} />, link: "https://www.linkedin.com/in/sri-bakawathi-life-science-932a143b2/", label: "LinkedIn" },
];

export default function Footer() {
  return (
    <>
      <style>{`
        :root { --blue: #03349a; --gold: #c9a84c; --cream: #fdf8f0; --dark: #1a0a0a; }

        .footer-root {
          background: var(--cream);
          position: relative;
          overflow: hidden;
          border-top: 1px solid rgba(201,168,76,0.2);
        }

        /* Subtle texture overlay - updated colors for light theme */
        .footer-root::before {
          content: '';
          position: absolute;
          inset: 0;
          background-image: radial-gradient(circle at 20% 20%, rgba(201,168,76,0.08) 0%, transparent 50%),
                            radial-gradient(circle at 80% 80%, rgba(3,52,154,0.04) 0%, transparent 45%),
                            radial-gradient(circle at 60% 10%, rgba(201,168,76,0.1) 0%, transparent 40%);
          pointer-events: none;
        }

        /* Decorative top border - matches header dividers */
        .footer-top-border {
          height: 3px;
          background: linear-gradient(to right, transparent, var(--gold) 15%, #ffe08a 40%, var(--blue) 60%, var(--gold) 80%, transparent);
          opacity: 0.6;
        }

        .footer-link {
          position: relative;
          color: #4a3030;
          font-size: 16px;
          font-weight: 500;
          letter-spacing: 0.01em;
          transition: all 0.25s ease;
          display: inline-flex;
          align-items: center;
          gap: 6px;
        }

        .footer-link:hover {
          color: var(--blue);
          transform: translateX(4px);
        }

        .footer-link::after {
          content: '';
          position: absolute;
          bottom: -2px;
          left: 0;
          width: 0;
          height: 1.5px;
          background: var(--gold);
          transition: width 0.3s ease;
        }

        .footer-link:hover::after { width: 100%; }

        .social-btn {
          width: 42px; height: 42px;
          border-radius: 50%;
          display: flex; align-items: center; justify-content: center;
          background: white;
          border: 1px solid rgba(201,168,76,0.3);
          color: var(--blue);
          transition: all 0.3s ease;
          box-shadow: 0 2px 8px rgba(0,0,0,0.05);
        }

        .social-btn:hover {
          background: var(--blue);
          border-color: var(--blue);
          color: white;
          transform: translateY(-3px);
          box-shadow: 0 8px 16px rgba(3,52,154,0.25);
        }

        .contact-item {
          display: flex;
          align-items: flex-start;
          gap: 12px;
        }

        .contact-icon {
          width: 38px; height: 38px;
          border-radius: 10px;
          background: rgba(201,168,76,0.1);
          border: 1px solid rgba(201,168,76,0.2);
          display: flex; align-items: center; justify-content: center;
          flex-shrink: 0;
          color: var(--blue);
          transition: all 0.3s ease;
        }

        .section-heading {
          font-family: inherit;
          font-size: 20px;
          font-weight: 700;
          color: var(--blue);
          letter-spacing: 0.05em;
          text-transform: uppercase;
          margin-bottom: 22px;
          padding-bottom: 12px;
          position: relative;
        }

        .section-heading::after {
          content: '';
          position: absolute;
          bottom: 0; left: 0;
          width: 32px; height: 2px;
          background: var(--gold);
          border-radius: 2px;
        }

        .newsletter-input {
          background: white;
          border: 1.5px solid rgba(201,168,76,0.25);
          border-radius: 10px 0 0 10px;
          color: var(--dark);
          padding: 11px 16px;
          font-size: 15px;
          outline: none;
          flex: 1;
          transition: all 0.3s;
        }

        .newsletter-input::placeholder { color: #bba070; }
        .newsletter-input:focus { border-color: var(--blue); box-shadow: 0 0 0 3px rgba(3,52,154,0.05); }

        .newsletter-btn {
          background: var(--blue);
          border: none;
          border-radius: 0 10px 10px 0;
          color: white;
          padding: 11px 18px;
          cursor: pointer;
          transition: all 0.3s;
        }

        .newsletter-btn:hover { background: #0145cc; }

        .divider-line {
          border: none;
          height: 1px;
          background: linear-gradient(to right, transparent, rgba(201,168,76,0.2) 20%, rgba(201,168,76,0.2) 80%, transparent);
          margin: 0;
        }

        .badge-dot {
          width: 6px; height: 6px; border-radius: 50%;
          background: var(--gold);
          display: inline-block;
          margin-right: 10px;
          flex-shrink: 0;
        }

        @keyframes shim{0%{background-position:200% center}100%{background-position:-200% center}}
        .shim-btn-footer {
          background: linear-gradient(90deg, var(--blue), var(--gold), #ffe08a, var(--blue));
          background-size: 200% auto;
          animation: shim 3s linear infinite;
        }

        .footer-display {
          font-family: inherit;
        }
      `}</style>

      <footer className="footer-root">
        <div className="footer-top-border" />

        {/* Main Grid */}
        <div style={{ maxWidth: 1320, margin: "0 auto", padding: "70px 32px 50px", position: "relative" }}>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(240px, 1fr))", gap: "50px 40px" }}>

            {/* ── Brand Column ── */}
            <div style={{ gridColumn: "span 1" }}>
              {/* Logo + Name */}
              <div style={{ display: "flex", alignItems: "center", gap: 14, marginBottom: 22 }}>
                <a href="/">
                  <img src={logo} className="w-11 h-11 transition-transform duration-300 hover:rotate-12" alt="Aayubakawath Logo" />
                </a>
                <div style={{ borderLeft: "2px solid rgba(201,168,76,0.3)", paddingLeft: 14 }}>
                  <h2 className="footer-display" style={{ fontSize: 26, fontWeight: 800, color: "var(--blue)", letterSpacing: "0.02em", lineHeight: 1 }}>
                    Aayubakawath
                  </h2>
                  <span style={{ fontSize: 12, fontWeight: 700, color: "var(--gold)", textTransform: "uppercase", letterSpacing: "0.15em" }}>
                    Ayurvedic Wellness
                  </span>
                </div>
              </div>

              {/* Tagline */}
              <p style={{ fontSize: 16.5, color: "#4a3030", lineHeight: 1.8, marginBottom: 26, fontWeight: 500 }}>
                Nature's wisdom, crafted for your well-being. Rooted in tradition, refined for today's lifestyle.
              </p>

              {/* Contact items */}
              <div style={{ display: "flex", flexDirection: "column", gap: 16, marginBottom: 26 }}>
                <div className="contact-item">
                  <div className="contact-icon">
                    <FaMapMarkerAlt size={16} />
                  </div>
                  <p style={{ fontSize: 15.5, color: "#4a3030", lineHeight: 1.6, fontWeight: 500 }}>
                    Sri Bakawathi Life Science<br />
                    No: 1/770, K. Ayyampalayam, K.S.N Puram<br />
                    Palladam, Tiruppur – 641662, TN
                  </p>
                </div>

                <div className="contact-item">
                  <div className="contact-icon">
                    <FaPhoneAlt size={15} />
                  </div>
                  <a href="tel:9443157282" className="footer-link" style={{ fontSize: 16, fontWeight: 600 }}>
                    +91 94431 57282
                  </a>
                </div>

                <div className="contact-item">
                  <div className="contact-icon">
                    <FaEnvelope size={15} />
                  </div>
                  <a href="mailto:info.sblsmarketing@gmail.com" className="footer-link" style={{ fontSize: 16 }}>
                    info.sblsmarketing@gmail.com
                  </a>
                </div>
              </div>

              {/* Socials */}
              <div style={{ display: "flex", gap: 12 }}>
                {socials.map((s, i) => (
                  <a key={i} href={s.link} target="_blank" rel="noopener noreferrer" className="social-btn" aria-label={s.label}>
                    {s.icon}
                  </a>
                ))}
              </div>
            </div>

            {/* ── Quick Links ── */}
            <div>
              <h4 className="section-heading">Explore</h4>
              <ul style={{ listStyle: "none", padding: 0, margin: 0, display: "flex", flexDirection: "column", gap: 14 }}>
                {quickLinks.map((link, i) => (
                  <li key={i} style={{ display: "flex", alignItems: "center" }}>
                    <span className="badge-dot" />
                    <a href={link.path} className="footer-link">{link.label}</a>
                  </li>
                ))}
              </ul>
            </div>

            {/* ── Help ── */}
            <div>
              <h4 className="section-heading">Support</h4>
              <ul style={{ listStyle: "none", padding: 0, margin: 0, display: "flex", flexDirection: "column", gap: 14 }}>
                {helpLinks.map((link, i) => (
                  <li key={i} style={{ display: "flex", alignItems: "center" }}>
                    <span className="badge-dot" />
                    <a href={link.path} className="footer-link">{link.label}</a>
                  </li>
                ))}
              </ul>
            </div>

            {/* ── Newsletter ── */}
            <div>
              <h4 className="section-heading">Stay Updated</h4>
              <p style={{ fontSize: 16, color: "#4a3030", lineHeight: 1.7, marginBottom: 22, fontWeight: 500 }}>
                Join our wellness community for Ayurvedic insights and exclusive offers.
              </p>
             

              {/* Trust badges */}
              <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
                {[
                  { label: "100% Pure & Natural", icon: "✨" },
                  { label: "ISO Certified Excellence", icon: "🛡️" },
                  { label: "Traditional Wisdom", icon: "🌿" }
                ].map((badge, i) => (
                  <div key={i} style={{ display: "flex", alignItems: "center", gap: 10, background: "rgba(255,255,255,0.4)", padding: "6px 14px", borderRadius: "100px", border: "1px solid rgba(201,168,76,0.15)", width: "fit-content" }}>
                    <span style={{ fontSize: 15 }}>{badge.icon}</span>
                    <span style={{ fontSize: 14.5, color: "#4a3030", fontWeight: 600, letterSpacing: "0.01em" }}>{badge.label}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        <hr className="divider-line" />

        {/* Bottom Bar */}
        <div style={{ maxWidth: 1320, margin: "0 auto", padding: "24px 32px", display: "flex", flexWrap: "wrap", justifyContent: "space-between", alignItems: "center", gap: 20, position: "relative" }}>
          <p style={{ fontSize: 15.5, color: "#6a5050", margin: 0, fontWeight: 500 }}>
            © 2026 <span style={{ color: "var(--blue)", fontWeight: 700 }}>Aayubakawath</span>. All Rights Reserved.
          </p>
          <div style={{ display: "flex", alignItems: "center", gap: 24 }}>
             <p style={{ fontSize: 14, color: "#8a7070", maxWidth: 640, lineHeight: 1.6, margin: 0, textAlign: "right", fontStyle: "italic" }}>
              *Ancient wisdom meets modern science. Our products derived from tradition.
            </p>
          </div>
        </div>
      </footer>
    </>
  );
}