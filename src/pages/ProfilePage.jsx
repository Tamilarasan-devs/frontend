import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const mockUser = {
  name: "John Doe",
  email: "john.doe@example.com",
  phone: "+1 (555) 123-4567",
  joined: "January 2025",
  avatar: "JD",
  addresses: [
    { id: 1, label: "Home", details: "123 Main Street, City, Country", default: true },
    { id: 2, label: "Office", details: "456 Office Blvd, City, Country", default: false },
  ],
};
    const addresses = [1, 2];

const mockOrders = [
  { id: 101, date: "Jan 20, 2026", status: "Delivered", total: 89.99, items: 3 },
  { id: 102, date: "Feb 10, 2026", status: "Processing", total: 49.99, items: 1 },
  { id: 103, date: "Feb 18, 2026", status: "Shipped", total: 129.99, items: 2 },
];

const mockWishlist = [
  { id: 201, name: "Vitamin C Serum", price: 29.99, originalPrice: 39.99, image: "https://images.unsplash.com/photo-1620916566398-39f1143ab7be?w=400&q=80" },
  { id: 202, name: "Omega-3 Capsules", price: 49.99, originalPrice: 59.99, image: "https://images.unsplash.com/photo-1584308666744-24d5c474f2ae?w=400&q=80" },
  { id: 203, name: "Collagen Powder", price: 34.99, originalPrice: 44.99, image: "https://images.unsplash.com/photo-1612817288484-6f916006741a?w=400&q=80" },
];

const statusConfig = {
  Delivered: { color: "text-emerald-700", bg: "bg-emerald-50", border: "border-emerald-200", dot: "bg-emerald-500" },
  Processing: { color: "text-amber-700", bg: "bg-amber-50", border: "border-amber-200", dot: "bg-amber-500" },
  Shipped: { color: "text-blue-700", bg: "bg-blue-50", border: "border-blue-200", dot: "bg-blue-500" },
};

const tabs = ["Overview", "Orders", "Wishlist", "Addresses"];

export default function ProfilePage() {
  const [user] = useState(mockUser);
  const [activeTab, setActiveTab] = useState("Overview");
  const [wishlist, setWishlist] = useState(mockWishlist);

  const removeWishlist = (id) => setWishlist(wishlist.filter(i => i.id !== id));
const navigate = useNavigate()
  return (
    <div className="min-h-screen bg-[#fff]" >
      <style>{`
        @keyframes fadeUp { from { opacity:0; transform:translateY(20px); } to { opacity:1; transform:translateY(0); } }
        .fade-up { animation: fadeUp 0.5s ease both; }
      `}</style>

      {/* ── TOP HERO BANNER ── */}
      
    <div className="relative overflow-hidden bg-[#faf7f2]">

      <div className="max-w-6xl mx-auto flex flex-col lg:flex-row min-h-[220px]">

        {/* Left — crimson block */}
        <div className="relative lg:w-[55%] overflow-hidden px-10 py-12 flex flex-col justify-between"
          style={{ background: "linear-gradient(135deg, #03349a 0%, #5a0808 100%)" }}>
          <div className="absolute -top-10 -right-10 w-48 h-48 rounded-full opacity-10"
            style={{ background: "radial-gradient(circle, #aab820, transparent)" }} />
          <div className="absolute inset-0" style={{ backgroundImage: "repeating-linear-gradient(45deg,transparent,transparent 28px,rgba(255,255,255,0.015) 28px,rgba(255,255,255,0.015) 29px)" }} />

          <div className="relative z-10 flex items-center gap-6">
            {/* Large avatar */}
            <div className="w-20 h-20 rounded-2xl shrink-0 flex items-center justify-center text-2xl font-black"
              style={{ background: "linear-gradient(135deg,#aab820,#d4e020)", color: "#03349a", boxShadow: "0 8px 32px rgba(0,0,0,0.3)" }}>
              {user.avatar}
            </div>
            <div>
              <div className="flex items-center gap-2 mb-1">
                <div className="w-5 h-px bg-[#aab820]" />
                <span className="text-[9px] tracking-[4px] uppercase text-[#aab820] font-bold">My Account</span>
              </div>
              <h1 className="text-3xl font-black text-white leading-tight">
                {user.name.split(" ")[0]}{" "}
                <span style={{ color: "#aab820" }}>{user.name.split(" ")[1]}</span>
              </h1>
              <p className="text-white/40 text-xs mt-1">{user.email}</p>
            </div>
          </div>

          {/* Diagonal cut (pseudo via clip) */}
          <div className="hidden lg:block absolute top-0 -right-8 w-16 h-full z-20"
            style={{ background: "#faf7f2", clipPath: "polygon(100% 0, 100% 100%, 0 100%, 40% 0)" }} />
        </div>

        {/* Right — stats on cream */}
        <div className="flex-1 flex items-center justify-around px-10 py-10 gap-4">
          {[
            { label: "Total Orders", value: mockOrders.length, color: "#03349a", bg: "rgba(130,12,12,0.06)", icon: (
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" className="w-5 h-5">
                <path d="M6 2L3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4z"/><line x1="3" y1="6" x2="21" y2="6"/><path d="M16 10a4 4 0 0 1-8 0"/>
              </svg>
            )},
            { label: "Wishlist", value: wishlist.length, color: "#dc2626", bg: "rgba(220,38,38,0.06)", icon: (
              <svg viewBox="0 0 24 24" fill="currentColor" stroke="currentColor" strokeWidth="0" className="w-5 h-5">
                <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"/>
              </svg>
            )},
            { label: "Addresses", value: addresses.length, color: "#b45309", bg: "rgba(180,83,9,0.06)", icon: (
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" className="w-5 h-5">
                <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"/><circle cx="12" cy="10" r="3"/>
              </svg>
            )},
          ].map((s, i) => (
            <div key={i} className="flex flex-col items-center gap-3">
              <div className="w-14 h-14 rounded-2xl flex items-center justify-center"
                style={{ background: s.bg, color: s.color }}>
                {s.icon}
              </div>
              <div className="text-center">
                <p className="text-3xl font-black" style={{ color: s.color }}>{s.value}</p>
                <p className="text-gray-400 text-xs tracking-widest uppercase font-medium mt-0.5">{s.label}</p>
              </div>
            </div>
          ))}
        </div>

      </div>
      </div>

      <div className="max-w-6xl mx-auto px-6 py-8">

        {/* ── TABS ── */}
        <div className="flex gap-1 bg-white rounded-2xl p-1.5 shadow-sm border border-red-50 mb-8 overflow-x-auto">
          {tabs.map(tab => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className="flex-1 min-w-max py-2.5 px-5 rounded-xl text-sm font-semibold transition-all"
              style={activeTab === tab
                ? { background: "linear-gradient(135deg, #03349a, #a81010)", color: "white", boxShadow: "0 4px 12px rgba(130,12,12,0.2)" }
                : { color: "#6b7280" }}
            >
              {tab}
            </button>
          ))}
        </div>

        {/* ── OVERVIEW TAB ── */}
        {activeTab === "Overview" && (
          <div className="fade-up space-y-6">
            {/* Profile Card */}
            <div className="bg-white rounded-2xl shadow-sm border border-red-50 p-8">
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-lg font-bold text-[#03349a]">Personal Information</h3>
                <button className="flex items-center gap-2 text-sm font-semibold text-[#03349a] border border-[#03349a]/20 px-4 py-2 rounded-xl hover:bg-[#03349a]/5 transition-all">
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-3.5 h-3.5">
                    <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7" />
                    <path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z" />
                  </svg>
                  Edit Profile
                </button>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
                {[
                  { label: "Full Name", value: user.name, icon: "M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2 M12 7a4 4 0 1 0 0-8 4 4 0 0 0 0 8z" },
                  { label: "Email Address", value: user.email, icon: "M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z M22,6 12,13 2,6" },
                  { label: "Phone", value: user.phone, icon: "M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07A19.5 19.5 0 0 1 4.69 12" },
                ].map((item, i) => (
                  <div key={i} className="bg-[#faf7f2] rounded-xl p-4 border border-red-50">
                    <p className="text-[10px] tracking-[3px] uppercase text-[#03349a]/50 font-semibold mb-1">{item.label}</p>
                    <p className="text-gray-800 font-semibold text-sm">{item.value}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* Recent Orders Preview */}
            <div className="bg-white rounded-2xl shadow-sm border border-red-50 p-8">
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-lg font-bold text-[#03349a]">Recent Orders</h3>
                <button onClick={() => setActiveTab("Orders")} className="text-sm text-[#03349a] font-semibold hover:underline">View All →</button>
              </div>
              <div className="space-y-3">
                {mockOrders.slice(0, 2).map(order => {
                  const s = statusConfig[order.status];
                  return (
                    <div key={order.id} className="flex items-center justify-between p-4 rounded-xl border border-gray-100 hover:border-red-100 hover:bg-[#faf7f2] transition-all">
                      <div className="flex items-center gap-4">
                        <div className="w-10 h-10 rounded-xl bg-[#03349a]/5 flex items-center justify-center">
                          <svg viewBox="0 0 24 24" fill="none" stroke="#03349a" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" className="w-4 h-4">
                            <path d="M6 2L3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4z" /><line x1="3" y1="6" x2="21" y2="6" /><path d="M16 10a4 4 0 0 1-8 0" />
                          </svg>
                        </div>
                        <div>
                          <p className="font-semibold text-gray-800 text-sm">Order #{order.id}</p>
                          <p className="text-gray-400 text-xs">{order.date} · {order.items} items</p>
                        </div>
                      </div>
                      <div className="flex items-center gap-4">
                        <span className={`flex items-center gap-1.5 text-xs font-semibold px-3 py-1 rounded-full border ${s.color} ${s.bg} ${s.border}`}>
                          <span className={`w-1.5 h-1.5 rounded-full ${s.dot}`} />
                          {order.status}
                        </span>
                        <p className="font-bold text-gray-800 text-sm">${order.total.toFixed(2)}</p>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        )}

        {/* ── ORDERS TAB ── */}
        {activeTab === "Orders" && (
          <div className="fade-up bg-white rounded-2xl shadow-sm border border-red-50 p-8">
            <h3 className="text-lg font-bold text-[#03349a] mb-6">Order History</h3>
            <div className="space-y-4">
              {mockOrders.map(order => {
                const s = statusConfig[order.status];
                return (
                  <div key={order.id} className="flex flex-col sm:flex-row sm:items-center justify-between p-5 rounded-2xl border border-gray-100 hover:border-red-100 hover:shadow-md transition-all gap-4">
                    <div className="flex items-center gap-4">
                      <div className="w-12 h-12 rounded-xl flex items-center justify-center shrink-0" style={{ background: "linear-gradient(135deg,#03349a15,#03349a05)" }}>
                        <svg viewBox="0 0 24 24" fill="none" stroke="#03349a" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" className="w-5 h-5">
                          <path d="M6 2L3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4z" /><line x1="3" y1="6" x2="21" y2="6" /><path d="M16 10a4 4 0 0 1-8 0" />
                        </svg>
                      </div>
                      <div>
                        <p className="font-bold text-gray-900">Order #{order.id}</p>
                        <p className="text-gray-400 text-xs mt-0.5">{order.date} · {order.items} item{order.items > 1 ? "s" : ""}</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-4 sm:gap-6">
                      <span className={`flex items-center gap-1.5 text-xs font-semibold px-3 py-1.5 rounded-full border ${s.color} ${s.bg} ${s.border}`}>
                        <span className={`w-1.5 h-1.5 rounded-full ${s.dot}`} />
                        {order.status}
                      </span>
                      <p className="font-black text-lg text-gray-900">${order.total.toFixed(2)}</p>
                      <button className="text-xs font-semibold text-[#03349a] border border-[#03349a]/20 px-3 py-1.5 rounded-lg hover:bg-[#03349a]/5 transition-all" onClick={()=>navigate('/trackorder')}>
                        Details
                      </button>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        )}

        {/* ── WISHLIST TAB ── */}
        {activeTab === "Wishlist" && (
          <div className="fade-up">
            {wishlist.length === 0 ? (
              <div className="bg-white rounded-2xl shadow-sm border border-red-50 p-16 text-center">
                <div className="w-16 h-16 rounded-2xl bg-red-50 flex items-center justify-center mx-auto mb-4">
                  <svg viewBox="0 0 24 24" fill="none" stroke="#03349a" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" className="w-7 h-7">
                    <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" />
                  </svg>
                </div>
                <h3 className="text-lg font-bold text-gray-800 mb-2">Your wishlist is empty</h3>
                <p className="text-gray-400 text-sm">Start adding items you love!</p>
              </div>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {wishlist.map((item, i) => (
                  <div key={item.id} className="bg-white rounded-2xl shadow-sm border border-red-50 overflow-hidden group hover:shadow-lg transition-all duration-300 fade-up"
                    style={{ animationDelay: `${i * 0.08}s` }}>
                    <div className="relative overflow-hidden h-52">
                      <img src={item.image} alt={item.name} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent" />
                      <button onClick={() => removeWishlist(item.id)}
                        className="absolute top-3 right-3 w-8 h-8 rounded-full bg-white shadow-md flex items-center justify-center text-red-500 hover:text-red-600 hover:scale-110 transition-all">
                        <svg viewBox="0 0 24 24" fill="currentColor" className="w-4 h-4">
                          <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" />
                        </svg>
                      </button>
                    </div>
                    <div className="p-5">
                      <h4 className="font-bold text-gray-900 mb-1">{item.name}</h4>
                      <div className="flex items-center gap-2 mb-4">
                        <span className="text-lg font-black text-[#03349a]">${item.price.toFixed(2)}</span>
                        <span className="text-sm text-gray-400 line-through">${item.originalPrice.toFixed(2)}</span>
                        <span className="text-xs font-semibold text-emerald-600 bg-emerald-50 px-2 py-0.5 rounded-full">
                          {Math.round((1 - item.price / item.originalPrice) * 100)}% off
                        </span>
                      </div>
                      <button className="w-full py-2.5 rounded-xl text-white text-sm font-semibold tracking-wide transition-all hover:opacity-90 active:scale-[0.98]"
                        style={{ background: "linear-gradient(135deg, #03349a, #a81010)", boxShadow: "0 4px 12px rgba(130,12,12,0.2)" }}>
                        Add to Cart
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}

        {/* ── ADDRESSES TAB ── */}
        {activeTab === "Addresses" && (
          <div className="fade-up space-y-4">
            {user.addresses.map((addr, i) => (
              <div key={addr.id} className="bg-white rounded-2xl shadow-sm border border-red-50 p-6 flex flex-col sm:flex-row sm:items-center justify-between gap-4 hover:shadow-md transition-all">
                <div className="flex items-start gap-4">
                  <div className="w-11 h-11 rounded-xl flex items-center justify-center shrink-0" style={{ background: "linear-gradient(135deg,#03349a,#a81010)" }}>
                    <svg viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" className="w-5 h-5">
                      <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" /><circle cx="12" cy="10" r="3" />
                    </svg>
                  </div>
                  <div>
                    <div className="flex items-center gap-2 mb-0.5">
                      <p className="font-bold text-gray-900">{addr.label}</p>
                      {addr.default && (
                        <span className="text-[10px] tracking-widest uppercase font-semibold text-[#03349a] bg-[#03349a]/8 px-2 py-0.5 rounded-full border border-[#03349a]/15">Default</span>
                      )}
                    </div>
                    <p className="text-gray-500 text-sm">{addr.details}</p>
                  </div>
                </div>
                <div className="flex items-center gap-3 shrink-0">
                  <button className="text-sm font-semibold text-[#03349a] border border-[#03349a]/20 px-4 py-2 rounded-xl hover:bg-[#03349a]/5 transition-all">Edit</button>
                  <button className="text-sm font-semibold text-gray-400 border border-gray-200 px-4 py-2 rounded-xl hover:bg-gray-50 transition-all">Remove</button>
                </div>
              </div>
            ))}

            {/* Add new address */}
            <button className="w-full p-5 rounded-2xl border-2 border-dashed border-[#03349a]/20 text-[#03349a]/60 font-semibold text-sm hover:border-[#03349a]/40 hover:text-[#03349a] hover:bg-[#03349a]/5 transition-all flex items-center justify-center gap-2">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-4 h-4">
                <line x1="12" y1="5" x2="12" y2="19" /><line x1="5" y1="12" x2="19" y2="12" />
              </svg>
              Add New Address
            </button>
          </div>
        )}

      </div>
    
    </div>
  );
}