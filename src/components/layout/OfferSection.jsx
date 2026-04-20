import React from "react";

export default function OffersSection() {
  const offers = [
    {
      title: "20% Off Your First Order",
      description: "Sign up and enjoy 20% off your first purchase!",
      cta: "Claim Now",
      bg: "bg-[#f3f6f2]", // light subtle green
      btn: "#03349a", // deep red accent
    },
    {
      title: "Buy 2 Get 1 Free",
      description: "Select products are available in this amazing deal.",
      cta: "Shop Now",
      bg: "bg-[#e8f0d8]", // soft olive-green
      btn: "#829b1c", // olive accent
    },
    {
      title: "Free Shipping Over $50",
      description: "Get your order delivered for free when you spend $50+.",
      cta: "Learn More",
      bg: "bg-[#f9ede6]", // light beige
      btn: "#c9643a", // orange accent
    },
  ];

  return (
    <section className="bg-gray-50 py-16 px-6">
      <div className="max-w-7xl mx-auto text-center mb-12">
        <h2 className="text-3xl md:text-4xl font-bold mb-2 bg-gradient-to-r from-[#1a0a0a] via-[#03349a] to-[#c9643a] bg-clip-text text-transparent">
          Special Offers & Discounts
        </h2>
        <div className="w-24 h-1 bg-[#c9643a] mx-auto rounded-full mb-4"></div>
        <p className="text-gray-600 max-w-2xl mx-auto">
          Don’t miss out on our limited-time deals and exclusive promotions!
        </p>
      </div>

      <div className="max-w-7xl mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
        {offers.map((offer, index) => (
          <div
            key={index}
            className={`${offer.bg} rounded-2xl shadow-lg p-8 flex flex-col justify-between transform transition hover:scale-105 duration-300`}
          >
            <div>
              <h3 className="text-2xl font-bold mb-3 bg-gradient-to-r from-[#1a0a0a] via-[#03349a] to-[#c9643a] bg-clip-text text-transparent">{offer.title}</h3>
              <p className="text-gray-700 text-sm md:text-base opacity-90">{offer.description}</p>
            </div>
            <button
              style={{ backgroundColor: offer.btn }}
              className="mt-6 px-5 py-3 text-white font-semibold rounded-full hover:opacity-90 transition"
            >
              {offer.cta}
            </button>
          </div>
        ))}
      </div>
    </section>
  );
}