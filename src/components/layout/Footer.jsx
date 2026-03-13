import React from "react";
import {
  FaFacebookF, FaInstagram, FaTwitter, FaYoutube,
  FaLinkedinIn, FaPhoneAlt, FaEnvelope, FaMapMarkerAlt,
  FaLeaf, FaArrowRight
} from "react-icons/fa";
import logo from '../../assets/images/logo.jpg'
const Logo = () => (
  <svg viewBox="0 0 200 160" fill="none" xmlns="http://www.w3.org/2000/svg" style={{ width: 48, height: 38 }}>
    <path d="M100 155 C60 155 10 120 10 80 C10 60 30 45 55 50 C70 52 85 65 100 85 C115 65 130 52 145 50 C170 45 190 60 190 80 C190 120 140 155 100 155Z" fill="#8B1010"/>
    <path d="M100 130 C75 130 45 108 45 80 C45 65 58 55 72 58 C83 60 93 72 100 90 C107 72 117 60 128 58 C142 55 155 65 155 80 C155 108 125 130 100 130Z" fill="#D4845A"/>
    <path d="M100 58 C93 58 86 52 86 44 C86 38 91 34 96 36 C98 37 99 39 100 41 C101 39 102 37 104 36 C109 34 114 38 114 44 C114 52 107 58 100 58Z" fill="#6B8C1A"/>
  </svg>
);

const quickLinks = ["Home", "About", "Shop", "Dealership", "Download", "Blog", "Contact"];
const helpLinks = ["FAQ'S", "Shipping Policy", "Return & Cancellation", "Terms of Use", "Privacy Policy"];

const socials = [
  { icon: <FaFacebookF size={14} />, link: "https://www.facebook.com/", label: "Facebook" },
  { icon: <FaInstagram size={14} />, link: "https://www.instagram.com/aayubakawath/", label: "Instagram" },
  { icon: <FaTwitter size={14} />, link: "https://x.com/Aayubakwath", label: "Twitter" },
  { icon: <FaYoutube size={14} />, link: "https://studio.youtube.com/channel/UCx9SZTz-XdtUMtKz5pZsJcg/editing/profile", label: "YouTube" },
  { icon: <FaLinkedinIn size={14} />, link: "https://www.linkedin.com/in/sri-bakawathi-life-science-932a143b2/", label: "LinkedIn" },
];

export default function Footer() {
  return (
    <>
      <style>{`

        .footer-root {
          
          background: linear-gradient(175deg, #820c0c 0%, #820c0c 40%, #820c0c 100%); 
          position: relative;
          overflow: hidden;
        }

        .footer-display {
          font-family: 'Cormorant Garamond', Georgia, serif;
        }

        /* Subtle texture overlay */
        .footer-root::before {
          content: '';
          position: absolute;
          inset: 0;
          background-image: radial-gradient(circle at 20% 20%, rgba(107,140,26,0.06) 0%, transparent 50%),
                            radial-gradient(circle at 80% 80%, rgba(201,100,58,0.07) 0%, transparent 45%),
                            radial-gradient(circle at 60% 10%, rgba(139,16,16,0.15) 0%, transparent 40%);
          pointer-events: none;
        }

        /* Decorative top border */
        .footer-top-border {
          height: 3px;
          background: linear-gradient(to right, transparent, #8B1010 15%, #D4845A 40%, #6B8C1A 60%, #D4845A 80%, transparent);
        }

        .footer-link {
          position: relative;
          color: #fff;
          font-size: 14px;
          font-weight: 400;
          letter-spacing: 0.02em;
          transition: color 0.25s ease;
          display: inline-flex;
          align-items: center;
          gap: 6px;
        }

        .footer-link:hover {
          color: #D4845A;
        }

        .footer-link::after {
          content: '';
          position: absolute;
          bottom: -2px;
          left: 0;
          width: 0;
          height: 1px;
          background: #D4845A;
          transition: width 0.3s ease;
        }

        .footer-link:hover::after { width: 100%; }

        .social-btn {
          width: 38px; height: 38px;
          border-radius: 50%;
          display: flex; align-items: center; justify-content: center;
          background: rgba(255,255,255,0.06);
          border: 1px solid rgba(255,255,255,0.1);
          color: #fff;
          transition: all 0.3s ease;
        }

        .social-btn:hover {
          background: #6B8C1A;
          border-color: #6B8C1A;
          color: white;
          transform: translateY(-3px);
          box-shadow: 0 8px 20px rgba(107,140,26,0.35);
        }

        .contact-item {
          display: flex;
          align-items: flex-start;
          gap: 12px;
        }

        .contact-icon {
          width: 32px; height: 32px;
          border-radius: 8px;
          background: rgba(107,140,26,0.15);
          border: 1px solid rgba(107,140,26,0.25);
          display: flex; align-items: center; justify-content: center;
          flex-shrink: 0;
          margin-top: 1px;
        }

        .section-heading {
          font-family: 'Cormorant Garamond', serif;
          font-size: 18px;
          font-weight: 600;
          color: #f5ede8;
          letter-spacing: 0.06em;
          text-transform: uppercase;
          margin-bottom: 20px;
          padding-bottom: 12px;
          position: relative;
        }

        .section-heading::after {
          content: '';
          position: absolute;
          bottom: 0; left: 0;
          width: 36px; height: 2px;
          background: linear-gradient(to right, #D4845A, #6B8C1A);
          border-radius: 2px;
        }

        .newsletter-input {
          background: rgba(255,255,255,0.06);
          border: 1px solid rgba(255,255,255,0.12);
          border-radius: 8px 0 0 8px;
          color: white;
          padding: 10px 14px;
          font-family: 'Nunito Sans', sans-serif;
          font-size: 13px;
          outline: none;
          flex: 1;
          transition: border-color 0.3s;
        }

        .newsletter-input::placeholder { color: rgba(255,255,255,0.3); }
        .newsletter-input:focus { border-color: rgba(212,132,90,0.5); }

        .newsletter-btn {
          background: linear-gradient(135deg, #8B1010, #D4845A);
          border: none;
          border-radius: 0 8px 8px 0;
          color: white;
          padding: 10px 16px;
          cursor: pointer;
          transition: opacity 0.3s;
        }

        .newsletter-btn:hover { opacity: 0.85; }

        .divider-line {
          border: none;
          height: 1px;
          background: linear-gradient(to right, transparent, rgba(255,255,255,0.1) 20%, rgba(255,255,255,0.1) 80%, transparent);
          margin: 0;
        }

        .badge-dot {
          width: 6px; height: 6px; border-radius: 50%;
          background: #6B8C1A;
          display: inline-block;
          margin-right: 8px;
          flex-shrink: 0;
        }
      `}</style>

      <footer className="footer-root">
        <div className="footer-top-border" />

        {/* Main Grid */}
        <div style={{ maxWidth: 1200, margin: "0 auto", padding: "60px 32px 48px", position: "relative" }}>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))", gap: "48px 40px" }}>

            {/* ── Brand Column ── */}
            <div style={{ gridColumn: "span 1" }}>
              {/* Logo + Name */}
              <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 20 }}>
                <div 
                >
                 <img src={logo}  className="rounded-full w-10 h-10"/>
                </div>
                <div>
                  <h2 className="footer-display" style={{ fontSize: 22, fontWeight: 700, color: "#f5ede8", letterSpacing: "0.04em", lineHeight: 1.2 }}>
                    Aayubakawath
                  </h2>
                  
                </div>
              </div>

              {/* Tagline */}
              <p style={{ fontSize: 13.5, color: "#fff", lineHeight: 1.75, marginBottom: 24, fontStyle: "italic" }}>
                Nature's wisdom, crafted for your well-being. Rooted in tradition, refined for today.
              </p>

              {/* Contact items */}
              <div style={{ display: "flex", flexDirection: "column", gap: 14, marginBottom: 24 }}>
                <div className="contact-item">
                  <div className="contact-icon">
                    <FaMapMarkerAlt size={13} color="#6B8C1A" />
                  </div>
                  <p style={{ fontSize: 13, color: "#fff", lineHeight: 1.65 }}>
                    Sri Bakawathi Life Science<br />
                    No: 1/770, K. Ayyampalayam (PO)<br />
                    K.S.N Puram, Palladam<br />
                    Tiruppur – 641662, Tamil Nadu
                  </p>
                </div>

                <div className="contact-item">
                  <div className="contact-icon">
                    <FaPhoneAlt size={12} color="#6B8C1A" />
                  </div>
                  <a href="tel:9443157282" className="footer-link" style={{ fontSize: 14 }}>
                    +91 94431 57282
                  </a>
                </div>

                <div className="contact-item">
                  <div className="contact-icon">
                    <FaEnvelope size={12} color="#6B8C1A" />
                  </div>
                  <a href="mailto:info.sblsmarketing@gmail.com" className="footer-link" style={{ fontSize: 13.5 }}>
                    info.sblsmarketing@gmail.com
                  </a>
                </div>
              </div>

              {/* Socials */}
              <div style={{ display: "flex", gap: 10 }}>
                {socials.map((s, i) => (
                  <a key={i} href={s.link} target="_blank" rel="noopener noreferrer" className="social-btn" aria-label={s.label}>
                    {s.icon}
                  </a>
                ))}
              </div>
            </div>

            {/* ── Quick Links ── */}
            <div>
              <h4 className="section-heading">Quick Links</h4>
              <ul style={{ listStyle: "none", padding: 0, margin: 0, display: "flex", flexDirection: "column", gap: 12 }}>
                {quickLinks.map((link, i) => (
                  <li key={i} style={{ display: "flex", alignItems: "center" }}>
                    <span className="badge-dot" />
                    <a href="#" className="footer-link">{link}</a>
                  </li>
                ))}
              </ul>
            </div>

            {/* ── Help ── */}
            <div>
              <h4 className="section-heading">Help & Support</h4>
              <ul style={{ listStyle: "none", padding: 0, margin: 0, display: "flex", flexDirection: "column", gap: 12 }}>
                {helpLinks.map((link, i) => (
                  <li key={i} style={{ display: "flex", alignItems: "center" }}>
                    <span className="badge-dot" />
                    <a href="#" className="footer-link">{link}</a>
                  </li>
                ))}
              </ul>
            </div>

            {/* ── Newsletter ── */}
            <div>
              <h4 className="section-heading">Stay Connected</h4>
              <p style={{ fontSize: 13.5, color: "#fff", lineHeight: 1.7, marginBottom: 20 }}>
                Subscribe for Ayurvedic tips, product launches, and exclusive wellness updates.
              </p>
              <div style={{ display: "flex", marginBottom: 24 }}>
                <input className="newsletter-input" type="email" placeholder="Your email address" />
                <button className="newsletter-btn">
                  <FaArrowRight size={13} />
                </button>
              </div>

              {/* Trust badges */}
              <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
                {["100% Natural Ingredients", "ISO Certified Products", "Trusted Since Tradition"].map((badge, i) => (
                  <div key={i} style={{ display: "flex", alignItems: "center", gap: 8 }}>
                    <FaLeaf size={11} color="#6B8C1A" />
                    <span style={{ fontSize: 12.5, color: "#fff", letterSpacing: "0.03em" }}>{badge}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        <hr className="divider-line" />

        {/* Bottom Bar */}
        <div style={{ maxWidth: 1200, margin: "0 auto", padding: "20px 32px", display: "flex", flexWrap: "wrap", justifyContent: "space-between", alignItems: "flex-start", gap: 16, position: "relative" }}>
          <p style={{ fontSize: 13, color: "#fff", margin: 0 }}>
            © 2026 <span style={{ color: "#fff", fontWeight: 600 }}>Aayubakawath</span> · Sri Bakawathi Life Science. All Rights Reserved.
          </p>
          <p style={{ fontSize: 12, color: "#fff", maxWidth: 640, lineHeight: 1.7, margin: 0, textAlign: "right" }}>
            Information provided is for informational purposes only and is not a substitute for medical advice. 
            Intended for Indian residents for personal use. Product images are for representation purposes only.
          </p>
        </div>

      </footer>
    </>
  );
}