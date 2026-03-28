import React, { useState } from "react";
import { useMutation } from "@tanstack/react-query";
import { loginUser } from "../config/authApi";

export default function Login() {
  const [form, setForm] = useState({ email: "", password: "", remember: false });
  const [showPassword, setShowPassword] = useState(false);
  const [focused, setFocused] = useState("");

  const mutation = useMutation({
    mutationFn: loginUser,
    onSuccess: (data) => {
      console.log("Login successful:", data);
      alert("Logged in successfully!");
    },
    onError: (error) => {
      alert(error.response?.data?.message || "Login failed");
    },
  });

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setForm({ ...form, [name]: type === "checkbox" ? checked : value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    mutation.mutate({ email: form.email, password: form.password });
  };

  const Eye = ({ open }) => (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" className="w-4 h-4">
      {open ? (
        <><path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" /><circle cx="12" cy="12" r="3" /></>
      ) : (
        <><path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94" /><path d="M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19" /><line x1="1" y1="1" x2="23" y2="23" /></>
      )}
    </svg>
  );

  const stats = [
    { value: "10K+", label: "Active Users" },
    { value: "99.9%", label: "Uptime" },
    { value: "24/7", label: "Support" },
  ];

  const testimonial = {
    text: "Aayubakwath transformed the way we manage everything. Clean, fast, and reliable.",
    author: "Sarah M.",
    role: "Product Manager",
  };

  return (
    <div className="min-h-screen bg-[#fff] flex items-center justify-center p-4 lg:p-8" >
      <style>{`
        @keyframes slideUp { from { opacity:0; transform:translateY(28px); } to { opacity:1; transform:translateY(0); } }
        .slide-up { animation: slideUp 0.55s cubic-bezier(0.16,1,0.3,1) both; }
        .inp-field { transition: border-color 0.2s, box-shadow 0.2s; }
        .inp-field:focus { outline: none; border-color: #820c0c; box-shadow: 0 0 0 3px rgba(130,12,12,0.10); }
        .inp-field::placeholder { color: #d1bfbf; }
        .submit-btn { transition: transform 0.15s, box-shadow 0.15s; }
        .submit-btn:hover:not(:disabled) { transform: translateY(-1px); box-shadow: 0 14px 36px rgba(130,12,12,0.32) !important; }
        .submit-btn:active:not(:disabled) { transform: translateY(0); }
      `}</style>

      {/* ── Outer Card ── */}
      <div
        className="slide-up w-full max-w-5xl rounded-3xl overflow-hidden"
        style={{ boxShadow: "0 32px 80px rgba(130,12,12,0.18), 0 8px 24px rgba(0,0,0,0.08)" }}
      >
        <div className="flex flex-col lg:flex-row">

          {/* ════ LEFT PANEL ════ */}
          <div
            className="lg:w-[42%] relative flex flex-col justify-between px-10 py-12 overflow-hidden"
            style={{ background: "linear-gradient(155deg, #820c0c 0%, #5a0808 55%, #3a0404 100%)" }}
          >
            {/* Background blobs */}
            <div className="absolute -top-20 -right-20 w-72 h-72 rounded-full" style={{ background: "rgba(255,255,255,0.04)" }} />
            <div className="absolute -bottom-24 -left-12 w-80 h-80 rounded-full" style={{ background: "rgba(170,184,32,0.06)" }} />
            <div className="absolute inset-0" style={{ backgroundImage: "repeating-linear-gradient(45deg,transparent,transparent 28px,rgba(255,255,255,0.012) 28px,rgba(255,255,255,0.012) 29px)" }} />

            {/* Logo */}
            <div className="relative z-10">
              <div className="flex items-center gap-3">
                <div
                  className="w-10 h-10 rounded-2xl flex items-center justify-center"
                  style={{ background: "rgba(255,255,255,0.15)", border: "1px solid rgba(255,255,255,0.2)" }}
                >
                  <span className="text-white font-black text-lg">W</span>
                </div>
                <span className="text-white font-bold text-xl tracking-tight">Aayubakwath</span>
              </div>
            </div>

            {/* Hero content */}
            <div className="relative z-10">
              <div className="flex items-center gap-2 mb-5">
                <div className="h-px w-6 bg-[#aab820]" />
                <span className="text-[10px] font-bold tracking-[4px] uppercase text-[#aab820]">Welcome Back</span>
              </div>
              <h2 className="text-4xl font-black text-white leading-snug mb-4">
                Good to See<br />
                <em className="not-italic text-[#aab820]  font-semibold">You Again</em>
              </h2>
              <p className="text-white text-sm leading-relaxed max-w-xs mb-10">
                Sign in to your account and pick up right where you left off. Everything's waiting for you.
              </p>

              {/* Stats row */}
              <div className="grid grid-cols-3 gap-3 mb-8">
                {stats.map((s, i) => (
                  <div
                    key={i}
                    className="rounded-2xl p-4 text-center"
                    style={{ background: "rgba(255,255,255,0.07)", border: "1px solid rgba(255,255,255,0.08)" }}
                  >
                    <p className="text-[#aab820] font-black text-lg leading-none mb-1">{s.value}</p>
                    <p className="text-white text-[10px] font-semibold uppercase tracking-wider">{s.label}</p>
                  </div>
                ))}
              </div>

              {/* Testimonial card */}
              <div
                className="rounded-2xl p-5"
                style={{ background: "rgba(255,255,255,0.07)", border: "1px solid rgba(255,255,255,0.08)" }}
              >
                {/* Quote mark */}
                <div className="text-[#aab820] text-3xl font-black leading-none ">"</div>
                <p className="text-white text-md leading-relaxed mb-4">{testimonial.text}</p>
                
              </div>
            </div>

            {/* Bottom link */}
            <div className="relative z-10 pt-8 border-t border-white/10">
              <p className="text-white/35 text-xs mb-1">Don't have an account?</p>
              <a href="register" className="text-[#aab820] text-sm font-extrabold hover:underline">
                Create one now →
              </a>
            </div>
          </div>

          {/* ════ RIGHT FORM PANEL ════ */}
          <div className="flex-1 bg-[#fefbf6] flex flex-col justify-center px-8 lg:px-12 py-12">

            {/* Mobile logo */}
            <div className="flex lg:hidden items-center gap-2 mb-8">
              <div className="w-8 h-8 rounded-lg bg-[#820c0c] flex items-center justify-center">
                <span className="text-white font-black text-sm">W</span>
              </div>
              <span className="text-[#820c0c] font-bold text-lg">Aayubakwath</span>
            </div>

            {/* Heading */}
            <div className="mb-8">
              <div className="flex items-center gap-2 mb-3">
                <div className="h-[3px] w-5 rounded-full bg-[#820c0c]" />
                <span className="text-[16px] font-extrabold tracking-[3px] uppercase text-[#820c0c]/55">Sign In</span>
              </div>
              <h1 className="text-2xl font-black text-[#820c0c] mb-1.5">
                Welcome Back
              </h1>
              <p className="text-gray-600 text-md  font-black">Enter your credentials to access your account.</p>
            </div>

            {/* Form */}
            <form onSubmit={handleSubmit} className="space-y-5">

              {/* Email */}
              <div>
                <label className="block text-[15px] font-extrabold tracking-widest uppercase text-[#820c0c] mb-1.5">
                  Email Address
                </label>
                <div className="relative">
                  <span className="absolute left-3.5 top-1/2 -translate-y-1/2" style={{ color: focused === "email" ? "#820c0c" : "#d1bfbf" }}>
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" className="w-4 h-4">
                      <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" /><polyline points="22,6 12,13 2,6" />
                    </svg>
                  </span>
                  <input
                    type="email" name="email" value={form.email} onChange={handleChange} required
                    placeholder="you@example.com"
                    onFocus={() => setFocused("email")} onBlur={() => setFocused("")}
                    className="inp-field w-full pl-10 pr-4 py-3 rounded-xl border border-gray-200 bg-[#fefbf6] text-sm text-gray-800"
                  />
                </div>
              </div>

              {/* Password */}
              <div>
                <div className="flex items-center justify-between mb-1.5">
                  <label className="block text-[15px] font-extrabold tracking-widest uppercase text-[#820c0c]">
                    Password
                  </label>
                  <a href="forgot-password" className="text-md text-[#820c0c] font-bold hover:underline">
                    Forgot password?
                  </a>
                </div>
                <div className="relative">
                  <span className="absolute left-3.5 top-1/2 -translate-y-1/2" style={{ color: focused === "password" ? "#820c0c" : "#d1bfbf" }}>
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" className="w-4 h-4">
                      <rect x="3" y="11" width="18" height="11" rx="2" ry="2" /><path d="M7 11V7a5 5 0 0 1 10 0v4" />
                    </svg>
                  </span>
                  <input
                    type={showPassword ? "text" : "password"} name="password" value={form.password} onChange={handleChange} required
                    placeholder="Enter your password"
                    onFocus={() => setFocused("password")} onBlur={() => setFocused("")}
                    className="inp-field w-full pl-10 pr-10 py-3 rounded-xl border border-gray-200 bg-[#fefbf6] text-sm text-gray-800"
                  />
                  <button type="button" onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3.5 top-1/2 -translate-y-1/2 transition-colors"
                    style={{ color: "#c8b4b4" }}>
                    <Eye open={showPassword} />
                  </button>
                </div>
              </div>

              {/* Remember me */}
              <div className="flex items-center gap-3">
                <div className="relative shrink-0">
                  <input type="checkbox" name="remember" id="remember" checked={form.remember} onChange={handleChange} className="sr-only" />
                  <label
                    htmlFor="remember"
                    className="w-5 h-5 rounded-md flex items-center justify-center cursor-pointer transition-all duration-200"
                    style={{
                      background: form.remember ? "#820c0c" : "white",
                      border: `2px solid ${form.remember ? "#820c0c" : "#e5e7eb"}`,
                    }}
                  >
                    {form.remember && (
                      <svg viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="3.5" strokeLinecap="round" strokeLinejoin="round" className="w-3 h-3">
                        <polyline points="20 6 9 17 4 12" />
                      </svg>
                    )}
                  </label>
                </div>
                <label htmlFor="remember" className="text-md text-gray-600 cursor-pointer select-none">
                  Keep me signed in
                </label>
              </div>

              {/* Submit */}
              <button
                type="submit"
                disabled={mutation.isLoading}
                className="submit-btn w-full py-3.5 rounded-xl text-white text-sm font-extrabold tracking-wide disabled:opacity-60 disabled:cursor-not-allowed"
                style={{
                  background: "linear-gradient(135deg, #820c0c 0%, #a81010 100%)",
                  boxShadow: "0 8px 24px rgba(130,12,12,0.25)",
                }}
              >
                {mutation.isLoading ? (
                  <span className="flex items-center justify-center gap-2">
                    <svg className="animate-spin w-4 h-4" viewBox="0 0 24 24" fill="none">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="white" strokeWidth="4" />
                      <path className="opacity-75" fill="white" d="M4 12a8 8 0 018-8v8z" />
                    </svg>
                    Signing In...
                  </span>
                ) : "Sign In →"}
              </button>

            </form>

            {/* Divider */}
            <div className="mt-7 flex items-center gap-3">
              <div className="flex-1 h-px bg-gray-100" />
              <span className="text-xs text-gray-300 font-semibold">or</span>
              <div className="flex-1 h-px bg-gray-100" />
            </div>

            {/* Register link */}
            <p className="mt-5 text-center text-sm font-semibold text-gray-600">
              Don't have an account?{" "}
              <a href="register" className="text-[#820c0c] font-extrabold hover:underline">Create Account</a>
            </p>

            {/* Security note */}
            <div className="mt-5 flex items-center justify-center gap-1.5 text-gray-300 text-xs">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" className="w-3.5 h-3.5">
                <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
              </svg>
              <span>256-bit SSL · Secured & Encrypted</span>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
}