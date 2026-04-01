






import React, { useState ,useEffect} from "react";
import { useNavigate } from "react-router-dom";
import { FaShoppingCart } from "react-icons/fa";

const CARD_W = 272;
const CARD_GAP = 20;
export default  function ProductCard({ product, animDelay, sectionVisible }) {
console.log('shop page :',product)
    // console.log('. for catgoiyr',product)
const BASE_URL = "https://aayubakwath-backend.onrender.com/";
  const [hov, setHov] = useState(false);
  const [btnHov, setBtnHov] = useState(false);
  const [cardVisible, setCardVisible] = useState(false);
  const disc = Math.round(((product.price - product.finalPrice) / product.price) * 100);
  const navigate = useNavigate();

  // Trigger card entrance after section becomes visible + stagger delay
  useEffect(() => {
    if (!sectionVisible) return;
    const t = setTimeout(() => setCardVisible(true), animDelay * 1000);
    return () => clearTimeout(t);
  }, [sectionVisible, animDelay]);
const badgeColors = {
  "New Launches":   { bg: "#FACC15", border: "#F59E0B", text: "#000000" },
  "Must Try!":      { bg: "#0EA5E9", border: "#0284C7", text: "#FFFFFF" },
  "Top Rated":      { bg: "#22C55E", border: "#16A34A", text: "#FFFFFF" },
  "Fast Moving":    { bg: "#84CC16", border: "#65A30D", text: "#000000" },
  "Hot Seller":     { bg: "#EC4899", border: "#DB2777", text: "#FFFFFF" },
  "Limited Stock":  { bg: "#EF4444", border: "#B91C1C", text: "#FFFFFF" },
};
  return (

    <div
      onMouseEnter={() => setHov(true)}
      onMouseLeave={() => setHov(false)}
      onMouseDown={(e) => e.stopPropagation()}
      className="flex-shrink-0 bg-white rounded-lg overflow-hidden relative rounded-2xl cursor-pointer select-none"
      style={{
        width: CARD_W,
        border: `1.5px solid ${hov ? "rgba(201,100,58,.33)" : "#f0ece8"}`,
        zIndex: hov ? 40 : 10,
        transform: hov
          ? "translateY(-12px) scale(1.015)"
          : cardVisible
          ? "translateY(0) scale(1)"
          : "translateY(32px) scale(0.96)",
        opacity: cardVisible ? 1 : 0,
        boxShadow: hov
          ? "0 20px 48px rgba(130,12,12,.10), 0 4px 16px rgba(0,0,0,.06)"
          : "0 1px 4px rgba(0,0,0,.04)",
        transition: cardVisible
          ? "opacity 0.5s ease, transform 0.5s cubic-bezier(.22,.68,0,1.15), box-shadow .35s ease, border-color .3s ease"
          : "none",
      }}
    >
      {/* ── Image Area ── */}
      {product.offerTags && (
        <span
          className="absolute top-3 left-3 text-xs px-2 py-1 rounded z-10 font-semibold"
          style={{
            backgroundColor: badgeColors[product.offerTags]?.bg || "#22C55E",
            color: badgeColors[product.offerTags]?.text || "#FFFFFF",
            border: `1px solid ${badgeColors[product.offerTags]?.border || "#888"}`,
          }}
        >
          {product.offerTags}
        </span>
      )}

      <div
        className="relative overflow-hidden bg-[#f9f5f2] rounded-xl"
        style={{ height: 250 }}
        onClick={() => navigate(`/product/${product.id}`)}
      >
        {/* Primary image */}
        <img
          src={BASE_URL + product.productImages[0]}
          alt={product.productName}
          draggable={false}
          className="absolute inset-0 w-full h-full object-cover "
          style={{
            opacity: hov ? 0 : 1,
            transform: hov ? "scale(1.06)" : "scale(1)",
            transition: "opacity .4s ease, transform .6s ease",
          }}
        />
        {/* Hover image */}
        <img
          src={BASE_URL + product.productImages[1]}
          alt={product.productName}
          draggable={false}
          className="absolute inset-0 w-full h-full object-cover"
          style={{
            opacity: hov ? 1 : 0,
            transform: hov ? "scale(1)" : "scale(1.06)",
            transition: "opacity .4s ease, transform .6s ease",
          }}
        />

        {/* Tags — bottom-left, revealed on hover */}
        <div
          className="absolute bottom-2 left-2 flex flex-col gap-1 z-10"
          style={{
            opacity: hov ? 1 : 0,
            transform: hov ? "translateY(0)" : "translateY(6px)",
            transition: "opacity .25s ease, transform .25s ease",
          }}
        >
          {product.productTags.map((t, i) => (
            <span
              key={i}
              className="text-[9.5px] px-2.5 py-[3px] rounded-full bg-[#820c0c] text-white
                font-bold tracking-[.05em] uppercase shadow-sm w-fit"
            >
              {t}
            </span>
          ))}
        </div>

        {/* Discount ribbon — top-right corner */}
        <div
          className="absolute top-0 right-0 z-10 text-white font-extrabold text-center"
          style={{
            background: "#FFB800",
            padding: "14px 10px 18px",
            lineHeight: 1.1,
            clipPath: "polygon(100% 0,0 0,0 75%,15% 100%,30% 75%,45% 100%,60% 75%,75% 100%,90% 75%,100% 100%)",
            boxShadow: "0 4px 10px rgba(0,0,0,0.2)",
            minWidth: 44,
          }}
        >
          <div className="text-[17px] font-black">{disc}%</div>
          <div className="text-[10px] font-bold -mt-0.5">OFF</div>
        </div>
      </div>

      {/* ── Card Body ── */}
      <div className="px-[18px] pt-4 pb-5">
        {/* Product Name */}
        <div className="inline-block group mb-1 max-w-full">
          <h3 className="text-[15.5px] font-bold text-[#1a1a1a] whitespace-nowrap overflow-hidden text-ellipsis max-w-[236px]">
            {product.productName}
          </h3>
          <div className="h-0.5 w-0 group-hover:w-full transition-all duration-300 bg-[#820c0c]" />
        </div>

        {/* Description */}
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
          <span className="text-[#829b1c] font-extrabold">FOR :</span> 
          {product.forWhom}
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
          <span className="text-[#c9643a] font-extrabold">WITH :</span> 
          {product.withWhom}
        </p>

        {/* Rating & Reviews */}
        {product.rating && (
          <div className="flex items-center gap-3 mb-1 justify-between">
            <span className="text-xs font-semibold text-amber-400 flex items-center gap-1 ">
              <span>⭐</span>
              <span>{product.rating.toFixed(1)} Ratings</span>
            </span>
            <span className="text-xs font-semibold text-gray-500">
               Reviews
            </span>
          </div>
        )}

        {/* Price */}
        <div className="flex items-baseline gap-1.5 mt-2.5 mb-1.5">
          <span className="font-['Libre_Baskerville'] text-xl font-bold text-[#820c0c]">
            ₹{product.finalPrice}
          </span>
          <span className="text-[13px] text-gray-400 line-through">
            ₹{product.price}
          </span>
          <span className="ml-auto text-[11px] text-emerald-600 font-bold bg-emerald-50 px-2 py-0.5 rounded-full">
            Save ₹{(product.price - product.finalPrice).toFixed(0)}
          </span>
        </div>

        {/* Promo code */}
        <div
          className="text-[10px] sm:text-xs font-bold text-center py-1 px-2 rounded-lg mb-2.5 border border-dashed text-[#820c0c] bg-[#fff4f4]"
          style={{ borderColor: "rgba(130,12,12,.25)" }}
        >
          Use code <strong>GRAB</strong> → Get @ ₹{product.price - 20}
        </div>

        <div className="h-px bg-gray-100 my-3" />

        {/* Add to Cart */}
        <button
          onMouseEnter={() => setBtnHov(true)}
          onMouseLeave={() => setBtnHov(false)}
          className="w-full py-3 text-sm font-semibold tracking-wide uppercase
            flex items-center justify-center gap-2 text-white cursor-pointer
            rounded-tl-[50px] rounded-br-[50px] rounded-tr-none rounded-bl-none
            transition-all duration-300 ease-in-out"
          style={{
            background: btnHov ? "#c9643a" : "#820c0c",
            boxShadow: btnHov ? "0 6px 20px rgba(201,100,58,.35)" : "none",
          }}
        >
          <FaShoppingCart size={14} />
          Add to Cart
        </button>
      </div>
    </div>
  );
}