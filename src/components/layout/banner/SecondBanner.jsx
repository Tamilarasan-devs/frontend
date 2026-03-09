import React from "react";
import bnr from '../../../assets/images/bnr-1.webp'
export default function SecondBanner() {
  return (
    <div className="px-6 py-12">
      <div
        className="relative rounded-3xl overflow-hidden h-[400px] flex items-center justify-center text-center"
        style={{
          backgroundImage: "url('https://via.placeholder.com/1400x500')",
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      >
        {/* Dark Overlay */}
        <div className="absolute inset-0 bg-black/50"></div>

        {/* Content */}
        <div className="relative z-10 text-white max-w-2xl px-6">
          <p className="uppercase tracking-widest text-sm mb-3">
            Special Offer
          </p>

          <h2 className="text-3xl md:text-5xl font-bold mb-4 leading-snug">
            Discover Natural Wellness Products
          </h2>

          <p className="mb-6 text-gray-200">
            Pure ingredients. Sustainable sourcing. Crafted with care for your
            everyday lifestyle.
          </p>

          <button className="bg-[#2E7D32] px-8 py-3 rounded-full font-semibold hover:bg-[#1B5E20] transition duration-300">
            Shop Now
          </button>
        </div>
      </div>
    </div>
  );
}