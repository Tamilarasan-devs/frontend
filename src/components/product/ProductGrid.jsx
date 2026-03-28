import React, { useState, useEffect, useRef } from "react";
import { FaShoppingCart ,FaArrowRight} from "react-icons/fa";
// import img from '../../assets/images/pro.webp'
// import img1 from '../../assets/images/pro1.webp'
import { useNavigate } from "react-router-dom";
const BRAND = "#820c0c";
const ACCENT = "#c9643a 829b1c";
const GREEN='#829b1c'
// import img from '../../assets/images/bt.jpeg';
// import img1 from '../../assets/images/bt.jpeg';
import img from '../../assets/images/prod/pro5.jpeg'
import img1 from '../../assets/images/prod/pro1.jpeg'


const products = [
  {
    id: 1,
    name: "Under Eye Cream",
    benefit: "Reduces Dark Circles",
    salePrice: 560,
    regularPrice: 590,
    rating: 4.9,
    reviews: 822,
    tag: "Hot Seller",
    image: img,
    hoverImage: img1,
  },
  {
    id: 2,
    name: "Retinol Eye Serum",
    benefit: "Firms & Lifts Skin",
    salePrice: 720,
    regularPrice: 850,
    rating: 4.7,
    reviews: 614,
    tag: "Must Try!",
    image: img1,
    hoverImage: img,
  },
  {
    id: 3,
    name: "Hydrating Eye Gel",
    benefit: "De-Puffs & Soothes",
    salePrice: 480,
    regularPrice: 530,
    rating: 4.8,
    reviews: 1043,
    tag: "Top Rated",
    image: img,
    hoverImage: img1,
  },
  {
    id: 4,
    name: "Vitamin C Eye Brightener",
    benefit: "Brightens & Evens Tone",
    salePrice: 640,
    regularPrice: 700,
    rating: 4.6,
    reviews: 389,
    tag: "New Launches",
    image: img1,
    hoverImage: img,
  },
  {
    id: 5,
    name: "Under Eye Cream",
    benefit: "Reduces Dark Circles",
    salePrice: 560,
    regularPrice: 590,
    rating: 4.9,
    reviews: 822,
    tag: "Fast Moving",
    image: img,
    hoverImage: img1,
  },
  {
    id: 6,
    name: "Retinol Eye Serum",
    benefit: "Firms & Lifts Skin",
    salePrice: 720,
    regularPrice: 850,
    rating: 4.7,
    reviews: 614,
    tag: "Limited Stock",
    image: img1,
    hoverImage: img,
  },
  {
    id: 7,
    name: "Hydrating Eye Gel",
    benefit: "De-Puffs & Soothes",
    salePrice: 480,
    regularPrice: 530,
    rating: 4.8,
    reviews: 1043,
    tag: "Must Try!",
    image: img,
    hoverImage: img1,
  },
  {
    id: 8,
    name: "Vitamin C Eye Brightener",
    benefit: "Brightens & Evens Tone",
    salePrice: 640,
    regularPrice: 700,
    rating: 4.6,
    reviews: 389,
    tag: "Hot Seller",
    image: img1,
    hoverImage: img,
  },
];
const badgeColors = {
  "New Launches":   { bg: "#FACC15", border: "#F59E0B", text: "#000000" },
  "Must Try!":      { bg: "#0EA5E9", border: "#0284C7", text: "#FFFFFF" },
  "Top Rated":      { bg: "#22C55E", border: "#16A34A", text: "#FFFFFF" },
  "Fast Moving":    { bg: "#84CC16", border: "#65A30D", text: "#000000" },
  "Hot Seller":     { bg: "#EC4899", border: "#DB2777", text: "#FFFFFF" },
  "Limited Stock":  { bg: "#EF4444", border: "#B91C1C", text: "#FFFFFF" },
};
export default function ProductGrid() {
  const [hovered, setHovered] = useState({});
  const [added, setAdded] = useState(false);

  // --- Animation state ---
  const [headerVisible, setHeaderVisible] = useState(false);
  const [visibleCards, setVisibleCards] = useState({});
  const [btnVisible, setBtnVisible] = useState(false);
  const headerRef = useRef(null);
  const cardRefs = useRef({});
  const btnRef = useRef(null);

  useEffect(() => {
    // Header observer
    const headerObs = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) { setHeaderVisible(true); headerObs.disconnect(); } },
      { threshold: 0.2 }
    );
    if (headerRef.current) headerObs.observe(headerRef.current);

    // Button observer
    const btnObs = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) { setBtnVisible(true); btnObs.disconnect(); } },
      { threshold: 0.2 }
    );
    if (btnRef.current) btnObs.observe(btnRef.current);

    // Card observers
    const cardObservers = products.map((product, index) => {
      const obs = new IntersectionObserver(
        ([entry]) => {
          if (entry.isIntersecting) {
            setTimeout(() => {
              setVisibleCards((prev) => ({ ...prev, [product.id]: true }));
            }, (index % 4) * 100);
            obs.disconnect();
          }
        },
        { threshold: 0.1 }
      );
      if (cardRefs.current[product.id]) obs.observe(cardRefs.current[product.id]);
      return obs;
    });

    return () => {
      headerObs.disconnect();
      btnObs.disconnect();
      cardObservers.forEach((obs) => obs.disconnect());
    };
  }, []);
  // --- End animation setup ---


  const getDiscount = (sale, regular) =>
    Math.round(((regular - sale) / regular) * 100);
const navigate =useNavigate()

  return (
    <div className=" p-6" style={{ backgroundColor: "#fff" }}>

      {/* Header */}
        <div
          ref={headerRef}
          className="m-5"
          style={{
            opacity: headerVisible ? 1 : 0,
            transform: headerVisible ? "translateY(0)" : "translateY(-28px)",
            transition: "opacity 0.65s ease, transform 0.65s ease",
          }}
        >
              <p style={{
                fontSize: 18, letterSpacing: ".2em", textTransform: "uppercase",
                fontWeight: 700, color: ACCENT, marginBottom: 10,
                display: "flex", alignItems: "center", gap: 10,
              }}>
                Our collection
                <span style={{ width: 32, height: 1.5, background: ACCENT, borderRadius: 99, opacity: .5, display: "inline-block" }} />
              </p>
              <h2 style={{
                fontSize: "clamp(26px, 4vw, 36px)",
                fontWeight: 700, color: "#111827", margin: 0, lineHeight: 1.15,
              }}>
                Top Selling <span style={{ color: BRAND }}>Products</span>
              </h2>
              <div style={{ marginTop: 12, display: "flex", alignItems: "center", gap: 6 }}>
                <div style={{ width: headerVisible ? 36 : 0, height: 2.5, background: BRAND, borderRadius: 99, transition: "width 0.7s ease 0.3s" }} />
                <div style={{ width: 8, height: 8, borderRadius: "50%", background: ACCENT, opacity: .6 }} />
                <div style={{ width: 16, height: 2.5, background: "#f0ece8", borderRadius: 99 }} />
              </div>
            </div>

      {/* Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 max-w-[87rem] mx-auto">
        {products.map((product, index) => (
         <div
          ref={(el) => (cardRefs.current[product.id] = el)}
          key={product.id}
          className="bg-white rounded-xl shadow-md hover:shadow-xl transition-all duration-300 
                     p-4 relative flex flex-col border border-gray-200 hover:border-[rgba(201,100,58,.33)]"
          style={{
            "--accent": ACCENT,
            opacity: visibleCards[product.id] ? 1 : 0,
            transform: visibleCards[product.id] ? "translateY(0) scale(1)" : "translateY(40px) scale(0.96)",
            transition: `opacity 0.55s ease, transform 0.55s ease`,
          }}
        >

            {/* Tag */}
          <span
      className="absolute top-3 left-3 text-xs px-2 py-1 rounded z-10 font-semibold"
      style={{
        backgroundColor: badgeColors[product.tag]?.bg || BRAND,
        color: badgeColors[product.tag]?.text || "#FFFFFF",
        border: `1px solid ${badgeColors[product.tag]?.border || "#888"}`,
      }}
    >
      {product.tag}
    </span>

            {/* Discount Badge */}
             <div style={{ position:"absolute", top:0, right:0, zIndex:5, background:'#FFB800', color:"#fff", padding:"15px 15px", fontWeight:800, textAlign:"center", lineHeight:1.1, clipPath:"polygon(0 0,100% 0,100% 75%,85% 100%,70% 75%,55% 100%,40% 75%,25% 100%,10% 75%,0 100%)", boxShadow:"0 4px 10px rgba(0,0,0,0.25)" ,borderTopRightRadius: "10px",}}>
          <div className="-mt-1.5">
            <div style={{ fontSize:16 }}> {getDiscount(product.salePrice, product.regularPrice)}%</div>
            <div style={{ fontSize:10 }}>OFF</div>
          </div>
        </div>

            {/* Image Swap on Hover */}
            <div
              className="relative w-full h-48 rounded-lg mb-4 overflow-hidden cursor-pointer"
              onMouseEnter={() =>
                setHovered((prev) => ({ ...prev, [product.id]: true }))
              }
              onMouseLeave={() =>
                setHovered((prev) => ({ ...prev, [product.id]: false }))
              }
              onClick={()=>navigate("/product")}
            >
              <div className="relative h-48 bg-white flex items-center justify-center overflow-hidden">

  <img
    src={product.image}
    alt={product.name}
    className={`absolute inset-0 w-full h-full object-contain transition-opacity duration-500 ${
      hovered[product.id] ? "opacity-0" : "opacity-100"
    }`}
  />

  <img
    src={product.hoverImage}
    alt={`${product.name} alternate`}
    className={`absolute inset-0 w-full h-full object-contain transition-opacity duration-500 ${
      hovered[product.id] ? "opacity-100" : "opacity-0"
    }`}
  />

</div>
              
              {/* Brand tint overlay on hover */}
              <div
                className={`absolute inset-0 transition-opacity duration-500 ${
                  hovered[product.id] ? "opacity-10" : "opacity-0"
                }`}
                // style={{ backgroundColor: BRAND }}
              />
            </div>
<div className=" group mb-1 ">
          <h3 className="font-['Libre_Baskerville'] text-[15.5px] font-bold text-[#1a1a1a] whitespace-nowrap overflow-hidden text-ellipsis max-w-[236px]">
            {product.name}
          </h3>
          <div className="h-0.5 w-0 group-hover:w-40 transition-all duration-300 bg-[#820c0c]" />
        </div>

            

            
            <p
  className="text-sm font-bold text-gray-600 mt-2"
  style={{
    lineHeight: 1.65,
    display: "-webkit-box",
    WebkitLineClamp: 2,
    WebkitBoxOrient: "vertical",
    overflow: "hidden",
  }}
>
  <span className="text-[#829b1c] font-extrabold">FOR :</span> {product.benefit}
</p>

<p
  className="text-sm font-bold text-gray-600 mb-3"
  style={{
    lineHeight: 1.65,
    display: "-webkit-box",
    WebkitLineClamp: 2,
    WebkitBoxOrient: "vertical",
    overflow: "hidden",
  }}
>
  <span className="text-[#c9643a] font-extrabold">WITH :</span> {product.benefit}
</p>

            {/* Rating */}
            <div className="flex items-center text-yellow-500 text-sm justify-between">
              ⭐ {product.rating} Ratings
              <span className="text-gray-500 ml-2 font-semibold ">
                ({product.reviews}) Reviews
              </span>
            </div>

            {/* Spacer */}
            <div className="flex-1" />

            {/* Divider */}
            {/* <div className="border-t border-gray-100 mt-3" /> */}

            {/* Price */}
            <div className="flex items-center gap-2 mt-3">
              <span className="text-lg font-bold" style={{ color: BRAND }}>
                ₹{product.salePrice}
              </span>
              <span className="text-sm text-gray-400 line-through">
                ₹{product.regularPrice}
              </span>
          <span className="ml-auto text-[10px] font-bold text-emerald-600 bg-emerald-50 px-1.5 py-0.5 rounded-full">Save ₹{product.regularPrice - product.salePrice}</span>

              
            </div>

            {/* Add to Cart Button */}
            <button
                     onClick={e => { e.stopPropagation(); setAdded(true); setTimeout(() => setAdded(false), 1800); }}
                     className="w-full py-3 text-sm font-semibold tracking-wide uppercase flex items-center justify-center gap-2 text-white cursor-pointer transition-all duration-300 ease-in-out"
                     style={{
                       borderRadius: "50px 0 50px 0",
                       background: added ? "#16a34a" : BRAND,
                       border: "none",
                     }}
                     onMouseEnter={e => { if (!added) e.currentTarget.style.background = ACCENT; }}
                     onMouseLeave={e => { if (!added) e.currentTarget.style.background = BRAND; }}
                   >
                     <FaShoppingCart size={12} />
                     {added ? "✓ Added!" : "Add to Cart"}
                   </button>

          </div>
        ))}
      </div>
      <div ref={btnRef} className="text-center mt-6 flex justify-center"
        style={{
          opacity: btnVisible ? 1 : 0,
          transform: btnVisible ? "translateY(0)" : "translateY(24px)",
          transition: "opacity 0.6s ease 0.2s, transform 0.6s ease 0.2s",
        }}
      >
      <button className="flex items-center justify-center bg-[#c9643a] text-white text-sm font-semibold py-4 px-8 rounded-md hover:bg-[#6B8C1A] transition duration-300" onClick={()=>navigate('/productListing')}>
        View More
        <FaArrowRight className="ml-2" />
      </button>
    </div>
    </div>
  );
}