import React, { useEffect, useState } from "react";
import { axiosInstance } from "../../utils/axiosInstance";

export default function OfferScrollBar() {

// const offers = [
//   { offerText: "🌿 100% Herbal & Natural Formula" },
//   { offerText: "🎉 Save More on Combos" },
//   { offerText: "⚡ Revitalize Your Everyday Life" },
//   { offerText: "🔁 Confidence with Every Purchase" },
//   { offerText: "🎯 Wellness You Can Trust" },
//   { offerText: "💪 Built for Strength & Energy" }
// ];
  const [offers, setOffers] = useState([]);
  console.log(offers)
  const [loading, setLoading] = useState(true);

  // Fetch offers from API
  const getOffers = async () => {
    try {
      const res = await axiosInstance.get("/offerBar/getOfferBar");
      // Assuming your API returns { data: [{ text: '...' }, ...] }
      setOffers(res.data.data || []);
    } catch (err) {
      console.log(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getOffers();
  }, []);

  // Repeat offers to make smooth scrolling
  const repeated = [...offers, ...offers, ...offers, ...offers];

  if (loading) return <div className="text-center py-4">Loading offers...</div>;
  if (offers.length === 0)
    return <div className="text-center py-4">No offers available</div>;

  return (
    <div className="w-full h-16 overflow-hidden py-2 group flex justify-center">
      <div className="flex w-max animate-marquee group-hover:[animation-play-state:paused]">
        {repeated.map((offer, i) => (
          <span
            key={i}
            className="inline-flex items-center text-lg font-bold whitespace-nowrap mr-6 "
          >
            <span className="mr-2">•</span>
            {offer.offerText}
          </span>
        ))}
      </div>

      {/* Tailwind custom animation */}
      <style>{`
        @keyframes marquee {
          0% { transform: translateX(-25%); }
          100% { transform: translateX(0); }
        }
        .animate-marquee {
          animation: marquee 20s linear infinite;
        }
      `}</style>
    </div>
  );
}