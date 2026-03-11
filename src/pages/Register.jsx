import React, { useState } from "react";
import { useMutation } from "@tanstack/react-query";
import { registerUser } from "../config/authApi";

export default function Register() {
  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
    agree: false,
  });
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);

  const mutation = useMutation({
    mutationFn: registerUser,
    onSuccess: (data) => {
      console.log("Registration successful:", data);
      alert("Account created successfully! Please login.");
    },
    onError: (error) => {
      console.error("Registration failed:", error.response?.data?.message || error.message);
      alert(error.response?.data?.message || "Registration failed");
    },
  });

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setForm({ ...form, [name]: type === "checkbox" ? checked : value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (form.password !== form.confirmPassword) {
      alert("Passwords do not match!");
      return;
    }
    if (!form.agree) {
      alert("You must agree to the terms!");
      return;
    }
    mutation.mutate({ name: form.name, email: form.email, password: form.password });
    setForm({ name: "", email: "", password: "", confirmPassword: "", agree: false });
  };

  const EyeIcon = ({ open }) => (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" className="w-4 h-4">
      {open ? (
        <>
          <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" />
          <circle cx="12" cy="12" r="3" />
        </>
      ) : (
        <>
          <path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94" />
          <path d="M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19" />
          <line x1="1" y1="1" x2="23" y2="23" />
        </>
      )}
    </svg>
  );

  return (
    <div className="min-h-screen flex" style={{ fontFamily: "'Inter', sans-serif" }}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700&display=swap');
        @keyframes fadeUp { from { opacity:0; transform:translateY(24px); } to { opacity:1; transform:translateY(0); } }
        .fade-up { animation: fadeUp 0.55s ease both; }
        .inp:focus { outline: none; border-color: #820c0c; box-shadow: 0 0 0 3px rgba(130,12,12,0.10); }
        .inp::placeholder { color: #b0a0a0; }
      `}</style>

      {/* ── LEFT DECORATIVE PANEL (hidden on mobile) ── */}
      <div
        className="hidden lg:flex lg:w-[45%] relative flex-col justify-between px-14 py-16 overflow-hidden"
        style={{ background: "linear-gradient(155deg, #820c0c 0%, #5a0808 55%, #3a0404 100%)" }}
      >
        {/* Blobs */}
        <div className="absolute -top-20 -right-20 w-72 h-72 rounded-full bg-white opacity-[0.04]" />
        <div className="absolute bottom-10 -left-16 w-64 h-64 rounded-full bg-amber-400 opacity-[0.07]" />
        <div className="absolute inset-0" style={{ backgroundImage: "repeating-linear-gradient(45deg,transparent,transparent 28px,rgba(255,255,255,0.012) 28px,rgba(255,255,255,0.012) 29px)" }} />

        {/* Logo */}
       <div className="relative z-10 float-left">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-2xl bg-white/15 flex items-center justify-center backdrop-blur-sm border border-white/20">
                <span className="text-white font-black text-lg">W</span>
              </div>
              <span className="text-white font-bold text-xl tracking-tight">
                Aayubakwath
              </span>
            </div>
          </div>

        {/* Middle content */}
        <div className="relative z-10">
          <div className="flex items-center gap-2 mb-6">
            <div className="w-6 h-px bg-[#aab820] opacity-70" />
            <span className="text-[10px] tracking-[4px] uppercase text-[#aab820] font-semibold">Welcome</span>
          </div>
          <h2 className="text-4xl font-black text-white leading-tight mb-4">
            Join Us<br />
            <em className="not-italic text-[#aab820] font-light italic">Today</em>
          </h2>
          <p className="text-white/55 text-sm leading-relaxed max-w-xs">
            Create your account and unlock access to everything we have to offer.
          </p>

          {/* Feature list */}
          <div className="mt-10 space-y-4">
            {["Secure & encrypted account", "24/7 customer support", "Access to all features"].map((item, i) => (
              <div key={i} className="flex items-center gap-3">
                <div className="w-5 h-5 rounded-full flex items-center justify-center shrink-0" style={{ background: "rgba(170,184,32,0.2)", border: "1px solid rgba(170,184,32,0.4)" }}>
                  <svg viewBox="0 0 24 24" fill="none" stroke="#aab820" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className="w-3 h-3">
                    <polyline points="20 6 9 17 4 12" />
                  </svg>
                </div>
                <span className="text-white/70 text-sm">{item}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Bottom */}
        <div className="relative z-10 pt-8 border-t border-white/10">
          <p className="text-white/30 text-xs">Already registered?</p>
          <a href="login" className="text-[#aab820] text-sm font-semibold hover:underline">Sign in to your account →</a>
        </div>
      </div>

      {/* ── RIGHT FORM PANEL ── */}
      <div className="flex-1 bg-[#fefbf6] flex items-center justify-center px-6 py-16">
        <div className="w-full max-w-md fade-up">

          {/* Mobile logo */}
          <div className="flex lg:hidden items-center gap-2 mb-8 justify-center">
            <div className="w-8 h-8 rounded-lg bg-[#820c0c] flex items-center justify-center">
              <svg viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-4 h-4">
                <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5" />
              </svg>
            </div>
            <span className="text-[#820c0c] font-bold text-lg">SBLS</span>
          </div>

          <div className="mb-8">
            <h1 className="text-3xl font-bold text-[#820c0c] mb-1">Create Account</h1>
            <p className="text-gray-400 text-sm">Fill in your details to get started.</p>
          </div>

          <div className="bg-white rounded-2xl shadow-lg border border-red-50 p-8">
            <form onSubmit={handleSubmit} className="space-y-5">

              {/* Full Name */}
              <div>
                <label className="block text-xs font-semibold tracking-widest uppercase text-[#820c0c]/70 mb-2">Full Name</label>
                <div className="relative">
                  <span className="absolute left-3.5 top-1/2 -translate-y-1/2 text-[#820c0c]/40">
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" className="w-4 h-4">
                      <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" /><circle cx="12" cy="7" r="4" />
                    </svg>
                  </span>
                  <input
                    type="text" name="name" value={form.name} onChange={handleChange} required
                    placeholder="Your full name"
                    className="inp w-full pl-10 pr-4 py-3 rounded-xl border border-gray-200 bg-[#fefbf6] text-gray-800 text-sm transition-all"
                  />
                </div>
              </div>

              {/* Email */}
              <div>
                <label className="block text-xs font-semibold tracking-widest uppercase text-[#820c0c]/70 mb-2">Email Address</label>
                <div className="relative">
                  <span className="absolute left-3.5 top-1/2 -translate-y-1/2 text-[#820c0c]/40">
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" className="w-4 h-4">
                      <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" /><polyline points="22,6 12,13 2,6" />
                    </svg>
                  </span>
                  <input
                    type="email" name="email" value={form.email} onChange={handleChange} required
                    placeholder="you@example.com"
                    className="inp w-full pl-10 pr-4 py-3 rounded-xl border border-gray-200 bg-[#fefbf6] text-gray-800 text-sm transition-all"
                  />
                </div>
              </div>

              {/* Password */}
              <div>
                <label className="block text-xs font-semibold tracking-widest uppercase text-[#820c0c]/70 mb-2">Password</label>
                <div className="relative">
                  <span className="absolute left-3.5 top-1/2 -translate-y-1/2 text-[#820c0c]/40">
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" className="w-4 h-4">
                      <rect x="3" y="11" width="18" height="11" rx="2" ry="2" /><path d="M7 11V7a5 5 0 0 1 10 0v4" />
                    </svg>
                  </span>
                  <input
                    type={showPassword ? "text" : "password"} name="password" value={form.password} onChange={handleChange} required
                    placeholder="Create a password"
                    className="inp w-full pl-10 pr-10 py-3 rounded-xl border border-gray-200 bg-[#fefbf6] text-gray-800 text-sm transition-all"
                  />
                  <button type="button" onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3.5 top-1/2 -translate-y-1/2 text-[#820c0c]/40 hover:text-[#820c0c]/70 transition-colors">
                    <EyeIcon open={showPassword} />
                  </button>
                </div>
              </div>

              {/* Confirm Password */}
              <div>
                <label className="block text-xs font-semibold tracking-widest uppercase text-[#820c0c]/70 mb-2">Confirm Password</label>
                <div className="relative">
                  <span className="absolute left-3.5 top-1/2 -translate-y-1/2 text-[#820c0c]/40">
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" className="w-4 h-4">
                      <rect x="3" y="11" width="18" height="11" rx="2" ry="2" /><path d="M7 11V7a5 5 0 0 1 10 0v4" />
                    </svg>
                  </span>
                  <input
                    type={showConfirm ? "text" : "password"} name="confirmPassword" value={form.confirmPassword} onChange={handleChange} required
                    placeholder="Repeat your password"
                    className="inp w-full pl-10 pr-10 py-3 rounded-xl border border-gray-200 bg-[#fefbf6] text-gray-800 text-sm transition-all"
                  />
                  <button type="button" onClick={() => setShowConfirm(!showConfirm)}
                    className="absolute right-3.5 top-1/2 -translate-y-1/2 text-[#820c0c]/40 hover:text-[#820c0c]/70 transition-colors">
                    <EyeIcon open={showConfirm} />
                  </button>
                </div>
                {/* Password match indicator */}
                {form.confirmPassword && (
                  <p className={`text-xs mt-1.5 font-medium ${form.password === form.confirmPassword ? "text-green-600" : "text-red-500"}`}>
                    {form.password === form.confirmPassword ? "✓ Passwords match" : "✗ Passwords do not match"}
                  </p>
                )}
              </div>

              {/* Terms */}
              <div className="flex items-start gap-3 pt-1">
                <div className="relative mt-0.5">
                  <input
                    type="checkbox" name="agree" checked={form.agree} onChange={handleChange}
                    className="sr-only"
                    id="agree"
                  />
                  <label htmlFor="agree"
                    className="w-5 h-5 rounded-md border-2 flex items-center justify-center cursor-pointer transition-all"
                    style={{ borderColor: form.agree ? "#820c0c" : "#d1d5db", background: form.agree ? "#820c0c" : "white" }}>
                    {form.agree && (
                      <svg viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" className="w-3 h-3">
                        <polyline points="20 6 9 17 4 12" />
                      </svg>
                    )}
                  </label>
                </div>
                <label htmlFor="agree" className="text-sm text-gray-500 cursor-pointer leading-relaxed">
                  I agree to the{" "}
                  <a href="#" className="text-[#820c0c] hover:underline font-medium">Terms & Conditions</a>
                  {" "}and{" "}
                  <a href="#" className="text-[#820c0c] hover:underline font-medium">Privacy Policy</a>
                </label>
              </div>

              {/* Submit */}
              <button
                type="submit"
                disabled={mutation.isLoading}
                className="w-full py-3.5 rounded-xl text-white text-sm font-semibold tracking-wide transition-all hover:opacity-90 active:scale-[0.98] disabled:opacity-60 disabled:cursor-not-allowed mt-2"
                style={{ background: "linear-gradient(135deg, #820c0c 0%, #a81010 100%)", boxShadow: "0 8px 24px rgba(130,12,12,0.25)" }}
              >
                {mutation.isLoading ? (
                  <span className="flex items-center justify-center gap-2">
                    <svg className="animate-spin w-4 h-4" viewBox="0 0 24 24" fill="none">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="white" strokeWidth="4" />
                      <path className="opacity-75" fill="white" d="M4 12a8 8 0 018-8v8z" />
                    </svg>
                    Creating Account...
                  </span>
                ) : "Create Account →"}
              </button>
              
            </form>
            {/* Login link (mobile) */}
          <p className="mt-6 text-center text-sm text-gray-400 ">
            Already have an account?{" "}
            <a href="login" className="text-[#820c0c] font-semibold hover:underline">Sign In</a>
          </p>
          </div>

          
        </div>
      </div>
    </div>
  );
}