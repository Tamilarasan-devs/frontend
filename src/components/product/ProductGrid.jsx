import React, { useState } from "react";
import { FaShoppingCart ,FaArrowRight} from "react-icons/fa";
import img from '../../assets/images/pro.webp'
import img1 from '../../assets/images/pro1.webp'

const BRAND = "#820c0c";
const ACCENT = "#c9643a";

const products = [
  {
    id: 1,
    name: "Under Eye Cream (Dark Circles Control)",
    benefit: "Reduces Dark Circles",
    salePrice: 560,
    regularPrice: 590,
    rating: 4.9,
    reviews: 822,
    tag: "Best Seller",
    image: img,
    hoverImage: img1,
  },
  {
    id: 5,
    name: "Under Eye Cream (Dark Circles Control)",
    benefit: "Reduces Dark Circles",
    salePrice: 560,
    regularPrice: 590,
    rating: 4.9,
    reviews: 822,
    tag: "Best Seller",
    image: img,
    hoverImage: img1,
  },
  {
    id: 2,
    name: "Retinol Eye Serum (Anti-Aging Formula)",
    benefit: "Firms & Lifts Skin",
    salePrice: 720,
    regularPrice: 850,
    rating: 4.7,
    reviews: 614,
    tag: "New",
    image: img1,
    hoverImage:img,
  },
  {
    id: 6,
    name: "Retinol Eye Serum (Anti-Aging Formula)",
    benefit: "Firms & Lifts Skin",
    salePrice: 720,
    regularPrice: 850,
    rating: 4.7,
    reviews: 614,
    tag: "New",
    image: img1,
    hoverImage:img,
  },
  {
    id: 3,
    name: "Hydrating Eye Gel (Puffiness Relief)",
    benefit: "De-Puffs & Soothes",
    salePrice: 480,
    regularPrice: 530,
    rating: 4.8,
    reviews: 1043,
    tag: "Top Rated",
    image: img,
    hoverImage: img1},
  {
    id: 7,
    name: "Hydrating Eye Gel (Puffiness Relief)",
    benefit: "De-Puffs & Soothes",
    salePrice: 480,
    regularPrice: 530,
    rating: 4.8,
    reviews: 1043,
    tag: "Top Rated",
    image: img,
    hoverImage: img1},
  {
    id: 4,
    name: "Vitamin C Eye Brightener (Glow Boost)",
    benefit: "Brightens & Evens Tone",
    salePrice: 640,
    regularPrice: 700,
    rating: 4.6,
    reviews: 389,
    tag: "Sale",
    image: img1,
    hoverImage:img,
  },
  {
    id: 8,
    name: "Vitamin C Eye Brightener (Glow Boost)",
    benefit: "Brightens & Evens Tone",
    salePrice: 640,
    regularPrice: 700,
    rating: 4.6,
    reviews: 389,
    tag: "Sale",
    image: img1,
    hoverImage:img,
  },
];

export default function ProductGrid() {
  // const [added, setAdded] = useState({});
  const [hovered, setHovered] = useState({});
  const [added, setAdded] = useState(false);
  const handleAddToCart = (id) => {
    setAdded((prev) => ({ ...prev, [id]: true }));
    setTimeout(() => setAdded((prev) => ({ ...prev, [id]: false })), 1500);
  };

  const getDiscount = (sale, regular) =>
    Math.round(((regular - sale) / regular) * 100);

  return (
    <div className="min-h-screen p-6" style={{ backgroundColor: "#fdf5f5" }}>

      {/* Header */}
        <div className="m-5">
              <p style={{
                fontSize: 18, letterSpacing: ".2em", textTransform: "uppercase",
                fontWeight: 700, color: ACCENT, marginBottom: 10,
                display: "flex", alignItems: "center", gap: 10,
              }}>
                Our collection
                <span style={{ width: 32, height: 1.5, background: ACCENT, borderRadius: 99, opacity: .5, display: "inline-block" }} />
              </p>
              <h2 style={{
                fontFamily: "'Libre Baskerville', serif",
                fontSize: "clamp(26px, 4vw, 36px)",
                fontWeight: 700, color: "#111827", margin: 0, lineHeight: 1.15,
              }}>
                Top Selling <span style={{ color: BRAND }}>Products</span>
              </h2>
              <div style={{ marginTop: 12, display: "flex", alignItems: "center", gap: 6 }}>
                <div style={{ width: 36, height: 2.5, background: BRAND, borderRadius: 99 }} />
                <div style={{ width: 8, height: 8, borderRadius: "50%", background: ACCENT, opacity: .6 }} />
                <div style={{ width: 16, height: 2.5, background: "#f0ece8", borderRadius: 99 }} />
              </div>
            </div>

      {/* Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 max-w-[87rem] mx-auto">
        {products.map((product) => (
         <div
  key={product.id}
  className="bg-white rounded-xl shadow-md hover:shadow-xl transition-all duration-300 
             p-4 relative flex flex-col border border-gray-200 hover:border-[var(--accent)]"
  style={{ "--accent": ACCENT }}
>

            {/* Tag */}
            <span
              className="absolute top-3 left-3 text-white text-xs px-2 py-1 rounded z-10 font-semibold"
              style={{ backgroundColor: BRAND }}
            >
              {product.tag}
            </span>

            {/* Discount Badge */}
           
             <div style={{ position:"absolute", top:8, right:0, zIndex:5, background:ACCENT, color:"#fff", padding:"10px 10px", fontWeight:800, textAlign:"center", lineHeight:1.1, clipPath:"polygon(0 0,100% 0,100% 75%,85% 100%,70% 75%,55% 100%,40% 75%,25% 100%,10% 75%,0 100%)", boxShadow:"0 4px 10px rgba(0,0,0,0.25)" }}>
          <div className="-mt-1.5">
            <div style={{ fontSize:16 }}> -{getDiscount(product.salePrice, product.regularPrice)}%</div>
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
            >
              <img
                src={product.image}
                alt={product.name}
                className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-500 ${
                  hovered[product.id] ? "opacity-0" : "opacity-100"
                }`}
              />
              <img
                src={product.hoverImage}
                alt={`${product.name} alternate`}
                className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-500 ${
                  hovered[product.id] ? "opacity-100" : "opacity-0"
                }`}
              />
              {/* Brand tint overlay on hover */}
              <div
                className={`absolute inset-0 transition-opacity duration-500 ${
                  hovered[product.id] ? "opacity-10" : "opacity-0"
                }`}
                style={{ backgroundColor: BRAND }}
              />
            </div>

            {/* Product Name */}
            <h3 className="font-semibold text-md leading-snug text-gray-800 line-clamp-2">
              {product.name}
            </h3>

            
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
          {product.benefit}
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
      <div className="text-center mt-6 flex justify-center">
      <button className="flex items-center justify-center bg-[#c9643a] text-white text-sm font-semibold py-4 px-8 rounded-md hover:bg-blue-700 transition duration-300">
        View More
        <FaArrowRight className="ml-2" />
      </button>
    </div>
    </div>
  );
}