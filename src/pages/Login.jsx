// src/pages/LoginPage.jsx
import React, { useState } from "react";
import { useMutation } from "@tanstack/react-query";
import { loginUser } from "../config/authApi";

const BRAND = "#820c0c";
const ACCENT = "#c9643a";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [remember, setRemember] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [focusedField, setFocusedField] = useState(null);

  const mutation = useMutation({
    mutationFn: loginUser,
    onSuccess: (data) => {
      console.log("Login successful:", data);
      localStorage.setItem("token", data?.token);
    },
    onError: (error) => {
      console.error("Login failed:", error.response?.data?.message || error.message);
    },
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    mutation.mutate({ email, password });
    setEmail("");
    setPassword("");
    setRemember(false);
  };

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Libre+Baskerville:wght@400;700&family=DM+Sans:wght@400;500;600;700;800&display=swap');
       
        @keyframes fadeUp {
          from { opacity: 0; transform: translateY(24px); }
          to   { opacity: 1; transform: translateY(0); }
        }
        @keyframes floatLeft {
          from { opacity: 0; transform: translateX(-30px); }
          to   { opacity: 1; transform: translateX(0); }
        }
        @keyframes spin-slow { to { transform: rotate(360deg); } }
        .fade-up  { animation: fadeUp .55s cubic-bezier(.22,.68,0,1.1) both; }
        .float-left { animation: floatLeft .6s ease both; }
        .delay-1  { animation-delay: .08s; }
        .delay-2  { animation-delay: .15s; }
        .delay-3  { animation-delay: .22s; }
        .delay-4  { animation-delay: .30s; }
        .delay-5  { animation-delay: .38s; }
        .spin-slow { animation: spin-slow 18s linear infinite; }
      `}</style>

      <div className="min-h-screen flex" style={{ background: "#fdf6f3" }}>

        {/* ── Left Panel (decorative, hidden on mobile) ── */}
        <div className="hidden lg:flex lg:w-[52%] relative overflow-hidden flex-col justify-between p-12"
          style={{ background: `linear-gradient(145deg, #3d0404 0%, ${BRAND} 55%, ${ACCENT} 100%)` }}>

          {/* Decorative circles */}
          <div className="absolute -top-24 -left-24 w-80 h-80 rounded-full border border-white/10 spin-slow" />
          <div className="absolute top-20 -left-10 w-48 h-48 rounded-full border border-white/10" />
          <div className="absolute -bottom-20 -right-20 w-96 h-96 rounded-full bg-white/5" />
          <div className="absolute bottom-40 right-10 w-32 h-32 rounded-full bg-white/5" />
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[480px] h-[480px] rounded-full border border-white/5" />

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

          {/* Center content */}
          <div className="relative z-10 float-left delay-1">
            <p className="text-xs font-bold tracking-[.18em] text-red-200 uppercase mb-4">Your Health Journey</p>
            <h1 className="text-4xl xl:text-5xl font-bold text-white leading-tight mb-6"
              >
              Welcome<br />Back to<br />
              <span className="text-orange-300">Aayubakwath.</span>
            </h1>
            <p className="text-red-200 text-sm leading-relaxed max-w-xs">
              Access your personalized wellness dashboard, track your orders, and manage your health supplements all in one place.
            </p>
          </div>

          {/* Bottom trust badges */}
          <div className="relative z-10 flex items-center gap-6 float-left delay-2">
            {[
              { icon: "🔒", label: "Secure Login" },
              { icon: "✅", label: "100% Genuine" },
              { icon: "🚚", label: "Fast Delivery" },
            ].map((b) => (
              <div key={b.label} className="flex items-center gap-2">
                <span className="text-base">{b.icon}</span>
                <span className="text-xs font-semibold text-red-200">{b.label}</span>
              </div>
            ))}
          </div>
        </div>

        {/* ── Right Panel: Form ── */}
        <div className="flex-1 flex items-center justify-center px-5 py-12 sm:px-10">
          <div className="w-full max-w-md">

            {/* Mobile logo */}
            <div className="flex lg:hidden items-center gap-2 mb-8 fade-up">
              <div className="w-9 h-9 rounded-xl flex items-center justify-center text-white font-black shadow-lg"
                style={{ background: BRAND }}>W</div>
              <span className="font-bold text-gray-900 text-lg" >Wellness</span>
            </div>

            {/* Heading */}
            <div className="mb-8 fade-up delay-1">
              <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-1.5"
                >
                Sign in to your account
              </h2>
              <p className="text-sm text-gray-400">
                Don't have one?{" "}
                <a href="register" className="font-bold transition hover:opacity-80" style={{ color: BRAND }}>
                  Create account →
                </a>
              </p>
            </div>

            {/* Error Banner */}
            {mutation.isError && (
              <div className="mb-5 flex items-start gap-3 bg-red-50 border border-red-200 rounded-xl px-4 py-3 fade-up">
                <svg className="w-4 h-4 mt-0.5 shrink-0 text-red-500" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2.5}>
                  <circle cx="12" cy="12" r="10"/><line x1="12" y1="8" x2="12" y2="12"/><line x1="12" y1="16" x2="12.01" y2="16"/>
                </svg>
                <p className="text-xs font-semibold text-red-600">
                  {mutation.error?.response?.data?.message || "Login failed. Please check your credentials."}
                </p>
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-5">

              {/* Email */}
              <div className="fade-up delay-2">
                <label htmlFor="email" className="block text-xs font-bold text-gray-600 uppercase tracking-widest mb-2">
                  Email Address
                </label>
                <div className={`relative flex items-center rounded-xl border-2 transition-all duration-200 bg-white
                  ${focusedField === "email" ? "shadow-lg" : "border-gray-200 shadow-sm"}`}
                  style={focusedField === "email" ? { borderColor: BRAND, boxShadow: `0 0 0 3px rgba(130,12,12,.1)` } : {}}>
                  <svg className="absolute left-4 w-4 h-4 text-gray-400 shrink-0" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}>
                    <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/><polyline points="22,6 12,13 2,6"/>
                  </svg>
                  <input
                    type="email" id="email" value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    onFocus={() => setFocusedField("email")}
                    onBlur={() => setFocusedField(null)}
                    required placeholder="you@example.com"
                    className="w-full pl-11 pr-4 py-3.5 bg-transparent rounded-xl text-sm text-gray-800 placeholder-gray-400 outline-none font-medium"
                  />
                </div>
              </div>

              {/* Password */}
              <div className="fade-up delay-3">
                <div className="flex items-center justify-between mb-2">
                  <label htmlFor="password" className="block text-xs font-bold text-gray-600 uppercase tracking-widest">
                    Password
                  </label>
                  <a href="#" className="text-xs font-semibold transition hover:opacity-70" style={{ color: BRAND }}>
                    Forgot password?
                  </a>
                </div>
                <div className={`relative flex items-center rounded-xl border-2 transition-all duration-200 bg-white
                  ${focusedField === "password" ? "shadow-lg" : "border-gray-200 shadow-sm"}`}
                  style={focusedField === "password" ? { borderColor: BRAND, boxShadow: `0 0 0 3px rgba(130,12,12,.1)` } : {}}>
                  <svg className="absolute left-4 w-4 h-4 text-gray-400 shrink-0" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}>
                    <rect x="3" y="11" width="18" height="11" rx="2" ry="2"/><path d="M7 11V7a5 5 0 0110 0v4"/>
                  </svg>
                  <input
                    type={showPassword ? "text" : "password"} id="password" value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    onFocus={() => setFocusedField("password")}
                    onBlur={() => setFocusedField(null)}
                    required placeholder="••••••••"
                    className="w-full pl-11 pr-12 py-3.5 bg-transparent rounded-xl text-sm text-gray-800 placeholder-gray-400 outline-none font-medium"
                  />
                  <button type="button" onClick={() => setShowPassword((v) => !v)}
                    className="absolute right-4 cursor-pointer border-none bg-transparent p-0 text-gray-400 hover:text-gray-700 transition">
                    {showPassword ? (
                      <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}>
                        <path d="M17.94 17.94A10.07 10.07 0 0112 20c-7 0-11-8-11-8a18.45 18.45 0 015.06-5.94"/><path d="M9.9 4.24A9.12 9.12 0 0112 4c7 0 11 8 11 8a18.5 18.5 0 01-2.16 3.19"/><line x1="1" y1="1" x2="23" y2="23"/>
                      </svg>
                    ) : (
                      <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}>
                        <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/><circle cx="12" cy="12" r="3"/>
                      </svg>
                    )}
                  </button>
                </div>
              </div>

              {/* Remember me */}
              <div className="fade-up delay-4 flex items-center justify-between">
                <label className="flex items-center gap-2.5 cursor-pointer select-none group">
                  <div className={`w-5 h-5 rounded-md border-2 flex items-center justify-center transition-all duration-200 shrink-0
                    ${remember ? "border-transparent" : "border-gray-300 bg-white group-hover:border-red-300"}`}
                    style={remember ? { background: BRAND } : {}}
                    onClick={() => setRemember(!remember)}>
                    {remember && (
                      <svg className="w-3 h-3 text-white" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={3}>
                        <polyline points="20 6 9 17 4 12"/>
                      </svg>
                    )}
                  </div>
                  <input type="checkbox" checked={remember} onChange={() => setRemember(!remember)} className="sr-only" />
                  <span className="text-sm font-medium text-gray-600">Remember me</span>
                </label>
              </div>

              {/* Submit */}
              <div className="fade-up delay-5 pt-1">
                <button
                  type="submit"
                  disabled={mutation.isPending}
                  className="w-full py-3.5 rounded-2xl text-white font-bold text-sm border-none cursor-pointer transition-all duration-300 hover:-translate-y-0.5 hover:shadow-xl disabled:opacity-60 disabled:cursor-not-allowed disabled:transform-none flex items-center justify-center gap-2 shadow-lg"
                  style={{ background: `linear-gradient(135deg, #3d0404, ${BRAND} 55%, ${ACCENT})` }}>
                  {mutation.isPending ? (
                    <>
                      <svg className="w-4 h-4 animate-spin" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2.5}>
                        <path d="M12 2v4M12 18v4M4.93 4.93l2.83 2.83M16.24 16.24l2.83 2.83M2 12h4M18 12h4M4.93 19.07l2.83-2.83M16.24 7.76l2.83-2.83"/>
                      </svg>
                      Signing in…
                    </>
                  ) : (
                    <>
                      Sign In
                      <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2.5}>
                        <path d="M5 12h14M12 5l7 7-7 7"/>
                      </svg>
                    </>
                  )}
                </button>
              </div>

              

            
            </form>

            {/* Footer */}
            <p className="mt-8 text-center text-xs text-gray-400 fade-up delay-5">
              By signing in, you agree to our{" "}
              <a href="#" className="font-semibold text-gray-600 hover:underline">Terms</a> &{" "}
              <a href="#" className="font-semibold text-gray-600 hover:underline">Privacy Policy</a>
            </p>
          </div>
        </div>
      </div>
    </>
  );
}