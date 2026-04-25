import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useMutation, useQueryClient, useQuery } from "@tanstack/react-query";
import { addToCart } from "../../services/cartService";
import {
  addToWishlist,
  removeProductFromWishlist,
  checkWishlistStatus,
} from "../../services/wishlistService";
import { FaShoppingCart, FaHeart } from "react-icons/fa";
import { toast } from "react-toastify";

const TAG_PALETTES = [
  { bg: "#03349a", text: "#fff" },
  { bg: "#c9643a", text: "#fff" },
  { bg: "#166534", text: "#fff" },
  { bg: "#991B1B", text: "#fff" },
  { bg: "#6B21A8", text: "#fff" },
  { bg: "#0F766E", text: "#fff" },
  { bg: "#1E3A8A", text: "#fff" },
  { bg: "#BE123C", text: "#fff" },
  { bg: "#0369A1", text: "#fff" },
  { bg: "#92400E", text: "#fff" },
  { bg: "#9D174D", text: "#fff" },
  { bg: "#064E3B", text: "#fff" },
];

function tagColor(tag, i) {
  let hash = 0;
  for (let c of tag) hash = c.charCodeAt(0) + ((hash << 5) - hash);
  return TAG_PALETTES[(Math.abs(hash) + i) % TAG_PALETTES.length];
}

export default function ProductCard({ product, animDelay = 0, sectionVisible = true }) {
  const [hov, setHov] = useState(false);
  const [cardVisible, setCardVisible] = useState(false);
  const navigate = useNavigate();
  const qc = useQueryClient();
  const [adding, setAdding] = useState(false);
  const disc = Math.round(
    ((product.price - product.finalPrice) / product.price) * 100
  );
  const savings = (Number(product.price) - Number(product.finalPrice)).toFixed(0);

  useEffect(() => {
    if (!sectionVisible) return;
    const t = setTimeout(() => setCardVisible(true), animDelay * 1000);
    return () => clearTimeout(t);
  }, [sectionVisible, animDelay]);

  /* ── Cart (optimistic) ── */
  const handleAddToCart = async (e) => {
    e.stopPropagation();
    if (!localStorage.getItem("token")) { toast.error("Please login first."); navigate("/login"); return; }
    if (adding) return;

    setAdding(true);

    // ── Optimistic update: bump cart count in cache immediately ──
    qc.setQueryData(["cart"], (old) => {
      if (!old) return old;
      // Support both array and {items:[]} shapes
      const items = Array.isArray(old) ? old : old.items ?? [];
      const existing = items.find((i) => i.productId === product.id);
      const updatedItems = existing
        ? items.map((i) => i.productId === product.id ? { ...i, quantity: i.quantity + 1 } : i)
        : [...items, { productId: product.id, quantity: 1, product }];
      return Array.isArray(old) ? updatedItems : { ...old, items: updatedItems };
    });

    toast.success("Item added to cart!");

    try {
      await addToCart({ productId: product.id, quantity: 1 });
      // Sync real data from server in background
      qc.invalidateQueries({ queryKey: ["cart"] });
    } catch (err) {
      // Rollback optimistic update on error
      qc.invalidateQueries({ queryKey: ["cart"] });
      if (err.response?.status === 401) { toast.error("Please login first."); navigate("/login"); }
      else toast.error("Failed to add to cart.");
    } finally {
      setAdding(false);
    }
  };

  /* ── Wishlist ── */
  const { data: wishlistData } = useQuery({
    queryKey: ["wishlist-status", product.id],
    queryFn: () => checkWishlistStatus(product.id),
    enabled: !!localStorage.getItem("token") && !!product.id,
  });
  const wishlisted = wishlistData?.isWishlisted || false;

  const wishlistMut = useMutation({
    mutationFn: () =>
      wishlisted ? removeProductFromWishlist(product.id) : addToWishlist({ productId: product.id }),
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: ["wishlist"] });
      qc.invalidateQueries({ queryKey: ["wishlist-status", product.id] });
      toast.success(wishlisted ? "Removed from wishlist" : "Added to wishlist");
    },
    onError: (err) => {
      if (err.response?.status === 401) { toast.error("Please login first."); navigate("/login"); }
      else toast.error("Failed to update wishlist.");
    },
  });

  const handleToggleWishlist = (e) => {
    e.stopPropagation();
    if (!localStorage.getItem("token")) { toast.error("Please login first."); navigate("/login"); return; }
    wishlistMut.mutate();
  };

  return (
    <div
      onMouseEnter={() => setHov(true)}
      onMouseLeave={() => setHov(false)}
      onClick={() => navigate(`/product/${product.id}`)}
      className="relative flex flex-col cursor-pointer select-none rounded-2xl overflow-hidden bg-white"
      style={{
        border: `1.5px solid ${hov ? "rgba(201,100,58,0.4)" : "#ede9e4"}`,
        boxShadow: hov
          ? "0 20px 48px rgba(3,52,154,0.12), 0 4px 16px rgba(0,0,0,0.07)"
          : "0 2px 8px rgba(0,0,0,0.05)",
        transform: cardVisible
          ? hov ? "translateY(-7px)" : "translateY(0) scale(1)"
          : "translateY(28px) scale(0.97)",
        opacity: cardVisible ? 1 : 0,
        transition: cardVisible
          ? "opacity 0.5s ease, transform 0.45s cubic-bezier(.22,.68,0,1.15), box-shadow 0.3s ease, border-color 0.3s ease"
          : "none",
      }}
    >
      <style>{`
        :root { --red:#03349a; --amber:#c9643a; --cream:#fdf8f4; }
        @keyframes shim{0%{background-position:200% center}100%{background-position:-200% center}}
        .shim-btn{background:linear-gradient(90deg,#0337a4,#c9643a,#8b4513,#0337a4);background-size:200% auto;animation:shim 4s linear infinite;}
        .nav-hover:hover { color: #0337a4 !important; }
      `}</style>
      {/* ── Image Area ── */}
      <div
        className="relative w-full overflow-hidden flex-shrink-0 bg-[#f7f3ef]"
        style={{ height: 320 }}
      >
        {/* Primary image */}
        <img
          src={product?.productImages?.[0]?.url}
          alt={product.productName}
          draggable={false}
          className="absolute inset-0 w-full h-full object-contain p-3"
          style={{
            opacity: hov ? 0 : 1,
            transform: hov ? "scale(1.06)" : "scale(1)",
            transition: "opacity 0.4s ease, transform 0.6s ease",
          }}
        />
        {/* Hover image */}
        <img
          src={product?.productImages?.[1]?.url}
          alt={product.productName}
          draggable={false}
          className="absolute inset-0 w-full h-full object-contain p-3"
          style={{
            opacity: hov ? 1 : 0,
            transform: hov ? "scale(1)" : "scale(1.06)",
            transition: "opacity 0.4s ease, transform 0.6s ease",
          }}
        />

        {/* ── Zigzag Discount Ribbon — top right ── */}
        {disc > 0 && (
          <div
            className="absolute top-0 right-0 z-10 flex flex-col items-center justify-center text-white"
            style={{
              width: 56,
              paddingTop: 12,
              paddingBottom: 20,
              background: "linear-gradient(180deg,#FFB800,#e69f00)",
              lineHeight: 1.15,
              clipPath:
                "polygon(0 0,100% 0,100% 80%,93% 100%,85% 84%,77% 100%,69% 84%,61% 100%,53% 84%,45% 100%,37% 84%,29% 100%,21% 84%,13% 100%,5% 84%,0 100%)",
              boxShadow: "0 4px 14px rgba(0,0,0,0.20)",
            }}
          >
            <span className="text-[20px] font-black leading-none">{disc}%</span>
            <span className="text-[9px] font-bold tracking-widest uppercase mt-0.5">OFF</span>
          </div>
        )}

        {/* Offer tags — top left */}

        {(product.offerTags?.length > 0 || product.grabCode) && (
          <div className="absolute top-3 left-3 z-10 flex flex-col gap-1.5">
            {product.grabCode && (
              <span className="text-[10px] font-black uppercase tracking-wider px-2.5 py-1 rounded-full shadow-md bg-[#c9643a] text-white border border-white/20 animate-pulse">
                🔥 Grab Deal
              </span>
            )}
            {product.offerTags?.length > 0 &&
              (Array.isArray(product.offerTags) ? product.offerTags : [product.offerTags]).map(
                (tag, i) => (
                  <span
                    key={i}
                    className="text-[10px] font-bold uppercase tracking-wider px-2.5 py-1 rounded-full shadow-md"
                    style={{
                      backgroundColor: TAG_PALETTES[i % TAG_PALETTES.length].bg,
                      color: "#fff",
                    }}
                  >
                    {tag}
                  </span>
                )
              )
            }
          </div>
        )}

        {/* Wishlist button */}
        <button
          onClick={handleToggleWishlist}
          disabled={wishlistMut.isPending}
          className={`absolute bottom-3 right-3 z-10 w-9 h-9 rounded-full flex items-center justify-center shadow-md transition-all duration-300
            ${wishlisted ? "bg-rose-500 text-white scale-110" : "bg-white/90 text-stone-400 hover:text-rose-500 hover:scale-110"}`}
          style={{ opacity: hov || wishlisted ? 1 : 0 }}
        >
          <FaHeart size={13} className={wishlistMut.isPending ? "animate-pulse" : ""} />
        </button>
      </div>

      {/* ── Card Body ── */}
      <div className="flex flex-col flex-1 px-4 pt-4 pb-4 gap-2.5">

        {/* Product Name */}
        <h3 className="text-[17px] font-extrabold text-[#1a1a1a] leading-snug line-clamp-1">
          {product.productName}
        </h3>

        {/* For / With */}
        <div className="flex flex-col gap-1">
          <p className="text-[13px] text-gray-600 line-clamp-1">
            <span className="font-extrabold text-[#829b1c] uppercase text-[11px] mr-1 tracking-wide">
              FOR
            </span>
            {product.forWhom}
          </p>
          <p className="text-[13px] text-gray-600 line-clamp-1">
            <span className="font-extrabold text-[#c9643a] uppercase text-[11px] mr-1 tracking-wide">
              WITH
            </span>
            {product.withWhom}
          </p>
        </div>

        {/* Product tags — multi dark color */}
        {product.productTags?.length > 0 && (
          <div className="flex flex-wrap gap-1.5">
            {product.productTags.slice(0, 4).map((tag, i) => {
              const c = tagColor(tag, i);
              return (
                <span
                  key={i}
                  className="text-[11px] font-semibold px-2.5 py-0.5 rounded-full"
                  style={{ backgroundColor: c.bg, color: c.text }}
                >
                  {tag}
                </span>
              );
            })}
          </div>
        )}

        {/* Price row */}
        <div className="flex items-center gap-2 mt-auto">
          <span className="text-[20px] font-extrabold text-[#03349a]">
            ₹{Number(product.finalPrice).toLocaleString("en-IN")}
          </span>
          <span className="text-[14px] text-gray-400 line-through">
            ₹{Number(product.price).toLocaleString("en-IN")}
          </span>
          <span className="ml-auto text-[11px] font-bold text-emerald-700 bg-emerald-50 border border-emerald-200 px-2.5 py-0.5 rounded-full whitespace-nowrap">
            Save ₹{savings}
          </span>
        </div>

        {/* Grab Deal Promo */}
        {product.grabCode && (
          <div
            className="text-[10px] sm:text-[11px] font-bold text-center py-2 px-3 rounded-md text-[#0337a4] bg-[#ceddfd] transition-all duration-300"
            style={{
              boxShadow: hov ? "0 4px 12px rgba(3,55,164,0.1)" : "none",
              letterSpacing: "0.02em"
            }}
          >
            Use code <span className="font-black uppercase">{product.grabCode}</span> 
            {product.grabPrice && (
              <> → Get @ <span className="font-black">₹{Number(product.grabPrice).toLocaleString("en-IN")}</span></>
            )}
          </div>
        )}

        {/* Add to Cart button */}
        <button
          onClick={handleAddToCart}
          disabled={adding}
          className="w-full h-12 flex items-center overflow-hidden rounded-xl transition-all duration-300 disabled:opacity-60 active:scale-[.98] group"
          style={{ boxShadow: "0 8px 22px rgba(3,52,154,0.22)" }}
        >
          <div className="w-12 h-full flex items-center justify-center bg-[#022a7a] flex-shrink-0">
            <FaShoppingCart
              size={16}
              className={`text-white ${adding ? "animate-bounce" : "group-hover:scale-110 transition-transform"}`}
            />
          </div>
          <div className="shim-btn flex-1 h-full flex items-center justify-center text-white text-[13px] font-bold uppercase tracking-widest transition-colors duration-300">
            {adding ? "Adding…" : "Add to Cart"}
          </div>
        </button>
      </div>
    </div>
  );
}