import { useState, useEffect } from "react";
const CRIMSON = "#820c0c";
const AMBER = "#c9643a";

function OfferModal() {
  const [show, setShow] = useState(false);

  // Show modal 1 second after page load
  useEffect(() => {
    const timer = setTimeout(() => setShow(true), 1000);
    return () => clearTimeout(timer);
  }, []);

  if (!show) return null;

  return (
    <div
      className="fixed inset-0 bg-white bg-opacity-30 backdrop-blur-md flex items-center justify-center z-50"
      onClick={() => setShow(false)}
    >
      {/* Modal box */}
      <div
        className="bg-white rounded-3xl shadow-2xl w-11/12 max-w-md p-8 relative animate-fadeIn"
        onClick={(e) => e.stopPropagation()} // prevent closing when clicking inside
      >
        {/* Close button */}
        <button
          onClick={() => setShow(false)}
          className="absolute top-4 right-4 text-gray-500 hover:text-gray-800 font-bold text-xl"
        >
          &times;
        </button>

        {/* Content */}
        <h2
          className="text-3xl font-extrabold mb-4 text-center"
          style={{
            background: `linear-gradient(90deg, ${CRIMSON}, ${AMBER})`,
            WebkitBackgroundClip: "text",
            color: "transparent",
          }}
        >
          Special Offer!
        </h2>
        <p className="text-center text-lg text-gray-700 mb-6">
          Grab your favorite products at <span className="font-bold">₹629</span> only!
        </p>
        <p className="text-center text-sm text-gray-500 mb-6">
          Use Code: <span className="font-bold" style={{ color: CRIMSON }}>GRAB</span> at checkout
        </p>

        {/* CTA Button */}
        <div className="flex justify-center">
          <a
            href="#products"
            className="bg-[${CRIMSON}] hover:bg-[${AMBER}] text-white font-semibold px-8 py-3 rounded-full shadow-lg transition-all duration-300"
            onClick={() => setShow(false)}
          >
            Shop Now
          </a>
        </div>
      </div>

      <style>
        {`@keyframes fadeIn {
  from { opacity: 0; transform: translateY(-10px); }
  to { opacity: 1; transform: translateY(0); }
}

.animate-fadeIn {
  animation: fadeIn 0.5s ease forwards;
}`}
      </style>
    </div>
  );
}

export default OfferModal;