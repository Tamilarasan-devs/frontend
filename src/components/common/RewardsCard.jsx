import { useState } from "react";
import { Gift, X, Star, Users, Sparkles, ChevronRight, Copy, Check } from "lucide-react";

export default function RewardsCard() {
  const [open, setOpen] = useState(false);
  const [copied, setCopied] = useState(false);

  const handleCopy = () => {
    navigator.clipboard.writeText("SBLS-REF-2025");
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="fixed bottom-10 lef z-[9999] ">
        
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700;800&display=swap');
        @keyframes fadeIn { from { opacity:0; transform:scale(0.95); } to { opacity:1; transform:scale(1); } }
        @keyframes slideUp { from { opacity:0; transform:translateY(16px); } to { opacity:1; transform:translateY(0); } }
        @keyframes float { 0%,100%{transform:translateY(0)} 50%{transform:translateY(-6px)} }
        .modal-anim { animation: fadeIn 0.3s cubic-bezier(.34,1.56,.64,1) both; }
        .slide-up { animation: slideUp 0.4s ease both; }
        .float-anim { animation: float 3s ease-in-out infinite; }
      `}</style>

      {/* ── Trigger Button ── */}
      <button
        onClick={() => setOpen(true)}
        className="relative p-4 rounded-2xl text-white shadow-2xl transition-all hover:scale-110 active:scale-95 float-anim"
        style={{ background: "#FFB800", boxShadow: "0 12px 40px rgba(130,12,12,0.4)" }}
      >
        <Gift size={26} />
        <span className="absolute -top-1.5 -right-1.5 w-5 h-5 rounded-full text-white text-[9px] font-black flex items-center justify-center border-2 border-white"
          style={{ background: "#03349a" }}>3</span>
      </button>

      {/* ── Modal ── */}
      {open && (
        <div
          className="fixed inset-0 flex items-center justify-center bg-black/50 z-50 px-4"
          style={{ backdropFilter: "blur(4px)" }}
          onClick={(e) => e.target === e.currentTarget && setOpen(false)}
        >
          <div className="modal-anim w-full max-w-sm rounded-3xl overflow-hidden shadow-2xl"
            style={{ fontFamily: "'Inter', sans-serif" }}>

            {/* ── Hero Top ── */}
            <div className="relative overflow-hidden px-6 pt-8 pb-10"
              style={{ background: "linear-gradient(135deg, #03349a 0%, #5a0808 60%, #3a0404 100%)" }}
              
              >

              {/* Decorative circles */}
              <div className="absolute -top-10 -right-10 w-40 h-40 rounded-full bg-white opacity-[0.04]" 
              />
              <div className="absolute -bottom-8 -left-8 w-32 h-32 rounded-full opacity-10"
              
                style={{ background: "#aab820" }} />
              <div className="absolute inset-0" style={{
                backgroundImage: "radial-gradient(circle at 1px 1px, rgba(255,255,255,0.05) 1px, transparent 0)",
                backgroundSize: "20px 20px"
              }} />

              {/* Close */}
              <button
                onClick={() => setOpen(false)}
                className="absolute top-4 right-4 w-8 h-8 rounded-full flex items-center justify-center transition-all hover:bg-white/20"
                style={{ background: "rgba(255,255,255,0.1)" }}
              >
                <X size={14} className="text-white" />
              </button>

              {/* Icon + Title */}
              <div className="relative z-10 text-center">
                <div className="w-16 h-16 rounded-2xl flex items-center justify-center mx-auto mb-4 shadow-lg"
                  style={{ background: "linear-gradient(135deg, #aab820, #c8d520)", boxShadow: "0 8px 32px rgba(0,0,0,0.25)" }}>
                  <Gift size={28} className="text-white" />
                </div>
                <div className="flex items-center justify-center gap-2 mb-2">
                  <div className="w-8 h-px opacity-50" style={{ background: "#aab820" }} />
                  <span className="text-[9px] tracking-[4px] uppercase font-semibold" style={{ color: "#c8d520" }}>
                    Rewards Program
                  </span>
                  <div className="w-8 h-px opacity-50" style={{ background: "#aab820" }} />
                </div>
                <h2 className="text-2xl font-black text-white leading-tight mb-2">
                  Welcome to<br />
                  <em className="not-italic font-black" style={{ color: "#c8d520" }}>
Aayubakwath Rewards</em>
                </h2>
                <p className="text-white/50 text-xs leading-relaxed max-w-xs mx-auto">
                  Earn points with every purchase and redeem them for exclusive discounts.
                </p>
              </div>

              {/* Curved bottom */}
              <div className="absolute bottom-0 left-0 w-full h-6">
                <svg viewBox="0 0 400 24" preserveAspectRatio="none" className="w-full h-full">
                  <path d="M0,0 Q200,24 400,0 L400,24 L0,24 Z" fill="white" />
                </svg>
              </div>
            </div>

            {/* ── Body ── */}
            <div className="bg-white px-6 pb-6 -mt-1">

              {/* CTA Buttons */}
              <div className="flex gap-3 mb-5 slide-up" style={{ animationDelay: "0.1s" }}>
                <button
                  className="flex-1 py-3 rounded-2xl text-white text-sm font-bold tracking-wide transition-all hover:opacity-90 active:scale-[0.97] flex items-center justify-center gap-2"
                  style={{ background: "linear-gradient(135deg, #03349a, #a81010)", boxShadow: "0 6px 20px rgba(130,12,12,0.3)" }}
                >
                  <Sparkles size={14} />
                  Join Now
                </button>
                <button
                  className="flex-1 py-3 rounded-2xl text-sm font-bold tracking-wide transition-all hover:bg-[#faf7f2] active:scale-[0.97]"
                  style={{ border: "1.5px solid #e5e7eb", color: "#374151" }}
                >
                  Sign In
                </button>
              </div>

              {/* Points banner */}
            

              {/* Referral Card */}
              <div className="rounded-2xl overflow-hidden slide-up"
                style={{ border: "1.5px solid #f0f0f0", animationDelay: "0.2s" }}>

                {/* Card Header */}
                <div className="flex items-center gap-2 px-4 py-3 border-b"
                  style={{ borderColor: "#f5f5f5", background: "#faf7f2" }}>
                  <div className="w-7 h-7 rounded-lg flex items-center justify-center"
                    style={{ background: "rgba(130,12,12,0.08)" }}>
                    <Users size={13} style={{ color: "#03349a" }} />
                  </div>
                  <p className="font-bold text-gray-800 text-sm">Referral Program</p>
                  <span
                    className="ml-auto text-[9px] tracking-widest uppercase font-bold px-2 py-0.5 rounded-full"
                    style={{ background: "rgba(130,12,12,0.08)", color: "#03349a" }}
                  >
                    Active
                  </span>
                </div>

                <div className="p-4">
                  {/* Referral Stats */}
                  <div className="grid grid-cols-2 gap-3 mb-4">
                    <div className="p-3 rounded-xl text-center"
                      style={{ background: "#f0fdf4", border: "1.5px solid #bbf7d0" }}>
                      <p className="text-[10px] text-gray-400 uppercase tracking-widest font-semibold mb-1">They get</p>
                      <p className="font-black text-green-600 text-sm">5% Off</p>
                      <p className="text-[10px] text-green-500">First order coupon</p>
                    </div>
                    <div className="p-3 rounded-xl text-center"
                      style={{ background: "rgba(130,12,12,0.04)", border: "1.5px solid rgba(130,12,12,0.12)" }}>
                      <p className="text-[10px] text-gray-400 uppercase tracking-widest font-semibold mb-1">You get</p>
                      <p className="font-black text-sm" style={{ color: "#03349a" }}>100 Points</p>
                      <p className="text-[10px]" style={{ color: "#a83030" }}>≈ ₹100 off</p>
                    </div>
                  </div>

                  {/* Referral Code */}
                  <div className="flex items-center gap-2 px-3 py-2.5 rounded-xl"
                    style={{ background: "#faf7f2", border: "1.5px dashed rgba(130,12,12,0.2)" }}>
                    <span className="text-xs text-gray-400 font-medium flex-1">Your code:</span>
                    <span className="text-sm font-black text-gray-800 tracking-wider">SBLS-REF-2025</span>
                    <button
                      onClick={handleCopy}
                      className="w-7 h-7 rounded-lg flex items-center justify-center transition-all hover:scale-110"
                      style={{ background: copied ? "#dcfce7" : "rgba(130,12,12,0.08)" }}
                    >
                      {copied
                        ? <Check size={12} className="text-green-600" />
                        : <Copy size={12} style={{ color: "#03349a" }} />}
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}