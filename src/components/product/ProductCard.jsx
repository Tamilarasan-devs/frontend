import React, { useState ,useEffect} from "react";
import { useNavigate } from "react-router-dom";
import { FaShoppingCart } from "react-icons/fa";
import { API_URL } from "../../utils/axiosInstance";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { addToCart } from "../../services/cartService";
const CARD_W = 402;
const CARD_GAP = 20;
export default  function ProductCard({ product, animDelay, sectionVisible }) {
console.log('shop page :',product)

  const [hov, setHov] = useState(false);
  const [btnHov, setBtnHov] = useState(false);
  const [cardVisible, setCardVisible] = useState(false);
  const disc = Math.round(((product.price - product.finalPrice) / product.price) * 100);
  const navigate = useNavigate();
  const qc = useQueryClient();

  const addMut = useMutation({
    mutationFn: addToCart,
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: ["cart"] });
      alert("Item added to cart!");
    },
    onError: (err) => {
      if (err.response?.status === 401) {
        alert("Please login first to add items to cart.");
        navigate('/login');
      } else {
        alert("Failed to add to cart.");
      }
    }
  });

  const handleAddToCart = () => {
    const token = localStorage.getItem("token");
    if (!token) {
       alert("Please login first to add items to cart.");
       navigate('/login');
       return;
    }
    
    addMut.mutate({ productId: product.id, quantity: 1 });
  };

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
      className="flex-shrink-0  rounded-lg overflow-hidden relative rounded-2xl cursor-pointer select-none w-full sm:w-[48%] md:w-[300px] lg:w-[340px] xl:w-[450px]"
      style={{
        
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
  // className="relative overflow-hidden bg-[#f9f5f2] w-full h-[450px] sm:h-[350px] aspect-[4/3] rounded-xl"
  // className="relative overflow-hidden bg-[#f9f5f2] w-full h-[350px] sm:h-[450px] aspect-[4/3] rounded-xl"
  className="
  relative overflow-hidden bg-[#f9f5f2] w-full 
  h-[350px]        // 📱 mobile (default)
  sm:h-[350px]     // 📲 small devices (≥640px)
  md:h-[400px]     // 💻 tablets (≥768px)
  lg:h-[450px]     // 🖥️ desktops (≥1024px)
  xl:h-[450px]     // 🖥️ large screens (≥1280px)
  aspect-[4/3] rounded-xl
"
  onClick={() => navigate(`/product/${product.id}`)}
>
        {/* Primary image */}
        <img
          // src={ product.productImages[0]}
         src={product?.productImages?.[0]?.url} 
          alt={product.productName}
          draggable={false}
          className="absolute inset-0 w-full h-full  "
          style={{
            opacity: hov ? 0 : 1,
            transform: hov ? "scale(1.06)" : "scale(1)",
            transition: "opacity .4s ease, transform .6s ease",
          }}
        />
        {/* Hover image */}
        <img
          // src={ product.productImages[1]}
         src={product?.productImages?.[1]?.url} 
          alt={product.productName}
          draggable={false}
          className="absolute inset-0 w-full h-full "
          style={{
            opacity: hov ? 1 : 0,
            transform: hov ? "scale(1)" : "scale(1.06)",
            transition: "opacity .4s ease, transform .6s ease",
          }}
        />

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
          <div className="h-0.5 w-0 group-hover:w-full transition-all duration-300 bg-[#03349a]" />
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
          <span className="font-['Libre_Baskerville'] text-xl font-bold text-[#03349a]">
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
          className="text-[10px] sm:text-xs font-bold text-center py-1 px-2 rounded-lg mb-2.5 border border-dashed mt-2 bg-[#c0d5ff]"
          style={{ borderColor: "#558af3" }}
        >
          Use code <strong>GRAB</strong> → Get @ ₹{product.price - 20}
        </div>

        <div className="h-px bg-gray-100 my-3" />

        {/* Add to Cart */}
        <button
          onClick={handleAddToCart}
          onMouseEnter={() => setBtnHov(true)}
          onMouseLeave={() => setBtnHov(false)}
          className="w-full py-3 text-sm font-semibold tracking-wide uppercase
            flex items-center justify-center gap-2 text-white cursor-pointer
            rounded-tl-[50px] rounded-br-[50px] rounded-tr-none rounded-bl-none
            transition-all duration-300 ease-in-out"
          style={{
            background: btnHov ? "#0147d3" : "#03349a",
            boxShadow: btnHov ? "0 6px 20px rgba(201,100,58,.35)" : "none",
          }}
        >
          {addMut.isPending ? (
            <span>Adding...</span>
          ) : (
            <>
              <FaShoppingCart size={14} />
              Add to Cart
            </>
          )}
        </button>
      </div>
    </div>
  );
}