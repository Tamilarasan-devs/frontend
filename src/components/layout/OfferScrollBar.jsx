import React from "react";

const items = [
  "60 Days Money Back Guarantee 🔥",
  "🎉 Upto 51% OFF + EXTRA 10% OFF Above 2999",
  "💳 Secure Payment Available",
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
              className="inline-flex items-center text-lg font-bold whitespace-nowrap mr-16"
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