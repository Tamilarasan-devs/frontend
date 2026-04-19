import React, { useState } from "react";
import { useMutation ,QueryClient} from "@tanstack/react-query";
import { registerUser } from "../config/authApi";
import { toast } from "react-toastify";

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
  const [focused, setFocused] = useState("");

  const mutation = useMutation({
    mutationFn: registerUser,
    onSuccess: () => {
      toast.success("Account created successfully! Please login.");
    },
    onError: (error) => {
      toast.error(error.response?.data?.message || "Registration failed");
    },
  });

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setForm({ ...form, [name]: type === "checkbox" ? checked : value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (form.password !== form.confirmPassword) return toast.error("Passwords do not match!");
    if (!form.agree) return toast.warning("You must agree to the terms!");
    mutation.mutate({ name: form.name, email: form.email, password: form.password });
    setForm({ name: "", email: "", password: "", confirmPassword: "", agree: false });
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

  const UserIcon = () => (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" className="w-4 h-4">
      <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" /><circle cx="12" cy="7" r="4" />
    </svg>
  );

  const MailIcon = () => (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" className="w-4 h-4">
      <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" /><polyline points="22,6 12,13 2,6" />
    </svg>
  );

  const LockIcon = () => (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" className="w-4 h-4">
      <rect x="3" y="11" width="18" height="11" rx="2" ry="2" /><path d="M7 11V7a5 5 0 0 1 10 0v4" />
    </svg>
  );

  const features = [
    {
      icon: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" className="w-4 h-4"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" /></svg>,
      title: "Secure & Encrypted",
      desc: "256-bit SSL protection at all times.",
    },
    {
      icon: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" className="w-4 h-4"><path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" /></svg>,
      title: "24/7 Support",
      desc: "Always here when you need us.",
    },
    {
      icon: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" className="w-4 h-4"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" /></svg>,
      title: "Full Access",
      desc: "All features unlocked from day one.",
    },
  ];

  return (
    <div className="min-h-screen bg-[#fff] flex items-center justify-center p-4 lg:p-8" >
      <style>{`
        @keyframes slideUp { from { opacity:0; transform:translateY(28px); } to { opacity:1; transform:translateY(0); } }
        .slide-up { animation: slideUp 0.55s cubic-bezier(0.16,1,0.3,1) both; }
        .inp-field { transition: border-color 0.2s, box-shadow 0.2s; }
        .inp-field:focus { outline: none; border-color: #03349a; box-shadow: 0 0 0 3px rgba(130,12,12,0.1); }
        .inp-field::placeholder { color: #d1bfbf; }
        .submit-btn { transition: transform 0.15s, box-shadow 0.15s; }
        .submit-btn:hover:not(:disabled) { transform: translateY(-1px); box-shadow: 0 14px 36px rgba(130,12,12,0.32) !important; }
        .submit-btn:active:not(:disabled) { transform: translateY(0); }
        .feature-item { transition: background 0.2s; }
        .feature-item:hover { background: rgba(255,255,255,0.13); }
      `}</style>

      <div
        className="slide-up w-full max-w-5xl rounded-3xl overflow-hidden"
        style={{ boxShadow: "0 32px 80px rgba(130,12,12,0.18), 0 8px 24px rgba(0,0,0,0.08)" }}
      >
        <div className="flex flex-col lg:flex-row">
          <div
            className="lg:w-[42%] relative flex flex-col justify-between px-10 py-12 overflow-hidden"
            style={{ background: "linear-gradient(155deg, #03349a 0%, #5a0808 55%, #3a0404 100%)" }}
          >
            <div className="absolute -top-20 -right-20 w-72 h-72 rounded-full" style={{ background: "rgba(255,255,255,0.04)" }} />
            <div className="absolute -bottom-24 -left-12 w-80 h-80 rounded-full" style={{ background: "rgba(170,184,32,0.06)" }} />
            <div className="absolute inset-0" style={{ backgroundImage: "repeating-linear-gradient(45deg,transparent,transparent 28px,rgba(255,255,255,0.012) 28px,rgba(255,255,255,0.012) 29px)" }} />

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

            <div className="relative z-10">
              <div className="flex items-center gap-2 mb-5">
                <div className="h-px w-6 bg-[#aab820]" />
                <span className="text-[10px] font-bold tracking-[4px] uppercase text-[#aab820]">Welcome</span>
              </div>
              <h2 className="text-4xl font-black text-white leading-snug mb-4">
                Join Us<br />
                <em className="not-italic text-[#aab820] italic font-semibold">Today</em>
              </h2>
              <p className="text-white text-sm leading-relaxed max-w-xs mb-9">
                Create your account and unlock access to everything we have to offer. Fast, secure, and simple.
              </p>

              <div className="space-y-3">
                {features.map((f, i) => (
                  <div
                    key={i}
                    className="feature-item flex items-start gap-4 rounded-2xl p-4"
                    style={{ background: "rgba(255,255,255,0.07)", border: "1px solid rgba(255,255,255,0.08)" }}
                  >
                    <div
                      className="w-8 h-8 rounded-xl flex items-center justify-center shrink-0 text-[#aab820]"
                      style={{ background: "rgba(170,184,32,0.15)", border: "1px solid rgba(170,184,32,0.3)" }}
                    >
                      {f.icon}
                    </div>
                    <div>
                      <p className="text-white text-sm font-bold mb-0.5">{f.title}</p>
                      <p className="text-white text-xs leading-relaxed">{f.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="relative z-10 pt-8 border-t border-white/10">
              <p className="text-white text-xs mb-1">Already registered?</p>
              <a href="login" className="text-[#aab820] text-sm font-extrabold hover:underline">
                Sign in to your account →
              </a>
            </div>
          </div>

          <div className="flex-1 bg-[#fefbf6] flex flex-col justify-center px-8 lg:px-12 py-12">
            <div className="flex lg:hidden items-center gap-2 mb-8">
              <div className="w-8 h-8 rounded-lg bg-[#03349a] flex items-center justify-center">
                <span className="text-white font-black text-sm">W</span>
              </div>
              <span className="text-[#03349a] font-bold text-lg">Aayubakwath</span>
            </div>

            <div className="mb-7">
              <div className="flex items-center gap-2 mb-3">
                <div className="h-[3px] w-5 rounded-full bg-[#03349a]" />
                <span className="text-[15px] font-extrabold tracking-[3px] uppercase text-[#03349a]/70">New Account</span>
              </div>
              <h1 className="text-2xl font-black text-[#03349a] mb-1.5" >
                Create Account
              </h1>
              <p className="text-gray-600 text-md font-semibold">Fill in your details below to get started.</p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-[15px] font-extrabold tracking-widest uppercase text-[#03349a] mb-1.5">Full Name</label>
                <div className="relative">
                  <span className="absolute left-3.5 top-1/2 -translate-y-1/2" style={{ color: focused === "name" ? "#03349a" : "#d1bfbf" }}>
                    <UserIcon />
                  </span>
                  <input
                    type="text" name="name" value={form.name} onChange={handleChange} required
                    placeholder="Your full name"
                    onFocus={() => setFocused("name")} onBlur={() => setFocused("")}
                    className="inp-field w-full pl-10 pr-4 py-3 rounded-xl border border-gray-200 bg-[#fefbf6] text-sm text-gray-800"
                  />
                </div>
              </div>

              <div>
                <label className="block text-[15px] font-extrabold tracking-widest uppercase text-[#03349a] mb-1.5">Email Address</label>
                <div className="relative">
                  <span className="absolute left-3.5 top-1/2 -translate-y-1/2" style={{ color: focused === "email" ? "#03349a" : "#d1bfbf" }}>
                    <MailIcon />
                  </span>
                  <input
                    type="email" name="email" value={form.email} onChange={handleChange} required
                    placeholder="you@example.com"
                    onFocus={() => setFocused("email")} onBlur={() => setFocused("")}
                    className="inp-field w-full pl-10 pr-4 py-3 rounded-xl border border-gray-200 bg-[#fefbf6] text-sm text-gray-800"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-[15px] font-extrabold tracking-widest uppercase text-[#03349a] mb-1.5">Password</label>
                  <div className="relative">
                    <span className="absolute left-3.5 top-1/2 -translate-y-1/2" style={{ color: focused === "password" ? "#03349a" : "#d1bfbf" }}>
                      <LockIcon />
                    </span>
                    <input
                      type={showPassword ? "text" : "password"} name="password" value={form.password} onChange={handleChange} required
                      placeholder="Create a password"
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

                <div>
                  <label className="block text-[15px] font-extrabold tracking-widest uppercase text-[#03349a] mb-1.5">Confirm</label>
                  <div className="relative">
                    <span className="absolute left-3.5 top-1/2 -translate-y-1/2" style={{ color: focused === "confirmPassword" ? "#03349a" : "#d1bfbf" }}>
                      <LockIcon />
                    </span>
                    <input
                      type={showConfirm ? "text" : "password"} name="confirmPassword" value={form.confirmPassword} onChange={handleChange} required
                      placeholder="Repeat password"
                      onFocus={() => setFocused("confirmPassword")} onBlur={() => setFocused("")}
                      className="inp-field w-full pl-10 pr-10 py-3 rounded-xl border border-gray-200 bg-[#fefbf6] text-sm text-gray-800"
                    />
                    <button type="button" onClick={() => setShowConfirm(!showConfirm)}
                      className="absolute right-3.5 top-1/2 -translate-y-1/2 transition-colors"
                      style={{ color: "#c8b4b4" }}>
                      <Eye open={showConfirm} />
                    </button>
                  </div>
                </div>
              </div>

              {form.confirmPassword && (
                <p className={`text-xs font-bold flex items-center gap-1.5 -mt-1 ${form.password === form.confirmPassword ? "text-green-600" : "text-red-500"}`}>
                  {form.password === form.confirmPassword ? "✓ Passwords match" : "✗ Passwords do not match"}
                </p>
              )}

              <div className="flex items-start gap-3 pt-1">
                <div className="relative mt-0.5 shrink-0">
                  <input type="checkbox" name="agree" id="agree" checked={form.agree} onChange={handleChange} className="sr-only" />
                  <label
                    htmlFor="agree"
                    className="w-5 h-5 rounded-md flex items-center justify-center cursor-pointer transition-all duration-200"
                    style={{
                      background: form.agree ? "#03349a" : "white",
                      border: `2px solid ${form.agree ? "#03349a" : "#e5e7eb"}`,
                    }}
                  >
                    {form.agree && (
                      <svg viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="3.5" strokeLinecap="round" strokeLinejoin="round" className="w-3 h-3">
                        <polyline points="20 6 9 17 4 12" />
                      </svg>
                    )}
                  </label>
                </div>
                <label htmlFor="agree" className="text-sm font-bold text-gray-600 cursor-pointer leading-relaxed">
                  I agree to the{" "}
                  <a href="#" className="text-[#03349a] font-bold hover:underline">Terms & Conditions</a>
                  {" "}and{" "}
                  <a href="#" className="text-[#03349a] font-bold hover:underline">Privacy Policy</a>
                </label>
              </div>

              <button
                type="submit"
                disabled={mutation.isLoading}
                className="submit-btn w-full py-3.5 rounded-xl text-white text-sm font-extrabold tracking-wide disabled:opacity-60 disabled:cursor-not-allowed mt-2"
                style={{
                  background: "linear-gradient(135deg, #03349a 0%, #a81010 100%)",
                  boxShadow: "0 8px 24px rgba(130,12,12,0.25)",
                }}
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

            <div className="mt-6 flex items-center gap-3">
              <div className="flex-1 h-px bg-gray-100" />
              <span className="text-xs text-gray-300 font-semibold">or</span>
              <div className="flex-1 h-px bg-gray-100" />
            </div>

            <p className="mt-4 text-center text-sm  font-semibold text-gray-600">
              Already have an account?{" "}
              <a href="login" className="text-[#03349a] font-extrabold hover:underline">Sign In</a>
            </p>

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
