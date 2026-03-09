import { FaWhatsapp } from "react-icons/fa";

export default function WhatsAppButton() {
  const phoneNumber = "9443157282";
  const message = "Hello, I would like to know more about your products.";

  const handleClick = () => {
    const url = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(message)}`;
    window.open(url, "_blank");
  };

  return (
    <>
      <style>{`
        @keyframes jump {
          0%, 100% { transform: translateY(0) scale(1); }
          30%       { transform: translateY(-18px) scale(1.08); }
          50%       { transform: translateY(-22px) scale(1.05); }
          70%       { transform: translateY(-6px) scale(1.02); }
          85%       { transform: translateY(-10px) scale(1.03); }
        }

        @keyframes shadowPulse {
          0%, 100% { transform: scaleX(1); opacity: 0.35; }
          50%       { transform: scaleX(0.55); opacity: 0.15; }
        }

        @keyframes ripple {
          0%   { transform: scale(1); opacity: 0.6; }
          100% { transform: scale(2.4); opacity: 0; }
        }

        .whatsapp-btn {
          animation: jump 1.8s cubic-bezier(0.36, 0.07, 0.19, 0.97) infinite;
        }

        .whatsapp-btn:hover {
          animation: none;
          transform: scale(1.15);
          transition: transform 0.2s ease;
        }

        .btn-shadow {
          animation: shadowPulse 1.8s ease-in-out infinite;
        }

        .ripple-ring {
          animation: ripple 1.8s ease-out infinite;
        }

        .ripple-ring-2 {
          animation: ripple 1.8s ease-out 0.6s infinite;
        }
      `}</style>

      <div className="fixed bottom-8 left-8 z-50 flex flex-col items-center">
        {/* Ripple rings */}
        <div className="relative flex items-center justify-center">
          <div className="ripple-ring absolute w-14 h-14 rounded-full bg-green-400 opacity-60" />
          <div className="ripple-ring-2 absolute w-14 h-14 rounded-full bg-green-400 opacity-40" />

          {/* Button */}
          <button
            onClick={handleClick}
            className="whatsapp-btn relative bg-green-500 hover:bg-green-600 text-white p-4 rounded-full shadow-xl cursor-pointer border-0 outline-none"
          >
            <FaWhatsapp size={26} />
          </button>
        </div>

        {/* Shadow on ground */}
        <div className="btn-shadow w-10 h-2 bg-black rounded-full mt-1" />
      </div>
    </>
  );
}