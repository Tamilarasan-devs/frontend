import React, { useState, useRef, useEffect } from "react";
import { FaHeart, FaShoppingCart, FaUser, FaSearch, FaTimes, FaBars } from "react-icons/fa";
import TopScroll from "./TopScroll";
import logo from '../../assets/images/logo.jpg'
/* ── Google Fonts + minimal keyframes (no external CSS file) ────────── */
const FontLoader = () => (
  <style>{`
    @import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,400;0,600;0,700;1,400&family=Cinzel:wght@400;600;700&family=DM+Sans:wght@300;400;500&display=swap');

    .font-cinzel    { font-family: 'Cinzel', serif; }
    .font-cormorant { font-family: 'Cormorant Garamond', serif; }
    .font-dm        { font-family: 'DM Sans', sans-serif; }

    @keyframes marquee {
      0%   { transform: translateX(0); }
      100% { transform: translateX(-50%); }
    }
    .marquee-track { animation: marquee 24s linear infinite; }

    @keyframes shine {
      0%,100% { opacity:0; left:-60%; }
      50%      { opacity:1; left:110%; }
    }
    .logo-shine { animation: shine 4.5s ease-in-out infinite; }

    @keyframes dropIn {
      from { opacity:0; transform:translateY(-6px) scale(.97); }
      to   { opacity:1; transform:translateY(0)    scale(1);   }
    }
    .anim-drop { animation: dropIn .2s cubic-bezier(.4,0,.2,1) forwards; }

    @keyframes panelDown {
      from { opacity:0; transform:translateY(-10px); }
      to   { opacity:1; transform:translateY(0); }
    }
    .anim-panel { animation: panelDown .25s cubic-bezier(.4,0,.2,1) forwards; }

    /* nav underline sweep */
    .nav-link { position:relative; }
    .nav-link::after {
      content:''; position:absolute; bottom:-2px; left:0; right:0; height:1px;
      background:linear-gradient(90deg,#c9a84c,#e8d48a,#c9a84c);
      transform:scaleX(0); transform-origin:center;
      transition:transform .3s cubic-bezier(.4,0,.2,1);
    }
    .nav-link:hover::after { transform:scaleX(1); }

    /* search expand */
    .search-input {
      width:0; overflow:hidden; opacity:0;
      transition:width .35s cubic-bezier(.4,0,.2,1), opacity .3s;
    }
    .search-input.open { width:175px; opacity:1; }

    /* mobile link hover indent */
    .mob-link { transition:color .2s, padding-left .2s; }
    .mob-link:hover { padding-left:10px !important; }
  `}</style>
);

/* ── Thin gold vertical divider ─────────────────────────────────────── */
const GoldDivider = () => (
  <div className="hidden lg:block w-px h-8 flex-shrink-0 mx-1"
       style={{ background: "linear-gradient(to bottom,transparent,#c9a84c 40%,#c9a84c 60%,transparent)" }} />
);

/* ── Numeric badge ───────────────────────────────────────────────────── */
const Badge = ({ n, gold }) => (
  <span
    className="absolute -top-1.5 -right-1.5 min-w-[17px] h-[17px] flex items-center
               justify-center rounded-full text-white text-[9px] font-bold px-[3px]
               border-2 border-[#fdf8f0]"
    style={{ background: gold ? "#c9a84c" : "#8b0000" }}>
    {n}
  </span>
);

/* ════════════════════════════════════════════════════════════════════
   HEADER
════════════════════════════════════════════════════════════════════ */
export default function Header() {
  const [dropdown, setDropdown]     = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [scrolled, setScrolled]     = useState(false);

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

  const navLinks = [
    { label: "Home",       href: "/" },
    { label: "About",      href: "/aboutpage" },
    { label: "Shop",       href: "/productListing" },
    { label: "Bulk Order", href: "/dealership" },
    { label: "Blog",       href: "/blog" },
    { label: "Contact",    href: "/contact" },
  ];

  return (
    <>
    <TopScroll/>
      <FontLoader />

      

      {/* ── Main header ─────────────────────────────────────────── */}
      <header
        className={`sticky top-0 z-50 transition-shadow duration-300
                    ${scrolled ? "shadow-[0_6px_40px_rgba(139,0,0,0.13)]" : "shadow-sm"}`}
        style={{
          background: "rgba(253,248,240,0.97)",
          backdropFilter: "blur(18px)",
          borderBottom: "1px solid rgba(201,168,76,0.22)",
        }}>

        {/* inner row */}
        <div className="max-w-[1320px] mx-auto px-5 lg:px-8 h-[70px]
                        flex items-center justify-between gap-3">

          {/* ── LOGO ──────────────────────────────────────────── */}
          <img src={logo} className="w-12 h-14"/>
          <a href="/"
             className="relative flex-shrink-0 group overflow-hidden rounded-sm px-0.5 py-0.5">
            <span className="logo-shine absolute inset-y-0 w-12 pointer-events-none"
                  style={{ background: "linear-gradient(90deg,transparent,rgba(255,255,255,0.3),transparent)" }} />
            <p className="font-cinzel text-[20px] lg:text-[23px] font-semibold tracking-wider leading-none"
               style={{ color: "#8b0000" }}>
              Aayubakwath
            </p>
            
            <span className="block h-px mt-1"
                  style={{ background: "linear-gradient(90deg,#c9a84c 60%,transparent)" }} />
          </a>

          <GoldDivider />

          {/* ── DESKTOP NAV ───────────────────────────────────── */}
          <nav className="hidden lg:flex items-center gap-0.5">
            {navLinks.map((link, i) => (
              <React.Fragment key={link.href}>
                {i > 0 && (
                  <span className="font-dm text-[8px] mx-0.5 select-none"
                        style={{ color: "#c9a84c", opacity: 0.5 }}>·</span>
                )}
                <a href={link.href}
                   className="nav-link font-dm text-[12px] font-medium tracking-[1.8px]
                              uppercase px-3 py-1.5 rounded transition-colors duration-200"
                   style={{ color: "#1a0a0a" }}
                   onMouseEnter={e => (e.currentTarget.style.color = "#8b0000")}
                   onMouseLeave={e => (e.currentTarget.style.color = "#1a0a0a")}>
                  {link.label}
                </a>
              </React.Fragment>
            ))}
          </nav>

          <GoldDivider />

          {/* ── DESKTOP ACTIONS ───────────────────────────────── */}
          <div className="hidden lg:flex items-center gap-1.5">

            {/* Search */}
            <div className="flex items-center" ref={searchRef}>
              <input
                className={`search-input font-dm text-[13px] bg-transparent outline-none
                            border-b pb-0.5 placeholder-[#bba070]
                            ${searchOpen ? "open" : ""}`}
                style={{ borderBottomColor: "#c9a84c", color: "#1a0a0a" }}
                placeholder="Search…"
              />
              <button
                onClick={() => setSearchOpen(v => !v)}
                className="w-9 h-9 rounded-full flex items-center justify-center border
                           border-transparent transition-all duration-200
                           hover:border-[#c9a84c] hover:bg-[rgba(201,168,76,0.08)]
                           hover:-translate-y-0.5"
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
              <Badge n={3} />
            </a>

            {/* Cart pill */}
            <a href="/cart"
               className="relative flex items-center gap-2 px-4 h-9 rounded-full
                          font-dm text-[11.5px] font-semibold tracking-[1.5px] uppercase
                          text-white transition-all duration-200
                          hover:-translate-y-0.5 hover:shadow-lg"
               style={{
                 background: "linear-gradient(135deg,#8b0000,#5a0000)",
                 boxShadow: "0 3px 14px rgba(139,0,0,0.3)",
               }}
               onMouseEnter={e => (e.currentTarget.style.background = "linear-gradient(135deg,#b91c1c,#8b0000)")}
               onMouseLeave={e => (e.currentTarget.style.background = "linear-gradient(135deg,#8b0000,#5a0000)")}>
              <FaShoppingCart size={12} />
              Cart
              <span className="min-w-[18px] h-[18px] flex items-center justify-center
                               rounded-full text-[10px] font-bold border border-white/25"
                    style={{ background: "#c9a84c" }}>
                2
              </span>
            </a>

            {/* Profile */}
            <div className="relative" ref={dropRef}>
              <button
                onClick={() => setDropdown(v => !v)}
                className="w-[38px] h-[38px] rounded-full flex items-center justify-center
                           text-white transition-transform duration-200 hover:scale-[1.08]"
                style={{
                  background: "linear-gradient(135deg,#8b0000,#4a0000)",
                  border: "2px solid #c9a84c",
                  boxShadow: "0 3px 14px rgba(139,0,0,0.3)",
                }}>
                <FaUser size={13} />
              </button>

              {dropdown && (
                <div className="anim-drop absolute right-0 top-[calc(100%+10px)] w-44 rounded-xl
                                overflow-hidden bg-white z-50"
                     style={{
                       border: "1px solid rgba(201,168,76,0.25)",
                       boxShadow: "0 20px 60px rgba(0,0,0,0.12)",
                     }}>
                  {/* top accent line */}
                  <div className="h-[3px]"
                       style={{ background: "linear-gradient(90deg,#8b0000,#c9a84c,#8b0000)" }} />
                  {[
                    { label: "Login",    href: "/login" },
                    { label: "Register", href: "/register" },
                    { label: "Profile",  href: "/profile" },
                    { label: "Orders",   href: "/orders" },
                  ].map(item => (
                    <a key={item.href} href={item.href}
                       className="block px-5 py-[11px] font-dm text-[12.5px] tracking-[0.5px]
                                  transition-colors duration-150 hover:bg-[rgba(201,168,76,0.07)]"
                       style={{ color: "#1a0a0a", borderBottom: "1px solid rgba(201,168,76,0.1)" }}
                       onMouseEnter={e => (e.currentTarget.style.color = "#8b0000")}
                       onMouseLeave={e => (e.currentTarget.style.color = "#1a0a0a")}>
                      {item.label}
                    </a>
                  ))}
                  <a href="#"
                     className="block px-5 py-[11px] font-dm text-[12.5px] tracking-[0.5px]
                                transition-colors duration-150 hover:bg-red-50"
                     style={{ color: "#b91c1c" }}>
                    Logout
                  </a>
                </div>
              )}
            </div>
          </div>

          {/* ── HAMBURGER ─────────────────────────────────────── */}
          <button
            className="lg:hidden flex items-center justify-center w-10 h-10 rounded-lg
                       transition-all duration-200 hover:bg-[rgba(201,168,76,0.08)]"
            style={{ border: "1.5px solid rgba(201,168,76,0.4)", color: "#8b0000" }}
            onClick={() => setMobileOpen(v => !v)}>
            {mobileOpen ? <FaTimes size={15} /> : <FaBars size={15} />}
          </button>
        </div>

        {/* gold hairline accent */}
        <div className="h-px"
             style={{ background: "linear-gradient(90deg,transparent,rgba(201,168,76,0.45) 30%,rgba(201,168,76,0.45) 70%,transparent)" }} />

        {/* ════════════════════════════════════════════════════
            MOBILE PANEL
        ════════════════════════════════════════════════════ */}
        {mobileOpen && (
          <div className="anim-panel lg:hidden"
               style={{ background: "#fdf8f0", borderTop: "1px solid rgba(201,168,76,0.15)" }}>

            {/* nav links */}
            <nav className="flex flex-col px-6 pt-1 pb-0">
              {navLinks.map(link => (
                <a key={link.href} href={link.href}
                   className="mob-link font-dm text-[11.5px] font-medium tracking-[2px]
                              uppercase py-3.5"
                   style={{ color: "#1a0a0a", borderBottom: "1px solid rgba(201,168,76,0.12)" }}
                   onMouseEnter={e => (e.currentTarget.style.color = "#8b0000")}
                   onMouseLeave={e => (e.currentTarget.style.color = "#1a0a0a")}
                   onClick={() => setMobileOpen(false)}>
                  {link.label}
                </a>
              ))}
            </nav>

            {/* mobile search */}
            <div className="mx-6 my-4 flex items-center gap-3 px-4 py-2.5 rounded-xl bg-white"
                 style={{ border: "1px solid rgba(201,168,76,0.3)" }}>
              <FaSearch size={12} style={{ color: "#c9a84c" }} />
              <input className="flex-1 bg-transparent font-dm text-[13px] outline-none
                                placeholder-[#bba070]"
                     style={{ color: "#1a0a0a" }}
                     placeholder="Search for products…" />
            </div>

            {/* mobile CTA buttons */}
            <div className="grid grid-cols-3 gap-3 px-6 pb-5">
              {[
                { icon: <FaShoppingCart size={13} />, label: "Cart",     href: "/cart",     badge: 2, gold: false },
                { icon: <FaHeart size={13} />,        label: "Wishlist", href: "/wishlist", badge: 3, gold: true  },
                { icon: <FaUser size={13} />,          label: "Account",  href: "/profile",  badge: null },
              ].map(item => (
                <a key={item.href} href={item.href}
                   className="relative flex flex-col items-center justify-center gap-1.5
                              py-3 rounded-xl text-white font-dm text-[10px] font-semibold
                              tracking-[1.5px] uppercase transition-opacity hover:opacity-90"
                   style={{
                     background: "linear-gradient(135deg,#8b0000,#5a0000)",
                     boxShadow: "0 3px 12px rgba(139,0,0,0.25)",
                   }}>
                  {item.icon}
                  {item.label}
                  {item.badge && <Badge n={item.badge} gold={item.gold} />}
                </a>
              ))}
            </div>
          </div>
        )}
      </header>
    </>
  );
}