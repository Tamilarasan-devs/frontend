import logo from '../../assets/images/logo.jpg'

import TopScroll from './TopScroll'
import React, { useState, useRef, useEffect } from "react";
import { useLocation } from "react-router-dom";
import { FaHeart, FaShoppingCart, FaUser, FaSearch, FaTimes, FaBars } from "react-icons/fa";

/* ─────────────────────────────────────────────────────────────────────
   FONTS + KEYFRAMES  (only things Tailwind can't do)
───────────────────────────────────────────────────────────────────── */
const FontLoader = () => (
  <style>{`
    @import url('https://fonts.googleapis.com/css2?family=Cinzel:wght@400;600;700&family=Cormorant+Garamond:ital,wght@0,400;0,600;0,700;1,400&family=DM+Sans:wght@300;400;500;600&display=swap');

    .font-cinzel    { font-family: 'Cinzel', serif; }
    .font-cormorant { font-family: 'Cormorant Garamond', serif; }
    .font-dm        { font-family: 'DM Sans', sans-serif; }

    /* ribbon scroll */
    @keyframes marquee {
      0%   { transform: translateX(0); }
      100% { transform: translateX(-50%); }
    }
    .marquee-track { animation: marquee 26s linear infinite; }

    /* logo shine */
    @keyframes shine {
      0%,100% { opacity: 0; left: -60%; }
      50%      { opacity: 1; left: 110%; }
    }
    .logo-shine { animation: shine 5s ease-in-out infinite; }

    /* dropdown */
    @keyframes dropIn {
      from { opacity: 0; transform: translateY(-6px) scale(.97); }
      to   { opacity: 1; transform: translateY(0)   scale(1);   }
    }
    .anim-drop { animation: dropIn .2s cubic-bezier(.4,0,.2,1) forwards; }

    /* mobile panel */
    @keyframes panelDown {
      from { opacity: 0; transform: translateY(-8px); }
      to   { opacity: 1; transform: translateY(0); }
    }
    .anim-panel { animation: panelDown .25s cubic-bezier(.4,0,.2,1) forwards; }

    /* desktop active bar slide-in */
    @keyframes lineSlide {
      from { transform: scaleX(0); }
      to   { transform: scaleX(1); }
    }
    .active-bar {
      animation: lineSlide .35s cubic-bezier(.4,0,.2,1) forwards;
      transform-origin: center;
    }

    /* pulsing dot */
    @keyframes dotPulse {
      0%,100% { transform: translate(-50%, 0) scale(1);   opacity: 1; }
      50%      { transform: translate(-50%, 0) scale(1.7); opacity: 0.4; }
    }
    .active-dot { animation: dotPulse 2.2s ease-in-out infinite; }

    /* desktop inactive hover underline */
    .nav-hover { position: relative; }
    .nav-hover::after {
      content: '';
      position: absolute; bottom: -2px; left: 0; right: 0; height: 1px;
      background: linear-gradient(90deg, #c9a84c, #e8d48a, #c9a84c);
      transform: scaleX(0); transform-origin: center;
      transition: transform .28s cubic-bezier(.4,0,.2,1);
    }
    .nav-hover:hover::after { transform: scaleX(1); }

    /* expandable search */
    .srch { width: 0; opacity: 0; overflow: hidden;
            transition: width .35s cubic-bezier(.4,0,.2,1), opacity .28s; }
    .srch.open { width: 170px; opacity: 1; }
  `}</style>
);

/* ─── Gold vertical divider ──────────────────────────────────────────── */
const VDivider = () => (
  <div className="hidden lg:block w-px h-8 flex-shrink-0"
       style={{ background: "linear-gradient(180deg,transparent,#c9a84c 35%,#c9a84c 65%,transparent)" }} />
);

/* ─── Cart / wishlist badge ──────────────────────────────────────────── */
const Dot = ({ n, accent }) => (
  <span className="absolute -top-[5px] -right-[5px] min-w-[16px] h-4 flex items-center
                   justify-center rounded-full text-white font-bold text-[9px] px-[3px]
                   border-[1.5px] border-[#fdf8f0]"
        style={{ background: accent ? "#c9a84c" : "#8b0000" }}>
    {n}
  </span>
);

/* ─── Desktop nav link ───────────────────────────────────────────────── */
const DesktopLink = ({ href, label, active }) => (
  <a href={href}
     className={`relative font-dm text-[13px] font-bold tracking-[1.8px] uppercase
                 px-3 py-1.5 rounded transition-colors duration-200
                 ${active ? "" : "nav-hover"}`}
     style={{ color: active ? "#8b0000" : "#1a0a0a" }}
     onMouseEnter={e => { if (!active) e.currentTarget.style.color = "#8b0000"; }}
     onMouseLeave={e => { if (!active) e.currentTarget.style.color = "#1a0a0a"; }}>

    {label}

    {active && (
      <>
        {/* glowing underline */}
        <span className="active-bar absolute bottom-[-2px] left-0 right-0 h-[2px] rounded-full"
              style={{ background: "linear-gradient(90deg,#c9a84c,#ffe08a,#c9a84c)",
                       boxShadow: "0 0 7px rgba(201,168,76,0.75)" }} />
        {/* pulsing dot */}
        <span className="active-dot absolute w-[5px] h-[5px] rounded-full"
              style={{ background: "#c9a84c", bottom: -8, left: "50%",
                       transform: "translateX(-50%)" }} />
      </>
    )}
  </a>
);

/* ─── Mobile nav link ────────────────────────────────────────────────── */
const MobileLink = ({ href, label, active, onClick }) => (
  <a href={href} onClick={onClick}
     className="flex items-center gap-3 py-3.5 font-dm text-[11.5px] tracking-[2px] uppercase
                transition-colors duration-150"
     style={{
       color: active ? "#8b0000" : "#4a3030",
       fontWeight: active ? "600" : "400",
       borderBottom: "1px solid rgba(201,168,76,0.12)",
     }}>

    {/* left accent bar */}
    <span className="flex-shrink-0 w-[3px] rounded-full transition-all duration-200"
          style={{
            height: active ? 18 : 0,
            background: "linear-gradient(180deg,#c9a84c,#8b0000)",
            boxShadow: active ? "0 0 6px rgba(201,168,76,0.5)" : "none",
            opacity: active ? 1 : 0,
          }} />

    {/* label — always truncates safely */}
    <span className="flex-1 min-w-0 truncate">{label}</span>

    {/* active indicator on the right — small dot only, no text pill */}
    {active && (
      <span className="active-dot flex-shrink-0 w-2 h-2 rounded-full"
            style={{ background: "#c9a84c",
                     boxShadow: "0 0 6px rgba(201,168,76,0.7)" }} />
    )}
  </a>
);

/* ═══════════════════════════════════════════════════════════════════════
   HEADER
═══════════════════════════════════════════════════════════════════════ */
export default function Header() {
  const { pathname } = useLocation();

  const [dropdown,   setDropdown]   = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [scrolled,   setScrolled]   = useState(false);

  const dropRef   = useRef(null);
  const searchRef = useRef(null);

  useEffect(() => {
    const fn = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", fn);
    return () => window.removeEventListener("scroll", fn);
  }, []);

  useEffect(() => {
    const fn = (e) => {
      if (dropRef.current   && !dropRef.current.contains(e.target))   setDropdown(false);
      if (searchRef.current && !searchRef.current.contains(e.target)) setSearchOpen(false);
    };
    document.addEventListener("mousedown", fn);
    return () => document.removeEventListener("mousedown", fn);
  }, []);

  /* close mobile panel when route changes */
  useEffect(() => { setMobileOpen(false); }, [pathname]);

  const navLinks = [
    { label: "Home",       href: "/" },
    { label: "About",      href: "/aboutpage" },
    { label: "Shop",       href: "/productListing" },
    { label: "Bulk Order", href: "/dealership" },
    { label: "Blog",       href: "/blog" },
    { label: "Contact",    href: "/contact" },
  ];

  const isActive = (href) =>
    href === "/" ? pathname === "/" : pathname.startsWith(href);

  const currentPage = navLinks.find(l => isActive(l.href))?.label;

  /* ─── RENDER ─────────────────────────────────────────────────── */
  return (
    <>
     <TopScroll />

      {/* ── Main header ───────────────────────────────────────────── */}
      <header className={`sticky top-0 z-50 transition-shadow duration-300
                          ${scrolled ? "shadow-[0_6px_36px_rgba(139,0,0,0.12)]" : "shadow-sm"}`}
              style={{ background: "rgba(253,248,240,0.97)",
                       backdropFilter: "blur(18px)",
                       borderBottom: "1px solid rgba(201,168,76,0.2)" }}>

        {/* ── inner row ─────────────────────────────────────────── */}
        <div className="max-w-[1320px] mx-auto px-4 sm:px-6 lg:px-8
                        h-[68px] flex items-center justify-between gap-3">

          {/* LOGO */}
          <img src={logo} className='w-12 h-12' alt='logo'
            />
          <a href="/" className="relative flex-shrink-0 overflow-hidden px-0.5 py-0.5">
            <span className="logo-shine absolute inset-y-0 w-10 pointer-events-none"
                  style={{ background: "linear-gradient(90deg,transparent,rgba(255,255,255,0.28),transparent)" }} />
            <p className="font-cinzel text-[19px] sm:text-[22px] font-semibold tracking-wide leading-none"
               style={{ color: "#8b0000" }}>
              Aayubakwath
            </p>
            
            <span className="block h-px mt-1"
                  style={{ background: "linear-gradient(90deg,#c9a84c 55%,transparent)" }} />
          </a>

          <VDivider />

          {/* DESKTOP NAV */}
          <nav className="hidden lg:flex items-center gap-0.5 flex-1 justify-center">
            {navLinks.map((link, i) => (
              <React.Fragment key={link.href}>
                {i > 0 && (
                  <span className="font-dm text-[7px] select-none mx-0.5"
                        style={{ color: "#c9a84c", opacity: 0.45 }}>·</span>
                )}
                <DesktopLink href={link.href} label={link.label} active={isActive(link.href)} />
              </React.Fragment>
            ))}
          </nav>

          <VDivider />

          {/* DESKTOP ACTIONS */}
          <div className="hidden lg:flex items-center gap-1.5 flex-shrink-0">

            {/* Search */}
            <div className="flex items-center" ref={searchRef}>
              <input className={`srch font-dm text-[13px] bg-transparent outline-none
                                 border-b pb-0.5 placeholder-[#bba070] ${searchOpen ? "open" : ""}`}
                     style={{ borderBottomColor: "#c9a84c", color: "#1a0a0a" }}
                     placeholder="Search…" />
              <button onClick={() => setSearchOpen(v => !v)}
                      className="w-9 h-9 rounded-full flex items-center justify-center
                                 border border-transparent
                                 hover:border-[#c9a84c] hover:bg-[rgba(201,168,76,0.08)]
                                 transition-all duration-200 hover:-translate-y-0.5"
                      style={{ color: "#8b0000" }}>
                {searchOpen ? <FaTimes size={13} /> : <FaSearch size={13} />}
              </button>
            </div>

            {/* Wishlist */}
            <a href="/wishlist"
               className="relative w-9 h-9 rounded-full flex items-center justify-center
                          border border-[#c9a84c] transition-all duration-200 bg-[rgba(201,168,76,0.08)]
                          hover:border-[#c9a84c] hover:bg-[rgba(201,168,76,0.08)]
                          hover:-translate-y-0.5"
               style={{ color: "#8b0000" }}>
              <FaHeart size={14} />
              {/* <Badge n={3} /> */}
            </a>

            {/* Cart */}
            <a href="/cart"
               className="flex items-center gap-2 px-4 h-9 rounded-full text-white
                          font-dm text-[11px] font-semibold tracking-[1.5px] uppercase
                          transition-all duration-200 hover:-translate-y-0.5"
               style={{ background: "linear-gradient(135deg,#8b0000,#5a0000)",
                        boxShadow: "0 3px 14px rgba(139,0,0,0.28)" }}
               onMouseEnter={e => e.currentTarget.style.background = "linear-gradient(135deg,#b91c1c,#8b0000)"}
               onMouseLeave={e => e.currentTarget.style.background = "linear-gradient(135deg,#8b0000,#5a0000)"}>
              <FaShoppingCart size={12} />
              Cart
              <span className="min-w-[17px] h-[17px] flex items-center justify-center
                               rounded-full text-[9px] font-bold border border-white/25"
                    style={{ background: "#c9a84c" }}>2</span>
            </a>

            {/* Profile */}
            <div className="relative" ref={dropRef}>
              <button onClick={() => setDropdown(v => !v)}
                      className="w-9 h-9 rounded-full flex items-center justify-center
                                 text-white transition-transform duration-200 hover:scale-[1.07]"
                      style={{ background: "linear-gradient(135deg,#8b0000,#4a0000)",
                               border: "2px solid #c9a84c",
                               boxShadow: "0 3px 12px rgba(139,0,0,0.28)" }}>
                <FaUser size={12} />
              </button>

              {dropdown && (
                <div className="anim-drop absolute right-0 top-[calc(100%+10px)] w-44
                                rounded-xl overflow-hidden bg-white z-50"
                     style={{ border: "1px solid rgba(201,168,76,0.25)",
                              boxShadow: "0 20px 56px rgba(0,0,0,0.12)" }}>
                  <div className="h-[3px]"
                       style={{ background: "linear-gradient(90deg,#8b0000,#c9a84c,#8b0000)" }} />
                  {[
                    { label: "Login",    href: "/login" },
                    { label: "Register", href: "/register" },
                    { label: "Profile",  href: "/profile" },
                    { label: "Orders",   href: "/orders" },
                  ].map(item => (
                    <a key={item.href} href={item.href}
                       className="block px-5 py-[10px] font-dm text-[12.5px] tracking-[0.4px]
                                  transition-colors duration-150 hover:bg-[rgba(201,168,76,0.07)]"
                       style={{ color: "#1a0a0a", borderBottom: "1px solid rgba(201,168,76,0.1)" }}
                       onMouseEnter={e => e.currentTarget.style.color = "#8b0000"}
                       onMouseLeave={e => e.currentTarget.style.color = "#1a0a0a"}>
                      {item.label}
                    </a>
                  ))}
                  <a href="#"
                     className="block px-5 py-[10px] font-dm text-[12.5px] tracking-[0.4px]
                                transition-colors duration-150 hover:bg-red-50"
                     style={{ color: "#b91c1c" }}>
                    Logout
                  </a>
                </div>
              )}
            </div>
          </div>

          {/* HAMBURGER */}
          <button className="lg:hidden flex items-center justify-center w-10 h-10 rounded-lg
                             transition-all duration-200 flex-shrink-0
                             hover:bg-[rgba(201,168,76,0.08)]"
                  style={{ border: "1.5px solid rgba(201,168,76,0.4)", color: "#8b0000" }}
                  onClick={() => setMobileOpen(v => !v)}>
            {mobileOpen ? <FaTimes size={14} /> : <FaBars size={14} />}
          </button>
        </div>

        {/* gold hairline */}
        <div className="h-px"
             style={{ background: "linear-gradient(90deg,transparent,rgba(201,168,76,0.4) 25%,rgba(201,168,76,0.4) 75%,transparent)" }} />

        {/* ══════════════════════════════════════════════════════════
            MOBILE PANEL  — overflow-safe layout
        ══════════════════════════════════════════════════════════ */}
        {mobileOpen && (
          <div className="anim-panel lg:hidden w-full overflow-hidden"
               style={{ background: "#fdf8f0",
                        borderTop: "1px solid rgba(201,168,76,0.14)" }}>

            {/* "Now on" strip — fully constrained, no overflow */}
            <div className="flex items-center gap-2 px-4 sm:px-6 pt-3.5 pb-1">
              <span className="font-dm text-[9.5px] tracking-[2px] uppercase whitespace-nowrap flex-shrink-0"
                    style={{ color: "#bba070" }}>
                Now on
              </span>
              {/* grows to fill remaining space */}
              <span className="flex-1 h-px" style={{ background: "rgba(201,168,76,0.2)" }} />
              {/* pill — fixed max-width + truncate so it never wraps */}
              {currentPage && (
                <span className="flex-shrink-0 font-cinzel text-[10.5px] tracking-[0.8px]
                                 px-3 py-[3px] rounded-full whitespace-nowrap"
                      style={{ background: "linear-gradient(135deg,#8b0000,#5a0000)",
                               color: "#e0c070",
                               boxShadow: "0 2px 8px rgba(139,0,0,0.22)",
                               maxWidth: 120 }}>
                  {currentPage}
                </span>
              )}
            </div>

            {/* Nav links */}
            <nav className="flex flex-col px-4 sm:px-6 pt-1 pb-0">
              {navLinks.map(link => (
                <MobileLink key={link.href}
                            href={link.href}
                            label={link.label}
                            active={isActive(link.href)}
                            onClick={() => setMobileOpen(false)} />
              ))}
            </nav>

            {/* Search bar */}
            <div className="mx-4 sm:mx-6 my-3.5 flex items-center gap-3 px-4 py-2.5
                            rounded-xl bg-white"
                 style={{ border: "1px solid rgba(201,168,76,0.3)" }}>
              <FaSearch size={11} style={{ color: "#c9a84c", flexShrink: 0 }} />
              <input className="flex-1 min-w-0 bg-transparent font-dm text-[13px]
                                outline-none placeholder-[#bba070]"
                     style={{ color: "#1a0a0a" }}
                     placeholder="Search for products…" />
            </div>

            {/* CTA row — equal thirds, no overflow */}
            <div className="grid grid-cols-3 gap-2.5 px-4 sm:px-6 pb-5">
              {[
                { icon: <FaShoppingCart size={12} />, label: "Cart",     href: "/cart",     badge: 2, accent: false },
                { icon: <FaHeart size={12} />,        label: "Wishlist", href: "/wishlist", badge: 3, accent: true  },
                { icon: <FaUser size={12} />,          label: "Account",  href: "/profile",  badge: null },
              ].map(item => (
                <a key={item.href} href={item.href}
                   className="relative flex flex-col items-center justify-center gap-1.5
                              py-3 rounded-xl text-white font-dm font-semibold
                              tracking-[1px] uppercase transition-opacity hover:opacity-90
                              text-[9px] sm:text-[10px]"
                   style={{ background: "linear-gradient(135deg,#8b0000,#5a0000)",
                            boxShadow: "0 3px 10px rgba(139,0,0,0.22)" }}>
                  {item.icon}
                  <span className="truncate w-full text-center">{item.label}</span>
                  {item.badge && <Dot n={item.badge} accent={item.accent} />}
                </a>
              ))}
            </div>
          </div>
        )}
      </header>
    </>
  );
}