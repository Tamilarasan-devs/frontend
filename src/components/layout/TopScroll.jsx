import React, { useState, useEffect } from "react";

export default function TopScroll() {
  const messages = [
    "Product Of The Month : Milk Mud Mask | Use code HURRY20 & Get FLAT 20% OFF",
    "☀️ Your Newest Summer Obsession : Skin Finish Sunscreen SPF 50+ PA+++",
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
  }, [index]);

  return (
    <div className=" text-white py-3 relative flex items-center justify-center"  style={{ background: "linear-gradient(90deg,#4a0000 0%,#8b0000 50%,#4a0000 100%)" }}>

      {/* Left Arrow */}
      <button
        onClick={prevSlide}
        className="absolute left-4 top-1/2 -translate-y-1/2 text-xl font-bold"
      >
        ❮
      </button>

      {/* Message */}
      <h2 className="text-center px-10">
        {messages[index]}
      </h2>

      {/* Right Arrow */}
      <button
        onClick={nextSlide}
        className="absolute right-4 top-1/2 -translate-y-1/2 text-xl font-bold"
      >
        ❯
      </button>

    </div>
  );
}