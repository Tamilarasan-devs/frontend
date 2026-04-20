import { useState } from "react";
import { Heart, ShoppingBag, Trash2, ArrowRight, Package, Sparkles, Loader2 } from "lucide-react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { getWishlist, removeFromWishlist } from "../services/wishlistService";
import { addToCart } from "../services/cartService";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

const BADGE_STYLES = {
  Bestseller: "bg-amber-100 text-amber-700 border border-amber-200",
  New:        "bg-emerald-100 text-emerald-700 border border-emerald-200",
  "Top Rated":"bg-rose-100 text-rose-700 border border-rose-200",
  Limited:    "bg-violet-100 text-violet-700 border border-violet-200",
};

const StarRow = ({ rating }) => (
  <div className="flex items-center gap-0.5">
    {Array.from({ length: 5 }).map((_, i) => (
      <svg key={i} className="w-3 h-3" viewBox="0 0 20 20">
        <path
          d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"
          fill={i < Math.round(rating || 4.5) ? "#f59e0b" : "#e5e7eb"}
        />
      </svg>
    ))}
  </div>
);

export default function WishlistPage() {
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const [addingToCart, setAddingToCart] = useState({});

  const { data: wishlistData, isLoading, isError } = useQuery({
    queryKey: ["wishlist"],
    queryFn: getWishlist,
    enabled: !!localStorage.getItem("token"),
  });

  const removeMutation = useMutation({
    mutationFn: removeFromWishlist,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["wishlist"] });
      toast.success("Removed from wishlist");
    },
    onError: () => {
      toast.error("Failed to remove item");
    },
  });

  const cartMutation = useMutation({
    mutationFn: addToCart,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["cart"] });
      toast.success("Added to cart");
    },
    onError: (error) => {
      if (error.response?.status === 401) {
        toast.error("Please login first");
        navigate("/login");
      } else {
        toast.error("Failed to add to cart");
      }
    },
  });

  const handleRemove = (id) => {
    removeMutation.mutate(id);
  };

  const handleAddToCart = async (product) => {
    setAddingToCart(prev => ({ ...prev, [product.id]: true }));
    try {
      await cartMutation.mutateAsync({ productId: product.id, quantity: 1 });
    } finally {
      setAddingToCart(prev => ({ ...prev, [product.id]: false }));
    }
  };

  const wishlist = wishlistData?.data || [];
  const totalSaved = wishlist.reduce((acc, item) => {
    const product = item.product;
    return acc + (product ? (product.price - product.finalPrice) : 0);
  }, 0);

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#faf9f7]">
        <div className="flex flex-col items-center gap-4">
          <Loader2 size={40} className="text-rose-600 animate-spin" />
          <p className="text-stone-500 font-medium">Loading your wishlist...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#faf9f7]" style={{ fontFamily: "'DM Sans', 'Segoe UI', sans-serif" }}>

      {/* ── Header ── */}
      <div className="bg-white border-b border-stone-100 sticky top-0 z-20 shadow-sm">
        <div className="max-w-6xl mx-auto px-5 md:px-10 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-xl bg-rose-600 flex items-center justify-center shadow">
              <Heart size={17} className="text-white fill-white" />
            </div>
            <div>
              <h1 className="text-lg font-bold text-stone-900 leading-none">My Wishlist</h1>
              <p className="text-xs text-stone-400 mt-0.5">{wishlist.length} saved item{wishlist.length !== 1 ? "s" : ""}</p>
            </div>
          </div>

          {wishlist.length > 0 && (
            <div className="hidden sm:flex items-center gap-2 bg-emerald-50 border border-emerald-200 rounded-xl px-4 py-2">
              <Sparkles size={14} className="text-emerald-600" />
              <span className="text-xs font-bold text-emerald-700">
                You're saving <span className="text-sm">₹{totalSaved.toFixed(0)}</span> total
              </span>
            </div>
          )}
        </div>
      </div>

      {/* ── Body ── */}
      <div className="max-w-6xl mx-auto px-5 md:px-10 py-10">

        {/* Empty state */}
        {wishlist.length === 0 && (
          <div className="flex flex-col items-center justify-center py-32 text-center">
            <div className="w-20 h-20 rounded-full bg-rose-50 border-2 border-dashed border-rose-200 flex items-center justify-center mb-5">
              <Heart size={32} className="text-rose-300" />
            </div>
            <h2 className="text-xl font-bold text-stone-800 mb-2">Your wishlist is empty</h2>
            <p className="text-stone-400 text-sm max-w-xs mb-6">
              Save items you love and come back to them anytime.
            </p>
            <button 
              onClick={() => navigate("/productListing")}
              className="flex items-center gap-2 px-6 py-3 bg-rose-600 text-white rounded-xl text-sm font-bold hover:bg-rose-700 transition-colors shadow"
            >
              Explore Products <ArrowRight size={15} />
            </button>
          </div>
        )}

        {/* Grid */}
        {wishlist.length > 0 && (
          <>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
              {wishlist.map((item) => {
                const product = item.product;
                if (!product) return null;
                
                const discount = Math.round(((product.price - product.finalPrice) / product.price) * 100);
                const isRemoving = removeMutation.isPending && removeMutation.variables === item.id;
                const inCart = addingToCart[product.id];
                const badge = product.offerTags?.[0];

                return (
                  <div
                    key={item.id}
                    className="group bg-white rounded-2xl overflow-hidden border border-stone-100 shadow-sm hover:shadow-xl transition-all duration-300"
                    style={{
                      opacity:    isRemoving ? 0.5 : 1,
                      transform:  isRemoving ? "scale(0.95)" : "scale(1)",
                      transition: "opacity 0.35s ease, transform 0.35s ease, box-shadow 0.3s ease",
                    }}
                  >
                    {/* Image */}
                    <div className="relative overflow-hidden bg-stone-50 h-52 cursor-pointer" onClick={() => navigate(`/product/${product.id}`)}>
                      <img
                        src={product.productImages?.[0]?.url || "https://images.unsplash.com/photo-1620916566398-39f1143ab7be?w=400&h=400&fit=crop"}
                        alt={product.productName}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                      />

                      {/* Badge */}
                      {badge && (
                        <span className={`absolute top-3 left-3 text-[10px] font-bold px-2.5 py-1 rounded-full ${BADGE_STYLES[badge] || "bg-stone-100 text-stone-700 border border-stone-200"}`}>
                          {badge}
                        </span>
                      )}

                      {/* Discount pill */}
                      {discount > 0 && (
                        <span className="absolute top-3 right-3 bg-rose-600 text-white text-[10px] font-extrabold px-2 py-1 rounded-full shadow">
                          -{discount}%
                        </span>
                      )}

                      {/* Remove button */}
                      <button
                        onClick={(e) => { e.stopPropagation(); handleRemove(item.id); }}
                        className="absolute bottom-3 right-3 w-8 h-8 rounded-full bg-white shadow-md flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-200 hover:bg-rose-50 hover:text-rose-600 text-stone-400"
                        title="Remove from wishlist"
                      >
                        <Trash2 size={14} />
                      </button>
                    </div>

                    {/* Details */}
                    <div className="p-4 flex flex-col gap-3">
                      <div>
                        <p className="text-[10px] font-bold uppercase tracking-widest text-stone-400 mb-1">
                          {product.forWhom || "Holistic Care"}
                        </p>
                        <h2 className="text-sm font-bold text-stone-900 leading-snug cursor-pointer hover:text-rose-600 transition-colors" onClick={() => navigate(`/product/${product.id}`)}>
                          {product.productName}
                        </h2>

                        <div className="flex items-center gap-2 mt-1.5">
                          <StarRow rating={4.7} />
                          <span className="text-[10px] text-stone-400 font-medium">(1.2k)</span>
                        </div>
                      </div>

                      {/* Price */}
                      <div className="flex items-baseline gap-2">
                        <span className="text-base font-extrabold text-stone-900">
                          ₹{product.finalPrice}
                        </span>
                        <span className="text-xs text-stone-400 line-through">
                          ₹{product.price}
                        </span>
                        {product.price > product.finalPrice && (
                          <span className="text-[10px] font-bold text-emerald-600 bg-emerald-50 px-1.5 py-0.5 rounded-md">
                            Save ₹{product.price - product.finalPrice}
                          </span>
                        )}
                      </div>

                      {/* CTA */}
                      <button
                        onClick={() => handleAddToCart(product)}
                        disabled={inCart}
                        className={[
                          "w-full py-2.5 rounded-xl text-xs font-bold flex items-center justify-center gap-1.5 transition-all duration-200",
                          inCart
                            ? "bg-emerald-600 text-white"
                            : "bg-stone-900 text-white hover:bg-rose-600 shadow-md",
                        ].join(" ")}
                      >
                        {inCart ? (
                          <>✓ Added</>
                        ) : (
                          <><ShoppingBag size={13} /> Add to Bag</>
                        )}
                      </button>
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Footer summary bar */}
            <div className="mt-10 bg-white border border-stone-100 rounded-2xl px-6 py-5 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 shadow-sm">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-stone-100 flex items-center justify-center">
                  <Package size={18} className="text-stone-500" />
                </div>
                <div>
                  <p className="text-sm font-bold text-stone-800">{wishlist.length} item{wishlist.length !== 1 ? "s" : ""} in wishlist</p>
                  <p className="text-xs text-stone-400">Total potential savings: <span className="text-emerald-600 font-bold">₹{totalSaved.toFixed(0)}</span></p>
                </div>
              </div>
              <button
                onClick={() => wishlist.forEach((i) => handleAddToCart(i.product))}
                className="flex items-center gap-2 px-6 py-3 bg-stone-900 text-white rounded-xl text-sm font-bold hover:bg-rose-600 transition-colors shadow"
              >
                <ShoppingBag size={15} /> Add All to Bag
              </button>
            </div>
          </>
        )}
      </div>
    </div>
  );
}