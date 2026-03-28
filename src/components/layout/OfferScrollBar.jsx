import React from "react";

const items = [
  "🔒 100% Secure Checkout",
  "🚀 Fast & Reliable Delivery",
  "💥 Flat Discounts on All Products",
  "🎉 Extra Savings on Bulk Orders",
  "🔁 Easy Returns & Money Back Guarante",
  "🌿 100% Herbal & Safe Products"
];

export default function OfferScrollBar() {
  // Repeat items 4x to ensure seamless looping at any screen width
  const repeated = [...items, ...items, ...items, ...items];

  return (
    <>
      <div className="w-full h-16  overflow-hidden py-2 group flex justify-center">
        <div className="flex w-max animate-marquee group-hover:[animation-play-state:paused]">
          {repeated.map((text, i) => (
            <span
              key={i}
              className="inline-flex items-center text-lg font-bold whitespace-nowrap  mr-4"
            >
                 <span className="mr-4 ">•</span> 
               {text}
            </span>
          ))}
        </div>
      </div>

      <style>{`
        @keyframes marquee {
          0%   { transform: translateX(0); }
          100% { transform: translateX(-25%); }
        }
        .animate-marquee {
          animation: marquee 20s linear infinite;
        }
      `}</style>
    </>
  );
}