import React, { useState, useEffect } from "react";

export default function TopScroll() {
  const messages = [
    "Mix Any 2 Products | Get Up to 30% Off",
    "Hurry! Free Delivery on Orders Above ₹999",
    "Subscribe & Get Exclusive 10% Off ",
    "Wellness Combo | Buy 3, Get 1 Free"
  ];

  const [index, setIndex] = useState(0);

  const nextSlide = () => {
    setIndex((prev) => (prev + 1) % messages.length);
  };

  const prevSlide = () => {
    setIndex((prev) => (prev - 1 + messages.length) % messages.length);
  };

  useEffect(() => {
    const interval = setInterval(nextSlide, 4000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div
      className="text-white py-3 flex justify-center"
      style={{
        background:
          "linear-gradient(90deg,#4a0000 0%,#8b0000 50%,#4a0000 100%)",
      }}
    >
      <div className="flex items-center w-full max-w-3xl justify-between px-4">

        {/* Left Arrow */}
        <button onClick={prevSlide} className="text-xl font-bold">
          ❮
        </button>

        {/* Message (fixed width so arrows don't move) */}
        <div className="flex-1 text-center px-4">
          <h2>{messages[index]}</h2>
        </div>

        {/* Right Arrow */}
        <button onClick={nextSlide} className="text-xl font-bold">
          ❯
        </button>

      </div>
    </div>
  );
}